import { Request, Response } from "express";
import { generateProductId } from "./utils";
import * as dotenv from "dotenv";

dotenv.config();

interface Product {
  product_id: string;
  name: string;
  image: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
}


const PINATA_GATEWAY = process.env.PINATA_GATEWAY || "https://gateway.pinata.cloud/ipfs/";

const PINATA_JWT: string = process.env.PINATA_JWT || "";

const pinToIPFS = async (product: Product) => {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

  const blob = new Blob([JSON.stringify(product, null, 2)], {
    type: "application/json"
  });

  const file = new File([blob], `${product.product_id}.txt`);
  const data = new FormData();
  data.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PINATA_JWT}`
    },
    body: data
  });

  return await response.json();
};

export const submitProduct = async (req: Request, res: Response) => {
  const { name, image, manufacturer, manufactureDate, expiryDate } = req.body;

  if (!name || !image || !manufacturer || !manufactureDate || !expiryDate) {
    return res.status(400).json({ error: "Some fields are missing" });
  }

  const product_id = generateProductId(10);

  const productData: Product = {
    product_id,
    name,
    image,
    manufacturer,
    manufactureDate,
    expiryDate
  };

  try {
    const pin = await pinToIPFS(productData);

    return res.json({ ipfs_hash: pin.IpfsHash });
  } catch (error) {
    return res.status(500).json({ error: "Error uploading to IPFS" });
  }
};


export const getProductDetails = async (req: Request, res: Response) => {
  const { productId } = req.params;
  
  if (!productId) {
      return res.status(400).json({ error: "Product ID is required" });
  }

  try {
      // Step 1: Get all pins from Pinata to find our product
      const searchUrl = "https://api.pinata.cloud/data/pinList";
      const searchResponse = await fetch(searchUrl, {
          headers: {
              Authorization: `Bearer ${PINATA_JWT}`
          }
      });
      
      if (!searchResponse.ok) {
          throw new Error(`Failed to search pins: ${searchResponse.status}`);
      }

      const pinList = await searchResponse.json();
      
      
      const targetPin = pinList.rows.find((pin: any) => 
          pin.metadata?.name === `${productId}.txt`
      );

      if (!targetPin) {
          return res.status(404).json({ 
              success: false,
              error: "Product not found" 
          });
      }

      // Step 3: Fetch the product data using the IPFS hash
      const productUrl = `${PINATA_GATEWAY}${targetPin.ipfs_pin_hash}`;
      const productResponse = await fetch(productUrl);
      
      if (!productResponse.ok) {
          throw new Error(`Failed to fetch product: ${productResponse.status}`);
      }

      const productData: Product = await productResponse.json();
      
      // Step 4: Verify the product ID matches for security
      if (productData.product_id !== productId) {
          return res.status(404).json({ 
              success: false,
              error: "Product ID mismatch" 
          });
      }

      return res.json({
          success: true,
          product: productData
      });

  } catch (error) {
      console.error("Error fetching product:", error);
      return res.status(500).json({ 
          success: false,
          error: "Failed to fetch product details" 
      });
  }
};