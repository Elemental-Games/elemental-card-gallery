import { Helmet } from 'react-helmet-async';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Privacy Policy - Elekin TCG</title>
        <meta name="description" content="Read the privacy policy for Elekin TCG." />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
          <div className="space-y-6 text-purple-200">
            <p>Last updated: August 08, 2025</p>
            <p>This Privacy Policy describes how Elemental Games LLC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and discloses your personal information when you visit, use our services, or make a purchase from elementalgames.gg (the &quot;Site&quot;) or otherwise communicate with us (collectively, the &quot;Services&quot;).</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">Information We Collect</h2>
            <p>When you use our Services, we may collect personal information about you from a variety of sources. This includes information you provide to us directly, information we collect automatically, and information we obtain from third parties.</p>
            <ul>
                <li><strong>Information You Provide Directly:</strong> This includes your name, shipping and billing address, email address, phone number, and payment information.</li>
                <li><strong>Information We Collect Automatically:</strong> We use cookies and similar technologies to collect information about your device and how you interact with our Site. This may include your IP address, browser type, and operating system.</li>
                <li><strong>Information from Third Parties:</strong> We may receive information from third parties, such as Shopify, to supplement the information we collect.</li>
            </ul>

            <h2 className="text-2xl font-bold text-yellow-400">How We Use Your Information</h2>
            <p>We use your personal information to provide and improve our Services, including to:</p>
            <ul>
                <li>Process your orders and payments.</li>
                <li>Communicate with you about your orders and our Services.</li>
                <li>Screen our orders for potential risk or fraud.</li>
                <li>Provide you with information or advertising relating to our products or services.</li>
            </ul>

            <h2 className="text-2xl font-bold text-yellow-400">Sharing Your Information</h2>
            <p>We share your personal information with third-party service providers to help us provide our Services. For example, we use Shopify to power our online store. We may also share your information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Your Rights</h2>
            <p>Depending on where you live, you may have certain rights regarding your personal information, such as the right to access, correct, or delete your data. To exercise these rights, please contact us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">Contact Us</h2>
            <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;