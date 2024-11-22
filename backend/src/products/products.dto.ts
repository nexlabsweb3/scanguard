import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

interface Product {
    product_id: string;
    name: string;
    image: string;
    manufacturer: string;
    manufactureDate: string;
    expiryDate: string;
}

class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    image: string;

    @IsString()
    @IsNotEmpty()
    manufacturer: string;

    @IsDateString()
    @IsNotEmpty()
    manufactureDate: string;

    @IsDateString()
    @IsNotEmpty()
    expiryDate: string;
}

export { Product, CreateProductDto };
