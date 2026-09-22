import { BoardShield, ShieldEffect } from "../types/tcg";

// Effect text is transcribed verbatim from public/data/new_cards.json (the current card set).
// Each shield has exactly two effects; the controller chooses one when it breaks (rulebook 5.3.2).

type ShieldSeed = {
  id: string;
  name: string;
  tier: 1 | 2 | 3;
  element: BoardShield["element"];
  rarity: BoardShield["rarity"];
  effects: [ShieldEffect, ShieldEffect];
};

const HP_BY_TIER = { 1: 150, 2: 300, 3: 450 } as const;

const crystalSeeds: ShieldSeed[] = [
  {
    id: "radiant_buckler",
    name: "Radiant Buckler",
    tier: 1,
    element: "water",
    rarity: "common",
    effects: [
      {
        id: "radiant_buckler_mute",
        label: "Equip this card to a creature. While equipped, the creature does not generate essence during the generation phase.",
      },
      {
        id: "radiant_buckler_empower",
        label: "Equip this card to a creature. While equipped, the creature gains 30 Strength and 10 Agility.",
      },
    ],
  },
  {
    id: "spectral_shield",
    name: "Spectral Shield",
    tier: 2,
    element: "water",
    rarity: "uncommon",
    effects: [
      {
        id: "spectral_shield_revive_two",
        label: "Special summon 2 creatures in your discard pile that each require 0 essence to summon.",
      },
      {
        id: "spectral_shield_revive_one",
        label: "Special summon 1 creature free of cost in your discard pile that requires a total of 5 or less essence to summon.",
      },
    ],
  },
  {
    id: "titans_shield",
    name: "Titan's Shield",
    tier: 3,
    element: "earth",
    rarity: "rare",
    effects: [
      {
        id: "titans_shield_summon_titan",
        label: 'Special summon a "Titan" card from your deck. Equip this shield to that Titan. The equipped creature gains 50 Strength and Taunt.',
      },
      {
        id: "titans_shield_pierce_summon",
        label: "Special summon 1 creature from your hand free of cost. The summoned creature gains Pierce until the end of your next turn.",
      },
    ],
  },
];

const lightningSeeds: ShieldSeed[] = [
  {
    id: "mystic_ward",
    name: "Mystic Ward",
    tier: 1,
    element: "air",
    rarity: "common",
    effects: [
      {
        id: "mystic_ward_destroy_rune",
        label: "Destroy 1 Rune/Counter card on the field.",
      },
      {
        id: "mystic_ward_weaken",
        label: "Equip this card to a creature. The equipped creature loses 30 Strength and 10 Agility while this card remains equipped.",
      },
    ],
  },
  {
    id: "mythical_barrier",
    name: "Mythical Barrier",
    tier: 2,
    element: "air",
    rarity: "uncommon",
    effects: [
      { id: "mythical_barrier_draw", label: "Draw 3 cards." },
      { id: "mythical_barrier_discard", label: "Discard 3 cards from your opponent's hand." },
    ],
  },
  {
    id: "elemental_shield",
    name: "Elemental Shield",
    tier: 3,
    element: "fire",
    rarity: "rare",
    effects: [
      {
        id: "elemental_shield_revive",
        label: "Special summon 1 card from your discard pile (excluding Dragons). Gain 5 essence of the summoned creature's element.",
      },
      {
        id: "elemental_shield_drain",
        label: "Draw 2 cards. Select 2 elements. Deplete 5 essence from your opponent's essence pool for each selected element.",
      },
    ],
  },
];

const toBoardShield = (seed: ShieldSeed): BoardShield => ({
  id: seed.id,
  name: seed.name,
  tier: seed.tier,
  element: seed.element,
  cost: 0,
  rarity: seed.rarity,
  cardType: "shield",
  effects: seed.effects,
  currentTier: seed.tier,
  currentHealth: HP_BY_TIER[seed.tier],
  faceDown: true,
  // A shield only regenerates up to its own tier, so cap each threshold at the tier's HP.
  maxHealthByTier: {
    1: HP_BY_TIER[1],
    2: seed.tier >= 2 ? HP_BY_TIER[2] : HP_BY_TIER[1],
    3: seed.tier >= 3 ? HP_BY_TIER[3] : seed.tier === 2 ? HP_BY_TIER[2] : HP_BY_TIER[1],
  },
});

export const getStarterShields = (deck: "crystal" | "lightning"): BoardShield[] =>
  (deck === "crystal" ? crystalSeeds : lightningSeeds).map(toBoardShield);

export const SHIELD_HP_BY_TIER = HP_BY_TIER;
