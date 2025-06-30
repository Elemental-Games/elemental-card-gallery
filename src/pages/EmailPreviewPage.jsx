import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AirKingdomEmail from '../components/emails/AirKingdomEmail';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

const EmailPreviewPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or default to light
  useEffect(() => {
    const savedTheme = localStorage.getItem('email-preview-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('email-preview-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('email-preview-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSendTest = async () => {
    const confirmed = window.confirm('Send a test email to mark@elementalgames.gg?');
    if (!confirmed) return;

    try {
      const response = await fetch('http://localhost:3001/api/send-marketing-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'mark@elementalgames.gg',
          testEmail: true
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(`✅ Test email sent successfully to mark@elementalgames.gg!\n\nCheck your inbox in a few seconds.`);
      } else {
        alert(`❌ Failed to send test email: ${result.message}`);
      }
    } catch (error) {
      alert(`❌ Error sending test email: ${error.message}`);
    }
  };

  const handleSendToSubscribers = async () => {
    const confirmed = window.confirm('This will send the Air Kingdom email to ALL subscribers in your database.\n\nAre you sure you want to proceed with the campaign?');
    if (!confirmed) return;

    try {
      const response = await fetch('http://localhost:3001/api/send-marketing-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sendToAll: true,
          testEmail: false
        }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert(`✅ Campaign email sent to all subscribers!\n\nTotal emails sent: ${result.emailsSent || 'Unknown'}\n\nCheck your analytics dashboard for delivery metrics.`);
      } else {
        alert(`❌ Failed to send campaign: ${result.message}`);
      }
    } catch (error) {
      alert(`❌ Error sending campaign: ${error.message}`);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <Helmet>
        <title>Email Preview - Air Kingdom | Elekin TCG</title>
        <meta name="description" content="Preview the Air Kingdom marketing email" />
      </Helmet>

      {/* Admin Controls */}
      <div className={`shadow-sm border-b p-4 transition-colors duration-200 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className={`text-2xl font-bold transition-colors duration-200 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Email Campaign Preview
            </h1>
            <p className={`text-sm transition-colors duration-200 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Air Kingdom Week - The Air Kingdom Rises 💨
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
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
              onClick={handleSendTest}
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? 'border-blue-500 text-blue-400 hover:bg-blue-900/20'
                  : 'border-blue-600 text-blue-600 hover:bg-blue-50'
              }`}
            >
              Send Test Email
            </Button>
            <Button 
              onClick={handleSendToSubscribers}
              className={`transition-colors duration-200 ${
                isDarkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Send to Subscribers
            </Button>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto">
          {/* Email Stats */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-2xl font-bold text-blue-600">2,847</div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Subscribers</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-2xl font-bold text-green-600">23.4%</div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Open Rate</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-2xl font-bold text-purple-600">8.7%</div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Click Rate</div>
            </div>
            <div className={`p-4 rounded-lg shadow text-center transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className={`text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>Cards Featured</div>
            </div>
          </div>

          {/* Email Subject Line Preview */}
          <div className="mb-6 mx-4">
            <div className={`p-4 rounded-lg shadow transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`font-semibold mb-2 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>Subject Line:</h3>
              <div className={`text-lg font-medium transition-colors duration-200 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Zalos, The Air Kingdom, Rises 💨
              </div>
              <div className={`mt-2 text-sm transition-colors duration-200 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Preview text: Galea&apos;s domain opens its gates. Three air creatures await their reveal.
              </div>
            </div>
          </div>

          {/* Actual Email Component */}
          <div className="mx-4 shadow-xl rounded-lg overflow-hidden">
            <AirKingdomEmail />
          </div>

          {/* Email Analytics Preview */}
          <div className="mt-8 mx-4">
            <div className={`p-6 rounded-lg shadow transition-colors duration-200 ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h3 className={`text-lg font-semibold mb-4 transition-colors duration-200 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>Campaign Performance Tracking</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
                    Delivery Metrics:
                  </strong>
                  <ul className={`mt-2 space-y-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Delivered: 2,834 (99.5%)</li>
                    <li>• Bounced: 13 (0.5%)</li>
                    <li>• Unsubscribes: 5 (0.2%)</li>
                  </ul>
                </div>
                <div>
                  <strong className={isDarkMode ? 'text-gray-200' : 'text-gray-800'}>
                    Engagement Tracking:
                  </strong>
                  <ul className={`mt-2 space-y-1 transition-colors duration-200 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    <li>• Card clicks: 247</li>
                    <li>• Discord joins: 89</li>
                    <li>• Social follows: 156</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreviewPage; 