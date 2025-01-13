import { CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const StripeCardElement = () => {
  const [error, setError] = useState(null);

  const cardStyle = {
    style: {
      base: {
        color: '#fcd34d',
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        '::placeholder': {
          color: '#fcd34d80',
        },
      },
      invalid: {
        color: '#ef4444',
        iconColor: '#ef4444',
      },
    },
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-purple-800/50 border border-yellow-400/20 rounded-md">
        <CardElement 
          options={cardStyle} 
          onChange={(e) => setError(e.error?.message)}
        />
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default StripeCardElement; 