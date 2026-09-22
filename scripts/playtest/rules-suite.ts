import "./fast-timers";
import { useGameStore } from "../../src/store/gameStore";
import { allCards } from "../../src/data/cards";
import type { BoardCreature } from "../../src/types/tcg";

const out = console.log.bind(console);
console.log = () => {};

const s = () => useGameStore.getState();

let passed = 0;
const failures: string[] = [];

function check(name: string, cond: boolean, detail = "") {
  if (cond) {
    passed++;
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
  }
}

// Put a specific creature on the board in a known state so combat can be tested in isolation.
function place(controller: "player" | "ai", cardKey: string, overrides: Partial<BoardCreature> = {}) {
  const card: any = (allCards as any)[cardKey];
  if (!card) throw new Error(`no such card: ${cardKey}`);
  const boardKey = controller === "player" ? "playerBoard" : "aiBoard";
  const creature: BoardCreature = {
    ...card,
    instanceId: `${controller}-${cardKey}-${Math.random().toString(36).slice(2, 8)}`,
    currentHealth: card.strength,
    hasAction: true,
    canAttack: true,
    exhausted: false,
    hasActivatedAbilityThisTurn: false,
    temporaryStrengthBonus: 0,
    doubleStrikeUntilEndOfTurn: false,
    pierceUntilEndOfTurn: false,
    cannotBeBlocked: false,
    ...overrides,
  };
  useGameStore.setState({ [boardKey]: [...s()[boardKey], creature] } as any);
  return creature;
}

function freshGame(playerFirst = true) {
  s().resetGame();
  s().initializeGame("lightning", "crystal", playerFirst);
  useGameStore.setState({ playerBoard: [], aiBoard: [], currentPhase: "battle", currentTurn: "player" } as any);
}

out("=================== ELEKIN RULES CONFORMANCE ===================\n");

// ---------------------------------------------------------------- setup
{
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  const g = s();
  check("setup: 500 life points each", g.playerHealth === 500 && g.aiHealth === 500, `${g.playerHealth}/${g.aiHealth}`);
  check("setup: 5 card starting hand", g.playerHand.length === 5 && g.aiHand.length === 5, `${g.playerHand.length}/${g.aiHand.length}`);
  check("setup: 40 card deck minus opening hand", g.playerDeck.length === 35, `${g.playerDeck.length}`);
  check("setup: exactly 3 shields each", g.playerShields.length === 3 && g.aiShields.length === 3);
  check("setup: one shield of each tier", [1, 2, 3].every((t) => g.playerShields.some((x) => x.tier === t)));
  check("setup: shield HP is 150/300/450 by tier",
    g.playerShields.every((x) => x.currentHealth === { 1: 150, 2: 300, 3: 450 }[x.tier]));
  check("setup: shields start face-down", g.playerShields.every((x) => x.faceDown));
  check("setup: every shield has two break effects",
    g.playerShields.every((x) => x.effects?.length === 2) && g.aiShields.every((x) => x.effects?.length === 2),
    JSON.stringify(g.playerShields.map((x) => x.effects?.length)));
  check("setup: essence starts empty", Object.values(g.playerEssence).every((v) => v === 0));
}

// ------------------------------------------------------- first turn rules
{
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  check("first turn: first player starts in Main Phase 1 (no draw)", s().currentPhase === "main1");
  s().nextPhase();
  check("first turn: first player skips Battle Phase", s().currentPhase === "main2", `got ${s().currentPhase}`);
  s().nextPhase();
  s().endTurn();
  check("first turn: second player begins at Draw Phase", s().currentPhase === "draw" && s().currentTurn === "ai");
  s().drawCard(false);
  s().nextPhase(); // draw -> generate
  s().nextPhase(); // generate -> main1
  s().nextPhase(); // main1 -> battle, which the second player is entitled to
  check("first turn: second player DOES get a Battle Phase", s().currentPhase === "battle", `got ${s().currentPhase}`);
}

// ------------------------------------------------------------ essence
{
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  useGameStore.setState({ playerEssence: { fire: 19, water: 0, earth: 0, air: 0 } } as any);
  place("player", "EmberFlicker");
  useGameStore.setState({ currentPhase: "draw", currentTurn: "player" } as any);
  s().nextPhase(); // draw -> generate runs generation
  check("essence: pool caps at 20 per element", s().playerEssence.fire <= 20, `fire=${s().playerEssence.fire}`);

  // Dragons must not generate
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  useGameStore.setState({ playerBoard: [], playerEssence: { fire: 0, water: 0, earth: 0, air: 0 }, currentPhase: "draw", currentTurn: "player" } as any);
  place("player", "Veton");
  s().nextPhase();
  const dragonGen = s().playerEssence.air + s().playerEssence.fire;
  check("essence: dragons generate nothing", dragonGen === 0, `dragon produced ${dragonGen}`);
}

// -------------------------------------------------------- hand / deck
{
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  const seven = s().playerDeck.slice(0, 7);
  useGameStore.setState({ playerHand: seven, currentPhase: "draw", currentTurn: "player", hasDrawnThisTurn: false } as any);
  const before = s().playerDeck.length;
  s().drawCard(true);
  check("draw: at 7 cards the draw is skipped, not forced", s().playerHand.length === 7 && s().playerDeck.length === before,
    `hand=${s().playerHand.length} deck went ${before}->${s().playerDeck.length}`);

  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  useGameStore.setState({ playerDeck: [], currentPhase: "draw", currentTurn: "player", hasDrawnThisTurn: false } as any);
  s().drawCard(true);
  check("deck-out: failing a Draw Phase draw loses the game", s().gameStatus === "ai_won", `status=${s().gameStatus}`);

  // End Phase trims to the hand limit
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  useGameStore.setState({ playerHand: s().playerDeck.slice(0, 10), currentPhase: "end", currentTurn: "player" } as any);
  s().endTurn();
  check("end phase: hand is trimmed to 7", s().playerHand.length === 7, `hand=${s().playerHand.length}`);
}

// -------------------------------------------------------------- summon
{
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  const idx = s().playerHand.findIndex((c) => c.cardType === "creature" && c.cost === 0);
  if (idx >= 0) {
    useGameStore.setState({ currentPhase: "main1", currentTurn: "player", hasNormalSummonedThisTurn: false } as any);
    const r1: any = s().playCard(idx, true, "creature", 0);
    check("summon: a 0-cost creature can be summoned in Main Phase 1", r1?.success === true, r1?.error);
    const idx2 = s().playerHand.findIndex((c) => c.cardType === "creature" && c.cost === 0);
    if (idx2 >= 0) {
      const r2: any = s().playCard(idx2, true, "creature", 1);
      check("summon: only one normal summon per turn", r2?.success === false, `second summon returned ${JSON.stringify(r2)}`);
    }
  }

  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  const idx3 = s().playerHand.findIndex((c) => c.cardType === "creature" && c.cost === 0);
  if (idx3 >= 0) {
    useGameStore.setState({ currentPhase: "main2", currentTurn: "player", hasNormalSummonedThisTurn: false } as any);
    const r: any = s().playCard(idx3, true, "creature", 0);
    check("summon: normal summon allowed in Main Phase 2 if unused", r?.success === true, `returned ${JSON.stringify(r)}`);
    check("summon: MP2 summon still counts as the one normal summon", s().hasNormalSummonedThisTurn === true);
  }

  // Field cap of 5
  s().resetGame();
  s().initializeGame("lightning", "crystal", true);
  useGameStore.setState({ playerBoard: [], currentPhase: "main1", currentTurn: "player", hasNormalSummonedThisTurn: false } as any);
  for (let i = 0; i < 5; i++) place("player", "Glint");
  const idx4 = s().playerHand.findIndex((c) => c.cardType === "creature" && c.cost === 0);
  if (idx4 >= 0) {
    const r: any = s().playCard(idx4, true, "creature", 0);
    check("summon: Creature Zone caps at 5", r?.success === false, `board=${s().playerBoard.length} returned ${JSON.stringify(r)}`);
  }
}

// -------------------------------------------------------------- combat
{
  // Attacker with higher agility should kill a weaker defender outright.
  // Archen 105/75 attacks Driplets 80/70 -> 105 >= 80, defender dies, attacker takes 0 (dead before it acts).
  freshGame();
  const atk = place("player", "Archen");
  const def = place("ai", "Driplets");
  const r: any = s().initiateAttack(atk.instanceId, def.instanceId, "creature", true);
  check("combat: attacking a creature returns a result", !!r, "initiateAttack returned nothing");
  if (r?.requiresResponse) {
    s().handleDefenseResponse(def.instanceId, "defend", atk.instanceId, true);
  }
  const defGone = !s().aiBoard.some((c) => c.instanceId === def.instanceId);
  check("combat: faster attacker destroys a weaker defender", defGone,
    `defender still alive at ${s().aiBoard.find((c) => c.instanceId === def.instanceId)?.currentHealth} HP`);
  const atkAfter = s().playerBoard.find((c) => c.instanceId === atk.instanceId);
  check("combat: attacker is exhausted after attacking", atkAfter?.exhausted === true || atkAfter === undefined);
  check("combat: creature destroyed before it strikes deals no damage back",
    atkAfter === undefined || atkAfter.currentHealth === atk.currentHealth,
    `attacker at ${atkAfter?.currentHealth}/${atk.currentHealth}`);

  // Blocking requires strictly higher agility than the attacker.
  freshGame();
  const a2 = place("player", "Archen"); // agility 75
  const t2 = place("ai", "Crag"); // agility 30
  place("ai", "Khorn", { agility: 10 } as any); // too slow to block
  const r2: any = s().initiateAttack(a2.instanceId, t2.instanceId, "creature", true);
  const blockers = r2?.potentialBlockers ?? [];
  check("combat: a slower creature is not offered as a blocker", blockers.length === 0,
    `offered ${JSON.stringify(blockers)}`);

  freshGame();
  const a3 = place("player", "Crag"); // agility 30
  const t3 = place("ai", "Khorn");
  const fast = place("ai", "Glint"); // high agility, should be a legal blocker
  const r3: any = s().initiateAttack(a3.instanceId, t3.instanceId, "creature", true);
  const blockers3 = (r3?.potentialBlockers ?? []).map((b: any) => b.instanceId);
  check("combat: a faster creature IS offered as a blocker", blockers3.includes(fast.instanceId),
    `offered ${JSON.stringify(r3?.potentialBlockers)}`);

  // Dodging requires strictly higher agility than the attacker.
  freshGame();
  const a4 = place("player", "Crag"); // agility 30
  const d4 = place("ai", "Glint"); // faster, may dodge
  const r4: any = s().initiateAttack(a4.instanceId, d4.instanceId, "creature", true);
  check("combat: a faster defender may dodge", r4?.canDodge === true, `canDodge=${r4?.canDodge}`);

  freshGame();
  const a5 = place("player", "Archen"); // agility 75
  const d5 = place("ai", "Crag"); // agility 30, cannot dodge
  const r5: any = s().initiateAttack(a5.instanceId, d5.instanceId, "creature", true);
  check("combat: a slower defender may not dodge", r5?.canDodge === false, `canDodge=${r5?.canDodge}`);
}

// -------------------------------------------------------------- shields
{
  freshGame();
  const shieldBefore = s().aiShields[0];
  const atk = place("player", "Archen"); // 105 strength
  const r: any = s().initiateAttack(atk.instanceId, shieldBefore.id, "shield", true);
  check("shields: a shield can be attacked", r?.success === true, r?.error);
  const after = s().aiShields.find((x) => x.id === shieldBefore.id);
  const expected = shieldBefore.currentHealth - atk.strength;
  if (expected > 0) {
    check("shields: damage equal to attacker Strength is applied to shield HP",
      !!after && after.currentHealth === expected,
      `${shieldBefore.currentHealth} - ${atk.strength} should be ${expected}, got ${after?.currentHealth}`);
    check("shields: a damaged shield is revealed", after?.faceDown === false, `faceDown=${after?.faceDown}`);
  }

  // Excess damage must not carry past the shield without Pierce
  freshGame();
  useGameStore.setState({ aiShields: [{ ...s().aiShields.find((x) => x.tier === 1)! }] } as any);
  const big = place("player", "Diamoria"); // very high strength vs a 150 HP tier 1
  const shieldId = s().aiShields[0].id;
  const hpBefore = s().aiHealth;
  s().initiateAttack(big.instanceId, shieldId, "shield", true);
  check("shields: breaking a shield does not spill damage to life points without Pierce",
    s().aiHealth === hpBefore, `life went ${hpBefore} -> ${s().aiHealth}`);
  check("shields: a broken shield leaves the shield zone",
    !s().aiShields.some((x) => x.id === shieldId));
  check("shields: a broken shield is sent to the discard pile",
    s().aiDiscard.some((c: any) => c.id === shieldId));
  check("shields: the AI resolves its own break and reveals the chosen effect",
    s().pendingShieldBreak === undefined && !!s().lastShieldBreakReveal,
    `pending=${s().pendingShieldBreak?.shield?.name} reveal=${s().lastShieldBreakReveal?.shieldName}`);
  if (s().lastShieldBreakReveal) s().dismissShieldBreakReveal();

  // Breaking a shield during Battle Phase ends battle and moves to Main Phase 2
  freshGame();
  useGameStore.setState({
    currentPhase: "battle",
    currentTurn: "player",
    aiShields: [{ ...s().aiShields.find((x) => x.tier === 1)! }],
  } as any);
  const battleAtk = place("player", "Diamoria");
  const battleShieldId = s().aiShields[0].id;
  s().initiateAttack(battleAtk.instanceId, battleShieldId, "shield", true);
  check("shields: breaking a shield ends the Battle Phase",
    s().currentPhase === "main2", `phase=${s().currentPhase}`);

  // A player shield break must pause and wait for the player to choose.
  freshGame();
  useGameStore.setState({
    playerShields: [s().playerShields.find((x) => x.tier === 1)!],
    currentTurn: "ai",
  } as any);
  const aiAtk = place("ai", "Diamoria");
  const pShieldId = s().playerShields[0].id;
  s().initiateAttack(aiAtk.instanceId, pShieldId, "shield", false);
  const pending = s().pendingShieldBreak;
  check("shields: a player break pauses for a choice of two effects",
    !!pending && pending.controller === "player" && pending.shield.effects?.length === 2,
    `pending=${JSON.stringify(pending?.shield?.name)} effects=${pending?.shield?.effects?.length}`);
  check("shields: the turn cannot end while a break is unresolved",
    (() => { const t = s().currentTurn; s().endTurn(); return s().currentTurn === t; })());
  if (pending) {
    const bad: any = s().resolveShieldBreak("not_a_real_effect");
    check("shields: only that shield's own effects can be chosen", bad?.success === false, JSON.stringify(bad));
    const good: any = s().resolveShieldBreak(pending.shield.effects![0].id);
    check("shields: choosing an effect resolves the break", good?.success === true, JSON.stringify(good));
    check("shields: break is cleared after resolving", s().pendingShieldBreak === undefined);
  }

  // Every shield effect must actually be implemented.
  {
    const unimplemented: string[] = [];
    for (const deck of ["crystal", "lightning"] as const) {
      s().resetGame();
      s().initializeGame(deck, deck, true);
      for (const shield of s().playerShields) {
        for (const eff of shield.effects ?? []) {
          s().resetGame();
          s().initializeGame(deck, deck, true);
          useGameStore.setState({ pendingShieldBreak: { controller: "player", shield, overflowDamage: 0 } } as any);
          const r: any = s().resolveShieldBreak(eff.id);
          if (!r?.success || String(r.summary ?? "").includes("not implemented")) {
            unimplemented.push(`${shield.name} / ${eff.id}: ${r?.summary ?? r?.error}`);
          }
        }
      }
    }
    check(`shields: all 12 break effects are implemented`, unimplemented.length === 0,
      "\n            " + unimplemented.join("\n            "));
  }

  // Direct attacks are illegal while any shield stands
  freshGame();
  const a = place("player", "Archen");
  const rf: any = s().initiateAttack(a.instanceId, "face", "face", true);
  check("shields: cannot attack life points while shields remain", rf?.success === false, JSON.stringify(rf));

  // Regeneration to the next threshold at End Phase
  freshGame();
  const t2shield = s().aiShields.find((x) => x.tier === 2)!;
  useGameStore.setState({
    aiShields: s().aiShields.map((x) => (x.id === t2shield.id ? { ...x, currentHealth: 100, faceDown: false } : x)),
    currentPhase: "end",
    currentTurn: "player",
  } as any);
  s().endTurn();
  const restored = s().aiShields.find((x) => x.id === t2shield.id);
  check("shields: a tier 2 shield at 100 HP regenerates to 150, not 300",
    restored?.currentHealth === 150, `restored to ${restored?.currentHealth}`);
}

out(`PASSED: ${passed}`);
out(`FAILED: ${failures.length}\n`);
for (const f of failures) out("  FAIL  " + f);
if (failures.length) process.exitCode = 1;
