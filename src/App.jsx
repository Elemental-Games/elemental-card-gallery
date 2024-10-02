import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navItems } from "./nav-items";
import ThemeToggle from "./components/ThemeToggle";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./hooks/useAuth";

// Import the components for the sub-pages
import CardListPage from "./pages/CardListPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import RulesPage from "./pages/RulesPage";
import ScartoPage from "./pages/ScartoPage";
import TsunarethPage from "./pages/TsunarethPage";
import ZalosPage from "./pages/ZalosPage";
import GrivossPage from "./pages/GrivossPage";
import EvermerePage from "./pages/EvermerePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen bg-background text-foreground">
              <Header />
              <main className="flex-grow">
                <Routes>
                  {navItems.map((item) => (
                    <Route key={item.to} path={item.to} element={item.page}>
                      {item.subItems && item.subItems.map((subItem) => (
                        <Route key={subItem.to} path={subItem.to} element={subItem.page} />
                      ))}
                    </Route>
                  ))}
                  <Route path="/cards/card-list" element={<CardListPage />} />
                  <Route path="/cards/deck-builder" element={<DeckBuilderPage />} />
                  <Route path="/gameplay/rules" element={<RulesPage />} />
                  <Route path="/kinbrold/scarto" element={<ScartoPage />} />
                  <Route path="/kinbrold/tsunareth" element={<TsunarethPage />} />
                  <Route path="/kinbrold/zalos" element={<ZalosPage />} />
                  <Route path="/kinbrold/grivoss" element={<GrivossPage />} />
                  <Route path="/kinbrold/evermere" element={<EvermerePage />} />
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