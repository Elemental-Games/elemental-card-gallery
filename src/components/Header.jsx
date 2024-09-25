import React from 'react';
import { Link } from 'react-router-dom';
import { navItems } from '../nav-items';

const Header = () => {
  return (
    <header className="bg-white dark:bg-darkPurple text-darkPurple dark:text-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">Elemental Masters</Link>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-accent transition-colors">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
