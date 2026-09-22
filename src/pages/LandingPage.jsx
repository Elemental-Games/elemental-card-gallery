import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowRight, Map, Swords, Gem, Hammer, Layers, Trophy, Sparkles } from 'lucide-react';
import { trackAlphaCtaClick, trackCreatorCtaClick } from '@/utils/analytics';
import { SITE, MMO_IMAGES } from '@/config/site';
import AlphaWaitlistCapture from '@/components/alpha/AlphaWaitlistCapture';
import AlphaSignupModal from '@/components/alpha/AlphaSignupModal';
import CreatorInterestCapture from '@/components/creators/CreatorInterestCapture';

const loopSteps = [
  { title: 'Explore', subtitle: 'Kinbrold', icon: Map },
  { title: 'Hunt', subtitle: 'Creatures', icon: Swords },
  { title: 'Collect', subtitle: 'Rare drops & Essence', icon: Gem },
  { title: 'Craft', subtitle: 'Elekin cards', icon: Hammer },
  { title: 'Build', subtitle: 'Your deck', icon: Layers },
  { title: 'Compete', subtitle: 'In Quickplay', icon: Trophy },
];

const alphaAreas = [
  {
    name: 'Evermere',
    image: MMO_IMAGES.evermereStreet,
    blurb: 'The starting settlement and your introduction to Kinbrold.',
  },
  {
    name: 'The Road to Scarto',
    image: MMO_IMAGES.roadToScarto,
    blurb: 'A transitional region with stronger enemies, materials, and progression.',
  },
  {
    name: 'Scarto',
    image: MMO_IMAGES.scarto,
    blurb: 'The Fire Kingdom — the first major kingdom Closed Alpha players will reach.',
  },
];

const LandingPage = () => {
  const [alphaModalOpen, setAlphaModalOpen] = useState(false);

  return (
    <div className="bg-[#1A103C] text-white min-h-screen">
      <Helmet>
        <title>Elekin — Explore. Hunt. Craft. Collect. Compete.</title>
        <meta
          name="description"
          content="Elekin is an MMOTCG set in Kinbrold. Closed Alpha opens October 1. Explore the world, hunt creatures, craft cards, and compete in Elekin TCG Quickplay."
        />
        <meta property="og:title" content="Elekin — An MMOTCG in Kinbrold" />
        <meta
          property="og:description"
          content="What if the creatures you discovered in an MMO became the cards in your TCG collection? Closed Alpha opens October 1."
        />
        <meta property="og:image" content="/Elekin_Kinbrold.png" />
        <meta name="twitter:title" content="Elekin — An MMOTCG in Kinbrold" />
        <meta
          name="twitter:description"
          content="Explore Kinbrold. Craft Elekin cards from your adventures. Closed Alpha opens October 1."
        />
        <link rel="canonical" href="https://elementalgames.gg/" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={MMO_IMAGES.landingHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[18%_48%] sm:object-[24%_47%] md:object-[30%_46%] lg:object-[36%_45%]"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A103C]/95 via-[#1A103C]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1A103C]/10 to-[#1A103C]/78" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />

        <div className="relative z-10 container mx-auto px-4 pb-28 sm:pb-32 md:pb-40 lg:pb-48 pt-28 md:pt-32 flex justify-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-6xl w-full text-right"
          >
            <p className="text-yellow-400 text-sm md:text-base lg:text-lg font-semibold tracking-[0.2em] uppercase mb-2 md:mb-3">
              An MMOTCG in development by {SITE.studioName}
            </p>
            <h1 className="my-0 leading-none flex justify-end">
              <img
                src="/Elekin.png"
                alt="Elekin"
                className="block w-64 sm:w-80 md:w-[28rem] h-auto drop-shadow-[0_0_25px_rgba(234,179,8,0.35)] -my-1 md:-my-2"
              />
            </h1>
            <p
              className="whitespace-nowrap font-semibold text-yellow-400 mb-4 md:mb-5 leading-tight tracking-tight sm:tracking-normal text-[clamp(0.72rem,0.4rem+2.1vw,2.5rem)]"
            >
              Explore. Hunt. Craft. Collect. Compete.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl text-purple-100/90 max-w-2xl mb-8 leading-relaxed ml-auto">
              Explore the world of {SITE.worldName} in a new MMOTCG where your adventures build your card collection.
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  trackAlphaCtaClick('homepage_hero');
                  setAlphaModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#1A103C] font-bold text-lg px-8 py-4 rounded-xl transition-colors shadow-[0_0_30px_rgba(234,179,8,0.35)]"
              >
                Become an Alpha Tester
                <ArrowRight className="w-5 h-5" />
              </button>
              <Link
                to="/creators"
                onClick={() => trackCreatorCtaClick('homepage_hero')}
                className="inline-flex items-center justify-center gap-2 border-2 border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300 font-semibold text-lg px-8 py-4 rounded-xl transition-colors backdrop-blur-sm"
              >
                <Sparkles className="w-5 h-5" />
                Creator Program
              </Link>
            </div>
            <p className="mt-5 text-sm md:text-base text-yellow-400/80 font-medium">
              Closed Alpha opens October 1 · Internal testing now
            </p>
          </motion.div>
        </div>
        <AlphaSignupModal
          open={alphaModalOpen}
          onOpenChange={setAlphaModalOpen}
          placement="homepage_hero"
        />
      </section>

      {/* CORE LOOP */}
      <section className="relative py-20 md:py-28 overflow-hidden border-y border-yellow-400/25">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${MMO_IMAGES.evermereStreet}')` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#1A103C]/82" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1A103C]/95 via-[#1A103C]/55 to-[#1A103C]/95"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1A103C]/90 via-transparent to-[#1A103C]/90"
          aria-hidden
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-400/35 to-transparent" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
            <p className="inline-block text-yellow-400 text-sm md:text-base font-bold tracking-[0.25em] uppercase mb-3 px-4 py-1 rounded-full border border-yellow-400/30 bg-[#1A103C]/60 backdrop-blur-sm">
              Core Loop
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.8)]">
              The <span className="text-yellow-400">Elekin</span> Loop
            </h2>
            <p className="text-purple-100/90 max-w-2xl mx-auto text-lg md:text-xl drop-shadow-md">
              What if the creatures you discovered in an MMO became the cards in your TCG collection?
            </p>
          </div>

          {/* Desktop: connected HUD track (single row) */}
          <div className="hidden lg:block relative max-w-7xl mx-auto">
            <div
              className="absolute top-[2.85rem] left-[6%] right-[6%] h-[2px] rounded-full overflow-hidden pointer-events-none"
              aria-hidden
            >
              <div className="absolute inset-0 bg-yellow-400/15" />
              <motion.div
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
                animate={{ left: ['-33%', '100%'] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            <ol className="grid grid-cols-6 gap-3 list-none p-0 m-0">
              {loopSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.li
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ delay: i * 0.07, duration: 0.45 }}
                    className="relative group"
                  >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
                      <div className="w-3 h-3 rotate-45 bg-yellow-400 shadow-[0_0_12px_rgba(234,179,8,0.9)] ring-2 ring-[#1A103C] group-hover:scale-125 transition-transform duration-300" />
                    </div>

                    <div className="relative mt-4 pt-6 pb-5 px-3 lg:px-4 text-center rounded-lg border border-yellow-400/25 bg-[#140d32]/75 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.45)] transition-all duration-300 group-hover:border-yellow-400/60 group-hover:bg-[#140d32]/90 group-hover:-translate-y-1 group-hover:shadow-[0_12px_40px_rgba(234,179,8,0.15)]">
                      <span className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors" />
                      <span className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors" />
                      <span className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors" />
                      <span className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-yellow-400/50 group-hover:border-yellow-400 transition-colors" />

                      <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center">
                        <div
                          className="absolute w-12 h-12 rotate-45 rounded-sm border border-yellow-400/40 bg-yellow-400/10 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/70 transition-colors"
                          aria-hidden
                        />
                        <Icon className="relative w-6 h-6 text-yellow-400 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                      </div>

                      <p className="text-[10px] lg:text-xs font-black tracking-[0.2em] text-yellow-400/90 mb-1">
                        {String(i + 1).padStart(2, '0')}
                      </p>
                      <h3 className="font-bold text-white text-base lg:text-lg leading-tight">{step.title}</h3>
                      <p className="text-xs lg:text-sm text-purple-200/75 mt-1.5 leading-snug">{step.subtitle}</p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* Mobile + tablet: swipeable quest steps */}
          <div className="lg:hidden">
            <p className="text-center text-xs text-yellow-400/70 tracking-widest uppercase mb-4 font-semibold">
              Swipe the loop →
            </p>
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {loopSteps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.article
                    key={step.title}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="relative flex-shrink-0 w-[78%] max-w-[320px] snap-center"
                  >
                    <div className="absolute top-0 left-6 right-6 h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400/50 to-yellow-400/0" />
                    <div className="mt-3 pt-6 pb-6 px-5 rounded-xl border border-yellow-400/30 bg-[#140d32]/85 backdrop-blur-lg shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span className="text-3xl font-black text-yellow-400/25 leading-none">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div className="relative w-14 h-14 flex items-center justify-center">
                          <div className="absolute inset-0 rotate-45 rounded-md border border-yellow-400/50 bg-yellow-400/15" />
                          <Icon className="relative w-7 h-7 text-yellow-400" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-purple-200/80 text-base">{step.subtitle}</p>
                      {i < loopSteps.length - 1 && (
                        <p className="mt-4 text-xs font-bold text-yellow-400/60 uppercase tracking-wider">
                          Next: {loopSteps[i + 1].title}
                        </p>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS ELEKIN */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-yellow-400 text-sm md:text-base font-semibold tracking-[0.2em] uppercase mb-3">Two Connected Experiences</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-3">
              What is <span className="text-yellow-400">Elekin</span>?
            </h2>
            <p className="text-purple-200/75 max-w-2xl mx-auto text-lg md:text-xl">
              The MMO feeds the TCG. Your adventures become your collection.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-yellow-400/30 bg-[#140d32] shadow-[0_0_40px_rgba(234,179,8,0.08)]">
              <div
                className="h-48 bg-cover bg-center border-b border-yellow-400/20"
                style={{ backgroundImage: `url('${MMO_IMAGES.creatureBattle}')` }}
              />
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-400">Adventure Through Kinbrold</h3>
                <ul className="space-y-2.5 text-purple-100/80 text-base md:text-lg">
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Explore the world as your character
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Fight creatures directly in overworld combat
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Level abilities, obtain equipment, complete quests
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Chase rare drops and gather Essence
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-yellow-400/30 bg-[#140d32] shadow-[0_0_40px_rgba(234,179,8,0.08)]">
              <div
                className="h-48 bg-cover bg-center border-b border-yellow-400/20"
                style={{ backgroundImage: `url('${MMO_IMAGES.evermereCrafting}')` }}
              />
              <div className="p-6 md:p-8">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 text-yellow-400">Build Your Elekin TCG Collection</h3>
                <ul className="space-y-2.5 text-purple-100/80 text-base md:text-lg">
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Craft Elekin cards from materials earned in Kinbrold
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Build decks from cards you actually earned through play
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Challenge others in Elekin TCG Quickplay
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.75)]" aria-hidden />
                    Your adventure becomes your collection
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALPHA PREVIEW */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <p className="text-yellow-400 text-sm md:text-base font-semibold tracking-wider uppercase mb-2">
                Closed Alpha · Opens October 1
              </p>
              <h2 className="text-4xl md:text-5xl font-bold">First Playable Areas</h2>
              <p className="text-purple-200/70 mt-2 max-w-xl text-lg md:text-xl">
                We&apos;re testing internally now. Closed Alpha goes live October 1 — join the tester list to be considered for access.
              </p>
            </div>
            <div className="w-full max-w-md">
              <AlphaWaitlistCapture
                placement="homepage_alpha_preview"
                layout="row"
                buttonLabel="Become an Alpha Tester"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {alphaAreas.map((area) => (
              <div
                key={area.name}
                className="group rounded-2xl overflow-hidden border border-yellow-400/25 bg-[#140d32] hover:border-yellow-400/55 transition-colors"
              >
                <div
                  className="h-44 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 border-b border-yellow-400/15"
                  style={{ backgroundImage: `url('${area.image}')` }}
                />
                <div className="p-5">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-yellow-400">{area.name}</h3>
                  <p className="text-base md:text-lg text-purple-200/70 leading-relaxed">{area.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR PROGRAM */}
      <section className="py-16 md:py-20 bg-[#140d32] border-y border-yellow-400/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="rounded-2xl border-2 border-yellow-400/50 p-8 md:p-10 bg-gradient-to-br from-yellow-400/20 via-yellow-500/10 to-transparent shadow-[0_0_40px_rgba(234,179,8,0.12)]">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-yellow-400">
                Now recruiting
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-center mb-3 text-white">Creator Program</h2>
            <p className="text-base md:text-lg text-purple-100/85 text-center mb-8 max-w-xl mx-auto leading-relaxed">
              Be among the first creators to enter {SITE.worldName} — early looks, exclusive reveals, creator testing,
              and consideration for Alpha access before Closed Alpha opens October 1.
            </p>
            <CreatorInterestCapture placement="homepage_creator" className="max-w-lg mx-auto" />
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/creators"
                onClick={() => trackCreatorCtaClick('homepage')}
                className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-[#1A103C] font-bold px-6 py-3 rounded-xl transition-colors"
              >
                Apply to the Creator Program
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/creators"
                onClick={() => trackCreatorCtaClick('homepage_creator_learn')}
                className="text-sm font-semibold text-yellow-400/90 hover:text-yellow-300"
              >
                See benefits & requirements
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* LORE */}
      <section className="relative py-16 md:py-24 overflow-hidden border-b border-yellow-400/20">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-45"
          style={{ backgroundImage: `url('${MMO_IMAGES.kinbroldMapNoNames}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A103C]/88 via-[#1A103C]/72 to-[#1A103C]/88" />
        <div className="relative container mx-auto px-4 max-w-4xl text-center">
          <p className="text-yellow-400 text-sm font-semibold tracking-[0.2em] uppercase mb-3">Lore</p>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Explore the world of <span className="text-yellow-400">{SITE.worldName}</span>
          </h2>
          <p className="text-lg md:text-xl text-purple-100/85 mb-8 max-w-2xl mx-auto leading-relaxed">
            Kingdoms, history, and the places you&apos;ll adventure through in the MMOTCG — from Evermere to the edges of
            the map. Dive in before you step into Closed Alpha.
          </p>
          <Link
            to="/kinbrold"
            className="inline-flex items-center gap-2 border-2 border-yellow-400/60 hover:border-yellow-400 bg-yellow-400/10 hover:bg-yellow-400/20 text-yellow-300 font-bold text-lg px-8 py-4 rounded-xl transition-colors"
          >
            <Map className="w-5 h-5" />
            Explore Lore
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;
