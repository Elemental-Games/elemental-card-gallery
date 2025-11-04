# ELEKIN TCG - BROWSER SPECIFICATION

> **Goal:** Build a playable browser-based TCG where players can choose from 2 starter decks and battle an AI opponent. This serves as proof-of-concept for the physical TCG and foundation for the MMO.

---

## 1. PROJECT OVERVIEW

### Core Requirements:
- ✅ **2 Starter Decks** (Fire vs Water)
- ✅ **Player vs AI** (No online multiplayer yet)
- ✅ **Complete turn-based TCG mechanics**
- ✅ **Browser-based** (No download required)
- ✅ **Playable in 15-20 minutes**

### Timeline:
- **Week 1-2:** Card data + deck builder UI
- **Week 3-4:** Battle system + AI heuristics
- **Week 5-6:** Polish + testing
- **Week 7:** Launch

### Tech Stack:
- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Deployment:** Vercel (free tier)
- **Assets:** SVG icons + text (no art needed for MVP)

---

## 2. THE TWO STARTER DECKS
## Check out our card database for all the info on the cards in these decks
### Deck A: Crystal Structure Deck
**Theme:** Defensive, Earth & Water

**Cards (40 total):**
- **Creature Cards (28 cards):**
  Driplets - 3x - Water
  Aqua Dart - 3x - Water
  Piddip - 2x
  Crag - 3x
  Khorn - 3x
  Ivy Mantis - 2x
  Manasee - 2x
  Malletin - 1x
  Brumaul - 2x
  Tuskhammer - 1x
  Torrent - 2x
  Terra - 2x
  Diamoria - 2x

- **Rune Cards (8 cards):**
 Draconic Adaptability - 2x
 Essence Exchange - 2x
 Essence Amplifier - 2x
 Direct Assault - 2x

 - **Counter Cards (4 cards):**
 Unbreakable - 2x
 Power Surge - 2x

  - **Shield Cards (3 cards):**
 Radiant Buckler - 1x - Tier 1
 Spectral Shield - 1x - Tier 2
 Titan's Shield - 1x - Tier 3

### Deck B: Lightning Structure Deck
**Theme:** Constant Damage, Air & Fire

**Cards (40 total):**
- **Creature Cards (30 cards):**
  Glint - 3x - Air
  Swoop - 2x - Air
  Stawid - 3x - Air
  Pyro Mites - 2x - Fire
  Night Vox - 2x - Fire
  Ember Flicker - 3x - Fire
  Fire Bugs - 1x - Fire
  Lavrok - 2x - Fire
  Blazorn - 1x - Fire
  Dumoles - 2x - Air
  Skerodact - 1x - Air
  Archen - 3x - Fire
  Aeris - 1x - Air
  Nimbus - 2x - Air
  Veton - 2x - Lightning

- **Rune Cards (6 cards):**
 Draconic Adaptability - 1x
 Essence Generation - 2x
 Binding Coils - 3x

 - **Counter Cards (4 cards):**
 Revival Rain - 2x
 Passive Aggressive - 2x

  - **Shield Cards (3 cards):**
 Mystic Ward - 1x - Tier 1
 Mythical Barrier - 1x - Tier 2
 Elemental Shield - 1x - Tier 3

---

## 3. GAME MECHANICS

### Turn Structure:

**1. Start of Turn:**
- Draw 1 card
- Gain 1 mana (max 10)
- Remove summoning sickness from creatures

**2. Main Phase (unlimited actions):**
- Play creatures (costs mana)
- Play spells (costs mana)
- Attack with creatures (once per turn, if ready)
- End turn when ready

**3. End of Turn:**
- Discard down to 10 cards (if over)
- Pass turn to opponent

### Combat Rules:

**Creature Combat:**
- Creatures can attack once per turn (after summoning sickness)
- Defender chooses blockers
- Unblocked damage goes to player
- Both creatures deal damage simultaneously
- Creatures with 0 or less health are destroyed

**Summoning Sickness:**
- Creatures cannot attack the turn they're played
- Can attack starting next turn

**Health Limits:**
- Starting health: 30
- Reduce to 0 to win
- Max health cap: 99 (if healing)

### Mana System:

**Mana Pools:**
- Start with 1 mana
- Gain 1 mana per turn (up to 10)
- Mana resets to 0 at start of each turn
- No mana overflow (can't bank between turns)

### Win Conditions:

**Primary:**
- Reduce opponent's health to 0

**Secondary:**
- Opponent cannot draw (deck empty)
- Opponent concedes

---

## 4. CARD ATTRIBUTES

### Creature Cards:
```typescript
{
  id: string;
  name: string;
  element: "fire" | "water" | "earth" | "air";
  cost: number;          // Mana cost
  attack: number;        // Attack power
  health: number;        // Health points
  rarity: "common" | "uncommon" | "rare" | "legendary";
  abilities?: string[];  // Special abilities (future)
  artwork?: string;      // SVG path (future)
}
```

### Spell Cards:
```typescript
{
  id: string;
  name: string;
  element: "fire" | "water" | "earth" | "air";
  cost: number;          // Mana cost
  type: "damage" | "heal" | "draw" | "bounce" | "destroy";
  effect: number;        // Damage/heal amount
  additionalEffects?: string[];  // Extra effects (future)
  artwork?: string;      // SVG path (future)
}
```

### Example Fire Creature:
```json
{
  "id": "salix",
  "name": "Salix",
  "element": "fire",
  "cost": 2,
  "attack": 2,
  "health": 2,
  "rarity": "common"
}
```

### Example Fire Spell:
```json
{
  "id": "ember_strike",
  "name": "Ember Strike",
  "element": "fire",
  "cost": 1,
  "type": "damage",
  "effect": 2
}
```

### Example Water Spell:
```json
{
  "id": "splash",
  "name": "Splash",
  "element": "water",
  "cost": 1,
  "type": "heal",
  "effect": 2
}
```

---

## 5. AI HEURISTICS (Player 2)

### AI Difficulty: Medium

**Decision Tree:**

**Turn Planning (Priority Order):**

**1. Lethal Check (Top Priority):**
- Can I kill opponent this turn?
- If yes: Execute lethal combo
- If no: Continue to defense

**2. Defense Check:**
- Will opponent kill me next turn?
- If yes: Prioritize healing or board control
- If no: Continue to aggression

**3. Board Control:**
- Count creatures on board
- If opponent has more creatures: Play removal/damage spells
- If I have more creatures: Build board further

**4. Mana Efficiency:**
- Use all mana if possible
- If no cards to play efficiently: Attack with creatures
- Only pass turn if truly out of options

### AI Spell Targeting:

**Damage Spells:**
- Target enemy creature with highest attack
- If none on board: Target player
- Always maximize damage output

**Healing Spells:**
- Cast on self if health < 20
- Save for critical health (< 10)
- Don't overheal (stop at 30 unless legendary)

**Bounce Spells (Tidal Push):**
- Target biggest threat (highest attack creature)
- Prioritize creatures that can kill AI next turn

**Draw Spells:**
- Cast when hand size < 4 cards
- Prioritize early game (mana efficiency)

### AI Creature Placement:

**When to Play Creatures:**
- Early game (Turns 1-4): Play all creatures ASAP
- Mid game (Turns 5-7): Save some for combo potential
- Late game (Turns 8+): Play everything, go aggressive

**Creature Attack Priority:**
1. Attack face if lethal
2. Attack enemy creatures with less attack than my creature
3. Trade evenly if necessary (kill their threat)
4. Never trade down unless saving lethal

### AI Deck Choice:

**AI Always Plays: Water Kingdom (Control)**
- Water's control tools test player's aggro skills
- Healing encourages longer games (more playtesting)
- Bounce effects teach deck management

**Player Always Starts With: Fire Kingdom (Aggro)**
- Fire is simpler to play (newbie-friendly)
- Damage spells are straightforward
- Creates natural learning curve

### AI Concession Logic:

**AI Concedes When:**
- Health ≤ 5 AND no cards in hand AND no creatures on board
- Opponent's board advantage is 3+ creatures
- No possible plays for 3+ turns

**AI Never Concedes:**
- Health > 5
- Has creatures on board
- Has cards in hand

---

## 6. USER INTERFACE

### Screen Layout:

```
┌─────────────────────────────────────────┐
│        ELEKIN TCG - Fire vs Water        │
├─────────────────────────────────────────┤
│                                         │
│  PLAYER (Fire)      [HP: 30/30]        │
│  MANA: ████████░░ (8/10)               │
│                                         │
│  Creatures: [Salix 2/2] [Kitsol 4/3]  │
│                                         │
│           ╔════════════════╗           │
│           ║   BATTLEFIELD  ║           │
│           ║                ║           │
│           ║ (Creatures     ║           │
│           ║  fight here)   ║           │
│           ║                ║           │
│           ╚════════════════╝           │
│                                         │
│  AI Creatures: [Murk 3/4]              │
│                                         │
│  AI (Water)      [HP: 18/30]           │
│  AI MANA: ██████████ (10/10)           │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│  HAND: [Card][Card][Card][Card][Card]  │
│         ↑                               │
│      Hover to                           │
│      see details                        │
│                                         │
│  [END TURN] [CONCEDE]                  │
│                                         │
└─────────────────────────────────────────┘
```

### Card UI Components:

**Card Component (Hand):**
```
┌──────────┐
│    ⚡️    │  (Element icon)
│    2     │  (Mana cost)
│   Salix  │  (Name)
│          │
│   2/2    │  (Attack/Health)
└──────────┘
```

**Creature on Board:**
```
┌──────────┐
│   Salix  │
│    2/2   │
│   ⚡️ 🔥  │
└──────────┘
```

### Interaction States:

**Hand Cards:**
- **Default:** Reduced opacity (70%)
- **Hover:** Full opacity + scale (1.1x)
- **Dragging:** Scale (1.2x) + rotate slightly
- **Can't afford:** Red tint + disabled

**Creatures on Board:**
- **Can attack:** Green border
- **Summoning sickness:** Gray border
- **Blocking:** Yellow border
- **Has died:** Fade out animation

### Combat Animation:

**Attack Sequence:**
1. Attacking creature glows red
2. Slides forward 50% toward target
3. Damage numbers pop up
4. Creature returns to position
5. Health updates

**Damage Numbers:**
- White (normal damage)
- Red (crit damage, future)
- Green (healing)

---

## 7. GAME STATES

### State Machine:

```
START GAME
    ↓
SHUFFLE DECKS
    ↓
DRAW 5 CARDS (Player) + DRAW 5 CARDS (AI)
    ↓
DETERMINE FIRST PLAYER (Random)
    ↓
PLAYER TURN LOOP
    ↓
  ┌─────────────────────┐
  │ PLAYER'S TURN       │
  │ - Draw 1 card       │
  │ - Gain 1 mana       │
  │ - Main phase        │
  │ - End turn          │
  └─────────────────────┘
    ↓
AI TURN LOOP
    ↓
  ┌─────────────────────┐
  │ AI'S TURN           │
  │ - Draw 1 card       │
  │ - Gain 1 mana       │
  │ - AI logic          │
  │ - End turn          │
  └─────────────────────┘
    ↓
CHECK WIN CONDITIONS
    ↓
  ├─ Player HP ≤ 0 → AI WINS
  ├─ AI HP ≤ 0 → PLAYER WINS
  ├─ Player deck empty → AI WINS
  ├─ AI deck empty → PLAYER WINS
  └─ Neither → RETURN TO PLAYER TURN LOOP
```

### Turn State Management:

```typescript
type GameState = {
  playerHealth: number;
  aiHealth: number;
  playerMana: number;
  aiMana: number;
  playerHand: Card[];
  aiHand: Card[];
  playerDeck: Card[];
  aiDeck: Card[];
  playerBoard: Creature[];
  aiBoard: Creature[];
  currentTurn: "player" | "ai";
  turnNumber: number;
  gameStatus: "playing" | "player_won" | "ai_won" | "conceded";
}
```

---

## 8. IMPLEMENTATION PHASES

### Phase 1: Core Systems (Week 1-2)

**Deliverables:**
- ✅ Card data structure (TypeScript interfaces)
- ✅ Deck creation (2 starter decks)
- ✅ Shuffle logic
- ✅ Draw card function
- ✅ Mana system
- ✅ Turn state machine

**Components:**
- `Card.tsx` - Card display component
- `Deck.ts` - Deck data structure
- `GameState.ts` - State management
- `TurnManager.ts` - Turn logic

### Phase 2: UI + Battle System (Week 3-4)

**Deliverables:**
- ✅ Battlefield UI (creatures on board)
- ✅ Hand UI (draggable cards)
- ✅ Play card function
- ✅ Attack function
- ✅ Damage calculation
- ✅ Win condition checking

**Components:**
- `Battlefield.tsx` - Board display
- `Hand.tsx` - Hand display
- `HealthBar.tsx` - Health/Mana bars
- `GameBoard.tsx` - Main game screen

### Phase 3: AI Implementation (Week 5)

**Deliverables:**
- ✅ AI decision tree
- ✅ AI spell targeting
- ✅ AI creature placement
- ✅ AI attack logic
- ✅ AI turn automation

**Components:**
- `AI.ts` - AI logic engine
- `AIDecision.ts` - Decision tree
- `AIHeuristics.ts` - Targeting logic

### Phase 4: Polish + Testing (Week 6)

**Deliverables:**
- ✅ Card animations
- ✅ Sound effects (optional)
- ✅ Victory/defeat screens
- ✅ "Play Again" button
- ✅ Balance testing (AI difficulty)

**Components:**
- `Animations.ts` - Animation system
- `GameOver.tsx` - Victory/defeat screen
- `PlayAgain.tsx` - Restart logic

### Phase 5: Launch Prep (Week 7)

**Deliverables:**
- ✅ Landing page ("Play Elekin TCG FREE")
- ✅ Logo integration
- ✅ Twitter/Discord links
- ✅ Deploy to Vercel
- ✅ Share on Reddit/r/TCG

**Files:**
- `index.html` - Landing page
- `App.tsx` - Main app
- `vercel.json` - Deployment config

---

## 9. TECHNICAL SPECIFICATIONS

### File Structure:

```
elekin-tcg-browser/
├── src/
│   ├── components/
│   │   ├── Card.tsx              # Card display
│   │   ├── Hand.tsx              # Hand display
│   │   ├── Battlefield.tsx       # Board display
│   │   ├── HealthBar.tsx         # Health/Mana
│   │   ├── GameBoard.tsx         # Main screen
│   │   ├── GameOver.tsx          # Victory/defeat
│   │   └── PlayAgain.tsx         # Restart button
│   ├── data/
│   │   ├── cards.ts              # Card definitions
│   │   ├── decks.ts              # Deck definitions
│   │   └── ai.ts                 # AI logic
│   ├── systems/
│   │   ├── GameState.ts          # State management
│   │   ├── TurnManager.ts        # Turn logic
│   │   ├── Combat.ts              # Combat calculations
│   │   └── WinCondition.ts       # Win checks
│   ├── types/
│   │   └── types.ts              # TypeScript types
│   ├── App.tsx                   # Main app
│   └── main.tsx                  # Entry point
├── public/
│   ├── favicon.ico
│   └── assets/                   # Future art
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### Dependencies:

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.4.0"
  }
}
```

### Store Structure (Zustand):

```typescript
interface GameStore {
  // Game state
  playerHealth: number;
  aiHealth: number;
  playerMana: number;
  aiMana: number;
  currentTurn: "player" | "ai";
  turnNumber: number;
  
  // Cards
  playerHand: Card[];
  aiHand: Card[];
  playerDeck: Card[];
  aiDeck: Card[];
  playerBoard: Creature[];
  aiBoard: Creature[];
  
  // Actions
  playCard: (card: Card) => void;
  attack: (attacker: Creature, target: Creature | "face") => void;
  endTurn: () => void;
  concede: () => void;
  resetGame: () => void;
}
```

---

## 10. AI DECISION PSEUDOCODE

```javascript
function aiTurn() {
  // 1. Lethal Check
  if (canKillOpponent()) {
    executeLethalCombo();
    return;
  }
  
  // 2. Defense Check
  if (willDieNextTurn()) {
    prioritizeHealingOrDefense();
  }
  
  // 3. Play Creatures
  while (canAffordCreature() && hasCreaturesInHand()) {
    const bestCreature = findBestCreature();
    playCreature(bestCreature);
  }
  
  // 4. Play Spells
  while (canAffordSpell() && hasSpellsInHand()) {
    const bestSpell = findBestSpell();
    playSpell(bestSpell);
  }
  
  // 5. Attack
  attackWithCreatures();
  
  // 6. End Turn
  endTurn();
}

function canKillOpponent() {
  const totalDamage = calculateTotalDamage();
  return totalDamage >= opponentHealth;
}

function findBestCreature() {
  // Prioritize higher attack
  return hand.filter(c => c.type === "creature")
    .sort((a, b) => b.attack - a.attack)[0];
}

function findBestSpell() {
  // Prioritize removal if opponent has board
  if (opponentBoard.length > 0) {
    return hand.find(s => s.type === "damage" || s.type === "destroy");
  }
  // Otherwise prioritize card draw
  return hand.find(s => s.type === "draw");
}
```

---

## 11. TESTING CHECKLIST

### Core Functionality:
- [ ] Draw 5 cards at start
- [ ] First player randomized
- [ ] Mana increases each turn
- [ ] Can play creatures
- [ ] Can play spells
- [ ] Creatures can attack
- [ ] Damage reduces health
- [ ] Win condition triggers

### AI Testing:
- [ ] AI uses all mana efficiently
- [ ] AI attacks when appropriate
- [ ] AI defends when low health
- [ ] AI uses spells correctly
- [ ] AI difficulty feels fair (not too easy/hard)

### Edge Cases:
- [ ] Deck runs out (player/AI lose)
- [ ] Hand full (discard down to 10)
- [ ] Mana at 10 cap
- [ ] Multiple blockers
- [ ] Creature dies mid-attack

### Balance Testing:
- [ ] Fire deck can win in 8-12 turns
- [ ] Water deck can win in 10-15 turns
- [ ] Games feel competitive (not one-sided)
- [ ] AI wins ~40-50% of games (adjustable)

---

## 12. LAUNCH STRATEGY

### Pre-Launch (1 week before):
- [ ] Create Discord server
- [ ] Create Twitter account (@elekinrpg)
- [ ] Build landing page
- [ ] Write launch post (Reddit)

### Launch Day:
- [ ] Post on r/TCG ("Play Elekin TCG FREE")
- [ ] Post on r/digitalcards
- [ ] Post on r/indiegaming
- [ ] Share on Twitter
- [ ] Share on Discord (TCG servers)

### Success Metrics:
- **Week 1:** 500+ signups
- **Week 2:** 200+ DAU
- **Week 4:** 1,000+ signups
- **Month 2:** 5,000+ signups

---

## 13. FUTURE EXPANSIONS

### Phase 2 (After Launch):
- Add Earth and Air decks
- Add multiplayer (online PvP)
- Add ranked system
- Add card collection (earn cards through play)

### Phase 3 (Months 3-4):
- Add physical TCG integration (redemption codes)
- Add cosmetics (card backs, avatars)
- Add tournaments ($100 prize pools)
- Add achievements

### Phase 4 (Months 5-6):
- Use digital TCG → Build MMO tutorial
- Cross-promote from digital to MMO
- Launch MMO alpha

---

## 14. MINIMUM VIABLE PRODUCT (MVP)

### MVP Requirements:
✅ **Just enough to prove gameplay:**
- 2 decks (Fire vs Water)
- Player vs AI (no multiplayer)
- Basic UI (no animations needed)
- Win/lose conditions
- Playable in browser

### NOT Required for MVP:
❌ Card art (use text/colors)
❌ Sound effects
❌ Animations
❌ Multiple difficulty levels
❌ Deck customization
❌ Online multiplayer

**Goal:** Prove the TCG is fun with minimal features.

---

## 15. CARD DATA DEFINITIONS

### Full Card List (Attached as separate file):

**Fire Creatures (10 types):**
- Pyro Mites, Salix, Cinders, Kindler, Rawn, Kitsol, Pyrusk, Embara, Blaze, Cataclysm, Ignar

**Fire Spells (7 types):**
- Ember Strike, Flame Burst, Sear Opponent, Combust, Inferno Blast, Pyre Wave, Fire Storm

**Water Creatures (10 types):**
- Driplets, Glurb, Shelt, Skiff, Burble, Gleel, Murk, Piddip, Tidal Ray, Maelstrom, Caris

**Water Spells (7 types):**
- Splash, Flow, Tidal Push, Healing Wave, Whirlpool, Cascade, Tidal Surge

**Full card data will be in:** `src/data/cards.ts`

---

## END OF SPECIFICATION

**Next Steps:**
1. Review this spec with team/AI
2. Start implementation (Week 1: Card data + UI)
3. Test AI difficulty early (adjust heuristics)
4. Launch in 6-7 weeks
5. Use digital TCG to sell physical cards

**Questions?** Adjust this spec as needed before building! 🚀

