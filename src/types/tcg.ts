// Card Types
export type Element = "fire" | "water" | "earth" | "air";
export type CardType = "creature" | "spell" | "rune" | "counter" | "shield";
export type SpellType = "damage" | "heal" | "draw" | "bounce" | "destroy";
export type Rarity = "common" | "uncommon" | "rare" | "legendary";
export type Phase = "draw" | "generate" | "main1" | "battle" | "main2" | "end";

export interface BaseCard {
  id: string;
  name: string;
  element: Element;
  cost: number;
  rarity: Rarity;
  cardType: CardType;
  // Optional secondary essence requirement (for multi-element costs like dragons)
  secondaryCost?: {
    element: Element;
    amount: number;
  };
}

export type AbilityTriggerType = "onSummon" | "passive" | "activated" | "onDestroy" | "hand";

export interface CreatureAbility {
  id: string;
  name: string;
  trigger: AbilityTriggerType;
  description?: string;
}

export type AbilityOptionType = "creature" | "shield" | "rune" | "element" | "card" | "confirm";

export interface AbilityOption {
  id: string;
  label: string;
  type: AbilityOptionType;
  metadata?: any;
}

export interface BattleLogEntry {
  id: string;
  controller: "player" | "ai" | "system";
  message: string;
  timestamp: number;
  type?: "ability" | "attack" | "defense" | "system";
}

export interface PendingAbilityPrompt {
  controller: "player" | "ai";
  sourceInstanceId: string;
  abilityId: string;
  message: string;
  options: AbilityOption[];
  selectionMode: "single" | "multiple" | "none";
  allowSkip?: boolean;
  stage?: string;
  context?: any;
}

export interface AbilityContext {
  controller: "player" | "ai";
  sourceInstanceId?: string;
  sourceCardId: string;
  abilityId: string;
  stage?: string;
  data?: Record<string, any>;
}

export interface CreatureCard extends BaseCard {
  cardType: "creature";
  attack: number; // Legacy field, use strength instead
  health: number; // Legacy field, use strength instead
  strength: number; // Both health (max) and damage dealt
  agility: number; // Speed/turn order in combat (higher = attacks first)
  abilities?: CreatureAbility[];
  imagePath?: string;
  essenceGeneration?: number; // How much essence this creature generates per turn (default: 1)
}

export interface SpellCard extends BaseCard {
  cardType: "spell";
  spellType: SpellType;
  effect: number;
  additionalEffects?: string[];
}

export interface RuneCard extends BaseCard {
  cardType: "rune";
  effect: string;
}

export interface CounterCard extends BaseCard {
  cardType: "counter";
  effect: string;
}

export interface ShieldCard extends BaseCard {
  cardType: "shield";
  tier: 1 | 2 | 3;
}

// Board Shield (with current health and tier state)
export interface BoardShield extends ShieldCard {
  currentHealth: number;
  currentTier: 1 | 2 | 3;
  faceDown: boolean;
  maxHealthByTier: { 1: number; 2: number; 3: number };
}

export type Card = CreatureCard | SpellCard | RuneCard | CounterCard | ShieldCard;

// Board Creature (with state like summoning sickness)
export interface BoardCreature extends CreatureCard {
  instanceId: string; // Unique ID for board placement
  currentHealth: number; // Starts at strength, decreases with damage
  hasAction: boolean; // True if creature has an action (not exhausted), refreshed at start of Main Phase 1
  canAttack: boolean; // Legacy field, use hasAction instead
  isBlocking?: boolean;
  equippedCards?: RuneCard[]; // Equipment rune cards attached to this creature
  exhausted?: boolean; // Visual state - true if horizontal/rotated (no action)
  hasActivatedAbilityThisTurn?: boolean;
  temporaryStrengthBonus?: number;
  doubleStrikeUntilEndOfTurn?: boolean;
  pierceUntilEndOfTurn?: boolean;
  cannotBeBlocked?: boolean;
  untargetableUntilTurn?: number;
  abilityContext?: Record<string, any>;
}

// Essence Pool
export interface EssencePool {
  fire: number;
  water: number;
  earth: number;
  air: number;
}

// Placed Rune/Counter Card (with face-down state)
export interface PlacedRuneCounter extends Card {
  faceDown: boolean;
}

// Game State
export interface GameState {
  playerHealth: number;
  aiHealth: number;
  playerMana: number;
  playerMaxMana: number;
  aiMana: number;
  aiMaxMana: number;
  turnCycle?: number;
  currentTurn: "player" | "ai";
  currentPhase: Phase;
  turnNumber: number;
  gameStatus: "setup" | "playing" | "player_won" | "ai_won" | "conceded";
  
  // Essence tracking
  playerEssence: EssencePool;
  aiEssence: EssencePool;
  
  // Turn tracking
  hasNormalSummonedThisTurn: boolean;
  hasDrawnThisTurn?: boolean;
  
  // AI message for displaying AI actions
  aiPhaseMessage?: string;
  
  // Cards
  playerHand: Card[];
  aiHand: Card[];
  playerDeck: Card[];
  aiDeck: Card[];
  // Deck types for effects that depend on starter choice
  playerDeckType?: "crystal" | "lightning" | "fire" | "water";
  aiDeckType?: "crystal" | "lightning" | "fire" | "water";
  playerBoard: BoardCreature[];
  aiBoard: BoardCreature[];
  
  // Rune/Counter Zones (5 slots each)
  playerRuneCounterZone: (PlacedRuneCounter | null)[];
  aiRuneCounterZone: (PlacedRuneCounter | null)[];
  
  // Shield Zones (3 shields each)
  playerShields: BoardShield[];
  aiShields: BoardShield[];
  
  // Discard piles
  playerDiscard: Card[];
  aiDiscard: Card[];

  // Turn-long rune effects
  playerDraconicAdapt?: {
    active: boolean;
    requiredElements: Element[]; // e.g., ["air","fire"] or ["water","earth"]
    dragonId: string; // "veton" or "diamoria"
  };
  aiDraconicAdapt?: {
    active: boolean;
    requiredElements: Element[];
    dragonId: string;
  };
  
  // Pending defense response (when AI attacks player creature)
  pendingDefenseResponse?: {
    attackerId: string;
    defenderId: string;
    canDodge: boolean;
    potentialBlockers: Array<{ instanceId: string; name: string; agility: number }>;
    isExhaustedTarget: boolean; // True if attacking exhausted creature
    isShieldAttack?: boolean; // True if attacking shield
    originalShieldId?: string; // Tracks original shield target when blockers intervene
  };
  
  pendingAbilityPrompt?: PendingAbilityPrompt;
  activeAbilityContext?: AbilityContext;
  battleLog: BattleLogEntry[];
}

// Deck Definition
export interface DeckDefinition {
  name: string;
  theme: string;
  element: Element;
  cards: { card: Card; quantity: number }[];
}
