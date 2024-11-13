import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImageHero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/Background.jpg"
          alt="Background Image"
          className="absolute w-full h-full object-cover object-center"
        />
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 transform hover:scale-105 transition-transform duration-300 [text-shadow:_2px_2px_0_rgb(128_0_128),_4px_4px_0_rgb(75_0_130),_6px_6px_0_rgb(50_0_100)]">
            Welcome to Elemental Masters
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 text-shadow">
            Unleash the power of the elements
          </p>
          <Link to="/join">
            <Button 
              className="bg-purple-800 text-yellow-300 border-2 border-yellow-300 px-6 py-3 md:px-10 md:py-6 text-xl md:text-3xl font-bold rounded-lg transition-all duration-300 hover:bg-purple-600 hover:scale-110 hover:text-yellow-200 hover:border-yellow-200"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>

      <style>
        {`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
        `}
      </style>
    </div>
  );
};

export default ImageHero;