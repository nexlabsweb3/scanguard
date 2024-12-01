'use client';

import ManufacturerForm from '@/components/manufacturer/ManufacturerForm';

export default function ManufacturerPage() {
  return (
    <div className="min-h-screen mb-20 flex flex-col justify-center items-center bg-manufacturer-bg bg-cover">
      <ManufacturerForm />
    </div>
  );
}
