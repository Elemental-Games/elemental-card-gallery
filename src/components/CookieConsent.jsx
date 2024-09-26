import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <p className="mr-4">
          We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
        </p>
        <Button onClick={handleAccept}>Accept</Button>
      </div>
    </motion.div>
  );
};

export default CookieConsent;