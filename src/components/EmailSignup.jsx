import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EmailSignup = ({ onClose, buttonClassName }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use the full URL in production, fallback to relative path in development
      const apiUrl = process.env.NODE_ENV === 'production' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/subscribe`
        : '/api/subscribe';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to subscribe');
      }

      const data = await response.json();
      console.log('Subscription response:', data); // For debugging

      toast.success("Successfully subscribed to the newsletter!");
      setEmail('');
      if (onClose) onClose();
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error(error.message || "Failed to subscribe. Please try again later.");
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
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default EmailSignup;