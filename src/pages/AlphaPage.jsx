import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckCircle, Loader2 } from 'lucide-react';
import { submitAlphaApplication } from '@/lib/supabase';
import {
  trackAlphaApplicationStart,
  trackAlphaApplicationComplete,
  trackAlphaCtaClick,
} from '@/utils/analytics';
import { MMO_IMAGES } from '@/config/site';

const areas = [
  {
    name: 'Evermere',
    image: MMO_IMAGES.evermereStreet,
    text: 'The starting settlement and introduction to Kinbrold — tutorial, early quests, and your first steps as an adventurer.',
  },
  {
    name: 'The Road to Scarto',
    image: MMO_IMAGES.roadToScarto,
    text: 'A connecting subregion where players leave Evermere and begin encountering stronger enemies, materials, and progression systems.',
  },
  {
    name: 'Scarto',
    image: MMO_IMAGES.scarto,
    text: 'The Fire Kingdom and the first major kingdom Closed Alpha players will reach.',
  },
];

const emptyForm = {
  email: '',
  displayName: '',
  platform: '',
  gamesPlayed: '',
  tcgExperience: '',
  interest: '',
  discordUsername: '',
};

const AlphaPage = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');
  const [started, setStarted] = useState(false);

  const onChange = (e) => {
    if (!started) {
      setStarted(true);
      trackAlphaApplicationStart();
    }
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
    trackAlphaCtaClick('alpha_form_submit');

    const result = await submitAlphaApplication(form);
    if (result.success) {
      setStatus('success');
      setMessage(result.message);
      trackAlphaApplicationComplete();
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
        <title>Elekin Closed Alpha — Opens October 1</title>
        <meta
          name="description"
          content="Elekin Closed Alpha opens October 1. Join the tester list now while we finish internal testing. Evermere, the road to Scarto, and Scarto."
        />
        <link rel="canonical" href="https://elementalgames.gg/alpha" />
      </Helmet>

      <section className="relative overflow-hidden border-b border-yellow-400/25">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('${MMO_IMAGES.kinbroldMap}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/60 to-[#1A103C]" />
        <div className="relative container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Closed Alpha · Opens October 1
          </p>
          <h1 className="text-4xl md:text-6xl font-black mb-5 leading-tight">
            Be among the first to enter <span className="text-yellow-400">Kinbrold</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100/85 max-w-2xl mx-auto mb-4">
            Closed Alpha opens <strong className="text-yellow-400">October 1</strong>. We&apos;re testing internally right now — join the tester list to be considered for access when Alpha goes live.
          </p>
          <p className="text-sm text-yellow-400/80 font-medium">
            Open for testers · Internal testing until October 1
          </p>
        </div>
      </section>

      {/* World preview */}
      <section className="py-14 border-b border-yellow-400/20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
            Alpha <span className="text-yellow-400">World Preview</span>
          </h2>
          <p className="text-center text-purple-200/70 mb-10 max-w-2xl mx-auto">
            The first Closed Alpha focuses on these areas — the beginning of Kinbrold, not the entire map.
          </p>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {areas.map((area) => (
              <article key={area.name} className="rounded-2xl overflow-hidden border border-yellow-400/25 bg-[#140d32] hover:border-yellow-400/50 transition-colors">
                <div className="h-40 bg-cover bg-center border-b border-yellow-400/15" style={{ backgroundImage: `url('${area.image}')` }} />
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-yellow-400">{area.name}</h3>
                  <p className="text-sm text-purple-200/70 leading-relaxed">{area.text}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center text-sm text-purple-200/55 mt-8 max-w-3xl mx-auto">
            Alpha scope also includes tutorial systems, initial quests, creature combat and drops, Creature Drop Log, Essence, equipment/progression, card crafting, collection, deck building, and multiplayer Elekin TCG Quickplay.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-16 md:py-20" id="join">
        <div className="container mx-auto px-4 max-w-xl">
          <h2 className="text-3xl font-bold text-center mb-2">
            Join the <span className="text-yellow-400">Tester List</span>
          </h2>
          <p className="text-center text-purple-200/70 mb-8">
            Closed Alpha opens October 1. Sign up now while we finish internal testing — we&apos;ll contact you by email.
          </p>

          {status === 'success' ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-8 text-center">
              <CheckCircle className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">You&apos;re on the list</h3>
              <p className="text-purple-100/80 mb-6">{message}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/creators" className="text-yellow-400 font-semibold hover:text-yellow-300">
                  Creator Program
                </Link>
                <Link to="/community" className="text-yellow-400 font-semibold hover:text-yellow-300">
                  Community
                </Link>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="text-white/50 hover:text-white/80 text-sm"
                >
                  Submit another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-yellow-400/30 bg-[#140d32] p-6 md:p-8 shadow-[0_0_40px_rgba(234,179,8,0.08)]">
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label htmlFor="displayName" className={labelClass}>
                  Display name / preferred username
                </label>
                <input
                  id="displayName"
                  name="displayName"
                  value={form.displayName}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="How should we address you?"
                />
              </div>
              <div>
                <label htmlFor="platform" className={labelClass}>
                  Preferred gaming platform
                </label>
                <select
                  id="platform"
                  name="platform"
                  value={form.platform}
                  onChange={onChange}
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
                <label htmlFor="gamesPlayed" className={labelClass}>
                  Games / MMOs you play
                </label>
                <input
                  id="gamesPlayed"
                  name="gamesPlayed"
                  value={form.gamesPlayed}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="e.g. OSRS, WoW, New World…"
                />
              </div>
              <div>
                <label htmlFor="tcgExperience" className={labelClass}>
                  TCG experience
                </label>
                <select
                  id="tcgExperience"
                  name="tcgExperience"
                  value={form.tcgExperience}
                  onChange={onChange}
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
                <label htmlFor="interest" className={labelClass}>
                  What interests you most about Elekin?
                </label>
                <textarea
                  id="interest"
                  name="interest"
                  rows={3}
                  value={form.interest}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="Exploration, crafting cards, Quickplay, lore…"
                />
              </div>
              <div>
                <label htmlFor="discordUsername" className={labelClass}>
                  Discord username (optional)
                </label>
                <input
                  id="discordUsername"
                  name="discordUsername"
                  value={form.discordUsername}
                  onChange={onChange}
                  className={fieldClass}
                  placeholder="name#0000 or handle"
                />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg px-3 py-2">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 text-purple-900 font-bold text-lg py-4 rounded-xl transition-colors shadow-[0_0_25px_rgba(234,179,8,0.3)]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Submitting…
                  </>
                ) : (
                  'Join the Tester List'
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default AlphaPage;
