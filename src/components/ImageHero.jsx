import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ImageHero = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/storage/Background.jpg"
          alt="Background Image"
          className="absolute w-full h-full object-cover md:object-center mobile-pan"
        />
      </div>
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 shadow-text">
            Welcome to Elemental Masters
          </h1>
          <p className="text-xl md:text-2xl text-white mb-6 shadow-text">
            Unleash the power of the elements
          </p>
          <Link to="/join">
            <Button 
              className="bg-purple-800 text-yellow-300 border-2 border-yellow-300 px-6 py-3 md:px-10 md:py-6 text-xl md:text-3xl font-bold rounded-lg transition-all duration-300 hover:bg-purple-600 hover:scale-110 hover:text-yellow-200 hover:border-yellow-200 shadow-lg"
            >
              Join Now
            </Button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
        }
        .shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 768px) {
          .mobile-pan {
            width: 200%;
            animation: panBackground 5s linear infinite;
          }
          @keyframes panBackground {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(-25%);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ImageHero;
