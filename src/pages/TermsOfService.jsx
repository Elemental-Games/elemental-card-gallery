import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Terms of Service for Elemental Games</h1>
      <p className="mb-4">Last updated: October 2nd, 2024</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>Welcome to Elemental Games. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using our website, you agree to be bound by these Terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Use of Our Services</h2>
        <p>You may use our services only as permitted by law and these Terms. We may suspend or stop providing our services to you if you do not comply with our terms or policies or if we are investigating suspected misconduct.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Your Elemental Games Account</h2>
        <p>You may need an Elemental Games Account in order to use some of our services. You are responsible for safeguarding your account, so use a strong password and limit its use to this account.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Privacy and Copyright Protection</h2>
        <p>Our privacy policy explains how we treat your personal data and protect your privacy when you use our services. By using our services, you agree that Elemental Games can use such data in accordance with our privacy policy.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Your Content in Our Services</h2>
        <p>Our services allow you to upload, submit, store, send or receive content. You retain ownership of any intellectual property rights that you hold in that content.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Software in Our Services</h2>
        <p>When a service requires or includes downloadable software, this software may update automatically on your device once a new version or feature is available.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Modifying and Terminating Our Services</h2>
        <p>We are constantly changing and improving our services. We may add or remove functionalities or features, and we may suspend or stop a service altogether.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Our Warranties and Disclaimers</h2>
        <p>We provide our services using a commercially reasonable level of skill and care and we hope that you will enjoy using them. But there are certain things that we don't promise about our services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Liability for Our Services</h2>
        <p>When permitted by law, Elemental Games, and Elemental Games's suppliers and distributors, will not be responsible for lost profits, revenues, or data, financial losses or indirect, special, consequential, exemplary, or punitive damages.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. Business Uses of Our Services</h2>
        <p>If you are using our services on behalf of a business, that business accepts these terms.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">11. About These Terms</h2>
        <p>We may modify these terms or any additional terms that apply to a service to, for example, reflect changes to the law or changes to our services.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">12. Contact Us</h2>
        <p>If you have any questions about these Terms, please contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </section>

      <div className="mt-8 text-center">
        <p>Need support? Contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
