import { readFileSync } from "node:fs";
import { crystalDeck, lightningDeck } from "../../src/data/decks";

const store = readFileSync("src/store/gameStore.ts", "utf8");
const ai = readFileSync("src/store/aiLogic.ts", "utf8");
const board = readFileSync("src/components/TCGGameBoard.jsx", "utf8");
const haystack = store + ai + board;

const seen = new Map<string, { card: string; type: string; name: string; trigger: string; text: string }>();

for (const c of [...crystalDeck, ...lightningDeck] as any[]) {
  for (const a of c.abilities ?? []) {
    if (!seen.has(a.id)) {
      seen.set(a.id, { card: c.name, type: c.cardType, name: a.name, trigger: a.trigger, text: a.description });
    }
  }
  // Runes and counters carry their effect on the card id itself, not in an abilities array.
  if (c.cardType === "rune" || c.cardType === "counter") {
    if (!seen.has(c.id)) {
      seen.set(c.id, { card: c.name, type: c.cardType, name: c.name, trigger: c.cardType, text: c.description ?? "(no text in engine)" });
    }
  }
}

const wired: string[] = [];
const unwired: string[] = [];

for (const [id, info] of [...seen.entries()].sort((a, b) => a[1].card.localeCompare(b[1].card))) {
  // An ability is "wired" if its id appears anywhere in engine logic beyond the card definition.
  const hits = haystack.split(`"${id}"`).length - 1 + (haystack.split(`'${id}'`).length - 1);
  const line = `${info.card} :: ${info.name} [${info.trigger}] (${id})\n      ${info.text}`;
  if (hits > 0) wired.push(line);
  else unwired.push(line);
}

console.log(`################ ABILITIES WIRED INTO ENGINE LOGIC (${wired.length}) ################\n`);
for (const l of wired) console.log("  " + l + "\n");

console.log(`################ ABILITIES WITH NO ENGINE LOGIC (${unwired.length}) ################\n`);
for (const l of unwired) console.log("  " + l + "\n");
