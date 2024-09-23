import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUsSection = () => {
  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">About Us</h2>
        <p className="text-xl mb-8 text-gray-300">
          Elemental Games is dedicated to creating immersive and exciting trading card game experiences.
        </p>
        <Link to="/about">
          <Button size="lg" variant="secondary">
            Learn More About Elemental Games
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AboutUsSection;