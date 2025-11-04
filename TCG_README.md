# 🎮 ELEKIN TCG - Browser-Based Trading Card Game

A fast-paced, browser-based trading card game featuring Fire vs Water kingdoms in strategic turn-based combat. Play against an intelligent AI opponent and prove your strategic prowess!

## 🎯 Features

- **2 Starter Decks**: Fire (Aggro) vs Water (Control) with unique mechanics
- **Player vs AI Gameplay**: Challenge an intelligent opponent with strategic decision-making
- **Turn-Based Combat**: Classic TCG mechanics with mana management, creature summoning, and spell casting
- **Summoning Sickness**: Creatures need a turn to settle before attacking
- **Responsive UI**: Beautiful, modern interface built with Tailwind CSS
- **No Sign-up Required**: Play instantly in your browser
- **15-20 Minute Games**: Perfect for quick gaming sessions

## 📁 Project Structure

```
src/
├── types/
│   └── tcg.ts                    # TypeScript interfaces for cards, creatures, spells, and game state
├── data/
│   ├── cards.ts                  # Card definitions for Fire and Water decks
│   └── decks.ts                  # Deck builders and shuffling logic
├── store/
│   └── gameStore.ts              # Zustand game state management
├── components/
│   ├── TCGGameBoard.jsx          # Main game board layout
│   ├── TCGCard.jsx               # Individual card component
│   ├── TCGHand.jsx               # Player's hand of cards
│   ├── TCGBattlefield.jsx        # Board where creatures fight
│   ├── TCGHealthBar.jsx          # Health display with visual feedback
│   └── TCGGameOver.jsx           # Victory/defeat screen
└── pages/
    └── TCGLanding.jsx             # Landing page with rules and CTA
```

## 🎮 How to Play

### Core Mechanics

**Mana System**
- Start each game with 1 mana
- Gain 1 mana per turn (max 10)
- Mana resets at the start of each turn
- Use mana to play cards

**Combat**
- Click cards in your hand to play them (if you have enough mana)
- Creatures enter the battlefield with summoning sickness (can't attack this turn)
- Next turn, creatures can attack once
- Attack creatures or directly damage the opponent's health
- Opponent starts with 30 health - reduce to 0 to win

**Card Types**
- **Creatures**: Attack and defend with attack/health stats
- **Spells**: Instant effects like damage, healing, or drawing cards

### Turn Structure

1. **Draw Phase**: Draw 1 card from your deck
2. **Mana Phase**: Gain 1 mana (max 10)
3. **Main Phase**: Play creatures and spells
4. **Combat Phase**: Attack with your creatures
5. **End Phase**: Pass turn to opponent

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Package Manager**: npm/pnpm

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+
- npm or pnpm

### Install Dependencies

```bash
npm install
# or
pnpm install
```

Make sure Zustand and React Router are installed:
```bash
npm install zustand react-router-dom
```

### Running the Development Server

```bash
npm run dev
# The app will start at http://localhost:5173
```

### Building for Production

```bash
npm run build
```

## 🎴 Card Database

### Fire Creatures (Aggro Focus)
- Pyro Mites (1/1/1)
- Ember Flicker (2/2/1)
- Fire Bugs (1/1/2)
- Archen (2/2/2)
- Night Vox (2/1/3)
- Lavrok (3/3/2)
- Blazorn (4/4/3)

### Fire Spells (Damage Focus)
- Ember Strike (1 mana, 2 damage)
- Flame Burst (2 mana, 3 damage)
- Sear Opponent (3 mana, 4 damage)
- Inferno Blast (4 mana, 6 damage)

### Water Creatures (Control Focus)
- Driplets (1/1/1)
- Aqua Dart (1/2/1)
- Piddip (2/2/2)
- Glurb (2/1/3)
- Tidal Ray (2/2/1)
- Shelt (3/2/4)
- Murk (3/3/4)
- Maelstrom (5/4/5)

### Water Spells (Control/Healing Focus)
- Splash (1 mana, 2 heal)
- Healing Wave (2 mana, 4 heal)
- Tidal Push (2 mana, bounce 1 creature)
- Cascade (3 mana, draw 2 cards)

## 🎮 Game States

```
START → SETUP → PLAYING → WIN/LOSE → GAME OVER
```

**Game Status Values**:
- `setup`: Initial state, decks being shuffled
- `playing`: Active gameplay
- `player_won`: Player defeated the AI
- `ai_won`: AI defeated the player
- `conceded`: Player gave up

## 📊 Game Store (Zustand)

The game state is managed centrally using Zustand. Key state includes:

```typescript
{
  // Health
  playerHealth: number;
  aiHealth: number;
  
  // Mana
  playerMana: number;
  playerMaxMana: number;
  aiMana: number;
  aiMaxMana: number;
  
  // Cards
  playerHand: Card[];
  aiHand: Card[];
  playerDeck: Card[];
  aiDeck: Card[];
  playerBoard: BoardCreature[];
  aiBoard: BoardCreature[];
  
  // Game Info
  currentTurn: "player" | "ai";
  turnNumber: number;
  gameStatus: "setup" | "playing" | "player_won" | "ai_won" | "conceded";
}
```

## 🤖 AI Opponent

The AI opponent (Water Kingdom) uses a decision tree with the following priorities:

1. **Lethal Check**: Can it win this turn?
2. **Defense Check**: Will it die next turn?
3. **Board Control**: Build creatures or clear threats?
4. **Mana Efficiency**: Use all available mana

The AI plays Water deck (control-focused) while the player gets Fire deck (aggro-focused), creating an interesting dynamic for learning the game.

## 🚀 Phase 2 Improvements (Roadmap)

- [ ] Implement full spell effects (damage, healing, bounce, draw)
- [ ] AI spell casting logic
- [ ] Creature targeting system for attacks
- [ ] Block/defense mechanics
- [ ] Animations for cards playing and creatures attacking
- [ ] Sound effects
- [ ] Multiple difficulty levels
- [ ] Deck customization

## 🐛 Known Limitations (MVP)

- Spells don't fully execute effects yet (damage/healing not applied)
- No creature attacking or blocking UI yet
- No AI turn automation (AI currently just passes)
- No animations
- No undo/take-back moves

## 💡 Tips for Players

**Playing Fire (Aggro)**
- Focus on early board control
- Use damage spells to finish weak opponents
- Play creatures early and attack often
- Don't waste mana - always use it

**Fighting Water (Control)**
- Expect healing spells - push for early kills
- Watch out for bounce effects that send creatures back to hand
- Creature trades are important - don't over-extend
- Water player will try to out-resource you

## 📝 Development Notes

### Key Files to Modify

**To add new cards**: Edit `src/data/cards.ts`
**To change game logic**: Edit `src/store/gameStore.ts`
**To modify UI**: Edit components in `src/components/`

### Common Tasks

**Add a new spell effect**:
1. Define the spell in `cards.ts`
2. Add logic in `gameStore.ts` to handle the spell type
3. Update the Card component to show the effect

**Adjust AI difficulty**:
Edit `src/data/ai.ts` (to be created) and adjust heuristic weights

**Change mana cap**:
Search for `maxMana: 10` in `gameStore.ts`

## 🎨 UI/UX Design Notes

- **Color Scheme**: Dark theme with cyan/blue accents for Water, orange for Fire
- **Elements**: Fire (🔥), Water (💧), Earth (🌿), Air (💨)
- **State Indicators**: Green borders for ready creatures, gray for summoning sickness
- **Responsiveness**: Mobile-first design with Tailwind CSS

## 📄 License

Created for Elemental Games. All rights reserved.

## 🤝 Contributing

This is a proof-of-concept TCG. To suggest improvements:

1. Test different strategies
2. Identify balance issues
3. Report bugs
4. Suggest UI/UX improvements

## 🎯 Next Steps

1. Implement spell effects (damage/healing application)
2. Add creature attack UI and targeting
3. Implement AI turn automation
4. Add animations
5. Test balance and adjust card stats
6. Deploy to production

---

**Built with ❤️ for TCG Lovers**

Play now. Enjoy. Conquer the Water Kingdom. 🎮⚔️
