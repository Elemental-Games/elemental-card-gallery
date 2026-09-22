import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle } from 'lucide-react';
import { subscribeEmail } from '@/lib/supabase';
import { trackCreatorCtaClick } from '@/utils/analytics';

/** Email capture for Creator Program interest — full application stays on /creators */
export default function CreatorInterestCapture({ placement = 'unknown', className = '' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    trackCreatorCtaClick(`${placement}_interest_submit`);

    const result = await subscribeEmail(email);
    if (result.success) {
      setStatus('success');
      setMessage('Thanks! We\'ll email you about Creator Program openings and early access.');
    } else if (result.message?.includes('already subscribed')) {
      setStatus('success');
      setMessage('You\'re already on our list — we\'ll share Creator Program updates by email.');
    } else {
      setStatus('error');
      setMessage(result.message);
    }
  };

  if (status === 'success') {
    return (
      <div className={`rounded-xl border border-yellow-400/40 bg-yellow-400/10 p-4 text-left ${className}`}>
        <div className="flex gap-3 items-start">
          <CheckCircle className="w-6 h-6 text-yellow-400 shrink-0" />
          <div>
            <p className="text-sm text-purple-100/90 mb-2">{message}</p>
            <Link to="/creators" className="text-sm font-bold text-yellow-400 hover:text-yellow-300">
              Apply for the full Creator Program →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Creator email"
        className="flex-1 min-w-0 rounded-xl bg-black/35 border border-yellow-400/35 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-yellow-400"
        aria-label="Email for Creator Program updates"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center justify-center gap-2 bg-yellow-400/90 hover:bg-yellow-300 disabled:opacity-60 text-purple-900 font-bold px-5 py-3 rounded-xl transition-colors shrink-0"
      >
        {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Get Creator Updates'}
      </button>
      {status === 'error' && message && <p className="text-sm text-red-300 sm:basis-full">{message}</p>}
    </form>
  );
}
