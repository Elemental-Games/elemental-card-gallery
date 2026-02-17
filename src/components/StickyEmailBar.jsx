import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { kickstarterConfig } from '@/config/kickstarter';

const formatCurrency = (amount) => {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `$${Math.round(amount / 1000)}K`;
  return `$${amount.toLocaleString()}`;
};

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

  const { raised, goal, url } = kickstarterConfig;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-600/95 to-emerald-600/95 backdrop-blur-sm border-b-2 border-green-400 shadow-lg">
      <div className="container mx-auto px-4 py-2 lg:py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-4">
          {/* Message */}
          <div className="flex items-center gap-2 text-white font-semibold text-sm lg:text-base flex-shrink-0">
            <span className="text-lg lg:text-xl">🚀</span>
            <span>
              Kickstarter is live! {formatCurrency(raised)} raised of {formatCurrency(goal)} goal
            </span>
          </div>

          {/* CTA Button */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button
              className="bg-white hover:bg-gray-100 text-green-700 font-bold px-6 py-1.5 lg:py-2 text-sm whitespace-nowrap rounded-lg"
            >
              Back Now →
            </Button>
          </a>

          {/* Dismiss Button */}
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
