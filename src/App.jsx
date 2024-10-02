import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navItems } from "./nav-items";
import ThemeToggle from "./components/ThemeToggle";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./hooks/useAuth";

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
                    <Route key={item.to} path={item.to} element={
                      <>
                        {item.page}
                        <Outlet />
                      </>
                    }>
                      {item.subItems && item.subItems.map((subItem) => (
                        <Route key={subItem.to} path={subItem.to} element={subItem.page} />
                      ))}
                    </Route>
                  ))}
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