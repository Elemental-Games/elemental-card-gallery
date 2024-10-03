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
                        element={
                          isKingdomPage(item.to) ? (
                            item.page
                          ) : (
                            <FadeTransition>{item.page}</FadeTransition>
                          )
                        }
                      />
                    ))}
                    <Route path="/zalos" element={<ZalosPage />} />
                    <Route path="/scarto" element={<ScartoPage />} />
                    <Route path="/grivoss" element={<GrivossPage />} />
                    <Route path="/tsunareth" element={<TsunarethPage />} />
                    <Route path="/evermere" element={<EvermerePage />} />
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