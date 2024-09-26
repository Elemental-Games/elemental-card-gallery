import React from 'react';
import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">
        Welcome to Elemental Masters. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
      </p>
      {/* Add more terms of service content here */}
    </motion.div>
  );
};

export default TermsOfService;