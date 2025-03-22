import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Mail, CheckCircle } from 'lucide-react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const EmailSubscriptionModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

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

    try {
      // Insert into subscribers table
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date() }]);

      if (error) {
        console.error('Error adding subscriber:', error);
        if (error.code === '23505') { // Unique violation (email already exists)
          toast.info("You&apos;re already on our mailing list!");
          setSuccess(true);
        } else {
          toast.error('Failed to subscribe. Please try again.');
        }
      } else {
        setSuccess(true);
        shootConfetti();
        toast.success('Successfully subscribed to our mailing list!');
      }
    } catch (error) {
      console.error('Subscription error:', error);
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-purple-950 border border-purple-500/30 rounded-lg shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white flex items-center justify-center w-full pr-6">
                <Mail className="mr-2 h-5 w-5 text-yellow-400" />
                Join Our Mailing List
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
                <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
                <p className="text-purple-200 mb-6">
                  You&apos;re now on our mailing list and will be the first to know when Elekin launches!
                </p>
                <div className="space-y-3">
                  <Button 
                    onClick={() => navigate('/login', { state: { mode: 'signup' } })}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold py-6 text-md"
                  >
                    Create an Account for More Early Benefits
                  </Button>
                  <Button 
                    onClick={closeModal}
                    className="w-full bg-purple-900/50 hover:bg-purple-700/50 text-white py-6 text-md"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-purple-200 mb-4">
                  Stay updated with the latest news, card releases, and be the first to know when the game launches!
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
                    className="bg-purple-900/50 border-purple-500/30 text-white placeholder-purple-300 py-6 text-lg"
                  />
                </div>
                
                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeModal}
                    className="flex-1 border-purple-500/30 hover:bg-purple-800/30 py-6 text-lg"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-semibold py-6 text-lg"
                    disabled={loading}
                  >
                    {loading ? 'Subscribing...' : 'Subscribe'}
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