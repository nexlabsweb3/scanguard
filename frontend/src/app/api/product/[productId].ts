import type { NextApiRequest, NextApiResponse } from 'next';

type ProductDetails = {
  product_id: string;
  name: string;
  image: string;
  manufacturer: string;
  manufactureDate: string;
  expiryDate: string;
};

type ErrorResponse = {
  error: string;
};

const BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:3000'; // Update to match your backend URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductDetails | ErrorResponse>
) {
  const { productId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  if (!productId || typeof productId !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing productId' });
  }

  try {
    const response = await fetch(`${BASE_URL}/products/${productId}`);

    if (!response.ok) {
      const errorBody = await response.json();
      return res
        .status(response.status)
        .json({ error: errorBody.error || 'Failed to fetch product details' });
    }

    const productDetails: ProductDetails = await response.json();
    return res.status(200).json(productDetails);
  } catch (error: any) {
    console.error('Error fetching product details:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
