import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems } from "./nav-items";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardDetailPage from "./pages/CardDetailPage";
import CardsPage from "./pages/CardsPage";
import CardListPage from "./pages/CardListPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import ThemeToggle from "./components/ThemeToggle";
import CookieConsent from "./components/CookieConsent";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SupportPage from "./pages/SupportPage";
import ScartoPage from "./pages/ScartoPage";
import TsunarethPage from "./pages/TsunarethPage";
import ZalosPage from "./pages/ZalosPage";
import GrivossPage from "./pages/GrivossPage";
import EvermerePage from "./pages/EvermerePage";

const queryClient = new QueryClient();

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header />
            <main className="flex-grow">
              <AnimatePresence mode="wait">
                <Routes>
                  {navItems.map((item) => (
                    <Route 
                      key={item.to} 
                      path={item.to} 
                      element={<PageWrapper>{item.page}</PageWrapper>} 
                    />
                  ))}
                  <Route path="/cards" element={<PageWrapper><CardsPage /></PageWrapper>} />
                  <Route path="/cards/card-list" element={<PageWrapper><CardListPage /></PageWrapper>} />
                  <Route path="/cards/deck-builder" element={<PageWrapper><DeckBuilderPage /></PageWrapper>} />
                  <Route path="/cards/:cardName" element={<PageWrapper><CardDetailPage /></PageWrapper>} />
                  <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                  <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                  <Route path="/support" element={<PageWrapper><SupportPage /></PageWrapper>} />
                  <Route path="/kinbrold/scarto" element={<PageWrapper><ScartoPage /></PageWrapper>} />
                  <Route path="/kinbrold/tsunareth" element={<PageWrapper><TsunarethPage /></PageWrapper>} />
                  <Route path="/kinbrold/zalos" element={<PageWrapper><ZalosPage /></PageWrapper>} />
                  <Route path="/kinbrold/grivoss" element={<PageWrapper><GrivossPage /></PageWrapper>} />
                  <Route path="/kinbrold/evermere" element={<PageWrapper><EvermerePage /></PageWrapper>} />
                </Routes>
              </AnimatePresence>
            </main>
            <Footer />
            <ThemeToggle />
            <CookieConsent />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;