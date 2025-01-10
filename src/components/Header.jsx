import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <img src="/logo.png" alt="Elemental Masters" className="h-6 w-auto" />
            <span className="hidden font-bold sm:inline-block">
              Elemental Masters
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/about"
              className="transition-colors hover:text-foreground/80"
            >
              About
            </Link>
            <Link
              to="/cards"
              className="transition-colors hover:text-foreground/80"
            >
              Cards
            </Link>
            <Link
              to="/kinbrold"
              className="transition-colors hover:text-foreground/80"
            >
              Kinbrold
            </Link>
            <Link
              to="/join"
              className="transition-colors hover:text-foreground/80"
            >
              Join Now
            </Link>
            <Link
              to="/donate"
              className="transition-colors hover:text-foreground/80"
            >
              Donate
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;