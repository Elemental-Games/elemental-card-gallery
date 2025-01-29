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
      <p className="mb-4">Last Updated: January 6, 2025</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <p>We collect information that you provide directly to us, including when you:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Create an account</li>
          <li>Make a purchase</li>
          <li>Sign up for our newsletter</li>
          <li>Contact our support team</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Provide and maintain our services</li>
          <li>Process your transactions</li>
          <li>Send you updates and marketing communications</li>
          <li>Improve our services</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Information Sharing</h2>
        <p>We do not sell your personal information. We may share your information with:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Service providers who assist in our operations</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc pl-6 mt-2 space-y-2">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your information</li>
          <li>Opt-out of marketing communications</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Children's Privacy</h2>
        <p>The Service is not intended for children under 13. We do not knowingly collect personal information from children under 13.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. International Data Transfers</h2>
        <p>Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
      </section>

      <div className="mt-8 text-center">
        <p>Questions about our privacy practices? Contact us at: <a href="mailto:contact@elementalgames.gg" className="text-yellow-400 hover:text-yellow-300 transition-colors">privacy@elementalgames.gg</a></p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;