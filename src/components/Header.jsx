import { Link, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { navItems } from '@/nav-items';
import { Button } from '@/components/ui/button';
import { Menu, ShoppingCart } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const Header = () => {
  const { toggleCart, items } = useCart();
  const location = useLocation();
  const isShopPage = location.pathname.startsWith('/shop') || location.pathname.startsWith('/product');

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <nav className="bg-darkPurple/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-purple-500/30">
        <div className="container mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img 
                src="/Elekin.png" 
                alt="Elekin TCG Logo" 
                className="h-24 w-auto"
              />
            </Link>
            
            <div className="flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.subPages ? (
                        <>
                          <NavigationMenuTrigger className="text-white hover:text-accent transition-colors duration-200 font-sans bg-transparent hover:bg-white/10 px-3 py-2 rounded">
                            <Link 
                              to={item.to}
                              className="text-white hover:text-accent transition-colors duration-200 font-sans mr-2"
                            >
                              {item.title}
                            </Link>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-48 bg-darkPurple/95 backdrop-blur-sm p-2 rounded-lg border border-purple-500/30">
                              {item.subPages.map((subItem) => (
                                <Link 
                                  key={subItem.title}
                                  to={subItem.to} 
                                  className="block py-2 px-4 text-white hover:text-accent hover:bg-white/10 transition-colors duration-200 font-sans rounded"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link 
                          to={item.to} 
                          className="text-white hover:text-accent transition-colors duration-200 font-sans px-3 py-2 rounded hover:bg-white/10"
                        >
                          {item.title}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
              
              <div className="flex items-center gap-4">
                <Link 
                  to="/shop" 
                  className="bg-yellow-500 hover:bg-yellow-400 text-purple-900 px-4 py-2 rounded-lg font-bold transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  Shop
                </Link>
                {isShopPage && (
                  <>
                    {items.length > 0 && (
                      <div className="text-right cursor-pointer" onClick={toggleCart}>
                        <p className="font-bold text-white">{totalItems} Item{totalItems > 1 ? 's' : ''}</p>
                        <p className="text-sm text-yellow-400">${subtotal.toFixed(2)}</p>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
                      <ShoppingCart className="h-6 w-6 text-white" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                        </span>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img 
                src="/Elekin.png" 
                alt="Elekin TCG Logo" 
                className="h-20 w-auto"
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
                        <div key={item.title}>
                          <Link 
                            to={item.to} 
                            className="block py-2 px-4 text-white hover:text-accent transition-colors duration-200 font-sans"
                          >
                            {item.title}
                          </Link>
                          {item.subPages && (
                            <div className="ml-4 border-l border-purple-500/30">
                              {item.subPages.map((subItem) => (
                                <Link 
                                  key={subItem.title}
                                  to={subItem.to} 
                                  className="block py-1 px-4 text-purple-200 hover:text-accent transition-colors duration-200 font-sans text-sm"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t border-purple-500/30">
                        <Link 
                          to="/shop" 
                          className="block py-2 px-4 text-yellow-400 hover:text-yellow-300 font-bold transition-colors duration-200"
                        >
                          Shop
                        </Link>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                {isShopPage && (
                  <NavigationMenuItem>
                    <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
                      <ShoppingCart className="h-6 w-6 text-white" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                        </span>
                      )}
                    </Button>
                  </NavigationMenuItem>
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;