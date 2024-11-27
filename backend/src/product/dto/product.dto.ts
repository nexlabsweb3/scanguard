import { IsNotEmpty, IsString, IsDateString } from '@nestjs/class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsDateString()
  manufactureDate: string;

  @IsNotEmpty()
  @IsDateString()
  expiryDate: string;
}
