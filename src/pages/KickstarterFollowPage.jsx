import { useState, useEffect } from 'react';

const KickstarterFollowPage = () => {
  const [hasFollowed, setHasFollowed] = useState(false);
  const [email, setEmail] = useState('');
  const [source, setSource] = useState('');

  useEffect(() => {
    // Get source from URL params (e.g., ?source=gamestore1)
    const params = new URLSearchParams(window.location.search);
    setSource(params.get('source') || 'direct');
  }, []);

  const handleKickstarterFollow = () => {
    // Track the click
    if (window.gtag) {
      window.gtag('event', 'kickstarter_follow_click', {
        event_category: 'conversion',
        event_label: source,
        value: 1
      });
    }
    
    // Open Kickstarter in new tab
    window.open('YOUR_KICKSTARTER_FOLLOW_LINK?utm_source=' + source + '&utm_medium=qr&utm_campaign=gamestore', '_blank');
    
    setHasFollowed(true);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Submit email for additional tracking and nurturing
    console.log('Email submitted:', email, 'Source:', source);
    
    // You can integrate with your email service here
    // For now, just show success
                         alert('Thanks! You&rsquo;ll get the $100 gift card drawing results by email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
          <img 
            src="/Games_Logo.png" 
            alt="Elemental Games" 
            className="h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">
            🎮 Exclusive Game Store Access
          </h1>
          <p className="text-blue-100">
            Follow our Kickstarter for instant rewards!
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!hasFollowed ? (
            <>
              {/* Incentives */}
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                <h2 className="font-bold text-yellow-800 mb-2 flex items-center">
                  🎁 Follow Now & Get:
                </h2>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    20% Early Bird Discount
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    Exclusive Promo Card
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    $100 Gift Card Drawing Entry
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-600 mr-2">✅</span>
                    First Access to Launch
                  </li>
                </ul>
              </div>

              {/* Urgency */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-center">
                <p className="text-red-600 font-semibold text-sm">
                  ⏰ Limited Time: Only from this game store visit!
                </p>
              </div>

              {/* Main CTA */}
              <button
                onClick={handleKickstarterFollow}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg mb-4"
              >
                🚀 FOLLOW KICKSTARTER NOW
              </button>

              <p className="text-xs text-gray-500 text-center mb-4">
                Takes 5 seconds • No payment required • Unfollow anytime
              </p>

              {/* Game Preview */}
              <div className="border rounded-lg p-4 mb-4">
                                 <h3 className="font-semibold mb-2">🏰 What You&rsquo;re Following:</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Elemental Games - Epic fantasy TCG with 5 kingdoms, dragons, and strategic depth that rivals Magic: The Gathering.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <img 
                    src="/public/images/cards/new-marketing/galea-t.webp" 
                    alt="Sample Card" 
                    className="w-full rounded-lg"
                  />
                  <div className="text-xs space-y-1">
                    <div className="bg-blue-100 rounded p-1">✨ 5 Kingdoms</div>
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
                  You&rsquo;re In!
                </h2>
                                 <p className="text-green-600">
                   Thanks for following our Kickstarter! You&rsquo;ll get all the VIP rewards when we launch.
                 </p>
              </div>

              {/* Email capture for gift card */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter email for $100 gift card drawing:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Enter Drawing
                </button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                                 <h3 className="font-semibold text-blue-800 mb-2">What&rsquo;s Next?</h3>
                 <ul className="text-sm text-blue-600 space-y-1">
                   <li>• You&rsquo;ll get launch notification first</li>
                  <li>• Early bird pricing just for you</li>
                  <li>• Free exclusive promo card</li>
                  <li>• Behind-the-scenes updates</li>
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
              <a href="https://elementalgames.gg" className="text-blue-600 text-xs">
                Website
              </a>
              <a href="#" className="text-blue-600 text-xs">
                Discord
              </a>
              <a href="#" className="text-blue-600 text-xs">
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