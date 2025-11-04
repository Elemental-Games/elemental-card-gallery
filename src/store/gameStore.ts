import { create } from "zustand";
import { GameState, Card, BoardCreature, BoardShield, Element } from "../types/tcg";
import { getStarterDeck, drawCards } from "../data/decks";
import { v4 as uuidv4 } from "uuid";
import * as aiLogic from "./aiLogic";

interface GameActions {
  initializeGame: (playerDeck: "crystal" | "lightning", aiDeck: "crystal" | "lightning", playerGoesFirst?: boolean) => void;
  playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => void;
  equipRuneToCreature: (runeCard: any, creatureInstanceId: string, isPlayer: boolean, runeZoneIndex?: number) => void;
  swapEssence: (fromElement: string, toElement: string, amount: number, isPlayer: boolean, runeZoneIndex?: number) => void;
  generateEssenceFromRune: (element: Element, amount: number, isPlayer: boolean, runeZoneIndex?: number) => void;
  dealDamageToTarget: (targetId: string, targetType: "creature" | "shield", damage: number, isPlayer: boolean, runeZoneIndex?: number) => void;
  discardRuneFromZone: (isPlayer: boolean, runeZoneIndex: number) => void;
  summonDragonByTribute: (dragonCardIndex: number, tributeInstanceIds: string[]) => void;
  attackWithCreature: (
    creatureInstanceId: string,
    targetInstanceId: string | "face",
    isPlayer: boolean
  ) => void;
  initiateAttack: (attackerId: string, targetId: string, targetType: "creature" | "shield" | "face", isPlayer: boolean) => any;
  handleDefenseResponse: (defenderId: string, responseType: "defend" | "dodge" | "block" | "none", attackerId: string, blockerId?: string, isPlayer: boolean) => any;
  resolveCombat: (attackerId: string, defenderId: string, isPlayer: boolean) => any;
  refreshCreatureActions: (isPlayer: boolean) => void;
  setAIPhaseMessage: (message: string | null) => void;
  drawCard: (isPlayer: boolean) => { success: boolean; error?: string } | void;
  nextPhase: () => void;
  endTurn: () => void;
  aiTurn: () => void;
  concede: () => void;
  resetGame: () => void;
}

type GameStore = GameState & GameActions;

const initialGameState: GameState = {
  playerHealth: 500,
  aiHealth: 500,
  playerMana: 0,
  playerMaxMana: 0,
  aiMana: 0,
  aiMaxMana: 0,
  currentTurn: "player",
  currentPhase: "draw",
  turnNumber: 1,
  gameStatus: "setup",
  playerEssence: { fire: 0, water: 0, earth: 0, air: 0 },
  aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
  hasNormalSummonedThisTurn: false,
  hasDrawnThisTurn: false,
  playerHand: [],
  aiHand: [],
  playerDeck: [],
  aiDeck: [],
  playerBoard: [],
  aiBoard: [],
  playerRuneCounterZone: Array(5).fill(null),
  aiRuneCounterZone: Array(5).fill(null),
  playerShields: [],
  aiShields: [],
  playerDiscard: [],
  aiDiscard: [],
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialGameState,

  initializeGame: (playerDeck: "crystal" | "lightning", aiDeck: "crystal" | "lightning", playerGoesFirst: boolean = Math.random() > 0.5) => {
    // Get shuffled decks
    const playerFullDeck = getStarterDeck(playerDeck);
    const aiFullDeck = getStarterDeck(aiDeck);

    // Draw starting hands (5 cards each)
    const { drawn: playerHand, remaining: playerRemaining } = drawCards(playerFullDeck, 5);
    const { drawn: aiHand, remaining: aiRemaining } = drawCards(aiFullDeck, 5);

    // Set first player
    const firstPlayer = playerGoesFirst ? "player" : "ai";

    // Initialize shields based on deck type
    const crystalShields: BoardShield[] = [
      { id: "radiant_buckler", name: "Radiant Buckler", tier: 1, element: "water", cost: 0, rarity: "common", cardType: "shield", currentHealth: 150, currentTier: 1, faceDown: true, maxHealthByTier: { 1: 150, 2: 150, 3: 150 } },
      { id: "spectral_shield", name: "Spectral Shield", tier: 2, element: "water", cost: 0, rarity: "uncommon", cardType: "shield", currentHealth: 300, currentTier: 2, faceDown: true, maxHealthByTier: { 1: 150, 2: 300, 3: 300 } },
      { id: "titans_shield", name: "Titan's Shield", tier: 3, element: "earth", cost: 0, rarity: "rare", cardType: "shield", currentHealth: 450, currentTier: 3, faceDown: true, maxHealthByTier: { 1: 150, 2: 300, 3: 450 } },
    ];

    const lightningShields: BoardShield[] = [
      { id: "mystic_ward", name: "Mystic Ward", tier: 1, element: "air", cost: 0, rarity: "common", cardType: "shield", currentHealth: 150, currentTier: 1, faceDown: true, maxHealthByTier: { 1: 150, 2: 150, 3: 150 } },
      { id: "mythical_barrier", name: "Mythical Barrier", tier: 2, element: "air", cost: 0, rarity: "uncommon", cardType: "shield", currentHealth: 300, currentTier: 2, faceDown: true, maxHealthByTier: { 1: 150, 2: 300, 3: 300 } },
      { id: "elemental_shield", name: "Elemental Shield", tier: 3, element: "fire", cost: 0, rarity: "rare", cardType: "shield", currentHealth: 450, currentTier: 3, faceDown: true, maxHealthByTier: { 1: 150, 2: 300, 3: 450 } },
    ];

    const initialPlayerShields = playerDeck === "crystal" ? crystalShields : lightningShields;
    const initialAiShields = aiDeck === "crystal" ? crystalShields : lightningShields;
    
    // Shuffle AI shields so they're in random positions
    const shuffledAiShields = [...initialAiShields].sort(() => Math.random() - 0.5);

    set({
      playerDeck: playerRemaining,
      aiDeck: aiRemaining,
      playerHand,
      aiHand,
      currentTurn: firstPlayer,
      // Start the game in Main Phase 1 for the player who goes first (skip draw/generate only on turn 1)
      currentPhase: "main1",
      playerMana: 1,
      playerMaxMana: 1,
      aiMana: 1,
      aiMaxMana: 1,
      gameStatus: "playing",
      turnNumber: 1,
      playerHealth: 500,
      aiHealth: 500,
      hasNormalSummonedThisTurn: false,
      playerDeckType: playerDeck,
      aiDeckType: aiDeck,
      playerDraconicAdapt: { active: false, requiredElements: [], dragonId: "" },
      aiDraconicAdapt: { active: false, requiredElements: [], dragonId: "" },
      playerShields: initialPlayerShields,
      aiShields: shuffledAiShields,
    });
  },

  playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => {
    const state = get();
    const hand = isPlayer ? state.playerHand : state.aiHand;
    const essence = isPlayer ? state.playerEssence : state.aiEssence;
    const board = isPlayer ? state.playerBoard : state.aiBoard;

    if (cardIndex >= hand.length) return { success: false, error: "Invalid card index" };

    const card = hand[cardIndex];
    
    // Handle placing Counter cards face-down (NO ESSENCE COST)
    if (card.cardType === "counter" && zoneType === "runeCounter" && zoneIndex !== undefined) {
      const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;
      
      if (runeCounterZone[zoneIndex] !== null) {
        return { success: false, error: "This slot is already occupied!" };
      }
      
      const newHand = hand.filter((_, idx) => idx !== cardIndex);
      const newRuneCounterZone = [...runeCounterZone];
      newRuneCounterZone[zoneIndex] = { ...card, faceDown: true };
      
      if (isPlayer) {
        set({ playerHand: newHand, playerRuneCounterZone: newRuneCounterZone });
      } else {
        set({ aiHand: newHand, aiRuneCounterZone: newRuneCounterZone });
      }
      return { success: true };
    }
    
    // Handle playing Rune cards (Equipment cards like Essence Amplifier)
    // Rune cards are played face-up with NO ESSENCE COST (just like counters)
    if (card.cardType === "rune" && zoneType === "runeCounter" && zoneIndex !== undefined) {
      const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;
      
      if (runeCounterZone[zoneIndex] !== null) {
        return { success: false, error: "This slot is already occupied!" };
      }
      
      // Remove from hand and place face-up in the zone
      const newHand = hand.filter((_, idx) => idx !== cardIndex);
      const newRuneCounterZone = [...runeCounterZone];
      newRuneCounterZone[zoneIndex] = { ...card, faceDown: false }; // Face-up for runes
      
      if (isPlayer) {
        set({ playerHand: newHand, playerRuneCounterZone: newRuneCounterZone });
      } else {
        set({ aiHand: newHand, aiRuneCounterZone: newRuneCounterZone });
      }
      
      // For Essence Amplifier (equipment rune), signal that we need to select a creature
      if (card.id === "essence_amplifier") {
        return { 
          success: true, 
          needsTarget: true, 
          targetType: "creature",
          cardToEquip: card,
          cardIndex: cardIndex,
          runeZoneIndex: zoneIndex
        };
      }
      
      // For Essence Exchange, signal that we need to select essences to swap
      if (card.id === "essence_exchange") {
        return {
          success: true,
          needsEssenceSwap: true,
          runeZoneIndex: zoneIndex
        };
      }

      // Essence Generation (Normal Rune): prompt to choose an element and then add 2 essence
      if (card.id === "essence_generation") {
        return {
          success: true,
          needsEssenceGeneration: true,
          amount: 2,
          runeZoneIndex: zoneIndex
        } as any;
      }

      // Draconic Adaptability: enable effect for rest of turn, leave card face-up in zone, and let UI discard it after showing prompt
      if (card.id === "draconic_adaptability") {
        if (!isPlayer) return { success: true };
        const deckType = state.playerDeckType || "crystal";
        const requiredElements: Element[] = deckType === "lightning" ? (["air", "fire"] as Element[]) : (["water", "earth"] as Element[]);
        const dragonId = deckType === "lightning" ? "veton" : "diamoria";

        set({
          playerDraconicAdapt: { active: true, requiredElements, dragonId },
        });
        return { success: true, draconicActivated: true, runeZoneIndex: zoneIndex } as any;
      }
      
      // For Direct Assault, signal that we need to select a target
      if (card.id === "direct_assault") {
        return {
          success: true,
          needsTarget: true,
          targetType: "creatureOrShield",
          damage: 50,
          runeZoneIndex: zoneIndex
        };
      }

      // Binding Coils (Equipment Rune): select any creature on the field to exhaust (equip to it)
      if (card.id === "binding_coils") {
        return {
          success: true,
          needsTarget: true,
          targetType: "creature",
          cardToEquip: card,
          cardIndex: cardIndex,
          runeZoneIndex: zoneIndex
        } as any;
      }
      
      // For other rune cards, their effects are already resolved
      return { success: true };
    }
    
    // Check if trying to normal summon a creature
    if (card.cardType === "creature" && zoneType === "creature") {
      // Check if in Main Phase 1 or Main Phase 2
      if (state.currentPhase !== "main1" && state.currentPhase !== "main2") {
        return { success: false, error: "Can only summon creatures in Main Phase!" };
      }
      
      // Check if already normal summoned this turn
      if (state.hasNormalSummonedThisTurn) {
        return { success: false, error: "Already normal summoned this turn!" };
      }
    }
    
    // Draconic Adaptability no longer auto-tributes here. Essence path uses normal cost check below.

    // Check essence cost (supports optional secondary multi-element cost)
    const elementEssence = essence[card.element as keyof typeof essence];
    const primaryOk = (card.cost || 0) <= elementEssence;
    const secondary = (card as any).secondaryCost as { element: any; amount: number } | undefined;
    const secondaryOk = !secondary || secondary.amount <= (essence as any)[secondary.element];
    if (!primaryOk || !secondaryOk) {
      if (!primaryOk) {
        return { success: false, error: `Not enough ${card.element} essence! Need ${card.cost}, have ${elementEssence}` };
      }
      if (secondary && !secondaryOk) {
        const have = (essence as any)[secondary.element];
        return { success: false, error: `Not enough ${secondary.element} essence! Need ${secondary.amount}, have ${have}` };
      }
    }

    // Remove card from hand
    const newHand = hand.filter((_, idx) => idx !== cardIndex);

    // Add to board if creature
    let newBoard = [...board];
    if (card.cardType === "creature") {
      const creatureCard = card as any;
      const boardCreature: BoardCreature = {
        ...creatureCard,
        instanceId: uuidv4(),
        currentHealth: creatureCard.strength || creatureCard.health, // Use strength, fallback to health for legacy
        hasAction: true, // All creatures enter with an action
        canAttack: false, // Legacy field
        exhausted: false, // Not exhausted initially
      };
      newBoard.push(boardCreature);
    }

    // Handle spell effects
    let newPlayerHealth = state.playerHealth;
    let newAiHealth = state.aiHealth;
    let newPlayerHand2 = newHand;
    let newAiHand2 = newHand;

    if (card.cardType === "spell") {
      const spell = card as any;
      const isPlayerSpell = isPlayer;

      switch (spell.spellType) {
        case "damage":
          // Deal damage to opponent
          if (isPlayerSpell) {
            newAiHealth -= spell.effect;
          } else {
            newPlayerHealth -= spell.effect;
          }
          break;

        case "heal":
          // Heal self
          if (isPlayerSpell) {
            newPlayerHealth = Math.min(newPlayerHealth + spell.effect, 500);
          } else {
            newAiHealth = Math.min(newAiHealth + spell.effect, 500);
          }
          break;

        case "draw":
          // Draw cards
          let deckToDraw = isPlayerSpell ? state.playerDeck : state.aiDeck;
          let handToDraw = isPlayerSpell ? newHand : newHand;
          const cardsToDrawCount = spell.effect || 1;

          for (let i = 0; i < cardsToDrawCount && deckToDraw.length > 0; i++) {
            const [drawn, ...remaining] = deckToDraw;
            handToDraw = [...handToDraw, drawn];
            deckToDraw = remaining;
          }

          if (isPlayerSpell) {
            newPlayerHand2 = handToDraw;
          } else {
            newAiHand2 = handToDraw;
          }
          break;

        case "bounce":
          // Send creature back to hand (not implemented in UI yet)
          break;

        case "destroy":
          // Destroy creature (not implemented in UI yet)
          break;
      }
    }

    // Deduct essence
    // Deduct essence (including secondary cost if present)
    const newEssence: any = {
      ...essence,
      [card.element]: elementEssence - (card.cost || 0),
    };
    if (secondary) {
      newEssence[secondary.element] = (essence as any)[secondary.element] - secondary.amount;
    }

    // Mark that a normal summon was used if creature was summoned
    const updates: Partial<GameState> = {
      playerHealth: newPlayerHealth,
      aiHealth: newAiHealth,
    };
    
    if (isPlayer) {
      updates.playerHand = newPlayerHand2;
      updates.playerEssence = newEssence;
      updates.playerBoard = newBoard;
      
      if (card.cardType === "creature" && zoneType === "creature") {
        updates.hasNormalSummonedThisTurn = true;
      }
    } else {
      updates.aiHand = newAiHand2;
      updates.aiEssence = newEssence;
      updates.aiBoard = newBoard;
      
      if (card.cardType === "creature" && zoneType === "creature") {
        updates.hasNormalSummonedThisTurn = true;
      }
    }
    
    set(updates);

    // Check win conditions after spell effects
    if (newPlayerHealth <= 0) {
      set({ gameStatus: "ai_won" });
    } else if (newAiHealth <= 0) {
      set({ gameStatus: "player_won" });
    }
    
    return { success: true };
  },

  // Summon a dragon by tributing two specific-element creatures when Draconic Adaptability is active
  summonDragonByTribute: (dragonCardIndex: number, tributeInstanceIds: string[]) => {
    const state = get();
    if (state.currentTurn !== "player") return;
    if (state.currentPhase !== "main1" && state.currentPhase !== "main2") return;

    // Must have Draconic Adaptability active
    const adapt = state.playerDraconicAdapt;
    if (!adapt?.active) return;

    // Respect normal summon limit
    if (state.hasNormalSummonedThisTurn) {
      set({});
      return;
    }

    // Validate tributes match required elements one-to-one
    const required = [...adapt.requiredElements];
    const tributes = state.playerBoard.filter((c) => tributeInstanceIds.includes(c.instanceId));
    if (tributes.length !== required.length) return;

    const valid = tributes.every((t) => {
      const idx = required.indexOf(t.element as Element);
      if (idx === -1) return false;
      required.splice(idx, 1);
      return true;
    });
    if (!valid) return;

    // Remove tributes from board and move to discard
    const newPlayerBoard = state.playerBoard.filter((c) => !tributeInstanceIds.includes(c.instanceId));
    const newDiscard = [...state.playerDiscard, ...tributes as unknown as Card[]];

    // Get dragon from hand by index
    if (dragonCardIndex < 0 || dragonCardIndex >= state.playerHand.length) return;
    const dragonCard = state.playerHand[dragonCardIndex];
    if (!dragonCard || dragonCard.cardType !== "creature" || (dragonCard.id !== "veton" && dragonCard.id !== "diamoria")) return;

    // Remove dragon from hand, add to board
    const newHand = state.playerHand.filter((_, idx) => idx !== dragonCardIndex);
    const dragonCreatureCard = dragonCard as any;
    const boardCreature: BoardCreature = {
      ...dragonCreatureCard,
      instanceId: uuidv4(),
      currentHealth: dragonCreatureCard.strength || dragonCreatureCard.health,
      hasAction: true,
      canAttack: false,
      exhausted: false,
    };

    set({
      playerBoard: [...newPlayerBoard, boardCreature],
      playerHand: newHand,
      playerDiscard: newDiscard,
      hasNormalSummonedThisTurn: true,
    });
  },

  attackWithCreature: (
    creatureInstanceId: string,
    targetInstanceId: string | "face",
    isPlayer: boolean
  ) => {
    const state = get();
    const board = isPlayer ? state.playerBoard : state.aiBoard;
    const opponentBoard = isPlayer ? state.aiBoard : state.playerBoard;

    const attacker = board.find((c) => c.instanceId === creatureInstanceId);
    if (!attacker || !attacker.canAttack) return;

    let damage = attacker.attack;
    let newOpponentHealth = isPlayer ? state.aiHealth : state.playerHealth;
    let newOpponentBoard = [...opponentBoard];

    if (targetInstanceId === "face") {
      // Direct damage
      newOpponentHealth -= damage;
    } else {
      // Attack creature
      const defender = newOpponentBoard.find((c) => c.instanceId === targetInstanceId);
      if (!defender) return;

      // Both deal damage
      defender.currentHealth -= damage;
      attacker.currentHealth -= defender.attack;

      // Remove dead creatures
      newOpponentBoard = newOpponentBoard.filter((c) => c.currentHealth > 0);
      const newBoard = board.filter((c) => c.currentHealth > 0 && c.instanceId !== creatureInstanceId);

      if (isPlayer) {
        set({
          playerBoard: newBoard,
          aiBoard: newOpponentBoard,
          aiHealth: newOpponentHealth,
        });
      } else {
        set({
          aiBoard: newBoard,
          playerBoard: newOpponentBoard,
          playerHealth: newOpponentHealth,
        });
      }
      return;
    }

    // Mark creature as attacked
    const newBoard = board.map((c) =>
      c.instanceId === creatureInstanceId ? { ...c, canAttack: false } : c
    );

    if (isPlayer) {
      set({
        playerBoard: newBoard,
        aiHealth: newOpponentHealth,
      });
    } else {
      set({
        aiBoard: newBoard,
        playerHealth: newOpponentHealth,
      });
    }

    // Check win conditions
    if (newOpponentHealth <= 0) {
      set({
        gameStatus: isPlayer ? "player_won" : "ai_won",
      });
    }
  },

  equipRuneToCreature: (runeCard: any, creatureInstanceId: string, isPlayer: boolean, runeZoneIndex?: number) => {
    const state = get();
    const board = isPlayer ? state.playerBoard : state.aiBoard;
    const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;
    
    // Find the creature on either player's or AI's board
    let targetBoard = board;
    let targetIsPlayer = isPlayer;
    let targetCreature = targetBoard.find(c => c.instanceId === creatureInstanceId);
    
    // If not found on player's board, check opponent's board
    if (!targetCreature) {
      targetBoard = isPlayer ? state.aiBoard : state.playerBoard;
      targetIsPlayer = !isPlayer;
      targetCreature = targetBoard.find(c => c.instanceId === creatureInstanceId);
    }
    
    if (!targetCreature) return { success: false, error: "Creature not found" };
    
    // Remove rune from the rune/counter zone (it's being moved to the creature)
    const newRuneCounterZone = [...runeCounterZone];
    if (runeZoneIndex !== undefined) {
      newRuneCounterZone[runeZoneIndex] = null;
    }
    
    // Attach the rune card to the creature (NO ESSENCE COST for equipment runes)
    const newBoard = targetBoard.map(creature => {
      if (creature.instanceId === creatureInstanceId) {
        const updated = {
          ...creature,
          equippedCards: [...(creature.equippedCards || []), runeCard]
        } as BoardCreature;
        // If Binding Coils, exhaust the creature immediately
        if (runeCard.id === "binding_coils") {
          (updated as any).exhausted = true;
          // Optional: also prevent attacking if not already
          updated.canAttack = false;
        }
        return updated;
      }
      return creature;
    });
    
    // Update state based on which board we modified
    const updates: Partial<GameState> = {};
    
    if (isPlayer) {
      updates.playerRuneCounterZone = newRuneCounterZone;
    } else {
      updates.aiRuneCounterZone = newRuneCounterZone;
    }
    
    if (targetIsPlayer) {
      updates.playerBoard = newBoard;
    } else {
      updates.aiBoard = newBoard;
    }
    
    set(updates);
    return { success: true };
  },

  swapEssence: (fromElement: string, toElement: string, amount: number, isPlayer: boolean, runeZoneIndex?: number) => {
    const state = get();
    const essence = isPlayer ? state.playerEssence : state.aiEssence;
    const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;

    // Validate we have enough of the source element
    if (essence[fromElement as keyof typeof essence] < amount) {
      return { success: false, error: `Not enough ${fromElement} essence!` };
    }

    // Perform the swap
    const newEssence = {
      ...essence,
      [fromElement]: essence[fromElement as keyof typeof essence] - amount,
      [toElement]: essence[toElement as keyof typeof essence] + amount,
    };

    // Remove the rune card from the zone (it's consumed)
    const newRuneCounterZone = [...runeCounterZone];
    let usedRune: any = null;
    if (runeZoneIndex !== undefined) {
      usedRune = newRuneCounterZone[runeZoneIndex];
      newRuneCounterZone[runeZoneIndex] = null;
    }

    // Update state and move rune to discard
    if (isPlayer) {
      set({ playerEssence: newEssence, playerRuneCounterZone: newRuneCounterZone, playerDiscard: usedRune ? [...(get().playerDiscard), usedRune as unknown as Card] : get().playerDiscard });
    } else {
      set({ aiEssence: newEssence, aiRuneCounterZone: newRuneCounterZone, aiDiscard: usedRune ? [...(get().aiDiscard), usedRune as unknown as Card] : get().aiDiscard });
    }

    return { success: true };
  },

  generateEssenceFromRune: (element: Element, amount: number, isPlayer: boolean, runeZoneIndex?: number) => {
    const state = get();
    const essence = isPlayer ? state.playerEssence : state.aiEssence;
    const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;

    const newEssence = {
      ...essence,
      [element]: essence[element] + amount,
    } as any;

    // Remove the rune card from the zone (it's consumed)
    const newRuneCounterZone = [...runeCounterZone];
    let usedRune: any = null;
    if (runeZoneIndex !== undefined) {
      usedRune = newRuneCounterZone[runeZoneIndex];
      newRuneCounterZone[runeZoneIndex] = null;
    }

    if (isPlayer) {
      set({ playerEssence: newEssence, playerRuneCounterZone: newRuneCounterZone, playerDiscard: usedRune ? [...state.playerDiscard, usedRune as unknown as Card] : state.playerDiscard });
    } else {
      set({ aiEssence: newEssence, aiRuneCounterZone: newRuneCounterZone, aiDiscard: usedRune ? [...state.aiDiscard, usedRune as unknown as Card] : state.aiDiscard });
    }

    return { success: true } as any;
  },

  discardRuneFromZone: (isPlayer: boolean, runeZoneIndex: number) => {
    const state = get();
    const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;
    const card = runeCounterZone[runeZoneIndex];
    if (!card) return;
    const newZone = [...runeCounterZone];
    newZone[runeZoneIndex] = null;
    if (isPlayer) {
      set({ playerRuneCounterZone: newZone, playerDiscard: [...state.playerDiscard, card as unknown as Card] });
    } else {
      set({ aiRuneCounterZone: newZone, aiDiscard: [...state.aiDiscard, card as unknown as Card] });
    }
  },

  summonDragonByTribute: (dragonCardIndex: number, tributeInstanceIds: string[]) => {
    const state = get();
    const dragonCard = state.playerHand[dragonCardIndex];
    if (!dragonCard || dragonCard.cardType !== "creature") return;
    if (!state.playerDraconicAdapt?.active) return;

    // Validate selected tributes
    const requirements = state.playerDraconicAdapt.requiredElements;
    const selectedCreatures = state.playerBoard.filter(c => tributeInstanceIds.includes(c.instanceId));
    if (selectedCreatures.length !== 2) return;
    const elements = selectedCreatures.map(c => c.element);
    const valid = requirements.every(req => elements.includes(req));
    if (!valid) return;

    // Remove tributes
    const newPlayerBoard = state.playerBoard.filter(c => !tributeInstanceIds.includes(c.instanceId));
    const newDiscard = [...state.playerDiscard, ...selectedCreatures as unknown as Card[]];

    // Remove dragon from hand and place on board
    const newHand = state.playerHand.filter((_, idx) => idx !== dragonCardIndex);
    const boardCreature: BoardCreature = {
      ...(dragonCard as any),
      instanceId: uuidv4(),
      currentHealth: (dragonCard as any).health,
      canAttack: false,
    };

    set({
      playerBoard: [...newPlayerBoard, boardCreature],
      playerHand: newHand,
      playerDiscard: newDiscard,
      hasNormalSummonedThisTurn: true,
    });
  },

  dealDamageToTarget: (targetId: string, targetType: "creature" | "shield", damage: number, isPlayer: boolean, runeZoneIndex?: number) => {
    const state = get();
    const runeCounterZone = isPlayer ? state.playerRuneCounterZone : state.aiRuneCounterZone;

    if (targetType === "creature") {
      // Deal damage to a creature on the opponent's board
      const opponentBoard = isPlayer ? state.aiBoard : state.playerBoard;
      const targetCreature = opponentBoard.find(c => c.instanceId === targetId);

      if (!targetCreature) {
        return { success: false, error: "Creature not found" };
      }

      const newHealth = targetCreature.currentHealth - damage;
      let newOpponentBoard = opponentBoard.map(creature => 
        creature.instanceId === targetId 
          ? { ...creature, currentHealth: newHealth }
          : creature
      );

      // Remove creature if destroyed
      if (newHealth <= 0) {
        newOpponentBoard = newOpponentBoard.filter(c => c.instanceId !== targetId);
      }

      // Remove the rune card from the zone (consumed)
      const newRuneCounterZone = [...runeCounterZone];
      let usedRune: any = null;
      if (runeZoneIndex !== undefined) {
        usedRune = newRuneCounterZone[runeZoneIndex];
        newRuneCounterZone[runeZoneIndex] = null;
      }

      // Update state and discard used rune; if creature destroyed, move to discard
      if (isPlayer) {
        set({ aiBoard: newOpponentBoard, playerRuneCounterZone: newRuneCounterZone, playerDiscard: usedRune ? [...state.playerDiscard, usedRune as unknown as Card] : state.playerDiscard });
      } else {
        set({ playerBoard: newOpponentBoard, aiRuneCounterZone: newRuneCounterZone, aiDiscard: usedRune ? [...state.aiDiscard, usedRune as unknown as Card] : state.aiDiscard });
      }

      return { success: true, destroyed: newHealth <= 0 };

    } else if (targetType === "shield") {
      // Deal damage to a shield on the opponent's board
      const opponentShields = isPlayer ? state.aiShields : state.playerShields;
      const targetShieldIndex = opponentShields.findIndex(s => s.id === targetId);

      if (targetShieldIndex === -1) {
        return { success: false, error: "Shield not found" };
      }

      const targetShield = opponentShields[targetShieldIndex];
      const newHealth = targetShield.currentHealth - damage;

      let newOpponentShields = [...opponentShields];

      if (newHealth <= 0) {
        // Shield destroyed
        newOpponentShields = newOpponentShields.filter(s => s.id !== targetId);
      } else {
        // Update shield health and reveal it
        newOpponentShields[targetShieldIndex] = {
          ...targetShield,
          currentHealth: newHealth,
          faceDown: false // Reveal the shield once damaged
        };
      }

      // Remove the rune card from the zone (consumed)
      const newRuneCounterZone = [...runeCounterZone];
      let usedRune: any = null;
      if (runeZoneIndex !== undefined) {
        usedRune = newRuneCounterZone[runeZoneIndex];
        newRuneCounterZone[runeZoneIndex] = null;
      }

      // Update state and discard rune
      if (isPlayer) {
        set({ aiShields: newOpponentShields, playerRuneCounterZone: newRuneCounterZone, playerDiscard: usedRune ? [...state.playerDiscard, usedRune as unknown as Card] : state.playerDiscard });
      } else {
        set({ playerShields: newOpponentShields, aiRuneCounterZone: newRuneCounterZone, aiDiscard: usedRune ? [...state.aiDiscard, usedRune as unknown as Card] : state.aiDiscard });
      }

      return { success: true, destroyed: newHealth <= 0 };
    }

    return { success: false, error: "Invalid target type" };
  },

  initiateAttack: (attackerId: string, targetId: string, targetType: "creature" | "shield" | "face", isPlayer: boolean) => {
    const state = get();
    const board = isPlayer ? state.playerBoard : state.aiBoard;
    const opponentBoard = isPlayer ? state.aiBoard : state.playerBoard;
    const opponentShields = isPlayer ? state.aiShields : state.playerShields;
    
    // Find attacker
    const attacker = board.find(c => c.instanceId === attackerId);
    if (!attacker) {
      return { success: false, error: "Attacker not found" };
    }
    
    // Validate attacker has action
    if (!attacker.hasAction || attacker.exhausted) {
      return { success: false, error: "Creature does not have an action" };
    }
    
    // Handle face attack (only if no shields)
    if (targetType === "face") {
      if (opponentShields.length > 0) {
        return { success: false, error: "Cannot attack face while shields remain" };
      }
      // Direct face attack - deal strength damage
      const damage = attacker.strength || attacker.attack;
      const newOpponentHealth = isPlayer ? state.aiHealth - damage : state.playerHealth - damage;
      
      // Exhaust attacker
      const newBoard = board.map(c => 
        c.instanceId === attackerId 
          ? { ...c, hasAction: false, exhausted: true }
          : c
      );
      
      if (isPlayer) {
        set({ playerBoard: newBoard, aiHealth: newOpponentHealth });
      } else {
        set({ aiBoard: newBoard, playerHealth: newOpponentHealth });
      }
      
      // Check win condition
      if (newOpponentHealth <= 0) {
        set({ gameStatus: isPlayer ? "player_won" : "ai_won" });
      }
      
      return { success: true, damage };
    }
    
    // Handle shield attack
    if (targetType === "shield") {
      const targetShield = opponentShields.find(s => s.id === targetId);
      if (!targetShield) {
        return { success: false, error: "Shield not found" };
      }
      
      const damage = attacker.strength || attacker.attack;
      const newHealth = targetShield.currentHealth - damage;
      
      // Exhaust attacker
      const newBoard = board.map(c => 
        c.instanceId === attackerId 
          ? { ...c, hasAction: false, exhausted: true }
          : c
      );
      
      let newOpponentShields = [...opponentShields];
      if (newHealth <= 0) {
        // Shield destroyed
        newOpponentShields = newOpponentShields.filter(s => s.id !== targetId);
      } else {
        // Update shield health and reveal
        const shieldIndex = newOpponentShields.findIndex(s => s.id === targetId);
        let updatedShield = {
          ...targetShield,
          currentHealth: newHealth,
          faceDown: false,
        };
        
        // Check if shield should drop to next tier (if damage >= 150)
        if (damage >= 150) {
          if (targetShield.currentTier === 3) {
            // Drop from tier 3 to tier 2
            updatedShield.currentTier = 2;
            updatedShield.currentHealth = Math.min(newHealth, targetShield.maxHealthByTier[2]);
          } else if (targetShield.currentTier === 2) {
            // Drop from tier 2 to tier 1
            updatedShield.currentTier = 1;
            updatedShield.currentHealth = Math.min(newHealth, targetShield.maxHealthByTier[1]);
          }
          // Tier 1 can't drop further
        }
        
        newOpponentShields[shieldIndex] = updatedShield;
      }
      
      if (isPlayer) {
        set({ playerBoard: newBoard, aiShields: newOpponentShields });
      } else {
        set({ aiBoard: newBoard, playerShields: newOpponentShields });
      }
      
      return { success: true, damage, destroyed: newHealth <= 0 };
    }
    
    // Handle creature attack - requires defense response
    if (targetType === "creature") {
      const defender = opponentBoard.find(c => c.instanceId === targetId);
      if (!defender) {
        return { success: false, error: "Target creature not found" };
      }
      
      // Check if defender is exhausted (no blocker needed, just attack)
      if (defender.exhausted || !defender.hasAction) {
        const damage = attacker.strength || attacker.attack;
        const newHealth = defender.currentHealth - damage;
        
        // Exhaust attacker
        const newAttackerBoard = board.map(c => 
          c.instanceId === attackerId 
            ? { ...c, hasAction: false, exhausted: true }
            : c
        );
        
        let newDefenderBoard = [...opponentBoard];
        if (newHealth <= 0) {
          // Defender destroyed: if player attacked, defender (AI) goes to aiDiscard; if AI attacked, defender (player) goes to playerDiscard
          newDefenderBoard = newDefenderBoard.filter(c => c.instanceId !== targetId);
          if (isPlayer) {
            set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard, aiDiscard: [...state.aiDiscard, defender as unknown as Card] });
          } else {
            set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard, playerDiscard: [...state.playerDiscard, defender as unknown as Card] });
          }
        } else {
          // Update defender health
          newDefenderBoard = newDefenderBoard.map(c =>
            c.instanceId === targetId ? { ...c, currentHealth: newHealth } : c
          );
          if (isPlayer) {
            set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard });
          } else {
            set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard });
          }
        }
        
        return { success: true, damage, exhaustedTarget: true };
      }
      
      // Defender has action - requires response
      const attackerAgility = attacker.agility || 0;
      const defenderAgility = defender.agility || 0;
      
      // Find potential blockers (creatures with action and higher agility than attacker)
      const potentialBlockers = opponentBoard.filter(c => 
        c.instanceId !== targetId && 
        c.hasAction && 
        !c.exhausted &&
        (c.agility || 0) > attackerAgility
      );
      
      return {
        success: true,
        requiresResponse: true,
        attackerId,
        defenderId: targetId,
        canDodge: defenderAgility > attackerAgility,
        potentialBlockers: potentialBlockers.map(c => ({
          instanceId: c.instanceId,
          name: c.name,
          agility: c.agility || 0,
        })),
      };
    }
    
    return { success: false, error: "Invalid target type" };
  },

  handleDefenseResponse: (defenderId: string, responseType: "defend" | "dodge" | "block" | "none", attackerId: string, blockerId?: string, isPlayer: boolean) => {
    const state = get();
    // isPlayer means attacker is player's creature
    const attackerBoard = isPlayer ? state.playerBoard : state.aiBoard;
    const defenderBoard = isPlayer ? state.aiBoard : state.playerBoard;
    
    const attacker = attackerBoard.find(c => c.instanceId === attackerId);
    const defender = defenderBoard.find(c => c.instanceId === defenderId);
    
    if (!attacker || !defender) {
      return { success: false, error: "Creature not found" };
    }
    
    // Handle dodge
    if (responseType === "dodge") {
      const attackerAgility = attacker.agility || 0;
      const defenderAgility = defender.agility || 0;
      
      if (defenderAgility <= attackerAgility) {
        return { success: false, error: "Cannot dodge - attacker has equal or higher agility" };
      }
      
      // Both become exhausted, no damage
      const newAttackerBoard = attackerBoard.map(c =>
        c.instanceId === attackerId ? { ...c, hasAction: false, exhausted: true } : c
      );
      const newDefenderBoard = defenderBoard.map(c =>
        c.instanceId === defenderId ? { ...c, hasAction: false, exhausted: true } : c
      );
      
      if (isPlayer) {
        set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard });
      } else {
        set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard });
      }
      
      return { success: true, dodged: true };
    }
    
    // Handle block
    if (responseType === "block") {
      if (!blockerId) {
        return { success: false, error: "Blocker ID required" };
      }
      
      const blocker = defenderBoard.find(c => c.instanceId === blockerId);
      if (!blocker) {
        return { success: false, error: "Blocker not found" };
      }
      
      const attackerAgility = attacker.agility || 0;
      const blockerAgility = blocker.agility || 0;
      
      if (!blocker.hasAction || blocker.exhausted) {
        return { success: false, error: "Blocker does not have an action" };
      }
      
      if (blockerAgility <= attackerAgility) {
        return { success: false, error: "Blocker agility must be higher than attacker" };
      }
      
      // Blocker steps in - attacker deals strength damage to blocker
      const damage = attacker.strength || attacker.attack;
      const newBlockerHealth = blocker.currentHealth - damage;
      
      // Exhaust both attacker and blocker
      const newAttackerBoard = attackerBoard.map(c =>
        c.instanceId === attackerId ? { ...c, hasAction: false, exhausted: true } : c
      );
      
      let newDefenderBoard = [...defenderBoard];
      if (newBlockerHealth <= 0) {
        // Blocker destroyed: blocker is on defender's side, so if player attacked, blocker (player) goes to playerDiscard; if AI attacked, blocker (AI) goes to aiDiscard
        newDefenderBoard = newDefenderBoard.filter(c => c.instanceId !== blockerId);
        if (isPlayer) {
          set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard, playerDiscard: [...state.playerDiscard, blocker as unknown as Card] });
        } else {
          set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard, aiDiscard: [...state.aiDiscard, blocker as unknown as Card] });
        }
      } else {
        // Update blocker health and exhaust
        newDefenderBoard = newDefenderBoard.map(c =>
          c.instanceId === blockerId 
            ? { ...c, currentHealth: newBlockerHealth, hasAction: false, exhausted: true }
            : c
        );
        if (isPlayer) {
          set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard });
        } else {
          set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard });
        }
      }
      
      return { success: true, blocked: true, damage, blockerDestroyed: newBlockerHealth <= 0 };
    }
    
    // Handle defend (or none defaults to defend if can't dodge)
    if (responseType === "defend" || responseType === "none") {
      return get().resolveCombat(attackerId, defenderId, isPlayer);
    }
    
    return { success: false, error: "Invalid response type" };
  },

  resolveCombat: (attackerId: string, defenderId: string, isPlayer: boolean) => {
    const state = get();
    // isPlayer means attacker is player's creature
    const attackerBoard = isPlayer ? state.playerBoard : state.aiBoard;
    const defenderBoard = isPlayer ? state.aiBoard : state.playerBoard;
    
    const attacker = attackerBoard.find(c => c.instanceId === attackerId);
    const defender = defenderBoard.find(c => c.instanceId === defenderId);
    
    if (!attacker || !defender) {
      return { success: false, error: "Creature not found" };
    }
    
    const attackerAgility = attacker.agility || 0;
    const defenderAgility = defender.agility || 0;
    const attackerStrength = attacker.strength || attacker.attack;
    const defenderStrength = defender.strength || defender.attack;
    
    // Higher agility attacks first
    let attackerDamage = attackerStrength;
    let defenderDamage = defenderStrength;
    
    // Apply damage based on turn order
    let newAttackerHealth = attacker.currentHealth;
    let newDefenderHealth = defender.currentHealth;
    
    if (attackerAgility > defenderAgility) {
      // Attacker goes first
      newDefenderHealth -= attackerDamage;
      // Defender still hits back if survives
      if (newDefenderHealth > 0) {
        newAttackerHealth -= defenderDamage;
      }
    } else {
      // Defender goes first (equal or higher agility)
      newAttackerHealth -= defenderDamage;
      // Attacker still hits back if survives
      if (newAttackerHealth > 0) {
        newDefenderHealth -= attackerDamage;
      }
    }
    
    // Determine if creatures are destroyed BEFORE updating health
    const attackerDestroyed = newAttackerHealth <= 0;
    const defenderDestroyed = newDefenderHealth <= 0;
    
    // Update boards - only update health if not destroyed, otherwise remove
    let newAttackerBoard = attackerBoard
      .filter(c => {
        if (c.instanceId === attackerId) {
          // Remove if destroyed, otherwise keep and update
          return !attackerDestroyed;
        }
        return true;
      })
      .map(c =>
        c.instanceId === attackerId && !attackerDestroyed
          ? { ...c, currentHealth: newAttackerHealth, hasAction: false, exhausted: true }
          : c
      );
    
    let newDefenderBoard = defenderBoard
      .filter(c => {
        if (c.instanceId === defenderId) {
          // Remove if destroyed, otherwise keep and update
          return !defenderDestroyed;
        }
        return true;
      })
      .map(c =>
        c.instanceId === defenderId && !defenderDestroyed
          ? { ...c, currentHealth: newDefenderHealth, hasAction: false, exhausted: true }
          : c
      );
    
    // Update boards and discard piles in a single operation to prevent state inconsistencies
    const updates: any = {};
    
    if (isPlayer) {
      // Player attacked: attackerBoard is playerBoard, defenderBoard is aiBoard
      updates.playerBoard = newAttackerBoard;
      updates.aiBoard = newDefenderBoard;
      
      if (attackerDestroyed) {
        // Attacker is player's creature - goes to playerDiscard
        const attackerCard = attackerBoard.find(c => c.instanceId === attackerId);
        if (attackerCard) {
          updates.playerDiscard = [...state.playerDiscard, attackerCard as unknown as Card];
        }
      }
      if (defenderDestroyed) {
        // Defender is AI's creature - goes to aiDiscard
        const defenderCard = defenderBoard.find(c => c.instanceId === defenderId);
        if (defenderCard) {
          updates.aiDiscard = [...state.aiDiscard, defenderCard as unknown as Card];
        }
      }
    } else {
      // AI attacked: attackerBoard is aiBoard, defenderBoard is playerBoard
      updates.aiBoard = newAttackerBoard;
      updates.playerBoard = newDefenderBoard;
      
      if (attackerDestroyed) {
        // Attacker is AI's creature - goes to aiDiscard
        const attackerCard = attackerBoard.find(c => c.instanceId === attackerId);
        if (attackerCard) {
          updates.aiDiscard = [...state.aiDiscard, attackerCard as unknown as Card];
        }
      }
      if (defenderDestroyed) {
        // Defender is player's creature - goes to playerDiscard
        const defenderCard = defenderBoard.find(c => c.instanceId === defenderId);
        if (defenderCard) {
          updates.playerDiscard = [...state.playerDiscard, defenderCard as unknown as Card];
        }
      }
    }
    
    set(updates);
    
    
    return {
      success: true,
      attackerDamage,
      defenderDamage,
      attackerDestroyed,
      defenderDestroyed,
      attackerHealth: newAttackerHealth,
      defenderHealth: newDefenderHealth,
    };
  },

  refreshCreatureActions: (isPlayer: boolean) => {
    const state = get();
    const board = isPlayer ? state.playerBoard : state.aiBoard;
    
    const refreshedBoard = board.map(creature => {
      // Check if creature has Binding Coils equipped (prevents refresh)
      const hasBindingCoils = creature.equippedCards?.some(
        (card: any) => card.id === "binding_coils"
      );
      
      if (hasBindingCoils) {
        // Keep exhausted state if Binding Coils is equipped
        return creature;
      }
      
      // Refresh action (unless Binding Coils prevents it)
      return {
        ...creature,
        hasAction: true,
        exhausted: false,
      };
    });
    
    if (isPlayer) {
      set({ playerBoard: refreshedBoard });
    } else {
      set({ aiBoard: refreshedBoard });
    }
  },

  setAIPhaseMessage: (message: string | null) => {
    set({ aiPhaseMessage: message || undefined });
  },

  nextPhase: () => {
    const state = get();
    
    // Turn 1 Rule: Skip Battle Phase for the first player
    if (state.turnNumber === 1 && state.currentPhase === "main1") {
      set({ currentPhase: "main2" });
      return;
    }
    
    const phaseOrder: Array<typeof state.currentPhase> = ["draw", "generate", "main1", "battle", "main2", "end"];
    const currentIndex = phaseOrder.indexOf(state.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentIndex + 1];
      
      // Refresh creature actions at start of Main Phase 1
      if (nextPhase === "main1") {
        const currentTurn = state.currentTurn;
        get().refreshCreatureActions(currentTurn === "player");
      }
      
      // Auto-generate essence in generate phase based on creatures
      if (state.currentPhase === "draw" && nextPhase === "generate") {
        const board = state.currentTurn === "player" ? state.playerBoard : state.aiBoard;
        const essence = state.currentTurn === "player" ? state.playerEssence : state.aiEssence;
        
        // Count essence generation from creatures
        const generation = { fire: 0, water: 0, earth: 0, air: 0 };
        board.forEach(creature => {
          if (creature.element in generation) {
            // Get base generation amount (default to 1 if not specified)
            const baseGeneration = creature.essenceGeneration || 1;
            
            // Check if creature has Essence Amplifier equipped
            const hasEssenceAmplifier = creature.equippedCards?.some(
              (card: any) => card.id === "essence_amplifier"
            );
            
            // Double the generation if Essence Amplifier is equipped
            const multiplier = hasEssenceAmplifier ? 2 : 1;
            generation[creature.element as keyof typeof generation] += baseGeneration * multiplier;
          }
        });
        
        const newEssence = {
          fire: essence.fire + generation.fire,
          water: essence.water + generation.water,
          earth: essence.earth + generation.earth,
          air: essence.air + generation.air,
        };
        
        if (state.currentTurn === "player") {
          set({ currentPhase: nextPhase, playerEssence: newEssence });
        } else {
          set({ currentPhase: nextPhase, aiEssence: newEssence });
        }
        
        // Return generation info for UI display
        return { generated: generation };
      } else {
        set({ currentPhase: nextPhase });
      }
    } else {
      // End phase -> switch turns
      get().endTurn();
    }
  },

  endTurn: () => {
    const state = get();
    const nextTurn = state.currentTurn === "player" ? "ai" : "player";
    const newTurnNumber = nextTurn === "player" ? state.turnNumber + 1 : state.turnNumber;

    // Remove summoning sickness for next turn
    const newPlayerBoard = state.playerBoard.map((c) =>
      nextTurn === "player" ? { ...c, canAttack: true } : c
    );
    const newAiBoard = state.aiBoard.map((c) =>
      nextTurn === "ai" ? { ...c, canAttack: true } : c
    );

    // Restore shields to max health for their current tier during end phase
    const restoreShields = (shields: BoardShield[]): BoardShield[] => {
      return shields.map(shield => {
        const maxHealthForCurrentTier = shield.maxHealthByTier[shield.currentTier];
        
        // Restore to max health for current tier (don't change tier, just restore health)
        if (shield.currentHealth < maxHealthForCurrentTier) {
          return { ...shield, currentHealth: maxHealthForCurrentTier };
        }
        
        return shield;
      });
    };
    
    // Restore creature health to full strength during end phase
    const restoreCreatureHealth = (board: BoardCreature[]): BoardCreature[] => {
      return board.map(creature => {
        const maxHealth = creature.strength || creature.health;
        if (creature.currentHealth < maxHealth) {
          return { ...creature, currentHealth: maxHealth };
        }
        return creature;
      });
    };

    const restoredPlayerShields = nextTurn === "player" ? restoreShields(state.playerShields) : state.playerShields;
    const restoredAiShields = nextTurn === "ai" ? restoreShields(state.aiShields) : state.aiShields;
    
    // Restore creature health at end phase
    const restoredPlayerBoard = restoreCreatureHealth(state.playerBoard);
    const restoredAiBoard = restoreCreatureHealth(state.aiBoard);

    set({
      currentTurn: nextTurn,
      currentPhase: "draw",
      turnNumber: newTurnNumber,
      playerBoard: restoredPlayerBoard,
      aiBoard: restoredAiBoard,
      playerShields: restoredPlayerShields,
      aiShields: restoredAiShields,
      hasNormalSummonedThisTurn: false, // Reset normal summon for new turn
      hasDrawnThisTurn: false,
      // Reset turn-long rune effects
      playerDraconicAdapt: { active: false, requiredElements: [], dragonId: "" },
      aiDraconicAdapt: { active: false, requiredElements: [], dragonId: "" },
    });
  },

  drawCard: (isPlayer: boolean) => {
    const state = get();
    const isPlayersTurn = state.currentTurn === (isPlayer ? "player" : "ai");
    if (!isPlayersTurn || state.currentPhase !== "draw") {
      return { success: false, error: "Not in draw phase" };
    }
    if (state.hasDrawnThisTurn) {
      return { success: false, error: "You already drew a card this turn" };
    }

    const deck = isPlayer ? state.playerDeck : state.aiDeck;
    const hand = isPlayer ? state.playerHand : state.aiHand;
    if (deck.length === 0) {
      return { success: false, error: "No cards left to draw" };
    }

    const [drawn, ...remaining] = deck;
    const newHand = [...hand, drawn];

    if (isPlayer) {
      set({
        playerDeck: remaining,
        playerHand: newHand,
        hasDrawnThisTurn: true,
      });
    } else {
      set({
        aiDeck: remaining,
        aiHand: newHand,
        hasDrawnThisTurn: true,
      });
    }

    return { success: true };
  },

  aiTurn: async () => {
    const state = get();
    if (state.currentTurn !== "ai" || state.gameStatus !== "playing") return;
    
    // Helper delay function
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Get actions for AI logic
    const actions = {
      playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => {
        return get().playCard(cardIndex, isPlayer, zoneType, zoneIndex);
      },
      equipRuneToCreature: (runeCard: any, creatureInstanceId: string, isPlayer: boolean, runeZoneIndex?: number) => {
        return get().equipRuneToCreature(runeCard, creatureInstanceId, isPlayer, runeZoneIndex);
      },
      generateEssenceFromRune: (element: Element, amount: number, isPlayer: boolean, runeZoneIndex?: number) => {
        return get().generateEssenceFromRune(element, amount, isPlayer, runeZoneIndex);
      },
      swapEssence: (fromElement: string, toElement: string, amount: number, isPlayer: boolean, runeZoneIndex?: number) => {
        return get().swapEssence(fromElement, toElement, amount, isPlayer, runeZoneIndex);
      },
      dealDamageToTarget: (targetId: string, targetType: "creature" | "shield", damage: number, isPlayer: boolean, runeZoneIndex?: number) => {
        return get().dealDamageToTarget(targetId, targetType, damage, isPlayer, runeZoneIndex);
      },
      discardRuneFromZone: (isPlayer: boolean, runeZoneIndex: number) => {
        return get().discardRuneFromZone(isPlayer, runeZoneIndex);
      },
      summonDragonByTribute: (dragonCardIndex: number, tributeInstanceIds: string[]) => {
        return get().summonDragonByTribute(dragonCardIndex, tributeInstanceIds);
      },
    };
    
    try {
      // Handle each phase
      switch (state.currentPhase) {
        case "draw":
          // Turn 1 rule: First player skips draw phase (if AI went first, they start in main1, not draw)
          // If we're in draw phase, AI didn't go first, so draw
          aiLogic.aiDrawPhase(get, (isPlayer: boolean) => get().drawCard(isPlayer));
          await delay(800);
          get().nextPhase();
          break;
          
        case "generate":
          // Generation happens automatically in nextPhase()
          await delay(500);
          get().nextPhase();
          break;
          
        case "main1":
          await aiLogic.aiMainPhase1(get, actions, delay);
          await delay(500);
          get().nextPhase();
          break;
          
        case "battle":
          // Turn 1 rule: First player skips battle phase
          if (state.turnNumber === 1) {
            await delay(500);
            get().nextPhase();
          } else {
            await aiLogic.aiBattlePhase(
              get,
              {
                initiateAttack: get().initiateAttack,
                handleDefenseResponse: get().handleDefenseResponse,
                setAIPhaseMessage: get().setAIPhaseMessage,
              },
              delay
            );
            await delay(500);
            get().nextPhase();
          }
          break;
          
        case "main2":
          await aiLogic.aiMainPhase2(get, actions, delay);
          await delay(500);
          get().nextPhase();
          break;
          
        case "end":
          aiLogic.aiEndPhase();
          await delay(500);
          get().endTurn();
          break;
      }
    } catch (error) {
      console.error("AI turn error:", error);
      // On error, just advance phase to prevent game lock
      get().nextPhase();
    }
  },

  concede: () => {
    const state = get();
    set({
      gameStatus: state.currentTurn === "player" ? "ai_won" : "player_won",
    });
  },

  resetGame: () => {
    set(initialGameState);
  },
}));
