import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-4xl font-bold mb-6">Privacy Policy for Elemental Games</h1>
      <p className="mb-4">Last updated: October 2nd, 2024</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Introduction</h2>
        <p>Welcome to Elemental Games. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Data We Collect</h2>
        <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
        <ul className="list-disc list-inside ml-4">
          <li>Identity Data: first name, last name, username</li>
          <li>Contact Data: email address</li>
          <li>Technical Data: internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform</li>
          <li>Usage Data: information about how you use our website and services</li>
          <li>Marketing and Communications Data: your preferences in receiving marketing from us and our third parties and your communication preferences</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. How We Use Your Data</h2>
        <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
        <ul className="list-disc list-inside ml-4">
          <li>To register you as a new customer</li>
          <li>To process and deliver your orders</li>
          <li>To manage our relationship with you</li>
          <li>To improve our website, products/services, marketing or customer relationships</li>
          <li>To recommend products or services which may be of interest to you</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Data Security</h2>
        <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Data Retention</h2>
        <p>We will only retain your personal data for as long as necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Your Legal Rights</h2>
        <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Third-party Links</h2>
        <p>This website may include links to third-party websites, plug-ins and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Cookies</h2>
        <p>Our website uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and also allows us to improve our site.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">10. Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </section>

      <div className="mt-8 text-center">
        <p>Need support? Contact us at: <a href="mailto:contact@elementalgames.gg" className="text-blue-500 hover:underline">contact@elementalgames.gg</a></p>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
