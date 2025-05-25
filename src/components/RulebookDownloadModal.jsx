import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Mail, Loader2 } from 'lucide-react';

const RulebookDownloadModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      // Send rulebook email (which includes conditional welcome email)
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-rulebook-email`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message || 'Rulebook sent successfully! Check your email for the PDF attachment.');
        setMessageType('success');
        setTimeout(() => {
          onClose();
          setEmail('');
          setMessage('');
          setMessageType('');
        }, 3000);
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || 'Failed to send rulebook. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error sending rulebook. Please try again.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-[#1A103C] border border-purple-500/30 rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Download className="w-6 h-6 text-yellow-500" />
                Download Rulebook
              </h2>
              <button
                onClick={onClose}
                className="text-purple-300 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-purple-200 mb-4">
                Enter your email address and we'll send you the complete Elekin rulebook as a PDF attachment!
              </p>
              <div className="bg-purple-950/50 p-4 rounded-lg border border-purple-500/30">
                <h3 className="text-yellow-400 font-semibold mb-2">📖 What You'll Receive:</h3>
                <ul className="text-purple-200 text-sm space-y-1">
                  <li>• 📎 <strong>Elekin_Rulebook.pdf</strong> - Complete downloadable guide</li>
                  <li>• Complete game rules and mechanics</li>
                  <li>• Strategy guides and deck building tips</li>
                  <li>• Lore and world-building content</li>
                  <li>• Tournament formats and rules</li>
                </ul>
              </div>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded-lg ${
                messageType === 'success' 
                  ? 'bg-green-900/50 border border-green-500/50 text-green-200' 
                  : 'bg-red-900/50 border border-red-500/50 text-red-200'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-purple-200 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-purple-950/50 border border-purple-500/30 rounded-lg 
                             text-white placeholder-purple-400 focus:border-yellow-500 focus:outline-none 
                             focus:ring-2 focus:ring-yellow-500/20 transition-colors"
                    placeholder="your.email@example.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-purple-800 hover:bg-purple-700 text-white rounded-lg 
                           transition-colors font-medium"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  className="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-400 text-purple-900 rounded-lg 
                           transition-colors font-bold disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Send Rulebook
                    </>
                  )}
                </button>
              </div>
            </form>

            <p className="text-xs text-purple-400 mt-4 text-center">
              If you're not already subscribed, we'll also add you to our mailing list and send a welcome email with exclusive updates.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RulebookDownloadModal; 