import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darkPurple/80 backdrop-blur-sm border-t border-purple-500/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Elekin</h3>
            <ul className="space-y-2">
              <li><Link to="/cards/campaign" className="text-purple-300 hover:text-yellow-400">Card Gallery</Link></li>
              <li><Link to="/elekin/how-to-play" className="text-purple-300 hover:text-yellow-400">How to Play</Link></li>
              <li><Link to="/tcg" className="text-purple-300 hover:text-yellow-400">Pre-Launch Beta</Link></li>
              <li><Link to="/kinbrold" className="text-purple-300 hover:text-yellow-400">Lore</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-purple-300 hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/join-now" className="text-purple-300 hover:text-yellow-400">Kickstarter</Link></li>
              <li><a href="https://discord.gg/QyNDMYprCg" className="text-purple-300 hover:text-yellow-400">Discord</a></li>
              <li><a href="https://www.youtube.com/@ElekinTCG" className="text-purple-300 hover:text-yellow-400">YouTube</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Shop</h3>
            <ul className="space-y-2">
              <li><Link to="/shop" className="text-purple-300 hover:text-yellow-400">Demo Day Products</Link></li>
              <li><Link to="/shipping-policy" className="text-purple-300 hover:text-yellow-400">Shipping</Link></li>
              <li><Link to="/return-policy" className="text-purple-300 hover:text-yellow-400">Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-purple-300 hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-purple-300 hover:text-yellow-400">Terms of Service</Link></li>
              <li><Link to="/legal" className="text-purple-300 hover:text-yellow-400">Legal Info</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-purple-500/30 pt-8 text-center text-purple-300">
          <p>&copy; {new Date().getFullYear()} Elemental Games LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;