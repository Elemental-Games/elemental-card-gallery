import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Loader2, Sparkles, ArrowRight, Eye, KeyRound, Clapperboard } from 'lucide-react';
import { submitCreatorApplication } from '@/lib/supabase';
import {
  trackCreatorApplicationStart,
  trackCreatorApplicationComplete,
  trackCreatorCtaClick,
} from '@/utils/analytics';
import { MMO_IMAGES } from '@/config/site';

const communities = [
  'Old School RuneScape',
  'RuneScape',
  'RSPS',
  'World of Warcraft',
  'New World',
  'MMO communities',
  'Pokémon',
  'TCGs',
  'RPGs',
  'Twitch',
  'YouTube',
  'TikTok',
  'Gaming communities generally',
];

const hooks = [
  {
    icon: Eye,
    title: 'See Kinbrold first',
    text: 'Early looks, exclusive reveals, and creator testing before the wider audience.',
  },
  {
    icon: KeyRound,
    title: 'Keys for your community',
    text: 'Consideration for Alpha access — and possible viewer key allocations when Closed Alpha opens October 1.',
  },
  {
    icon: Clapperboard,
    title: 'Build with us',
    text: 'Creator events, Quickplay tournaments, Discord access, and a real path to future partnerships.',
  },
];

const opportunities = [
  'Early Alpha consideration',
  'Creator testing access',
  'Viewer Alpha key allocations',
  'Exclusive reveals',
  'Creator events',
  'Quickplay tournaments',
  'Creator Discord access',
  'Developer access',
  'Referral tracking',
  'Future paid partnerships',
];

const emptyForm = {
  name: '',
  email: '',
  channelName: '',
  platforms: '',
  profileUrls: '',
  primaryTopics: '',
  audienceSize: '',
  typicalViews: '',
  countryTimezone: '',
  whyElekin: '',
  notes: '',
};

const CreatorsPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [started, setStarted] = useState(false);

  const onChange = (e) => {
    if (!started) {
      setStarted(true);
      trackCreatorApplicationStart();
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    trackCreatorCtaClick('creators_form_submit');

    const result = await submitCreatorApplication(form);
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      trackCreatorApplicationComplete();
      setForm(emptyForm);
    } else {
      setStatus('error');
      setMessage(result.message || 'Something went wrong.');
    }
  };

  const fieldClass =
    'w-full rounded-lg bg-black/30 border border-yellow-400/25 px-4 py-3 text-white placeholder:text-white/35 focus:outline-none focus:border-yellow-400';
  const labelClass = 'block text-sm font-medium text-yellow-400/90 mb-1.5';

  return (
    <div className="min-h-screen bg-[#1A103C] text-white">
      <Helmet>
        <title>Elekin Creator Program — Enter Kinbrold First</title>
        <meta
          name="description"
          content="Apply to the Elekin Creator Program. Early looks at Kinbrold, creator testing, and Alpha consideration as Closed Alpha opens October 1."
        />
        <link rel="canonical" href="https://elementalgames.gg/creators" />
      </Helmet>

      <section className="relative border-b border-yellow-400/25 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('${MMO_IMAGES.evermereCrafting}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/45 to-[#1A103C]/90" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-400/50 bg-yellow-400/10 px-4 py-1.5 mb-5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Now recruiting</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Elekin <span className="text-yellow-400">Creator Program</span>
          </h1>
          <p className="text-xl md:text-2xl text-yellow-300/95 font-semibold mb-4">
            Be among the first creators to enter Kinbrold.
          </p>
          <p className="text-purple-100/80 leading-relaxed mb-8 max-w-2xl mx-auto">
            An MMOTCG where adventures craft cards — and creators help introduce the world. Early access consideration, exclusive reveals, and a seat before Closed Alpha opens October 1.
          </p>
          <a
            href="#apply"
            onClick={() => trackCreatorCtaClick('creators_hero')}
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-bold text-lg px-8 py-4 rounded-xl shadow-[0_0_30px_rgba(234,179,8,0.35)] transition-colors"
          >
            Apply to the Creator Program
            <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-purple-200/50 mt-4">
            Alpha acceptance and paid partnerships are not guaranteed.
          </p>
        </div>
      </section>

      <section className="py-14 border-b border-yellow-400/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-5">
            {hooks.map((h) => {
              const Icon = h.icon;
              return (
                <div
                  key={h.title}
                  className="rounded-2xl border border-yellow-400/30 bg-yellow-400/5 p-6 hover:border-yellow-400/55 transition-colors"
                >
                  <div className="w-11 h-11 rounded-full bg-yellow-400/15 border border-yellow-400/40 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-yellow-400" />
                  </div>
                  <h3 className="text-lg font-bold text-yellow-400 mb-2">{h.title}</h3>
                  <p className="text-sm text-purple-200/75 leading-relaxed">{h.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-yellow-400/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            Built for creators from <span className="text-yellow-400">these worlds</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {communities.map((c) => (
              <span
                key={c}
                className="text-sm px-3 py-1.5 rounded-full border border-yellow-400/30 bg-yellow-400/5 text-yellow-100/90"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 border-b border-yellow-400/20 bg-[#140d32]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-xl font-bold mb-4 text-center">
            Potential <span className="text-yellow-400">creator opportunities</span>
          </h2>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm text-purple-100/80">
            {opportunities.map((o) => (
              <li key={o} className="rounded-lg border border-yellow-400/20 bg-yellow-400/5 px-4 py-3">
                {o}
              </li>
            ))}
          </ul>
          <p className="text-center text-xs text-purple-200/40 mt-6">
            Opportunities may vary. Alpha access and paid partnerships are not guaranteed.
          </p>
        </div>
      </section>

      <section className="py-16" id="apply">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-2">
            Apply to the <span className="text-yellow-400">Creator Program</span>
          </h2>
          <p className="text-center text-purple-200/70 mb-8">We review applications and follow up by email.</p>

          {status === 'success' ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Application received</h3>
              <p className="text-purple-100/80 mb-6">{message}</p>
              <Link to="/alpha" className="text-yellow-400 font-semibold hover:text-yellow-300">
                Also join the Alpha tester list →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-yellow-400/30 bg-[#140d32] p-6 md:p-8 shadow-[0_0_40px_rgba(234,179,8,0.08)]">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className={labelClass}>Name *</label>
                  <input id="name" name="name" required value={form.name} onChange={onChange} className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>Email *</label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={onChange} className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="channelName" className={labelClass}>Channel / creator name</label>
                <input id="channelName" name="channelName" value={form.channelName} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="platforms" className={labelClass}>Platform(s)</label>
                <input id="platforms" name="platforms" value={form.platforms} onChange={onChange} className={fieldClass} placeholder="Twitch, YouTube, TikTok…" />
              </div>
              <div>
                <label htmlFor="profileUrls" className={labelClass}>Channel / profile URLs</label>
                <textarea id="profileUrls" name="profileUrls" rows={2} value={form.profileUrls} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="primaryTopics" className={labelClass}>Primary games / topics</label>
                <input id="primaryTopics" name="primaryTopics" value={form.primaryTopics} onChange={onChange} className={fieldClass} />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="audienceSize" className={labelClass}>Approximate audience size</label>
                  <input id="audienceSize" name="audienceSize" value={form.audienceSize} onChange={onChange} className={fieldClass} placeholder="e.g. 2k followers" />
                </div>
                <div>
                  <label htmlFor="typicalViews" className={labelClass}>Typical views (optional)</label>
                  <input id="typicalViews" name="typicalViews" value={form.typicalViews} onChange={onChange} className={fieldClass} />
                </div>
              </div>
              <div>
                <label htmlFor="countryTimezone" className={labelClass}>Country / timezone</label>
                <input id="countryTimezone" name="countryTimezone" value={form.countryTimezone} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="whyElekin" className={labelClass}>Why Elekin interests you</label>
                <textarea id="whyElekin" name="whyElekin" rows={3} value={form.whyElekin} onChange={onChange} className={fieldClass} />
              </div>
              <div>
                <label htmlFor="notes" className={labelClass}>Notes</label>
                <textarea id="notes" name="notes" rows={2} value={form.notes} onChange={onChange} className={fieldClass} />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-purple-900 font-bold text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(234,179,8,0.3)]"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
                ) : (
                  'Apply to the Elekin Creator Program'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default CreatorsPage;
