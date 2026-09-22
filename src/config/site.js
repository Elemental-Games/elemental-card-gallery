/**
 * Site-wide Elekin / Elemental Games configuration.
 * Override Discord via VITE_DISCORD_INVITE_URL if needed.
 */

export const DEFAULT_DISCORD_INVITE_URL = 'https://discord.gg/JVcMMqTADB';

/** Chunky MMO-style marketing & world art — use on all non-TCG surfaces */
export const MMO_IMAGES = {
  landingHero: '/elekin-landing-hero.jpg',
  kinbroldMap: '/images/mmo-kinbrold-map.jpg',
  /** Labeled regions omitted — decorative backgrounds */
  kinbroldMapNoNames: '/images/mmo-kinbrold-map-nonames.jpg',
  evermereStreet: '/images/mmo-evermere-street.jpg',
  evermereCrafting: '/images/mmo-evermere-crafting.jpg',
  scarto: '/images/mmo-scarto.jpg',
  grivoss: '/images/mmo-grivoss.jpg',
  zalos: '/images/mmo-zalos.jpg',
  tsunareth: '/images/mmo-tsunareth.jpg',
  creatureBattle: '/images/mmo-creature-battle.jpg',
  dragonsCavern: '/images/mmo-dragons-cavern.jpg',
  /** Overworld combat / travel between regions */
  roadToScarto: '/images/mmo-creature-battle.jpg',
};

export const SITE = {
  studioName: 'Elemental Games',
  gameName: 'Elekin',
  worldName: 'Kinbrold',
  tcgName: 'Elekin TCG',
  siteUrl: 'https://elementalgames.gg',
  /** Official Elekin Discord */
  discordInviteUrl: (
    import.meta.env.VITE_DISCORD_INVITE_URL || DEFAULT_DISCORD_INVITE_URL
  ).trim(),
  social: {
    instagram: 'https://www.instagram.com/elekin_tcg/',
    tiktok: 'https://www.tiktok.com/@elekin_tcg',
  },
};

/** When true, shop/product checkout is disabled; /shop explains the pause. Set VITE_PHYSICAL_SHOP_PAUSED=false to reopen. */
export const isPhysicalShopPaused = () =>
  import.meta.env.VITE_PHYSICAL_SHOP_PAUSED !== 'false';

export const hasDiscordInvite = () => Boolean(SITE.discordInviteUrl);

export const openDiscord = () => {
  if (!SITE.discordInviteUrl) return false;
  window.open(SITE.discordInviteUrl, '_blank', 'noopener,noreferrer');
  return true;
};
