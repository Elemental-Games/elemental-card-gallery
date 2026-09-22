import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { joinAlphaWaitlist, submitAlphaQuestionnaire } from '@/lib/supabase';
import {
  trackAlphaApplicationStart,
  trackAlphaApplicationComplete,
  trackAlphaCtaClick,
} from '@/utils/analytics';
import { storeAlphaEmail } from '@/components/alpha/AlphaWaitlistCapture';

const emptyProfile = {
  displayName: '',
  platform: '',
  gamesPlayed: '',
  tcgExperience: '',
  interest: '',
  discordUsername: '',
};

const fieldClass =
  'w-full rounded-lg bg-black/30 border border-yellow-400/25 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-yellow-400';
const labelClass = 'block text-sm font-medium text-yellow-400/90 mb-1.5';

const shootQuestionnaireConfetti = () => {
  const colors = ['#EAB308', '#FDE047', '#A855F7', '#C084FC', '#FFFFFF'];
  confetti({
    particleCount: 70,
    spread: 55,
    startVelocity: 28,
    origin: { x: 0.5, y: 0.45 },
    colors,
    ticks: 140,
    zIndex: 9999,
  });
  window.setTimeout(() => {
    confetti({
      particleCount: 35,
      spread: 90,
      origin: { x: 0.5, y: 0.55 },
      colors,
      scalar: 0.85,
      zIndex: 9999,
    });
  }, 120);
};

export default function AlphaSignupModal({ open, onOpenChange, placement = 'unknown' }) {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doneMessage, setDoneMessage] = useState('');
  const [startedProfile, setStartedProfile] = useState(false);

  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => {
        setStep('email');
        setEmail('');
        setProfile(emptyProfile);
        setLoading(false);
        setError('');
        setDoneMessage('');
        setStartedProfile(false);
      }, 200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [open]);

  useEffect(() => {
    if (open && step === 'done') {
      shootQuestionnaireConfetti();
    }
  }, [open, step]);

  const onEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    trackAlphaCtaClick(`${placement}_modal_email`);

    const result = await joinAlphaWaitlist(email);
    setLoading(false);

    if (result.success) {
      const confirmed = (result.email || email).toLowerCase().trim();
      setEmail(confirmed);
      storeAlphaEmail(confirmed);
      if (result.alreadyOnList) {
        setDoneMessage(result.message);
        setStep('already');
      } else {
        setStep('profile');
      }
    } else {
      setError(result.message);
    }
  };

  const onProfileChange = (e) => {
    if (!startedProfile) {
      setStartedProfile(true);
      trackAlphaApplicationStart();
    }
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    trackAlphaCtaClick(`${placement}_modal_profile`);

    const result = await submitAlphaQuestionnaire({ email, ...profile });
    setLoading(false);

    if (result.success) {
      trackAlphaApplicationComplete();
      setDoneMessage(result.message);
      setStep('done');
    } else {
      setError(result.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[min(90vh,720px)] overflow-y-auto border-yellow-400/30 bg-[#140d32] text-white sm:rounded-2xl">
        {step === 'email' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-400">Become an Alpha Tester</DialogTitle>
              <DialogDescription className="text-purple-200/80">
                Closed Alpha opens October 1. Enter your email to join the waitlist — then tell us a bit about you in the next step.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onEmailSubmit} className="space-y-4 mt-2">
              <div>
                <label htmlFor="alpha-modal-email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="alpha-modal-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass}
                  placeholder="you@email.com"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-purple-900 font-bold text-lg py-3.5 rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Joining waitlist…
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </form>
          </>
        )}

        {step === 'already' && (
          <div className="text-center py-4">
            <Mail className="w-14 h-14 text-yellow-400 mx-auto mb-4" />
            <DialogTitle className="text-2xl mb-2">You&apos;re already signed up</DialogTitle>
            <p className="text-purple-100/85 mb-2">{doneMessage}</p>
            <p className="text-sm text-purple-200/60 mb-6">
              Waitlist email: <span className="text-yellow-400/90 font-medium">{email}</span>
            </p>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-3 rounded-xl"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => setStep('profile')}
                className="text-sm text-purple-300/80 hover:text-purple-200 py-2"
              >
                Update tester profile
              </button>
            </div>
          </div>
        )}

        {step === 'profile' && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-400">Tester profile</DialogTitle>
              <DialogDescription className="text-purple-200/80">
                You&apos;re on the waitlist as <span className="text-yellow-400 font-medium">{email}</span>. Optional
                details help us match you to Closed Alpha.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onProfileSubmit} className="space-y-3 mt-2">
              <div>
                <label htmlFor="alpha-modal-displayName" className={labelClass}>
                  Display name / preferred username
                </label>
                <input
                  id="alpha-modal-displayName"
                  name="displayName"
                  value={profile.displayName}
                  onChange={onProfileChange}
                  className={fieldClass}
                  placeholder="How should we address you?"
                />
              </div>
              <div>
                <label htmlFor="alpha-modal-platform" className={labelClass}>
                  Preferred gaming platform
                </label>
                <select
                  id="alpha-modal-platform"
                  name="platform"
                  value={profile.platform}
                  onChange={onProfileChange}
                  className={fieldClass}
                >
                  <option value="">Select…</option>
                  <option value="PC">PC</option>
                  <option value="Mac">Mac</option>
                  <option value="Console">Console</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Multiple">Multiple</option>
                </select>
              </div>
              <div>
                <label htmlFor="alpha-modal-gamesPlayed" className={labelClass}>
                  Games / MMOs you play
                </label>
                <input
                  id="alpha-modal-gamesPlayed"
                  name="gamesPlayed"
                  value={profile.gamesPlayed}
                  onChange={onProfileChange}
                  className={fieldClass}
                  placeholder="e.g. OSRS, WoW, New World…"
                />
              </div>
              <div>
                <label htmlFor="alpha-modal-tcgExperience" className={labelClass}>
                  TCG experience
                </label>
                <select
                  id="alpha-modal-tcgExperience"
                  name="tcgExperience"
                  value={profile.tcgExperience}
                  onChange={onProfileChange}
                  className={fieldClass}
                >
                  <option value="">Select…</option>
                  <option value="None">None</option>
                  <option value="Casual">Casual</option>
                  <option value="Regular">Regular player</option>
                  <option value="Competitive">Competitive</option>
                </select>
              </div>
              <div>
                <label htmlFor="alpha-modal-interest" className={labelClass}>
                  What interests you most about Elekin?
                </label>
                <textarea
                  id="alpha-modal-interest"
                  name="interest"
                  rows={3}
                  value={profile.interest}
                  onChange={onProfileChange}
                  className={fieldClass}
                  placeholder="Exploration, crafting cards, Quickplay, lore…"
                />
              </div>
              <div>
                <label htmlFor="alpha-modal-discord" className={labelClass}>
                  Discord username (optional)
                </label>
                <input
                  id="alpha-modal-discord"
                  name="discordUsername"
                  value={profile.discordUsername}
                  onChange={onProfileChange}
                  className={fieldClass}
                  placeholder="name#0000 or handle"
                />
              </div>
              {error && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-purple-900 font-bold text-lg py-3.5 rounded-xl transition-colors"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Saving…
                  </>
                ) : (
                  'Submit tester profile'
                )}
              </button>
              <button
                type="button"
                className="w-full text-sm text-purple-300/70 hover:text-purple-200"
                onClick={() => onOpenChange(false)}
              >
                Skip for now — you&apos;re already on the waitlist
              </button>
            </form>
          </>
        )}

        {step === 'done' && (
          <div className="text-center py-4">
            <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
            <DialogTitle className="text-2xl mb-2">You&apos;re all set</DialogTitle>
            <p className="text-purple-100/85 mb-6">{doneMessage}</p>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold px-8 py-3 rounded-xl"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
