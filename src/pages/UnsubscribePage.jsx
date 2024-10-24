import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const UnsubscribePage = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('processing');
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      handleUnsubscribe();
    }
  }, [token]);

  const handleUnsubscribe = async () => {
    try {
      const response = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (response.ok) {
        setStatus('success');
        toast.success('You have been successfully unsubscribed');
      } else {
        throw new Error('Failed to unsubscribe');
      }
    } catch (error) {
      setStatus('error');
      toast.error('Failed to unsubscribe. Please try again later.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <h1 className="text-4xl font-bold mb-6">Email Preferences</h1>
      
      {status === 'processing' && (
        <p>Processing your unsubscribe request...</p>
      )}
      
      {status === 'success' && (
        <>
          <p className="mb-4">You have been successfully unsubscribed from our mailing list.</p>
          <p>We're sorry to see you go! If you change your mind, you can always subscribe again from our website.</p>
        </>
      )}
      
      {status === 'error' && (
        <p className="text-red-500">
          There was an error processing your request. Please try again later or contact support.
        </p>
      )}
    </motion.div>
  );
};

export default UnsubscribePage;