import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navItems } from "./nav-items";
import ThemeToggle from "./components/ThemeToggle";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./hooks/useAuth";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import FadeTransition from "./components/FadeTransition";
import ElementalTransition from "./components/ElementalTransition";

// Import the kingdom pages
import ZalosPage from "./pages/ZalosPage";
import ScartoPage from "./pages/ScartoPage";
import GrivossPage from "./pages/GrivossPage";
import TsunarethPage from "./pages/TsunarethPage";
import EvermerePage from "./pages/EvermerePage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const location = useLocation();

  const isKingdomPage = (path) => {
    return ['/zalos', '/scarto', '/grivoss', '/tsunareth', '/evermere'].includes(path);
  };

  const getPageComponent = (item) => {
    if (isKingdomPage(item.to)) {
      switch (item.to) {
        case '/zalos':
          return <ElementalTransition element="Air"><ZalosPage /></ElementalTransition>;
        case '/scarto':
          return <ElementalTransition element="Fire"><ScartoPage /></ElementalTransition>;
        case '/grivoss':
          return <ElementalTransition element="Earth"><GrivossPage /></ElementalTransition>;
        case '/tsunareth':
          return <ElementalTransition element="Water"><TsunarethPage /></ElementalTransition>;
        case '/evermere':
          return <ElementalTransition element="Neutral"><EvermerePage /></ElementalTransition>;
        default:
          return item.page;
      }
    }
    return <FadeTransition>{item.page}</FadeTransition>;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow">
                <AnimatePresence mode="wait">
                  <Routes location={location} key={location.pathname}>
                    {navItems.map((item) => (
                      <Route
                        key={item.to}
                        path={item.to}
                        element={getPageComponent(item)}
                      />
                    ))}
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
              <ThemeToggle />
              <CookieConsent />
            </div>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>
);

export default AppWrapper;