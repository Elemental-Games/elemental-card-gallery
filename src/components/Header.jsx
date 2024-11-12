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
      </Helmet>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between">
          <div className="text-white text-2xl font-bold">
            <Link to="/">Elemental Masters</Link>
          </div>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.title} className="text-white">
                <Link to={item.to}>{item.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
