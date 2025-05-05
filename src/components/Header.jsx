import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";
import { navItems } from '../nav-items';
import ProfileMenu from './auth/ProfileMenu';

const Header = () => {
  return (
    <>
      <Helmet>
        <title>Elekin - Trading Card Game</title>
        <meta name="description" content="Navigate through the world of Kinbrold. Access game rules, card gallery, and join our community." />
        <meta name="keywords" content="trading card game, TCG, Elekin, card game, fantasy game, elemental powers, strategy game" />
        <meta property="og:title" content="Elekin - Trading Card Game" />
        <meta property="og:description" content="Master the elements in this exciting trading card game. Collect cards, build decks, and battle for supremacy!" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://elementalgames.gg" />
      </Helmet>
      <nav className="bg-darkPurple/30 backdrop-blur-sm p-4 sticky top-0 z-50 w-full">
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/Games_Logo.png" 
                alt="Elemental Games Logo" 
                className="h-20 w-20 mr-6"
              />
              <span className="text-white text-2xl font-bold font-heading hover:text-accent transition-colors duration-200">
                Elemental Games
              </span>
            </Link>
            
            <div className="flex items-center space-x-6">
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
              <div className="ml-4 border-l border-purple-500/30 pl-4">
                <ProfileMenu />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <div>
              <ProfileMenu />
            </div>
            
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="/Games_Logo.png" 
                alt="Elemental Games Logo" 
                className="h-20 w-20"
              />
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-white/10">
                    <Menu className="h-6 w-6 text-white" />
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[calc(100vw-6rem)] sm:w-[300px] bg-darkPurple/95 backdrop-blur-sm p-4 rounded-lg ml-[-1rem]">
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
    </>
  );
};

export default Header;