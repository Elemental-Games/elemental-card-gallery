import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";
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
import RulesPage from "./pages/RulesPage";
import LearnToPlayPage from "./pages/LearnToPlayPage";
import EvermerePage from "./pages/EvermerePage";
import GrivossPage from "./pages/GrivossPage";
import ScartoPage from "./pages/ScartoPage";
import TsunarethPage from "./pages/TsunarethPage";
import ZalosPage from "./pages/ZalosPage";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const renderRoutes = (items) => {
  return items.map((item) => {
    const routes = [
      <Route key={item.to} path={item.to} element={item.page} />
    ];
    if (item.subPages) {
      item.subPages.forEach((subPage) => {
        routes.push(
          <Route key={subPage.to} path={subPage.to} element={subPage.page} />
        );
        if (subPage.subPages) {
          subPage.subPages.forEach((subSubPage) => {
            routes.push(
              <Route key={subSubPage.to} path={subSubPage.to} element={subSubPage.page} />
            );
          });
        }
      });
    }
    return routes;
  }).flat();
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
        <TooltipProvider>
          <AuthProvider>
            <Toaster />
            <SpeedInsights />
            <BrowserRouter>
              <ScrollToTop />
              <div className="flex flex-col min-h-[100dvh] w-full bg-background text-foreground">
                <Header />
                <main className="flex-grow w-full">
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    {renderRoutes(navItems)}
                    <Route path="/cards/gallery" element={<CardGalleryPage />} />
                    <Route path="/cards/deck-builder" element={<DeckBuilderPage />} />
                    <Route path="/cards/:id" element={<CardDetailPage />} />
                    <Route path="/gameplay/battle-simulation" element={<BattleSimulationPage />} />
                    <Route path="/gameplay/rules/*" element={<RulesPage />} />
                    <Route path="/gameplay/learn" element={<LearnToPlayPage />} />
                    <Route path="/kinbrold/evermere" element={<EvermerePage />} />
                    <Route path="/kinbrold/grivoss" element={<GrivossPage />} />
                    <Route path="/kinbrold/scarto" element={<ScartoPage />} />
                    <Route path="/kinbrold/tsunareth" element={<TsunarethPage />} />
                    <Route path="/kinbrold/zalos" element={<ZalosPage />} />
                  </Routes>
                </main>
                <Footer />
                <CookieConsent />
              </div>
            </BrowserRouter>
          </AuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;