import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail } from 'lucide-react';
import { toast } from 'sonner';
import { subscribeEmail } from '../utils/api';
import { trackEmailSignup } from '../utils/analytics';
import confetti from 'canvas-confetti';

const StickyEmailBar = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if user has already dismissed or subscribed (stored in localStorage)
  useEffect(() => {
    const dismissed = localStorage.getItem('stickyEmailBarDismissed');
    const subscribed = localStorage.getItem('stickyEmailBarSubscribed');
    if (dismissed === 'true' || subscribed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const shootConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 50,
      origin: { y: 0.1 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);

      if (result.success) {
        shootConfetti();
        toast.success('You\'re signed up! Check your email for launch updates.');
        setIsSuccess(true);
        localStorage.setItem('stickyEmailBarSubscribed', 'true');
        
        // Track email signup
        trackEmailSignup('sticky_email_bar', { email });
        
        setTimeout(() => {
          setIsDismissed(true);
        }, 3000);
      } else {
        if (result.message && result.message.includes('already subscribed')) {
          toast.info('You\'re already on our list!');
          setIsSuccess(true);
          localStorage.setItem('stickyEmailBarSubscribed', 'true');
          setTimeout(() => {
            setIsDismissed(true);
          }, 2000);
        } else {
          toast.error(result.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('stickyEmailBarDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-500/95 to-orange-500/95 backdrop-blur-sm border-b-2 border-yellow-400 shadow-lg">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
          {/* Message */}
          <div className="flex items-center gap-2 text-purple-900 font-semibold text-sm lg:text-base flex-shrink-0">
            <span className="text-lg lg:text-xl">🚀</span>
            <span>Launching Feb 17 - Get notified for early bird pricing</span>
          </div>

          {/* Email Form */}
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-1 items-center gap-2 w-full lg:w-auto max-w-md">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/90 border-purple-300 text-purple-900 placeholder-purple-400 py-1.5 lg:py-2 text-sm"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-purple-900 hover:bg-purple-800 text-white font-semibold px-4 py-1.5 lg:py-2 text-sm whitespace-nowrap"
              >
                {isLoading ? '...' : 'Subscribe'}
              </Button>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-purple-900 font-semibold text-sm lg:text-base">
              <Mail className="h-4 w-4" />
              <span>You're signed up! Check your email.</span>
            </div>
          )}

          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="text-purple-900 hover:text-purple-700 transition-colors p-1 flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyEmailBar;

