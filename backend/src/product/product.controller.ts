import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { FlagProductDto } from './dto/flag-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('upload')
  async uploadProduct(@Body() productDto: ProductDto) {
    try {
      const ipfsHash = await this.productService.uploadProduct(productDto);
      console.log('Service Result:', ipfsHash);
      return { ipfs_hash: ipfsHash };
    } catch (error) {
      console.error('Error:', error.message);

      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string) {
    try {
      return this.productService.getProductDetails(productId);
    } catch (error) {
      console.error('Error:', error.message);

      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  async getFlaggedProducts() {
    return this.productService.getFlaggedProducts();
  }

  @Post('flag')
  async flagProduct(@Body() flagProductDto: FlagProductDto) {
    try {
      return await this.productService.flagProduct(flagProductDto);
    } catch (error) {
      console.error('Error:', error.message);
      throw new HttpException(
        { error: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
