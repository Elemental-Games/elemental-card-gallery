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
        <h3 className="text-xl font-semibold mt-3 mb-2">1.1 Information You Provide</h3>
        <p>We collect information you provide directly to us, including:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Account registration information</li>
          <li>Profile information</li>
          <li>Communication preferences</li>
          <li>Payment information</li>
          <li>Content you submit</li>
        </ul>

        <h3 className="text-xl font-semibold mt-3 mb-2">1.2 Automatically Collected Information</h3>
        <p>We automatically collect certain information when you use the Service, including:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Device information</li>
          <li>Log data</li>
          <li>Usage information</li>
          <li>Location information</li>
          <li>Cookies and similar technologies</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Provide and maintain the Service</li>
          <li>Process your transactions</li>
          <li>Send you technical notices and updates</li>
          <li>Respond to your comments and questions</li>
          <li>Analyze usage patterns</li>
          <li>Protect against fraudulent or illegal activity</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Information Sharing</h2>
        <h3 className="text-xl font-semibold mt-3 mb-2">3.1 Service Providers</h3>
        <p>We may share your information with third-party service providers who assist in operating our Service.</p>
        <h3 className="text-xl font-semibold mt-3 mb-2">3.2 Legal Requirements</h3>
        <p>We may disclose your information if required by law or in response to valid requests from public authorities.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Export your data</li>
          <li>Withdraw consent</li>
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
        <p>Need support? Contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;