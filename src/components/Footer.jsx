import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = {
    column1: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Cards', href: '/cards' },
    ],
    column2: [
      { name: 'Kinbrold', href: '/kinbrold' },
      { name: 'Join', href: '/join' },
      { name: 'Donate', href: '/donate' },
    ],
  };

  const socialLinks = [
    { name: 'Discord', href: 'https://discord.gg/qXNWh4dMve' },
    { name: 'X', href: 'https://x.com/elemental_tcg' },
  ];

  return (
    <footer className="bg-background mt-auto border-t border-border/40">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img src="/logo.png" alt="Elemental Masters" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-muted-foreground">
              Elemental Masters is a revolutionary trading card game that combines
              strategic gameplay with the power of the four elements.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.column1.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h3 className="text-sm font-semibold mb-4">More Links</h3>
            <ul className="space-y-2">
              {quickLinks.column2.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
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
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;