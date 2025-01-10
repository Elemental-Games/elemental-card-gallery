import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { navItems } from '../nav-items';

const Header = () => {
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Cards', href: '/cards' },
    { name: 'Kinbrold', href: '/kinbrold' },
    { name: 'Join', href: '/join' },
    { name: 'Donate', href: '/donate' },
  ];

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
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/Games_Logo.png" 
                  alt="Elemental Masters Logo" 
                  className="h-16 w-16 mr-2"
                />
                <span className="text-white text-2xl font-bold font-heading hover:text-accent transition-colors duration-200">
                  Elemental Masters
                </span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex space-x-6">
                {navItems.map((item) => (
                  <li key={item.title}>
                    <Link 
                      to={item.to} 
                      className="text-white hover:text-accent transition-colors duration-200 font-sans"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-white/10">
                      <Menu className="h-6 w-6 text-white" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[calc(100vw-2rem)] sm:w-[300px] bg-darkPurple/95 backdrop-blur-sm p-4 rounded-lg">
                        {navItems.map((item) => (
                          <Link 
                            key={item.title}
                            to={item.to} 
                            className="block py-2 px-4 text-white hover:text-accent transition-colors duration-200 font-sans"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;