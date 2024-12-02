import axios from 'axios';

export const fetchIpfsFile = async (file: string) => {
  try {
    const response = await axios.get(`https://ipfs.io/ipfs/${file}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch IPFS file with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error('Error fetching IPFS file:', error);
    throw error; // Re-throw the error for further handling if necessary
  }
};

const URL = '';
export const handleFlagProduct = async function (
  product_id: string,
  flag_reason: string
) {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_id,
      flag_reason,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error('Error Response:', errorBody);
    throw new Error(
      `Failed to flag product: ${errorBody.message || response.statusText}`
    );
  }

  return await response.json();
};

export const fetchProductDetails = async (productId: string) => {
  try {
    const response = await fetch(`/api/product/${productId}`);
    if (!response.ok) {
      throw new Error(await response.text());
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
    throw error;
  }
};

const BASE_URL = process.env.BACKEND_BASE_URL || 'http://localhost:3000';

export const getRegisteredProductsByManufacturer = async (
  manufacturerId: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/manufacturer-products/${manufacturerId}`
    );
    return await response.json();
  } catch (error) {
    console.error('Error fetching product details:', error);
  }
};
