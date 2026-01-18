import { useCallback, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import TCGGameBoard from '@/components/TCGGameBoard';
import TutorialOverlay from '@/components/tutorial/TutorialOverlay';
import { useGameStore } from '@/store/gameStore';
import { getCardById } from '@/data/cards';

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitFor(predicate, { timeoutMs = 2500, intervalMs = 50 } = {}) {
  const start = Date.now();
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (predicate()) return true;
    if (Date.now() - start > timeoutMs) return false;
    // eslint-disable-next-line no-await-in-loop
    await sleep(intervalMs);
  }
}

export default function HowToPlayInteractiveDemoPage() {
  const [runId, setRunId] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const resetGame = useGameStore((s) => s.resetGame);
  const endTurn = useGameStore((s) => s.endTurn);
  const nextPhase = useGameStore((s) => s.nextPhase);
  const drawCard = useGameStore((s) => s.drawCard);

  const makeCreature = useCallback((cardId, instanceId, overrides = {}) => {
    const base = getCardById(cardId);
    if (!base) throw new Error(`Card not found: ${cardId}`);
    if (base.cardType !== 'creature') throw new Error(`Not a creature card: ${cardId}`);
    return {
      ...base,
      instanceId,
      currentHealth: base.strength,
      hasAction: true,
      canAttack: true,
      exhausted: false,
      hasActivatedAbilityThisTurn: false,
      temporaryStrengthBonus: 0,
      doubleStrikeUntilEndOfTurn: false,
      pierceUntilEndOfTurn: false,
      ...overrides,
    };
  }, []);

  const makeShield = useCallback(({ id, name, tier, element, currentHealth, currentTier, faceDown }) => {
    return {
      id,
      name,
      tier,
      element,
      cost: 0,
      rarity: 'common',
      cardType: 'shield',
      currentHealth,
      currentTier,
      faceDown,
      maxHealthByTier: { 1: 150, 2: 300, 3: 450 },
    };
  }, []);

  const loadScenario = useCallback(async (scenarioId) => {
    // Keep AI paused via tutorialMode; we can safely set state for consistent examples.
    if (scenarioId === 'essence_example') {
      useGameStore.setState({
        gameStatus: 'playing',
        currentTurn: 'player',
        currentPhase: 'main1',
        turnNumber: 2,
        playerHealth: 500,
        aiHealth: 500,
        playerEssence: { fire: 1, water: 3, earth: 0, air: 0 },
        aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
        playerBoard: [
          makeCreature('aqua_dart', 'tut_player_aqua', { hasAction: true, exhausted: false, essenceGeneration: 2 }),
        ],
        aiBoard: [],
        playerRuneCounterZone: Array(5).fill(null),
        aiRuneCounterZone: Array(5).fill(null),
        playerShields: [
          makeShield({ id: 'radiant_buckler', name: 'Radiant Buckler', tier: 1, element: 'water', currentHealth: 150, currentTier: 1, faceDown: false }),
          makeShield({ id: 'spectral_shield', name: 'Spectral Shield', tier: 2, element: 'water', currentHealth: 300, currentTier: 2, faceDown: false }),
          makeShield({ id: 'titans_shield', name: "Titan's Shield", tier: 3, element: 'earth', currentHealth: 450, currentTier: 3, faceDown: false }),
        ],
        aiShields: [
          makeShield({ id: 'mystic_ward', name: 'Mystic Ward', tier: 1, element: 'air', currentHealth: 150, currentTier: 1, faceDown: false }),
        ],
        pendingAbilityPrompt: undefined,
        activeAbilityContext: undefined,
        battleLog: [],
      });
      await sleep(100);
      return;
    }

    if (scenarioId === 'shield_example') {
      useGameStore.setState({
        gameStatus: 'playing',
        currentTurn: 'player',
        currentPhase: 'battle',
        turnNumber: 3,
        playerHealth: 500,
        aiHealth: 500,
        playerEssence: { fire: 0, water: 2, earth: 2, air: 0 },
        aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
        playerBoard: [makeCreature('crag', 'tut_player_crag', { hasAction: true, exhausted: false, essenceGeneration: 1 })],
        aiBoard: [],
        playerShields: [
          makeShield({ id: 'radiant_buckler', name: 'Radiant Buckler', tier: 1, element: 'water', currentHealth: 120, currentTier: 1, faceDown: false }),
          makeShield({ id: 'spectral_shield', name: 'Spectral Shield', tier: 2, element: 'water', currentHealth: 210, currentTier: 2, faceDown: false }),
          makeShield({ id: 'titans_shield', name: "Titan's Shield", tier: 3, element: 'earth', currentHealth: 320, currentTier: 3, faceDown: false }),
        ],
        aiShields: [
          makeShield({ id: 'elemental_shield', name: 'Elemental Shield', tier: 3, element: 'fire', currentHealth: 180, currentTier: 2, faceDown: false }),
        ],
        pendingAbilityPrompt: undefined,
        activeAbilityContext: undefined,
        battleLog: [],
      });
      await sleep(100);
      return;
    }

    if (scenarioId === 'battle_example') {
      useGameStore.setState({
        gameStatus: 'playing',
        currentTurn: 'player',
        currentPhase: 'battle',
        turnNumber: 3,
        playerHealth: 500,
        aiHealth: 500,
        playerEssence: { fire: 2, water: 2, earth: 0, air: 0 },
        aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
        playerBoard: [
          makeCreature('ember_flicker', 'tut_player_ember', { hasAction: true, exhausted: false }),
          makeCreature('aqua_dart', 'tut_player_aqua2', { hasAction: true, exhausted: false }),
        ],
        aiBoard: [
          makeCreature('piddip', 'tut_ai_piddip', { hasAction: true, exhausted: false }),
        ],
        playerShields: [
          makeShield({ id: 'radiant_buckler', name: 'Radiant Buckler', tier: 1, element: 'water', currentHealth: 150, currentTier: 1, faceDown: false }),
          makeShield({ id: 'spectral_shield', name: 'Spectral Shield', tier: 2, element: 'water', currentHealth: 300, currentTier: 2, faceDown: false }),
          makeShield({ id: 'titans_shield', name: "Titan's Shield", tier: 3, element: 'earth', currentHealth: 450, currentTier: 3, faceDown: false }),
        ],
        aiShields: [
          makeShield({ id: 'mystic_ward', name: 'Mystic Ward', tier: 1, element: 'air', currentHealth: 150, currentTier: 1, faceDown: false }),
        ],
        pendingAbilityPrompt: undefined,
        activeAbilityContext: undefined,
        battleLog: [],
      });
      await sleep(100);
      return;
    }

    if (scenarioId === 'ability_example') {
      const source = makeCreature('ivy_mantis', 'tut_player_ivy', { hasAction: true, exhausted: false });
      useGameStore.setState({
        gameStatus: 'playing',
        currentTurn: 'player',
        currentPhase: 'main1',
        turnNumber: 3,
        playerHealth: 500,
        aiHealth: 500,
        playerEssence: { fire: 0, water: 0, earth: 2, air: 0 },
        aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
        playerBoard: [source],
        aiBoard: [],
        playerRuneCounterZone: Array(5).fill(null),
        aiRuneCounterZone: Array(5).fill(null),
        playerShields: [
          makeShield({ id: 'radiant_buckler', name: 'Radiant Buckler', tier: 1, element: 'water', currentHealth: 150, currentTier: 1, faceDown: false }),
          makeShield({ id: 'spectral_shield', name: 'Spectral Shield', tier: 2, element: 'water', currentHealth: 300, currentTier: 2, faceDown: false }),
          makeShield({ id: 'titans_shield', name: "Titan's Shield", tier: 3, element: 'earth', currentHealth: 450, currentTier: 3, faceDown: false }),
        ],
        aiShields: [
          makeShield({ id: 'mystic_ward', name: 'Mystic Ward', tier: 1, element: 'air', currentHealth: 150, currentTier: 1, faceDown: false }),
        ],
        pendingAbilityPrompt: {
          controller: 'player',
          sourceInstanceId: source.instanceId,
          sourceCardId: source.id,
          abilityId: 'sneaky_insight',
          message: 'Sneaky Insight: Choose one option.',
          selectionMode: 'single',
          allowSkip: true,
          options: [
            { id: 'reveal_rune', label: 'Reveal a face-down rune/counter', type: 'rune' },
            { id: 'flip_shield', label: 'Flip an unrevealed shield face-up', type: 'shield' },
          ],
        },
        battleLog: [],
      });
      await sleep(100);
      return;
    }

    if (scenarioId === 'win_example') {
      useGameStore.setState({
        gameStatus: 'playing',
        currentTurn: 'player',
        currentPhase: 'battle',
        turnNumber: 5,
        playerHealth: 140,
        aiHealth: 60,
        playerEssence: { fire: 3, water: 3, earth: 0, air: 0 },
        aiEssence: { fire: 0, water: 0, earth: 0, air: 0 },
        playerBoard: [makeCreature('ember_flicker', 'tut_player_ember_win', { hasAction: true, exhausted: false })],
        aiBoard: [],
        playerShields: [
          makeShield({ id: 'radiant_buckler', name: 'Radiant Buckler', tier: 1, element: 'water', currentHealth: 0, currentTier: 1, faceDown: false }),
        ],
        aiShields: [],
        pendingAbilityPrompt: undefined,
        activeAbilityContext: undefined,
        battleLog: [],
      });
      await sleep(100);
    }
  }, [makeCreature, makeShield]);

  const steps = useMemo(() => {
    return [
      {
        id: 'welcome',
        title: 'Interactive How-To-Play (Sections)',
        body:
          'We’ll break the game into sections:\n\n1) Turn Phases\n2) Essence (resource system)\n3) Shields\n4) Battle Phase\n5) Creature abilities\n6) How to win\n\nUse Next/Back any time.',
        targetSelector: '[data-tutorial-id="turnControls"]',
        placement: 'left',
      },
      {
        id: 'turnPhasesIntro',
        title: 'Section 1 — Turn Phases',
        body:
          'Every turn has phases:\nDraw → Generate → Main 1 → Battle → Main 2 → End.\n\nThis panel is your “turn control center.”',
        targetSelector: '[data-tutorial-id="turnControls"]',
        placement: 'left',
      },
      {
        id: 'phaseButtonExplainer',
        title: 'Advance phases',
        body:
          'This button changes based on the phase.\n\n- On Draw Phase it says “Draw”\n- Otherwise it advances to the next phase\n- On End Phase it becomes “Pass Turn”',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
      },
      {
        id: 'hand',
        title: 'Your Hand (cards you can play)',
        body:
          'Hover your hand to expand it.\n\nIn Main Phase 1/2 you can select a card, then click a zone to place it.',
        targetSelector: '[data-tutorial-id="hand"]',
        placement: 'top',
      },
      {
        id: 'playerZone',
        title: 'Your Creature Zone',
        body:
          'Creatures go here (max 5).\n\nDuring Battle Phase, you attack by selecting one of your creatures with an action, then clicking a target.',
        targetSelector: '[data-tutorial-id="playerCreatureZone"]',
        placement: 'right',
      },
      {
        id: 'advanceToMain2',
        title: 'Turn 1 rule (first player)',
        body:
          'On Turn 1, the game skips Battle Phase for the first player.\n\nPress Next to advance your phase now.',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
        action: async () => {
          nextPhase(); // Turn 1: main1 -> main2
          await sleep(150);
        },
      },
      {
        id: 'toEnd',
        title: 'End Phase',
        body:
          'From Main Phase 2, you go to End Phase.\n\nPress Next to go to End Phase.',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
        action: async () => {
          nextPhase(); // main2 -> end
          await sleep(150);
        },
      },
      {
        id: 'passTurn',
        title: 'Pass Turn',
        body:
          'From End Phase, the phase button becomes “Pass Turn”.\n\nPress Next to pass the turn.',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
        action: async () => {
          nextPhase(); // end -> endTurn()
          await sleep(150);
        },
      },
      {
        id: 'backToPlayerDraw',
        title: 'Back to your Draw Phase (for the demo)',
        body:
          'Normally the AI would act here.\n\nFor the tutorial, we’ll skip AI and return to your Draw Phase so you can see the “Draw” interaction.',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
        action: async () => {
          // We are now on AI turn, Draw phase. Jump back to player Draw phase for the demo.
          endTurn(); // ai -> player (turnNumber increments)
          await sleep(200);
        },
      },
      {
        id: 'drawPhase',
        title: 'Draw → Generate → Main Phase 1 (fast demo)',
        body:
          'We’ll do the standard flow:\n\n1) Draw\n2) Generate (adds essence)\n3) Main Phase 1\n\nPress Next to run it.',
        targetSelector: '[data-tutorial-id="phaseButton"]',
        placement: 'left',
        action: async () => {
          // drawCard only works if it is player's draw phase
          drawCard(true);
          await sleep(80);
          nextPhase(); // draw -> generate (auto essence generation)
          await sleep(80);
          nextPhase(); // generate -> main1
          await sleep(150);
        },
      },
      {
        id: 'essenceIntro',
        title: 'Section 2 — Essence (Resource System)',
        body:
          'Essence is your resource to summon creatures and pay for certain abilities.\n\nYou track 4 elements: Fire, Water, Earth, Air.',
        targetSelector: '[data-tutorial-id="playerEssence"]',
        placement: 'right',
        action: async () => {
          await loadScenario('essence_example');
        },
      },
      {
        id: 'essenceGeneration',
        title: 'Generate Phase adds essence',
        body:
          'In Generate Phase, creatures on your field add essence automatically.\n\nIf you have no creatures, you’ll generate 0 — that’s why early turns focus on getting a creature down.',
        targetSelector: '[data-tutorial-id="playerEssence"]',
        placement: 'right',
      },
      {
        id: 'shieldsIntro',
        title: 'Section 3 — Shields',
        body:
          'Each player starts with 3 shields (Tier 1/2/3).\n\nShields protect your HP. When a shield breaks, it triggers an effect and ends the battle phase.',
        targetSelector: '[data-tutorial-id="playerShieldZone"]',
        placement: 'top',
        action: async () => {
          await loadScenario('shield_example');
        },
      },
      {
        id: 'opponentShieldZone',
        title: 'Enemy shields are targets',
        body:
          'In Battle Phase, you can attack enemy creatures or shields.\n\nIf all enemy shields are gone, the “Direct Attack” target appears here.',
        targetSelector: '[data-tutorial-id="opponentShieldZone"]',
        placement: 'bottom',
      },
      {
        id: 'battleIntro',
        title: 'Section 4 — Battle Phase (how to attack)',
        body:
          'Battle is interactive:\n\n1) Select one of your creatures with an action\n2) Click a target (enemy creature or shield)\n3) Defender may respond (defend / dodge / block) depending on agility and actions.',
        targetSelector: '[data-tutorial-id="playerCreatureZone"]',
        placement: 'right',
        action: async () => {
          await loadScenario('battle_example');
        },
      },
      {
        id: 'abilitiesIntro',
        title: 'Section 5 — Creature abilities',
        body:
          'Some creatures show ability buttons on the card during Main Phase.\n\nWhen an ability triggers a choice, you’ll see an “Ability Resolution” popup with options.',
        targetSelector: '[data-tutorial-id="hand"]',
        placement: 'top',
        action: async () => {
          await loadScenario('ability_example');
        },
      },
      {
        id: 'winConditions',
        title: 'Section 6 — How to win',
        body:
          'You win by:\n\n- Reducing enemy HP to 0\n- OR the opponent can’t draw on their Draw Phase (deck-out)\n\nHP is always visible here.',
        targetSelector: '[data-tutorial-id="playerHealth"]',
        placement: 'top',
        action: async () => {
          await loadScenario('win_example');
        },
      },
    ];
  }, [drawCard, endTurn, nextPhase, loadScenario]);

  const hardReset = useCallback(async () => {
    setRunId((x) => x + 1); // remount board so its internal init runs again
    resetGame();
    await waitFor(() => useGameStore.getState().gameStatus === 'playing', { timeoutMs: 3000 });
  }, [resetGame]);

  const replayTo = useCallback(
    async (targetIndex) => {
      await hardReset();
      // Replay step actions from 0..targetIndex-1
      for (let i = 0; i < targetIndex; i++) {
        const s = steps[i];
        if (s?.action) {
          // eslint-disable-next-line no-await-in-loop
          await s.action();
        }
      }
    },
    [hardReset, steps]
  );

  const handleNext = useCallback(async () => {
    const current = steps[stepIndex];
    if (current?.action) {
      await current.action();
    }
    setStepIndex((i) => Math.min(steps.length - 1, i + 1));
  }, [stepIndex, steps]);

  const handleBack = useCallback(async () => {
    const prev = Math.max(0, stepIndex - 1);
    await replayTo(prev);
    setStepIndex(prev);
  }, [replayTo, stepIndex]);

  const handleClose = useCallback(() => setIsOpen(false), []);

  return (
    <div className="min-h-screen bg-[#1A103C]">
      <Helmet>
        <title>Interactive How To Play - Elekin TCG</title>
        <meta name="description" content="Interactive how-to-play demo for Elekin TCG using the online game interface." />
        <link rel="canonical" href="https://www.elementalgames.gg/elekin/how-to-play/interactive-demo" />
      </Helmet>

      <div className="h-[100dvh]">
        <TCGGameBoard key={runId} playerDeck="crystal" playerGoesFirst={true} tutorialMode={true} />
      </div>

      <TutorialOverlay
        isOpen={isOpen}
        step={steps[stepIndex]}
        stepIndex={stepIndex}
        stepCount={steps.length}
        onNext={handleNext}
        onBack={handleBack}
        onClose={handleClose}
      />
    </div>
  );
}


