import { useState, useEffect } from 'react';

const LaunchCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const launchDate = new Date('2025-06-01T00:00:00'); // June 1st, 2025

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center w-full">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-purple-900/50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400">{timeLeft.days}</div>
          <div className="text-sm text-purple-200">Days</div>
        </div>
        <div className="bg-purple-900/50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400">{timeLeft.hours}</div>
          <div className="text-sm text-purple-200">Hours</div>
        </div>
        <div className="bg-purple-900/50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400">{timeLeft.minutes}</div>
          <div className="text-sm text-purple-200">Minutes</div>
        </div>
        <div className="bg-purple-900/50 p-4 rounded-lg">
          <div className="text-3xl font-bold text-yellow-400">{timeLeft.seconds}</div>
          <div className="text-sm text-purple-200">Seconds</div>
        </div>
      </div>
      <p className="text-purple-200">Until Launch Month June 2025</p>
    </div>
  );
};

export default LaunchCountdown; 