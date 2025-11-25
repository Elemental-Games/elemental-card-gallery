import { create } from "zustand";
import { GameState, Card, BoardCreature, BoardShield, Element, PendingAbilityPrompt, AbilityContext, CreatureCard, AbilityOption } from "../types/tcg";
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
  handleDefenseResponse: (defenderId: string, responseType: "defend" | "dodge" | "block" | "none", attackerId: string, isPlayer: boolean, blockerId?: string) => any;
  resolveCombat: (attackerId: string, defenderId: string, isPlayer: boolean) => any;
  refreshCreatureActions: (isPlayer: boolean) => void;
  setAIPhaseMessage: (message: string | null) => void;
  drawCard: (isPlayer: boolean) => { success: boolean; error?: string } | void;
  activateCreatureAbility: (creatureInstanceId: string, abilityId: string, options?: any) => { success: boolean; error?: string };
  activateHandAbility: (cardIndex: number, abilityId: string, options?: any) => { success: boolean; error?: string };
  resolveAbilityPrompt: (selection: { optionId?: string; optionIds?: string[]; skip?: boolean }) => { success: boolean; error?: string };
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
  pendingAbilityPrompt: undefined,
  activeAbilityContext: undefined,
  battleLog: [],
};

export const useGameStore = create<GameStore>((set, get) => {
  const setPendingAbilityPrompt = (prompt?: PendingAbilityPrompt, context?: AbilityContext) => {
    set({ pendingAbilityPrompt: prompt, activeAbilityContext: context });
  };

  const abilityIdsForCreature = (creature?: BoardCreature) =>
    creature?.abilities?.map((ability) => ability.id) ?? [];

  const hasAbility = (creature: BoardCreature | undefined, abilityId: string): boolean => {
    if (!creature) return false;
    return abilityIdsForCreature(creature).includes(abilityId);
  };

  const getBaseStrength = (creature?: BoardCreature) => {
    if (!creature) return 0;
    const base = creature.strength ?? creature.attack ?? 0;
    return base + (creature.temporaryStrengthBonus ?? 0);
  };

  const getShieldAttackModifiers = (creature?: BoardCreature) => {
    const modifiers = { strengthBonus: 0, doubleStrike: false, pierce: false };
    if (!creature) return modifiers;
    const abilities = abilityIdsForCreature(creature);
    if (abilities.includes("battering_charge")) {
      modifiers.strengthBonus += 50;
    }
    if (abilities.includes("inferno_fury")) {
      modifiers.strengthBonus += 50;
      modifiers.pierce = true;
    }
    if (abilities.includes("meks_fury")) {
      modifiers.doubleStrike = true;
    }
    return modifiers;
  };

  const getBlockerStrengthBonus = (blocker?: BoardCreature, isShieldAttack?: boolean) => {
    if (!blocker || isShieldAttack) return 0;
    return hasAbility(blocker, "protective_blast") ? 75 : 0;
  };

  const applyPierceOverflow = (
    attackerController: "player" | "ai",
    defenderController: "player" | "ai",
    overflow: number,
    options: {
      preferredShieldId?: string;
      sourceInstanceId?: string;
      attackerHasEssenceWell?: boolean;
      abilityName?: string;
    } = {}
  ) => {
    if (overflow <= 0) return;
    const state = get();
    const shieldsKey = getShieldsKey(defenderController);
    let shields = state[shieldsKey];
    if (options.preferredShieldId && !shields.some((shield) => shield.id === options.preferredShieldId)) {
      options.preferredShieldId = undefined;
    }

    if (shields.length === 0) {
      const healthKey = defenderController === "player" ? "playerHealth" : "aiHealth";
      const currentHealth = state[healthKey];
      const newHealth = Math.max(0, currentHealth - overflow);
      set({ [healthKey]: newHealth } as Partial<GameState>);
      if (newHealth <= 0) {
        set({ gameStatus: defenderController === "player" ? "ai_won" : "player_won" });
      }
      return;
    }

    if (attackerController === "player" && shields.length > 1 && options.sourceInstanceId) {
      const abilityId = "pierce_overflow";
      const abilityName = options.abilityName ?? "Pierce Overflow";
      const promptOptions: AbilityOption[] = shields.map((shield) => ({
        id: shield.id,
        label: `${shield.name} (HP ${shield.currentHealth})`,
        type: "shield",
        metadata: { shieldId: shield.id },
      }));
      enqueueAbilityPrompt(
        attackerController,
        options.sourceInstanceId,
        `${abilityName}: Choose a shield to take overflow damage (${overflow}).`,
        promptOptions,
        "single",
        false,
        {
          abilityId,
          overflowDamage: overflow,
          defenderController,
          attackerHasEssenceWell: options.attackerHasEssenceWell,
        }
      );
      return;
    }

    const targetShieldId = options.preferredShieldId ?? shields[0].id;
    const attackerCreature = options.sourceInstanceId
      ? get()[getBoardKey(attackerController)].find((c) => c.instanceId === options.sourceInstanceId)
      : undefined;
    const shieldKey = getShieldsKey(defenderController);
    const shieldBefore = get()[shieldKey].find((shield) => shield.id === targetShieldId);
    const result = damageShield(defenderController, targetShieldId, overflow);
    if (options.attackerHasEssenceWell && (result.damageDealt ?? 0) > 0) {
      grantEssence(attackerController, "water", 1);
    }
    if (attackerCreature && shieldBefore) {
      const damageValue = result.damageDealt ?? overflow;
      addLogEntry(
        attackerController,
        `${attackerCreature.name} pierces ${defenderController === "player" ? "your" : "AI\'s"} ${shieldBefore.name} for ${damageValue} overflow damage`,
        "attack"
      );
    }
  };

  const applyPassiveFlags = (creature: BoardCreature): BoardCreature => {
    const passiveIds = abilityIdsForCreature(creature);
    let updated = { ...creature };

    if (passiveIds.includes("wind_rush") || passiveIds.includes("phantom_steps")) {
      updated.cannotBeBlocked = true;
    }

    return updated;
  };

  const getBoardKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerBoard" : "aiBoard";

  const getEssenceKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerEssence" : "aiEssence";

  const getDiscardKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerDiscard" : "aiDiscard";

  const getHandKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerHand" : "aiHand";

  const getShieldsKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerShields" : "aiShields";

  const getDeckKey = (controller: "player" | "ai") =>
    controller === "player" ? "playerDeck" : "aiDeck";

  const revealRuneTemporarily = (controller: "player" | "ai", runeIndex: number) => {
    const state = get();
    const runeZoneKey = controller === "player" ? "playerRuneCounterZone" : "aiRuneCounterZone";
    const runeZone = [...state[runeZoneKey]];
    const runeCard = runeZone[runeIndex];
    if (!runeCard) {
      return { success: false, error: "Rune not found" };
    }

    const originalCard = runeCard as unknown as Card;

    if (!(runeCard as any).faceDown) {
      return { success: true };
    }

    runeZone[runeIndex] = { ...runeCard, faceDown: false } as any;
    set({ [runeZoneKey]: runeZone } as Partial<GameState>);

    setTimeout(() => {
      const currentState = get();
      const currentZone = [...currentState[runeZoneKey]];
      const currentCard = currentZone[runeIndex] as unknown as Card | undefined;
      if (currentCard && currentCard.id === originalCard.id) {
        currentZone[runeIndex] = { ...(currentZone[runeIndex] as any), faceDown: true };
        set({ [runeZoneKey]: currentZone } as Partial<GameState>);
      }
    }, 1500);

    return { success: true };
  };

  const moveCardFromDeckToHand = (controller: "player" | "ai", deckIndex: number) => {
    const state = get();
    const deckKey = getDeckKey(controller);
    const handKey = getHandKey(controller);
    const deck = [...state[deckKey]];

    if (deckIndex < 0 || deckIndex >= deck.length) {
      return { success: false, error: "Invalid deck selection" };
    }

    const [card] = deck.splice(deckIndex, 1);
    const updatedHand = [...state[handKey], card];

    set({ [deckKey]: deck, [handKey]: updatedHand } as Partial<GameState>);
    return { success: true, card };
  };

  const drawCardToHand = (controller: "player" | "ai") => {
    const state = get();
    const deckKey = getDeckKey(controller);
    const handKey = getHandKey(controller);
    const deck = state[deckKey];
    if (deck.length === 0) {
      return { success: false, error: "Deck is empty" };
    }
    const [top, ...remaining] = deck;
    const updatedHand = [...state[handKey], top];
    set({ [deckKey]: remaining, [handKey]: updatedHand } as Partial<GameState>);
    return { success: true, card: top };
  };

  const removeCardFromDiscard = (
    controller: "player" | "ai",
    discardIndex: number
  ) => {
    const state = get();
    const discardKey = getDiscardKey(controller);
    const discard = [...state[discardKey]];
    if (discardIndex < 0 || discardIndex >= discard.length) {
      return { success: false, error: "Invalid discard selection" };
    }
    const [card] = discard.splice(discardIndex, 1);
    set({ [discardKey]: discard } as Partial<GameState>);
    return { success: true, card };
  };

  const moveCardFromHandToDiscard = (controller: "player" | "ai", handIndex: number) => {
    const state = get();
    const handKey = getHandKey(controller);
    const discardKey = getDiscardKey(controller);
    const hand = [...state[handKey]];
    if (handIndex < 0 || handIndex >= hand.length) {
      return { success: false, error: "Invalid hand selection" };
    }
    const [card] = hand.splice(handIndex, 1);
    const updatedDiscard = [...state[discardKey], card];
    set({ [handKey]: hand, [discardKey]: updatedDiscard } as Partial<GameState>);
    return { success: true, card };
  };

  const addCardToHand = (controller: "player" | "ai", card: Card) => {
    const state = get();
    const handKey = getHandKey(controller);
    const updatedHand = [...state[handKey], card];
    set({ [handKey]: updatedHand } as Partial<GameState>);
  };

  const destroyCreature = (controller: "player" | "ai", instanceId: string) => {
    const state = get();
    const boardKey = getBoardKey(controller);
    const discardKey = getDiscardKey(controller);
    const board = state[boardKey];
    const index = board.findIndex((c) => c.instanceId === instanceId);
    if (index === -1) {
      return { success: false, error: "Creature not found" };
    }
    const creature = board[index];
    const updatedBoard = [...board.slice(0, index), ...board.slice(index + 1)];
    
    // Discard any equipped cards to the discard pile of the player who played them
    const equippedCards = creature.equippedCards || [];
    const updates: Partial<GameState> = {
      [boardKey]: updatedBoard,
    };
    
    // Group equipped cards by owner to batch discard updates
    const equippedByOwner: { [key: string]: Card[] } = {};
    equippedCards.forEach((equippedCard: any) => {
      const owner = equippedCard.equippedBy || controller; // Fallback to creature controller if metadata missing
      if (!equippedByOwner[owner]) {
        equippedByOwner[owner] = [];
      }
      equippedByOwner[owner].push(equippedCard);
    });
    
    // Add equipped cards to appropriate discard piles
    Object.entries(equippedByOwner).forEach(([owner, cards]) => {
      const ownerDiscardKey = getDiscardKey(owner as "player" | "ai");
      updates[ownerDiscardKey] = [...state[ownerDiscardKey], ...cards];
    });
    
    // Add creature to its controller's discard pile
    updates[discardKey] = [...state[discardKey], boardCreatureToCard(creature) as Card];
    
    set(updates);
    triggerOnDestroyAbilities(controller, creature);
    return { success: true, creature };
  };

  const damageCreature = (
    controller: "player" | "ai",
    instanceId: string,
    damage: number
  ) => {
    if (damage <= 0) {
      return { success: true, destroyed: false, damageDealt: 0 };
    }
    const state = get();
    const boardKey = getBoardKey(controller);
    const discardKey = getDiscardKey(controller);
    const board = state[boardKey];
    const index = board.findIndex((c) => c.instanceId === instanceId);
    if (index === -1) {
      return { success: false, error: "Creature not found" };
    }
    const creature = board[index];
    const newHealth = creature.currentHealth - damage;

    if (newHealth <= 0) {
      const updatedBoard = [...board.slice(0, index), ...board.slice(index + 1)];
      
      // Discard any equipped cards to the discard pile of the player who played them
      const equippedCards = creature.equippedCards || [];
      const updates: Partial<GameState> = {
        [boardKey]: updatedBoard,
      };
      
      // Group equipped cards by owner to batch discard updates
      const equippedByOwner: { [key: string]: Card[] } = {};
      equippedCards.forEach((equippedCard: any) => {
        const owner = equippedCard.equippedBy || controller; // Fallback to creature controller if metadata missing
        if (!equippedByOwner[owner]) {
          equippedByOwner[owner] = [];
        }
        equippedByOwner[owner].push(equippedCard);
      });
      
      // Add equipped cards to appropriate discard piles
      Object.entries(equippedByOwner).forEach(([owner, cards]) => {
        const ownerDiscardKey = getDiscardKey(owner as "player" | "ai");
        updates[ownerDiscardKey] = [...state[ownerDiscardKey], ...cards];
      });
      
      // Add creature to its controller's discard pile
      updates[discardKey] = [...state[discardKey], boardCreatureToCard(creature) as Card];
      
      set(updates);
      triggerOnDestroyAbilities(controller, creature);
      return {
        success: true,
        destroyed: true,
        damageDealt: creature.currentHealth,
        overflow: Math.abs(newHealth),
      };
    }

    const updatedBoard = [...board];
    updatedBoard[index] = { ...creature, currentHealth: newHealth };
    set({ [boardKey]: updatedBoard } as Partial<GameState>);
    return { success: true, destroyed: false, damageDealt: damage };
  };

  const damageShield = (
    controller: "player" | "ai",
    shieldId: string,
    damage: number,
    reveal = true
  ) => {
    if (damage <= 0) {
      return { success: true, destroyed: false, damageDealt: 0 };
    }
    const state = get();
    const shieldsKey = getShieldsKey(controller);
    const shields = state[shieldsKey];
    const shieldIndex = shields.findIndex((shield) => shield.id === shieldId);
    if (shieldIndex === -1) {
      return { success: false, error: "Shield not found" };
    }

    const targetShield = shields[shieldIndex];
    const newHealth = targetShield.currentHealth - damage;
    let updatedShields = [...shields];

    if (newHealth <= 0) {
      updatedShields = updatedShields.filter((shield) => shield.id !== shieldId);
      set({ [shieldsKey]: updatedShields } as Partial<GameState>);
      return { success: true, destroyed: true, damageDealt: targetShield.currentHealth };
    }

    let updatedShield = {
      ...targetShield,
      currentHealth: newHealth,
      faceDown: reveal ? false : targetShield.faceDown,
    };

    if (damage >= 150) {
      if (targetShield.currentTier === 3) {
        updatedShield = {
          ...updatedShield,
          currentTier: 2,
          currentHealth: Math.min(newHealth, targetShield.maxHealthByTier[2]),
        };
      } else if (targetShield.currentTier === 2) {
        updatedShield = {
          ...updatedShield,
          currentTier: 1,
          currentHealth: Math.min(newHealth, targetShield.maxHealthByTier[1]),
        };
      }
    }

    updatedShields[shieldIndex] = updatedShield;
    set({ [shieldsKey]: updatedShields } as Partial<GameState>);
    return { success: true, destroyed: false, damageDealt: damage };
  };

  const restoreShieldToOriginal = (controller: "player" | "ai", shieldId: string) => {
    const state = get();
    const shieldsKey = getShieldsKey(controller);
    const shields = state[shieldsKey];
    const index = shields.findIndex((shield) => shield.id === shieldId);
    if (index === -1) {
      return { success: false, error: "Shield not found" };
    }

    const shield = shields[index];
    const restoredShield = {
      ...shield,
      currentTier: shield.tier,
      currentHealth: shield.maxHealthByTier[shield.tier],
    };

    const updatedShields = [...shields];
    updatedShields[index] = restoredShield;
    set({ [shieldsKey]: updatedShields } as Partial<GameState>);
    return { success: true, shield: restoredShield };
  };

  const triggerOnDestroyAbilities = (controller: "player" | "ai", creature: BoardCreature) => {
    const abilities = creature.abilities?.filter((ability) => ability.trigger === "onDestroy") ?? [];
    if (abilities.length === 0) return;

    abilities.forEach((ability) => {
      switch (ability.id) {
        case "ash_release": {
          const essenceKey = getEssenceKey(controller);
          const state = get();
          const essence = state[essenceKey];
          set({
            [essenceKey]: {
              ...essence,
              fire: (essence.fire ?? 0) + 2,
            },
          } as Partial<GameState>);
          break;
        }
        case "aerial_plunder": {
          drawCardToHand(controller);
          break;
        }
        default:
          break;
      }
    });
  };

  const updateCreatureOnBoard = (
    controller: "player" | "ai",
    instanceId: string,
    updater: (creature: BoardCreature) => BoardCreature,
  ) => {
    const state = get();
    const boardKey = getBoardKey(controller);
    const board = state[boardKey];
    const updatedBoard = board.map((creature) =>
      creature.instanceId === instanceId ? updater(creature) : creature,
    );
    set({ [boardKey]: updatedBoard } as Partial<GameState>);
  };

  const addCreatureToBoard = (
    controller: "player" | "ai",
    card: Card,
    overrides: Partial<BoardCreature> = {},
  ) => {
    if (card.cardType !== "creature") return { success: false, error: "Card is not a creature" };

    const creatureCard = card as BoardCreature;
    const boardCreature: BoardCreature = applyPassiveFlags({
      ...creatureCard,
      instanceId: overrides.instanceId ?? uuidv4(),
      currentHealth:
        overrides.currentHealth ?? creatureCard.strength ?? creatureCard.health ?? 0,
      hasAction: overrides.hasAction ?? true,
      exhausted: overrides.exhausted ?? false,
      canAttack: overrides.canAttack ?? false,
      hasActivatedAbilityThisTurn: overrides.hasActivatedAbilityThisTurn ?? false,
      temporaryStrengthBonus: overrides.temporaryStrengthBonus ?? 0,
      doubleStrikeUntilEndOfTurn: overrides.doubleStrikeUntilEndOfTurn ?? false,
      pierceUntilEndOfTurn: overrides.pierceUntilEndOfTurn ?? false,
      cannotBeBlocked: overrides.cannotBeBlocked ?? false,
    });

    const state = get();
    const boardKey = getBoardKey(controller);
    const updatedBoard = [...state[boardKey], boardCreature];
    set({ [boardKey]: updatedBoard } as Partial<GameState>);
    return { success: true, creature: boardCreature };
  };

  const boardCreatureToCard = (creature: BoardCreature): CreatureCard => {
    const {
      instanceId,
      currentHealth,
      hasAction,
      exhausted,
      canAttack,
      hasActivatedAbilityThisTurn,
      temporaryStrengthBonus,
      doubleStrikeUntilEndOfTurn,
      pierceUntilEndOfTurn,
      cannotBeBlocked,
      untargetableUntilTurn,
      ...rest
    } = creature;
    return rest as CreatureCard;
  };

  const moveCreatureToHand = (fromController: "player" | "ai", instanceId: string) => {
    const state = get();
    const boardKey = getBoardKey(fromController);
    const handKey = getHandKey(fromController);
    const board = state[boardKey];
    const target = board.find((c) => c.instanceId === instanceId);
    if (!target) {
      return { success: false, error: "Creature not found" };
    }

    const updatedBoard = board.filter((c) => c.instanceId !== instanceId);
    const updatedHand = [...state[handKey], boardCreatureToCard(target)];

    // Discard any equipped cards when creature is returned to hand
    // Equipment goes to the discard pile of the player who played it, not the creature's controller
    const equippedCards = target.equippedCards || [];
    const updates: Partial<GameState> = {
      [boardKey]: updatedBoard,
      [handKey]: updatedHand,
    };
    
    // Group equipped cards by owner to batch discard updates
    const equippedByOwner: { [key: string]: Card[] } = {};
    equippedCards.forEach((equippedCard: any) => {
      const owner = equippedCard.equippedBy || fromController; // Fallback to creature controller if metadata missing
      if (!equippedByOwner[owner]) {
        equippedByOwner[owner] = [];
      }
      equippedByOwner[owner].push(equippedCard);
    });
    
    // Add equipped cards to appropriate discard piles
    Object.entries(equippedByOwner).forEach(([owner, cards]) => {
      const ownerDiscardKey = getDiscardKey(owner as "player" | "ai");
      updates[ownerDiscardKey] = [...state[ownerDiscardKey], ...cards];
    });

    set(updates);
    return { success: true, creature: target };
  };

  const enqueueAbilityPrompt = (
    controller: "player" | "ai",
    sourceInstanceId: string,
    message: string,
    options: AbilityOption[],
    selectionMode: "single" | "multiple" | "none",
    allowSkip = false,
    contextData?: Record<string, any>
  ) => {
    const state = get();
    const boardKey = getBoardKey(controller);
    const sourceCreature = state[boardKey].find((c) => c.instanceId === sourceInstanceId);
    const sourceCardId = sourceCreature?.id ?? contextData?.sourceCardId ?? "";
    const abilityId = contextData?.abilityId ?? "";
    if (!abilityId) {
      console.warn("enqueueAbilityPrompt called without abilityId", { controller, sourceInstanceId, message });
    }
    setPendingAbilityPrompt(
      {
        controller,
        sourceInstanceId,
        abilityId: abilityId ?? "",
        message,
        options,
        selectionMode,
        allowSkip,
      },
      {
        controller,
        sourceInstanceId,
        sourceCardId,
        abilityId: abilityId ?? "",
        data: contextData ?? {},
      }
    );
  };

  const clearAbilityPrompt = () => {
    setPendingAbilityPrompt(undefined);
  };

  const markCreatureAbilityUsed = (controller: "player" | "ai", instanceId: string) => {
    updateCreatureOnBoard(controller, instanceId, (creature) => ({
      ...creature,
      hasActivatedAbilityThisTurn: true,
    }));
  };

  const setCreatureExhausted = (
    controller: "player" | "ai",
    instanceId: string,
    exhausted = true
  ) => {
    updateCreatureOnBoard(controller, instanceId, (creature) => ({
      ...creature,
      hasAction: exhausted ? false : true,
      exhausted,
    }));
  };

  const triggerOnSummonAbilities = (controller: "player" | "ai", creature: BoardCreature) => {
    const abilities = creature.abilities?.filter((ability) => ability.trigger === "onSummon") ?? [];
    if (abilities.length === 0) return;

    const state = get();
    const opponent: "player" | "ai" = controller === "player" ? "ai" : "player";

    abilities.forEach((ability) => {
      switch (ability.id) {
        case "swift_snatch": {
          const opponentBoard = state[getBoardKey(opponent)];
          const currentTurnNumber = state.turnNumber;
          // Filter for 0-cost creatures that are not untargetable
          const validTargets = opponentBoard.filter((c) => {
            if ((c.cost ?? 0) !== 0) return false;
            // Skip untargetable creatures
            if (c.untargetableUntilTurn && currentTurnNumber < c.untargetableUntilTurn) {
              return false;
            }
            return true;
          });
          if (validTargets.length === 0) {
            return;
          }

          if (controller === "ai") {
            const target = validTargets[0];
            moveCreatureToHand(opponent, target.instanceId);
          } else {
            const options: AbilityOption[] = validTargets.map((target) => ({
              id: target.instanceId,
              label: `${target.name} (HP ${target.currentHealth})`,
              type: "creature",
              metadata: { controller: opponent },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Swift Snatch: Return an opponent's 0-cost creature to their hand.",
              options,
              "single",
              true,
              { opponent, abilityId: ability.id }
            );
          }
          break;
        }
        case "hydro_blur": {
          const expiresOnTurn = state.turnNumber + 1;
          updateCreatureOnBoard(controller, creature.instanceId, (current) => ({
            ...current,
            untargetableUntilTurn: expiresOnTurn,
          }));
          break;
        }
        case "magma_splash": {
          const playerBoard = state[getBoardKey("player")];
          const aiBoard = state[getBoardKey("ai")];
          const allCreatures = [...playerBoard.map((c) => ({ controller: "player" as const, creature: c })), ...aiBoard.map((c) => ({ controller: "ai" as const, creature: c }))];

          if (allCreatures.length === 0) {
            return;
          }

          if (controller === "ai") {
            const opponentCreatures = allCreatures.filter((entry) => entry.controller !== controller);
            const target = (opponentCreatures.length > 0 ? opponentCreatures : allCreatures)
              .sort((a, b) => (b.creature.strength || 0) - (a.creature.strength || 0))[0];
            if (target) {
              setCreatureExhausted(target.controller, target.creature.instanceId, true);
            }
          } else {
            const options: AbilityOption[] = allCreatures.map((entry) => ({
              id: entry.creature.instanceId,
              label: `${entry.creature.name} (${entry.controller === "player" ? "You" : "Opponent"})`,
              type: "creature",
              metadata: { controller: entry.controller },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Magma Splash: Exhaust any creature on the field?",
              options,
              "single",
              true,
              { abilityId: ability.id }
            );
          }
          break;
        }
        case "crystalline_seer": {
          const deckKey = getDeckKey(controller);
          const deck = state[deckKey];
          const equipmentRunes = deck
            .map((card, index) => ({ card, index }))
            .filter(({ card }) => card.cardType === "rune" && (card.id === "essence_amplifier" || card.id === "binding_coils"));

          if (equipmentRunes.length === 0) {
            return;
          }

          if (controller === "ai") {
            moveCardFromDeckToHand(controller, equipmentRunes[0].index);
          } else {
            const options: AbilityOption[] = equipmentRunes.map(({ card, index }) => ({
              id: String(index),
              label: `${card.name}`,
              type: "card",
              metadata: { deckIndex: index },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Crystalline Seer: Select an Equipment Rune to add to your hand.",
              options,
              "single",
              true,
              { deckKey, abilityId: ability.id }
            );
          }
          break;
        }
        case "fertile_ground": {
          const discardKey = getDiscardKey(controller);
          const discard = state[discardKey];
          const eligible = discard
            .map((card, index) => ({ card, index }))
            .filter(({ card }) => card.cardType === "creature" && (card as CreatureCard).element === "earth" && ((card as CreatureCard).cost || 0) === 0);

          if (eligible.length === 0) {
            return;
          }

          if (controller === "ai") {
            const chosen = eligible[0];
            const removal = removeCardFromDiscard(controller, chosen.index);
            if (removal.success && removal.card) {
              addCreatureToBoard(controller, removal.card, { hasAction: false, exhausted: true });
            }
          } else {
            const options: AbilityOption[] = eligible.map(({ card, index }) => ({
              id: String(index),
              label: `${card.name}`,
              type: "card",
              metadata: { discardIndex: index },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Fertile Ground: Special summon a 0-cost Earth creature from your discard?",
              options,
              "single",
              true,
              { abilityId: ability.id }
            );
          }
          break;
        }
        case "storm_surge": {
          const playerBoard = state[getBoardKey("player")];
          const aiBoard = state[getBoardKey("ai")];
          const allCreatures = [...playerBoard.map((c) => ({ controller: "player" as const, creature: c })), ...aiBoard.map((c) => ({ controller: "ai" as const, creature: c }))];
          if (allCreatures.length === 0) {
            return;
          }
          if (controller === "ai") {
            const opponentCreatures = allCreatures.filter((entry) => entry.controller !== controller);
            const target = (opponentCreatures.length > 0 ? opponentCreatures : allCreatures)
              .sort((a, b) => (b.creature.strength || 0) - (a.creature.strength || 0))[0];
            if (target) {
              destroyCreature(target.controller, target.creature.instanceId);
            }
          } else {
            const options: AbilityOption[] = allCreatures.map((entry) => ({
              id: entry.creature.instanceId,
              label: `${entry.creature.name} (${entry.controller === "player" ? "You" : "Opponent"})`,
              type: "creature",
              metadata: { controller: entry.controller },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Storm Surge: Destroy a creature on the field?",
              options,
              "single",
              true,
              { abilityId: ability.id }
            );
          }
          break;
        }
        case "chainlink": {
          const opponent = controller === "player" ? "ai" : "player";
          const opponentBoard = state[getBoardKey(opponent)];
          const elements: Element[] = ["fire", "water", "earth", "air"];
          const elementGroups = elements
            .map((element) => ({
              element,
              creatures: opponentBoard.filter((creature) => creature.element === element),
            }))
            .filter((group) => group.creatures.length > 0);

          if (elementGroups.length === 0) {
            return;
          }

          if (controller === "ai") {
            const chosen = elementGroups.sort((a, b) => b.creatures.length - a.creatures.length)[0];
            chosen.creatures.forEach((target) => damageCreature(opponent, target.instanceId, 75));
          } else {
            const options: AbilityOption[] = elementGroups.map((group) => ({
              id: group.element,
              label: `${group.element.toUpperCase()} (${group.creatures.length} target${group.creatures.length > 1 ? "s" : ""})`,
              type: "element",
              metadata: { element: group.element },
            }));
            enqueueAbilityPrompt(
              controller,
              creature.instanceId,
              "Chainlink: Choose an element to strike all opposing creatures of that type.",
              options,
              "single",
              true,
              { opponent, abilityId: ability.id }
            );
          }
          break;
        }
        default:
          break;
      }
    });
  };

  const grantEssence = (controller: "player" | "ai", element: Element, amount: number) => {
    if (amount <= 0) return;
    const state = get();
    const essenceKey = getEssenceKey(controller);
    const essence = state[essenceKey];
    set({
      [essenceKey]: {
        ...essence,
        [element]: (essence[element] ?? 0) + amount,
      },
    } as Partial<GameState>);
  };

  const addLogEntry = (
    controller: "player" | "ai" | "system",
    message: string,
    type: "ability" | "attack" | "defense" | "system" = "system"
  ) => {
    set((state) => {
      const entry = {
        id: uuidv4(),
        controller,
        message,
        timestamp: Date.now(),
        type,
      };
      const updatedLog = [...state.battleLog, entry];
      return { battleLog: updatedLog.slice(-200) } as Partial<GameState>;
    });
  };

  return {
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

    addLogEntry(
      "system",
      `Duel start: Player (${playerDeck}) vs AI (${aiDeck}). ${firstPlayer === "player" ? "You take the first turn." : "AI takes the first turn."}`,
      "system"
    );
  },

  playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => {
    const state = get();
    const hand = isPlayer ? state.playerHand : state.aiHand;
    const essence = isPlayer ? state.playerEssence : state.aiEssence;
    const board = isPlayer ? state.playerBoard : state.aiBoard;

    if (cardIndex >= hand.length) return { success: false, error: "Invalid card index" };

    const card = hand[cardIndex];
    let summonedCreature: BoardCreature | null = null;
    
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
      let boardCreature: BoardCreature = {
        ...creatureCard,
        instanceId: uuidv4(),
        currentHealth: creatureCard.strength || creatureCard.health, // Use strength, fallback to health for legacy
        hasAction: true, // All creatures enter with an action
        canAttack: false, // Legacy field
        exhausted: false, // Not exhausted initially
        hasActivatedAbilityThisTurn: false,
        temporaryStrengthBonus: 0,
        doubleStrikeUntilEndOfTurn: false,
        pierceUntilEndOfTurn: false,
        cannotBeBlocked: false,
      };
      boardCreature = applyPassiveFlags(boardCreature);
      summonedCreature = boardCreature;
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

    if (summonedCreature) {
      triggerOnSummonAbilities(isPlayer ? "player" : "ai", summonedCreature);
    }

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
    
    // Check if creature is untargetable
    if (targetCreature.untargetableUntilTurn && state.turnNumber < targetCreature.untargetableUntilTurn) {
      return { success: false, error: "Target cannot be selected this turn" };
    }
    
    // Check if creature already has equipment - only one equipment allowed at a time
    if (targetCreature.equippedCards && targetCreature.equippedCards.length > 0) {
      return { success: false, error: "This creature already has equipment. Only one equipment can be attached at a time." };
    }
    
    // Remove rune from the rune/counter zone (it's being moved to the creature)
    const newRuneCounterZone = [...runeCounterZone];
    if (runeZoneIndex !== undefined) {
      newRuneCounterZone[runeZoneIndex] = null;
    }
    
    // Attach the rune card to the creature (NO ESSENCE COST for equipment runes)
    // Add metadata to track who played the equipment
    const equippedCardWithOwner = {
      ...runeCard,
      equippedBy: isPlayer ? "player" : "ai"
    } as Card & { equippedBy: "player" | "ai" };
    
    const newBoard = targetBoard.map(creature => {
      if (creature.instanceId === creatureInstanceId) {
        const updated = {
          ...creature,
          equippedCards: [...(creature.equippedCards || []), equippedCardWithOwner]
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

      // Check if creature is untargetable
      if (targetCreature.untargetableUntilTurn && state.turnNumber < targetCreature.untargetableUntilTurn) {
        return { success: false, error: "Target cannot be selected this turn" };
      }

      const newHealth = targetCreature.currentHealth - damage;
      let newOpponentBoard = opponentBoard.map(creature => 
        creature.instanceId === targetId 
          ? { ...creature, currentHealth: newHealth }
          : creature
      );

      const opponentController = isPlayer ? ("ai" as const) : ("player" as const);
      const destroyedCreature = newHealth <= 0 ? targetCreature : null;

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

      if (destroyedCreature) {
        triggerOnDestroyAbilities(opponentController, destroyedCreature);
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
        // Update shield health and reveal
        const shieldIndex = newOpponentShields.findIndex(s => s.id === targetId);
        let updatedShield = {
          ...targetShield,
          currentHealth: newHealth,
          faceDown: false,
        };
        newOpponentShields[shieldIndex] = updatedShield;
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
    // Get original board arrays for updates
    const board = isPlayer ? state.playerBoard : state.aiBoard;
    const opponentBoard = isPlayer ? state.aiBoard : state.playerBoard;
    const opponentShields = isPlayer ? state.aiShields : state.playerShields;
    
    // Filter for searching (handle any potential null/undefined entries)
    const validBoard = board.filter(c => c != null);
    const validOpponentBoard = opponentBoard.filter(c => c != null);
    
    // Find attacker
    const attacker = validBoard.find(c => c && c.instanceId === attackerId);
    if (!attacker) {
      console.warn("Attacker not found:", {
        attackerId,
        boardLength: board.length,
        validBoardLength: validBoard.length,
        boardInstanceIds: validBoard.map(c => c?.instanceId)
      });
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
      const attackerController: "player" | "ai" = isPlayer ? "player" : "ai";
      addLogEntry(attackerController, `${attacker.name} strikes directly for ${damage} damage`, "attack");
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
      
      // Find potential blockers (creatures with action and higher agility than attacker)
      const attackerAgility = attacker.agility || 0;
      let potentialBlockers = validOpponentBoard.filter(c => 
        c && c.hasAction && 
        !c.exhausted &&
        (c.agility || 0) > attackerAgility
      );
      
      if (attacker.cannotBeBlocked) {
        potentialBlockers = [];
      }
      
      // If AI is attacking player's shield and there are potential blockers, allow blocking
      if (!isPlayer && potentialBlockers.length > 0) {
        // Set pending defense response to allow player to choose to block
        set({
          pendingDefenseResponse: {
            attackerId,
            defenderId: targetId, // Shield ID
            canDodge: false, // Can't dodge shield attacks
            potentialBlockers: potentialBlockers.map(c => ({
              instanceId: c.instanceId,
              name: c.name,
              agility: c.agility || 0,
            })),
            isExhaustedTarget: false,
            isShieldAttack: true, // Mark as shield attack
            originalShieldId: targetId,
          }
        });
        return { success: true, requiresResponse: true, isShieldAttack: true, originalShieldId: targetId };
      }
      
      // No blockers (or player attacking), proceed with direct shield attack
      const attackerController: "player" | "ai" = isPlayer ? "player" : "ai";
      const defenderController: "player" | "ai" = isPlayer ? "ai" : "player";
      const modifiers = getShieldAttackModifiers(attacker);
      const attackerStrength = getBaseStrength(attacker) + modifiers.strengthBonus;

      setCreatureExhausted(attackerController, attackerId, true);

      const shieldResult = damageShield(defenderController, targetId, attackerStrength, true);
      const damageDealt = shieldResult.damageDealt ?? attackerStrength;

      if (shieldResult.destroyed) {
        addLogEntry(
          attackerController,
          `${attacker.name} shatters ${defenderController === "player" ? "your" : "AI\'s"} ${targetShield.name}`,
          "attack"
        );
      } else {
        addLogEntry(
          attackerController,
          `${attacker.name} deals ${damageDealt} damage to ${defenderController === "player" ? "your" : "AI\'s"} ${targetShield.name} (now ${Math.max(targetShield.currentHealth - damageDealt, 0)} HP)`,
          "attack"
        );
      }

      if (hasAbility(attacker, "essence_well") && damageDealt > 0) {
        grantEssence(attackerController, "water", 1);
      }

      if (modifiers.doubleStrike) {
        let nextShieldId: string | undefined = targetId;
        if (shieldResult.destroyed) {
          const remainingShields = get()[getShieldsKey(defenderController)];
          nextShieldId = remainingShields.length > 0 ? remainingShields[0].id : undefined;
        }

        if (nextShieldId) {
          const secondStrike = damageShield(defenderController, nextShieldId, attackerStrength, true);
          if (hasAbility(attacker, "essence_well") && (secondStrike.damageDealt ?? 0) > 0) {
            grantEssence(attackerController, "water", 1);
          }
        } else {
          applyPierceOverflow(
            attackerController,
            defenderController,
            attackerStrength,
            {
              attackerHasEssenceWell: hasAbility(attacker, "essence_well"),
              sourceInstanceId: attackerId,
              abilityName: hasAbility(attacker, "inferno_fury") ? "Inferno Fury" : undefined,
            }
          );
        }
      }

      return {
        success: true,
        damage: damageDealt,
        destroyed: shieldResult.destroyed,
        shieldHit: true,
      };
    }
    
    // Handle creature attack - requires defense response
    if (targetType === "creature") {
      // Try multiple search strategies to find the creature
      let defender = validOpponentBoard.find(c => c && c.instanceId === targetId);
      
      // If not found, try searching by string comparison (in case of type mismatch)
      if (!defender) {
        defender = validOpponentBoard.find(c => c && String(c.instanceId) === String(targetId));
      }
      
      // If still not found, try searching the raw board (in case filtering removed it)
      if (!defender) {
        defender = opponentBoard.find(c => c && c.instanceId === targetId);
      }
      
      if (!defender) {
        // Debug: log what we're looking for
        console.error("Target creature not found after all search attempts:", {
          targetId,
          targetIdType: typeof targetId,
          opponentBoardLength: opponentBoard.length,
          validBoardLength: validOpponentBoard.length,
          boardInstanceIds: validOpponentBoard.map(c => ({ id: c?.instanceId, type: typeof c?.instanceId })),
          opponentBoardRaw: opponentBoard.map(c => ({ instanceId: c?.instanceId, name: c?.name, type: typeof c?.instanceId }))
        });
        return { success: false, error: "Target creature not found" };
      }
      console.log("Found defender:", defender);
      
      const attackerController: "player" | "ai" = isPlayer ? "player" : "ai";
      const defenderController: "player" | "ai" = isPlayer ? "ai" : "player";
      
      addLogEntry(
        attackerController,
        `${attacker.name} challenges ${defenderController === "player" ? "your" : "AI\'s"} ${defender.name}`,
        "attack"
      );
      
      if (defender.untargetableUntilTurn && state.turnNumber < defender.untargetableUntilTurn) {
        return { success: false, error: "Target cannot be selected this turn" };
      }
      
      // Check if defender is exhausted
      const isExhausted = defender.exhausted || !defender.hasAction;
      
      // Find potential blockers (creatures with action and higher agility than attacker)
      const attackerAgility = attacker.agility || 0;
      let potentialBlockers = validOpponentBoard.filter(c => 
        c && c.instanceId !== targetId && 
        c.hasAction && 
        !c.exhausted &&
        (c.agility || 0) > attackerAgility
      );
      
      if (attacker.cannotBeBlocked) {
        potentialBlockers = [];
      }
      
      // If AI is attacking player's exhausted creature and there are potential blockers, allow blocking
      if (isExhausted && !isPlayer && potentialBlockers.length > 0) {
        // Set pending defense response to allow player to choose to block
        set({
          pendingDefenseResponse: {
            attackerId,
            defenderId: targetId,
            canDodge: false, // Can't dodge exhausted creatures
            potentialBlockers: potentialBlockers.map(c => ({
              instanceId: c.instanceId,
              name: c.name,
              agility: c.agility || 0,
            })),
            isExhaustedTarget: true,
          }
        });
        return { success: true, requiresResponse: true, exhaustedTarget: true };
      }
      
      // If exhausted and no blockers (or player attacking), proceed with direct attack
      if (isExhausted) {
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
      const defenderAgility = defender.agility || 0;
      
      // If AI is attacking player creature, set pending defense response
      if (!isPlayer && potentialBlockers.length > 0) {
        set({
          pendingDefenseResponse: {
            attackerId,
            defenderId: targetId,
            canDodge: defenderAgility > attackerAgility,
            potentialBlockers: potentialBlockers.map(c => ({
              instanceId: c.instanceId,
              name: c.name,
              agility: c.agility || 0,
            })),
            isExhaustedTarget: false,
          }
        });
      }
      
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

  handleDefenseResponse: (defenderId: string, responseType: "defend" | "dodge" | "block" | "none", attackerId: string, isPlayer: boolean, blockerId?: string) => {
    const state = get();
    const pendingDefense = state.pendingDefenseResponse;
    // isPlayer means attacker is player's creature
    const attackerBoard = isPlayer ? state.playerBoard : state.aiBoard;
    const defenderBoard = isPlayer ? state.aiBoard : state.playerBoard;
    
    const attackerController: "player" | "ai" = isPlayer ? "player" : "ai";
    const defenderController: "player" | "ai" = isPlayer ? "ai" : "player";
    
    const attacker = attackerBoard.find(c => c.instanceId === attackerId);
    const defender = defenderBoard.find(c => c.instanceId === defenderId);
    
    if (!attacker || !defender) {
      return { success: false, error: "Creature not found" };
    }
    
    // Clear pending defense response
    set({ pendingDefenseResponse: undefined });
    
    // Handle dodge
    if (responseType === "dodge") {
      const attackerAgility = attacker.agility || 0;
      const defenderAgility = defender.agility || 0;
      
      if (defenderAgility <= attackerAgility) {
        return { success: false, error: "Cannot dodge - attacker has equal or higher agility" };
      }
      
      // Check that defender has an action
      if (!defender.hasAction || defender.exhausted) {
        return { success: false, error: "Defender does not have an action to dodge" };
      }
      
      // Both become exhausted, no damage
      const newAttackerBoard = attackerBoard.map(c =>
        c.instanceId === attackerId ? { ...c, hasAction: false, exhausted: true } : c
      );
      const newDefenderBoard = defenderBoard.map(c =>
        c.instanceId === defenderId ? { ...c, hasAction: false, exhausted: true } : c
      );
      
      if (isPlayer) {
        set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard });
      } else {
        set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard });
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
      
      const attackerBoardKey = getBoardKey(attackerController);
      const defenderBoardKey = getBoardKey(defenderController);
      const shieldAttack = pendingDefense?.isShieldAttack ?? false;
      const originalShieldId = pendingDefense?.originalShieldId;
      
      // Protective Blast bonus
      const blockerBonus = getBlockerStrengthBonus(blocker, shieldAttack);
      if (blockerBonus > 0) {
        updateCreatureOnBoard(defenderController, blockerId, (current) => ({
          ...current,
          temporaryStrengthBonus: (current.temporaryStrengthBonus ?? 0) + blockerBonus,
        }));
      }
      
      const attackerModifiers = shieldAttack ? getShieldAttackModifiers(attacker) : { strengthBonus: 0, doubleStrike: false, pierce: false };
      const attackerStrength = getBaseStrength(attacker) + attackerModifiers.strengthBonus;
      
      // Exhaust combatants
      setCreatureExhausted(attackerController, attackerId, true);
      setCreatureExhausted(defenderController, blockerId, true);
      
      // Refresh references after state updates
      const refreshedAttacker = get()[attackerBoardKey].find(c => c.instanceId === attackerId) || attacker;
      
      const firstStrike = damageCreature(defenderController, blockerId, attackerStrength);
      let blockerDestroyedFinal = firstStrike.destroyed;
      if (hasAbility(refreshedAttacker, "essence_well") && (firstStrike.damageDealt ?? 0) > 0) {
        grantEssence(attackerController, "water", 1);
      }
      if (attackerModifiers.pierce && firstStrike.destroyed && firstStrike.overflow) {
        applyPierceOverflow(
          attackerController,
          defenderController,
          firstStrike.overflow,
          {
            preferredShieldId: originalShieldId,
            sourceInstanceId: attackerId,
            attackerHasEssenceWell: hasAbility(refreshedAttacker, "essence_well"),
            abilityName: hasAbility(refreshedAttacker, "inferno_fury") ? "Inferno Fury" : undefined,
          }
        );
        if (hasAbility(refreshedAttacker, "essence_well")) {
          grantEssence(attackerController, "water", 1);
        }
      }
      
      if (attackerModifiers.doubleStrike) {
        const blockerAfterFirst = get()[defenderBoardKey].find(c => c.instanceId === blockerId);
        if (blockerAfterFirst) {
          const secondStrike = damageCreature(defenderController, blockerId, attackerStrength);
          blockerDestroyedFinal = secondStrike.destroyed;
          if (hasAbility(refreshedAttacker, "essence_well") && (secondStrike.damageDealt ?? 0) > 0) {
            grantEssence(attackerController, "water", 1);
          }
          if (attackerModifiers.pierce && secondStrike.destroyed && secondStrike.overflow) {
            applyPierceOverflow(
              attackerController,
              defenderController,
              secondStrike.overflow,
              {
                preferredShieldId: originalShieldId,
                sourceInstanceId: attackerId,
                attackerHasEssenceWell: hasAbility(refreshedAttacker, "essence_well"),
                abilityName: hasAbility(refreshedAttacker, "inferno_fury") ? "Inferno Fury" : undefined,
              }
            );
            if (hasAbility(refreshedAttacker, "essence_well")) {
              grantEssence(attackerController, "water", 1);
            }
          }
        } else if (originalShieldId) {
          const shieldStrike = damageShield(defenderController, originalShieldId, attackerStrength, true);
          if (hasAbility(refreshedAttacker, "essence_well") && (shieldStrike.damageDealt ?? 0) > 0) {
            grantEssence(attackerController, "water", 1);
          }
        }
      }
      
      const shieldProtected = !!shieldAttack;
      const shieldPhrase = shieldProtected ? " protecting the shield" : "";
      const blockerFate = blockerDestroyedFinal ? " but is destroyed" : "";
      addLogEntry(
        defenderController,
        `${blocker.name} blocks ${attacker.name}${shieldPhrase}${blockerFate}.`,
        "defense"
      );
      return {
        success: true,
        blocked: true,
        damage: attackerStrength,
        blockerDestroyed: blockerDestroyedFinal,
        shieldProtected,
      };
    }
    
    // Handle defend (or none defaults to defend if can't dodge)
    if (responseType === "defend" || responseType === "none") {
      // Check if this is a shield attack
      const isShieldAttack = pendingDefense?.isShieldAttack || false;
      
      if (isShieldAttack && responseType === "none") {
        // Let shield attack proceed - shield takes damage
        const targetShield = (isPlayer ? state.aiShields : state.playerShields).find(s => s.id === defenderId);
        if (!targetShield) {
          return { success: false, error: "Shield not found" };
        }
        
        const damage = attacker.strength || attacker.attack;
        const newHealth = targetShield.currentHealth - damage;
        
        // Exhaust attacker
        const newAttackerBoard = attackerBoard.map(c => 
          c.instanceId === attackerId 
            ? { ...c, hasAction: false, exhausted: true }
            : c
        );
        
        let newOpponentShields = [...(isPlayer ? state.aiShields : state.playerShields)];
        if (newHealth <= 0) {
          // Shield destroyed
          newOpponentShields = newOpponentShields.filter(s => s.id !== defenderId);
        } else {
          // Update shield health and reveal
          const shieldIndex = newOpponentShields.findIndex(s => s.id === defenderId);
          let updatedShield = {
            ...targetShield,
            currentHealth: newHealth,
            faceDown: false,
          };
          
          // Check if shield should drop to next tier (if damage >= 150)
          if (damage >= 150) {
            if (targetShield.currentTier === 3) {
              updatedShield.currentTier = 2;
              updatedShield.currentHealth = Math.min(newHealth, targetShield.maxHealthByTier[2]);
            } else if (targetShield.currentTier === 2) {
              updatedShield.currentTier = 1;
              updatedShield.currentHealth = Math.min(newHealth, targetShield.maxHealthByTier[1]);
            }
          }
          
          newOpponentShields[shieldIndex] = updatedShield;
        }
        
        if (isPlayer) {
          set({ aiBoard: newAttackerBoard, aiShields: newOpponentShields });
        } else {
          set({ playerBoard: newAttackerBoard, playerShields: newOpponentShields });
        }
        
        return { success: true, damage, destroyed: newHealth <= 0, shieldHit: true };
      }
      
      // Check if defender is exhausted - if so, "none" means let attack proceed without blocking
      const isExhausted = defender.exhausted || !defender.hasAction;
      if (isExhausted && responseType === "none") {
        // Let the attack proceed - attacker deals damage to exhausted defender
        const damage = attacker.strength || attacker.attack;
        const newHealth = defender.currentHealth - damage;
        
        // Exhaust attacker
        const newAttackerBoard = attackerBoard.map(c => 
          c.instanceId === attackerId 
            ? { ...c, hasAction: false, exhausted: true }
            : c
        );
        
        let newDefenderBoard = [...defenderBoard];
        if (newHealth <= 0) {
          // Defender destroyed
          newDefenderBoard = newDefenderBoard.filter(c => c.instanceId !== defenderId);
          if (isPlayer) {
            set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard, aiDiscard: [...state.aiDiscard, defender as unknown as Card] });
          } else {
            set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard, playerDiscard: [...state.playerDiscard, defender as unknown as Card] });
          }
        } else {
          // Update defender health
          newDefenderBoard = newDefenderBoard.map(c =>
            c.instanceId === defenderId ? { ...c, currentHealth: newHealth } : c
          );
          if (isPlayer) {
            set({ playerBoard: newAttackerBoard, aiBoard: newDefenderBoard });
          } else {
            set({ aiBoard: newAttackerBoard, playerBoard: newDefenderBoard });
          }
        }
        
        return { success: true, damage, exhaustedTarget: true };
      }
      
      // Normal defend - resolve combat
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
    
    const destroyedAttackerInfo = attackerDestroyed
      ? {
          controller: isPlayer ? ("player" as const) : ("ai" as const),
          creature: attackerBoard.find((c) => c.instanceId === attackerId),
        }
      : null;
    const destroyedDefenderInfo = defenderDestroyed
      ? {
          controller: isPlayer ? ("ai" as const) : ("player" as const),
          creature: defenderBoard.find((c) => c.instanceId === defenderId),
        }
      : null;
    
    // Update boards and discard piles in a single operation to prevent state inconsistencies
    const updates: any = {};
    
    if (isPlayer) {
      // Player attacked: attackerBoard is playerBoard, defenderBoard is aiBoard
      updates.playerBoard = newAttackerBoard;
      updates.aiBoard = newDefenderBoard;
      
      if (attackerDestroyed && destroyedAttackerInfo?.creature) {
        updates.playerDiscard = [...state.playerDiscard, destroyedAttackerInfo.creature as unknown as Card];
      }
      if (defenderDestroyed && destroyedDefenderInfo?.creature) {
        updates.aiDiscard = [...state.aiDiscard, destroyedDefenderInfo.creature as unknown as Card];
      }
    } else {
      // AI attacked: attackerBoard is aiBoard, defenderBoard is playerBoard
      updates.aiBoard = newAttackerBoard;
      updates.playerBoard = newDefenderBoard;
      
      if (attackerDestroyed && destroyedAttackerInfo?.creature) {
        updates.aiDiscard = [...state.aiDiscard, destroyedAttackerInfo.creature as unknown as Card];
      }
      if (defenderDestroyed && destroyedDefenderInfo?.creature) {
        updates.playerDiscard = [...state.playerDiscard, destroyedDefenderInfo.creature as unknown as Card];
      }
    }
    
    set(updates);
    
    if (destroyedAttackerInfo?.creature) {
      triggerOnDestroyAbilities(destroyedAttackerInfo.controller, destroyedAttackerInfo.creature);
    }
    if (destroyedDefenderInfo?.creature) {
      triggerOnDestroyAbilities(destroyedDefenderInfo.controller, destroyedDefenderInfo.creature);
    }
    
    const damageToDefender = Math.max(0, defender.currentHealth - Math.max(newDefenderHealth, 0));
    const damageToAttacker = Math.max(0, attacker.currentHealth - Math.max(newAttackerHealth, 0));

    const attackerController = isPlayer ? "player" : "ai";
    let outcomeMessage = `${attacker.name} clashes with ${defender.name}.`;
    if (attackerDestroyed && defenderDestroyed) {
      outcomeMessage = `${attacker.name} and ${defender.name} are both destroyed.`;
    } else if (defenderDestroyed) {
      outcomeMessage = `${attacker.name} defeats ${defender.name}.`;
    } else if (attackerDestroyed) {
      outcomeMessage = `${defender.name} withstands the assault and destroys ${attacker.name}.`;
    } else {
      outcomeMessage = `${attacker.name} and ${defender.name} trade blows (${Math.max(newAttackerHealth, 0)} HP vs ${Math.max(newDefenderHealth, 0)} HP remaining).`;
    }
    addLogEntry(attackerController, outcomeMessage, "attack");

    if (damageToDefender > 0 && hasAbility(attacker, "essence_well")) {
      grantEssence(isPlayer ? "player" : "ai", "water", 1);
    }
    if (damageToAttacker > 0 && hasAbility(defender, "essence_well")) {
      grantEssence(isPlayer ? "ai" : "player", "water", 1);
    }
    
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
        hasActivatedAbilityThisTurn: false,
        temporaryStrengthBonus: 0,
        doubleStrikeUntilEndOfTurn: false,
        pierceUntilEndOfTurn: false,
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
    
    const phaseNames: Record<string, string> = {
      draw: "Draw Phase",
      generate: "Generate Phase",
      main1: "Main Phase 1",
      battle: "Battle Phase",
      main2: "Main Phase 2",
      end: "End Phase",
    };
    
    // Turn 1 Rule: Skip Battle Phase for the first player
    if (state.turnNumber === 1 && state.currentPhase === "main1") {
      const controller = state.currentTurn;
      addLogEntry(controller, `→ ${phaseNames["main2"]}`, "system");
      set({ currentPhase: "main2" });
      return;
    }
    
    const phaseOrder: Array<typeof state.currentPhase> = ["draw", "generate", "main1", "battle", "main2", "end"];
    const currentIndex = phaseOrder.indexOf(state.currentPhase);
    
    if (currentIndex < phaseOrder.length - 1) {
      const nextPhase = phaseOrder[currentIndex + 1];
      const controller = state.currentTurn;
      
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
        
        addLogEntry(controller, `→ ${phaseNames[nextPhase]}`, "system");
        
        if (state.currentTurn === "player") {
          set({ currentPhase: nextPhase, playerEssence: newEssence });
        } else {
          set({ currentPhase: nextPhase, aiEssence: newEssence });
        }
        
        // Return generation info for UI display
        return { generated: generation };
      } else {
        addLogEntry(controller, `→ ${phaseNames[nextPhase]}`, "system");
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

    // Log turn end and start
    addLogEntry(state.currentTurn, `Turn ${state.turnNumber} ended`, "system");
    addLogEntry(nextTurn, `Turn ${newTurnNumber} started → Draw Phase`, "system");

    // Restore shields based on tier and health thresholds during end phase
    const restoreShields = (shields: BoardShield[]): BoardShield[] => {
      return shields.map(shield => {
        // Skip shields that are broken (health <= 0)
        if (shield.currentHealth <= 0) {
          return shield;
        }

        const tier = shield.tier; // Base tier of the shield
        
        if (tier === 1) {
          // Tier 1 shields: Always restore to 150 HP if not broken
          return { ...shield, currentHealth: 150, currentTier: 1 };
        } else if (tier === 2) {
          // Tier 2 shields: Restore to 300 if >= 151, else restore to 150
          if (shield.currentHealth >= 151) {
            return { ...shield, currentHealth: 300, currentTier: 2 };
          } else {
            return { ...shield, currentHealth: 150, currentTier: 1 };
          }
        } else if (tier === 3) {
          // Tier 3 shields: Restore based on health thresholds
          if (shield.currentHealth >= 301) {
            return { ...shield, currentHealth: 450, currentTier: 3 };
          } else if (shield.currentHealth >= 151) {
            return { ...shield, currentHealth: 300, currentTier: 2 };
          } else {
            return { ...shield, currentHealth: 150, currentTier: 1 };
          }
        }
        
        // Fallback: return shield unchanged
        return shield;
      });
    };
    
    // Restore creature health to full strength during end phase
    const restoreCreatureHealth = (board: BoardCreature[]): BoardCreature[] => {
      return board.map(creature => {
        const maxHealth = creature.strength || creature.health;
        const updated = {
          ...creature,
          temporaryStrengthBonus: 0,
          doubleStrikeUntilEndOfTurn: false,
          pierceUntilEndOfTurn: false,
        };
        if (creature.currentHealth < maxHealth) {
          return { ...updated, currentHealth: maxHealth };
        }
        return updated;
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

  activateCreatureAbility: (creatureInstanceId: string, abilityId: string, _options?: any) => {
    const state = get();

    const locateCreature = (board: BoardCreature[]) => board.find((c) => c.instanceId === creatureInstanceId);

    let controller: "player" | "ai" | null = null;
    let creature: BoardCreature | undefined = locateCreature(state.playerBoard);
    if (creature) {
      controller = "player";
    } else {
      creature = locateCreature(state.aiBoard);
      if (creature) {
        controller = "ai";
      }
    }

    if (!creature || !controller) {
      return { success: false, error: "Creature not found" };
    }

    const ability = creature.abilities?.find((a) => a.id === abilityId);
    if (!ability) {
      return { success: false, error: "Ability not found on creature" };
    }

    if (ability.trigger !== "activated") {
      return { success: false, error: "Ability cannot be activated manually" };
    }

    if (creature.hasActivatedAbilityThisTurn) {
      return { success: false, error: "Ability already used this turn" };
    }

    const currentTurnMatches = state.currentTurn === controller;
    if (!currentTurnMatches && controller === "player") {
      return { success: false, error: "It is not your turn" };
    }

    if (state.currentPhase !== "main1" && state.currentPhase !== "main2") {
      return { success: false, error: "Abilities can only be activated during Main Phases" };
    }

    addLogEntry(controller, `${creature.name} activates ${ability.name}`, "ability");

    switch (abilityId) {
      case "fire_catalyst": {
        const board = controller === "player" ? state.playerBoard : state.aiBoard;
        const fireCount = board.filter((c) => c.element === "fire").length;
        if (fireCount === 0) {
          return { success: false, error: "No fire creatures under your control" };
        }

        if (controller === "player") {
          set({
            playerEssence: {
              ...state.playerEssence,
              fire: state.playerEssence.fire + fireCount,
            },
            playerBoard: state.playerBoard.map((c) =>
              c.instanceId === creature.instanceId ? { ...c, hasActivatedAbilityThisTurn: true } : c
            ),
          });
        } else {
          set({
            aiEssence: {
              ...state.aiEssence,
              fire: state.aiEssence.fire + fireCount,
            },
            aiBoard: state.aiBoard.map((c) =>
              c.instanceId === creature.instanceId ? { ...c, hasActivatedAbilityThisTurn: true } : c
            ),
          });
        }
        return { success: true };
      }
      case "combustion": {
        const playerCreatures = state.playerBoard.map((c) => ({
          id: c.instanceId,
          label: `${c.name} (You)` ,
          controller: "player" as const,
          type: "creature" as const,
          health: c.currentHealth,
        }));
        const aiCreatures = state.aiBoard.map((c) => ({
          id: c.instanceId,
          label: `${c.name} (Opponent)` ,
          controller: "ai" as const,
          type: "creature" as const,
          health: c.currentHealth,
        }));
        const playerShields = state.playerShields.map((s) => ({
          id: s.id,
          label: `${s.name} (You)` ,
          controller: "player" as const,
          type: "shield" as const,
          health: s.currentHealth,
        }));
        const aiShields = state.aiShields.map((s) => ({
          id: s.id,
          label: `${s.name} (Opponent)` ,
          controller: "ai" as const,
          type: "shield" as const,
          health: s.currentHealth,
        }));

        const allTargets = [...playerCreatures, ...aiCreatures, ...playerShields, ...aiShields];
        if (allTargets.length === 0) {
          return { success: false, error: "No valid targets" };
        }

        if (controller === "ai") {
          const currentTurnNumber = state.turnNumber;
          // Filter out untargetable creatures
          const validTargets = allTargets.filter((target) => {
            if (target.type === "creature") {
              const creature = (target.controller === "player" ? state.playerBoard : state.aiBoard)
                .find(c => c.instanceId === target.id);
              if (creature && creature.untargetableUntilTurn && currentTurnNumber < creature.untargetableUntilTurn) {
                return false;
              }
            }
            return true;
          });
          
          if (validTargets.length === 0) {
            return { success: false, error: "No valid targets" };
          }
          
          // Prioritize: low HP creatures, then high HP creatures, then shields
          const opponentTargets = validTargets.filter((target) => target.controller !== controller);
          const targetsToUse = opponentTargets.length > 0 ? opponentTargets : validTargets;
          
          // Separate creatures and shields
          const creatures = targetsToUse.filter(t => t.type === "creature");
          const shields = targetsToUse.filter(t => t.type === "shield");
          
          // Sort creatures: low HP first
          creatures.sort((a, b) => a.health - b.health);
          
          // Choose target: low HP creature if available, otherwise high HP creature, otherwise weakest shield
          let target;
          if (creatures.length > 0) {
            // Prefer low HP creatures (first in sorted list)
            target = creatures[0];
          } else if (shields.length > 0) {
            // If no creatures, target weakest shield
            shields.sort((a, b) => a.health - b.health);
            target = shields[0];
          } else {
            // Fallback (shouldn't happen)
            target = targetsToUse[0];
          }
          
          if (target) {
            if (target.type === "creature") {
              damageCreature(target.controller, target.id, 30);
            } else {
              damageShield(target.controller, target.id, 30);
            }
            markCreatureAbilityUsed(controller, creature.instanceId);
          }
          return { success: true };
        }

        const options: AbilityOption[] = allTargets.map((target) => ({
          id: target.id,
          label: `${target.label} (${target.type === "creature" ? "Creature" : "Shield"})`,
          type: target.type,
          metadata: { controller: target.controller, targetType: target.type },
        }));

        enqueueAbilityPrompt(
          controller,
          creature.instanceId,
          "Combustion: Deal 30 damage to any creature or shield.",
          options,
          "single",
          true,
          { markAbilityUsed: true, abilityId: ability.id }
        );
        return { success: true, awaitingResolution: true };
      }
      case "shielded_might": {
        const shieldsKey = getShieldsKey(controller);
        const shields = state[shieldsKey];
        if (shields.length === 0) {
          return { success: false, error: "No shields available" };
        }

        const damagedShields = shields.filter((shield) => shield.currentHealth < shield.maxHealthByTier[shield.tier] || shield.currentTier !== shield.tier);

        if (controller === "ai") {
          const targetShield = (damagedShields.length > 0 ? damagedShields : shields)[0];
          restoreShieldToOriginal(controller, targetShield.id);
          markCreatureAbilityUsed(controller, creature.instanceId);
          return { success: true };
        }

        const options: AbilityOption[] = shields.map((shield) => ({
          id: shield.id,
          label: `${shield.name} (HP ${shield.currentHealth})`,
          type: "shield",
          metadata: { shieldId: shield.id },
        }));

        enqueueAbilityPrompt(
          controller,
          creature.instanceId,
          "Shielded Might: Restore one of your shields to its original tier and health.",
          options,
          "single",
          true,
          { markAbilityUsed: true, abilityId: ability.id }
        );
        return { success: true, awaitingResolution: true };
      }
      case "sneaky_insight": {
        const opponent = controller === "player" ? "ai" : "player";
        const opponentRuneKey = opponent === "player" ? "playerRuneCounterZone" : "aiRuneCounterZone";
        const runeZone = state[opponentRuneKey];
        const runeOptions: AbilityOption[] = runeZone
          .map((card, index) =>
            card
              ? {
                  id: `rune-${index}`,
                  label: card.faceDown ? `Face-down Rune (Slot ${index + 1})` : `${(card as unknown as Card).name} (Revealed)` ,
                  type: "rune",
                  metadata: { controller: opponent, runeIndex: index },
                }
              : null
          )
          .filter(Boolean) as AbilityOption[];

        const shieldOptions: AbilityOption[] = state[getShieldsKey(opponent)]
          .filter((shield) => shield.faceDown)
          .map((shield, index) => {
            // Determine position from player's perspective
            // For opponent shields, left-to-right is: Left, Middle, Right
            let position: string;
            if (opponent === "ai") {
              // AI shields: left=0, middle=1, right=2 from player's view
              position = index === 0 ? "Left" : index === 1 ? "Middle" : "Right";
            } else {
              // Player shields: left=0, middle=1, right=2 (same)
              position = index === 0 ? "Left" : index === 1 ? "Middle" : "Right";
            }
            return {
              id: shield.id,
              label: `Shield (${position})`,
              type: "shield",
              metadata: { controller: opponent, shieldId: shield.id },
            };
          });

        const options = [...runeOptions, ...shieldOptions];
        if (options.length === 0) {
          return { success: false, error: "No targets to reveal" };
        }

        if (controller === "ai") {
          if (shieldOptions.length > 0) {
            const shieldId = shieldOptions[0].metadata?.shieldId;
            if (shieldId) {
              const shieldsKey = getShieldsKey(opponent);
              const updatedShields = state[shieldsKey].map((shield) =>
                shield.id === shieldId ? { ...shield, faceDown: false } : shield
              );
              set({ [shieldsKey]: updatedShields } as Partial<GameState>);
            }
          } else {
            const runeIndex = runeOptions[0].metadata?.runeIndex;
            if (typeof runeIndex === "number") {
              revealRuneTemporarily(opponent, runeIndex);
            }
          }
          markCreatureAbilityUsed(controller, creature.instanceId);
          return { success: true };
        }

        enqueueAbilityPrompt(
          controller,
          creature.instanceId,
          "Sneaky Insight: Peek at an opponent rune or flip a shield face-up.",
          options,
          "single",
          true,
          { abilityId: ability.id, opponent, stage: "choose" }
        );
        return { success: true, awaitingResolution: true };
      }
      case "tidal_swap": {
        const handKey = getHandKey(controller);
        const hand = state[handKey];
        const handCreatures = hand
          .map((card, index) => ({ card, index }))
          .filter(({ card }) => card.cardType === "creature") as Array<{ card: CreatureCard; index: number }>;

        if (handCreatures.length === 0) {
          return { success: false, error: "No creature in hand to discard" };
        }

        if (controller === "ai") {
          const discardChoice = handCreatures[0];
          const discardResult = moveCardFromHandToDiscard(controller, discardChoice.index);
          if (!discardResult.success || !discardResult.card) {
            return discardResult as any;
          }
          const element = (discardResult.card as CreatureCard).element;
          const discardKey = getDiscardKey(controller);
          const discardPile = get()[discardKey];
          const retrieveIndex = discardPile.findIndex(
            (card) => card.cardType === "creature" && (card as CreatureCard).element === element && card.id !== discardResult.card!.id
          );
          if (retrieveIndex !== -1) {
            const removal = removeCardFromDiscard(controller, retrieveIndex);
            if (removal.success && removal.card) {
              addCardToHand(controller, removal.card);
            }
          }
          markCreatureAbilityUsed(controller, creature.instanceId);
          return { success: true };
        }

        const options: AbilityOption[] = handCreatures.map(({ card, index }) => ({
          id: String(index),
          label: `${card.name} (${card.element.toUpperCase()})`,
          type: "card" as const,
          metadata: { handIndex: index, element: card.element, cardId: card.id },
        }));

        enqueueAbilityPrompt(
          controller,
          creature.instanceId,
          "Tidal Swap: Discard a creature from your hand (matching element will be recovered).",
          options,
          "single",
          true,
          { abilityId: ability.id, stage: "discard" }
        );
        return { success: true, awaitingResolution: true };
      }
      case "galeas_grasp":
      case "ground_quake": {
        const allCreatures = [
          ...state.playerBoard.map((item) => ({ controller: "player" as const, creature: item })),
          ...state.aiBoard.map((item) => ({ controller: "ai" as const, creature: item })),
        ].filter((entry) => entry.creature.instanceId !== creature.instanceId);

        if (allCreatures.length === 0) {
          return { success: false, error: "No valid targets" };
        }

        if (controller === "ai") {
          const friendlyExhausted = allCreatures.find(
            (entry) => entry.controller === controller && (entry.creature.exhausted || !entry.creature.hasAction)
          );
          if (friendlyExhausted) {
            setCreatureExhausted(controller, friendlyExhausted.creature.instanceId, false);
          } else {
            const enemyActive = allCreatures.find(
              (entry) => entry.controller !== controller && entry.creature.hasAction && !entry.creature.exhausted
            );
            if (enemyActive) {
              setCreatureExhausted(enemyActive.controller, enemyActive.creature.instanceId, true);
            }
          }
          markCreatureAbilityUsed(controller, creature.instanceId);
          return { success: true };
        }

        const options: AbilityOption[] = allCreatures.map((entry) => ({
          id: entry.creature.instanceId,
          label: `${entry.creature.name} (${entry.controller === "player" ? "You" : "Opponent"})`,
          type: "creature",
          metadata: { controller: entry.controller },
        }));

        enqueueAbilityPrompt(
          controller,
          creature.instanceId,
          abilityId === "galeas_grasp"
            ? "Galea's Grasp: Exhaust or refresh a creature on the field."
            : "Ground Quake: Exhaust or refresh a creature on the field.",
          options,
          "single",
          true,
          { abilityId: ability.id }
        );
        return { success: true, awaitingResolution: true };
      }
      default:
        console.warn(`Ability ${abilityId} not yet implemented`);
        return { success: false, error: "Ability not implemented yet" };
    }
  },

  activateHandAbility: (cardIndex: number, abilityId: string, _options?: any) => {
    const state = get();
    const controller: "player" | "ai" = state.currentTurn === "player" ? "player" : "ai";
    const handKey = getHandKey(controller);
    const hand = state[handKey];

    if (cardIndex < 0 || cardIndex >= hand.length) {
      return { success: false, error: "Invalid card index" };
    }

    const card = hand[cardIndex];
    if (card.id !== "blazorn" || abilityId !== "fiery_birth") {
      return { success: false, error: "Ability not available" };
    }

    const board = state[getBoardKey(controller)];
    if (board.length === 0) {
      return { success: false, error: "No creatures to sacrifice" };
    }

    addLogEntry(controller, `${card.name} prepares Fiery Birth`, "ability");

    if (controller === "ai") {
      const sacrificeTarget = board[0];
      destroyCreature(controller, sacrificeTarget.instanceId);
      const updatedHand = [...hand];
      updatedHand.splice(cardIndex, 1);
      set({ [handKey]: updatedHand } as Partial<GameState>);
      const result = addCreatureToBoard(controller, card, { hasAction: true, exhausted: false });
      if (result.success && result.creature) {
        markCreatureAbilityUsed(controller, result.creature.instanceId);
      }
      return { success: true };
    }

    const options: AbilityOption[] = board.map((creature) => ({
      id: creature.instanceId,
      label: `${creature.name} (${creature.element.toUpperCase()})`,
      type: "creature",
      metadata: { controller },
    }));

    enqueueAbilityPrompt(
      controller,
      "hand-fiery-birth",
      "Fiery Birth: Destroy a creature you control to summon Blazorn for free.",
      options,
      "single",
      true,
      { abilityId: "fiery_birth", stage: "sacrifice", handIndex: cardIndex, sourceCardId: card.id }
    );

    return { success: true, awaitingResolution: true } as any;
  },

  resolveAbilityPrompt: (selection: { optionId?: string; optionIds?: string[]; skip?: boolean }) => {
    const state = get();
    const prompt = state.pendingAbilityPrompt;
    const context = state.activeAbilityContext;
    if (!prompt || !context) {
      return { success: false, error: "No ability prompt pending" };
    }

    const cleanup = (result: any, markUsedOverride?: boolean) => {
      const shouldMark = markUsedOverride ?? (context.data?.markAbilityUsed && !result?.skipped);
      if (shouldMark && context.sourceInstanceId) {
        markCreatureAbilityUsed(context.controller, context.sourceInstanceId);
      }
      clearAbilityPrompt();
      return result;
    };

    const optionById = (id?: string) => prompt.options.find((opt) => opt.id === id);

    switch (context.abilityId) {
      case "swift_snatch": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.controller) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        moveCreatureToHand(option.metadata.controller, option.id);
        return cleanup({ success: true }, false);
      }
      case "magma_splash": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.controller) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        setCreatureExhausted(option.metadata.controller, option.id, true);
        return cleanup({ success: true }, false);
      }
      case "crystalline_seer": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        const deckIndex = option?.metadata?.deckIndex;
        if (deckIndex === undefined) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        const result = moveCardFromDeckToHand(context.controller, Number(deckIndex));
        return cleanup(result, false);
      }
      case "fertile_ground": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        const discardIndex = option?.metadata?.discardIndex;
        if (discardIndex === undefined) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        const removed = removeCardFromDiscard(context.controller, Number(discardIndex));
        if (!removed.success || !removed.card) {
          return cleanup(removed, false);
        }
        addCreatureToBoard(context.controller, removed.card, { hasAction: false, exhausted: true });
        return cleanup({ success: true }, false);
      }
      case "storm_surge": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.controller) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        destroyCreature(option.metadata.controller, option.id);
        return cleanup({ success: true }, false);
      }
      case "chainlink": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const element = selection.optionId as Element;
        const opponent = (context.data?.opponent as "player" | "ai") ?? (context.controller === "player" ? "ai" : "player");
        const opponentBoard = get()[getBoardKey(opponent)];
        opponentBoard
          .filter((creature) => creature.element === element)
          .forEach((creature) => damageCreature(opponent, creature.instanceId, 75));
        return cleanup({ success: true }, false);
      }
      case "combustion": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.controller || !option.metadata?.targetType) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        if (option.metadata.targetType === "creature") {
          damageCreature(option.metadata.controller, option.id, 30);
        } else {
          damageShield(option.metadata.controller, option.id, 30);
        }
        return cleanup({ success: true }, true);
      }
      case "shielded_might": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.shieldId) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        const result = restoreShieldToOriginal(context.controller, option.metadata.shieldId);
        return cleanup(result, true);
      }
      case "sneaky_insight": {
        const opponent = (context.data?.opponent as "player" | "ai") ?? (context.controller === "player" ? "ai" : "player");
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        if (option.type === "rune") {
          const runeIndex = option.metadata?.runeIndex;
          if (typeof runeIndex !== "number") {
            return cleanup({ success: false, error: "Invalid rune selection" }, false);
          }
          revealRuneTemporarily(opponent, runeIndex);
        } else if (option.type === "shield") {
          const shieldId = option.metadata?.shieldId;
          if (!shieldId) {
            return cleanup({ success: false, error: "Invalid shield selection" }, false);
          }
          const shieldsKey = getShieldsKey(opponent);
          const updatedShields = get()[shieldsKey].map((shield) =>
            shield.id === shieldId ? { ...shield, faceDown: false } : shield
          );
          set({ [shieldsKey]: updatedShields } as Partial<GameState>);
        }
        return cleanup({ success: true }, true);
      }
      case "tidal_swap": {
        const stage = context.data?.stage ?? "discard";
        const controller = context.controller;
        if (stage === "discard") {
          if (selection.skip || !selection.optionId) {
            return cleanup({ success: true, skipped: true }, false);
          }
          const option = optionById(selection.optionId);
          if (!option) {
            return cleanup({ success: false, error: "Invalid selection" }, false);
          }
          const handIndex = Number(option.id);
          const element = option.metadata?.element as Element | undefined;
          const cardId = option.metadata?.cardId as string | undefined;
          if (Number.isNaN(handIndex) || !element || !cardId) {
            return cleanup({ success: false, error: "Invalid discard choice" }, false);
          }
          const discardResult = moveCardFromHandToDiscard(controller, handIndex);
          if (!discardResult.success) {
            return cleanup(discardResult, false);
          }
          const discardKey = getDiscardKey(controller);
          const discardPile = get()[discardKey];
          const retrieveOptions = discardPile
            .map((card, index) => ({ card, index }))
            .filter(({ card }) => card.cardType === "creature" && (card as CreatureCard).element === element && card.id !== cardId)
            .map(({ card, index }) => ({
              id: String(index),
              label: `${card.name}`,
              type: "card" as const,
              metadata: { discardIndex: index },
            }));
          if (retrieveOptions.length === 0) {
            return cleanup({ success: true }, true);
          }
          clearAbilityPrompt();
          enqueueAbilityPrompt(
            controller,
            context.sourceInstanceId ?? "",
            "Tidal Swap: Choose a creature of the same element from your discard to add to hand.",
            retrieveOptions,
            "single",
            true,
            { abilityId: context.abilityId, stage: "retrieve" }
          );
          return { success: true, awaitingResolution: true } as any;
        }
        if (stage === "retrieve") {
          if (selection.skip || !selection.optionId) {
            return cleanup({ success: true, skipped: true }, true);
          }
          const discardIndex = Number(selection.optionId);
          if (Number.isNaN(discardIndex)) {
            return cleanup({ success: false, error: "Invalid selection" }, false);
          }
          const removal = removeCardFromDiscard(controller, discardIndex);
          if (!removal.success || !removal.card) {
            return cleanup(removal, false);
          }
          addCardToHand(controller, removal.card);
          return cleanup({ success: true }, true);
        }
        return cleanup({ success: false, error: "Invalid ability stage" }, false);
      }
      case "galeas_grasp":
      case "ground_quake": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const option = optionById(selection.optionId);
        if (!option || !option.metadata?.controller) {
          return cleanup({ success: false, error: "Invalid selection" }, false);
        }
        const targetController = option.metadata.controller as "player" | "ai";
        const boardKey = getBoardKey(targetController);
        const currentBoard = get()[boardKey];
        const targetCreature = currentBoard.find((c) => c.instanceId === option.id);
        if (!targetCreature) {
          return cleanup({ success: false, error: "Target not found" }, false);
        }
        const shouldRefresh = targetCreature.exhausted || !targetCreature.hasAction;
        setCreatureExhausted(targetController, option.id, !shouldRefresh);
        return cleanup({ success: true }, true);
      }
      case "fiery_birth": {
        const stage = context.data?.stage ?? "sacrifice";
        const controller = context.controller;
        if (stage === "sacrifice") {
          if (selection.skip || !selection.optionId) {
            return cleanup({ success: true, skipped: true }, false);
          }
          const option = optionById(selection.optionId);
          if (!option || !option.metadata?.controller) {
            return cleanup({ success: false, error: "Invalid selection" }, false);
          }
          destroyCreature(controller, option.id);
          const handIndex = context.data?.handIndex as number | undefined;
          if (typeof handIndex !== "number") {
            return cleanup({ success: false, error: "Card index missing" }, false);
          }
          const handKey = getHandKey(controller);
          const hand = [...get()[handKey]];
          if (handIndex < 0 || handIndex >= hand.length) {
            return cleanup({ success: false, error: "Card not found" }, false);
          }
          const [card] = hand.splice(handIndex, 1);
          set({ [handKey]: hand } as Partial<GameState>);
          const summonResult = addCreatureToBoard(controller, card, { hasAction: true, exhausted: false });
          if (summonResult.success && summonResult.creature) {
            markCreatureAbilityUsed(controller, summonResult.creature.instanceId);
          }
          return cleanup({ success: true }, false);
        }
        return cleanup({ success: false, error: "Invalid ability stage" }, false);
      }
      case "pierce_overflow": {
        if (selection.skip || !selection.optionId) {
          return cleanup({ success: true, skipped: true }, false);
        }
        const overflow = context.data?.overflowDamage as number | undefined;
        const defenderController = context.data?.defenderController as "player" | "ai" | undefined;
        if (!overflow || !defenderController) {
          return cleanup({ success: false, error: "Overflow data missing" }, false);
        }
        const shieldId = selection.optionId as string;
        const attackerCreature = context.sourceInstanceId
          ? get()[getBoardKey(context.controller)].find((c) => c.instanceId === context.sourceInstanceId)
          : undefined;
        const shieldBefore = get()[getShieldsKey(defenderController)].find((shield) => shield.id === shieldId);
        const result = damageShield(defenderController, shieldId, overflow, true);
        if (context.data?.attackerHasEssenceWell && (result.damageDealt ?? 0) > 0) {
          grantEssence(context.controller, "water", 1);
        }
        if (attackerCreature && shieldBefore) {
          const damageValue = result.damageDealt ?? overflow;
          addLogEntry(
            context.controller,
            `${attackerCreature.name} directs overflow into ${defenderController === "player" ? "your" : "AI\'s"} ${shieldBefore.name} for ${damageValue} damage`,
            "attack"
          );
        }
        return cleanup({ success: true }, false);
      }
      default:
        return cleanup({ success: false, error: `Ability ${context.abilityId} not implemented` }, false);
    }
  },

  aiTurn: async () => {
    const state = get();
    if (state.currentTurn !== "ai" || state.gameStatus !== "playing") return;
    
    // Helper delay function
    const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
    
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
      activateCreatureAbility: (creatureInstanceId: string, abilityId: string) => {
        return get().activateCreatureAbility(creatureInstanceId, abilityId);
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
  };
});
