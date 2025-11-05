import React, { useEffect, useState } from "react";
import { useGameStore } from "../store/gameStore";
import Card from "./TCGCard";
import Battlefield from "./TCGBattlefield";
import Hand from "./TCGHand";
import HealthBar from "./TCGHealthBar";
import GameOver from "./TCGGameOver";

// Element icons - silver versions from new-marketing folder
const elementIcons = {
  fire: "/images/cards/new-marketing/fire silver.webp",
  water: "/images/cards/new-marketing/water silver.webp",
  earth: "/images/cards/new-marketing/earth silver.webp",
  air: "/images/cards/new-marketing/air silver.webp",
};

const phaseNames = {
  draw: "Draw Phase",
  generate: "Generate Phase",
  main1: "Main Phase 1",
  battle: "Battle Phase",
  main2: "Main Phase 2",
  end: "End Phase",
};

export default function GameBoard({ playerDeck = "crystal", playerGoesFirst = true }) {
  const {
    gameStatus,
    playerHealth,
    aiHealth,
    currentTurn,
    currentPhase,
    turnNumber,
    playerBoard,
    aiBoard,
    playerHand,
    aiHand,
    playerDeck: pDeck,
    aiDeck,
    playerEssence,
    aiEssence,
    playerRuneCounterZone,
    aiRuneCounterZone,
    playerDiscard,
    aiDiscard,
    playerShields: storePlayerShields,
    aiShields: storeAiShields,
    aiPhaseMessage,
    pendingDefenseResponse,
    initializeGame,
    drawCard,
    nextPhase,
    playCard,
    equipRuneToCreature,
    swapEssence,
    discardRuneFromZone,
    summonDragonByTribute,
    dealDamageToTarget,
    initiateAttack,
    handleDefenseResponse,
    refreshCreatureActions,
    endTurn,
    aiTurn,
    concede,
    resetGame,
  } = useGameStore();

  const [gameInitialized, setGameInitialized] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [phaseMessage, setPhaseMessage] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [targetingMode, setTargetingMode] = useState(null); // { cardToEquip, cardIndex, targetType, damage, runeZoneIndex }
  const [essenceSwapMode, setEssenceSwapMode] = useState(null); // { runeZoneIndex, step, fromElement, amount }
  const [essenceGenMode, setEssenceGenMode] = useState(null); // { runeZoneIndex, amount }
  const [dragonChoice, setDragonChoice] = useState(null); // { dragonIndex, requiredElements }
  const [dragonTributeMode, setDragonTributeMode] = useState(null); // { dragonIndex, requiredElements, selectedIds: [] }
  const [dragonConfirmTribute, setDragonConfirmTribute] = useState(null); // { dragonIndex, selectedIds }
  const [battleMode, setBattleMode] = useState(null); // { attackerId } | null - when selecting target
  const [defenseResponseMode, setDefenseResponseMode] = useState(null); // { attackerId, defenderId, canDodge, potentialBlockers } | null

  // Compute the next phase label for the action button
  const phaseOrder = ["draw", "generate", "main1", "battle", "main2", "end"];
  const currentIndex = phaseOrder.indexOf(currentPhase);
  let nextPhaseKey = currentIndex >= 0 && currentIndex < phaseOrder.length - 1
    ? phaseOrder[currentIndex + 1]
    : "draw"; // After end phase, next turn starts at draw

  // Turn 1 rule: the first player's first turn skips battle -> show Main Phase 2
  if (turnNumber === 1 && currentPhase === "main1" && currentTurn === "player") {
    nextPhaseKey = "main2";
  }
  const nextPhaseLabel = currentPhase === "end"
    ? "Pass Turn"
    : (phaseNames[nextPhaseKey] || "Next Phase");

  // Determine AI deck (opposite of player)
  const aiDeckType = playerDeck === "crystal" ? "lightning" : "crystal";

  useEffect(() => {
    if (!gameInitialized && gameStatus === "setup") {
      initializeGame(playerDeck, aiDeckType, playerGoesFirst);
      setGameInitialized(true);
    }
  }, [gameInitialized, gameStatus, initializeGame, playerDeck, aiDeckType, playerGoesFirst]);

  useEffect(() => {
    if (currentTurn === "ai" && gameStatus === "playing") {
      // Call AI turn logic which handles all phases
      const timer = setTimeout(() => {
        aiTurn();
      }, 500); // Small delay for visual feedback
      return () => clearTimeout(timer);
    }
  }, [currentTurn, currentPhase, gameStatus, aiTurn]);

  const handleCardSelect = (card, index) => {
    if (currentTurn !== "player") return;
    if (currentPhase !== "main1" && currentPhase !== "main2") return;
    
    if (selectedCardIndex === index) {
      // Deselect if clicking the same card
      setSelectedCard(null);
      setSelectedCardIndex(null);
    } else {
      setSelectedCard(card);
      setSelectedCardIndex(index);
    }
  };

  const handleZoneClick = (zoneType, index = null) => {
    if (!selectedCard || currentTurn !== "player") return;
    
    // Check if card type matches zone type
    const isValidPlacement = 
      (zoneType === "creature" && selectedCard.cardType === "creature") ||
      (zoneType === "runeCounter" && (selectedCard.cardType === "rune" || selectedCard.cardType === "counter")) ||
      (zoneType === "shield" && selectedCard.cardType === "shield");
    
    if (isValidPlacement) {
      // Intercept dragon summon when Draconic Adaptability is active to provide choice
      if (
        zoneType === "creature" &&
        selectedCard.cardType === "creature" &&
        (selectedCard.id === "veton" || selectedCard.id === "diamoria") &&
        (useGameStore.getState().playerDraconicAdapt?.active)
      ) {
        const required = useGameStore.getState().playerDraconicAdapt.requiredElements;
        setDragonChoice({ dragonIndex: selectedCardIndex, requiredElements: required });
        return;
      }
      const result = playCard(selectedCardIndex, true, zoneType, index);
      if (result && !result.success) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      } else if (result && result.needsTarget) {
        // Enter targeting mode for equipment rune cards or Direct Assault
        setTargetingMode({
          cardToEquip: result.cardToEquip,
          cardIndex: result.cardIndex,
          targetType: result.targetType,
          damage: result.damage,
          runeZoneIndex: result.runeZoneIndex
        });
        if (result.targetType === "creature") {
          if (selectedCard.id === "binding_coils") {
            setPhaseMessage("Select any creature to exhaust with Binding Coils");
          } else {
            setPhaseMessage("Select a creature to equip Essence Amplifier");
          }
        } else if (result.targetType === "creatureOrShield") {
          setPhaseMessage("Select an opponent's creature or shield to deal 50 damage");
        }
      } else if (result && result.needsEssenceSwap) {
        // Enter essence swap mode for Essence Exchange
        setEssenceSwapMode({
          runeZoneIndex: result.runeZoneIndex,
          step: 1, // Step 1: select element to swap FROM
          fromElement: null,
          amount: 0
        });
      } else if (result && result.draconicActivated) {
        setPhaseMessage("Draconic Adaptability activated!");
        setTimeout(() => {
          setPhaseMessage("");
          discardRuneFromZone(true, result.runeZoneIndex);
        }, 1200);
      } else if (result && result.needsEssenceGeneration) {
        setEssenceGenMode({ runeZoneIndex: result.runeZoneIndex, amount: result.amount || 2 });
      } else {
        setSelectedCard(null);
        setSelectedCardIndex(null);
      }
    }
  };
  
  const handleCreatureClick = (creature, isPlayerCreature) => {
    // Battle Phase: Select attacker or target
    if (currentPhase === "battle" && currentTurn === "player") {
      // IMPORTANT: Handle opponent creature clicks FIRST to prevent them from matching player creature logic
      // Select target (opponent creature, shield, or face)
      if (!isPlayerCreature && battleMode) {
        // Explicitly ensure this is an opponent creature attack
        const result = initiateAttack(battleMode.attackerId, creature.instanceId, "creature", true);
        if (!result) {
          setErrorMessage("Attack failed - no result returned");
          setTimeout(() => setErrorMessage(""), 2000);
          return; // Early return - do NOT process any player creature logic
        }
        if (result.success) {
          if (result.requiresResponse) {
            // AI creature is being attacked - AI makes decision automatically
            // Find the defender (AI creature)
            const defender = aiBoard.find(c => c.instanceId === result.defenderId);
            if (defender) {
              const attacker = playerBoard.find(c => c.instanceId === result.attackerId);
              const attackerAgility = attacker?.agility || 0;
              const defenderAgility = defender.agility || 0;
              
              // Check for potential blockers
              const potentialBlockers = result.potentialBlockers || [];
              
              // AI decision logic: Dodge if possible, otherwise defend
              let defenseType = "defend";
              let blockerId = undefined;
              
              // Check if defender can dodge (higher agility and has action)
              if (defenderAgility > attackerAgility && defender.hasAction && !defender.exhausted) {
                // Defender can and should dodge
                defenseType = "dodge";
              }
              // Try to find a good blocker (AI prefers protecting weaker creatures)
              else if (potentialBlockers.length > 0) {
                // For now, AI will always defend (can improve logic later)
                defenseType = "defend";
              }
              
              // Execute AI's defense decision
              const defenseResult = handleDefenseResponse(
                result.defenderId,
                defenseType,
                result.attackerId,
                blockerId,
                false // isPlayer = false (AI's creature)
              );
              
              if (defenseResult && defenseResult.success) {
                // Show result message
                if (defenseResult.dodged) {
                  setPhaseMessage(`AI's ${defender.name} dodged! Attack missed, both creatures exhausted.`);
                } else if (defenseResult.blocked) {
                  setPhaseMessage(`AI blocked with a creature! ${defenseResult.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${defenseResult.damage} damage`}`);
                } else {
                  // Combat resolved
                  let message = "Combat resolved! ";
                  if (defenseResult.attackerDestroyed && defenseResult.defenderDestroyed) {
                    message += "Both creatures destroyed!";
                  } else if (defenseResult.attackerDestroyed) {
                    message += `Your ${attacker?.name} destroyed! AI's ${defender.name} survives.`;
                  } else if (defenseResult.defenderDestroyed) {
                    message += `AI's ${defender.name} destroyed! Your ${attacker?.name} survives.`;
                  } else {
                    message += `${attacker?.name} (${defenseResult.attackerHealth} HP) vs ${defender.name} (${defenseResult.defenderHealth} HP)`;
                  }
                  setPhaseMessage(message);
                }
                setTimeout(() => setPhaseMessage(""), 3000);
                setBattleMode(null); // Clear battle mode after successful defense resolution
              } else if (defenseResult && defenseResult.error) {
                // Handle defense response error
                setErrorMessage(defenseResult.error);
                setTimeout(() => setErrorMessage(""), 3000);
                // Don't clear battleMode on error - let user try again
              } else {
                // Unexpected error
                setErrorMessage("Failed to resolve defense response");
                setTimeout(() => setErrorMessage(""), 3000);
              }
            } else {
              // Defender not found
              setErrorMessage("Defender not found");
              setTimeout(() => setErrorMessage(""), 3000);
            }
          } else if (result.exhaustedTarget) {
            setPhaseMessage(`Attacked exhausted creature! Dealt ${result.damage} damage`);
            setTimeout(() => setPhaseMessage(""), 2000);
            setBattleMode(null);
          } else {
            // Attack succeeded without requiring response (e.g., shield or face attack)
            setBattleMode(null);
          }
        } else if (result.error) {
          setErrorMessage(result.error);
          setTimeout(() => setErrorMessage(""), 3000);
          // Don't clear battleMode on error - let user try again
        }
        // CRITICAL: Early return here - opponent creature clicks should NEVER reach player creature logic
        return;
      }
      
      // Select attacker (player creature with action) - ONLY reached for player creatures
      // CRITICAL: Double-check we're NOT processing an opponent creature
      if (isPlayerCreature && !battleMode) {
        if (!creature.hasAction || creature.exhausted) {
          setErrorMessage("This creature does not have an action");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }
        setBattleMode({ attackerId: creature.instanceId });
        setPhaseMessage(`Select target for ${creature.name} (click again to deselect)`);
        setTimeout(() => setPhaseMessage(""), 2000);
        return;
      }
      
      // If clicking a different player creature while in battle mode, change attacker
      // CRITICAL: Double-check we're NOT processing an opponent creature
      if (isPlayerCreature && battleMode && battleMode.attackerId !== creature.instanceId) {
        if (!creature.hasAction || creature.exhausted) {
          setErrorMessage("This creature does not have an action");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }
        setBattleMode({ attackerId: creature.instanceId });
        setPhaseMessage(`Select target for ${creature.name} (click again to deselect)`);
        setTimeout(() => setPhaseMessage(""), 2000);
        return;
      }
      
      // Deselect attacker if clicking the same creature again
      // CRITICAL: Double-check we're NOT processing an opponent creature - this should NEVER deselect on opponent click
      if (isPlayerCreature && battleMode && battleMode.attackerId === creature.instanceId) {
        setBattleMode(null);
        setPhaseMessage("");
        return;
      }
      
      // Safety check: If we somehow got here with an opponent creature, do nothing
      if (!isPlayerCreature && battleMode) {
        console.warn("Opponent creature click reached player creature logic - this should not happen!");
        return;
      }
    }
    
    // Defense Response Mode: Select blocker
    if (defenseResponseMode && isPlayerCreature) {
      const blocker = defenseResponseMode.potentialBlockers.find(b => b.instanceId === creature.instanceId);
      if (blocker) {
        const result = handleDefenseResponse(
          defenseResponseMode.defenderId,
          "block",
          defenseResponseMode.attackerId,
          blocker.instanceId,
          true
        );
        if (result && result.success) {
          setPhaseMessage(`${creature.name} blocked! ${result.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${result.damage} damage`}`);
          setTimeout(() => setPhaseMessage(""), 2000);
          setDefenseResponseMode(null);
        } else if (result && result.error) {
          setErrorMessage(result.error);
          setTimeout(() => setErrorMessage(""), 3000);
        }
        return;
      }
    }
    
    // Tribute mode for dragon
    if (dragonTributeMode && isPlayerCreature) {
      const { selectedIds, requiredElements } = dragonTributeMode;
      const alreadySelected = selectedIds.includes(creature.instanceId);
      let next = selectedIds;
      if (alreadySelected) {
        next = selectedIds.filter(id => id !== creature.instanceId);
      } else if (selectedIds.length < 2) {
        // enforce element uniqueness according to requiredElements
        const selectedCreatures = useGameStore.getState().playerBoard.filter(c => selectedIds.includes(c.instanceId));
        // allow if creature's element is one of the remaining required
        const remaining = requiredElements.filter(e => !selectedCreatures.some(c => c.element === e));
        if (remaining.includes(creature.element)) {
          next = [...selectedIds, creature.instanceId];
        } else {
          setErrorMessage("Select one of each required element");
          setTimeout(() => setErrorMessage(""), 1500);
          return;
        }
      }
      setDragonTributeMode({ ...dragonTributeMode, selectedIds: next });
      // If two chosen, ask for confirmation before tributing
      if (next.length === 2) {
        setDragonConfirmTribute({ dragonIndex: dragonTributeMode.dragonIndex, selectedIds: next });
        return;
      }
    }
    // If in targeting mode for equipment rune
    if (targetingMode && targetingMode.targetType === "creature") {
      const result = equipRuneToCreature(
        targetingMode.cardToEquip, 
        creature.instanceId, 
        true, 
        targetingMode.runeZoneIndex
      );
      if (result && result.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        if (targetingMode.cardToEquip?.id === "binding_coils") {
          setPhaseMessage("Creature exhausted by Binding Coils!");
        } else {
          setPhaseMessage("Essence Amplifier equipped!");
        }
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
    // If in targeting mode for Direct Assault (can only target opponent creatures)
    else if (targetingMode && targetingMode.targetType === "creatureOrShield" && !isPlayerCreature) {
      const result = dealDamageToTarget(
        creature.instanceId,
        "creature",
        targetingMode.damage || 50,
        true,
        targetingMode.runeZoneIndex
      );
      if (result && result.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        setPhaseMessage(result.destroyed ? "Creature destroyed!" : `Dealt ${targetingMode.damage} damage!`);
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const handleShieldClick = (shield, isPlayerShield) => {
    // Battle Phase: Attack shield
    if (currentPhase === "battle" && currentTurn === "player" && battleMode && !isPlayerShield) {
      const result = initiateAttack(battleMode.attackerId, shield.id, "shield", true);
      if (result && result.success) {
        setPhaseMessage(result.destroyed ? "Shield destroyed!" : `Dealt ${result.damage} damage to shield!`);
        setTimeout(() => setPhaseMessage(""), 2000);
        setBattleMode(null);
      } else if (result && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
      return;
    }
    
    // If in targeting mode for Direct Assault (can only target opponent shields)
    if (targetingMode && targetingMode.targetType === "creatureOrShield" && !isPlayerShield) {
      const result = dealDamageToTarget(
        shield.id,
        "shield",
        targetingMode.damage || 50,
        true,
        targetingMode.runeZoneIndex
      );
      if (result && result.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        setPhaseMessage(result.destroyed ? "Shield destroyed!" : `Dealt ${targetingMode.damage} damage to shield!`);
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const handleDeckClick = () => {
    if (currentTurn === "player" && currentPhase === "draw") {
      const result = drawCard(true);
      if (result && result.success === false) {
        setErrorMessage(result.error || "Cannot draw right now");
        setTimeout(() => setErrorMessage(""), 2000);
        return;
      }
      // Move to generate phase
      setTimeout(() => {
        handleGenerate();
      }, 500);
    }
  };

  const handleGenerate = () => {
    // First, advance to generate phase to trigger essence generation in the store
    const result = nextPhase();
    
    // Use the generation data returned from the store (which includes Essence Amplifier effects and base generation)
    const generation = result?.generated || { fire: 0, water: 0, earth: 0, air: 0 };

    // Build message
    const elementNames = { fire: "🔥 Fire", water: "💧 Water", earth: "🌿 Earth", air: "💨 Air" };
    const generatedElements = [];
    Object.entries(generation).forEach(([element, count]) => {
      if (count > 0) {
        generatedElements.push(`${elementNames[element]}: +${count}`);
      }
    });

    const totalGenerated = Object.values(generation).reduce((a, b) => a + b, 0);
    let message = "";
    if (totalGenerated > 0) {
      message = `Generated Essence!\n${generatedElements.join(", ")}`;
    } else {
      message = "No creatures on field - No essence generated!";
    }
    message += "\n\nMoving to Main Phase 1...";

    setPhaseMessage(message);
    
    // Auto-advance to main1 after showing message
    setTimeout(() => {
      setPhaseMessage("");
      nextPhase(); // Move from generate to main1
    }, 2500);
  };

  // Reset battle mode when leaving battle phase
  useEffect(() => {
    if (currentPhase !== "battle") {
      setBattleMode(null);
      setDefenseResponseMode(null);
    }
  }, [currentPhase]);
  
  // Watch for pending defense response from AI attacks
  useEffect(() => {
    if (pendingDefenseResponse && currentTurn === "ai" && currentPhase === "battle") {
      setDefenseResponseMode(pendingDefenseResponse);
    }
  }, [pendingDefenseResponse, currentTurn, currentPhase]);

  const getZoneHighlight = (zoneType, index = null) => {
    // Battle Phase: Highlight valid targets (opponent creatures, shields, or face)
    if (currentPhase === "battle" && currentTurn === "player" && battleMode) {
      if (zoneType === "opponentCreature" || zoneType === "opponentShield") {
        return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
      }
      return ""; // Don't darken other zones
    }
    
    // If in targeting mode for equipment rune, highlight creature zones
    if (targetingMode && targetingMode.targetType === "creature") {
      if (zoneType === "creature") {
        return "ring-4 ring-yellow-400 ring-opacity-90 shadow-2xl shadow-yellow-400/70 brightness-125";
      }
      return ""; // Don't darken other zones in targeting mode
    }
    
    // If in targeting mode for Direct Assault, highlight opponent creatures and shields
    if (targetingMode && targetingMode.targetType === "creatureOrShield") {
      if (zoneType === "opponentCreature" || zoneType === "opponentShield") {
        return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
      }
      return ""; // Don't darken other zones
    }
    
    // If in dragon tribute mode, highlight player's creature zone
    if (dragonTributeMode && zoneType === "creature") {
      return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
    }

    // Normal card selection mode
    if (!selectedCard) return "";
    
    const cardType = selectedCard.cardType;
    
    // Glow for valid zones
    if (zoneType === "creature" && cardType === "creature") {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }
    if (zoneType === "runeCounter" && (cardType === "rune" || cardType === "counter")) {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }
    if (zoneType === "shield" && cardType === "shield") {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }
    
    // Darken for invalid zones
    return "opacity-40 brightness-50";
  };

  if (gameStatus === "player_won" || gameStatus === "ai_won") {
    return <GameOver result={gameStatus} onReset={resetGame} playerDeck={playerDeck} />;
  }

  return (
    <div className="w-full h-screen text-white overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900/30 to-slate-900 flex">
      
      {/* Left Sidebar - Essence Display */}
      <div className="flex-none w-32 bg-black/40 border-r border-white/10 p-4 flex flex-col gap-8">
        <div className="text-center">
          <h3 className="text-xs font-bold text-white/70 mb-2">AI ESSENCE</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(elementIcons).map(([element, iconPath]) => (
              <div key={element} className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                <img src={iconPath} alt={element} className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold">{aiEssence[element]}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-xs font-bold text-white/70 mb-2">YOUR ESSENCE</h3>
          <div className="flex flex-col gap-2">
            {Object.entries(elementIcons).map(([element, iconPath]) => (
              <div key={element} className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                <img src={iconPath} alt={element} className="w-10 h-10 object-contain" />
                <span className="text-xl font-bold">{playerEssence[element]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col">
        
        {/* AI Header */}
        <div className="flex-none flex items-center justify-between bg-gradient-to-r from-blue-900/50 to-blue-800/50 backdrop-blur px-6 py-2 border-b border-blue-500/30">
          <div className="flex items-center gap-4">
            <span className="text-xl">{aiDeckType === "crystal" ? "💎" : "⚡"}</span>
            <div>
              <h2 className="text-lg font-bold">AI Opponent</h2>
              <p className="text-sm text-blue-300">{aiDeckType === "crystal" ? "Crystal" : "Lightning"}</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">Hand:</span>
              <span className="text-lg font-bold">{aiHand.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">HP:</span>
              <span className="text-xl font-bold text-green-400">{aiHealth}/500</span>
            </div>
          </div>
        </div>

        {/* Game Area - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full flex flex-col p-6 gap-4">
            
            {/* AI Field */}
            <div className="flex gap-4">
              {/* AI Zones (Left Side) */}
              <div className="flex-1 flex flex-col gap-3">
                {/* AI Shield Zone (3 slots) */}
                <div className={`bg-purple-900/20 rounded-lg border border-purple-500/30 p-3 transition-all duration-300 ${getZoneHighlight("opponentShield")}`}>
                  <div className="text-xs text-purple-300 font-semibold mb-2 uppercase">Shield Zone</div>
                  <div className="flex gap-3 justify-center">
                    {storeAiShields.map((shield, i) => (
                      <ShieldCard 
                        key={i} 
                        shield={shield} 
                        isPlayer={false}
                        onClick={handleShieldClick}
                        highlight={
                          (targetingMode && targetingMode.targetType === "creatureOrShield") || 
                          (currentPhase === "battle" && currentTurn === "player" && battleMode)
                            ? "ring-2 ring-red-400 cursor-pointer" 
                            : ""
                        }
                      />
                    ))}
                  </div>
                  {/* Face Attack Button - Only show when no shields remain and in battle mode */}
                  {currentPhase === "battle" && currentTurn === "player" && battleMode && storeAiShields.length === 0 && (
                    <button
                      onClick={() => {
                        const result = initiateAttack(battleMode.attackerId, "face", "face", true);
                        if (result && result.success) {
                          setPhaseMessage(`Direct attack! Dealt ${result.damage} damage!`);
                          setTimeout(() => setPhaseMessage(""), 2000);
                          setBattleMode(null);
                        } else if (result && result.error) {
                          setErrorMessage(result.error);
                          setTimeout(() => setErrorMessage(""), 3000);
                        }
                      }}
                      className="mt-2 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-sm transition-all ring-2 ring-red-400"
                    >
                      ⚔️ Attack Face Directly
                    </button>
                  )}
                </div>

                {/* AI Rune/Counter Zone (5 slots) */}
                <div className={`bg-indigo-900/20 rounded-lg border border-indigo-500/30 p-3 transition-all duration-300`}>
                  <div className="text-xs text-indigo-300 font-semibold mb-2 uppercase">Rune/Counter Zone</div>
                  <div className="flex gap-3 justify-center">
                    {aiRuneCounterZone.map((card, i) => (
                      <div 
                        key={i} 
                        className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30"
                      >
                        {card ? (
                          <img src="/Card_Back.png" alt="Face-down card" className="w-full h-full object-cover rounded" />
                        ) : (
                          i + 1
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Creature Zone (5 slots) */}
                <div className={`bg-blue-900/20 rounded-lg border border-blue-500/30 p-3 transition-all duration-300 ${getZoneHighlight("opponentCreature")}`}>
                  <div className="text-xs text-blue-300 font-semibold mb-2 uppercase">Creature Zone</div>
                  <div className="flex gap-3 justify-center">
                    {aiBoard.length > 0 ? (
                      <>
                        {aiBoard.map((creature, i) => (
                          <div 
                            key={i} 
                            className={`relative w-24 ${
                              (targetingMode && targetingMode.targetType === "creature") 
                                ? "cursor-pointer ring-2 ring-yellow-400 hover:ring-4 transition-all" 
                                : (targetingMode && targetingMode.targetType === "creatureOrShield")
                                ? "cursor-pointer ring-2 ring-red-400 hover:ring-4 transition-all"
                                : (currentPhase === "battle" && currentTurn === "player" && battleMode)
                                ? "cursor-pointer ring-2 ring-red-400 hover:ring-4 transition-all"
                                : ""
                            }`}
                            style={{ position: 'relative', zIndex: 10 }}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Battle phase takes priority over targeting mode
                              if (currentPhase === "battle" && currentTurn === "player" && battleMode) {
                                // Explicitly pass false to indicate this is NOT a player creature
                                handleCreatureClick(creature, false);
                                return;
                              }
                              if (targetingMode) {
                                handleCreatureClick(creature, false);
                                return;
                              }
                            }}
                            onMouseEnter={() => setHoveredCard(creature)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            <div style={{ pointerEvents: 'none' }}>
                              <Card card={creature} disableHover={!!dragonTributeMode} isOpponent={true} onClick={undefined} />
                            </div>
                            {/* Show equipped cards underneath, slightly offset */}
                            {creature.equippedCards && creature.equippedCards.length > 0 && (
                              <div className="absolute -bottom-2 -right-2 flex gap-1">
                                {creature.equippedCards.map((equip, idx) => (
                                  <div 
                                    key={idx} 
                                    className="w-6 h-8 bg-purple-600 rounded shadow-lg border border-purple-400 flex items-center justify-center text-xs text-white font-bold"
                                    title={equip.name}
                                  >
                                    🛡️
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* Show health during battle phase */}
                            {currentPhase === "battle" && (
                              <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                                HP: {creature.currentHealth}
                              </div>
                            )}
                          </div>
                        ))}
                        {[...Array(Math.max(0, 5 - aiBoard.length))].map((_, i) => (
                          <div key={`empty-${i}`} className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
                            {aiBoard.length + i + 1}
                          </div>
                        ))}
                      </>
                    ) : (
                      [...Array(5)].map((_, i) => (
                        <div key={i} className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
                          {i + 1}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* AI Deck & Discard (Right Side) */}
              <div className="w-32 flex flex-col gap-3 justify-end pb-2">
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs text-white/50 font-semibold">Discard</div>
                  <div className="relative w-24 h-32 rounded bg-black/20">
                    {aiDiscard && aiDiscard.length > 0 ? (
                      <img src={(aiDiscard[aiDiscard.length-1].imagePath) || `/images/cards/new/${aiDiscard[aiDiscard.length-1].id.replace(/_/g,' ')}.webp`} alt="AI Discard" className="w-24 h-32 object-contain rounded shadow" />
                    ) : (
                      <div className="w-full h-full rounded border-2 border-dashed border-white/20" />
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs text-white/50 font-semibold">Deck</div>
                  <div className="relative">
                    <img src="/Card_Back.png" alt="AI Deck" className="w-24 h-32 object-cover rounded shadow-lg" />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                      {aiDeck.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Turn & Phase Indicator */}
            <div className="flex items-center justify-center py-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full px-12 py-4 shadow-xl min-w-[400px]">
                <p className={`text-lg font-bold text-center ${currentTurn === "player" ? "text-green-300" : "text-blue-200"}`}>
                  {currentTurn === "player" ? "🔷 YOUR TURN" : "🔴 AI TURN"}
                </p>
                <p className="text-sm text-white/90 text-center mt-1">
                  Turn {turnNumber} • {phaseNames[currentPhase]}
                </p>
                {currentTurn === "player" && (
                  currentPhase === "draw" ? (
                    <button
                      onClick={handleDeckClick}
                      className="mt-3 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-bold transition-all w-full"
                    >
                      Draw
                    </button>
                  ) : (
                    <button
                      onClick={nextPhase}
                      className="mt-3 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-bold transition-all w-full"
                    >
                      {nextPhaseLabel} →
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Player Field */}
            <div className="flex gap-4">
              {/* Player Zones (Left Side) */}
              <div className="flex-1 flex flex-col-reverse gap-3">
                {/* Player Shield Zone (3 slots) */}
                <div 
                  className={`bg-purple-900/20 rounded-lg border border-purple-500/30 p-3 transition-all duration-300 ${getZoneHighlight("shield")}`}
                >
                  <div className="text-xs text-purple-300 font-semibold mb-2 uppercase">Shield Zone</div>
                  <div className="flex gap-3 justify-center">
                    {storePlayerShields.map((shield, i) => (
                      <ShieldCard 
                        key={i} 
                        shield={shield} 
                        isPlayer={true}
                        onClick={handleShieldClick}
                      />
                    ))}
                  </div>
                </div>

                {/* Player Rune/Counter Zone (5 slots) */}
                <div 
                  className={`bg-indigo-900/20 rounded-lg border border-indigo-500/30 p-3 transition-all duration-300 ${getZoneHighlight("runeCounter")}`}
                >
                  <div className="text-xs text-indigo-300 font-semibold mb-2 uppercase">Rune/Counter Zone</div>
                  <div className="flex gap-3 justify-center">
                    {playerRuneCounterZone.map((card, i) => (
                      <div 
                        key={i} 
                        className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30 cursor-pointer hover:border-white/40 transition-all"
                        onClick={() => handleZoneClick("runeCounter", i)}
                        onMouseEnter={() => card && setHoveredCard(card)}
                        onMouseLeave={() => setHoveredCard(null)}
                      >
                        {card ? (
                          card.faceDown ? (
                            <img src="/Card_Back.png" alt="Face-down card" className="w-full h-full object-cover rounded" />
                          ) : (
                            <Card card={card} />
                          )
                        ) : (
                          i + 1
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Player Creature Zone (5 slots) */}
                <div 
                  className={`bg-orange-900/20 rounded-lg border border-orange-500/30 p-3 transition-all duration-300 ${(!targetingMode && !dragonTributeMode) && "cursor-pointer"} ${getZoneHighlight("creature")}`}
                  onClick={() => {
                    // Don't allow zone clicks during battle mode
                    if (currentPhase === "battle" && battleMode) {
                      return;
                    }
                    if (!targetingMode && !dragonTributeMode) {
                      handleZoneClick("creature");
                    }
                  }}
                >
                  <div className="text-xs text-orange-300 font-semibold mb-2 uppercase">Creature Zone</div>
                  <div className="flex gap-3 justify-center">
                    {playerBoard.length > 0 ? (
                      <>
                        {playerBoard.map((creature, i) => (
                          <div 
                            key={i} 
                            className={`relative w-24 ${
                              (targetingMode || dragonTributeMode) 
                                ? "cursor-pointer ring-2 ring-yellow-400 hover:ring-4 transition-all" 
                                : (currentPhase === "battle" && currentTurn === "player" && !battleMode && creature.hasAction && !creature.exhausted)
                                ? "cursor-pointer ring-2 ring-green-400 hover:ring-4 transition-all"
                                : ""
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (targetingMode || dragonTributeMode) {
                                handleCreatureClick(creature, true);
                              } else if (currentPhase === "battle" && currentTurn === "player") {
                                handleCreatureClick(creature, true);
                              }
                            }}
                            onMouseEnter={() => setHoveredCard(creature)}
                            onMouseLeave={() => setHoveredCard(null)}
                          >
                            <Card card={creature} />
                            {/* Show equipped cards underneath, slightly offset */}
                            {creature.equippedCards && creature.equippedCards.length > 0 && (
                              <div className="absolute -bottom-2 -right-2 flex gap-1">
                                {creature.equippedCards.map((equip, idx) => (
                                  <div 
                                    key={idx} 
                                    className="w-6 h-8 bg-purple-600 rounded shadow-lg border border-purple-400 flex items-center justify-center text-xs text-white font-bold"
                                    title={equip.name}
                                  >
                                    🛡️
                                  </div>
                                ))}
                              </div>
                            )}
                            {/* Show health during battle phase */}
                            {currentPhase === "battle" && (
                              <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10">
                                HP: {creature.currentHealth}
                              </div>
                            )}
                          </div>
                        ))}
                        {[...Array(Math.max(0, 5 - playerBoard.length))].map((_, i) => (
                          <div key={`empty-${i}`} className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
                            {playerBoard.length + i + 1}
                          </div>
                        ))}
                      </>
                    ) : (
                      [...Array(5)].map((_, i) => (
                        <div key={i} className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
                          {i + 1}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Player Deck & Discard (Right Side) */}
              <div className="w-32 flex flex-col gap-3 justify-start pt-2">
                <div 
                  className={`flex flex-col items-center gap-1 cursor-pointer transition-all ${
                    currentTurn === "player" && currentPhase === "draw" 
                      ? "ring-4 ring-yellow-400 ring-opacity-70 shadow-xl shadow-yellow-400/50 brightness-125" 
                      : ""
                  }`}
                  onClick={handleDeckClick}
                >
                  <div className="text-xs text-white/50 font-semibold">
                    Deck {currentTurn === "player" && currentPhase === "draw" && "(Click to Draw)"}
                  </div>
                  <div className="relative">
                    <img src="/Card_Back.png" alt="Your Deck" className="w-24 h-32 object-cover rounded shadow-lg" />
                    <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white text-sm font-bold px-2 py-1 rounded-full">
                      {pDeck.length}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="text-xs text-white/50 font-semibold">Discard</div>
                  <div className="relative w-24 h-32 rounded bg-black/20">
                    {playerDiscard && playerDiscard.length > 0 ? (
                      <img src={(playerDiscard[playerDiscard.length-1].imagePath) || `/images/cards/new/${playerDiscard[playerDiscard.length-1].id.replace(/_/g,' ')}.webp`} alt="Your Discard" className="w-24 h-32 object-contain rounded shadow" />
                    ) : (
                      <div className="w-full h-full rounded border-2 border-dashed border-white/20" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Player Hand */}
            <div className="bg-black/30 rounded-lg px-4 py-4 border border-orange-500/20 mb-4">
              <div className="text-xs text-orange-300/70 font-semibold mb-3 uppercase">Your Hand</div>
              <div className="flex gap-4 flex-wrap justify-center">
                {playerHand.length === 0 ? (
                  <div className="w-full flex items-center justify-center p-4 bg-black/20 rounded text-slate-400">
                    No cards in hand
                  </div>
                ) : (
                  playerHand.map((card, index) => (
                    <div
                      key={`${card.id}-${index}`}
                      className={`flex-shrink-0 transition-all duration-200 ${
                        selectedCardIndex === index ? "ring-4 ring-yellow-400 ring-opacity-80 scale-105 brightness-125" : "hover:scale-105"
                      }`}
                      onMouseEnter={() => setHoveredCard(card)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card card={card} isHand={true} showBack={false} onClick={() => handleCardSelect(card, index)} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Player Footer */}
        <div className="flex-none flex items-center justify-between bg-gradient-to-r from-orange-900/50 to-orange-800/50 px-6 py-2 border-t border-orange-500/30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-white/70">HP:</span>
              <span className="text-xl font-bold text-green-400">{playerHealth}/500</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg font-bold text-right">You</h2>
              <p className="text-sm text-orange-300">{playerDeck === "crystal" ? "Crystal" : "Lightning"}</p>
            </div>
            <span className="text-xl">{playerDeck === "crystal" ? "💎" : "⚡"}</span>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      {errorMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] bg-red-600 text-white px-6 py-3 rounded-lg shadow-2xl font-bold text-lg animate-pulse">
          {errorMessage}
        </div>
      )}

      {/* Phase Message */}
      {phaseMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-lg shadow-2xl font-bold text-xl text-center whitespace-pre-line">
          {phaseMessage}
        </div>
      )}

      {/* AI Phase Message */}
      {aiPhaseMessage && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-6 rounded-lg shadow-2xl font-bold text-xl text-center whitespace-pre-line">
          {aiPhaseMessage}
        </div>
      )}

      {/* Essence Exchange Overlay */}
      {essenceSwapMode && (
        <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-purple-500 shadow-2xl max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 mb-6 text-center">
              ✨ Essence Exchange ✨
            </h2>
            
            {essenceSwapMode.step === 1 && (
              <>
                <p className="text-white text-lg mb-6 text-center">Select an element to swap FROM:</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(playerEssence).map(([element, amount]) => (
                    <button
                      key={element}
                      disabled={amount === 0}
                      onClick={() => setEssenceSwapMode({ ...essenceSwapMode, step: 2, fromElement: element })}
                      className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                        amount === 0 
                          ? "border-gray-600 bg-gray-800/50 opacity-50 cursor-not-allowed"
                          : "border-purple-400 bg-purple-900/30 hover:bg-purple-700/50 cursor-pointer hover:scale-105"
                      }`}
                    >
                      <img src={elementIcons[element]} alt={element} className="h-16 w-auto object-contain" />
                      <div className="text-left flex-1">
                        <div className="text-white font-bold text-xl capitalize">{element}</div>
                        <div className="text-purple-300 text-2xl font-mono">{amount}</div>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setEssenceSwapMode(null);
                    setSelectedCard(null);
                    setSelectedCardIndex(null);
                  }}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
                >
                  Cancel
                </button>
              </>
            )}

            {essenceSwapMode.step === 2 && (
              <>
                <p className="text-white text-lg mb-4 text-center">
                  How much <span className="capitalize font-bold text-purple-400">{essenceSwapMode.fromElement}</span> essence to swap?
                </p>
                <div className="flex items-center justify-center gap-4 mb-6">
                  <img src={elementIcons[essenceSwapMode.fromElement]} alt={essenceSwapMode.fromElement} className="h-16 w-auto object-contain" />
                  <div className="text-4xl text-white font-mono">
                    {playerEssence[essenceSwapMode.fromElement]} available
                  </div>
                </div>
                <input
                  type="number"
                  min="1"
                  max={playerEssence[essenceSwapMode.fromElement]}
                  value={essenceSwapMode.amount || 1}
                  onChange={(e) => setEssenceSwapMode({ ...essenceSwapMode, amount: Math.max(1, Math.min(playerEssence[essenceSwapMode.fromElement], parseInt(e.target.value) || 1)) })}
                  className="w-full text-center text-3xl font-bold p-4 rounded-lg bg-slate-700 text-white border-2 border-purple-400 mb-6"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setEssenceSwapMode({ ...essenceSwapMode, step: 1, fromElement: null, amount: 0 })}
                    className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setEssenceSwapMode({ ...essenceSwapMode, step: 3 })}
                    className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {essenceSwapMode.step === 3 && (
              <>
                <p className="text-white text-lg mb-6 text-center">
                  Swap {essenceSwapMode.amount} <span className="capitalize font-bold text-purple-400">{essenceSwapMode.fromElement}</span> essence TO:
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(playerEssence).map(([element, amount]) => {
                    if (element === essenceSwapMode.fromElement) return null;
                    return (
                      <button
                        key={element}
                        onClick={() => {
                          // Perform the swap
                          const result = swapEssence(essenceSwapMode.fromElement, element, essenceSwapMode.amount || 1, true, essenceSwapMode.runeZoneIndex);
                          if (result && result.success) {
                            setEssenceSwapMode(null);
                            setSelectedCard(null);
                            setSelectedCardIndex(null);
                            setErrorMessage(`Swapped ${essenceSwapMode.amount} ${essenceSwapMode.fromElement} → ${element}!`);
                            setTimeout(() => setErrorMessage(""), 3000);
                          } else if (result && result.error) {
                            setErrorMessage(result.error);
                            setTimeout(() => setErrorMessage(""), 3000);
                          }
                        }}
                        className="flex items-center gap-4 p-4 rounded-lg border-2 border-green-400 bg-green-900/30 hover:bg-green-700/50 cursor-pointer hover:scale-105 transition-all"
                      >
                      <img src={elementIcons[element]} alt={element} className="h-16 w-auto object-contain" />
                        <div className="text-left flex-1">
                          <div className="text-white font-bold text-xl capitalize">{element}</div>
                          <div className="text-green-300 text-2xl font-mono">{amount} → {amount + (essenceSwapMode.amount || 1)}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => setEssenceSwapMode({ ...essenceSwapMode, step: 2 })}
                  className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold"
                >
                  Back
                </button>
              </>
              )}
            </div>
          </div>
        )}

      {/* Defense Response Overlay */}
      {defenseResponseMode && (
        <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-orange-500 shadow-2xl max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-6 text-center">
              ⚔️ Defense Response
            </h2>
            <p className="text-white text-lg mb-6 text-center">
              {defenseResponseMode.isShieldAttack
                ? "Your shield is being attacked! Choose a response:"
                : defenseResponseMode.isExhaustedTarget 
                ? "Your exhausted creature is being attacked! Choose a response:"
                : "Your creature is being attacked! Choose a response:"}
            </p>
            
            {/* Display attacker and defender cards */}
            {(() => {
              const attacker = aiBoard.find(c => c.instanceId === defenseResponseMode.attackerId);
              const defender = defenseResponseMode.isShieldAttack 
                ? storePlayerShields.find(s => s.id === defenseResponseMode.defenderId)
                : playerBoard.find(c => c.instanceId === defenseResponseMode.defenderId);
              
              return (
                <div className="flex justify-center items-center gap-6 mb-6">
                  {/* Attacker (AI's creature) */}
                  {attacker && (
                    <div className="flex flex-col items-center">
                      <p className="text-white text-sm mb-2 font-semibold">Attacker (AI)</p>
                      <div className="transform rotate-180">
                        <Card card={attacker} />
                      </div>
                      <div className="mt-2 text-white text-xs text-center">
                        <div>Strength: {attacker.strength || attacker.attack}</div>
                        <div>Agility: {attacker.agility || 0}</div>
                        <div>HP: {attacker.currentHealth || attacker.strength || attacker.attack}</div>
                      </div>
                    </div>
                  )}
                  
                  {/* VS indicator */}
                  <div className="text-yellow-400 text-2xl font-bold">VS</div>
                  
                  {/* Defender (Player's creature or shield) */}
                  {defender && (
                    <div className="flex flex-col items-center">
                      <p className="text-white text-sm mb-2 font-semibold">
                        {defenseResponseMode.isShieldAttack ? "Shield (You)" : "Defender (You)"}
                      </p>
                      {defenseResponseMode.isShieldAttack ? (
                        <div className="w-24 h-32 bg-gradient-to-br from-purple-800 to-purple-900 rounded-lg border-2 border-purple-500 flex flex-col items-center justify-center p-2">
                          <div className="text-white text-xs font-bold mb-1">{defender.name}</div>
                          <div className="text-white text-xs">Tier {defender.tier}</div>
                          <div className="text-white text-sm font-bold mt-2">HP: {defender.currentHealth}</div>
                        </div>
                      ) : (
                        <Card card={defender} />
                      )}
                      {!defenseResponseMode.isShieldAttack && (
                        <div className="mt-2 text-white text-xs text-center">
                          <div>Strength: {defender.strength || defender.attack}</div>
                          <div>Agility: {defender.agility || 0}</div>
                          <div>HP: {defender.currentHealth || defender.strength || defender.attack}</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
            
            <div className="space-y-4 mb-6">
              {/* Defend option - only if not exhausted target and not shield attack */}
              {!defenseResponseMode.isExhaustedTarget && !defenseResponseMode.isShieldAttack && (
                <button
                  onClick={() => {
                    const result = handleDefenseResponse(
                      defenseResponseMode.defenderId,
                      "defend",
                      defenseResponseMode.attackerId,
                      undefined,
                      true
                    );
                    if (result && result.success) {
                      let message = "Combat resolved! ";
                      if (result.attackerDestroyed && result.defenderDestroyed) {
                        message += "Both creatures destroyed!";
                      } else if (result.attackerDestroyed) {
                        message += `Attacker destroyed! Defender survived with ${result.defenderHealth} HP.`;
                      } else if (result.defenderDestroyed) {
                        message += `Defender destroyed! Attacker survived with ${result.attackerHealth} HP.`;
                      } else {
                        message += `Attacker: ${result.attackerHealth} HP, Defender: ${result.defenderHealth} HP.`;
                      }
                      setPhaseMessage(message);
                      setTimeout(() => setPhaseMessage(""), 3000);
                      setDefenseResponseMode(null);
                    } else if (result && result.error) {
                      setErrorMessage(result.error);
                      setTimeout(() => setErrorMessage(""), 3000);
                    }
                  }}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-all"
                >
                  🛡️ Defend (Engage in combat)
                </button>
              )}
              
              {/* Dodge option - only if agility allows and not exhausted */}
              {defenseResponseMode.canDodge && !defenseResponseMode.isExhaustedTarget && (
                <button
                  onClick={() => {
                    const result = handleDefenseResponse(
                      defenseResponseMode.defenderId,
                      "dodge",
                      defenseResponseMode.attackerId,
                      undefined,
                      true
                    );
                    if (result && result.success) {
                      setPhaseMessage("Attack dodged! Both creatures exhausted.");
                      setTimeout(() => setPhaseMessage(""), 2000);
                      setDefenseResponseMode(null);
                    } else if (result && result.error) {
                      setErrorMessage(result.error);
                      setTimeout(() => setErrorMessage(""), 3000);
                    }
                  }}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all"
                >
                  💨 Dodge (Attack misses, both exhausted)
                </button>
              )}
              
              {/* "Do nothing" option for exhausted targets and shield attacks */}
              {(defenseResponseMode.isExhaustedTarget || defenseResponseMode.isShieldAttack) && (
                <button
                  onClick={() => {
                    const result = handleDefenseResponse(
                      defenseResponseMode.defenderId,
                      "none",
                      defenseResponseMode.attackerId,
                      undefined,
                      true
                    );
                    if (result && result.success) {
                      if (result.shieldHit) {
                        setPhaseMessage(`Shield hit! ${result.damage} damage dealt. ${result.destroyed ? "Shield destroyed!" : ""}`);
                      } else {
                        setPhaseMessage(`Attack hit! ${result.damage} damage dealt.`);
                      }
                      setTimeout(() => setPhaseMessage(""), 2000);
                      setDefenseResponseMode(null);
                    } else if (result && result.error) {
                      setErrorMessage(result.error);
                      setTimeout(() => setErrorMessage(""), 3000);
                    }
                  }}
                  className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold text-lg transition-all"
                >
                  {defenseResponseMode.isShieldAttack 
                    ? "⚔️ Do Nothing (Let attack hit shield)"
                    : "⚔️ Do Nothing (Let attack hit exhausted creature)"}
                </button>
              )}
              
              {/* Block options - if blockers available */}
              {defenseResponseMode.potentialBlockers && defenseResponseMode.potentialBlockers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-white text-sm mb-2">Or choose a blocker:</p>
                  {defenseResponseMode.potentialBlockers.map((blocker) => {
                    const blockerCreature = playerBoard.find(c => c.instanceId === blocker.instanceId);
                    return (
                      <button
                        key={blocker.instanceId}
                        onClick={() => {
                          const result = handleDefenseResponse(
                            defenseResponseMode.defenderId,
                            "block",
                            defenseResponseMode.attackerId,
                            blocker.instanceId,
                            true
                          );
                        if (result && result.success) {
                          setPhaseMessage(`${blocker.name} blocked! ${result.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${result.damage} damage`}${result.shieldProtected ? " Shield protected!" : ""}`);
                          setTimeout(() => setPhaseMessage(""), 2000);
                          setDefenseResponseMode(null);
                        } else if (result && result.error) {
                          setErrorMessage(result.error);
                          setTimeout(() => setErrorMessage(""), 3000);
                        }
                      }}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all"
                    >
                      🛡️ Block with {blocker.name} (Agility: {blocker.agility}){defenseResponseMode.isShieldAttack ? " - Protect Shield" : ""}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
            
            <button
              onClick={() => {
                // Default to defend if no other choice
                const result = handleDefenseResponse(
                  defenseResponseMode.defenderId,
                  "defend",
                  defenseResponseMode.attackerId,
                  undefined,
                  true
                );
                if (result && result.success) {
                  setPhaseMessage("Combat resolved!");
                  setTimeout(() => setPhaseMessage(""), 2000);
                  setDefenseResponseMode(null);
                }
              }}
              className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold"
            >
              Cancel (Default: Defend)
            </button>
          </div>
        </div>
      )}

      {/* Essence Generation Overlay */}
      {essenceGenMode && (
        <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-green-500 shadow-2xl max-w-2xl w-full">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-green-400 mb-6 text-center">
              🌱 Essence Generation
            </h2>
            <p className="text-white text-lg mb-6 text-center">Choose an element to generate {essenceGenMode.amount || 2} essence of:</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.keys(playerEssence).map((element) => (
                <button
                  key={element}
                  onClick={() => {
                    const res = useGameStore.getState().generateEssenceFromRune(element, essenceGenMode.amount || 2, true, essenceGenMode.runeZoneIndex);
                    setEssenceGenMode(null);
                    setSelectedCard(null);
                    setSelectedCardIndex(null);
                    setPhaseMessage(`+${essenceGenMode.amount || 2} ${element} essence`);
                    setTimeout(() => setPhaseMessage(""), 1500);
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg border-2 border-green-400 bg-green-900/30 hover:bg-green-700/50 cursor-pointer hover:scale-105 transition-all"
                >
                  <img src={elementIcons[element]} alt={element} className="h-16 w-auto object-contain" />
                  <div className="text-left flex-1">
                    <div className="text-white font-bold text-xl capitalize">{element}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                setEssenceGenMode(null);
                setSelectedCard(null);
                setSelectedCardIndex(null);
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Dragon Summon Choice */}
      {dragonChoice && (
        <div className="fixed inset-0 z-[10002] bg-black/70 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-yellow-500 shadow-2xl max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Draconic Adaptability</h2>
            <p className="text-white/80 mb-6">Choose how to summon your dragon.</p>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
                onClick={() => {
                  // Use normal essence/cost path
                  const result = playCard(dragonChoice.dragonIndex, true, "creature");
                  if (result && !result.success) {
                    setErrorMessage(result.error);
                    setTimeout(() => setErrorMessage(""), 3000);
                  }
                  setDragonChoice(null);
                }}
              >
                Use Essence
              </button>
              <button
                className="py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold"
                onClick={() => {
                  setDragonTributeMode({ dragonIndex: dragonChoice.dragonIndex, requiredElements: dragonChoice.requiredElements, selectedIds: [] });
                  setSelectedCard(null);
                  setSelectedCardIndex(null);
                  setDragonChoice(null);
                  setPhaseMessage(`Select 2 creatures to tribute: ${dragonChoice.requiredElements.join(" & ")}`);
                  setTimeout(() => setPhaseMessage(""), 2500);
                }}
              >
                Tribute 2 Creatures
              </button>
            </div>
            <button className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg" onClick={() => setDragonChoice(null)}>Cancel</button>
          </div>
        </div>
      )}

      {/* Tribute Selection Status */}
      {dragonTributeMode && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10002]">
          <div className="px-4 py-2 rounded-full bg-purple-700 text-white shadow-lg text-sm font-semibold flex items-center gap-2">
            <span>Selected:</span>
            {playerBoard
              .filter(c => dragonTributeMode.selectedIds.includes(c.instanceId))
              .map(c => c.name)
              .join(", ") || "None"}
          </div>
        </div>
      )}

      {/* Confirm Tribute Overlay */}
      {dragonConfirmTribute && (
        <div className="fixed inset-0 z-[10003] bg-black/70 flex items-center justify-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-yellow-500 shadow-2xl max-w-lg w-full text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Confirm Tribute</h2>
            <p className="text-white/80 mb-4">You are about to tribute:</p>
            <div className="flex items-center justify-center gap-3 mb-6 text-white font-semibold">
              {playerBoard
                .filter(c => dragonConfirmTribute.selectedIds.includes(c.instanceId))
                .map((c) => (
                  <div key={c.instanceId} className="px-3 py-2 rounded bg-slate-700 border border-slate-500">
                    {c.name} <span className="text-slate-300 capitalize">({c.element})</span>
                  </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
                onClick={() => setDragonConfirmTribute(null)}
              >
                Cancel
              </button>
              <button
                className="py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold"
                onClick={() => {
                  summonDragonByTribute(dragonConfirmTribute.dragonIndex, dragonConfirmTribute.selectedIds);
                  setDragonConfirmTribute(null);
                  setDragonTributeMode(null);
                  setSelectedCard(null);
                  setSelectedCardIndex(null);
                }}
              >
                Confirm Tribute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hovered Card Preview (For Hand Cards and Creatures) */}
      {hoveredCard && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
          {/* Show side-by-side if creature has equipped cards, otherwise just the card */}
          {hoveredCard.equippedCards && hoveredCard.equippedCards.length > 0 ? (
            <div className="flex gap-4 items-center">
              {/* Main creature card */}
              <div className="relative" style={{ width: '360px', height: '504px' }}>
                <img 
                  src={hoveredCard.imagePath || `/images/cards/new/${hoveredCard.id.replace(/_/g, ' ')}.webp`} 
                  alt={hoveredCard.name}
                  className="w-full h-full object-contain shadow-2xl rounded-lg"
                />
              </div>
              
              {/* Equipped cards */}
              <div className="flex flex-col gap-2">
                {hoveredCard.equippedCards.map((equip, idx) => (
                  <div key={idx} className="relative" style={{ width: '240px', height: '336px' }}>
                    <img 
                      src={equip.imagePath || `/images/cards/new/${equip.id.replace(/_/g, ' ')}.webp`} 
                      alt={equip.name}
                      className="w-full h-full object-contain shadow-xl rounded-lg"
                    />
                    <div className="absolute top-0 left-0 bg-purple-600 text-white px-2 py-1 text-xs font-bold rounded-tl-lg rounded-br-lg">
                      EQUIPPED
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Single card preview */
            <div className="relative" style={{ width: '360px', height: '504px' }}>
              <img 
                src={hoveredCard.imagePath || `/images/cards/new/${hoveredCard.id.replace(/_/g, ' ')}.webp`} 
                alt={hoveredCard.name}
                className="w-full h-full object-contain shadow-2xl rounded-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Shield Card Component with hover functionality
function ShieldCard({ shield, isPlayer, onClick, highlight }) {
  const [isHovered, setIsHovered] = useState(false);

  const getImagePath = () => {
    const fileName = shield.id.replace(/_/g, ' ');
    return `/images/cards/new/${fileName}.webp`;
  };

  // Determine if we should show details (hide for opponent's face-down shields)
  const showDetails = isPlayer || !shield.faceDown;
  const canHover = isPlayer || !shield.faceDown;

  return (
    <>
      <div 
        className={`relative flex items-center justify-center cursor-pointer transition-all ${highlight || ""}`}
        onMouseEnter={() => canHover && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick && onClick(shield, isPlayer)}
        style={{ width: '160px', height: '88px' }}
      >
        <img 
          src={shield.faceDown ? "/Card_Back.png" : getImagePath()} 
          alt={shield.faceDown ? "Face-down Shield" : shield.name}
          className="object-contain rounded shadow-lg"
          style={{ 
            width: '88px', 
            height: '160px',
            transform: 'rotate(90deg)',
            transformOrigin: 'center center'
          }}
        />
        
        {/* Health and Tier indicator - only show for player shields or revealed opponent shields */}
        {showDetails && (
          <>
            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
              {shield.currentHealth} HP
            </div>
            <div className="absolute bottom-1 right-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
              T{shield.currentTier}
            </div>
          </>
        )}
      </div>

      {/* Hover popup - only show for player shields or revealed opponent shields */}
      {isHovered && canHover && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: '400px', height: '560px' }}>
            <img 
              src={getImagePath()} 
              alt={shield.name}
              className="w-full h-full object-contain shadow-2xl rounded-lg"
              onError={(e) => {
                // Fallback to styled card if image fails
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-2xl p-8 flex-col items-center justify-center hidden">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-2">{shield.name}</h3>
              <p className="text-lg text-purple-200">Tier {shield.currentTier} Shield • {shield.currentHealth} HP</p>
              <p className="text-sm text-purple-300 mt-4 text-center">{shield.element.charAt(0).toUpperCase() + shield.element.slice(1)} Shield</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
