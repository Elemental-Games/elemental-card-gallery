import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from "sonner";
import HealthBar from './battle/HealthBar';
import BattleLog from './battle/BattleLog';
import AttackerSection from './battle/AttackerSection';
import DefendersSection from './battle/DefendersSection';
import AirAnimation from './animations/AirAnimation';

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
  playerHealth = 500,
  opponentHealth = 500,
}) => {
  const [isAttacking, setIsAttacking] = React.useState(false);
  const [isDestroying, setIsDestroying] = React.useState(false);
  const [showAirAnimation, setShowAirAnimation] = React.useState(false);
  const [showAgilityWarning, setShowAgilityWarning] = React.useState(false);
  const [showBlockPrompt, setShowBlockPrompt] = React.useState(false);
  const [showTargetOverlay, setShowTargetOverlay] = React.useState(false);
  const [cardRotated, setCardRotated] = React.useState(false);
  const [cloudSprinterPosition, setCloudSprinterPosition] = React.useState(0);

  React.useEffect(() => {
    if (selectedTarget) {
      setShowTargetOverlay(true);
    } else {
      setShowTargetOverlay(false);
    }
  }, [selectedTarget]);

  const handleTargetConfirm = async () => {
    if (!selectedTarget) return;
    
    if (selectedTarget.id === 'flame-ravager') {
      setShowAgilityWarning(true);
      setShowTargetOverlay(false);
    } else if (selectedTarget.id === 'cloud-sprinter') {
      // Show dodge opportunity
      setShowTargetOverlay(true);
    } else {
      setShowTargetOverlay(false);
      await processAttack();
    }
  };

  const handleAgilityWarningClose = () => {
    setShowAgilityWarning(false);
    setShowBlockPrompt(true);
  };

  const handleBlockingDecision = async (willBlock) => {
    if (!attacker || !selectedTarget) return;
    setShowBlockPrompt(false);

    if (willBlock) {
      // Move Cloud Sprinter to block position
      setCloudSprinterPosition(100);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Cloud Sprinter deals damage
      setShowAirAnimation(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      if (attacker.health) attacker.health -= 75;
      setShowAirAnimation(false);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Glacis attacks and destroys Cloud Sprinter
      setIsAttacking(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsAttacking(false);
      setIsDestroying(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsDestroying(false);
      setCardRotated(true);
      onAction();
    } else {
      await processAttack();
    }
  };

  const handleDodgeDecision = async (willDodge) => {
    setShowTargetOverlay(false);
    if (willDodge) {
      toast.success('Cloud Sprinter successfully dodged the attack!');
      onAction();
    } else {
      await processAttack();
    }
  };

  const processAttack = async () => {
    setIsAttacking(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsAttacking(false);
    setCardRotated(true);
    onAction();
  };

  const handleStartBattle = () => {
    onStartBattle();
    toast.info("Select a defender to attack by clicking on one of the defenders.", {
      duration: 4000,
    });
  };

  const handleReset = () => {
    setIsAttacking(false);
    setIsDestroying(false);
    setShowAirAnimation(false);
    setShowAgilityWarning(false);
    setShowBlockPrompt(false);
    setShowTargetOverlay(false);
    setCardRotated(false);
    setCloudSprinterPosition(0);
    onResetBattle();
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
          isRotated={cardRotated}
        />

        {showAirAnimation && <AirAnimation isActive={true} />}

        <DefendersSection 
          defenders={defenders}
          selectedTarget={selectedTarget}
          onSelectTarget={onSelectTarget}
          battleState={battleState}
          isDestroying={isDestroying}
          onTargetConfirm={handleTargetConfirm}
          onTargetCancel={() => onSelectTarget(null)}
          showBlockPrompt={showBlockPrompt}
          onBlockConfirm={() => handleBlockingDecision(true)}
          onBlockCancel={() => handleBlockingDecision(false)}
          showTargetOverlay={showTargetOverlay}
          onDodgeConfirm={() => handleDodgeDecision(true)}
          onDodgeCancel={() => handleDodgeDecision(false)}
          cloudSprinterPosition={cloudSprinterPosition}
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
              Cloud Sprinter can block for Flame Ravager. If it blocks, it will deal 75 damage to Glacis before being destroyed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAgilityWarningClose}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex flex-wrap gap-2 mt-4">
        <Button 
          variant="secondary" 
          disabled={battleState !== 'ready'}
          onClick={handleStartBattle}
          className="w-full sm:w-auto"
        >
          Start Battle
        </Button>
        <Button 
          onClick={onEndTurn} 
          disabled={battleState !== 'inProgress'}
          className="w-full sm:w-auto"
        >
          End Turn
        </Button>
        <Button 
          onClick={handleReset}
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