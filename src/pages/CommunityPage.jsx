import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE, hasDiscordInvite, MMO_IMAGES } from '@/config/site';
import { trackDiscordClick, trackAlphaCtaClick } from '@/utils/analytics';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-[#1A103C] text-white">
      <Helmet>
        <title>Join the Elekin Community</title>
        <meta
          name="description"
          content="Join the official Elekin Discord and community. Closed Alpha opens October 1 — join the tester list today."
        />
        <link rel="canonical" href="https://elementalgames.gg/community" />
      </Helmet>

      <section className="relative border-b border-yellow-400/25 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('${MMO_IMAGES.evermereStreet}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/50 via-[#1A103C]/75 to-[#1A103C]" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-3xl text-center">
        <p className="text-yellow-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">Community</p>
        <h1 className="text-4xl md:text-5xl font-black mb-4">
          Join the <span className="text-yellow-400">Elekin</span> Community
        </h1>
        <p className="text-lg text-purple-100/80 mb-10 leading-relaxed">
          The official Elekin Discord is open — a home for adventurers, TCG players, and creators entering Kinbrold together.
        </p>

        <div className="rounded-2xl border border-yellow-400/30 bg-[#140d32] p-8 md:p-10 mb-8 shadow-[0_0_40px_rgba(234,179,8,0.08)]">
          {hasDiscordInvite() ? (
            <>
              <p className="text-purple-200/80 mb-6">The official Elekin Discord is open.</p>
              <a
                href={SITE.discordInviteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackDiscordClick('community_page')}
                className="inline-flex items-center justify-center bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors"
              >
                Join Discord
              </a>
            </>
          ) : (
            <>
              <p className="text-yellow-400 font-semibold tracking-wider uppercase text-sm mb-3">Coming Soon</p>
              <h2 className="text-2xl font-bold mb-3 text-yellow-300">Official Elekin Discord</h2>
              <p className="text-purple-200/65 mb-6 max-w-md mx-auto">
                The new Discord invite will appear here when it&apos;s ready. In the meantime, join the Alpha tester list — Closed Alpha opens October 1.
              </p>
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center border border-yellow-400/30 bg-yellow-400/5 text-yellow-400/50 font-bold text-lg px-8 py-4 rounded-xl cursor-not-allowed"
              >
                Discord — Coming Soon
              </button>
            </>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4 text-left">
          <Link
            to="/alpha"
            onClick={() => trackAlphaCtaClick('community_page')}
            className="rounded-xl border-2 border-yellow-400/50 bg-yellow-400/10 p-5 hover:bg-yellow-400/15 transition-colors"
          >
            <h3 className="font-bold text-yellow-300 mb-1">Join the Tester List</h3>
            <p className="text-sm text-purple-200/70">Closed Alpha opens October 1. Internal testing now.</p>
          </Link>
          <Link
            to="/creators"
            className="rounded-xl border border-yellow-400/30 bg-yellow-400/5 p-5 hover:border-yellow-400/55 hover:bg-yellow-400/10 transition-colors"
          >
            <h3 className="font-bold text-yellow-400 mb-1">Creator Program</h3>
            <p className="text-sm text-purple-200/70">Apply if you create for MMOs, TCGs, or gaming audiences.</p>
          </Link>
        </div>

        <div className="mt-10 flex justify-center gap-6 text-sm">
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400">
            Instagram
          </a>
          <a href={SITE.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400">
            TikTok
          </a>
        </div>
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
