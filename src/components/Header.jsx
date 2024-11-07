import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronRight } from 'lucide-react';
import { navItems } from '../nav-items';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const toggleSubMenu = (title) => {
    setOpenSubMenus(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center">
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <div className="flex items-center">
                <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
                  <img src="/Games_Logo.png" alt="Elemental Games Logo" className="h-16 w-auto" />
                  <span className="ml-2 text-2xl font-heading font-bold">Elemental Games</span>
                </Link>
              </div>
              <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <div key={item.title}>
                      <Link
                        to={item.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-2 text-base font-medium transition-colors hover:text-primary",
                          location.pathname === item.to ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                      {item.subPages && (
                        <Collapsible
                          open={openSubMenus[item.title]}
                          onOpenChange={() => toggleSubMenu(item.title)}
                        >
                          <CollapsibleTrigger className="ml-4 mt-2 flex items-center text-sm text-muted-foreground hover:text-primary">
                            <ChevronRight className={cn(
                              "h-4 w-4 transition-transform",
                              openSubMenus[item.title] && "rotate-90"
                            )} />
                            <span>Show more</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="ml-8 mt-2 space-y-2">
                              {item.subPages.map((subPage) => (
                                <div key={subPage.title}>
                                  <Link
                                    to={subPage.to}
                                    onClick={() => setOpen(false)}
                                    className={cn(
                                      "block text-sm font-medium transition-colors hover:text-primary",
                                      location.pathname === subPage.to ? "text-primary" : "text-muted-foreground"
                                    )}
                                  >
                                    {subPage.title}
                                  </Link>
                                  {subPage.subPages && (
                                    <Collapsible>
                                      <CollapsibleTrigger className="ml-4 mt-2 flex items-center text-sm text-muted-foreground hover:text-primary">
                                        <ChevronRight className="h-4 w-4" />
                                        <span>Show more</span>
                                      </CollapsibleTrigger>
                                      <CollapsibleContent>
                                        <div className="ml-4 mt-2 space-y-2">
                                          {subPage.subPages.map((subSubPage) => (
                                            <Link
                                              key={subSubPage.title}
                                              to={subSubPage.to}
                                              onClick={() => setOpen(false)}
                                              className={cn(
                                                "block text-sm font-medium transition-colors hover:text-primary",
                                                location.pathname === subSubPage.to ? "text-primary" : "text-muted-foreground"
                                              )}
                                            >
                                              {subSubPage.title}
                                            </Link>
                                          ))}
                                        </div>
                                      </CollapsibleContent>
                                    </Collapsible>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src="/Games_Logo.png" alt="Elemental Games Logo" className="h-16 w-auto hidden md:block" />
          <img src="/Games_Logo.png" alt="Elemental Games Logo" className="h-16 w-auto md:hidden" />
          <span className="text-2xl font-heading font-bold">Elemental Games</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.to}
              className={cn(
                "transition-colors hover:text-primary",
                location.pathname === item.to ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;