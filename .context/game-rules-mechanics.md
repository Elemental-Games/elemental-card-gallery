# Elekin: Masters of Kinbrold - Game Rules & Mechanics

## Core Game Mechanics

### Game Setup
- Players start with 500 health points
- Starting hand: 5 cards
- Maximum hand size: 7 cards
- Mulligan: Up to 2 times with starting hand
- Coin flip determines first player
- Each player arranges 3 shields face-down (1 of each tier)

### Resource System (Essence)
- Starting essence: 0 of each element
- Maximum essence per element: 20
- Elements: Air, Water, Fire, Earth
- Generation occurs during Generation Phase
- Essence carries over between turns
- Essence used for:
  - Summoning creatures
  - Activating special abilities
  - Specific card effects

### Turn Structure
1. **Draw Phase**
   - Draw 1 card
   - Check deck-out condition

2. **Generation Phase**
   - Generate essence from creatures on field
   - Add to respective element trackers

3. **Main Phase 1**
   - Normal summon (once per turn)
   - Place/play Rune/Counter cards
   - Activate creature abilities

4. **Battle Phase**
   - Declare and resolve attacks one at a time
   - Opportunity for blocks/dodges
   - Damage calculation

5. **Main Phase 2**
   - Place/play additional Rune/Counter cards
   - No creature summoning allowed

6. **End Phase**
   - Restore creature stats
   - Restore shield health to proper tier
   - Discard to 7 cards if necessary

## Combat System

### Attack Mechanics
- Creatures have Strength and Agility stats
- Higher Agility strikes first
- Vertical position = has action
- Horizontal position = no action
- Actions refresh during Main Phase 1

### Damage Calculation
- Strength determines damage dealt/taken
- Agility determines strike order
- Example: 110/50 vs 90/60
  1. 90/60 hits first (60 > 50 agility)
  2. 110/50 takes 90 damage (20 remaining)
  3. 110/50 hits for 110 damage
  4. 90/60 is destroyed

### Dodge/Block System
- Can dodge if target has higher agility
- Can block for others if higher agility
- Requires available action
- One blocker per attack

### Shield System
- Tier 1: 150 health
- Tier 2: 300 health
- Tier 3: 450 health
- Regenerate to next tier threshold
- Face-up when damaged
- Cannot be replaced when broken

## Card Types & Effects

### Creatures
- Normal ability: Once per turn, no cost
- Special ability: Once per turn, requires essence
- Generate essence during Generation Phase
- Maximum 5 on field

### Runes
- Types: Normal, Equipment, Instant
- Can be played face-down
- Equipment stays on field
- Instant can be played anytime

### Counters
- Played face-down only
- Trigger during opponent's turn
- Discard after resolution

### Shields
- Three tiers (1/2/3)
- Two effects per shield
- Choose one effect when broken
- Cannot be countered

## Special Rules

### Dragon Cards
- Require dual-element essence
- Can use mixed essence for abilities
- Special summoning conditions
- Example: Frost Dragon (Air + Water)

### Chain Resolution
- Last in, first out
- Multiple triggers: Active player priority
- Shield effects cannot be chained

### Victory Conditions
1. Reduce opponent to 0 HP
2. Opponent cannot draw
3. Activate "Ancient Sigil"

## Card Zones

### Field Layout
- Essence tracker (left)
- Creature zone (5 spaces)
- Rune/Counter zone (5 spaces)
- Shield zone (3 spaces)
- Deck zone
- Discard pile
- Exempt zone (broken shields)

## Example Cards

### Creature Example
```
Cloud Sprinter
Type: Creature
Element: Air
Stats: 75/75 (Strength/Agility)
Essence Generation: 1 Air
Cost: 0 Air
```

### Rune Example
```
Essence Amplifier
Type: Rune (Equipment)
Effect: Equipped creature generates double essence
```

### Counter Example
```
Counter Pulse
Type: Counter
Trigger: Opponent summons without essence
Effect: Destroy the summoned creature
```

### Shield Example
```
Mystic Ward (Tier 1)
Primary: Destroy up to 2 Rune/Counter cards
Secondary: Equip to reduce creature stats
``` 