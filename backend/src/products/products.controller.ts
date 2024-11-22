import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./products.dto";
    
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      const { name, image, manufacturer, manufactureDate, expiryDate } = createProductDto;

      if (!name || !image || !manufacturer || !manufactureDate || !expiryDate) {
        throw new HttpException('Some fields are missing', HttpStatus.BAD_REQUEST);
      }

      return await this.productsService.submitProduct(createProductDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException('Error uploading to IPFS', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
