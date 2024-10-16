import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'next-themes';
import CardsPage from './pages/CardsPage';
import CardGalleryPage from './pages/CardGalleryPage';
import DeckBuilderPage from './pages/DeckBuilderPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
// import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <ThemeProvider attribute="class" forcedTheme="dark">
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/cards" element={<CardsPage />} />
              <Route path="/card-gallery" element={<CardGalleryPage />} />
              <Route path="/deck-builder" element={<DeckBuilderPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
        {/* <ThemeToggle /> */}
      </Router>
    </ThemeProvider>
  );
};

export default App;