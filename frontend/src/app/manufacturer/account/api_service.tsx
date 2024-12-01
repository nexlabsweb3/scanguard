import { FormEvent } from 'react';

interface ManufacturerFormData {
  name: string;
  address: string;
  email: string;
  rc: string;
  phone: string;
  registrationImage?: File;
}

export const handleSubmit = async (
  e: FormEvent,
  data: ManufacturerFormData
) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    const response = await fetch('/api/manufacturers', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
