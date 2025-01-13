import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import DonationDisclaimer from "@/components/DonationDisclaimer";
import { stripePromise } from '@/lib/stripe';

const DonationForm = () => {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const presetAmounts = [5, 10, 25, 50, 100];

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!acceptTerms) return;

    setIsProcessing(true);

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Number(amount),
          email,
          displayName: isAnonymous ? 'Anonymous' : displayName,
          isAnonymous,
          subscribeToUpdates
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to process donation",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="bg-purple-900/90">
      <CardContent className="p-6">
        <DonationDisclaimer />
        <form onSubmit={handleDonate} className="space-y-6 mt-6">
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

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-yellow-400 text-purple-900 hover:bg-yellow-300"
            disabled={!stripePromise || !amount || isProcessing || !acceptTerms || !email}
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

export default DonationForm; 