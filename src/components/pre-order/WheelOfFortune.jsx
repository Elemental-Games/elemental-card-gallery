import { useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const GOLD = '#f5d142';
const PURPLE_DARK = '#2a0e35';
const PURPLE_LIGHT = '#5a2380';

const PRIZES = [
  { option: 'Free Pack', type: 'free', weight: 5 },
  { option: '10% Off', type: 'discount', percent: 0.10, weight: 60 },
  { option: 'Free Game Mat', type: 'free', weight: 1 },
  { option: '2 Free Packs', type: 'free', weight: 1 },
  { option: '20% Off', type: 'discount', percent: 0.20, weight: 30 },
  { option: 'Free Deck', type: 'free', weight: 1 },
  { option: '50% Off', type: 'discount', percent: 0.50, weight: 1 },
  { option: '3 Free Packs', type: 'free', weight: 1 },
];

function pickWeightedIndex(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  const r = Math.random() * total;
  let acc = 0;
  for (let i = 0; i < weights.length; i += 1) {
    acc += weights[i];
    if (r < acc) return i;
  }
  return weights.length - 1;
}

function getFreePrizeNote(option) {
  if (option === 'Free Game Mat') {
    return 'You will receive Dumoles or Guardian\'s Sanctuary — chosen at random unless you email mark@elementalgames.gg with a specific request.';
  }
  if (option === 'Free Deck') {
    return 'You will receive a Structure Deck (Lightning or Crystal) — chosen at random unless you email mark@elementalgames.gg with a specific request.';
  }
  if (option === 'Free Pack' || option === '2 Free Packs' || option === '3 Free Packs') {
    return 'Free pack(s) will be added to your pre-order when we pack your shipment.';
  }
  return 'We will add your free item(s) to your pre-order when packing.';
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

  const handleSpinClick = () => {
    if (!mustSpin) {
      const idx = pickWeightedIndex(PRIZES.map(p => p.weight));
      setPrizeNumber(idx);
      setMustSpin(true);
      setSpinning(true);
    }
  };

  const handlePrizeClaim = async () => {
    if (!(prizeWon && prizeWon.type === 'discount' && prizeWon.percent && email)) return;
    try {
      setSending(true);
      setError(null);
      const resp = await fetch('/api/spin-claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, percent: prizeWon.percent })
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || 'Failed to generate code');
      setDiscountCode(data.code || 'CHECK EMAIL');
    } catch (e) {
      setError(e.message);
    } finally {
      setSending(false);
    }
  };

  if (discountCode) {
    return (
      <div className="text-center p-8 bg-purple-900/50 rounded-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-4">Congratulations!</h2>
        <p className="text-lg text-white mb-2">Your unique promo code has been emailed.</p>
        <p className="text-sm text-purple-200">Applies up to $25 off. One use per customer.</p>
        <p className="text-xs text-purple-300 mt-2">Code preview: {discountCode}</p>
      </div>
    );
  }

  if (prizeWon) {
    if (prizeWon.type === 'discount') {
      return (
        <div className="text-center p-8 bg-purple-900/50 rounded-lg">
          <h2 className="text-3xl font-bold text-yellow-400 mb-4">You Won: {prizeWon.option}!</h2>
          <p className="text-lg text-white mb-1">Enter your email to receive your unique promo code:</p>
          <p className="text-xs text-purple-200 mb-4">Promo applies up to $25 off. One use per customer.</p>
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
            {sending ? 'Sending...' : 'Get My Code'}
          </Button>
        </div>
      );
    }
    // Free prize flow: ask for order email and record winner
    return (
      <div className="text-center p-8 bg-purple-900/50 rounded-lg">
        <h2 className="text-3xl font-bold text-yellow-400 mb-2">You Won: {prizeWon.option}!</h2>
        <p className="text-sm text-purple-200 mb-4">{getFreePrizeNote(prizeWon.option)}</p>
        <div className="mx-auto w-full max-w-md">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter the email used on your order"
            className="mb-3"
          />
        </div>
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <Button
          onClick={async () => {
            try {
              setSending(true);
              setError(null);
              const resp = await fetch('/api/record-winner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, prize: prizeWon.option })
              });
              const data = await resp.json();
              if (!resp.ok) throw new Error(data.error || 'Failed to record winner');
              setDiscountCode('RECORDED');
            } catch (e) {
              setError(e.message);
            } finally {
              setSending(false);
            }
          }}
          disabled={sending}
          className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold"
        >
          {sending ? 'Saving...' : 'Save Winner Email'}
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