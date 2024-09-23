import React from 'react';
import { Button } from '@/components/ui/button';

const JoinNowSection = () => {
  return (
    <div className="bg-gradient-to-r from-green-400 to-blue-500 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Join Now</h2>
        <p className="text-xl mb-8">
          Support us on Kickstarter and be part of the Elemental Masters journey!
        </p>
        <Button size="lg" variant="secondary">
          Support on Kickstarter
        </Button>
      </div>
    </div>
  );
};

export default JoinNowSection;