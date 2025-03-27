import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import confetti from 'canvas-confetti';
import { CheckCircle, X, Info } from 'lucide-react';
import { subscribeEmail } from '../lib/supabase';

const contentBubbles = [
  {
    id: 'childhood',
    title: 'Childhood Dreams',
    content: 'Ever since I was a kid, I\'ve been captivated by the world of Pokémon, games like Yu-Gi-Oh and Magic: The Gathering, and shows like Dragon Ball Z and Avatar: The Last Airbender. These experiences weren\'t just entertainment—they were the seeds of something I knew I wanted to create someday.',
    position: { x: -200, y: -150 }
  },
  {
    id: 'journey',
    title: 'Journey of Creation',
    content: 'My game design journey started formally during my freshman year of college, where I developed VR games during an internship. But the elements—fire, water, earth, air—have always called to me. Every game concept I sketched returned to elemental powers in some form, until finally, Elekin was born.',
    position: { x: 200, y: -150 }
  },
  {
    id: 'world',
    title: 'World of Kinbrold',
    content: 'Elekin takes place in Kinbrold, a world divided into five distinct Kingdoms spanning six primary regions. At the center lies Evermere, the only non-elemental kingdom where the core of the card crafters reside.',
    position: { x: -200, y: 150 }
  },
  {
    id: 'solo',
    title: 'Solo Mission',
    content: 'This project is both intensely personal and incredibly ambitious. As a solo creator, every aspect of Elekin represents my vision and dedication. I\'m currently in the final phases of balancing the gameplay, with rules finalized and card interactions undergoing rigorous testing.',
    position: { x: 200, y: 150 }
  }
];

// Bubble animation variants
const bubbleAnimation = {
  initial: {
    scale: 1
  },
  hover: { 
    scale: 1.1,
    rotate: [0, 2, -2, 1, -1, 0],
    transition: {
      duration: 0.5,
      scale: {
        duration: 0.2
      },
      rotate: {
        repeat: Infinity,
        repeatType: "mirror",
        duration: 0.5
      }
    }
  }
};

const AboutUsPage = () => {
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        // Show success popup and confetti
        setConfirmationEmail(email);
        setAlreadySubscribed(false);
        setShowConfirmation(true);
        shootConfetti();
        // Reset form
        setEmail('');
      } else {
        // If already subscribed, show different message
        if (result.message && result.message.includes('already subscribed')) {
          setConfirmationEmail(email);
          setAlreadySubscribed(true);
          setShowConfirmation(true);
          shootConfetti(); // Still celebrate their enthusiasm
          setEmail('');
        } else {
          alert(result.message || 'Failed to subscribe. Please try again.');
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>About Us - Elemental Games</title>
        <meta name="description" content="Learn about Elemental Games and our journey creating Elekin: Masters of Kinbrold, an elemental-based trading card game." />
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://elementalgames.gg/about" />
      </Helmet>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-[#1A103C]"
      >
        <div className="container mx-auto px-4 pt-8 pb-8">
          <h1 className="text-4xl font-bold mb-8 text-center">About Elemental Games</h1>

          <div className="relative h-[550px] w-full flex items-center justify-center">
            {/* Connection Lines - Moved before bubbles to be behind them */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {contentBubbles.map((bubble) => {
                // Calculate line endpoints with adjustments to connect to edges
                const centerX = 50; // Center X as percentage
                const centerY = 50; // Center Y as percentage
                
                // Calculate angle for positioning connection point
                const dx = bubble.position.x;
                const dy = bubble.position.y;
                const angle = Math.atan2(dy, dx);
                
                // Center photo radius (as percentage of container)
                const centerRadius = 8; // ~48px in a 600px container
                // Bubble radius (as percentage of container)
                const bubbleRadius = 5.3; // ~32px in a 600px container
                
                // Calculate connection points
                const centerConnectX = centerX + centerRadius * Math.cos(angle);
                const centerConnectY = centerY + centerRadius * Math.sin(angle);
                
                // Calculate how far from center the bubble is positioned (as percentage)
                const bubbleCenterX = centerX + (bubble.position.x / 600 * 100);
                const bubbleCenterY = centerY + (bubble.position.y / 600 * 100);
                
                // Calculate bubble connection point
                const bubbleConnectX = bubbleCenterX - bubbleRadius * Math.cos(angle);
                const bubbleConnectY = bubbleCenterY - bubbleRadius * Math.sin(angle);
                
                return (
                  <motion.line
                    key={`line-${bubble.id}`}
                    x1={`${centerConnectX}%`}
                    y1={`${centerConnectY}%`}
                    x2={`${bubbleConnectX}%`}
                    y2={`${bubbleConnectY}%`}
                    stroke="rgba(168, 85, 247, 0.5)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Center Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="relative group">
                <img 
                  src="/me.jpeg" 
                  alt="Mark Diorio" 
                  className="w-48 h-48 rounded-full border-4 border-purple-500/50 object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-full bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="mt-4 text-center">
                <h2 className="text-2xl font-bold text-yellow-400">Mark Diorio</h2>
                <p className="text-purple-200">Founder of Elemental Games</p>
              </div>
            </motion.div>

            {/* Content Bubbles */}
            {contentBubbles.map((bubble, index) => (
              <motion.div
                key={bubble.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  x: bubble.position.x,
                  y: bubble.position.y
                }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1
                }}
                className="absolute z-20"
              >
                <motion.div
                  variants={bubbleAnimation}
                  initial="initial"
                  whileHover="hover"
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedBubble(bubble.id)}
                >
                  <div className="w-32 h-32 rounded-full bg-purple-800 border-2 border-purple-500/50 flex items-center justify-center p-4 text-center shadow-md">
                    <h3 className="text-lg font-semibold text-yellow-400">{bubble.title}</h3>
                  </div>
                  
                  <div className="absolute inset-0 rounded-full bg-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Two-column layout for Join and Connect */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Join the Journey */}
            <div className="bg-purple-900/50 p-6 rounded-lg border border-purple-500/30 shadow-lg flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Join the Journey</h2>
              <p className="text-purple-200">
                The Elekin journey is just beginning! We&apos;re currently in development and working towards a Kickstarter launch in Summer 2025. Join us early to be part of something special from the very beginning.
              </p>
            </div>

            {/* Stay Connected */}
            <div className="bg-purple-900/50 p-6 rounded-lg border border-purple-500/30 shadow-lg flex flex-col justify-center items-center text-center">
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Stay Connected</h2>
              <p className="text-purple-200 mb-4">
                Follow us for updates on Elekin development.
              </p>
              <div className="flex justify-center gap-6 mb-6">
                <a 
                  href="https://x.com/elekinTCG" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-black hover:bg-gray-800 rounded-full transition-colors duration-300 text-white font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-current">
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/>
                  </svg>
                </a>
                <a 
                  href="https://discord.gg/qXNWh4dMve" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-colors duration-300 text-white font-medium flex items-center"
                >
                  <span className="mr-2">Discord</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.608 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1634-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                </a>
              </div>
              
              <div className="w-full">
                <form onSubmit={handleSubmit} className="flex">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-grow px-4 py-2 bg-purple-950/50 border border-purple-500/30 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-purple-400 text-white"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium rounded-r-lg transition-colors duration-300"
                  >
                    {isLoading ? "..." : "Subscribe"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Centered Popup Content for Bubbles */}
      <AnimatePresence>
        {selectedBubble && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedBubble(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-purple-900 p-6 rounded-lg border-2 border-purple-500/50 max-w-md w-full shadow-[0_0_25px_rgba(139,92,246,0.3)]"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
                {contentBubbles.find(b => b.id === selectedBubble)?.title}
              </h2>
              <p className="text-purple-200 mb-6">
                {contentBubbles.find(b => b.id === selectedBubble)?.content}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => setSelectedBubble(null)}
                  className="px-6 py-2 bg-purple-700 hover:bg-purple-600 rounded-lg transition-colors duration-300 text-yellow-100 shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subscription Confirmation Popup */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-purple-900 p-6 rounded-lg border-2 border-purple-500/50 max-w-md w-full shadow-[0_0_25px_rgba(139,92,246,0.3)] relative"
            >
              <button 
                onClick={() => setShowConfirmation(false)} 
                className="absolute top-3 right-3 text-purple-300 hover:text-white"
              >
                <X size={20} />
              </button>
              
              <div className="text-center py-4">
                {alreadySubscribed ? (
                  <>
                    <Info className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-blue-400 mb-2">Already Subscribed!</h3>
                    <p className="text-purple-200 mb-6">
                      It looks like {confirmationEmail} is already on our subscriber list. Thanks for your enthusiasm! We appreciate your continued support.
                      <br />
                      <span className="text-sm mt-2 block opacity-80">
                        We&apos;ll keep you updated on all the exciting developments.
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-green-400 mb-2">Thank You!</h3>
                    <p className="text-purple-200 mb-6">
                      Thanks for subscribing with {confirmationEmail}! You&apos;ll be among the first to know when Elekin launches.
                      <br />
                      <span className="text-sm mt-2 block opacity-80">
                        A welcome email should arrive in your inbox shortly.
                      </span>
                    </p>
                  </>
                )}
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-6 py-2 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-medium rounded-lg transition-colors duration-300"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutUsPage;
