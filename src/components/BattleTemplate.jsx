import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from "sonner";
import HealthBar from './battle/HealthBar';
import BattleLog from './battle/BattleLog';
import AttackerSection from './battle/AttackerSection';
import DefendersSection from './battle/DefendersSection';
import BlockingPrompt from './battle/BlockingPrompt';

const BattleTemplate = ({
  attacker,
  defenders,
  battleState,
  battleLog,
  onAction,
  onStartBattle,
  onEndTurn,
  onResetBattle,
  selectedTarget,
  onSelectTarget,
  onDodgeDecision,
  showDodgePrompt,
  playerHealth = 500,
  opponentHealth = 500,
}) => {
  const [isAttacking, setIsAttacking] = React.useState(false);
  const [isDestroying, setIsDestroying] = React.useState(false);
  const [showBlockPrompt, setShowBlockPrompt] = React.useState(false);
  const [showAgilityWarning, setShowAgilityWarning] = React.useState(false);

  const handleTargetConfirm = async () => {
    if (selectedTarget.id === 'flame-ravager') {
      setShowAgilityWarning(true);
      return;
    }
    await processAttack();
  };

  const handleBlockingDecision = async (willBlock) => {
    setShowBlockPrompt(false);
    if (willBlock) {
      // Cloud Sprinter blocks and counter-attacks
      setIsAttacking(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      attacker.health -= 75; // Cloud Sprinter's damage
      setIsAttacking(false);
      await processAttack();
    } else {
      await processAttack();
    }
  };

  const processAttack = async () => {
    setIsAttacking(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAttacking(false);
    setIsDestroying(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsDestroying(false);
    onAction();
  };

  const handleStartBattle = () => {
    onStartBattle();
    toast.info("Select a defender to attack by clicking on their card!", {
      duration: 4000,
    });
  };

  const handleAgilityWarningClose = () => {
    setShowAgilityWarning(false);
    setShowBlockPrompt(true);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-lg shadow">
      <div className="flex flex-col gap-8">
        <div className="text-center">
          <HealthBar health={playerHealth} maxHealth={500} label="Player Health" />
        </div>

        <AttackerSection 
          attacker={attacker}
          isAttacking={isAttacking}
          selectedTarget={selectedTarget}
        />

        <DefendersSection 
          defenders={defenders}
          selectedTarget={selectedTarget}
          onSelectTarget={onSelectTarget}
          battleState={battleState}
          isDestroying={isDestroying}
          onTargetConfirm={handleTargetConfirm}
          onTargetCancel={() => onSelectTarget(null)}
          showDodgePrompt={showDodgePrompt}
          onDodgeConfirm={() => onDodgeDecision(true)}
          onDodgeCancel={() => onDodgeDecision(false)}
        />

        <div className="text-center mt-4">
          <HealthBar health={opponentHealth} maxHealth={500} label="Opponent Health" />
        </div>

        <BattleLog logs={battleLog} />
      </div>

      <AlertDialog open={showAgilityWarning} onOpenChange={setShowAgilityWarning}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Blocking Opportunity</AlertDialogTitle>
            <AlertDialogDescription>
              Once the target has been declared, any creatures with a higher agility may block for the target instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAgilityWarningClose}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <BlockingPrompt 
        isOpen={showBlockPrompt}
        onBlock={() => handleBlockingDecision(true)}
        onDecline={() => handleBlockingDecision(false)}
      />

      <div className="flex flex-wrap gap-2 mt-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button 
              variant="secondary" 
              disabled={battleState !== 'ready'}
              className="w-full sm:w-auto"
            >
              Start Battle
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Battle Start</AlertDialogTitle>
              <AlertDialogDescription>
                Target a creature by clicking on one of the defenders.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleStartBattle}>Begin</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button 
          onClick={onEndTurn} 
          disabled={battleState !== 'inProgress'}
          className="w-full sm:w-auto"
        >
          End Turn
        </Button>
        <Button 
          onClick={onResetBattle}
          variant="outline"
          className="w-full sm:w-auto"
        >
          Reset Battle
        </Button>
      </div>
    </div>
  );
};

export default BattleTemplate;
