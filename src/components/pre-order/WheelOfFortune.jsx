import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GOLD = '#f5d142';
const PURPLE_DARK = '#2a0e35';
const PURPLE_LIGHT = '#5a2380';

const PRIZES = [
  { option: 'Free Pack', type: 'free', weight: 19 },
  { option: '15% Off', type: 'discount', percent: 0.15, weight: 75 },
  { option: 'Free Game Mat', type: 'free', weight: 0.5 },
  { option: '2 Free Packs', type: 'free', weight: 2 },
  { option: '20% Off', type: 'discount', percent: 0.20, weight: 5 },
  { option: 'Free Deck', type: 'free', weight: 0.5 }, // Changed from 'Free Structure Deck'
];

const totalWeight = PRIZES.reduce((sum, p) => sum + p.weight, 0);

function pickWeightedIndex() {
  const rand = Math.random() * totalWeight;
  let accumulatedWeight = 0;
  for (let i = 0; i < PRIZES.length; i++) {
    accumulatedWeight += PRIZES[i].weight;
    if (rand < accumulatedWeight) {
      return i;
    }
  }
  return PRIZES.length - 1; // fallback
}

function getFreePrizeNote(option) {
  switch (option) {
    case 'Free Pack':
    case '2 Free Packs':
    case '3 Free Packs':
      return 'Your free pack(s) will be added to your pre-order shipment. Thank you!';
    case 'Free Game Mat':
      return 'Your free Game Mat will be added to your pre-order shipment. Thank you!';
    case 'Free Deck':
      return 'Your free Starter Deck will be added to your pre-order shipment. Thank you!';
    default:
      return 'Your free prize will be added to your pre-order shipment. Thank you!';
  }
}

const WheelOfFortune = () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [prizeWon, setPrizeWon] = useState(null);
  const [email, setEmail] = useState('');
  const [discountCode, setDiscountCode] = useState(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSpinClick = () => {
    if (!spinning) {
      const newPrizeNumber = pickWeightedIndex();
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
      setSpinning(true);
    }
  };

  const handlePrizeClaim = async () => {
    if (!prizeWon || !email) return;

    setSending(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const base = import.meta.env.DEV ? 'http://localhost:3001' : '';
      let endpoint = '';
      let payload = {};

      if (prizeWon.type === 'discount') {
        endpoint = `${base}/api/spin-claim`;
        payload = { email, percent: prizeWon.percent };
      } else if (prizeWon.type === 'free') {
        endpoint = `${base}/api/record-winner`;
        payload = { email, prize: prizeWon.option };
      }

      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Request failed');
      
      if (prizeWon.type === 'discount') {
        setDiscountCode(data.code || 'CHECK EMAIL');
        setSuccessMessage('Success! Your discount code has been sent to your email.');
      } else {
        setSuccessMessage('Success! Your prize has been recorded and will be added to your order.');
      }

    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  if (prizeWon) {
    if (successMessage) {
      return (
        <div className="text-center p-8 bg-purple-900/50 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">🎉 Congratulations! 🎉</h2>
          <p className="text-lg text-white mb-4">{successMessage}</p>
          {prizeWon.type === 'discount' && discountCode &&
            <p className="text-xl text-white">Your code is: <strong className="text-yellow-400">{discountCode}</strong></p>
          }
        </div>
      );
    }

    const isDiscount = prizeWon.type === 'discount';
    const title = `You Won: ${prizeWon.option}!`;
    const promptText = isDiscount 
      ? 'Enter your email to receive your unique promo code:'
      : 'Enter the email you used for your order to claim your prize:';
    const subText = isDiscount
      ? 'Promo applies up to $25 off. One use per customer.'
      : getFreePrizeNote(prizeWon.option);
    const buttonText = isDiscount ? 'Get My Code' : 'Claim My Prize';

    return (
      <div className="text-center p-8 bg-purple-900/50 rounded-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">{title}</h2>
        <p className="text-lg text-white mb-1">{promptText}</p>
        <p className="text-xs text-purple-200 mb-4">{subText}</p>
        <div className="mx-auto w-full max-w-md">
          <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" 
            className="mb-3" 
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <Button onClick={handlePrizeClaim} disabled={sending} className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold">
          {sending ? 'Processing...' : buttonText}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-purple-900/50 rounded-lg">
      <h2 className="text-3xl font-bold text-yellow-400 mb-4">Spin to Win!</h2>
      <div style={{ boxShadow: `0 0 28px ${GOLD}88, 0 0 60px ${GOLD}44`, borderRadius: '50%', padding: '6px', background: GOLD }}>
        <div style={{ boxShadow: `inset 0 0 18px ${GOLD}55`, borderRadius: '50%', background: '#000' }}>
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={prizeNumber}
            data={PRIZES.map(p => ({ option: p.option }))}
            onStopSpinning={() => {
              setMustSpin(false);
              setSpinning(false);
              setPrizeWon(PRIZES[prizeNumber]);
            }}
            backgroundColors={[PURPLE_DARK, PURPLE_LIGHT]}
            textColors={[GOLD]}
            outerBorderColor={GOLD}
            outerBorderWidth={8}
            innerBorderColor={GOLD}
            innerBorderWidth={2}
            radiusLineColor={GOLD}
            radiusLineWidth={2}
            pointerProps={{
              style: {
                fill: PURPLE_DARK,
                stroke: GOLD,
                strokeWidth: 5,
                filter: `drop-shadow(0 0 8px ${GOLD}) drop-shadow(0 0 18px ${GOLD}AA)`
              }
            }}
          />
        </div>
      </div>
      <Button onClick={handleSpinClick} disabled={spinning} className="mt-4 bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold">
        {spinning ? 'Spinning...' : 'Spin the Wheel'}
      </Button>
    </div>
  );
};

export default WheelOfFortune; 