import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { subscribeEmail } from '../utils/api';

const EmailSubscriptionModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Check for network connectivity
      if (!navigator.onLine) {
        setError('You appear to be offline. Please check your internet connection and try again.');
        toast.error('Network connection error');
        setLoading(false);
        return;
      }

      const result = await subscribeEmail(email);
      
      if (result.success) {
        setSuccess(true);
        shootConfetti();
        toast.success(result.message || 'Successfully subscribed to our mailing list!');
      } else {
        setError(result.message || 'There was an error subscribing. Please try again later.');
        if (result.message.includes('already subscribed')) {
          toast.info("You're already on our mailing list!");
        } else {
          toast.error(result.message || 'An unexpected error occurred. Please try again.');
        }
      }
    } catch (err) {
      console.error('Error during subscription:', err);
      setError('There was an error subscribing. Please try again later.');
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setEmail('');
    setSuccess(false);
    onClose();
  };

  // Add Discord navigation handler
  const handleDiscordJoin = () => {
    window.open('https://discord.gg/PVrgZBmcMq', '_blank', 'noopener,noreferrer');
    closeModal();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-[60] pb-20"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-purple-950 border border-purple-500/30 rounded-lg shadow-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center w-full pr-6">
                <Mail className="mr-2 h-5 w-5 text-yellow-400" />
                Get Elekin Updates
              </h2>
              <button 
                onClick={closeModal}
                className="text-purple-300 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {success ? (
              <div className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-green-400 mb-2">Welcome! You're Signed Up!</h3>
                <p className="text-purple-200 mb-6">
                  Lightning and Crystal decks are in the shop. You&apos;ll hear when Frost, Lava, and the Kinbrold world drop.
                  <br /><span className="text-sm mt-2 block opacity-80">
                    Check your inbox for a welcome email, then hop in Discord.
                  </span>
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => { window.location.href = '/shop'; }}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold py-6 text-md"
                  >
                    Shop Lightning & Crystal →
                  </Button>
                  <Button 
                    onClick={handleDiscordJoin}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 text-md"
                  >
                    Join Our Discord Community →
                  </Button>
                  <Button 
                    onClick={closeModal}
                    className="w-full bg-purple-900/50 hover:bg-purple-700/50 text-white py-6 text-md"
                  >
                    Continue Exploring
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Why subscribe */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-4">
                  <h3 className="text-yellow-400 font-bold mb-3 text-center">You&apos;ll hear about:</h3>
                  <div className="space-y-2 text-sm text-purple-200">
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      <span>New decks after Lightning & Crystal sell through</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      <span>Browser play and Kinbrold world updates</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      <span>Store nights and community events</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-2">✓</span>
                      <span>Discord and card reveals</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-purple-200 mb-4 text-center">
                  <span className="text-yellow-400 font-semibold">Play free. Buy the boxes. Watch the world grow.</span>
                  <br />
                  <span className="text-sm opacity-80">Stay in the loop as we build Kinbrold.</span>
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="your.email@example.com"
                    className="bg-purple-900/50 border-purple-500/30 text-white placeholder-purple-300 py-6 text-md"
                  />
                  {error && (
                    <p className="text-red-400 text-sm mt-1">{error}</p>
                  )}
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1 border-purple-500/30 hover:bg-purple-800/30 hover:text-white py-6 text-md"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold py-6 text-md"
                    disabled={loading}
                  >
                    {loading ? 'Signing You Up...' : 'Get Campaign Updates'}
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmailSubscriptionModal; 