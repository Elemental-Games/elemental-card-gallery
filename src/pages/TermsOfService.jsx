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
      <p className="mb-4">Last Updated: January 6, 2025</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p>By accessing and using this service, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Description of Service</h2>
        <p>We provide a digital card game platform and related services (the "Service"). We reserve the right to modify, suspend, or discontinue the Service at any time without notice.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. User Accounts</h2>
        <h3 className="text-xl font-semibold mt-3 mb-2">3.1 Registration</h3>
        <p>You may need to create an account to use certain features of the Service. You agree to provide accurate, current, and complete information during registration.</p>
        <h3 className="text-xl font-semibold mt-3 mb-2">3.2 Account Security</h3>
        <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Use the Service for any illegal purpose</li>
          <li>Violate any applicable laws or regulations</li>
          <li>Interfere with or disrupt the Service</li>
          <li>Attempt to gain unauthorized access to the Service</li>
          <li>Transmit any viruses or harmful code</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Intellectual Property</h2>
        <h3 className="text-xl font-semibold mt-3 mb-2">5.1 Our Rights</h3>
        <p>The Service and its original content, features, and functionality are owned by us and are protected by international copyright, trademark, and other intellectual property laws.</p>
        <h3 className="text-xl font-semibold mt-3 mb-2">5.2 User Content</h3>
        <p>You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the Service.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Termination</h2>
        <p>We may terminate or suspend your account and access to the Service immediately, without notice, for any breach of these Terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to Terms</h2>
        <p>We reserve the right to modify these Terms at any time. We will notify users of any material changes via email or through the Service.</p>
      </section>

      <div className="mt-8 text-center">
        <p>Need support? Contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </div>
    </motion.div>
  );
};

export default TermsOfService;