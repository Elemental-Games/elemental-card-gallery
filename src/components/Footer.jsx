import { Link } from 'react-router-dom';
import { SITE, hasDiscordInvite } from '@/config/site';
import { trackDiscordClick, trackAlphaCtaClick } from '@/utils/analytics';

const Footer = () => {
  return (
    <footer className="bg-[#120a2e] border-t border-yellow-400/25">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">{SITE.gameName}</h3>
            <p className="text-sm text-purple-200/60 leading-relaxed mb-4">
              An MMOTCG set in {SITE.worldName}. Explore. Hunt. Craft. Collect. Compete.
            </p>
            <Link
              to="/alpha"
              onClick={() => trackAlphaCtaClick('footer')}
              className="inline-block text-sm font-bold text-yellow-400 hover:text-yellow-300"
            >
              Join the Alpha →
            </Link>
          </div>
          <div>
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/kinbrold" className="text-purple-200/70 hover:text-yellow-400">Lore</Link></li>
              <li><Link to="/alpha" className="text-purple-200/70 hover:text-yellow-400">Closed Alpha</Link></li>
              <li><Link to="/about" className="text-purple-200/70 hover:text-yellow-400">Elemental Games</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Elekin TCG</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/elekin" className="text-purple-200/70 hover:text-yellow-400">Overview</Link></li>
              <li><Link to="/cards" className="text-purple-200/70 hover:text-yellow-400">Card Gallery</Link></li>
              <li><Link to="/elekin/how-to-play" className="text-purple-200/70 hover:text-yellow-400">How to Play</Link></li>
              <li><Link to="/tcg" className="text-purple-200/70 hover:text-yellow-400">Play Quickplay</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Community</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/creators" className="text-purple-200/70 hover:text-yellow-400">Creator Program</Link></li>
              <li><Link to="/community" className="text-purple-200/70 hover:text-yellow-400">Community Hub</Link></li>
              <li>
                {hasDiscordInvite() ? (
                  <a
                    href={SITE.discordInviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackDiscordClick('footer')}
                    className="text-purple-200/70 hover:text-yellow-400"
                  >
                    Discord
                  </a>
                ) : (
                  <span className="text-purple-200/40">Discord — Coming Soon</span>
                )}
              </li>
              <li>
                <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-purple-200/70 hover:text-yellow-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-3">Shop & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-purple-200/70 hover:text-yellow-400">Shop</Link></li>
              <li><Link to="/shipping-policy" className="text-purple-200/70 hover:text-yellow-400">Shipping</Link></li>
              <li><Link to="/return-policy" className="text-purple-200/70 hover:text-yellow-400">Returns</Link></li>
              <li><Link to="/privacy-policy" className="text-purple-200/70 hover:text-yellow-400">Privacy</Link></li>
              <li><Link to="/terms-of-service" className="text-purple-200/70 hover:text-yellow-400">Terms</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-yellow-400/20 pt-6 text-center text-sm text-purple-200/40">
          <p>&copy; {new Date().getFullYear()} {SITE.studioName} LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
