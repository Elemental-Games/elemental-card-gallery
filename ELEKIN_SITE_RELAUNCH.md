# Elekin Site Relaunch — Audit & Plan

**Date:** 2026-09-21  
**Site:** elementalgames.gg  
**Repo:** elemental-card-gallery

---

## Current architecture

| Area | Finding |
|------|---------|
| Framework | Vite 5 + React 18 + React Router 6 |
| Styling | Tailwind 3 + existing dark-purple brand (`#1A103C`, yellow CTAs) |
| Deployment | Vercel (Speed Insights + `@vercel/analytics`); Express `server.js` for local `/api` proxy |
| Ecommerce | Shopify Storefront + Stripe/PayPal/Coinbase APIs under `/api` and `/src/app/api` |
| Auth / DB | Supabase Auth + `subscribers` table; deck builder behind ProtectedRoute |
| Email | Resend + Supabase edge `send-welcome-email`; client subscribe via `src/lib/supabase.js` |
| Analytics | Vercel Analytics (`inject()` in `main.jsx`) + custom `src/utils/analytics.js` (map campaign + Kickstarter events) + optional `gtag` |
| Forms | Email-only `SignupForm` / `subscribeEmail`; Kickstarter-era join pages still in tree |

### Brand hierarchy (target)

- **Elemental Games** — studio  
- **Elekin** — flagship MMOTCG  
- **Kinbrold** — world  
- **Elekin TCG** — connected card system (physical + browser Quickplay)

---

## Routes (current → proposed)

| Current | Role | Action |
|---------|------|--------|
| `/` | TCG marketing landing | **Rebuild** as Elekin MMOTCG homepage |
| `/elekin`, `/elekin/overview` | TCG overview | Keep; reposition under TCG |
| `/elekin/how-to-play`, interactive demo | TCG rules | Preserve |
| `/tcg` | Browser duel | Preserve; secondary CTA |
| `/cards`, `/cards/campaign` | Gallery | Preserve; remove 175-card copy |
| `/kinbrold` + kingdom pages | Lore | Preserve / lightly reframe |
| `/shop`, `/product/:id`, `/bundle/:id` | Shopify shop | **P0 preserve** |
| `/roadmap` | TCG print roadmap | Keep as TCG roadmap; Alpha roadmap lives on `/alpha` |
| `/about` | Team / founder | Reposition studio-first |
| `/join-now`, `/kickstarter` | Already redirect → `/` | Keep redirects; archive pages unused |
| `/alpha` | — | **Create** Closed Alpha waitlist |
| `/creators` | — | **Create** Creator Program |
| `/community` | — | **Create** Discord/community hub |
| `/news` | — | **Create** light updates hub |

---

## Major reusable components (keep)

- `Header`, `Footer`, cart (`useCart`, `CartSidebar`)
- Shop/product/bundle pages + Shopify helpers
- TCG engine (`gameStore`, `TCGGameBoard`, playtest scripts)
- Card gallery (`CardGrid`, `FilterOptions`, `new_cards.json` allowlist)
- Kinbrold map (`InteractiveKinbroldMap`, kingdom pages)
- `SignupForm` / `subscribeEmail` pattern (extend for Alpha + Creators)
- `TrackedLink`, attribution (`lib/attribution.js`)
- Helmet SEO pattern per page

---

## Kickstarter / outdated content found

| Location | Issue |
|----------|--------|
| `LandingPage.jsx` | TCG-first “Why TCG Players Choose Elekin”; Discord hardcoded |
| `CardGalleryPage.jsx` | “60 out of 175 cards”, Demo Day Edition promises |
| `JoinNowPage.jsx`, `KickstarterProgress`, `KickstarterCountdown`, `config/kickstarter.js` | Live campaign framing (orphaned by redirect) |
| `ElekinPage.jsx` | Demo Days as current promotions |
| `ShopPage` / `ProductDetailPage` / Holiday modal | “Demo Day Edition” merchandising (historical OK if labeled; not homepage) |
| Email templates under `src/emails/kickstarter-*` | Historical outreach — do not delete; keep off public nav |
| Multiple Discord invite URLs | `QyNDMYprCg`, `PVrgZBmcMq`, `qXNWh4dMve` — inconsistent; new official invite TBD |
| `index.html` | SEO still “Elekin Trading Card Game” only |
| `ElekinRoadmap.jsx` | Print decks → Skirmish → MMOTCG (TCG-product roadmap; keep under TCG) |

### Content requiring verification (do not invent)

- Exact Closed Alpha feature list / scope wording (brief given by product owner — use that)
- New Discord invite URL (`VITE_DISCORD_INVITE_URL`)
- Whether physical Kickstarter campaign page should be linked as “history” anywhere
- Canon: “Elemental Masters” vs “Elekin” in older emails/copy
- Whether Evermere is “central kingdom” vs “starting settlement” (lore pages say Central; Alpha brief says starting settlement) — **flagged**, prefer Alpha brief on marketing pages without silently rewriting kingdom lore pages

---

## Backend / environment requirements

**Existing (must keep working):**

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Shopify / Stripe / PayPal / Coinbase vars used by shop APIs
- `VITE_RESEND_API_KEY` / `RESEND_API_KEY`, `SITE_URL`
- `VITE_INVESTOR_PASSWORD` for `/invest`

**New:**

- `VITE_DISCORD_INVITE_URL` — optional; Community CTA shows “Coming Soon” when empty
- Supabase tables (recommended; RLS: anon insert, no public read):

```sql
-- Alpha waitlist
create table if not exists alpha_waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  display_name text,
  platform text,
  games_played text,
  tcg_experience text,
  interest text,
  discord_username text,
  created_at timestamptz default now()
);

-- Creator applications
create table if not exists creator_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  channel_name text,
  platforms text,
  profile_urls text,
  primary_topics text,
  audience_size text,
  typical_views text,
  country_timezone text,
  why_elekin text,
  notes text,
  created_at timestamptz default now()
);
```

Applications also attempt to add the email to `subscribers` with success if waitlist insert works.

**Risky to change:** Shopify checkout, webhooks, wheel/spin tokens, auth session flow, deck builder Supabase tables, existing card allowlist filters.

---

## Proposed changes (implementation order)

1. **P0** — Do not break shop/auth/TCG play  
2. **P1** — New homepage (hero, core loop, dual experience, CTAs)  
3. **P2** — `/alpha` funnel + form + roadmap + world preview  
4. **P3** — `/creators` program + form  
5. **P4** — `/community` Discord CTA (env-configurable)  
6. **P5** — Nav/Footer reposition; TCG secondary; gallery copy fix  
7. **P6** — About / Kinbrold light reframes  
8. **P7** — Archive Kickstarter from promotional surfaces (redirects already exist)  
9. **P8** — SEO + funnel analytics events  

---

## Launch checklist

- [ ] Deploy with `VITE_DISCORD_INVITE_URL` blank or set  
- [x] Create Supabase `alpha_waitlist` + `creator_applications` (+ RLS) — migration `supabase/migrations/20260922000000_alpha_waitlist_and_creator_applications.sql`  
- [ ] Smoke-test `/shop` checkout still works  
- [ ] Smoke-test `/tcg` duel still loads  
- [ ] Submit Alpha + Creator forms (success/error/already)  
- [ ] Confirm homepage CTAs: Join Alpha, Watch Gameplay placeholder  
- [ ] Confirm gallery no longer says 175-card launch  
- [ ] Confirm no “Kickstarter live” / fake player counts / AI-partner claims  
- [ ] Mobile nav: Join Alpha visible  
- [ ] OG/Twitter titles mention Elekin MMOTCG + Kinbrold  

---

## Implementation status (2026-09-21)

**Done in this pass:**

- `ELEKIN_SITE_RELAUNCH.md` audit
- Homepage rebuilt as Elekin MMOTCG (hero, loop, dual experience, alpha preview, gameplay placeholder)
- `/alpha` — waitlist form, roadmap, world preview
- `/creators` — Creator Program + application form
- `/community` — Discord CTA via `VITE_DISCORD_INVITE_URL` (Coming Soon when unset)
- `/news` — truthful updates hub
- Nav/Header/Footer repositioned; persistent **Join Alpha** CTA
- Gallery 175-card / Demo Day marketing banner removed
- About page studio-first positioning
- Elekin TCG page banner tying TCG to larger Elekin
- SEO (`index.html` + page Helmets) + funnel analytics helpers
- Supabase submit helpers with fallback if waitlist tables missing
- `/join-now` → `/alpha`; `/kickstarter` → `/`

**Still optional / follow-up:**

- Create Supabase tables + RLS (SQL in this doc)
- Wire real Discord invite env var
- Replace gameplay placeholder with real capture
- Soften remaining Demo Day product copy on shop PDP (historical SKUs)
- Deep rewrite of long-form ElekinPage Demo Days section
- Archive Kickstarter components remain in repo but off primary funnels

---

## Implementation notes

- Preserve established dark fantasy visual system; reduce Kickstarter clutter rather than inventing a new purple-startup look.  
- Gameplay video: **no fake footage** — cinematic stills + “Coming Soon” until real capture exists.  
- Do not market as an “AI game.”
