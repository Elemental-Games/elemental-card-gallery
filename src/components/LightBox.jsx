import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const LightBox = ({ cardImage, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement email submission logic here
    console.log('Email submitted:', email);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full relative border-4 border-accent">
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-2 right-2 text-primary hover:bg-primary/10"
        >
          <X size={24} />
        </Button>
        <img src={cardImage} alt="Card of the Week" className="w-full h-auto mb-4 rounded" />
        <h2 className="text-2xl font-bold mb-4 text-primary">Sign up for updates!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-primary"
          />
          <Button type="submit" className="w-full bg-accent text-primary hover:bg-accent/90">Sign Up</Button>
        </form>
      </div>
    </div>
  );
};

export default LightBox;