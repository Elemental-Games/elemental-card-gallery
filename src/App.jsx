import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardsPage from './pages/CardsPage';
import CardGalleryPage from './pages/CardGalleryPage';
import DeckBuilderPage from './pages/DeckBuilderPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cards" element={<CardsPage />} />
        <Route path="/card-gallery" element={<CardGalleryPage />} />
        <Route path="/deck-builder" element={<DeckBuilderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
