import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { navItems } from '../nav-items';

const Header = () => {
  return (
    <>
      <Helmet>
        <title>Elemental Masters - Trading Card Game</title>
        <meta name="description" content="Navigate through the world of Elemental Masters. Access game rules, card gallery, and join our community." />
        <meta name="keywords" content="trading card game, TCG, Elemental Masters, card game, fantasy game, elemental powers, strategy game" />
        <meta property="og:title" content="Elemental Masters - Trading Card Game" />
        <meta property="og:description" content="Master the elements in this exciting trading card game. Collect cards, build decks, and battle for supremacy!" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg" />
      </Helmet>
      <nav className="bg-darkPurple p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/Games_Logo.png" 
                alt="Elemental Masters Logo" 
                className="h-10 w-10 mr-2"
              />
              <span className="text-secondary text-2xl font-bold font-heading hover:text-accent transition-colors duration-200">
                Elemental Masters
              </span>
            </Link>
          </div>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link 
                  to={item.to} 
                  className="text-secondary hover:text-accent transition-colors duration-200 font-sans"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;