import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImageHero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <img
        src="/storage/Background.jpg"
        alt="Background Image"
        className="absolute z-0 w-full h-full object-cover"
      />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-center px-4 py-8 bg-black bg-opacity-40 rounded-full">
          <h1 className="text-6xl font-bold text-white mb-4 text-shadow-xl">
            Welcome to Elemental Masters
          </h1>
          <p className="text-2xl text-white mb-6 text-shadow-lg">
            Unleash the power of the elements
          </p>
          <Link to="/join">
            <Button 
              className="bg-purple-800 text-yellow-300 border-2 border-yellow-300 px-10 py-6 text-3xl font-bold rounded-lg transition-all duration-300 hover:bg-purple-600 hover:scale-110 hover:text-yellow-200 hover:border-yellow-200 shadow-lg"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .text-shadow-xl {
          text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.9);
        }
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ImageHero;