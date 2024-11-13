import { Link } from 'react-router-dom';
import { X, MessageCircle } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <footer className="bg-darkPurple text-white py-8 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-6">
          <ThemeToggle />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/gameplay" className="hover:text-accent transition-colors">Gameplay</Link></li>
              <li><Link to="/cards" className="hover:text-accent transition-colors">Cards</Link></li>
              <li><Link to="/kinbrold" className="hover:text-accent transition-colors">Kinbrold</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/join" className="hover:text-accent transition-colors">Join Now</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/support" className="hover:text-accent transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="https://x.com/elemental_tcg" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <X size={24} />
              </a>
              <a href="https://discord.gg/qXNWh4dMve" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <svg width="24" height="24" viewBox="0 0 127.14 96.36" className="fill-current">
                  <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p>&copy; 2024 Elemental Games. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;