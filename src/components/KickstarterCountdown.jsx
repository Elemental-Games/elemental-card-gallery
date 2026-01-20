import { useState, useEffect } from 'react';
import { trackCountdownView } from '../utils/analytics';

const KickstarterCountdown = ({ showSeconds = false, showLabel = true, forceSingleRow = false, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Launch date: February 17, 2026, 12:00 PM EST
    const launchDate = new Date('2026-02-17T12:00:00-05:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        // Launch has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Track countdown view on mount
    trackCountdownView();

    return () => clearInterval(timer);
  }, []);

  // If launch has passed, show "Launch Day!" message
  if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl lg:text-3xl font-bold text-yellow-400">
          🚀 Launch Day!
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center w-full ${className}`}>
      {showLabel && (
        <p className="text-purple-200 mb-4 text-sm lg:text-base">Launching in:</p>
      )}
      <div className={`grid ${
        forceSingleRow 
          ? (showSeconds ? 'grid-cols-4' : 'grid-cols-3')
          : (showSeconds ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-3')
      } gap-2 lg:gap-3 mb-2 ${forceSingleRow ? 'max-w-4xl' : 'max-w-2xl'} mx-auto`}>
        <div className={`bg-purple-900/50 border border-yellow-500/30 ${forceSingleRow ? 'p-2 lg:p-3' : 'p-4 lg:p-5'} rounded-lg min-w-0`}>
          <div className={`${forceSingleRow ? 'text-xl lg:text-3xl xl:text-4xl' : 'text-3xl lg:text-5xl'} font-bold text-yellow-400 mb-1`}>{timeLeft.days}</div>
          <div className={`${forceSingleRow ? 'text-[10px] lg:text-xs' : 'text-xs lg:text-sm'} text-purple-200 uppercase tracking-wide`}>Days</div>
        </div>
        <div className={`bg-purple-900/50 border border-yellow-500/30 ${forceSingleRow ? 'p-2 lg:p-3' : 'p-4 lg:p-5'} rounded-lg min-w-0`}>
          <div className={`${forceSingleRow ? 'text-xl lg:text-3xl xl:text-4xl' : 'text-3xl lg:text-5xl'} font-bold text-yellow-400 mb-1`}>{timeLeft.hours}</div>
          <div className={`${forceSingleRow ? 'text-[10px] lg:text-xs' : 'text-xs lg:text-sm'} text-purple-200 uppercase tracking-wide`}>Hours</div>
        </div>
        <div className={`bg-purple-900/50 border border-yellow-500/30 ${forceSingleRow ? 'p-2 lg:p-3' : 'p-4 lg:p-5'} rounded-lg min-w-0`}>
          <div className={`${forceSingleRow ? 'text-xl lg:text-3xl xl:text-4xl' : 'text-3xl lg:text-5xl'} font-bold text-yellow-400 mb-1`}>{timeLeft.minutes}</div>
          <div className={`${forceSingleRow ? 'text-[10px] lg:text-xs' : 'text-xs lg:text-sm'} text-purple-200 uppercase tracking-wide`}>Minutes</div>
        </div>
        {showSeconds && (
          <div className={`bg-purple-900/50 border border-yellow-500/30 ${forceSingleRow ? 'p-2 lg:p-3' : 'p-4 lg:p-5'} rounded-lg min-w-0`}>
            <div className={`${forceSingleRow ? 'text-xl lg:text-3xl xl:text-4xl' : 'text-3xl lg:text-5xl'} font-bold text-yellow-400 mb-1`}>{timeLeft.seconds}</div>
            <div className={`${forceSingleRow ? 'text-[10px] lg:text-xs' : 'text-xs lg:text-sm'} text-purple-200 uppercase tracking-wide`}>Seconds</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KickstarterCountdown;

