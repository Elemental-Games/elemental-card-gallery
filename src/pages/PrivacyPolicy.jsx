import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        At Elemental Masters, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
      </p>
      {/* Add more privacy policy content here */}
    </motion.div>
  );
};

export default PrivacyPolicy;