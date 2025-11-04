import { CreatureCard, SpellCard, RuneCard, CounterCard, ShieldCard, Card } from "../types/tcg";

// ============== ALL CARDS ==============
// A single list of all cards, addressable by ID.

const Driplets: CreatureCard = { id: "driplets", name: "Driplets", element: "water", cost: 0, attack: 1, health: 1, strength: 80, agility: 70, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/driplets.webp" };
const AquaDart: CreatureCard = { id: "aqua_dart", name: "Aqua Dart", element: "water", cost: 0, attack: 2, health: 1, strength: 80, agility: 70, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/aqua dart.webp", essenceGeneration: 2 };
const Piddip: CreatureCard = { id: "piddip", name: "Piddip", element: "water", cost: 0, attack: 2, health: 2, strength: 60, agility: 65, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/piddip.webp" };
const Glurb: CreatureCard = { id: "glurb", name: "Glurb", element: "water", cost: 0, attack: 1, health: 3, strength: 82, agility: 55, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/glurb.webp" };
const Shelt: CreatureCard = { id: "shelt", name: "Shelt", element: "water", cost: 3, attack: 2, health: 4, strength: 95, agility: 55, rarity: "uncommon", cardType: "creature" };
const Murk: CreatureCard = { id: "murk", name: "Murk", element: "water", cost: 3, attack: 3, health: 4, strength: 100, agility: 58, rarity: "uncommon", cardType: "creature" };
const Maelstrom: CreatureCard = { id: "maelstrom", name: "Maelstrom", element: "water", cost: 5, attack: 4, health: 5, strength: 120, agility: 50, rarity: "rare", cardType: "creature" };
const TidalRay: CreatureCard = { id: "tidal_ray", name: "Tidal Ray", element: "water", cost: 2, attack: 2, health: 1, strength: 82, agility: 68, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/tidal ray.webp" };

const Crag: CreatureCard = { id: "crag", name: "Crag", element: "earth", cost: 0, attack: 2, health: 3, strength: 120, agility: 30, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/crag.webp", essenceGeneration: 1 };
const Khorn: CreatureCard = { id: "khorn", name: "Khorn", element: "earth", cost: 0, attack: 3, health: 3, strength: 95, agility: 55, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/khorn.webp" };
const IvyMantis: CreatureCard = { id: "ivy_mantis", name: "Ivy Mantis", element: "earth", cost: 0, attack: 2, health: 4, strength: 65, agility: 60, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/ivy mantis.webp", essenceGeneration: 2 };
const Manasee: CreatureCard = { id: "manasee", name: "Manasee", element: "water", cost: 1, attack: 3, health: 2, strength: 110, agility: 65, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/manasee.webp" };
const Malletin: CreatureCard = { id: "malletin", name: "Malletin", element: "water", cost: 2, attack: 4, health: 4, strength: 135, agility: 40, rarity: "rare", cardType: "creature", imagePath: "/images/cards/new/malletin.webp" };
const Brumaul: CreatureCard = { id: "brumaul", name: "Brumaul", element: "earth", cost: 1, attack: 3, health: 5, strength: 120, agility: 55, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/brumaul.webp" };
const Tuskhammer: CreatureCard = { id: "tuskhammer", name: "Tuskhammer", element: "earth", cost: 2, attack: 5, health: 5, strength: 150, agility: 25, rarity: "rare", cardType: "creature", imagePath: "/images/cards/new/tuskhammer.webp" };
const Torrent: CreatureCard = { id: "torrent", name: "Torrent", element: "water", cost: 4, attack: 4, health: 3, strength: 140, agility: 60, rarity: "uncommon", cardType: "creature", essenceGeneration: 1 };
const Terra: CreatureCard = { id: "terra", name: "Terra", element: "earth", cost: 4, attack: 4, health: 6, strength: 150, agility: 50, rarity: "rare", cardType: "creature", essenceGeneration: 1 };
const Diamoria: CreatureCard = { id: "diamoria", name: "Diamoria", element: "earth", cost: 5, secondaryCost: { element: "water", amount: 5 }, attack: 5, health: 7, strength: 205, agility: 90, rarity: "legendary", cardType: "creature" };

const PyroMites: CreatureCard = { id: "pyro_mites", name: "Pyro Mites", element: "fire", cost: 0, attack: 1, health: 1, strength: 90, agility: 35, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/pyro mites.webp" };
const EmberFlicker: CreatureCard = { id: "ember_flicker", name: "Ember Flicker", element: "fire", cost: 0, attack: 2, health: 1, strength: 85, agility: 65, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/ember flicker.webp" };
const FireBugs: CreatureCard = { id: "fire_bugs", name: "Fire Bugs", element: "fire", cost: 0, attack: 1, health: 2, strength: 30, agility: 30, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/fire bugs.webp" };
const Lavrok: CreatureCard = { id: "lavrok", name: "Lavrok", element: "fire", cost: 1, attack: 3, health: 2, strength: 125, agility: 50, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/lavrok.webp" };
const Blazorn: CreatureCard = { id: "blazorn", name: "Blazorn", element: "fire", cost: 2, attack: 4, health: 3, strength: 125, agility: 50, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/blazorn.webp" };
const Archen: CreatureCard = { id: "archen", name: "Archen", element: "fire", cost: 3, attack: 2, health: 2, strength: 140, agility: 85, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/archen.webp" };
const NightVox: CreatureCard = { id: "night_vox", name: "Night Vox", element: "fire", cost: 0, attack: 1, health: 3, strength: 95, agility: 30, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/night vox.webp" };

const Glint: CreatureCard = { id: "glint", name: "Glint", element: "air", cost: 0, attack: 2, health: 1, strength: 80, agility: 70, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/glint.webp" };
const Swoop: CreatureCard = { id: "swoop", name: "Swoop", element: "air", cost: 0, attack: 2, health: 2, strength: 78, agility: 73, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/swoop.webp" };
const Stawid: CreatureCard = { id: "stawid", name: "Stawid", element: "air", cost: 0, attack: 3, health: 1, strength: 85, agility: 40, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/stawid.webp" };
const Dumoles: CreatureCard = { id: "dumoles", name: "Dumoles", element: "air", cost: 1, attack: 3, health: 3, strength: 75, agility: 100, rarity: "common", cardType: "creature", imagePath: "/images/cards/new/dumoles.webp" };
const Skerodact: CreatureCard = { id: "skerodact", name: "Skerodact", element: "air", cost: 2, attack: 4, health: 3, strength: 130, agility: 45, rarity: "uncommon", cardType: "creature", imagePath: "/images/cards/new/skerodact.webp" };
const Aeris: CreatureCard = { id: "aeris", name: "Aeris", element: "air", cost: 4, attack: 3, health: 4, strength: 105, agility: 95, rarity: "uncommon", cardType: "creature" };
const Nimbus: CreatureCard = { id: "nimbus", name: "Nimbus", element: "air", cost: 5, attack: 4, health: 5, strength: 135, agility: 65, rarity: "rare", cardType: "creature" };
const Veton: CreatureCard = { id: "veton", name: "Veton", element: "air", cost: 5, secondaryCost: { element: "fire", amount: 5 }, attack: 6, health: 6, strength: 190, agility: 105, rarity: "legendary", cardType: "creature" };

const DraconicAdaptability: RuneCard = { id: "draconic_adaptability", name: "Draconic Adaptability", element: "fire", cost: 2, rarity: "common", cardType: "rune", effect: "Adapt to any element" };
const EssenceExchange: RuneCard = { id: "essence_exchange", name: "Essence Exchange", element: "water", cost: 3, rarity: "uncommon", cardType: "rune", effect: "Exchange mana" };
const EssenceAmplifier: RuneCard = { id: "essence_amplifier", name: "Essence Amplifier", element: "earth", cost: 2, rarity: "common", cardType: "rune", effect: "Boost essence" };
const DirectAssault: RuneCard = { id: "direct_assault", name: "Direct Assault", element: "fire", cost: 3, rarity: "uncommon", cardType: "rune", effect: "Direct damage boost" };
const EssenceGeneration: RuneCard = { id: "essence_generation", name: "Essence Generation", element: "air", cost: 2, rarity: "common", cardType: "rune", effect: "Generate extra essence" };
const BindingCoils: RuneCard = { id: "binding_coils", name: "Binding Coils", element: "air", cost: 2, rarity: "common", cardType: "rune", effect: "Immobilize target" };

const Unbreakable: CounterCard = { id: "unbreakable", name: "Unbreakable", element: "earth", cost: 2, rarity: "uncommon", cardType: "counter", effect: "Prevent damage" };
const PowerSurge: CounterCard = { id: "power_surge", name: "Power Surge", element: "fire", cost: 2, rarity: "uncommon", cardType: "counter", effect: "Boost damage" };
const RevivalRain: CounterCard = { id: "revival_rain", name: "Revival Rain", element: "water", cost: 3, rarity: "uncommon", cardType: "counter", effect: "Restore creatures" };
const PassiveAggressive: CounterCard = { id: "passive_aggressive", name: "Passive Aggressive", element: "air", cost: 2, rarity: "uncommon", cardType: "counter", effect: "Counter attack boost" };

export const allCards: { [key: string]: Card } = {
  Driplets, AquaDart, Piddip, Glurb, Shelt, Murk, Maelstrom, TidalRay,
  Crag, Khorn, IvyMantis, Manasee, Malletin, Brumaul, Tuskhammer, Torrent, Terra, Diamoria,
  PyroMites, EmberFlicker, FireBugs, Lavrok, Blazorn, Archen, NightVox,
  Glint, Swoop, Stawid, Dumoles, Skerodact, Aeris, Nimbus, Veton,
  DraconicAdaptability, EssenceExchange, EssenceAmplifier, DirectAssault, EssenceGeneration, BindingCoils,
  Unbreakable, PowerSurge, RevivalRain, PassiveAggressive
};

export const getCardById = (id: string): Card | undefined => {
  return Object.values(allCards).find((card) => card.id === id);
};
