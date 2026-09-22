import { Link } from 'react-router-dom';
import { isPhysicalShopPaused } from '@/config/site';

/**
 * Shared context for visitors: physical Elekin TCG existed; focus is now the MMOTCG.
 * Shown on TCG hub and shop when inventory is paused.
 */
export default function PhysicalProductNotice({ variant = 'strip' }) {
  if (variant === 'compact') {
    return (
      <p className="text-sm text-purple-200/80 leading-relaxed">
        We previously released a physical Elekin TCG (Lightning &amp; Crystal and related products).{' '}
        <strong className="text-yellow-400 font-semibold">Elemental Games is now building Elekin as an MMOTCG</strong> in Kinbrold.
        Online inventory orders are paused while we focus on Closed Alpha and community growth.{' '}
        {isPhysicalShopPaused() && (
          <Link to="/shop" className="text-yellow-400 hover:text-yellow-300 underline">
            Shop status
          </Link>
        )}
      </p>
    );
  }

  if (variant === 'shop') {
    return (
      <div className="max-w-3xl mx-auto mb-10 rounded-2xl border-2 border-yellow-400/40 bg-yellow-400/10 p-6 md:p-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-yellow-400 mb-3">
          Physical product · Orders paused
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          We&apos;re focused on the Elekin MMOTCG
        </h2>
        <p className="text-purple-100/85 leading-relaxed mb-4">
          Elemental Games shipped a physical Elekin TCG to players and retailers. We did not fulfill our Kickstarter
          campaign as originally planned and have pivoted to developing{' '}
          <strong className="text-yellow-400">Elekin as an MMOTCG</strong> set in Kinbrold — where your adventures
          build your card collection.
        </p>
        <p className="text-purple-200/75 text-sm leading-relaxed mb-6">
          To everyone who ordered physical product: thank you. We&apos;re pausing new inventory orders until after
          Closed Alpha and a stronger community around the game. Existing owners can still explore the{' '}
          <Link to="/cards" className="text-yellow-400 hover:text-yellow-300 underline">
            card gallery
          </Link>{' '}
          and{' '}
          <Link to="/tcg" className="text-yellow-400 hover:text-yellow-300 underline">
            browser Quickplay
          </Link>
          .
        </p>
        <Link
          to="/alpha"
          className="inline-flex items-center justify-center bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-3 rounded-xl transition-colors"
        >
          Join the Alpha tester list
        </Link>
      </div>
    );
  }

  // default strip on Elekin TCG overview
  return (
    <div className="border-b border-yellow-400/30 bg-[#140d32]">
      <div className="container mx-auto px-4 py-4 text-center max-w-4xl">
        <p className="text-sm md:text-base text-purple-100/90 leading-relaxed">
          <span className="text-yellow-400 font-semibold">Elekin today:</span> We&apos;ve released a physical TCG and
          browser Quickplay. Our main focus is now the{' '}
          <Link to="/" className="text-yellow-400 hover:text-yellow-300 underline font-semibold">
            Elekin MMOTCG
          </Link>{' '}
          in Kinbrold (Closed Alpha opens October 1).{' '}
          {isPhysicalShopPaused() ? (
            <>
              New physical orders are{' '}
              <Link to="/shop" className="text-yellow-400 hover:text-yellow-300 underline">
                paused
              </Link>{' '}
              while we build the game and community.
            </>
          ) : null}{' '}
          <Link to="/alpha" className="text-yellow-400 hover:text-yellow-300 underline font-semibold ml-1">
            Join the Alpha →
          </Link>
        </p>
      </div>
    </div>
  );
}
