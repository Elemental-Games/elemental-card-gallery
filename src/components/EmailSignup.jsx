// src/components/EmailSignup.jsx
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeEmail } from '../utils/api';
import confetti from 'canvas-confetti';

const EmailSignup = ({ onClose, buttonClassName, buttonText = "Subscribe" }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const shootConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        toast.success(result.message);
        shootConfetti();
        setEmail('');
        if (onClose) onClose();
      } else {
        // If already subscribed, still show confetti
        if (result.message && result.message.includes('already subscribed')) {
          toast.info("You're already on our mailing list!");
          shootConfetti(); // Still celebrate their enthusiasm
      } else {
        toast.error(result.message);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-2 border-yellow-500"
      />
      <Button 
        type="submit" 
        className={`w-full ${buttonClassName}`} 
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : buttonText}
      </Button>
    </form>
  );
};

export default EmailSignup;