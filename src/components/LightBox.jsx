import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useAuth } from '../hooks/useAuth'; // Updated import

const LightBox = ({ cardImage, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const { signInWithGoogle, signInWithFacebook } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement email signup logic here
    console.log('Email submitted:', email);
    setIsSignedUp(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-popover p-8 rounded-lg max-w-4xl w-full relative border-4 border-accent flex">
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-2 right-2 text-primary hover:bg-primary/10"
        >
          <X size={24} />
        </Button>
        <div className="flex-1 pr-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">Get the Latest News & Announcements to your Inbox</h2>
          <p className="mb-4 text-primary">Gain access to all website features and stay up-to-date on our progress</p>
          {!isSignedUp ? (
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
          ) : (
            <p className="text-primary">Thanks for signing up! You're now one step closer to being an Elemental Master</p>
          )}
          <div className="mt-4">
            <p className="text-primary mb-2">Or sign in with:</p>
            <Button onClick={signInWithGoogle} className="mr-2">Google</Button>
            <Button onClick={signInWithFacebook}>Facebook</Button>
          </div>
        </div>
        <div className="flex-1">
          <img src={cardImage} alt="Card of the Week" className="w-full h-auto rounded" />
        </div>
      </div>
    </div>
  );
};

export default LightBox;