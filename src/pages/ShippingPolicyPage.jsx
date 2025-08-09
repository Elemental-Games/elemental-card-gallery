import { Helmet } from 'react-helmet-async';

const ShippingPolicyPage = () => {
  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Shipping Policy - Elekin TCG</title>
        <meta name="description" content="Read the shipping policy for Elekin TCG products." />
      </Helmet>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Shipping Policy</h1>
          <div className="space-y-6 text-purple-200">
            <p>Last updated: August 08, 2025</p>

            <h2 className="text-2xl font-bold text-yellow-400">Pre-Order Information</h2>
            <p>All items available in our shop are currently for pre-order. We expect to have all products in hand and ready to ship within 4 weeks. The estimated delivery for all pre-orders is September 2025. We will notify you via email when your order has shipped.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Order Processing Time</h2>
            <p>Once products are in stock, all orders are processed within 1 business day (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Shipping Rates & Estimates</h2>
            <p>Shipping charges for your order will be calculated and displayed at checkout. We estimate that shipping will take approximately 3 business days, but this may vary depending on your location.</p>

            <h2 className="text-2xl font-bold text-yellow-400">How do I check the status of my order?</h2>
            <p>When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 48 hours for the tracking information to become available.</p>
            <p>If you haven&apos;t received your order within 7 days of receiving your shipping confirmation email, please contact us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a> with your name and order number, and we will look into it for you.</p>

            <h2 className="text-2xl font-bold text-yellow-400">Contact Us</h2>
            <p>If you have any further questions, please don&apos;t hesitate to contact us at <a href="mailto:mark@elementalgames.gg" className="text-yellow-400 underline">mark@elementalgames.gg</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage; 