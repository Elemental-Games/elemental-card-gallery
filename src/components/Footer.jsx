import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, X } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-4">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/cards" className="hover:text-accent transition-colors">Cards</Link>
          <Link to="/gameplay" className="hover:text-accent transition-colors">Gameplay</Link>
          <Link to="/about" className="hover:text-accent transition-colors">About Us</Link>
        </div>
        <div className="flex items-center space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 hover:text-accent transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 hover:text-accent transition-colors" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer">
            <X className="w-6 h-6 hover:text-accent transition-colors" />
          </a>
        </div>
        <div className="w-full md:w-auto text-center md:text-left mt-4 md:mt-0">
          <p>&copy; 2023 Elemental Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
