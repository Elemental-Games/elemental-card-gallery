import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { CardElement, useStripe, useElements } from '@stripe/stripe-js';

const USDDonationForm = () => {
  const [amount, setAmount] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const response = await fetch('/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          displayName: isAnonymous ? 'Anonymous' : displayName,
          message,
        }),
      });

      const { clientSecret } = await response.json();

      // Use Stripe.js to handle the payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { name: displayName },
        },
      });

      if (error) throw error;

      console.log('Donation successful');
    } catch (error) {
      console.error('Donation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-purple-900/90">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preset Amounts */}
          <div className="grid grid-cols-5 gap-2">
            {presetAmounts.map((preset) => (
              <Button
                key={preset}
                type="button"
                variant={amount === preset.toString() ? 'default' : 'outline'}
                className="w-full text-yellow-400 hover:text-yellow-300"
                onClick={() => setAmount(preset.toString())}
              >
                ${preset}
              </Button>
            ))}
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-yellow-400">Custom Amount (USD)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400">$</span>
              <Input
                id="amount"
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-purple-800/50 border-yellow-400/20 text-yellow-200"
                placeholder="Enter amount"
              />
            </div>
          </div>

          {/* Display Name */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="displayName" className="text-yellow-400">Display Name</Label>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                  className="border-yellow-400/20"
                />
                <Label htmlFor="anonymous" className="text-yellow-400">Donate Anonymously</Label>
              </div>
            </div>
            <Input
              id="displayName"
              type="text"
              disabled={isAnonymous}
              value={isAnonymous ? 'Anonymous' : displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="bg-purple-800/50 border-yellow-400/20 text-yellow-200"
              placeholder="Your display name"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message" className="text-yellow-400">Message (Optional)</Label>
            <Input
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-purple-800/50 border-yellow-400/20 text-yellow-200"
              placeholder="Leave a message"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300"
            disabled={!amount || isProcessing || (!displayName && !isAnonymous)}
          >
            {isProcessing ? 'Processing...' : 'Donate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default USDDonationForm; 