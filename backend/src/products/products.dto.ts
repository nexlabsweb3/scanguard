interface Product {
    product_id: string;
    name: string;
    image: string;
    manufacturer: string;
    manufactureDate: string;
    expiryDate: string;
}

class CreateProductDto {
    name: string;
    image: string;
    manufacturer: string;
    manufactureDate: string;
    expiryDate: string;
}

export { Product, CreateProductDto };
