import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getAnchorRect(selector) {
  if (!selector) return null;
  const el = document.querySelector(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return { rect, el };
}

/**
 * Guided tutorial overlay that anchors a callout near a DOM element.
 * Steps should provide:
 * - title, body
 * - targetSelector (e.g. [data-tutorial-id="turnControls"])
 * - placement: 'top' | 'bottom' | 'left' | 'right'
 */
const TutorialOverlay = ({
  isOpen,
  step,
  stepIndex,
  stepCount,
  onNext,
  onBack,
  onClose,
}) => {
  const [pos, setPos] = useState({ top: 24, left: 24, showArrow: false, arrow: { top: 0, left: 0, rotate: 0 } });

  const selector = step?.targetSelector;
  const placement = step?.placement || 'bottom';

  const overlay = useMemo(() => ({ padding: 16, calloutW: 420, calloutH: 220 }), []);

  useEffect(() => {
    if (!isOpen) return;

    const compute = () => {
      const anchor = getAnchorRect(selector);
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Default if no anchor found
      if (!anchor) {
        setPos({ top: 24, left: 24, showArrow: false, arrow: { top: 0, left: 0, rotate: 0 } });
        return;
      }

      const { rect } = anchor;
      const calloutW = overlay.calloutW;
      const calloutH = overlay.calloutH;
      const gap = 14;

      let top = rect.top;
      let left = rect.left;
      let arrowRotate = 0;
      let arrowTop = 0;
      let arrowLeft = 0;

      if (placement === 'top') {
        top = rect.top - calloutH - gap;
        left = rect.left + rect.width / 2 - calloutW / 2;
        arrowRotate = 180;
        arrowTop = top + calloutH - 6;
        arrowLeft = rect.left + rect.width / 2 - 8;
      } else if (placement === 'bottom') {
        top = rect.bottom + gap;
        left = rect.left + rect.width / 2 - calloutW / 2;
        arrowRotate = 0;
        arrowTop = top - 10;
        arrowLeft = rect.left + rect.width / 2 - 8;
      } else if (placement === 'left') {
        top = rect.top + rect.height / 2 - calloutH / 2;
        left = rect.left - calloutW - gap;
        arrowRotate = 90;
        arrowTop = rect.top + rect.height / 2 - 8;
        arrowLeft = left + calloutW - 6;
      } else if (placement === 'right') {
        top = rect.top + rect.height / 2 - calloutH / 2;
        left = rect.right + gap;
        arrowRotate = -90;
        arrowTop = rect.top + rect.height / 2 - 8;
        arrowLeft = left - 10;
      }

      top = clamp(top, overlay.padding, Math.max(overlay.padding, vh - calloutH - overlay.padding));
      left = clamp(left, overlay.padding, Math.max(overlay.padding, vw - calloutW - overlay.padding));

      setPos({
        top,
        left,
        showArrow: true,
        arrow: { top: arrowTop, left: arrowLeft, rotate: arrowRotate },
      });
    };

    compute();
    const onResize = () => compute();
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onResize, true);

    const raf = requestAnimationFrame(compute);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onResize, true);
    };
  }, [isOpen, selector, placement, overlay.calloutH, overlay.calloutW, overlay.padding]);

  return (
    <AnimatePresence>
      {isOpen && step && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[20050] bg-black/70"
        >
          {/* Callout */}
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            className="absolute bg-[#1A103C] border border-yellow-500/25 rounded-xl shadow-2xl p-5 w-[420px] max-w-[92vw]"
            style={{ top: pos.top, left: pos.left }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xs uppercase tracking-wide text-purple-200/80">
                  Step {stepIndex + 1} of {stepCount}
                </div>
                <div className="text-xl font-bold text-white">{step.title}</div>
              </div>
              <button onClick={onClose} className="text-purple-300 hover:text-white transition-colors" aria-label="Close tutorial">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-3 text-sm text-purple-100 whitespace-pre-line leading-relaxed">
              {step.body}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={onBack}
                disabled={stepIndex === 0}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
                  stepIndex === 0
                    ? 'border-white/10 text-white/40 bg-white/5 cursor-not-allowed'
                    : 'border-purple-500/30 text-white bg-purple-800/40 hover:bg-purple-700/50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>

              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-400 text-purple-900 font-bold transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>

          {/* Arrow indicator */}
          {pos.showArrow && (
            <div
              className="absolute w-0 h-0"
              style={{
                top: pos.arrow.top,
                left: pos.arrow.left,
                transform: `rotate(${pos.arrow.rotate}deg)`,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: '14px solid rgba(245, 158, 11, 0.85)', // yellow-ish
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TutorialOverlay;


