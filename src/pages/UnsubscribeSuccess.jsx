// src/pages/UnsubscribeSuccess.jsx
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const UnsubscribeSuccess = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Unsubscribed Successfully</h1>
      <p className="mb-8">
        {email} has been unsubscribed from our newsletter. We're sorry to see you go!
      </p>
      <p className="mb-4">
        If you change your mind, you can always subscribe again from our website.
      </p>
      <Button 
        onClick={() => window.location.href = '/'}
        className="bg-purple-600 hover:bg-purple-700"
      >
        Return to Home
      </Button>
    </div>
  );
};

export default UnsubscribeSuccess;