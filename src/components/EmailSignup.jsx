// src/components/EmailSignup.jsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { subscribeEmail } from '../utils/api';

const EmailSignup = ({ onClose, buttonClassName }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        toast.success(result.message);
        setEmail('');
        if (onClose) onClose();
      } else {
        toast.error(result.message);
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
        {isLoading ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
};

export default EmailSignup;