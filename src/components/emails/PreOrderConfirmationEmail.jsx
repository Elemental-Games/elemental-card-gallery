import { Button } from "@/components/ui/button";

const PreOrderConfirmationEmail = () => {
  return (
    <div className="max-w-2xl mx-auto bg-white text-gray-900 font-sans">
      {/* Email Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white p-4 text-center">
        <img 
          src="/Elekin_Kinbrold_Icon.png" 
          alt="Elekin Kinbrold" 
          className="h-48 mx-auto -mb-6 -mt-6"
        />
        <p className="text-md font-bold opacity-90 mt-5">Your Pre-Order is Confirmed!</p>
      </div>

      {/* Hero Section */}
      <div className="relative h-80 w-full flex items-center justify-center overflow-hidden">
        <img
          src="/background_gif2.gif"
          alt="Animated Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ minHeight: '100%', minWidth: '100%' }}
        />
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative text-center z-20 px-4 w-full">
          <h2 className="text-5xl font-extrabold mb-8 -mt-10 tracking-wider text-white drop-shadow-lg" style={{textShadow: '0 2px 12px #F59E0B, 0 0 8px #fff'}}>Thank You For Your Pre-Order!</h2>
          <h3 className="text-3xl font-extrabold mb-4 tracking-wide text-yellow-200 drop-shadow-lg" style={{textShadow: '0 2px 8px #F59E0B'}}>You&apos;re All Set!</h3>
          <p className="text-xl font-semibold text-purple-200 drop-shadow-lg max-w-md mx-auto" style={{textShadow: '0 2px 8px #F59E0B'}}>Get ready for an epic adventure!</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-yellow-600 mb-3">
            Your Order is Locked In! 🚀
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Thank you for supporting Elekin TCG! Your pre-order has been successfully placed. We&apos;re now preparing everything for the official launch.
          </p>
        </div>

        <div className="text-center mb-8 bg-yellow-100 p-6 rounded-lg">
          <h4 className="text-2xl font-bold text-yellow-700 mb-4">
            🎁 Your Wheel Spin Reward! 🎁
          </h4>
          <p className="text-lg text-gray-700 mb-6">
            As a thank you for your pre-order, you&apos;ve earned a spin on our Prize Wheel! Click the button below to claim your prize.
          </p>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all">
              Spin the Wheel!
          </Button>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-purple-600 mb-3">
            What&apos;s Next?
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            Your pre-ordered items are expected to ship in <strong>October 2025</strong>. We&apos;ll keep you updated on our progress and let you know as soon as your order is on its way.
          </p>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <Button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all">
            <a href="https://elementalgames.gg" target="_blank" rel="noopener noreferrer">
              Visit Our Website
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex justify-center space-x-6 text-gray-500">
            <a href="https://discord.gg/PVrgZBmcMq" className="hover:text-purple-600 transition-colors">Discord</a>
            <a href="https://www.facebook.com/ElekinTCG" className="hover:text-purple-600 transition-colors">Facebook</a>
            <a href="https://www.instagram.com/elekin_tcg/" className="hover:text-purple-600 transition-colors">Instagram</a>
            <a href="https://www.tiktok.com/@elekin_tcg" className="hover:text-purple-600 transition-colors">TikTok</a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>You received this email because you placed a pre-order with Elekin TCG.</p>
        <a href="https://www.elementalgames.gg/unsubscribe" className="text-purple-600 hover:underline">Unsubscribe</a>
      </div>
    </div>
  );
};

export default PreOrderConfirmationEmail; 