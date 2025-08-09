import { Helmet } from 'react-helmet-async';

const ReturnPolicyPage = () => {
  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Return & Refund Policy - Elekin TCG</title>
        <meta name="description" content="Read the return and refund policy for Elekin TCG products." />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Return & Refund Policy</h1>
          <div className="space-y-6 text-purple-200">
            <p>Last updated: August 08, 2025</p>

            <h2 className="text-2xl font-bold text-yellow-400">30-Day Return Policy</h2>
            <p>We have a 30-day return policy, which means you have 30 days after receiving your item to request a return.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Eligibility for a Return</h2>
            <p>To be eligible for a return, your item must be in the same condition that you received it: unopened, unused, and in its original packaging. You will also need the receipt or proof of purchase.</p>
            <p>Products that have been opened (e.g., booster packs, starter decks) or are not in their original condition are not eligible for a refund.</p>
            
            <h2 className="text-2xl font-bold text-yellow-400">How to Start a Return</h2>
            <p>To start a return, please contact us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>. If your return is accepted, we will provide you with instructions on how and where to send your package.</p>
            <p>The buyer is responsible for all return shipping costs. Items sent back to us without first requesting a return will not be accepted.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Refunds</h2>
            <p>We will notify you once we’ve received and inspected your return. If approved, you’ll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Damages and Issues</h2>
            <p>Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you receive the wrong item, so that we can evaluate the issue and make it right.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Contact Us</h2>
            <p>If you have any questions about our Return & Refund Policy, you can contact us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicyPage; 