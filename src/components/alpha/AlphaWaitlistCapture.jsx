import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';
import { joinAlphaWaitlist } from '@/lib/supabase';
import { trackAlphaCtaClick } from '@/utils/analytics';

const ALPHA_EMAIL_KEY = 'elekin_alpha_waitlist_email';

export function getStoredAlphaEmail() {
  try {
    return sessionStorage.getItem(ALPHA_EMAIL_KEY) || '';
  } catch {
    return '';
  }
}

export function storeAlphaEmail(email) {
  try {
    sessionStorage.setItem(ALPHA_EMAIL_KEY, email.toLowerCase().trim());
  } catch {
    /* ignore */
  }
}

/**
 * Email-only Alpha tester waitlist — step 1 before the questionnaire on /alpha
 */
export default function AlphaWaitlistCapture({
  placement = 'unknown',
  layout = 'stacked',
  buttonLabel = 'Become an Alpha Tester',
  className = '',
  onJoined,
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    trackAlphaCtaClick(`${placement}_waitlist_submit`);

    const result = await joinAlphaWaitlist(email);
    if (result.success) {
      storeAlphaEmail(result.email || email);
      setStatus(result.alreadyOnList ? 'already' : 'success');
      setMessage(result.message);
      onJoined?.(result.email || email);
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  if (status === 'already') {
    return (
      <div className={`rounded-xl border border-yellow-400/40 bg-yellow-400/10 p-4 text-left ${className}`}>
        <div className="flex gap-3 items-start">
          <CheckCircle className="w-6 h-6 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-200 mb-1">You&apos;re already signed up</p>
            <p className="text-sm text-purple-100/85">{message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className={`rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-left ${className}`}>
        <div className="flex gap-3 items-start">
          <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-emerald-200 mb-1">You&apos;re on the waitlist</p>
            <p className="text-sm text-purple-100/85 mb-3">{message}</p>
            <Link
              to="/alpha#questionnaire"
              className="text-sm font-bold text-yellow-400 hover:text-yellow-300"
              onClick={() => trackAlphaCtaClick(`${placement}_complete_profile`)}
            >
              Complete your tester profile →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const isRow = layout === 'row';

  return (
    <form
      onSubmit={onSubmit}
      className={`${isRow ? 'flex flex-col sm:flex-row gap-2 sm:items-stretch' : 'space-y-3'} ${className}`}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className={`flex-1 min-w-0 rounded-xl bg-black/35 border border-yellow-400/35 px-4 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-400 ${
          isRow ? 'sm:min-w-[220px]' : ''
        }`}
        aria-label="Email for Alpha tester waitlist"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className={`inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-[#1A103C] font-bold px-6 py-3.5 rounded-xl transition-colors shadow-[0_0_25px_rgba(234,179,8,0.25)] ${
          isRow ? 'sm:shrink-0' : 'w-full'
        }`}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" /> Joining…
          </>
        ) : (
          buttonLabel
        )}
      </button>
      {status === 'error' && message && (
        <p className={`text-sm text-red-300 ${isRow ? 'sm:basis-full' : ''}`}>{message}</p>
      )}
    </form>
  );
}
