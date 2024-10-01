import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { navItems } from "./nav-items";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardDetailPage from "./pages/CardDetailPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import ThemeToggle from "./components/ThemeToggle";
import CookieConsent from "./components/CookieConsent";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SupportPage from "./pages/SupportPage";
import CardFlipTransition from "./components/CardFlipTransition";

const queryClient = new QueryClient();

const PageWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <CardFlipTransition key={location.pathname}>
      {children}
    </CardFlipTransition>
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
              <Routes>
                {navItems.map((item) => (
                  <Route 
                    key={item.to} 
                    path={item.to} 
                    element={<PageWrapper>{item.page}</PageWrapper>} 
                  />
                ))}
                <Route path="/cards/:cardName" element={<PageWrapper><CardDetailPage /></PageWrapper>} />
                <Route path="/cards/deck-builder" element={<PageWrapper><DeckBuilderPage /></PageWrapper>} />
                <Route path="/terms-of-service" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                <Route path="/privacy-policy" element={<PageWrapper><PrivacyPolicy /></PageWrapper>} />
                <Route path="/support" element={<PageWrapper><SupportPage /></PageWrapper>} />
              </Routes>
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