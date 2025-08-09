import { Helmet } from 'react-helmet-async';

const TermsOfService = () => {
  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Terms of Service - Elekin TCG</title>
        <meta name="description" content="Read the terms of service for Elekin TCG." />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
          <div className="space-y-6 text-purple-200">
            <p>Last updated: August 08, 2025</p>

            <h2 className="text-2xl font-bold text-yellow-400">1. Overview</h2>
            <p>This website is operated by Elemental Games LLC. Throughout the site, the terms “we”, “us” and “our” refer to Elemental Games LLC. By visiting our site and/ or purchasing something from us, you engage in our “Service” and agree to be bound by the following terms and conditions.</p>

            <h2 className="text-2xl font-bold text-yellow-400">2. Online Store Terms</h2>
            <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence. You may not use our products for any illegal or unauthorized purpose.</p>

            <h2 className="text-2xl font-bold text-yellow-400">3. General Conditions</h2>
            <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information), may be transferred unencrypted and involve transmissions over various networks.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">4. Products or Services</h2>
            <p>Certain products or services may be available exclusively online through the website. We have made every effort to display as accurately as possible the colors and images of our products. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate.</p>

            <h2 className="text-2xl font-bold text-yellow-400">5. Intellectual Property</h2>
            <p>All content on this site, including but not limited to text, graphics, logos, images, and software, is the property of Elemental Games LLC or its content suppliers and protected by international copyright laws. Applying for a trademark for &quot;Elekin&quot; is in progress.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">6. Governing Law</h2>
            <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the United States.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">7. Changes to Terms of Service</h2>
            <p>You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">8. Contact Information</h2>
            <p>Questions about the Terms of Service should be sent to us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;