import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import VipKickstarterEmail from '../components/emails/VipKickstarterEmail';
import { Button } from "@/components/ui/button";
import { Moon, Sun, AlertTriangle, Target, Users, Zap } from "lucide-react";

const VipKickstarterEmailPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('vip-kickstarter-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vip-kickstarter-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vip-kickstarter-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'diorio1') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  const handleSendTest = async () => {
    const confirmed = window.confirm(`🚨 SEND TEST VIP KICKSTARTER EMAIL?\n\nThis will send the VIP Kickstarter email to mark@elementalgames.gg for testing.\n\nProceed?`);
    if (!confirmed) return;

    try {
      const response = await fetch('/api/send-vip-kickstarter-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail: true, email: 'mark@elementalgames.gg' }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(`✅ Test VIP Kickstarter email sent successfully to mark@elementalgames.gg!\n\nCheck your inbox in a few seconds.\n\nMessage ID: ${result.messageId || 'N/A'}`);
      } else {
        alert(`❌ Failed to send test email: ${result.message}`);
      }
    } catch (error) {
      alert(`❌ Error sending test email: ${error.message}`);
    }
  };

  const handleSendToSubscribers = async () => {
    const confirmed = window.confirm(`🚨 CRITICAL CAMPAIGN ALERT! 🚨

This will send the VIP Kickstarter email to ALL 122 subscribers.

📊 EXPECTED RESULTS:
• 30-50 new Kickstarter followers within 24 hours
• 25-40% conversion rate from your subscribers
• This is your HIGHEST IMPACT emergency conversion campaign!

⏰ TIME IS CRITICAL - Every hour delayed reduces impact!

Are you ready to execute this campaign?`);
    
    if (!confirmed) return;

    try {
      const response = await fetch('/api/send-vip-kickstarter-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sendToAll: true }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(`🎯 VIP KICKSTARTER CAMPAIGN LAUNCHED! 🎯

${result.message}

📊 NEXT STEPS:
1. Monitor Kickstarter follower count hourly
2. Track email open rates in Resend dashboard
3. Expect 30-50 new followers in 24 hours
4. Prepare for increased website traffic
5. Watch for social media engagement spike

This is your biggest conversion opportunity!

Message ID: ${result.messageId || 'N/A'}
Recipients: ${result.recipients || 'Unknown'}`);
      } else {
        alert(`❌ Failed to send VIP campaign: ${result.message}`);
      }
    } catch (error) {
      alert(`❌ Error sending VIP campaign: ${error.message}`);
    }
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
        <Helmet>
          <title>🚨 VIP Kickstarter Campaign | Elekin TCG</title>
          <meta name="description" content="Emergency VIP Kickstarter email campaign access" />
        </Helmet>
        
        <div className={`w-full max-w-md p-8 rounded-lg shadow-lg transition-colors duration-200 ${
          isDarkMode ? 'bg-gray-800 border-2 border-red-500' : 'bg-white border-2 border-red-500'
        }`}>
          <div className="text-center mb-6">
            <div className="mb-4">
              <AlertTriangle className="w-12 h-12 mx-auto text-red-500" />
            </div>
            <h1 className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🚨 VIP Campaign Access
            </h1>
            <p className={`mt-2 text-sm font-medium transition-colors duration-200 ${
              isDarkMode ? 'text-red-300' : 'text-red-600'
            }`}>
              Emergency Kickstarter Conversion Campaign
            </p>
            <p className={`mt-1 text-xs transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Target: 30-50 new followers from 122 subscribers
            </p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 font-sans ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-red-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-red-500'
                } focus:outline-none focus:ring-2 focus:ring-red-500/20`}
                required
              />
            </div>
            
            {loginError && (
              <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
                {loginError}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
            >
              🚀 Access VIP Campaign
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <button
              onClick={toggleTheme}
              className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 font-sans ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Helmet>
        <title>🚨 VIP Kickstarter Campaign | Elekin TCG</title>
        <meta name="description" content="Emergency VIP Kickstarter email campaign management" />
      </Helmet>

      {/* Emergency Header */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-bold text-sm">EMERGENCY CAMPAIGN</span>
          <span className="text-sm opacity-90">Target: 500 Kickstarter followers in 14 days</span>
          <AlertTriangle className="w-5 h-5" />
        </div>
      </div>

      {/* Admin Controls */}
      <div className={`shadow-sm border-b p-4 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto">
          {/* Title and Description */}
          <div className="mb-6">
            <h1 className={`text-3xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              🚨 VIP Kickstarter Campaign
            </h1>
            <p className={`text-lg mt-2 transition-colors duration-200 ${
              isDarkMode ? 'text-red-300' : 'text-red-600'
            }`}>
              Emergency conversion campaign - Phase 1 of "500 in 14 Days" strategy
            </p>
            <p className={`text-sm mt-1 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Send VIP early access email to 122 exclusive subscribers for maximum Kickstarter conversion
            </p>
          </div>

          {/* Campaign Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-blue-50'
            }`}>
              <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold text-blue-600">122</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>VIP Subscribers</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-green-50'
            }`}>
              <Target className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold text-green-600">30-50</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Expected Followers</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-purple-50'
            }`}>
              <Zap className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold text-purple-600">25-40%</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Conversion Rate</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-700' : 'bg-orange-50'
            }`}>
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold text-orange-600">24h</div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Time to Results</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                onClick={handleSendTest}
                className={`transition-colors duration-200 ${
                  isDarkMode
                    ? 'border-blue-500 text-blue-400 hover:bg-blue-900/20'
                    : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                📧 Send Test Email
              </Button>
              
              <Button 
                onClick={handleSendToSubscribers}
                className="bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                🚀 LAUNCH VIP CAMPAIGN
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleTheme}
                className={`border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
                className={`border transition-colors duration-200 ${
                  isDarkMode 
                    ? 'border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-300' 
                    : 'border-red-600 text-red-600 hover:bg-red-50'
                }`}
              >
                🔓 Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Strategy Overview */}
      <div className="py-6 px-4">
        <div className="max-w-6xl mx-auto">
          <div className={`p-6 rounded-lg shadow-lg transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800 border border-yellow-500' : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <h2 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              ⚡ Emergency Strategy: "500 in 14 Days"
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-sm">
              <div className={`p-3 rounded ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'}`}>
                <div className="font-bold text-red-600">Phase 1: VIP Email</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>30-50 followers</div>
                <div className="text-xs text-red-500">← YOU ARE HERE</div>
              </div>
              <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="font-bold">Phase 2: Paid Ads</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>60+ followers</div>
              </div>
              <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="font-bold">Phase 3: Game Stores</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>60-90 followers</div>
              </div>
              <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="font-bold">Phase 4: Viral Content</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>25+ followers</div>
              </div>
              <div className={`p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="font-bold">Phase 5: Influencers</div>
                <div className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>100-200 followers</div>
              </div>
            </div>
            <p className={`mt-4 text-sm font-medium ${isDarkMode ? 'text-yellow-300' : 'text-yellow-800'}`}>
              🎯 Total Target: 500+ Kickstarter followers | Current: 25 followers | Goal: 475+ new followers
            </p>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Email Subject Line Preview */}
          <div className="mb-6">
            <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`font-semibold text-lg mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>📧 Email Campaign Details:</h3>
              <div className={`text-xl font-medium mb-3 transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <strong>Subject:</strong> 🔥 VIP Early Access: Follow Our Kickstarter for Exclusive Rewards
              </div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                <strong>Preview text:</strong> You're one of only 122 people getting this exclusive offer. 20% VIP discount + exclusive rewards inside!
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">UTM Tracking</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Mobile Responsive</span>
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">VIP Exclusive</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">High Urgency</span>
              </div>
            </div>
          </div>

          {/* Actual Email Component */}
          <div className="mb-8 shadow-xl rounded-lg overflow-hidden">
            <VipKickstarterEmail />
          </div>

          {/* Post-Campaign Tracking */}
          <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <h3 className={`text-xl font-semibold mb-4 transition-colors duration-200 ${
              isDarkMode ? 'text-gray-100' : 'text-gray-800'
            }`}>📊 Post-Campaign Monitoring</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className={`font-semibold mb-3 text-blue-600`}>
                  Immediate Actions (0-4 hours):
                </h4>
                <ul className={`space-y-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>✅ Monitor Resend dashboard for delivery rates</li>
                  <li>✅ Check Kickstarter follower count every hour</li>
                  <li>✅ Watch for email bounces and unsubscribes</li>
                  <li>✅ Prepare for website traffic spike</li>
                </ul>
              </div>
              <div>
                <h4 className={`font-semibold mb-3 text-green-600`}>
                  24-Hour Targets:
                </h4>
                <ul className={`space-y-2 transition-colors duration-200 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <li>🎯 30-50 new Kickstarter followers</li>
                  <li>📧 25%+ email open rate</li>
                  <li>🔗 8%+ click-through rate</li>
                  <li>📈 Social media engagement increase</li>
                </ul>
              </div>
            </div>
            <div className={`mt-6 p-4 rounded-lg ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <p className={`text-sm font-medium ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>
                🚀 <strong>Success Metric:</strong> If this campaign converts 30+ subscribers to Kickstarter followers, 
                you'll achieve 20% of your total 14-day goal in just the first phase!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipKickstarterEmailPage; 