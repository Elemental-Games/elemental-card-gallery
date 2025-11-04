# ⚡ ELEKIN TCG - Quick Start Guide

## 🚀 Get It Running in 2 Minutes

### Step 1: Install Dependencies
```bash
cd /Users/mark/elemental-card-gallery
npm install zustand uuid react-router-dom
```

### Step 2: Start Development Server
```bash
npm run dev
```

### Step 3: Open in Browser
Navigate to: `http://localhost:5173`

## 🎮 Play the Game

1. Click **"🎮 Start Playing Now"** button
2. Read the rules (optional)
3. Play! 🎯

### How to Play (Quick Version)
- **Click cards** to play them (if you can afford with mana)
- **Damage spells** reduce opponent's health directly
- **Creatures** appear on board and can attack (after 1 turn)
- **Reduce opponent health to 0** to win
- **Click "End Turn"** when ready

## 🔧 Integration Steps

### 1. Create Route for TCG Landing Page
In your main routing file (probably `src/App.jsx` or routing config):

```jsx
import TCGLanding from './pages/TCGLanding';

// Add to routes:
{
  path: '/tcg',
  element: <TCGLanding />
}
```

### 2. Add Link to Navigation
Add this link somewhere in your main nav:

```jsx
<Link to="/tcg" className="hover:text-cyan-400">
  🎮 Play TCG
</Link>
```

### 3. Ensure Dependencies in package.json
```json
{
  "dependencies": {
    "zustand": "^4.4.0",
    "uuid": "^9.0.0",
    "react-router-dom": "^6.0.0"
  }
}
```

## 🎴 What's Currently Working

✅ **Play Cards** - Click to play creatures and spells
✅ **Mana System** - Starts at 1, grows each turn (max 10)
✅ **Spell Effects** - Damage/healing/draw work correctly
✅ **Health Tracking** - Takes damage, heals, displays correctly
✅ **Turn Management** - Switching between player and AI
✅ **Creatures** - Display with attack/health and summoning sickness
✅ **Win Conditions** - Ends when health reaches 0
✅ **Beautiful UI** - Dark theme with gradients and animations

⏳ **Coming Next**: Creature attacking system and AI logic

## 🧪 Test It

### Test Damage
1. Play as Fire (you start as Fire)
2. Wait a couple turns to accumulate mana
3. Play "Ember Strike" (1 mana, 2 damage) on Water opponent
4. See opponent health drop from 30 to 28
5. Play "Inferno Blast" (4 mana, 6 damage)
6. See opponent health drop by 6 more

### Test Creatures
1. Play "Pyro Mites" (1 mana 1/1 creature)
2. Notice the 😴 icon (summoning sickness)
3. Click "End Turn"
4. Icon disappears = creature ready to attack
5. Creature shows green border = ready

### Test Healing
1. Wait for AI opponent to damage you
2. Look for Water deck to play healing spells
3. When you're low, the AI might heal

### Test Drawing
1. Look for "Cascade" spell from Water deck
2. When played, you should see more cards in opponent's hand grow

## 📊 Game Status Indicators

| Indicator | Meaning |
|-----------|---------|
| 🔷 YOUR TURN | It's your turn, play cards! |
| 🔴 AI TURN | Waiting for AI (1.5 seconds) |
| 🌊 Water Kingdom | Your opponent |
| 🔥 Fire Kingdom | You |
| 😴 | Summoning sickness (can't attack) |
| 💚 Green Health Bar | Healthy (>50%) |
| 💛 Yellow Health Bar | Hurt (25-50%) |
| ❤️ Red Health Bar | Critical (<25%) |

## 🎨 UI Layout

```
┌─────────────────────────────────────┐
│  ELEKIN TCG    [Turn 5] YOUR TURN  │
├─────────────────────────────────────┤
│                                     │
│  🌊 Water Kingdom (AI)  HP: 22/30   │
│  Mana: ●●●●○○○○○○ (4/10)          │
│                                     │
│  ┌─────────────────────────────────┐
│  │ Murk      ⚔️ 3   ❤️ 4/4         │
│  │ Glurb     ⚔️ 1   ❤️ 3/3  😴    │
│  └─────────────────────────────────┘
│                                     │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────────────────────────┐
│  │ Pyro Mites ⚔️ 1  ❤️ 1/1        │
│  │ Archen     ⚔️ 2  ❤️ 2/2        │
│  └─────────────────────────────────┘
│                                     │
│  Mana: ●●●●●○○○○○ (5/10)          │
│  🔥 Fire Kingdom (You)   HP: 28/30 │
│  Deck: 32 cards                    │
├─────────────────────────────────────┤
│                                     │
│  [🔥] [💧] [⚡] [❤️] [🌿]          │
│  Ember Fire Archen Splash Driplets │
│     Strike Bugs         Wave       │
│                                     │
│        [✓ End Turn]  [✗ Concede]   │
└─────────────────────────────────────┘
```

## 🐛 Troubleshooting

### "Card not importing"
Make sure `zustand` is installed:
```bash
npm install zustand
```

### "Routes not found"
Make sure you've imported `TCGLanding` and added the route

### "Tailwind styles not working"
Make sure your `tailwind.config.js` is set up and CSS is imported

### "Game not starting"
- Open browser console (F12)
- Check for errors
- Make sure `/tcg` route exists
- Clear cache and refresh

## 📝 File Locations

All TCG files are in:
```
/Users/mark/elemental-card-gallery/src/
├── types/tcg.ts
├── data/cards.ts
├── data/decks.ts
├── store/gameStore.ts
├── components/TCG*.jsx (6 components)
└── pages/TCGLanding.jsx
```

Main docs:
- `TCG_README.md` - Full documentation
- `TCG_IMPLEMENTATION_SUMMARY.md` - What's done, what's next
- `QUICK_START_TCG.md` - This file

## 🎯 What to Do Next

### Short Term (Next Session)
1. Test the game thoroughly
2. Report any bugs
3. Adjust card balance if needed
4. Try different strategies

### Medium Term (Next Week)
1. Implement creature attacking UI
2. Add AI decision-making
3. Test balance extensively

### Long Term (Next Month)
1. Add animations
2. Add sound effects
3. Deploy to production
4. Gather player feedback

## 💬 Quick Reference

**Play a card**: Click it (if you can afford)
**End turn**: Click "End Turn" button
**Concede**: Click "Concede" button (admit defeat)
**Restart**: Click "Play Again" after game ends
**Go home**: Click logo or "Home" button

## 🎮 Example Opening

**Turn 1 (Player)**
- Draw 1 card
- Mana: 0 → 1
- Play Pyro Mites (1 mana creature, 1/1)
- Mana: 1 → 0
- Click End Turn

**Turn 2 (AI)**
- Draws a card
- Mana: 1 → 2
- AI plays a creature
- Click End Turn

**Turn 3 (Player)**
- Draw 1 card (now have 4 cards in hand)
- Mana: 1 → 2
- Pyro Mites is now ready (no more 😴)
- Play another creature
- Click End Turn

## ✨ That's It!

You now have a working browser-based TCG. Go play and have fun! 🎮⚔️

For detailed mechanics, see `TCG_README.md`
For development info, see `TCG_IMPLEMENTATION_SUMMARY.md`
