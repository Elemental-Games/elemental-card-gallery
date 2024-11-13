import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CardGalleryPage from './pages/CardGalleryPage';
import CardDetailPage from './pages/CardDetailPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Router>
        <Routes>
          <Route path="/" element={<CardGalleryPage />} />
          <Route path="/cards/:id" element={<CardDetailPage />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
