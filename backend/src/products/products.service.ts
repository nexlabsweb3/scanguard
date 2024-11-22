import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Product } from "./products.dto";

@Injectable()
export class ProductsService {
    constructor(private configService: ConfigService) {}

    private async pinToIPFS(product: Product) {
        const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
        const PINATA_JWT = this.configService.get<string>("PINATA_JWT");

        const blob = new Blob([JSON.stringify(product, null, 2)], {
            type: "application/json",
        });

        const file = new File([blob], `${product.product_id}.txt`);
        const data = new FormData();
        data.append("file", file);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: data,
        });

        return await response.json();
    }

    async submitProduct(productDto: Omit<Product, "product_id">) {
        const product_id = this.generateProductId(10);

        const productData: Product = {
            product_id,
            ...productDto,
        };

        const pin = await this.pinToIPFS(productData);
        return { ipfs_hash: pin.IpfsHash };
    }

    private generateProductId(length: number): string {
        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}
