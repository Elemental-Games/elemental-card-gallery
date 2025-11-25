import { useEffect, useState, useMemo } from "react";
import { useGameStore } from "../store/gameStore";
import Card from "./TCGCard";
import GameOver from "./TCGGameOver";

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

export default function TCGGameBoard({ playerDeck = "crystal", playerGoesFirst = true }) {
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
    playerDeck: playerDeckState,
    aiDeck,
    playerEssence,
    aiEssence,
    playerRuneCounterZone,
    aiRuneCounterZone,
    playerDiscard,
    aiDiscard,
    playerShields,
    aiShields,
    aiPhaseMessage,
    pendingDefenseResponse,
    pendingAbilityPrompt,
    battleLog,
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
    activateCreatureAbility,
    activateHandAbility,
    resolveAbilityPrompt,
    endTurn,
    aiTurn,
    resetGame,
  } = useGameStore();

  const [gameInitialized, setGameInitialized] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [phaseMessage, setPhaseMessage] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredEquipment, setHoveredEquipment] = useState(null);
  const [targetingMode, setTargetingMode] = useState(null);
  const [essenceSwapMode, setEssenceSwapMode] = useState(null);
  const [essenceGenMode, setEssenceGenMode] = useState(null);
  const [dragonChoice, setDragonChoice] = useState(null);
  const [dragonTributeMode, setDragonTributeMode] = useState(null);
  const [dragonConfirmTribute, setDragonConfirmTribute] = useState(null);
  const [battleMode, setBattleMode] = useState(null);
  const [defenseResponseMode, setDefenseResponseMode] = useState(null);
  const [abilitySelections, setAbilitySelections] = useState([]);
  const [logFilter, setLogFilter] = useState("all");
  const [isBattleLogOpen, setIsBattleLogOpen] = useState(false);

  const abilitySource = useMemo(() => {
    if (!pendingAbilityPrompt) return null;
    const board = pendingAbilityPrompt.controller === "player" ? playerBoard : aiBoard;
    return board.find((c) => c.instanceId === pendingAbilityPrompt.sourceInstanceId) || null;
  }, [pendingAbilityPrompt, playerBoard, aiBoard]);

  const filteredLog = useMemo(() => {
    if (logFilter === "all") return battleLog;
    return battleLog.filter((entry) => entry.controller === logFilter || entry.controller === "system");
  }, [battleLog, logFilter]);

  const phaseOrder = ["draw", "generate", "main1", "battle", "main2", "end"];
  const currentIndex = phaseOrder.indexOf(currentPhase);
  let nextPhaseKey = currentIndex >= 0 && currentIndex < phaseOrder.length - 1 ? phaseOrder[currentIndex + 1] : "draw";
  if (turnNumber === 1 && currentPhase === "main1" && currentTurn === "player") {
    nextPhaseKey = "main2";
  }
  const nextPhaseLabel = currentPhase === "end" ? "Pass Turn" : (phaseNames[nextPhaseKey] || "Next Phase");
  const aiDeckType = playerDeck === "crystal" ? "lightning" : "crystal";

  useEffect(() => {
    if (!gameInitialized && gameStatus === "setup") {
      initializeGame(playerDeck, aiDeckType, playerGoesFirst);
      setGameInitialized(true);
    }
  }, [gameInitialized, gameStatus, initializeGame, playerDeck, aiDeckType, playerGoesFirst]);

  useEffect(() => {
    if (currentTurn === "ai" && gameStatus === "playing") {
      const timer = setTimeout(() => aiTurn(), 500);
      return () => clearTimeout(timer);
    }
  }, [currentTurn, currentPhase, gameStatus, aiTurn]);

  useEffect(() => {
    setAbilitySelections([]);
  }, [pendingAbilityPrompt?.abilityId, pendingAbilityPrompt?.sourceInstanceId, pendingAbilityPrompt?.message]);

  const handleCardSelect = (card, index) => {
    if (currentTurn !== "player") return;
    if (currentPhase !== "main1" && currentPhase !== "main2") return;
    if (selectedCardIndex === index) {
      setSelectedCard(null);
      setSelectedCardIndex(null);
    } else {
      setSelectedCard(card);
      setSelectedCardIndex(index);
    }
  };

  const handleZoneClick = (zoneType, index = null) => {
    if (!selectedCard || currentTurn !== "player") return;
    const isValidPlacement =
      (zoneType === "creature" && selectedCard.cardType === "creature") ||
      (zoneType === "runeCounter" && (selectedCard.cardType === "rune" || selectedCard.cardType === "counter")) ||
      (zoneType === "shield" && selectedCard.cardType === "shield");
    if (!isValidPlacement) return;

    if (
      zoneType === "creature" &&
      selectedCard.cardType === "creature" &&
      (selectedCard.id === "veton" || selectedCard.id === "diamoria") &&
      useGameStore.getState().playerDraconicAdapt?.active
    ) {
      const required = useGameStore.getState().playerDraconicAdapt.requiredElements;
      setDragonChoice({ dragonIndex: selectedCardIndex, requiredElements: required });
      return;
    }

    const result = playCard(selectedCardIndex, true, zoneType, index);
    if (result && !result.success) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    if (result?.needsTarget) {
      setTargetingMode({
        cardToEquip: result.cardToEquip,
        cardIndex: result.cardIndex,
        targetType: result.targetType,
        damage: result.damage,
        runeZoneIndex: result.runeZoneIndex,
      });
      if (result.targetType === "creature") {
        setPhaseMessage(selectedCard.id === "binding_coils" ? "Select any creature to exhaust with Binding Coils" : "Select a creature to equip Essence Amplifier");
      } else if (result.targetType === "creatureOrShield") {
        setPhaseMessage("Select an opponent's creature or shield to deal 50 damage");
      }
      return;
    }

    if (result?.needsEssenceSwap) {
      setEssenceSwapMode({ runeZoneIndex: result.runeZoneIndex, step: 1, fromElement: null, amount: 0 });
      return;
    }

    if (result?.draconicActivated) {
      setPhaseMessage("Draconic Adaptability activated!");
      setTimeout(() => {
        setPhaseMessage("");
        discardRuneFromZone(true, result.runeZoneIndex);
      }, 1200);
      return;
    }

    if (result?.needsEssenceGeneration) {
      setEssenceGenMode({ runeZoneIndex: result.runeZoneIndex, amount: result.amount || 2 });
      return;
    }

    setSelectedCard(null);
    setSelectedCardIndex(null);
  };

  const handleActivateAbilityClick = (creature, ability) => {
    const result = activateCreatureAbility(creature.instanceId, ability.id);
    if (!result?.success && result?.error) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleAbilityOptionClick = (optionId) => {
    if (!pendingAbilityPrompt) return;
    if (pendingAbilityPrompt.selectionMode === "single") {
      const result = resolveAbilityPrompt({ optionId });
      if (result && !result.success && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } else if (pendingAbilityPrompt.selectionMode === "multiple") {
      setAbilitySelections((prev) => (prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId]));
    }
  };

  const handleAbilityConfirm = () => {
    if (!pendingAbilityPrompt) return;
    if (pendingAbilityPrompt.selectionMode === "multiple") {
      if (abilitySelections.length === 0) return;
      const result = resolveAbilityPrompt({ optionIds: abilitySelections });
      if (result && !result.success && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } else if (pendingAbilityPrompt.selectionMode === "none") {
      const result = resolveAbilityPrompt({});
      if (result && !result.success && result.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const handleAbilitySkip = () => {
    if (!pendingAbilityPrompt?.allowSkip) return;
    const result = resolveAbilityPrompt({ skip: true });
    if (result && !result.success && result.error) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleCreatureClick = (creature, isPlayerCreature) => {
    if (currentPhase === "battle" && currentTurn === "player") {
      if (!isPlayerCreature && battleMode) {
        if (!creature) {
          console.error("handleCreatureClick: creature is null/undefined", { creature, isPlayerCreature, battleMode });
          setErrorMessage("Invalid creature target");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }
        if (!creature.instanceId) {
          console.error("handleCreatureClick: creature missing instanceId", { creature, aiBoard });
          setErrorMessage("Creature missing instance ID");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }
        // Verify creature exists in current store state before attacking
        const currentAiBoard = useGameStore.getState().aiBoard;
        const creatureInStore = currentAiBoard.find(c => c && c.instanceId === creature.instanceId);
        if (!creatureInStore) {
          console.error("Creature not found in store:", {
            creatureInstanceId: creature.instanceId,
            creatureName: creature.name,
            storeAiBoard: currentAiBoard.map(c => ({ instanceId: c?.instanceId, name: c?.name })),
            componentAiBoard: aiBoard.map(c => ({ instanceId: c?.instanceId, name: c?.name }))
          });
          setErrorMessage(`Target creature not found in game state`);
          setTimeout(() => setErrorMessage(""), 3000);
          return;
        }
        
        console.log("Initiating attack:", { 
          attackerId: battleMode.attackerId, 
          targetId: creature.instanceId, 
          creatureFromRender: creature,
          creatureFromStore: creatureInStore
        });
        const result = initiateAttack(battleMode.attackerId, creature.instanceId, "creature", true);
        if (!result) {
          setErrorMessage("Attack failed - no result returned");
          setTimeout(() => setErrorMessage(""), 2000);
          return;
        }
        if (!result.success) {
          console.error("Attack failed:", result.error);
          setErrorMessage(result.error || "Attack failed");
          setTimeout(() => setErrorMessage(""), 3000);
          return;
        }
        if (result.success) {
          if (result.requiresResponse) {
            // Get fresh state from store to ensure we have the latest creatures
            const currentState = useGameStore.getState();
            const defender = currentState.aiBoard.find((c) => c && c.instanceId === result.defenderId);
            const attacker = currentState.playerBoard.find((c) => c && c.instanceId === result.attackerId);
            
            if (!defender || !attacker) {
              console.error("Could not find creatures for defense response:", {
                defenderFound: !!defender,
                attackerFound: !!attacker,
                defenderId: result.defenderId,
                attackerId: result.attackerId,
                aiBoard: currentState.aiBoard.map(c => ({ instanceId: c?.instanceId, name: c?.name })),
                playerBoard: currentState.playerBoard.map(c => ({ instanceId: c?.instanceId, name: c?.name }))
              });
              setErrorMessage("Could not find creatures for combat resolution");
              setTimeout(() => setErrorMessage(""), 3000);
              return;
            }
            
            const attackerAgility = attacker.agility || 0;
            const defenderAgility = defender.agility || 0;
            const potentialBlockers = result.potentialBlockers || [];
            let defenseType = "defend";
            let blockerId;
            if (defenderAgility > attackerAgility && defender.hasAction && !defender.exhausted) {
              defenseType = "dodge";
            } else if (potentialBlockers.length > 0) {
              defenseType = "defend";
            }
            // isPlayer parameter means "is the attacker the player's creature"
            // Since the player is attacking, this should be true
            const defenseResult = handleDefenseResponse(
              result.defenderId,
              defenseType,
              result.attackerId,
              true, // Player is attacking, so attacker is player's creature
              blockerId
            );
            if (defenseResult?.success) {
                if (defenseResult.dodged) {
                  setPhaseMessage(`AI's ${defender.name} dodged! Attack missed, both creatures exhausted.`);
                } else if (defenseResult.blocked) {
                  setPhaseMessage(
                    `${defenseResult.blockerName || "Blocker"} blocked! ${
                      defenseResult.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${defenseResult.damage} damage`
                    }${defenseResult.shieldProtected ? " Shield protected!" : ""}`
                  );
                } else {
                  let message = "Combat resolved! ";
                  if (defenseResult.attackerDestroyed && defenseResult.defenderDestroyed) message += "Both creatures destroyed!";
                  else if (defenseResult.attackerDestroyed)
                    message += `${attacker?.name || "Attacker"} destroyed! ${defender.name} survives.`;
                  else if (defenseResult.defenderDestroyed)
                    message += `${defender.name} destroyed! ${attacker?.name || "Attacker"} survives.`;
                  else
                    message += `${attacker?.name || "Attacker"} (${defenseResult.attackerHealth} HP) vs ${defender.name} (${defenseResult.defenderHealth} HP)`;
                  setPhaseMessage(message);
                }
                setTimeout(() => setPhaseMessage(""), 3000);
                setBattleMode(null);
              } else if (defenseResult?.error) {
                setErrorMessage(defenseResult.error);
                setTimeout(() => setErrorMessage(""), 3000);
              } else {
                setErrorMessage("Failed to resolve defense response");
                setTimeout(() => setErrorMessage(""), 3000);
              }
          } else {
            if (result.attackerDestroyed && result.defenderDestroyed) setPhaseMessage("Both creatures destroyed!");
            else if (result.attackerDestroyed) setPhaseMessage("Your creature was destroyed in combat!");
            else if (result.defenderDestroyed) setPhaseMessage("Enemy creature destroyed!");
            else setPhaseMessage(`Combat resolved: ${result.damage} damage exchanged.`);
            setTimeout(() => setPhaseMessage(""), 2000);
            setBattleMode(null);
          }
        } else if (result.error) {
          setErrorMessage(result.error);
          setTimeout(() => setErrorMessage(""), 3000);
        }
        return;
      }

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

      if (isPlayerCreature && battleMode) {
        if (battleMode.attackerId === creature.instanceId) {
          setBattleMode(null);
          setPhaseMessage("");
          return;
        }
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

      if (!isPlayerCreature && !battleMode) return;
    }

    if (defenseResponseMode && isPlayerCreature) {
      const blocker = defenseResponseMode.potentialBlockers?.find((b) => b.instanceId === creature.instanceId);
      if (blocker) {
        const result = handleDefenseResponse(
          defenseResponseMode.defenderId,
          "block",
          defenseResponseMode.attackerId,
          false,
          blocker.instanceId
        );
        if (result?.success) {
          setPhaseMessage(
            `${creature.name} blocked! ${result.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${result.damage} damage`}${
              result.shieldProtected ? " Shield protected!" : ""
            }`
          );
          setTimeout(() => setPhaseMessage(""), 2000);
          setDefenseResponseMode(null);
        } else if (result?.error) {
          setErrorMessage(result.error);
          setTimeout(() => setErrorMessage(""), 3000);
        }
      }
      return;
    }

    if (dragonTributeMode && isPlayerCreature) {
      const { selectedIds, requiredElements } = dragonTributeMode;
      const alreadySelected = selectedIds.includes(creature.instanceId);
      let next = selectedIds;
      if (alreadySelected) {
        next = selectedIds.filter((id) => id !== creature.instanceId);
      } else if (selectedIds.length < 2) {
        const selectedCreatures = useGameStore.getState().playerBoard.filter((c) => selectedIds.includes(c.instanceId));
        const remaining = requiredElements.filter((e) => !selectedCreatures.some((c) => c.element === e));
        if (remaining.includes(creature.element)) {
          next = [...selectedIds, creature.instanceId];
        } else {
          setErrorMessage("Select one of each required element");
          setTimeout(() => setErrorMessage(""), 1500);
          return;
        }
      }
      setDragonTributeMode({ ...dragonTributeMode, selectedIds: next });
      if (next.length === 2) {
        setDragonConfirmTribute({ dragonIndex: dragonTributeMode.dragonIndex, selectedIds: next });
      }
      return;
    }

    if (targetingMode && targetingMode.targetType === "creature") {
      const result = equipRuneToCreature(targetingMode.cardToEquip, creature.instanceId, true, targetingMode.runeZoneIndex);
      if (result?.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        setPhaseMessage(
          targetingMode.cardToEquip?.id === "binding_coils" ? "Creature exhausted by Binding Coils!" : "Essence Amplifier equipped!"
        );
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result?.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
      return;
    }

    if (targetingMode && targetingMode.targetType === "creatureOrShield" && !isPlayerCreature) {
      const result = dealDamageToTarget(creature.instanceId, "creature", targetingMode.damage || 50, true, targetingMode.runeZoneIndex);
      if (result?.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        setPhaseMessage(result.destroyed ? "Creature destroyed!" : `Dealt ${targetingMode.damage} damage!`);
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result?.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const handleShieldClick = (shield, isPlayerShield) => {
    if (currentPhase === "battle" && currentTurn === "player" && battleMode && !isPlayerShield) {
      const result = initiateAttack(battleMode.attackerId, shield.id, "shield", true);
      if (result?.success) {
        if (result.requiresResponse) {
          setDefenseResponseMode(result.pendingResponse);
        } else {
          if (result.destroyed) setPhaseMessage("Shield destroyed!");
          else setPhaseMessage(`Dealt ${result.damage} damage to shield!`);
          setTimeout(() => setPhaseMessage(""), 2000);
          setBattleMode(null);
        }
      } else if (result?.error) {
        setErrorMessage(result.error);
        setTimeout(() => setErrorMessage(""), 3000);
      }
      return;
    }

    if (targetingMode && targetingMode.targetType === "creatureOrShield" && !isPlayerShield) {
      const result = dealDamageToTarget(shield.id, "shield", targetingMode.damage || 50, true, targetingMode.runeZoneIndex);
      if (result?.success) {
        setTargetingMode(null);
        setSelectedCard(null);
        setSelectedCardIndex(null);
        setPhaseMessage(result.destroyed ? "Shield destroyed!" : `Dealt ${targetingMode.damage} damage to shield!`);
        setTimeout(() => setPhaseMessage(""), 2000);
      } else if (result?.error) {
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
      setTimeout(() => handleGenerate(), 500);
    }
  };

  const handleGenerate = () => {
    const result = nextPhase();
    const generation = result?.generated || { fire: 0, water: 0, earth: 0, air: 0 };
    const elementNames = { fire: "🔥 Fire", water: "💧 Water", earth: "🌿 Earth", air: "💨 Air" };
    const generatedElements = Object.entries(generation)
      .filter(([, count]) => count > 0)
      .map(([element, count]) => `${elementNames[element]}: +${count}`);
    const totalGenerated = Object.values(generation).reduce((a, b) => a + b, 0);
    let message = totalGenerated > 0 ? `Generated Essence!\n${generatedElements.join(", ")}` : "No creatures on field - No essence generated!";
    message += "\n\nMoving to Main Phase 1...";
    setPhaseMessage(message);
    setTimeout(() => {
      setPhaseMessage("");
      nextPhase();
    }, 2500);
  };

  useEffect(() => {
    if (currentPhase !== "battle") {
      setBattleMode(null);
      setDefenseResponseMode(null);
    }
  }, [currentPhase]);

  useEffect(() => {
    if (pendingDefenseResponse && currentTurn === "ai" && currentPhase === "battle") {
      setDefenseResponseMode(pendingDefenseResponse);
    }
  }, [pendingDefenseResponse, currentTurn, currentPhase]);

  if (gameStatus === "player_won" || gameStatus === "ai_won") {
    return (
      <>
        <div className="fixed inset-0 bg-black/80 z-[20000] transition-opacity duration-500 opacity-100" />
        <GameOver result={gameStatus} onReset={resetGame} playerDeck={playerDeck} />
      </>
    );
  }

  const renderEssenceColumn = (essence, label) => (
    <div className="w-full flex flex-col items-center gap-2 bg-black/30 rounded-2xl border border-white/10 px-3 py-4 text-center">
      <div className="text-xs font-semibold text-white/70 uppercase tracking-wide">{label}</div>
      {Object.entries(essence).map(([element, value]) => (
        <div key={element} className="flex items-center justify-between w-full bg-black/40 rounded-lg px-3 py-1.5">
          <img src={elementIcons[element]} alt={element} className="w-10 h-10 object-contain" />
          <span className="ml-2 text-base font-bold text-white">{value}</span>
        </div>
      ))}
    </div>
  );

  const renderDeckStack = ({ deck, discard, label, highlightOnDraw, onDeckClick, badgeColor = "bg-blue-600" }) => (
    <div className="w-32 flex flex-col gap-3 items-center mx-auto">
      <div className="text-xs text-white/60 font-semibold uppercase tracking-wide">{label}</div>
      <div className="relative cursor-pointer" onClick={onDeckClick}>
        <img src="/Card_Back.png" alt={`${label} Deck`} className={`w-24 h-32 object-cover rounded shadow-lg ${highlightOnDraw ? "ring-4 ring-yellow-400 shadow-yellow-300/40" : ""}`} />
        <div className={`absolute -bottom-2 -right-2 ${badgeColor} text-white text-sm font-bold px-2 py-1 rounded-full`}>{deck.length}</div>
      </div>
      <div className="text-xs text-white/60 font-semibold uppercase tracking-wide">Discard</div>
      <div className="relative w-24 h-32 rounded bg-black/20 flex items-center justify-center">
        {discard.length > 0 ? (
          <img
            src={discard[discard.length - 1].imagePath || `/images/cards/new/${discard[discard.length - 1].id.replace(/_/g, " ")}.webp`}
            alt={`${label} Discard`}
            className="w-full h-full object-contain rounded shadow"
          />
        ) : (
          <div className="w-full h-full rounded border-2 border-dashed border-white/20" />
        )}
      </div>
    </div>
  );

  const getZoneHighlight = (zoneType) => {
    if (currentPhase === "battle" && currentTurn === "player" && battleMode) {
      if (zoneType === "opponentCreature" || zoneType === "opponentShield") {
        return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
      }
      return "";
    }

    if (targetingMode && targetingMode.targetType === "creature") {
      if (zoneType === "creature") {
        return "ring-4 ring-yellow-400 ring-opacity-90 shadow-2xl shadow-yellow-400/70 brightness-125";
      }
      return "";
    }

    if (targetingMode && targetingMode.targetType === "creatureOrShield") {
      if (zoneType === "opponentCreature" || zoneType === "opponentShield") {
        return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
      }
      return "";
    }

    if (dragonTributeMode && zoneType === "creature") {
      return "ring-4 ring-red-400 ring-opacity-90 shadow-2xl shadow-red-400/70 brightness-125";
    }

    if (!selectedCard) return "";

    const cardType = selectedCard.cardType;
    if (zoneType === "creature" && cardType === "creature") {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }
    if (zoneType === "runeCounter" && (cardType === "rune" || cardType === "counter")) {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }
    if (zoneType === "shield" && cardType === "shield") {
      return "ring-4 ring-green-400 ring-opacity-70 shadow-xl shadow-green-400/50 brightness-125";
    }

    return "opacity-40 brightness-50";
  };

  const renderCreatureCard = (creature, extraClass = "") => {
    const activatedAbilities = creature.abilities?.filter((ability) => ability.trigger === "activated") || [];
    if (!creature || !creature.instanceId) {
      console.error("renderCreatureCard: Invalid creature object", creature);
      return null;
    }
    return (
      <div
        key={creature.instanceId}
        className={`relative w-24 ${extraClass}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Creature card clicked:", { creature, instanceId: creature.instanceId, currentPhase, currentTurn, battleMode });
          if (currentPhase === "battle" && currentTurn === "player") {
            handleCreatureClick(creature, false);
            return;
          }
          if (targetingMode) {
            handleCreatureClick(creature, false);
          }
        }}
        onMouseEnter={() => setHoveredCard(creature)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div style={{ pointerEvents: "none" }}>
          <Card card={creature} disableHover={!!dragonTributeMode} isOpponent={true} />
        </div>
        {creature.equippedCards?.length > 0 && (
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            {creature.equippedCards.map((equip, idx) => (
              <div
                key={idx}
                className="w-6 h-8 bg-purple-600 rounded shadow-lg border border-purple-400 flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:bg-purple-500 transition-colors"
                title={equip.name}
                onMouseEnter={() => setHoveredEquipment(equip)}
                onMouseLeave={() => setHoveredEquipment(null)}
              >
                🛡️
              </div>
            ))}
          </div>
        )}
        {currentPhase === "battle" && (
          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">HP: {creature.currentHealth}</div>
        )}
        {activatedAbilities.length > 0 && (
          <div className="absolute inset-x-1 bottom-1 flex flex-col gap-1">
            {activatedAbilities.map((ability) => {
              const canActivateAbility =
                currentTurn === "player" &&
                (currentPhase === "main1" || currentPhase === "main2") &&
                !creature.hasActivatedAbilityThisTurn;
              return (
                <button
                  key={ability.id}
                  className={`text-xs font-semibold rounded bg-orange-600/90 text-white px-2 py-1 shadow-lg hover:bg-orange-500 transition ${
                    canActivateAbility ? "" : "opacity-40 cursor-not-allowed"
                  }`}
                  disabled={!canActivateAbility}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!canActivateAbility) return;
                    handleActivateAbilityClick(creature, ability);
                  }}
                  title={ability.description || ability.name}
                >
                  {ability.name}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const renderPlayerCreature = (creature) => {
    const activatedAbilities = creature.abilities?.filter((ability) => ability.trigger === "activated") || [];
    return (
      <div
        key={creature.instanceId}
        className={`relative w-24 ${
          targetingMode || dragonTributeMode
            ? "cursor-pointer ring-2 ring-yellow-400 hover:ring-4 transition-all"
            : currentPhase === "battle" && currentTurn === "player" && !battleMode && creature.hasAction && !creature.exhausted
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
        {activatedAbilities.length > 0 && (
          <div className="absolute inset-x-1 bottom-1 flex flex-col gap-1">
            {activatedAbilities.map((ability) => {
              const canActivateAbility =
                currentTurn === "player" &&
                (currentPhase === "main1" || currentPhase === "main2") &&
                !creature.hasActivatedAbilityThisTurn;
              return (
                <button
                  key={ability.id}
                  className={`text-xs font-semibold rounded bg-orange-600/90 text-white px-2 py-1 shadow-lg hover:bg-orange-500 transition ${
                    canActivateAbility ? "" : "opacity-40 cursor-not-allowed"
                  }`}
                  disabled={!canActivateAbility}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!canActivateAbility) return;
                    handleActivateAbilityClick(creature, ability);
                  }}
                  title={ability.description || ability.name}
                >
                  {ability.name}
                </button>
              );
            })}
          </div>
        )}
        {creature.equippedCards?.length > 0 && (
          <div className="absolute -bottom-2 -right-2 flex gap-1">
            {creature.equippedCards.map((equip, idx) => (
              <div
                key={idx}
                className="w-6 h-8 bg-purple-600 rounded shadow-lg border border-purple-400 flex items-center justify-center text-xs text-white font-bold cursor-pointer hover:bg-purple-500 transition-colors"
                title={equip.name}
                onMouseEnter={() => setHoveredEquipment(equip)}
                onMouseLeave={() => setHoveredEquipment(null)}
              >
                🛡️
              </div>
            ))}
          </div>
        )}
        {currentPhase === "battle" && (
          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">HP: {creature.currentHealth}</div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-screen text-white overflow-hidden bg-gradient-to-b from-slate-900 via-blue-900/30 to-slate-900 flex flex-col">
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

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-44 bg-black/35 border-r border-white/10 px-5 py-6 flex flex-col gap-6">
          {renderEssenceColumn(aiEssence, "AI Essence")}
          {renderEssenceColumn(playerEssence, "Your Essence")}
        </aside>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="min-h-full flex flex-col gap-3">
            <div className="flex items-start gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div className={`bg-purple-900/20 rounded-2xl border border-purple-500/30 p-3 transition-all duration-300 ${getZoneHighlight("opponentShield")}`}>
                  <div className="text-xs text-purple-300 font-semibold mb-2 uppercase">Shield Zone</div>
                  {aiShields.length > 0 ? (
                    <div className="flex gap-3 justify-center">
                      {aiShields.map((shield, i) => (
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
                  ) : (
                    <div className="flex items-center justify-center">
                      {currentPhase === "battle" && currentTurn === "player" && battleMode ? (
                        <button
                          onClick={() => {
                            const result = initiateAttack(battleMode.attackerId, "face", "face", true);
                            if (result?.success) {
                              setPhaseMessage(`Direct attack! Dealt ${result.damage} damage!`);
                              setTimeout(() => setPhaseMessage(""), 2000);
                              setBattleMode(null);
                            } else if (result?.error) {
                              setErrorMessage(result.error);
                              setTimeout(() => setErrorMessage(""), 3000);
                            }
                          }}
                          className="w-full h-24 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg font-bold text-base transition-all ring-2 ring-red-400 shadow-lg hover:shadow-red-500/50 transform hover:scale-105 flex items-center justify-center"
                        >
                          ⚔️ Direct Attack
                        </button>
                      ) : (
                        <div className="w-full h-24 bg-black/20 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
                          <div className="text-2xl mb-1">⚔️</div>
                          <div className="text-sm text-white/60 font-semibold">Direct Attack</div>
                          <div className="text-xs text-white/40">No shields remaining</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="bg-indigo-900/20 rounded-2xl border border-indigo-500/30 p-3">
                  <div className="text-xs text-indigo-300 font-semibold mb-2 uppercase">Rune/Counter Zone</div>
                  <div className="flex gap-3 justify-center">
                    {aiRuneCounterZone.map((card, i) => (
                      <div key={i} className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
                        {card ? <img src="/Card_Back.png" alt="Face-down card" className="w-full h-full object-cover rounded" /> : i + 1}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`bg-blue-900/20 rounded-2xl border border-blue-500/30 p-3 transition-all duration-300 ${getZoneHighlight("opponentCreature")}`}>
                  <div className="text-xs text-blue-300 font-semibold mb-2 uppercase">Creature Zone</div>
                  <div className="flex gap-3 justify-center">
                    {[...Array(5)].map((_, index) => {
                      const creature = aiBoard[index];
                      if (creature) {
                        return renderCreatureCard(
                          creature,
                          targetingMode && targetingMode.targetType === "creature"
                            ? "cursor-pointer ring-2 ring-yellow-400 hover:ring-4 transition-all"
                            : targetingMode && targetingMode.targetType === "creatureOrShield"
                            ? "cursor-pointer ring-2 ring-red-400 hover:ring-4 transition-all"
                            : currentPhase === "battle" && currentTurn === "player" && battleMode
                            ? "cursor-pointer ring-2 ring-red-400 hover:ring-4 transition-all"
                            : ""
                        );
                      }
                      return (
                        <div
                          key={`ai-empty-${index}`}
                          className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30"
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div
                  className={`bg-orange-900/20 rounded-2xl border border-orange-500/30 p-3 transition-all duration-300 ${
                    !targetingMode && !dragonTributeMode ? "cursor-pointer" : ""
                  } ${getZoneHighlight("creature")}`}
                  onClick={() => {
                    if (currentPhase === "battle" && battleMode) return;
                    if (!targetingMode && !dragonTributeMode) {
                      handleZoneClick("creature");
                    }
                  }}
                >
                  <div className="text-xs text-orange-300 font-semibold mb-2 uppercase">Creature Zone</div>
                  <div className="flex gap-3 justify-center">
                    {[...Array(5)].map((_, index) => {
                      const creature = playerBoard[index];
                      if (creature) {
                        return renderPlayerCreature(creature);
                      }
                      return (
                        <div
                          key={`player-empty-${index}`}
                          className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30"
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className={`bg-indigo-900/20 rounded-2xl border border-indigo-500/30 p-3 transition-all duration-300 ${getZoneHighlight("runeCounter")}`}>
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

                <div className={`bg-purple-900/20 rounded-2xl border border-purple-500/30 p-3 transition-all duration-300 ${getZoneHighlight("shield")}`}>
                  <div className="text-xs text-purple-300 font-semibold mb-2 uppercase">Shield Zone</div>
                  {playerShields.length > 0 ? (
                    <div className="flex gap-3 justify-center">
                      {[...Array(3)].map((_, index) => {
                        const shield = playerShields[index];
                        return (
                          <ShieldCard
                            key={index}
                            shield={shield}
                            isPlayer={true}
                            onClick={handleShieldClick}
                            highlight={
                              (targetingMode && targetingMode.targetType === "creatureOrShield") ||
                              (currentPhase === "battle" && currentTurn === "player" && battleMode)
                                ? "ring-2 ring-red-400 cursor-pointer"
                                : ""
                            }
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <div className="w-full h-24 bg-black/20 rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center">
                        <div className="text-2xl mb-1">⚔️</div>
                        <div className="text-sm text-white/60 font-semibold">Direct Attack</div>
                        <div className="text-xs text-white/40">No shields remaining</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <aside className="w-72 border-l border-white/10 bg-slate-900/40 px-4 py-5 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
          <div className="flex flex-col gap-4 sticky top-5 items-center w-full">
            {renderDeckStack({
              deck: aiDeck,
              discard: aiDiscard,
              label: "AI Deck",
              highlightOnDraw: false,
              onDeckClick: () => {},
              badgeColor: "bg-blue-600",
            })}

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl px-3 py-3 shadow-xl mx-auto w-full max-w-[180px]">
              <div className="text-sm uppercase tracking-wide text-white/80 font-semibold text-center">{currentTurn === "player" ? "Your Turn" : "AI Turn"}</div>
              <div className="text-xs text-white/70 text-center mt-1">Turn {turnNumber} • {phaseNames[currentPhase]}</div>
              <button
                className="mt-3 w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 text-sm font-bold transition"
                onClick={currentTurn === "player" ? (currentPhase === "draw" ? handleDeckClick : nextPhase) : undefined}
                disabled={currentTurn !== "player"}
              >
                {currentTurn === "player" ? (currentPhase === "draw" ? "Draw" : `${nextPhaseLabel} →`) : "Waiting"}
              </button>
              <div className="mt-3 flex justify-center text-xs text-white/60">
                <button onClick={endTurn} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20 transition" disabled={currentTurn !== "player"}>
                  End Turn
                </button>
              </div>
            </div>

            {renderDeckStack({
              deck: playerDeckState,
              discard: playerDiscard,
              label: "Your Deck",
              highlightOnDraw: currentTurn === "player" && currentPhase === "draw",
              onDeckClick: handleDeckClick,
              badgeColor: "bg-orange-500",
            })}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs uppercase tracking-wide text-white/70 font-semibold">Battle Log</span>
                <button
                  onClick={() => setIsBattleLogOpen((prev) => !prev)}
                  className="w-7 h-7 flex items-center justify-center rounded-full border border-slate-600 text-sm font-bold text-slate-200 hover:border-orange-400 hover:text-orange-200 transition"
                  aria-label={isBattleLogOpen ? "Minimize battle log" : "Expand battle log"}
                >
                  {isBattleLogOpen ? "-" : "+"}
                </button>
              </div>
              <div className="flex flex-col bg-slate-900/80 border border-slate-700/60 rounded-2xl shadow-inner overflow-hidden">
                {isBattleLogOpen ? (
                  <>
                    <div className="flex items-center justify-center gap-1 px-3 py-2 border-b border-slate-700/60">
                      {[
                        { id: "all", label: "All" },
                        { id: "player", label: "You" },
                        { id: "ai", label: "AI" },
                      ].map((filter) => (
                        <button
                          key={filter.id}
                          className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold transition ${
                            logFilter === filter.id
                              ? "bg-orange-500 text-white border-orange-400"
                              : "bg-transparent text-slate-300 border-slate-600 hover:border-orange-400 hover:text-orange-200"
                          }`}
                          onClick={() => setLogFilter(filter.id)}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                    <div className="max-h-48 overflow-y-auto px-3 py-2.5 space-y-2" style={{ scrollbarWidth: "thin" }}>
                      {filteredLog.length === 0 ? (
                        <div className="text-xs text-slate-300/70">No actions yet.</div>
                      ) : (
                        [...filteredLog]
                          .slice(-120)
                          .reverse()
                          .map((entry) => {
                            const controllerLabel = entry.controller === "player" ? "You" : entry.controller === "ai" ? "AI" : "System";
                            const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
                            return (
                              <div key={entry.id} className="rounded-lg border border-slate-700/70 bg-slate-800/80 px-2 py-1.5 text-xs text-slate-200/90 shadow">
                                <div className="flex justify-between text-[10px] uppercase tracking-wider text-slate-400/80 mb-1">
                                  <span>{controllerLabel}</span>
                                  <span>{time}</span>
                                </div>
                                <div>{entry.message}</div>
                              </div>
                            );
                          })
                      )}
                    </div>
                  </>
                ) : (
                  <div className="py-5 flex flex-col items-center justify-center gap-2 text-xs text-slate-400/80 px-4">
                    <span>Battle log minimized.</span>
                    <button
                      onClick={() => setIsBattleLogOpen(true)}
                      className="px-3 py-1 rounded-full border border-slate-600 text-[11px] font-semibold text-slate-200 hover:border-orange-400 hover:text-orange-200 transition"
                    >
                      Open Battle Log
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex-none flex items-center justify-between bg-gradient-to-r from-orange-900/50 to-orange-800/50 px-6 py-2 border-t border-orange-500/30">
        <div className="flex items-center gap-4">
          <span className="text-xl">{playerDeck === "crystal" ? "💎" : "⚡"}</span>
          <div className="text-left">
            <h2 className="text-lg font-bold">You</h2>
            <p className="text-sm text-orange-300">{playerDeck === "crystal" ? "Crystal" : "Lightning"}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">HP:</span>
            <span className="text-xl font-bold text-green-400">{playerHealth}/500</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white/70">Hand:</span>
            <span className="text-lg font-bold">{playerHand.length}</span>
          </div>
        </div>
      </div>

      <HandOverlay
        playerHand={playerHand}
        selectedCardIndex={selectedCardIndex}
        setHoveredCard={setHoveredCard}
        handleCardSelect={handleCardSelect}
        activateHandAbility={activateHandAbility}
      />

      {pendingAbilityPrompt && (
        <AbilityPromptOverlay
          pendingAbilityPrompt={pendingAbilityPrompt}
          abilitySource={abilitySource}
          abilitySelections={abilitySelections}
          onSelect={handleAbilityOptionClick}
          onConfirm={handleAbilityConfirm}
          onSkip={handleAbilitySkip}
        />
      )}

      {defenseResponseMode && (
        <DefenseOverlay
          defenseResponseMode={defenseResponseMode}
          aiBoard={aiBoard}
          playerBoard={playerBoard}
          playerShields={playerShields}
          handleDefenseResponse={handleDefenseResponse}
          setDefenseResponseMode={setDefenseResponseMode}
          setPhaseMessage={setPhaseMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {essenceSwapMode && (
        <EssenceSwapOverlay
          essenceSwapMode={essenceSwapMode}
          playerEssence={playerEssence}
          elementIcons={elementIcons}
          setEssenceSwapMode={setEssenceSwapMode}
          setSelectedCard={setSelectedCard}
          setSelectedCardIndex={setSelectedCardIndex}
          setErrorMessage={setErrorMessage}
          swapEssence={swapEssence}
        />
      )}

      {essenceGenMode && (
        <EssenceGenerationOverlay
          essenceGenMode={essenceGenMode}
          playerEssence={playerEssence}
          elementIcons={elementIcons}
          setEssenceGenMode={setEssenceGenMode}
          setSelectedCard={setSelectedCard}
          setSelectedCardIndex={setSelectedCardIndex}
        />
      )}

      {dragonChoice && (
        <DragonChoiceOverlay
          dragonChoice={dragonChoice}
          playCard={playCard}
          setDragonChoice={setDragonChoice}
          setDragonTributeMode={setDragonTributeMode}
          setSelectedCard={setSelectedCard}
          setSelectedCardIndex={setSelectedCardIndex}
          setPhaseMessage={setPhaseMessage}
          setErrorMessage={setErrorMessage}
        />
      )}

      {dragonTributeMode && (
        <TributeStatus dragonTributeMode={dragonTributeMode} />
      )}

      {dragonConfirmTribute && (
        <DragonConfirmOverlay
          dragonConfirmTribute={dragonConfirmTribute}
          summonDragonByTribute={summonDragonByTribute}
          setDragonConfirmTribute={setDragonConfirmTribute}
          setDragonTributeMode={setDragonTributeMode}
          setSelectedCard={setSelectedCard}
          setSelectedCardIndex={setSelectedCardIndex}
        />
      )}

      {errorMessage && (
        <Toast message={errorMessage} tone="error" />
      )}

      {phaseMessage && (
        <Toast message={phaseMessage} tone="phase" />
      )}

      {aiPhaseMessage && (
        <Toast message={aiPhaseMessage} tone="ai" />
      )}

      {hoveredCard && <CardHoverPreview card={hoveredCard} />}
      {hoveredEquipment && <CardHoverPreview card={hoveredEquipment} />}
    </div>
  );
}

function ShieldCard({ shield, isPlayer, onClick, highlight }) {
  const [isHovered, setIsHovered] = useState(false);

  if (!shield) {
    return (
      <div
        className="relative flex items-center justify-center"
        style={{ width: "160px", height: "88px" }}
      >
        <div className="w-24 h-32 rounded border-2 border-dashed border-white/20 flex items-center justify-center text-xs text-white/30">
          Empty
        </div>
      </div>
    );
  }

  const getImagePath = () => `/images/cards/new/${shield.id.replace(/_/g, " ")}.webp`;
  const showDetails = isPlayer || !shield.faceDown;
  const canHover = isPlayer || !shield.faceDown;

  return (
    <>
      <div
        className={`relative flex items-center justify-center cursor-pointer transition-all ${highlight || ""}`}
        onMouseEnter={() => canHover && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onClick && onClick(shield, isPlayer)}
        style={{ width: "160px", height: "88px" }}
      >
        <img
          src={shield.faceDown ? "/Card_Back.png" : getImagePath()}
          alt={shield.faceDown ? "Face-down Shield" : shield.name}
          className="object-contain rounded shadow-lg"
          style={{ width: "88px", height: "160px", transform: "rotate(90deg)", transformOrigin: "center" }}
        />
        {showDetails && (
          <>
            <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">{shield.currentHealth} HP</div>
            <div className="absolute bottom-1 right-1 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md">T{shield.currentTier}</div>
          </>
        )}
      </div>
      {isHovered && canHover && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="relative" style={{ width: "400px", height: "560px" }}>
            <img
              src={getImagePath()}
              alt={shield.name}
              className="w-full h-full object-contain shadow-2xl rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
                if (e.target.nextSibling) e.target.nextSibling.style.display = "flex";
              }}
            />
            <div className="w-full h-full bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg shadow-2xl p-8 flex-col items-center justify-center hidden">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold mb-2">{shield.name}</h3>
              <p className="text-lg text-purple-200">Tier {shield.currentTier} Shield • {shield.currentHealth} HP</p>
              <p className="text-sm text-purple-300 mt-4 text-center">
                {shield.element.charAt(0).toUpperCase() + shield.element.slice(1)} Shield
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function HandOverlay({ playerHand, selectedCardIndex, setHoveredCard, handleCardSelect, activateHandAbility }) {
  return (
    <div className="pointer-events-none fixed left-0 right-0 bottom-0 z-[800]">
      <div className="mx-auto max-w-5xl px-4">
        <div className="group relative">
          <div className="pointer-events-auto transform transition-all duration-200 ease-out translate-y-[60%] group-hover:translate-y-0 opacity-20 group-hover:opacity-100 bg-black/80 border border-orange-500/40 rounded-t-2xl shadow-2xl backdrop-blur-lg">
            <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-wide text-orange-200/80">
              <span>Your Hand ({playerHand.length})</span>
              <span className="text-white/60">Hover to view</span>
            </div>
            <div className="flex gap-3 px-4 pb-4 overflow-x-auto" style={{ scrollbarWidth: "thin" }}>
              {playerHand.length === 0 ? (
                <div className="w-full text-center text-sm text-slate-300/70 py-4">No cards in hand</div>
              ) : (
                playerHand.map((card, index) => {
                  const handAbilities = card.abilities?.filter((ability) => ability.trigger === "hand") || [];
                  return (
                    <div
                      key={`${card.id}-${index}`}
                      className={`relative flex-shrink-0 transition-transform duration-200 ${
                        selectedCardIndex === index ? "ring-4 ring-yellow-400/80 scale-105" : "hover:scale-105"
                      }`}
                      onMouseEnter={() => setHoveredCard(card)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Card card={card} isHand={true} showBack={false} onClick={() => handleCardSelect(card, index)} />
                      {handAbilities.length > 0 && (
                        <div className="absolute inset-x-1 bottom-1 flex flex-col gap-1">
                          {handAbilities.map((ability) => (
                            <button
                              key={ability.id}
                              className="text-xs font-semibold rounded bg-purple-600/90 text-white px-2 py-1 shadow hover:bg-purple-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                const result = activateHandAbility(index, ability.id);
                                if (!result?.success && result?.error) {
                                  // show in overlay if needed
                                }
                              }}
                              title={ability.description || ability.name}
                            >
                              {ability.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AbilityPromptOverlay({ pendingAbilityPrompt, abilitySource, abilitySelections, onSelect, onConfirm, onSkip }) {
  return (
    <div className="fixed inset-0 z-[10002] bg-black/70 flex items-center justify-center px-4">
      <div className="bg-slate-900/95 border border-purple-500/60 rounded-2xl shadow-2xl max-w-3xl w-full p-6">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
          Ability Resolution
        </h2>
        {abilitySource ? (
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-white text-lg font-semibold">{abilitySource.name}</div>
              <div className="text-sm text-purple-200/80">
                {pendingAbilityPrompt.controller === "player" ? "Your creature" : "AI creature"}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-purple-200/80">
              <span>HP: {abilitySource.currentHealth}</span>
              <span>Strength: {abilitySource.strength}</span>
              <span>Agility: {abilitySource.agility}</span>
            </div>
          </div>
        ) : (
          <div className="mb-4 text-sm text-purple-200/80">Resolve ability prompt</div>
        )}
        <p className="text-slate-200 mb-4 text-sm leading-relaxed">{pendingAbilityPrompt.message}</p>
        {pendingAbilityPrompt.options.length > 0 ? (
          <div className="grid gap-3">
            {pendingAbilityPrompt.options.map((option) => {
              const isSelected = abilitySelections.includes(option.id);
              const selectionClass = pendingAbilityPrompt.selectionMode === "multiple"
                ? isSelected
                  ? "border-purple-400 bg-purple-500/30"
                  : "border-slate-700/80 bg-slate-800/80"
                : "border-slate-700/80 bg-slate-800/80 hover:border-purple-400";
              return (
                <button
                  key={option.id}
                  className={`text-left px-4 py-3 rounded-xl border transition-all text-sm text-slate-200 ${selectionClass}`}
                  onClick={() => onSelect(option.id)}
                >
                  <div className="font-semibold text-slate-100">{option.label}</div>
                  {option.description && <div className="text-slate-300/80">{option.description}</div>}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="text-slate-400 text-center py-4">No options available. Click acknowledge to continue.</p>
        )}
        <div className="flex justify-end gap-3 mt-6">
          {pendingAbilityPrompt.allowSkip && (
            <button
              onClick={onSkip}
              className="px-5 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition"
            >
              Skip
            </button>
          )}
          <button
            onClick={onConfirm}
            disabled={pendingAbilityPrompt.selectionMode !== "none" && abilitySelections.length === 0}
            className={`px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition ${
              pendingAbilityPrompt.selectionMode !== "none" && abilitySelections.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {pendingAbilityPrompt.selectionMode === "none" ? "Acknowledge" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DefenseOverlay({
  defenseResponseMode,
  aiBoard,
  playerBoard,
  playerShields,
  handleDefenseResponse,
  setDefenseResponseMode,
  setPhaseMessage,
  setErrorMessage,
}) {
  const attacker = aiBoard.find((c) => c.instanceId === defenseResponseMode.attackerId);
  const defender = defenseResponseMode.isShieldAttack
    ? playerShields.find((s) => s.id === defenseResponseMode.defenderId)
    : playerBoard.find((c) => c.instanceId === defenseResponseMode.defenderId);

  const execute = (choice, blockerId) => {
    const result = handleDefenseResponse(
      defenseResponseMode.defenderId,
      choice,
      defenseResponseMode.attackerId,
      false,
      blockerId
    );
    if (result?.success) {
      if (result.shieldHit) {
        setPhaseMessage(`Shield hit! ${result.damage} damage dealt. ${result.destroyed ? "Shield destroyed!" : ""}`);
      } else if (result.blocked) {
        setPhaseMessage(
          `${result.blockerName || "Blocker"} blocked! ${result.blockerDestroyed ? "Blocker destroyed!" : `Blocker took ${result.damage} damage`}${
            result.shieldProtected ? " Shield protected!" : ""
          }`
        );
      } else if (result.dodged) {
        setPhaseMessage("Attack dodged! Both creatures exhausted.");
      } else {
        let message = "Combat resolved! ";
        if (result.attackerDestroyed && result.defenderDestroyed) message += "Both creatures destroyed!";
        else if (result.attackerDestroyed) message += "Attacker destroyed!";
        else if (result.defenderDestroyed) message += "Defender destroyed!";
        else message += `Attacker HP ${result.attackerHealth}, Defender HP ${result.defenderHealth}`;
        setPhaseMessage(message);
      }
      setTimeout(() => setPhaseMessage(""), 2500);
      setDefenseResponseMode(null);
    } else if (result?.error) {
      setErrorMessage(result.error);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const canDodge = defenseResponseMode.canDodge && !defenseResponseMode.isShieldAttack;

  return (
    <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center px-4">
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

        <div className="flex justify-center items-center gap-6 mb-6">
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
          <div className="text-yellow-400 text-2xl font-bold">VS</div>
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

        <div className="space-y-4 mb-6">
          {!defenseResponseMode.isExhaustedTarget && !defenseResponseMode.isShieldAttack && (
            <button
              onClick={() => execute("defend")}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-lg transition-all"
            >
              🛡️ Defend (Engage in combat)
            </button>
          )}

          {canDodge && (
            <button
              onClick={() => execute("dodge")}
              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg transition-all"
            >
              💨 Dodge (Attack misses, both exhausted)
            </button>
          )}

          {(defenseResponseMode.isExhaustedTarget || defenseResponseMode.isShieldAttack) && (
            <button
              onClick={() => execute("none")}
              className="w-full py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold text-lg transition-all"
            >
              {defenseResponseMode.isShieldAttack ? "⚔️ Do Nothing (Let attack hit shield)" : "⚔️ Do Nothing (Let attack hit exhausted creature)"}
            </button>
          )}

          {defenseResponseMode.potentialBlockers?.length > 0 && (
            <div className="space-y-2">
              <p className="text-white text-sm mb-2">Or choose a blocker:</p>
              {defenseResponseMode.potentialBlockers.map((blocker) => (
                <button
                  key={blocker.instanceId}
                  onClick={() => execute("block", blocker.instanceId)}
                  className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all"
                >
                  🛡️ Block with {blocker.name} (Agility: {blocker.agility}){defenseResponseMode.isShieldAttack ? " - Protect Shield" : ""}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => execute("defend")}
          className="w-full py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-bold"
        >
          Cancel (Default: Defend)
        </button>
      </div>
    </div>
  );
}

function EssenceSwapOverlay({
  essenceSwapMode,
  playerEssence,
  elementIcons,
  setEssenceSwapMode,
  setSelectedCard,
  setSelectedCardIndex,
  setErrorMessage,
  swapEssence,
}) {
  if (!essenceSwapMode) return null;
  const step = essenceSwapMode.step;

  return (
    <div className="fixed inset-0 z-[10001] bg-black/70 flex items-center justify-center">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-purple-500 shadow-2xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400 mb-6 text-center">
          ✨ Essence Exchange ✨
        </h2>

        {step === 1 && (
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

        {step === 2 && (
          <>
            <p className="text-white text-lg mb-4 text-center">
              How much <span className="capitalize font-bold text-purple-400">{essenceSwapMode.fromElement}</span> essence to swap?
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <img src={elementIcons[essenceSwapMode.fromElement]} alt={essenceSwapMode.fromElement} className="h-16 w-auto object-contain" />
              <div className="text-4xl text-white font-mono">{playerEssence[essenceSwapMode.fromElement]} available</div>
            </div>
            <input
              type="number"
              min="1"
              max={playerEssence[essenceSwapMode.fromElement]}
              value={essenceSwapMode.amount || 1}
              onChange={(e) =>
                setEssenceSwapMode({
                  ...essenceSwapMode,
                  amount: Math.max(1, Math.min(playerEssence[essenceSwapMode.fromElement], parseInt(e.target.value, 10) || 1)),
                })
              }
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

        {step === 3 && (
          <>
            <p className="text-white text-lg mb-6 text-center">
              Swap {essenceSwapMode.amount} <span className="capitalize font-bold text-purple-400">{essenceSwapMode.fromElement}</span> essence TO:
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(playerEssence)
                .filter(([element]) => element !== essenceSwapMode.fromElement)
                .map(([element, amount]) => (
                  <button
                    key={element}
                    onClick={() => {
                      const result = swapEssence(
                        essenceSwapMode.fromElement,
                        element,
                        essenceSwapMode.amount || 1,
                        true,
                        essenceSwapMode.runeZoneIndex
                      );
                      if (result?.success) {
                        setEssenceSwapMode(null);
                        setSelectedCard(null);
                        setSelectedCardIndex(null);
                        setErrorMessage(`Swapped ${essenceSwapMode.amount} ${essenceSwapMode.fromElement} → ${element}!`);
                        setTimeout(() => setErrorMessage(""), 3000);
                      } else if (result?.error) {
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
                ))}
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
  );
}

function EssenceGenerationOverlay({ essenceGenMode, playerEssence, elementIcons, setEssenceGenMode, setSelectedCard, setSelectedCardIndex }) {
  if (!essenceGenMode) return null;
  return (
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
                useGameStore.getState().generateEssenceFromRune(
                  element,
                  essenceGenMode.amount || 2,
                  true,
                  essenceGenMode.runeZoneIndex
                );
                setEssenceGenMode(null);
                setSelectedCard(null);
                setSelectedCardIndex(null);
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
  );
}

function DragonChoiceOverlay({ dragonChoice, playCard, setDragonChoice, setDragonTributeMode, setSelectedCard, setSelectedCardIndex, setPhaseMessage, setErrorMessage }) {
  if (!dragonChoice) return null;
  return (
    <div className="fixed inset-0 z-[10002] bg-black/70 flex items-center justify-center">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-yellow-500 shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Draconic Adaptability</h2>
        <p className="text-white/80 mb-6">Choose how to summon your dragon.</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <button
            className="py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold"
            onClick={() => {
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
        <button className="w-full py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg" onClick={() => setDragonChoice(null)}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function TributeStatus({ dragonTributeMode }) {
  const selectedCreatures = useGameStore
    .getState()
    .playerBoard.filter((c) => dragonTributeMode.selectedIds.includes(c.instanceId));
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[10002]">
      <div className="px-4 py-2 rounded-full bg-purple-700 text-white shadow-lg text-sm font-semibold flex items-center gap-2">
        <span>Selected:</span>
        {selectedCreatures.length > 0 ? selectedCreatures.map((c) => c.name).join(", ") : "None"}
      </div>
    </div>
  );
}

function DragonConfirmOverlay({ dragonConfirmTribute, summonDragonByTribute, setDragonConfirmTribute, setDragonTributeMode, setSelectedCard, setSelectedCardIndex }) {
  const selectedCreatures = useGameStore
    .getState()
    .playerBoard.filter((c) => dragonConfirmTribute.selectedIds.includes(c.instanceId));
  return (
    <div className="fixed inset-0 z-[10003] bg-black/70 flex items-center justify-center">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border-4 border-yellow-500 shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Confirm Tribute</h2>
        <p className="text-white/80 mb-4">You are about to tribute:</p>
        <div className="flex items-center justify-center gap-3 mb-6 text-white font-semibold">
          {selectedCreatures.map((c) => (
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
  );
}

function Toast({ message, tone }) {
  const variants = {
    error: "bg-red-600",
    phase: "bg-gradient-to-r from-purple-600 to-blue-600",
    ai: "bg-gradient-to-r from-red-600 to-orange-600",
  };
  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] text-white px-8 py-6 rounded-lg shadow-2xl font-bold text-xl text-center whitespace-pre-line ${
      variants[tone] || "bg-slate-800"
    }`}>
      {message}
    </div>
  );
}

function CardHoverPreview({ card }) {
  if (!card) return null;
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
      <div className="relative" style={{ width: "360px", height: "504px" }}>
        <img
          src={card.imagePath || `/images/cards/new/${card.id.replace(/_/g, " ")}.webp`}
          alt={card.name}
          className="w-full h-full object-contain shadow-2xl rounded-lg"
        />
      </div>
    </div>
  );
}
