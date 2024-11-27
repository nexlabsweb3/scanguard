import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  Param,
} from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Post('submit')
  async submitProduct(@Body() productDto: ProductDto) {
    console.log('Received DTO:', productDto);
    try {
      const ipfsHash = await this.productService.submitProduct(productDto);
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
}
