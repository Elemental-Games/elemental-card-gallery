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
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !acceptTerms) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Validate inputs
      if (!email || !email.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      const numAmount = Number(amount);
      if (isNaN(numAmount) || numAmount < 1) {
        throw new Error('Please enter a valid amount');
      }

      if (!isAnonymous && !displayName.trim()) {
        throw new Error('Please enter a display name or choose to remain anonymous');
      }

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: numAmount,
          email,
          displayName: isAnonymous ? 'Anonymous' : displayName,
          message,
          isAnonymous,
          subscribeToUpdates
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to process donation');
      }

      const { clientSecret } = await response.json();

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement('CardElement'),
          billing_details: {
            name: isAnonymous ? 'Anonymous' : displayName,
            email: email
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
        setEmail('');
        setDisplayName('');
        setMessage('');
        setSubscribeToUpdates(false);
        setAcceptTerms(false);
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
        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* Amount Selection */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-yellow-400">Amount (USD)</Label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant="outline"
                  className={`${
                    amount === preset.toString()
                      ? 'bg-yellow-400 text-purple-900'
                      : 'bg-purple-800/50 text-yellow-400'
                  } border-yellow-400/20 hover:bg-yellow-400 hover:text-purple-900`}
                  onClick={() => setAmount(preset.toString())}
                >
                  ${preset}
                </Button>
              ))}
            </div>
            <Input
              id="amount"
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-purple-800/50 border-yellow-400/20 text-yellow-200"
              placeholder="Custom amount"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-yellow-400">Email Address</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-purple-800/50 border-yellow-400/20 text-yellow-200"
              placeholder="your@email.com"
            />
          </div>

          {/* Display Name and Anonymous Option */}
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

          {/* Card Element */}
          <div className="space-y-2">
            <Label className="text-yellow-400">Card Details</Label>
            <StripeCardElement />
          </div>

          {/* Subscribe to Updates */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="subscribe"
              checked={subscribeToUpdates}
              onCheckedChange={setSubscribeToUpdates}
              className="border-yellow-400/20"
            />
            <Label htmlFor="subscribe" className="text-yellow-200">
              Subscribe to Elemental Masters updates and news
            </Label>
          </div>

          {/* Terms Acceptance */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              required
              checked={acceptTerms}
              onCheckedChange={setAcceptTerms}
              className="border-yellow-400/20"
            />
            <Label htmlFor="terms" className="text-yellow-200">
              I acknowledge that I have read and agree to the donation terms
            </Label>
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300"
            disabled={!stripe || !amount || isProcessing || !acceptTerms || !email}
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <span className="animate-spin">⌛</span>
                <span>Processing...</span>
              </div>
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