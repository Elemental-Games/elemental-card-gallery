import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import WheelOfFortune from '@/components/pre-order/WheelOfFortune';
import { verifyOrder } from '@/lib/shopify-admin';

const PostPurchasePage = () => {
  const [orderVerified, setOrderVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkOrder = async () => {
      const params = new URLSearchParams(location.search);
      const orderId = params.get('order_id');

      if (!orderId) {
        setError('No order ID found.');
        setLoading(false);
        return;
      }

      try {
        const order = await verifyOrder(orderId);
        if (order && order.fullyPaid && parseFloat(order.totalPrice.amount) >= 15) {
          setOrderVerified(true);
        } else {
          setError('This order is not eligible for a prize.');
        }
      } catch (err) {
        setError('Failed to verify your order.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    checkOrder();
  }, [location]);

  if (loading) {
    return (
      <div className="bg-[#1A103C] text-white min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1A103C] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Verification Failed</h1>
          <p className="text-xl text-purple-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Thank You & Spin to Win! - Elekin TCG</title>
        <meta name="description" content="Thank you for your pre-order! Spin the wheel to win an exclusive prize." />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-7xl font-bold mb-4">Thank You For Your Order!</h1>
          <p className="text-xl lg:text-2xl text-purple-200 mb-8">
            As a special thank you, you&apos;ve earned a spin on our Wheel of Fortune!
          </p>
        </div>

        {orderVerified ? (
          <div className="mt-12">
            <WheelOfFortune />
          </div>
        ) : (
          <div className="text-center mt-12">
            <h2 className="text-3xl font-bold text-yellow-400">Sorry!</h2>
            <p className="text-lg text-white">
              This order is not eligible for a spin on the Wheel of Fortune.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPurchasePage; 