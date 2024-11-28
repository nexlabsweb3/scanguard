'use client';

import React from 'react';
import { AlertType } from '../hooks/useAlert';
import { useAlert } from '../hooks/useAlert';

const Alert: React.FC = () => {
  const { alert } = useAlert();

  if (!alert.isVisible) return null;

  const alertStyles: Record<AlertType, string> = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded border-l-4 shadow-md transition-opacity z-[9999999] ${
        alertStyles[alert.type]
      }`}
      role="alert"
    >
      {alert.title && <p className="font-semibold">{alert.title}</p>}
      <p className="font-medium">{alert.message}</p>
    </div>
  );
};

export default Alert;
