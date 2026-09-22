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
import TrackedLink from '@/components/TrackedLink';
import { trackAlphaCtaClick, trackShopVisit } from '@/utils/analytics';
import { isPhysicalShopPaused } from '@/config/site';

const Header = () => {
  const { toggleCart, items } = useCart();
  const location = useLocation();
  const isShopPage =
    location.pathname.startsWith('/shop') ||
    location.pathname.startsWith('/product') ||
    location.pathname.startsWith('/bundle');

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shopPaused = isPhysicalShopPaused();
  const showCart = isShopPage && !shopPaused;

  return (
    <>
      <nav className="bg-darkPurple/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b border-yellow-400/25">
        <div className="container mx-auto px-4">
          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between h-24">
            <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Elekin home">
              <img src="/Elekin.png" alt="Elekin" className="h-[5.25rem] w-auto" />
            </Link>

            <div className="flex items-center gap-3">
              <NavigationMenu>
                <NavigationMenuList>
                  {navItems.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      {item.subPages ? (
                        <>
                          <NavigationMenuTrigger className="text-white hover:text-yellow-400 transition-colors font-sans text-base lg:text-lg bg-transparent hover:bg-yellow-400/10 px-3 py-2 rounded">
                            <Link to={item.to} className="mr-1">
                              {item.title}
                            </Link>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-52 bg-darkPurple/95 backdrop-blur-sm p-2 rounded-lg border border-yellow-400/30">
                              {item.subPages.map((subItem) => {
                                const isShop = subItem.to === '/shop';
                                const shopLabel = shopPaused ? 'Shop (paused)' : subItem.title;
                                const linkClass =
                                  'block py-2 px-4 text-white hover:text-yellow-400 hover:bg-yellow-400/10 transition-colors font-sans rounded text-base';
                                return isShop ? (
                                  <TrackedLink
                                    key={subItem.title}
                                    to={subItem.to}
                                    onClick={() => trackShopVisit()}
                                    className={linkClass}
                                  >
                                    {shopLabel}
                                  </TrackedLink>
                                ) : (
                                  <Link key={subItem.title} to={subItem.to} className={linkClass}>
                                    {subItem.title}
                                  </Link>
                                );
                              })}
                            </div>
                          </NavigationMenuContent>
                        </>
                      ) : (
                        <Link
                          to={item.to}
                          className="transition-colors font-sans px-3 py-2 rounded hover:bg-yellow-400/10 text-base lg:text-lg text-white hover:text-yellow-400"
                        >
                          {item.title}
                        </Link>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/alpha"
                  onClick={() => trackAlphaCtaClick('header_desktop')}
                  className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-5 py-2.5 rounded-lg font-bold text-base lg:text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  Join Alpha
                </Link>
                {showCart && (
                  <>
                    {items.length > 0 && (
                      <div className="text-right cursor-pointer" onClick={toggleCart}>
                        <p className="font-bold text-white text-sm">
                          {totalItems} Item{totalItems > 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-yellow-400">${subtotal.toFixed(2)}</p>
                      </div>
                    )}
                    <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
                      <ShoppingCart className="h-6 w-6 text-white" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500" />
                        </span>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center justify-between py-2.5">
            <Link to="/" className="flex items-center shrink-0" aria-label="Elekin home">
              <img src="/Elekin.png" alt="Elekin" className="h-[4.25rem] w-auto" />
            </Link>

            <div className="flex items-center gap-2">
              <Link
                to="/alpha"
                onClick={() => trackAlphaCtaClick('header_mobile')}
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 px-3.5 py-2 rounded-lg font-bold text-sm shadow-md"
              >
                Join Alpha
              </Link>
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-yellow-400/10">
                      <Menu className="h-6 w-6 text-white" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[calc(100vw-5rem)] max-w-[300px] bg-darkPurple/95 backdrop-blur-sm p-4 rounded-lg border border-yellow-400/30">
                        {navItems.map((item) => (
                          <div key={item.title}>
                            <Link
                              to={item.to}
                              className="block py-2 px-3 text-base text-white hover:text-yellow-400 transition-colors font-sans"
                            >
                              {item.title}
                            </Link>
                            {item.subPages && (
                              <div className="ml-3 border-l border-yellow-400/25 mb-2">
                                {item.subPages.map((subItem) => {
                                  const isShop = subItem.to === '/shop';
                                  const shopLabel = shopPaused ? 'Shop (paused)' : subItem.title;
                                  const linkClass =
                                    'block py-1 px-3 text-purple-200 hover:text-yellow-400 text-base';
                                  return isShop ? (
                                    <TrackedLink
                                      key={subItem.title}
                                      to={subItem.to}
                                      onClick={() => trackShopVisit()}
                                      className={linkClass}
                                    >
                                      {shopLabel}
                                    </TrackedLink>
                                  ) : (
                                    <Link key={subItem.title} to={subItem.to} className={linkClass}>
                                      {subItem.title}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        ))}
                        <div className="pt-3 mt-2 border-t border-yellow-400/25">
                          <Link
                            to="/alpha"
                            onClick={() => trackAlphaCtaClick('header_mobile_menu')}
                            className="block py-2 px-3 text-base text-yellow-400 font-bold"
                          >
                            Join Alpha
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  {showCart && (
                    <NavigationMenuItem>
                      <Button variant="ghost" size="icon" onClick={toggleCart} className="relative">
                        <ShoppingCart className="h-6 w-6 text-white" />
                        {items.length > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500" />
                          </span>
                        )}
                      </Button>
                    </NavigationMenuItem>
                  )}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
