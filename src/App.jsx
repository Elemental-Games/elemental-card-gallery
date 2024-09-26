import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { navItems } from "./nav-items";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CardDetailPage from "./pages/CardDetailPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import ThemeToggle from "./components/ThemeToggle";

const queryClient = new QueryClient();

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
                  <React.Fragment key={item.to}>
                    <Route path={item.to} element={item.page} />
                    {item.subItems && item.subItems.map((subItem) => (
                      <Route key={subItem.to} path={subItem.to} element={subItem.page} />
                    ))}
                  </React.Fragment>
                ))}
                <Route path="/cards/:cardName" element={<CardDetailPage />} />
                <Route path="/cards/deck-builder" element={<DeckBuilderPage />} />
              </Routes>
            </main>
            <Footer />
            <ThemeToggle />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;