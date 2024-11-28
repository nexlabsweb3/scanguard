import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { FlagProductDto } from './dto/flag-product.dto';
import { Product } from '../interfaces/Product';
import { generateProductId } from '../common/utils/generateProductId';

@Injectable()
export class ProductService {
  private readonly PINATA_JWT = process.env.PINATA_JWT || '';
  private readonly PINATA_GATEWAY =
    process.env.PINATA_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';

  constructor(private readonly prisma: PrismaService) {}

  async pinToIPFS(product: Product) {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

    const blob = new Blob([JSON.stringify(product, null, 2)], {
      type: 'application/json',
    });

    const file = new File([blob], `${product.product_id}.txt`);
    const data = new FormData();
    data.append('file', file);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.PINATA_JWT}`,
      },
      body: data,
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error('Error Response:', errorBody);
      throw new Error(
        `Failed to upload to IPFS: ${errorBody.message || response.statusText}`
      );
    }

    return await response.json();
  }

  async uploadProduct(createProductDto: ProductDto): Promise<string> {
    const product_id = generateProductId(10);
    const productData = { product_id, ...createProductDto };

    try {
      const pin = await this.pinToIPFS(productData);
      return pin.IpfsHash;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading to IPFS');
    }
  }

  async getProductDetails(productId: string): Promise<Product> {
    try {
      // Step 1: Get all pins from Pinata to find our product
      const searchUrl = 'https://api.pinata.cloud/data/pinList';
      const searchResponse = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${this.PINATA_JWT}`,
        },
      });

      if (!searchResponse.ok) {
        throw new Error(`Failed to search pins: ${searchResponse.statusText}`);
      }

      const pinList = await searchResponse.json();

      const targetPin = pinList.rows.find(
        (pin: { metadata: { name: string } }) =>
          pin.metadata?.name === `${productId}.txt`
      );

      if (!targetPin) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }

      // Step 3: Fetch the product data using the IPFS hash
      const productUrl = `${this.PINATA_GATEWAY}${targetPin.ipfs_pin_hash}`;
      const productResponse = await fetch(productUrl);

      if (!productResponse.ok) {
        throw new Error(
          `Failed to fetch product: ${productResponse.statusText}`
        );
      }

      const productData: Product = await productResponse.json();

      // Step 4: Verify the product ID matches for security
      if (productData.product_id !== productId) {
        throw new HttpException('Product ID mismatch', HttpStatus.NOT_FOUND);
      }

      return productData;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new HttpException(
        'Failed to fetch product details',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFlaggedProducts() {
    try {
      return await this.prisma.flaggedProduct.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to get flagged products:',
        error
      );
    }
  }

  async flagProduct(flagProductDto: FlagProductDto) {
    try {
      return await this.prisma.flaggedProduct.create({
        data: {
          name: flagProductDto.name,
          image: flagProductDto.image,
          reason: flagProductDto.reason,
        },
      });
    } catch (error) {
      console.error('Error flagging product:', error);
      throw new InternalServerErrorException('Failed to flag product');
    }
  }
}
