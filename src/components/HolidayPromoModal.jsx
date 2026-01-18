import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HOLIDAY_BUNDLE_PROMO } from '@/data/bundles';
import TrackedLink from '@/components/TrackedLink';

const SEEN_KEY = 'elekin_seen_holiday_promo_v1';

/**
 * Auto-opens once per session after a delay; provides promo info without living on the page.
 */
const HolidayPromoModal = ({ delayMs = 3000 }) => {
  const [isOpen, setIsOpen] = useState(false);

  const deadline = useMemo(() => new Date(HOLIDAY_BUNDLE_PROMO.deadlineISO), []);
  const daysLeft = useMemo(() => {
    const msLeft = deadline.getTime() - Date.now();
    return Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  }, [deadline]);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(SEEN_KEY)) return;
      const t = setTimeout(() => {
        setIsOpen(true);
        window.sessionStorage.setItem(SEEN_KEY, '1');
      }, delayMs);
      return () => clearTimeout(t);
    } catch {
      // if storage blocked, still show after delay
      const t = setTimeout(() => setIsOpen(true), delayMs);
      return () => clearTimeout(t);
    }
  }, [delayMs]);

  const close = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={close}
        >
          <motion.div
            initial={{ scale: 0.97, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 12 }}
            className="bg-[#1A103C] border border-yellow-500/25 rounded-lg p-6 sm:p-8 max-w-xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#D4AF37' }}>
                    {HOLIDAY_BUNDLE_PROMO.headline}
                  </h2>
                  <p className="text-sm text-purple-200">
                    {daysLeft} day{daysLeft === 1 ? '' : 's'} left • Limited Demo Day Edition inventory
                  </p>
                </div>
              </div>
              <button
                onClick={close}
                className="text-purple-300 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-5 bg-black/25 border border-yellow-500/20 rounded-lg p-4">
              <ul className="text-sm text-purple-100 space-y-2">
                {HOLIDAY_BUNDLE_PROMO.bonusBullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <Sparkles className="h-4 w-4 text-yellow-400 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              {HOLIDAY_BUNDLE_PROMO.guarantee ? (
                <p className="mt-3 text-xs text-purple-200">
                  {HOLIDAY_BUNDLE_PROMO.guarantee}{' '}
                  <Link to="/return-policy" className="underline hover:text-yellow-300">
                    Returns policy
                  </Link>
                  .
                </p>
              ) : (
                <p className="mt-3 text-xs text-purple-200">
                  <Link to="/return-policy" className="underline hover:text-yellow-300">
                    Returns policy
                  </Link>
                  .
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <TrackedLink
                to={HOLIDAY_BUNDLE_PROMO.primaryCtaPath}
                className="flex-1 text-center bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold py-3 px-4 rounded-lg transition-colors"
                onClick={close}
              >
                Shop 2‑Player Bundle →
              </TrackedLink>
              <button
                type="button"
                onClick={close}
                className="flex-1 bg-purple-800/60 hover:bg-purple-700/60 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Not now
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HolidayPromoModal;


