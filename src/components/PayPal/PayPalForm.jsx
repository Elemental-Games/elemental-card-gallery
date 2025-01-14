import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { PayPalButton } from './PayPalButton';

export function PayPalForm() {
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [displayName, setDisplayName] = useState('');

  const presetAmounts = [5, 10, 25, 50, 100];

  return (
    <Card className="w-full opacity-75">
      <CardContent className="space-y-6 pt-6">
        <div className="space-y-2">
          <Label>Select Amount (USD)</Label>
          <div className="grid grid-cols-3 gap-2">
            {presetAmounts.map((preset) => (
              <button
                key={preset}
                disabled
                className={`p-2 rounded border cursor-not-allowed
                  border-yellow-400/20 text-yellow-400/50`}
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
            disabled
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name (optional)</Label>
            <Input
              id="displayName"
              disabled
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we display your name?"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
              disabled
            />
            <Label htmlFor="anonymous" className="opacity-50">Make my donation anonymous</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribe"
              checked={subscribeToUpdates}
              onCheckedChange={setSubscribeToUpdates}
              disabled
            />
            <Label htmlFor="subscribe" className="opacity-50">Subscribe to project updates</Label>
          </div>
        </div>

        <PayPalButton
          amount={amount}
          metadata={{
            displayName: isAnonymous ? 'Anonymous' : displayName,
            isAnonymous,
            subscribeToUpdates
          }}
          onSuccess={() => setIsProcessing(false)}
          isProcessing={isProcessing}
          disabled
        />
      </CardContent>
    </Card>
  );
} 