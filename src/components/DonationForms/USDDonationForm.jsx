import { useState } from 'react';
import { useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { stripePromise } from '@/lib/stripe';
import StripeCardElement from './StripeCardElement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import DonationDisclaimer from "@/components/DonationDisclaimer"

const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast()
  const [amount, setAmount] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Stripe has not been initialized"
      });
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Validate amount
      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount < 1) {
        throw new Error("Please enter a valid amount");
      }

      // Validate display name if not anonymous
      if (!isAnonymous && !displayName.trim()) {
        throw new Error("Please enter a display name or choose to remain anonymous");
      }

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numAmount,
          displayName: isAnonymous ? 'Anonymous' : displayName,
          message,
          isAnonymous
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process donation');
      }

      const { clientSecret } = await response.json();

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('CardElement'),
          billing_details: {
            name: isAnonymous ? 'Anonymous' : displayName,
          },
        },
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

      if (paymentIntent.status === 'succeeded') {
        toast({
          title: "Thank you for your donation!",
          description: "Your support means a lot to us.",
          className: "bg-green-800 border-green-400 text-white",
        });

        // Clear form
        setAmount('');
        setDisplayName('');
        setMessage('');
        elements.getElement('CardElement').clear();
      }

    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error processing donation",
        description: err.message,
      });
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-purple-900/90">
      <CardContent className="p-6">
        <DonationDisclaimer />
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

          {/* Stripe Card Element */}
          <div className="space-y-2">
            <Label className="text-yellow-400">Card Details</Label>
            <StripeCardElement />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300"
            disabled={!stripe || !amount || isProcessing || (!displayName && !isAnonymous)}
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Donate'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// Wrap the form with Stripe Elements
const USDDonationForm = () => (
  <Elements stripe={stripePromise}>
    <DonationForm />
  </Elements>
);

export default USDDonationForm; 