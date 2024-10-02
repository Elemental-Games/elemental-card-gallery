import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import KinbroldPage from './pages/KinbroldPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KinbroldPage />} />
      </Routes>
    </Router>
  );
};

export default App;