import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createDiscountCode } from '@/lib/shopify-admin';

const WheelOfFortune = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState(null);
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState(null);

  const data = [
    { option: '10% Discount', value: 0.1 },
    { option: 'Free Booster Pack', value: null },
    { option: '20% Discount', value: 0.2 },
    { option: 'Free Game Mat', value: null },
    { option: 'Free Starter Deck', value: null },
    { option: 'Try Again!', value: null },
  ];

  const handleSpinClick = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * data.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setSpinning(true);
    }
  };

  const handlePrizeClaim = async () => {
    if (prizeWon && prizeWon.value && email) {
      try {
        const code = await createDiscountCode(
          `SPIN_WIN_${Date.now()}`,
          prizeWon.value,
          1
        );
        setDiscountCode(code);
      } catch (error) {
        console.error(error);
        alert('Failed to create discount code. Please try again.');
      }
    }
  };

  if (discountCode) {
    return (
      <div className="text-center p-8 bg-purple-900/50 rounded-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Congratulations!</h2>
        <p className="text-lg text-white mb-4">Here is your discount code:</p>
        <p className="text-4xl font-bold text-yellow-400 bg-purple-800/50 rounded-lg p-4">
          {discountCode}
        </p>
      </div>
    );
  }

  if (prizeWon) {
    if (prizeWon.value) {
      return (
        <div className="text-center p-8 bg-purple-900/50 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">You Won: {prizeWon.option}!</h2>
          <p className="text-lg text-white mb-4">Enter your email to claim your prize:</p>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="mb-4"
          />
          <Button onClick={handlePrizeClaim} className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold">
            Claim Prize
          </Button>
        </div>
      );
    }
    return (
      <div className="text-center p-8 bg-purple-900/50 rounded-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">You Won: {prizeWon.option}!</h2>
        <p className="text-lg text-white">We&apos;ll be in touch about your prize!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-purple-900/50 rounded-lg">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Spin to Win!</h2>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data.map(prize => ({ option: prize.option }))}
        onStopSpinning={() => {
          setMustSpin(false);
          setSpinning(false);
          setPrizeWon(data[prizeNumber]);
        }}
        backgroundColors={['#3e3e3e', '#df3428']}
        textColors={['#ffffff']}
      />
      <Button onClick={handleSpinClick} disabled={spinning} className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold">
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
    </div>
  );
};

export default WheelOfFortune; 