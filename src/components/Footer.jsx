import { Link } from 'react-router-dom';
import SubscribeButton from './SubscribeButton';

const Footer = () => {
  return (
    <footer className="bg-darkPurple text-white py-8 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/kinbrold" className="hover:text-accent transition-colors">Kinbrold</Link></li>
              <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/join" className="hover:text-accent transition-colors">Join Now</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Elekin</h3>
            <ul className="space-y-2">
              <li>
                <SubscribeButton 
                  variant="link" 
                  className="p-0 text-white hover:text-accent transition-colors h-auto" 
                  showIcon={false}
                >
                  Newsletter
                </SubscribeButton>
              </li>
              <li><Link to="/cards" className="hover:text-accent transition-colors">Cards</Link></li>
              <li><Link to="/elekin/how-to-play" className="hover:text-accent transition-colors">How to Play</Link></li>
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
              <a href="https://x.com/elekinTCG" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <img 
                  src="/x-twitter-brands-solid.svg" 
                  alt="X (Twitter)" 
                  className="h-6 w-6 fill-current text-white"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a>
              <a href="https://discord.gg/qXNWh4dMve" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img 
                  src="/discord.svg" 
                  alt="Discord" 
                  className="h-6 w-6"
                />
              </a>
              {/* <a href="https://instagram.com/elekin_TCG" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <img 
                  src="/x-twitter-brands-solid.svg" 
                  alt="Instagram" 
                  className="h-6 w-6 fill-current text-white"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </a> */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2025 Elemental Games LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;