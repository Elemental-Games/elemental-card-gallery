import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-darkPurple/80 backdrop-blur-sm border-t border-purple-500/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Elekin TCG</h3>
            <p className="text-purple-300">A new era of trading card games. Join the community and become a Master Elementalist.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-purple-300 hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/shop" className="text-purple-300 hover:text-yellow-400">Shop</Link></li>
              <li><Link to="/elekin/how-to-play" className="text-purple-300 hover:text-yellow-400">How to Play</Link></li>
              <li><Link to="/kinbrold" className="text-purple-300 hover:text-yellow-400">Lore</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy-policy" className="text-purple-300 hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-purple-300 hover:text-yellow-400">Terms of Service</Link></li>
              <li><Link to="/shipping-policy" className="text-purple-300 hover:text-yellow-400">Shipping Policy</Link></li>
              <li><Link to="/return-policy" className="text-purple-300 hover:text-yellow-400">Return Policy</Link></li>
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