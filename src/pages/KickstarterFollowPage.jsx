import { useState, useEffect } from 'react';
import { kickstarterConfig } from '@/config/kickstarter';

const KickstarterFollowPage = () => {
  const [hasBacked, setHasBacked] = useState(false);
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSource(params.get('source') || 'direct');
  }, []);

  const handleKickstarterBack = () => {
    if (window.gtag) {
      window.gtag('event', 'kickstarter_back_click', {
        event_category: 'conversion',
        event_label: source,
        value: 1
      });
    }
    
    window.open(kickstarterConfig.url + '?utm_source=' + source + '&utm_medium=qr&utm_campaign=gamestore', '_blank');
    setHasBacked(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email, 'Source:', source);
    alert('Thanks! You\'ll get campaign updates and stretch goal announcements by email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-center">
          <img 
            src="/Games_Logo.png" 
            alt="Elemental Games" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            We&apos;re Live on Kickstarter!
          </h1>
          <p className="text-green-100">
            Back us now and help bring Elekin to life
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!hasBacked ? (
            <>
              {/* Incentives */}
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                <h2 className="font-bold text-green-800 mb-2 flex items-center">
                  🎁 Back Now &amp; Get:
                </h2>
                <ul className="space-y-2 text-sm text-green-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Alt Art Promo Card
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Stretch Goal Rewards (free items as we hit milestones)
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    $100 Gift Card Drawing Entry
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    VIP Community Access
                  </li>
                </ul>
              </div>

              {/* Urgency */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 text-center">
                <p className="text-yellow-700 font-semibold text-sm">
                  Help us reach our $50K goal to fund Elekin&apos;s first set!
                </p>
              </div>

              {/* Main CTA */}
              <button
                onClick={handleKickstarterBack}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 shadow-lg mb-4"
              >
                BACK US ON KICKSTARTER
              </button>

              <p className="text-xs text-gray-500 text-center mb-4">
                Choose your reward tier on Kickstarter
              </p>

              {/* Game Preview */}
              <div className="border rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">What You&apos;re Backing:</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Elekin: Masters of Kinbrold — an epic fantasy TCG with 4 elemental kingdoms, strategic depth, and stunning card art.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="/public/images/cards/new-marketing/galea-t.webp" 
                    alt="Sample Card" 
                    className="w-full rounded-lg"
                  />
                  <div className="text-xs space-y-1">
                    <div className="bg-blue-100 rounded p-1">✨ 4 Kingdoms</div>
                    <div className="bg-purple-100 rounded p-1">🐉 Epic Dragons</div>
                    <div className="bg-green-100 rounded p-1">⚔️ Strategic Combat</div>
                    <div className="bg-yellow-100 rounded p-1">🎨 Amazing Art</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center">
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-6">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-xl font-bold text-green-800 mb-2">
                  Awesome!
                </h2>
                <p className="text-green-600">
                  Thanks for checking out our Kickstarter! Every pledge helps us bring Elekin to life.
                </p>
              </div>

              {/* Email capture for updates */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter email for campaign updates &amp; gift card drawing:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Updates
                </button>
              </form>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">What&apos;s Next?</h3>
                <ul className="text-sm text-green-600 space-y-1">
                  <li>• Stretch goal announcements</li>
                  <li>• Free promo card for every backer</li>
                  <li>• Behind-the-scenes updates</li>
                  <li>• Community events and giveaways</li>
                </ul>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-500">
              Questions? Email mark@elementalgames.gg
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <a href="https://elementalgames.gg" className="text-green-600 text-xs">
                Website
              </a>
              <a href="https://discord.gg/QyNDMYprCg" className="text-green-600 text-xs">
                Discord
              </a>
              <a href="https://www.instagram.com/elekin_tcg/" className="text-green-600 text-xs">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KickstarterFollowPage;
