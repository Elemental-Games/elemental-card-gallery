import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'Cards', path: '/cards' },
    { title: 'Deck Builder', path: '/deck-builder' },
  ];

  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/">
            <img 
              src="/Games_Logo.png"
              alt="Elemental Games Logo" 
              className="w-16 h-16 mr-2"
            />
          </Link>
          <Link to="/" className="text-2xl font-bold">Elemental Masters</Link>
        </div>
        <nav className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="hover:text-accent transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-2 px-4 hover:bg-purple-800"
              onClick={toggleMenu}
            >
              {item.title}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;