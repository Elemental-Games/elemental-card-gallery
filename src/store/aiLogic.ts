import { GameState, Card, BoardCreature, Element, EssencePool } from "../types/tcg";

// Helper function to check if AI can afford a card
export const canAffordCard = (card: Card, essence: EssencePool): boolean => {
  const elementEssence = essence[card.element as keyof typeof essence];
  const primaryOk = (card.cost || 0) <= elementEssence;
  
  const secondary = (card as any).secondaryCost as { element: Element; amount: number } | undefined;
  const secondaryOk = !secondary || secondary.amount <= essence[secondary.element];
  
  return primaryOk && secondaryOk;
};

// Find strongest creature on a board
export const findStrongestCreature = (board: BoardCreature[]): BoardCreature | null => {
  if (board.length === 0) return null;
  return board.reduce((strongest, current) => {
    const strongestValue = strongest.attack + strongest.currentHealth;
    const currentValue = current.attack + current.currentHealth;
    return currentValue > strongestValue ? current : strongest;
  });
};

// Find weakest shield (lowest health)
export const findWeakestShield = (shields: any[]): any | null => {
  if (shields.length === 0) return null;
  return shields.reduce((weakest, current) => {
    return current.currentHealth < weakest.currentHealth ? current : weakest;
  });
};

// Calculate creature value (attack + health per essence cost)
export const getCreatureValue = (creature: Card): number => {
  if (creature.cardType !== "creature") return 0;
  const c = creature as any;
  const totalStats = c.attack + c.health;
  const cost = c.cost || 1;
  return totalStats / cost;
};

// Find optimal element for Essence Generation (Lightning deck)
export const findOptimalEssenceGeneration = (hand: Card[], essence: EssencePool, deckType: "crystal" | "lightning"): Element => {
  if (deckType === "lightning") {
    // Find highest cost creature needing air or fire
    let maxAirCost = 0;
    let maxFireCost = 0;
    
    hand.forEach(card => {
      if (card.cardType === "creature") {
        const c = card as any;
        if (c.element === "air" && c.cost > maxAirCost) {
          maxAirCost = c.cost;
        }
        if (c.element === "fire" && c.cost > maxFireCost) {
          maxFireCost = c.cost;
        }
      }
    });
    
    // Choose element with higher cost creature, or whichever has less essence
    if (maxAirCost > maxFireCost) return "air";
    if (maxFireCost > maxAirCost) return "fire";
    return essence.air < essence.fire ? "air" : "fire";
  }
  
  // Default for crystal (shouldn't happen, but fallback)
  return "water";
};

// Check if AI has enough essence threshold (2+ in any element)
export const hasEssenceThreshold = (essence: EssencePool): boolean => {
  return essence.fire >= 2 || essence.water >= 2 || essence.earth >= 2 || essence.air >= 2;
};

// AI Draw Phase
export const aiDrawPhase = (getState: () => GameState, drawCard: (isPlayer: boolean) => any): boolean => {
  const state = getState();
  if (state.hasDrawnThisTurn) return false;
  
  const result = drawCard(false);
  return result?.success !== false;
};

// AI Generate Phase - already handled automatically in nextPhase()
export const aiGeneratePhase = (): boolean => {
  return true; // No action needed, generation happens automatically
};

// AI Main Phase 1 - Play runes/counters and summon creatures
export const aiMainPhase1 = async (
  getState: () => GameState,
  actions: {
    playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => any;
    equipRuneToCreature: (runeCard: any, creatureInstanceId: string, isPlayer: boolean, runeZoneIndex?: number) => any;
    generateEssenceFromRune: (element: Element, amount: number, isPlayer: boolean, runeZoneIndex?: number) => any;
    swapEssence: (fromElement: string, toElement: string, amount: number, isPlayer: boolean, runeZoneIndex?: number) => any;
    discardRuneFromZone: (isPlayer: boolean, runeZoneIndex: number) => void;
    summonDragonByTribute: (dragonCardIndex: number, tributeInstanceIds: string[]) => void;
  },
  delay: (ms: number) => Promise<void>
): Promise<boolean> => {
  const state = getState();
  const deckType = state.aiDeckType || "crystal";
  const hand = state.aiHand;
  const essence = state.aiEssence;
  const playerBoard = state.playerBoard;
  const aiBoard = state.aiBoard;
  const runeCounterZone = state.aiRuneCounterZone;
  
  // First, play runes/counters based on deck type
  if (deckType === "lightning") {
    // Lightning deck: Essence Generation (play immediately), Binding Coils (if opponent has creatures)
    
    // Find Essence Generation (always check fresh state after each play)
    let currentHand = getState().aiHand;
    let currentRuneZone = getState().aiRuneCounterZone;
    const essenceGenIndex = currentHand.findIndex(c => c.id === "essence_generation");
    if (essenceGenIndex !== -1) {
      // Find empty slot in rune counter zone
      const emptySlot = currentRuneZone.findIndex(slot => slot === null);
      if (emptySlot !== -1) {
        const result = actions.playCard(essenceGenIndex, false, "runeCounter", emptySlot);
        if (result?.needsEssenceGeneration) {
          await delay(1000); // Show card face-up for 1 second before activating
          const currentEssence = getState().aiEssence;
          const optimalElement = findOptimalEssenceGeneration(currentHand, currentEssence, deckType);
          actions.generateEssenceFromRune(optimalElement, 2, false, result.runeZoneIndex);
          await delay(500);
        }
      }
    }
    
    // Binding Coils: Only if opponent has creatures (check fresh state)
    currentHand = getState().aiHand;
    currentRuneZone = getState().aiRuneCounterZone;
    const currentPlayerBoard = getState().playerBoard;
    if (currentPlayerBoard.length > 0) {
      const bindingCoilsIndex = currentHand.findIndex(c => c.id === "binding_coils");
      if (bindingCoilsIndex !== -1) {
        const emptySlot = currentRuneZone.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
          const result = actions.playCard(bindingCoilsIndex, false, "runeCounter", emptySlot);
          if (result?.needsTarget && result.targetType === "creature") {
            await delay(1000); // Show card face-up for 1 second before activating
            const target = findStrongestCreature(currentPlayerBoard);
            if (target) {
              actions.equipRuneToCreature(result.cardToEquip, target.instanceId, false, result.runeZoneIndex);
              await delay(500);
            }
          }
        }
      }
    }
    
    // Draconic Adaptability: Only if can tribute (check fresh state)
    currentHand = getState().aiHand;
    currentRuneZone = getState().aiRuneCounterZone;
    const currentAiBoard = getState().aiBoard;
    const draconicIndex = currentHand.findIndex(c => c.id === "draconic_adaptability");
    if (draconicIndex !== -1) {
      const requiredElements: Element[] = ["air", "fire"];
      const hasAir = currentAiBoard.some(c => c.element === "air");
      const hasFire = currentAiBoard.some(c => c.element === "fire");
      if (hasAir && hasFire) {
        const emptySlot = currentRuneZone.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
          const result = actions.playCard(draconicIndex, false, "runeCounter", emptySlot);
          if (result?.draconicActivated) {
            await delay(1000); // Show card face-up for 1 second before activating
            actions.discardRuneFromZone(false, result.runeZoneIndex);
            await delay(500);
          }
        }
      }
    }
  } else {
    // Crystal deck: Essence Exchange (strategic), Essence Amplifier (whenever), Direct Assault (Main Phase 2)
    
    // Essence Amplifier: Play whenever available (check fresh state)
    let currentHand = getState().aiHand;
    let currentRuneZone = getState().aiRuneCounterZone;
    const currentAiBoard = getState().aiBoard;
    const amplifierIndex = currentHand.findIndex(c => c.id === "essence_amplifier");
    if (amplifierIndex !== -1 && currentAiBoard.length > 0) {
      const emptySlot = currentRuneZone.findIndex(slot => slot === null);
      if (emptySlot !== -1) {
        const result = actions.playCard(amplifierIndex, false, "runeCounter", emptySlot);
        if (result?.needsTarget && result.targetType === "creature") {
          await delay(1000); // Show card face-up for 1 second before activating
          const target = findStrongestCreature(currentAiBoard);
          if (target) {
            actions.equipRuneToCreature(result.cardToEquip, target.instanceId, false, result.runeZoneIndex);
            await delay(500);
          }
        }
      }
    }
    
    // Essence Exchange: Only if has high-cost creature needing element X, has 0 of X, has 3+ of Y (check fresh state)
    currentHand = getState().aiHand;
    currentRuneZone = getState().aiRuneCounterZone;
    const currentEssence = getState().aiEssence;
    const exchangeIndex = currentHand.findIndex(c => c.id === "essence_exchange");
    if (exchangeIndex !== -1) {
      // Find high-cost creature (3+) that AI can't afford
      const expensiveCreature = currentHand.find(c => {
        if (c.cardType !== "creature") return false;
        const cost = c.cost || 0;
        if (cost < 3) return false;
        return !canAffordCard(c, currentEssence);
      }) as any;
      
      if (expensiveCreature) {
        const neededElement = expensiveCreature.element;
        const neededAmount = expensiveCreature.cost || 0;
        
        // Check if AI has 0 of needed element but 3+ of another
        const hasNoneOfNeeded = currentEssence[neededElement as keyof typeof currentEssence] === 0;
        const hasEnoughElsewhere = Object.entries(currentEssence).some(([elem, amount]) => {
          if (elem === neededElement) return false;
          return amount >= neededAmount;
        });
        
        if (hasNoneOfNeeded && hasEnoughElsewhere) {
          // Find element with enough essence to swap
          const swapFromElement = Object.entries(currentEssence).find(([elem, amount]) => {
            if (elem === neededElement) return false;
            return amount >= neededAmount;
          })?.[0] as Element;
          
          if (swapFromElement) {
            const emptySlot = currentRuneZone.findIndex(slot => slot === null);
            if (emptySlot !== -1) {
              const result = actions.playCard(exchangeIndex, false, "runeCounter", emptySlot);
              if (result?.needsEssenceSwap) {
                await delay(1000); // Show card face-up for 1 second before activating
                actions.swapEssence(swapFromElement, neededElement, neededAmount, false, result.runeZoneIndex);
                await delay(500);
              }
            }
          }
        }
      }
    }
    
    // Draconic Adaptability: Only if can tribute (check fresh state)
    currentHand = getState().aiHand;
    currentRuneZone = getState().aiRuneCounterZone;
    const updatedAiBoard = getState().aiBoard;
    const draconicIndex = currentHand.findIndex(c => c.id === "draconic_adaptability");
    if (draconicIndex !== -1) {
      const requiredElements: Element[] = ["water", "earth"];
      const hasWater = updatedAiBoard.some(c => c.element === "water");
      const hasEarth = updatedAiBoard.some(c => c.element === "earth");
      if (hasWater && hasEarth) {
        const emptySlot = currentRuneZone.findIndex(slot => slot === null);
        if (emptySlot !== -1) {
          const result = actions.playCard(draconicIndex, false, "runeCounter", emptySlot);
          if (result?.draconicActivated) {
            await delay(1000); // Show card face-up for 1 second before activating
            actions.discardRuneFromZone(false, result.runeZoneIndex);
            await delay(500);
          }
        }
      }
    }
  }
  
  // Now summon creatures based on threshold rules
  // Need 2+ essence before summoning creatures costing 1-2
  // Can summon 3+ cost creatures as soon as affordable
  
  // Get updated state after rune plays
  const updatedState = getState();
  const updatedEssence = updatedState.aiEssence;
  const updatedHand = updatedState.aiHand;
  
  // Find creatures to summon, prioritizing by value
  const creatures = updatedHand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => card.cardType === "creature")
    .map(({ card, index }) => ({
      card: card as any,
      index,
      value: getCreatureValue(card),
      cost: card.cost || 0
    }))
    .sort((a, b) => {
      // Sort by value (attack+health per cost), then by rarity preference
      if (Math.abs(a.value - b.value) > 0.1) {
        return b.value - a.value;
      }
      // If similar value, prefer higher cost (stronger creatures)
      return b.cost - a.cost;
    });
  
  // Try to summon creatures aggressively
  // Note: We iterate through creatures but re-check state each time since indices shift after playing
  for (const { card } of creatures) {
    const currentState = getState();
    
    // Check if already summoned this turn
    if (currentState.hasNormalSummonedThisTurn) break;
    
    // Re-find card index in current hand (indices may have shifted)
    const currentHand = currentState.aiHand;
    const cardIndex = currentHand.findIndex(c => c.id === card.id);
    if (cardIndex === -1) continue; // Card no longer in hand
    
    const currentEssence = currentState.aiEssence;
    
    // Check if can afford
    if (!canAffordCard(card, currentEssence)) continue;
    
    // Threshold check: 
    // - 0-cost creatures can always be summoned (no threshold needed)
    // - Cost 1-2 creatures need 2+ essence of that element
    // - Cost 3+ creatures can be summoned as soon as affordable
    if (card.cost > 0 && card.cost <= 2) {
      const elementEssence = currentEssence[card.element as keyof typeof currentEssence];
      if (elementEssence < 2) continue;
    }
    
    // Check if Draconic Adaptability is active and this is a dragon
    const adaptState = currentState.aiDraconicAdapt;
    if (adaptState?.active && (card.id === "veton" || card.id === "diamoria")) {
      // For AI, try to use tribute if possible, otherwise use essence
      const requiredElements = adaptState.requiredElements;
      const aiBoard = currentState.aiBoard;
      const hasRequired = requiredElements.every(elem => 
        aiBoard.some(c => c.element === elem)
      );
      
      if (hasRequired) {
        // Use tribute - find one of each required element
        const creature1 = aiBoard.find(c => c.element === requiredElements[0]);
        const creature2 = aiBoard.find(c => c.element === requiredElements[1]);
        if (creature1 && creature2) {
          actions.summonDragonByTribute(cardIndex, [creature1.instanceId, creature2.instanceId]);
          await delay(600);
          break; // Can only summon once per turn
        }
      }
      // Otherwise fall through to normal essence summon
    }
    
    // Summon the creature
    const result = actions.playCard(cardIndex, false, "creature");
    if (result?.success !== false) {
      await delay(600);
      break; // Can only summon once per turn
    }
  }
  
  return true;
};

// AI Battle Phase
export const aiBattlePhase = async (
  getState: () => GameState,
  actions: {
    initiateAttack: (attackerId: string, targetId: string, targetType: "creature" | "shield" | "face", isPlayer: boolean) => any;
    handleDefenseResponse: (defenderId: string, responseType: "defend" | "dodge" | "block" | "none", attackerId: string, blockerId?: string, isPlayer: boolean) => any;
    setAIPhaseMessage: (message: string | null) => void;
  },
  delay: (ms: number) => Promise<void>
): Promise<boolean> => {
  await delay(500);
  
  const aiBoard = getState().aiBoard;
  const playerBoard = getState().playerBoard;
  const playerShields = getState().playerShields;
  
  // Find creatures with actions (not exhausted)
  const attackers = aiBoard.filter(c => c.hasAction && !c.exhausted);
  
  if (attackers.length === 0) {
    actions.setAIPhaseMessage("AI has no creatures with actions to attack");
    await delay(1500);
    actions.setAIPhaseMessage(null);
    return true; // No attackers, phase complete
  }
  
  // Attack with each creature that has an action
  for (const attacker of attackers) {
    await delay(500);
    
    // Get fresh state after each attack (creatures may have been destroyed)
    const currentState = getState();
    const freshPlayerBoard = currentState.playerBoard.filter(c => c.currentHealth > 0);
    const freshPlayerShields = currentState.playerShields.filter(s => s.currentHealth > 0);
    
    // Check if attacker still exists and has action (may have been destroyed in previous combat)
    const freshAttacker = currentState.aiBoard.find(c => c.instanceId === attacker.instanceId);
    if (!freshAttacker || !freshAttacker.hasAction || freshAttacker.exhausted) {
      continue; // Skip if attacker was destroyed or no longer has action
    }
    
    // Helper function to check if AI can kill a creature this turn
    const canKillCreatureThisTurn = (
      attacker: BoardCreature,
      defender: BoardCreature,
      remainingAttackers: BoardCreature[],
      aiHand: Card[]
    ): boolean => {
      const attackerStrength = attacker.strength || attacker.attack || 0;
      const attackerAgility = attacker.agility || 0;
      const defenderAgility = defender.agility || 0;
      const defenderStrength = defender.strength || defender.attack || 0;
      
      // Calculate defender health after this attack
      let defenderHealthAfterAttack = defender.currentHealth;
      
      if (attackerAgility > defenderAgility) {
        // Attacker goes first - defender takes damage immediately
        defenderHealthAfterAttack -= attackerStrength;
      } else {
        // Defender goes first - attacker might die before dealing damage
        const attackerHealthAfterDefenderAttack = (attacker.currentHealth || attackerStrength) - defenderStrength;
        if (attackerHealthAfterDefenderAttack <= 0) {
          // Attacker dies before dealing damage, can't kill defender
          return false;
        }
        // Attacker survives and deals damage
        defenderHealthAfterAttack -= attackerStrength;
      }
      
      // If defender dies from this attack alone, we can kill it
      if (defenderHealthAfterAttack <= 0) {
        return true;
      }
      
      // Check if we have follow-up attacks that can finish it
      const remainingDamage = remainingAttackers
        .filter(a => a.instanceId !== attacker.instanceId && a.hasAction && !a.exhausted)
        .map(a => a.strength || a.attack || 0)
        .reduce((sum, damage) => sum + damage, 0);
      
      if (remainingDamage >= defenderHealthAfterAttack) {
        return true;
      }
      
      // Check if we have Direct Assault (50 damage) that can finish it
      const hasDirectAssault = aiHand.some(c => c.id === "direct_assault");
      if (hasDirectAssault && (remainingDamage + 50) >= defenderHealthAfterAttack) {
        return true;
      }
      
      return false;
    };
    
    // Determine best target: weakest creature, weakest shield, or face
    let bestTarget: { id: string; type: "creature" | "shield" | "face"; name?: string } | null = null;
    
    // If no shields, can attack face
    if (freshPlayerShields.length === 0) {
      bestTarget = { id: "face", type: "face", name: "face" };
    } else {
      // Find remaining attackers (excluding current one)
      const remainingAttackers = currentState.aiBoard.filter(
        c => c.hasAction && !c.exhausted && c.instanceId !== freshAttacker.instanceId
      );
      
      // Find creatures we can kill this turn
      const killableCreatures = freshPlayerBoard.filter(defender => {
        return canKillCreatureThisTurn(
          freshAttacker,
          defender,
          remainingAttackers,
          currentState.aiHand
        );
      });
      
      // Prefer attacking killable creatures first
      const weakestKillableCreature = killableCreatures
        .sort((a, b) => a.currentHealth - b.currentHealth)[0];
      
      // Or weakest shield
      const weakestShield = freshPlayerShields
        .filter(s => s.currentHealth > 0)
        .sort((a, b) => a.currentHealth - b.currentHealth)[0];
      
      if (weakestKillableCreature && weakestShield) {
        // Prefer killable creature over shield
        bestTarget = { 
          id: weakestKillableCreature.instanceId, 
          type: "creature", 
          name: weakestKillableCreature.name 
        };
      } else if (weakestKillableCreature) {
        bestTarget = { 
          id: weakestKillableCreature.instanceId, 
          type: "creature", 
          name: weakestKillableCreature.name 
        };
      } else if (weakestShield) {
        // Only attack shield if no killable creatures
        bestTarget = { id: weakestShield.id, type: "shield", name: weakestShield.name };
      } else {
        // No valid targets, skip this attacker
        continue;
      }
    }
    
      if (bestTarget) {
        // Verify target still exists before attacking
        let targetStillExists = false;
        if (bestTarget.type === "face") {
          targetStillExists = true; // Face always exists
        } else if (bestTarget.type === "creature") {
          targetStillExists = freshPlayerBoard.some(c => c.instanceId === bestTarget.id && c.currentHealth > 0);
        } else if (bestTarget.type === "shield") {
          targetStillExists = freshPlayerShields.some(s => s.id === bestTarget.id && s.currentHealth > 0);
        }
        
        if (!targetStillExists) {
          // Target was destroyed, skip this attacker
          continue;
        }
        
        // Announce the attack
        const targetName = bestTarget.type === "face" ? "you directly" : bestTarget.name;
        actions.setAIPhaseMessage(`AI's ${freshAttacker.name} attacks ${targetName}!`);
        await delay(1500);
        
        const result = actions.initiateAttack(freshAttacker.instanceId, bestTarget.id, bestTarget.type, false);
        
        if (result && result.success) {
          // Handle defense response if needed
          if (result.requiresResponse) {
            // Wait for player's defense response to be resolved
            // Poll until pendingDefenseResponse is cleared (player made their choice)
            let waitCount = 0;
            const maxWaitTime = 300000; // 5 minutes max wait (should never happen, but safety)
            while (getState().pendingDefenseResponse && waitCount < maxWaitTime) {
              await delay(100); // Check every 100ms
              waitCount += 100;
            }
            
            // Clear the message after player's choice
            actions.setAIPhaseMessage(null);
            await delay(500);
            
            // Continue to next attacker (the actual resolution happened in handleDefenseResponse)
            continue;
          } else if (result.exhaustedTarget) {
            actions.setAIPhaseMessage(`Attacked exhausted creature! Dealt ${result.damage} damage.`);
            await delay(1500);
          } else if (bestTarget.type === "shield") {
            if (result.destroyed) {
              actions.setAIPhaseMessage(`Shield destroyed!`);
            } else {
              actions.setAIPhaseMessage(`Shield took ${result.damage} damage!`);
            }
            await delay(1500);
          } else if (bestTarget.type === "face") {
            actions.setAIPhaseMessage(`Direct attack! Dealt ${result.damage} damage!`);
            await delay(1500);
          }
        }
        
        // Clear message before next attack (only if not waiting for response)
        if (!result.requiresResponse) {
          actions.setAIPhaseMessage(null);
          await delay(300);
        }
      }
    }
  
  return true;
};

// AI Main Phase 2 - Complete remaining actions
export const aiMainPhase2 = async (
  getState: () => GameState,
  actions: {
    playCard: (cardIndex: number, isPlayer: boolean, zoneType?: string, zoneIndex?: number) => any;
    dealDamageToTarget: (targetId: string, targetType: "creature" | "shield", damage: number, isPlayer: boolean, runeZoneIndex?: number) => any;
  },
  delay: (ms: number) => Promise<void>
): Promise<boolean> => {
  const state = getState();
  const deckType = state.aiDeckType || "crystal";
  
  // Crystal deck: Use Direct Assault in Main Phase 2
  if (deckType === "crystal") {
    const currentHand = getState().aiHand;
    const directAssaultIndex = currentHand.findIndex(c => c.id === "direct_assault");
    if (directAssaultIndex !== -1) {
      const currentRuneZone = getState().aiRuneCounterZone;
      const emptySlot = currentRuneZone.findIndex(slot => slot === null);
      if (emptySlot !== -1) {
        const result = actions.playCard(directAssaultIndex, false, "runeCounter", emptySlot);
        if (result?.needsTarget && result.targetType === "creatureOrShield") {
          await delay(1000); // Show card face-up for 1 second before activating
          const playerBoard = getState().playerBoard;
          const playerShields = getState().playerShields;
          
          // Target strongest creature or weakest shield
          const strongestCreature = findStrongestCreature(playerBoard);
          const weakestShield = findWeakestShield(playerShields);
          
          if (strongestCreature) {
            actions.dealDamageToTarget(strongestCreature.instanceId, "creature", result.damage || 50, false, result.runeZoneIndex);
            await delay(500);
          } else if (weakestShield) {
            actions.dealDamageToTarget(weakestShield.id, "shield", result.damage || 50, false, result.runeZoneIndex);
            await delay(500);
          }
        }
      }
    }
  }
  
  // Try to summon any remaining creatures if didn't summon in Main Phase 1
  const currentState = getState();
  if (!currentState.hasNormalSummonedThisTurn) {
    const hand = currentState.aiHand;
    const essence = currentState.aiEssence;
    
    if (hasEssenceThreshold(essence)) {
      const creatures = hand
        .map((card, index) => ({ card, index }))
        .filter(({ card }) => card.cardType === "creature")
        .map(({ card, index }) => ({
          card: card as any,
          index,
          value: getCreatureValue(card),
          cost: card.cost || 0
        }))
        .sort((a, b) => b.value - a.value);
      
      for (const { card } of creatures) {
        // Re-find index in case hand changed
        const cardIndex = getState().aiHand.findIndex(c => c.id === card.id);
        if (cardIndex === -1) continue;
        
        const currentEssence = getState().aiEssence;
        if (!canAffordCard(card, currentEssence)) continue;
        
        if (card.cost <= 2) {
          const elementEssence = currentEssence[card.element as keyof typeof currentEssence];
          if (elementEssence < 2) continue;
        }
        
        const result = actions.playCard(cardIndex, false, "creature");
        if (result?.success !== false) {
          await delay(600);
          break;
        }
      }
    }
  }
  
  return true;
};

// AI End Phase - auto-advance
export const aiEndPhase = (): boolean => {
  return true; // Just advance to next turn
};

