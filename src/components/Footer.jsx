import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { TwitterIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Footer = () => {
  return (
    <footer className="bg-darkPurple text-white py-8 w-full z-40">
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
                <TwitterIcon size={24} />
              </a>
              <a href="https://discord.gg/qXNWh4dMve" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <MessageCircle size={24} />
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
