import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PayPalButton } from './PayPalButton';

export function PayPalForm() {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleSuccess = async (order) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/record-paypal-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          amount: Number(amount),
          displayName: isAnonymous ? 'Anonymous' : displayName,
          isAnonymous,
          subscribeToUpdates,
          paypalEmail: order.payer.email_address
        }),
      });

      if (!response.ok) throw new Error('Failed to record donation');
    } catch (error) {
      console.error('Record donation error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>Select Amount (USD)</Label>
          <div className="grid grid-cols-3 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                onClick={() => setAmount(preset.toString())}
                className={`p-2 rounded border ${
                  amount === preset.toString()
                    ? 'bg-yellow-400 text-purple-900'
                    : 'border-yellow-400/50 hover:border-yellow-400'
                }`}
              >
                ${preset}
              </button>
            ))}
          </div>
          <Input
            type="number"
            min="1"
            step="1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Custom amount"
            className="mt-2"
          />
        </div>

        {!isAnonymous && (
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we display your name?"
            />
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={isAnonymous}
            onCheckedChange={setIsAnonymous}
          />
          <Label htmlFor="anonymous">Make donation anonymous</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="updates"
            checked={subscribeToUpdates}
            onCheckedChange={setSubscribeToUpdates}
          />
          <Label htmlFor="updates">Subscribe to updates</Label>
        </div>

        {amount && Number(amount) >= 1 && (
          <PayPalButton
            amount={amount}
            onSuccess={handleSuccess}
            isProcessing={isProcessing}
            metadata={{
              displayName: isAnonymous ? 'Anonymous' : displayName,
              isAnonymous,
              subscribeToUpdates
            }}
          />
        )}
      </CardContent>
    </Card>
  );
} 