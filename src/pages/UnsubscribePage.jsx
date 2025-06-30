import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Alert, AlertDescription } from '../components/ui/alert';
import { CheckCircle, XCircle, Mail, Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const UnsubscribePage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error', 'resubscribed'
  const [message, setMessage] = useState('');
  const [isResubscribing, setIsResubscribing] = useState(false);

  // Check for email in URL params (from email link)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, []);

  const handleUnsubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Successfully unsubscribed from all future emails');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to unsubscribe. Please try again.');
      }
    } catch (error) {
      console.error('Unsubscribe error:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handleResubscribe = async () => {
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setIsResubscribing(true);
    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3001/api/resubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('resubscribed');
        setMessage(data.message || 'Successfully resubscribed to future emails');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to resubscribe. Please try again.');
      }
    } catch (error) {
      console.error('Resubscribe error:', error);
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsResubscribing(false);
    }
  };

  const resetForm = () => {
    setStatus('');
    setMessage('');
    setIsResubscribing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-300 hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Elemental Masters
          </Link>
        </div>

        <Card className="w-full bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Email Preferences
            </CardTitle>
            <CardDescription className="text-blue-200">
              Manage your Elemental Masters email subscription
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {status === 'success' && (
              <Alert className="bg-green-500/20 border-green-400 text-green-100">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  {message}
                  <div className="mt-4 space-y-2">
                    <p className="text-sm">Changed your mind?</p>
                    <Button 
                      onClick={handleResubscribe}
                      disabled={isResubscribing}
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-green-400 text-green-100 hover:bg-green-500/20"
                    >
                      {isResubscribing ? 'Resubscribing...' : 'Resubscribe'}
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {status === 'resubscribed' && (
              <Alert className="bg-blue-500/20 border-blue-400 text-blue-100">
                <Heart className="h-4 w-4" />
                <AlertDescription>
                  {message}
                  <div className="mt-2">
                                         <p className="text-sm">Welcome back! You&apos;ll receive future updates about:</p>
                    <ul className="text-xs mt-2 space-y-1 list-disc list-inside">
                      <li>New card reveals and releases</li>
                      <li>Kingdom lore and updates</li>
                      <li>Exclusive giveaways and tournaments</li>
                      <li>Game updates and announcements</li>
                    </ul>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {status === 'error' && (
              <Alert className="bg-red-500/20 border-red-400 text-red-100">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            {(status === '' || status === 'error') && (
              <>
                <form onSubmit={handleUnsubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-blue-200">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    {status === 'loading' ? 'Processing...' : 'Unsubscribe from Emails'}
                  </Button>
                </form>

                <div className="text-center">
                  <p className="text-sm text-blue-200 mb-2">
                    This will stop all future emails from Elemental Masters.
                  </p>
                  <p className="text-xs text-gray-400">
                                         We&apos;re sorry to see you go! You can resubscribe anytime.
                  </p>
                </div>
              </>
            )}

            {(status === 'success' || status === 'resubscribed') && (
              <div className="text-center">
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="bg-transparent border-white/20 text-blue-200 hover:bg-white/10"
                >
                  Update Another Email
                </Button>
              </div>
            )}

            <div className="border-t border-white/20 pt-4">
              <div className="text-center">
                <p className="text-xs text-gray-400 mb-3">
                  Stay connected with Elemental Masters:
                </p>
                <div className="flex justify-center space-x-4">
                  <a 
                    href="https://discord.gg/PVrgZBmcMq" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 text-sm"
                  >
                    Discord
                  </a>
                  <a 
                    href="https://x.com/elekin_tcg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 text-sm"
                  >
                    Twitter
                  </a>
                  <a 
                    href="https://www.instagram.com/elekin_tcg/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 text-sm"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://www.tiktok.com/@elekin_tcg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 text-sm"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UnsubscribePage;