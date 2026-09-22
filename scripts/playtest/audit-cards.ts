import { readFileSync } from "node:fs";
import { allCards } from "../../src/data/cards";
import { crystalDeck, lightningDeck } from "../../src/data/decks";

type Json = Record<string, any>;

const db: Json[] = JSON.parse(readFileSync("public/data/new_cards.json", "utf8")).cards;

// The database names dragons/titans as "Veton | The Lightning Dragon"; match on the leading segment.
const dbByName = new Map<string, Json>();
for (const c of db) {
  const full = String(c.name ?? "").trim().toLowerCase();
  const short = full.split("|")[0].trim();
  dbByName.set(full, c);
  if (!dbByName.has(short)) dbByName.set(short, c);
}

const deckNames = new Set<string>();
for (const c of [...crystalDeck, ...lightningDeck]) deckNames.add(c.name);

// Shields live outside the 40-card deck lists, so name them explicitly.
const shieldNames = [
  "Radiant Buckler", "Spectral Shield", "Titan's Shield",
  "Mystic Ward", "Mythical Barrier", "Elemental Shield",
];

const engineByName = new Map<string, any>();
for (const v of Object.values(allCards as Record<string, any>)) {
  if (v && typeof v === "object" && v.name) engineByName.set(v.name, v);
}

const num = (v: any) => (v === undefined || v === null || v === "" ? undefined : Number(v));

function dbStats(c: Json) {
  // Stats show up in a few shapes across the database.
  const s = c.strength ?? c.stats?.strength ?? c.combatStats?.strength;
  const a = c.agility ?? c.stats?.agility ?? c.combatStats?.agility;
  const gen = c.essenceGeneration ?? c.generation ?? c.generationValue ?? c.stats?.generation;
  const cost = typeof c.cost === "object" ? c.cost?.amount : c.cost;
  return { strength: num(s), agility: num(a), generation: num(gen), cost: num(cost) };
}

function dbAbilityText(c: Json): string[] {
  const t: string[] = [];
  if (c.ability?.description) t.push(`REGULAR: ${c.ability.description}`);
  if (c.specialAbility?.description) t.push(`ENHANCED: ${c.specialAbility.description}`);
  if (c.primaryEffect) t.push(`PRIMARY: ${c.primaryEffect}`);
  if (c.secondaryEffect) t.push(`SECONDARY: ${c.secondaryEffect}`);
  if (Array.isArray(c.abilities)) for (const a of c.abilities) t.push(String(a?.description ?? a));
  return t;
}

console.log("################ CREATURE / RUNE / COUNTER AUDIT ################\n");

const mismatches: string[] = [];
const missingAbilities: string[] = [];

for (const name of [...deckNames].sort()) {
  const eng = engineByName.get(name);
  const dbc = dbByName.get(name.trim().toLowerCase());

  if (!dbc) {
    mismatches.push(`${name}: NOT FOUND in new_cards.json`);
    continue;
  }
  if (!eng) {
    mismatches.push(`${name}: NOT FOUND in engine cards.ts`);
    continue;
  }

  const d = dbStats(dbc);
  const problems: string[] = [];
  if (d.strength !== undefined && d.strength !== eng.strength) problems.push(`strength engine=${eng.strength} db=${d.strength}`);
  if (d.agility !== undefined && d.agility !== eng.agility) problems.push(`agility engine=${eng.agility} db=${d.agility}`);
  if (d.cost !== undefined && d.cost !== eng.cost) problems.push(`cost engine=${eng.cost} db=${d.cost}`);
  const engGen = eng.essenceGeneration;
  if (d.generation !== undefined && d.generation !== engGen) problems.push(`generation engine=${engGen ?? "unset"} db=${d.generation}`);

  const dbAbil = dbAbilityText(dbc);
  const engAbil: any[] = eng.abilities ?? [];
  if (dbAbil.length > 0 && engAbil.length === 0) {
    missingAbilities.push(`${name} (${eng.cardType}) — engine has NO abilities array, db says:\n      ${dbAbil.join("\n      ")}`);
  }

  if (problems.length) mismatches.push(`${name}: ${problems.join(", ")}`);
}

console.log(`--- STAT / COST / GENERATION MISMATCHES (${mismatches.length}) ---`);
for (const m of mismatches) console.log("  " + m);

console.log(`\n--- CARDS WITH DATABASE ABILITY TEXT BUT NO ENGINE ABILITY (${missingAbilities.length}) ---`);
for (const m of missingAbilities) console.log("  " + m);

console.log("\n\n################ SHIELD EFFECTS (authoritative text) ################\n");
for (const name of shieldNames) {
  const dbc = dbByName.get(name.trim().toLowerCase());
  if (!dbc) {
    console.log(`${name}: NOT FOUND in new_cards.json`);
    continue;
  }
  console.log(`${name}  (Tier ${dbc.tier})`);
  console.log(`   1) ${dbc.primaryEffect ?? dbc.ability?.description ?? "??"}`);
  console.log(`   2) ${dbc.secondaryEffect ?? dbc.specialAbility?.description ?? "??"}`);
  console.log("");
}
