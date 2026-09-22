import "./fast-timers";
import { useGameStore } from "../../src/store/gameStore";

// The engine logs verbosely on every combat step; silence it and print our own report.
const out = console.log.bind(console);
console.log = () => {};

type Issue = { kind: string; detail: string; turn: number; phase: string };

const issues: Issue[] = [];
const seen = new Set<string>();

const s = () => useGameStore.getState();

function report(kind: string, detail: string) {
  const key = `${kind}|${detail}`;
  if (seen.has(key)) return;
  seen.add(key);
  issues.push({ kind, detail, turn: s().turnNumber, phase: s().currentPhase });
}

function checkInvariants() {
  const g = s();

  for (const [who, hp] of [["player", g.playerHealth], ["ai", g.aiHealth]] as const) {
    if (hp > 500) report("health-overflow", `${who} health ${hp} exceeds starting 500`);
    if (hp < 0) report("health-negative", `${who} health went to ${hp} instead of clamping at 0`);
  }

  // Broken shields legitimately leave the zone, so only check that none exceeds its tier cap
  // and that shields plus exempted shields still account for the original three.
  for (const [who, shields, discard] of [
    ["player", g.playerShields, g.playerDiscard],
    ["ai", g.aiShields, g.aiDiscard],
  ] as const) {
    const brokenShields = discard.filter((c: any) => c.cardType === "shield").length;
    if (shields.length + brokenShields > 3) {
      report("shield-count", `${who} has ${shields.length} standing + ${brokenShields} broken shields in discard (more than 3)`);
    }
    for (const sh of shields) {
      const cap = sh.maxHealthByTier?.[sh.currentTier];
      if (cap !== undefined && sh.currentHealth > cap) {
        report("shield-overheal", `${who} shield ${sh.name} at ${sh.currentHealth} exceeds tier ${sh.currentTier} cap ${cap}`);
      }
    }
  }

  if (g.playerHealth <= 0 && g.gameStatus === "playing") report("no-win-detect", "player at 0 health but gameStatus still 'playing'");
  if (g.aiHealth <= 0 && g.gameStatus === "playing") report("no-win-detect", "ai at 0 health but gameStatus still 'playing'");
}

// Greedy human-ish policy: draw, summon what we can afford, swing at everything.
function playerPhase() {
  const g = s();

  if (g.currentPhase === "draw") {
    const before = g.playerHand.length;
    const res = g.drawCard(true);
    if (res && res.success === false) report("draw-blocked", `drawCard failed in draw phase: ${res.error}`);
    if (s().playerHand.length === before && s().playerDeck.length > 0) {
      report("draw-noop", "draw phase did not add a card to hand");
    }
    g.nextPhase();
    return;
  }

  if (g.currentPhase === "generate") {
    g.nextPhase();
    return;
  }

  if (g.currentPhase === "main1") {
    // Try to summon one creature, and lay a counter face-down if we have room.
    for (let i = 0; i < s().playerHand.length; i++) {
      const card = s().playerHand[i];
      if (card.cardType !== "creature") continue;
      const res: any = s().playCard(i, true);
      if (res?.success) break;
    }
    for (let i = 0; i < s().playerHand.length; i++) {
      const card = s().playerHand[i];
      if (card.cardType !== "counter") continue;
      const slot = s().playerRuneCounterZone.findIndex((z: any) => z === null);
      if (slot === -1) break;
      const res: any = s().playCard(i, true, "runeCounter", slot);
      if (res?.success) break;
    }
    g.nextPhase();
    return;
  }

  if (g.currentPhase === "battle") {
    const attackers = s().playerBoard.filter((c: any) => c.hasAction && !c.exhausted);
    for (const atk of attackers) {
      const enemyCreatures = s().aiBoard;
      const enemyShields = s().aiShields.filter((sh: any) => sh.currentHealth > 0);

      let target: { id: string; type: "creature" | "shield" | "face" };
      if (enemyCreatures.length > 0) target = { id: enemyCreatures[0].instanceId, type: "creature" };
      else if (enemyShields.length > 0) target = { id: enemyShields[0].id, type: "shield" };
      else target = { id: "face", type: "face" };

      const res: any = s().initiateAttack(atk.instanceId, target.id, target.type, true);
      if (!res) {
        report("attack-no-result", `initiateAttack returned nothing for ${atk.name} -> ${target.type}`);
        continue;
      }
      if (!res.success) {
        report("attack-failed", `${atk.name} -> ${target.type}: ${res.error}`);
        continue;
      }
      if (res.requiresResponse) {
        const dr: any = s().handleDefenseResponse(res.defenderId, "defend", res.attackerId, true);
        if (!dr?.success) report("defense-unresolved", `handleDefenseResponse failed: ${dr?.error ?? "no result"}`);
      }
    }
    g.nextPhase();
    return;
  }

  if (g.currentPhase === "main2") {
    // May normal summon here only if unused in Main Phase 1.
    if (!s().hasNormalSummonedThisTurn) {
      for (let i = 0; i < s().playerHand.length; i++) {
        if (s().playerHand[i].cardType !== "creature") continue;
        const res: any = s().playCard(i, true);
        if (res?.success) break;
      }
    }
    g.nextPhase();
    return;
  }

  if (g.currentPhase === "end") {
    if (s().playerHand.length > 7) {
      report("no-hand-limit", `entered End Phase with ${s().playerHand.length} cards and was never asked to discard to 7`);
    }
    g.endTurn();
    return;
  }
}

async function run() {
  const store = s();
  store.initializeGame("lightning", "crystal", true);

  const init = s();
  out("=== SETUP ===");
  out(`player hand ${init.playerHand.length}, ai hand ${init.aiHand.length}`);
  out(`player deck ${init.playerDeck.length}, ai deck ${init.aiDeck.length}`);
  out(`player hp ${init.playerHealth}, ai hp ${init.aiHealth}`);
  out(`player shields ${init.playerShields.map((x: any) => `${x.name}:${x.currentHealth}`).join(", ")}`);
  out(`status ${init.gameStatus}, turn ${init.turnNumber} ${init.currentTurn}/${init.currentPhase}`);

  if (init.playerHand.length !== 5) report("starting-hand", `player drew ${init.playerHand.length} cards, expected 5`);
  if (init.gameStatus !== "playing") report("setup-status", `gameStatus is "${init.gameStatus}" after initializeGame, so the board may not accept input`);

  const phasesSeen: string[] = [];
  const battleTurns: { turn: number; side: string; dealt: number; kills: number }[] = [];
  const summonCount: Record<string, number> = { player: 0, ai: 0 };
  const shieldBreaks: string[] = [];
  let steps = 0;
  const MAX_STEPS = 4000;
  let lastFingerprint = "";
  let stuckCount = 0;

  while (s().gameStatus === "playing" && steps < MAX_STEPS) {
    const g = s();
    const fingerprint = [
      g.turnNumber, g.currentTurn, g.currentPhase, g.playerHealth, g.aiHealth,
      g.playerHand.length, g.aiHand.length, g.playerBoard.length, g.aiBoard.length,
      g.playerDeck.length, g.aiDeck.length,
    ].join(":");

    if (fingerprint === lastFingerprint) {
      stuckCount++;
      if (stuckCount > 25) {
        report("stalled", `game stopped changing at turn ${g.turnNumber} ${g.currentTurn}/${g.currentPhase} — no path forward`);
        break;
      }
    } else {
      stuckCount = 0;
    }
    lastFingerprint = fingerprint;

    phasesSeen.push(`T${g.turnNumber} ${g.currentTurn}/${g.currentPhase}`);

    const before = {
      playerHp: g.playerHealth, aiHp: g.aiHealth,
      playerBoard: g.playerBoard.length, aiBoard: g.aiBoard.length,
    };

    // A broken shield halts everything until its controller picks an effect. The AI answers
    // its own; stand in for the human on ours.
    const pendingBreak = g.pendingShieldBreak;
    if (pendingBreak) {
      const effects = pendingBreak.shield.effects ?? [];
      if (!effects.length) {
        report("shield-no-effects", `${pendingBreak.shield.name} broke but carries no effects to choose from`);
        break;
      }
      shieldBreaks.push(`T${g.turnNumber} ${pendingBreak.controller}: ${pendingBreak.shield.name}`);
      const res: any = g.resolveShieldBreak(effects[0].id);
      if (!res?.success) report("shield-break-unresolvable", `${pendingBreak.shield.name}: ${res?.error}`);
      steps++;
      continue;
    }

    if (g.lastShieldBreakReveal) {
      g.dismissShieldBreakReveal();
      steps++;
      continue;
    }

    // AI attacks pause until the defender answers. Always take a legal response so the
    // match can continue (prefer dodge, then defend, else take the hit).
    const pendingDefense = g.pendingDefenseResponse;
    if (pendingDefense) {
      const choice = pendingDefense.canDodge
        ? "dodge"
        : pendingDefense.isExhaustedTarget || pendingDefense.isShieldAttack
        ? "none"
        : "defend";
      const res: any = g.handleDefenseResponse(
        pendingDefense.defenderId,
        choice as any,
        pendingDefense.attackerId,
        false
      );
      if (!res?.success) {
        report("defense-unresolved", `auto-defense ${choice} failed: ${res?.error ?? "no result"}`);
        // Force-clear so the harness cannot softlock on a bad prompt.
        useGameStore.setState({ pendingDefenseResponse: undefined });
      }
      steps++;
      continue;
    }

    if (g.currentTurn === "player") {
      playerPhase();
    } else {
      await g.aiTurn();
      await new Promise((r) => setImmediate(r));
    }

    const after = s();
    if (g.currentPhase === "battle") {
      const dealt = g.currentTurn === "player"
        ? before.aiHp - after.aiHealth
        : before.playerHp - after.playerHealth;
      const kills = g.currentTurn === "player"
        ? before.aiBoard - after.aiBoard.length
        : before.playerBoard - after.playerBoard.length;
      battleTurns.push({ turn: g.turnNumber, side: g.currentTurn, dealt, kills });
    }
    if (g.currentPhase === "main1" || g.currentPhase === "main2") {
      const grew = g.currentTurn === "player"
        ? after.playerBoard.length - before.playerBoard
        : after.aiBoard.length - before.aiBoard;
      if (grew > 0) summonCount[g.currentTurn] += grew;
    }

    checkInvariants();
    steps++;
  }

  const end = s();
  out("\n=== RESULT ===");
  out(`status: ${end.gameStatus}`);
  out(`turns: ${end.turnNumber}, engine steps: ${steps}`);
  out(`player hp ${end.playerHealth} / ai hp ${end.aiHealth}`);
  out(`player deck ${end.playerDeck.length} / ai deck ${end.aiDeck.length}`);
  out(`player board ${end.playerBoard.length} / ai board ${end.aiBoard.length}`);
  out(`creatures summoned — player ${summonCount.player}, ai ${summonCount.ai}`);

  if (steps >= MAX_STEPS) report("no-termination", `hit ${MAX_STEPS} engine steps without the match ending`);

  out("\n=== SHIELD BREAKS ===");
  const brokenPlayer = end.playerDiscard.filter((c: any) => c.cardType === "shield").map((c: any) => c.name);
  const brokenAi = end.aiDiscard.filter((c: any) => c.cardType === "shield").map((c: any) => c.name);
  out(`player lost ${brokenPlayer.length}/3: ${brokenPlayer.join(", ") || "none"}`);
  out(`ai lost     ${brokenAi.length}/3: ${brokenAi.join(", ") || "none"}`);
  if (shieldBreaks.length) out(`prompts shown to the human: ${shieldBreaks.length}`);

  out("\n=== BATTLE PHASES ===");
  if (battleTurns.length === 0) {
    out("no battle phase was ever entered by either side");
  } else {
    for (const b of battleTurns) out(`T${b.turn} ${b.side}: ${b.dealt} face damage, ${b.kills} creature(s) killed`);
  }

  const aiBattles = battleTurns.filter((b) => b.side === "ai");
  const aiDidSomething = aiBattles.some((b) => b.dealt > 0 || b.kills > 0);
  if (aiBattles.length === 0) report("ai-never-attacks", "the AI never entered a battle phase across the whole match");
  else if (!aiDidSomething) report("ai-never-attacks", `AI entered ${aiBattles.length} battle phases but never dealt damage or killed anything`);
  if (summonCount.ai === 0) report("ai-never-summons", "the AI never got a creature onto the board");

  out("\n=== FIRST ROUND PHASE TRACE ===");
  out(phasesSeen.slice(0, 14).join("\n"));

  out(`\n=== ISSUES (${issues.length}) ===`);
  if (issues.length === 0) {
    out("none");
  } else {
    for (const i of issues) out(`[${i.kind}] (T${i.turn} ${i.phase}) ${i.detail}`);
  }
}

run().catch((e) => {
  console.error("HARNESS CRASHED:", e);
  const g = s();
  console.error(`at turn ${g.turnNumber} ${g.currentTurn}/${g.currentPhase}`);
  process.exit(1);
});
