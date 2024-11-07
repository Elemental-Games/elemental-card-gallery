import { createRoot } from 'react-dom/client';
import { inject } from '@vercel/analytics';
import App from './App.jsx';
import './index.css';


createRoot(document.getElementById('root')).render(<App />);

// Inject Vercel Analytics
inject();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>);