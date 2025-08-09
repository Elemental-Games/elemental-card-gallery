import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from 'next-themes';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { createClient } from '@supabase/supabase-js';
import Header from "./components/Header";
import Footer from "./components/Footer";
import { navItems } from "./nav-items";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";
import { useEffect } from "react";
import CardGalleryPage from "./pages/CardGalleryPage";
import CardGalleryComingSoon from "./pages/CardGalleryComingSoon";
import CardDetailPage from "./pages/CardDetailPage";
import DeckBuilderPage from "./pages/DeckBuilderPage";
import ManualDeckBuilderPage from "./pages/ManualDeckBuilderPage";
import EvermerePage from "./pages/EvermerePage";
import GrivossPage from "./pages/GrivossPage";
import ScartoPage from "./pages/ScartoPage";
import TsunarethPage from "./pages/TsunarethPage";
import ZalosPage from "./pages/ZalosPage";
import LandingPage from "./pages/LandingPage";
import DonatePage from '@/pages/DonatePage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ElekinPage from "./pages/ElekinPage";
import CartSidebar from "./components/cart/CartSidebar";
// Beta version temporarily hidden
// import ElekinOnlinePage from "./pages/ElekinOnlinePage";
import ElekinRulebook from "./pages/ElekinRulebook";
import HowToPlayPage from "./pages/HowToPlayPage";
import KinbroldPage from "./pages/KinbroldPage";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import AuthPage from './pages/AuthPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ProtectedRoute from './components/ProtectedRoute';
import ProfilePage from './pages/ProfilePage';
import DeckBuilderWizardPage from "./pages/DeckBuilderWizardPage";
import AboutUsPage from "./pages/AboutUsPage";
import JoinNowPage from './pages/JoinNowPage';
import LegalPage from './pages/LegalPage';
import UnsubscribePage from './pages/UnsubscribePage';
import EmailPreviewPage from './pages/EmailPreviewPage';
import KickstarterPage from './pages/KickstarterPage';
import VipKickstarterEmailPage from './pages/VipKickstarterEmailPage';
import ShopPage from './pages/ShopPage';
import PostPurchasePage from './pages/PostPurchasePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ReturnPolicyPage from './pages/ReturnPolicyPage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';

const queryClient = new QueryClient();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a separate instance for auth context
const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
});

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
      <SessionContextProvider supabaseClient={supabaseAuth}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <TooltipProvider>
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <SpeedInsights />
                <BrowserRouter>
                  <ScrollToTop />
                  <CartSidebar />
                  <div className="flex flex-col min-h-[100dvh] w-full bg-background text-foreground">
                    <Header />
                    <main className="flex-grow w-full">
                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/post-purchase" element={<PostPurchasePage />} />
                        <Route path="/login" element={<AuthPage />} />
                        <Route path="/auth/callback" element={<AuthCallbackPage />} />
                        <Route path="/profile" element={
                          <ProtectedRoute>
                            <ProfilePage />
                          </ProtectedRoute>
                        } />
                        {renderRoutes(navItems)}
                        <Route path="/cards/gallery" element={<CardGalleryComingSoon />} />
                        <Route path="/cards/campaign" element={<CardGalleryPage />} />
                        <Route path="/cards/deck-builder" element={
                          <ProtectedRoute>
                            <DeckBuilderPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/cards/deck-builder/manual" element={
                          <ProtectedRoute>
                            <ManualDeckBuilderPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/cards/deck-builder/wizard" element={
                          <ProtectedRoute>
                            <DeckBuilderWizardPage />
                          </ProtectedRoute>
                        } />
                        <Route path="/cards/:id" element={<CardDetailPage />} />
                        <Route path="/kinbrold/evermere" element={<EvermerePage />} />
                        <Route path="/kinbrold/grivoss" element={<GrivossPage />} />
                        <Route path="/kinbrold/scarto" element={<ScartoPage />} />
                        <Route path="/kinbrold/tsunareth" element={<TsunarethPage />} />
                        <Route path="/kinbrold/zalos" element={<ZalosPage />} />
                        <Route path="/donate" element={<DonatePage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                        <Route path="/terms-of-service" element={<TermsOfService />} />
                        <Route path="/return-policy" element={<ReturnPolicyPage />} />
                        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                        <Route path="/cards" element={<CardGalleryPage />} />
                        <Route path="/elekin" element={<ElekinPage />} />
                        {/*
                        <Route path="/elekin/online" element={
                          <ProtectedRoute>
                            <ElekinOnlinePage />
                          </ProtectedRoute>
                        } />
                        */}
                        <Route path="/elekin/rulebook" element={<ElekinRulebook />} />
                        <Route path="/elekin/how-to-play" element={<HowToPlayPage />} />
                        <Route path="/kinbrold" element={<KinbroldPage />} />
                        <Route path="/about" element={<AboutUsPage />} />
                        <Route path="/join-now" element={<JoinNowPage />} />
                        <Route path="/legal" element={<LegalPage />} />
                        <Route path="/unsubscribe" element={<UnsubscribePage />} />
                        <Route path="/admin/email-preview" element={<EmailPreviewPage />} />
                        <Route path="/kickstarter" element={<KickstarterPage />} />
                        <Route path="/admin/vip-kickstarter" element={<VipKickstarterEmailPage />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </TooltipProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;