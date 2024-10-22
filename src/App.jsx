import React from 'react';
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
import CardGalleryPage from "./pages/CardGalleryPage";
import CardDetailPage from "./pages/CardDetailPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import BattleSimulationPage from "./pages/BattleSimulationPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {navItems.map((item) => (
                    <Route key={item.to} path={item.to} element={item.page} />
                  ))}
                  <Route path="/cards/gallery" element={<CardGalleryPage />} />
                  <Route path="/cards/deck-builder" element={<DeckBuilderPage />} />
                  <Route path="/cards/:id" element={<CardDetailPage />} />
                  <Route path="/gameplay/battle-simulation" element={<BattleSimulationPage />} />
                </Routes>
              </main>
              <Footer />
              <ThemeToggle />
              <CookieConsent />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;