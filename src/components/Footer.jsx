import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background mt-auto border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="Elemental Masters" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Elemental Masters is a revolutionary trading card game that combines
              strategic gameplay with the power of the four elements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/kinbrold" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Kinbrold
                </Link>
              </li>
              <li>
                <Link to="/join" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join Now
                </Link>
              </li>
              <li>
                <Link to="/donate" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Elemental Masters */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Elemental Masters</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gameplay" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Gameplay
                </Link>
              </li>
              <li>
                <Link to="/cards" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cards
                </Link>
              </li>
              <li>
                <Link to="/rules" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rules
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Elemental Masters. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="https://discord.gg/qXNWh4dMve"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Discord
              </a>
              <a
                href="https://x.com/elemental_tcg"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                X
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;