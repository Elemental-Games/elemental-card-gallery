import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const StickyEmailBar = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem('stickyBarDismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('stickyBarDismissed', 'true');
  };

  if (isDismissed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-700/95 to-cyan-700/95 backdrop-blur-sm border-b-2 border-cyan-400 shadow-lg">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
          <div className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base flex-shrink-0">
            <span>Lightning & Crystal are in the shop. Play the browser beta free.</span>
          </div>
          <Link to="/shop" className="flex-shrink-0">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold px-6 py-1.5 lg:py-2 text-sm whitespace-nowrap rounded-lg">
              Shop Decks →
            </Button>
          </Link>
          <button
            onClick={handleDismiss}
            className="text-white/80 hover:text-white transition-colors p-1 flex-shrink-0"
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
