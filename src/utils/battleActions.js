import { toast } from "sonner";

export const handleDodge = (addToLog, reduceOpponentHealth) => {
  toast.success('Cloud Sprinter successfully dodged the attack!');
  reduceOpponentHealth(155);
  addToLog('Cloud Sprinter dodged the attack');
};

export const handleBlock = async (attacker, defender, updateDefenderHealth, updateAttackerHealth) => {
  // Cloud Sprinter deals damage
  await updateAttackerHealth(75);
  
  // Glacis destroys Cloud Sprinter
  await updateDefenderHealth(0);
  
  return true;
};