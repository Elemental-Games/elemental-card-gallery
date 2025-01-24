import SetupRules from './content/SetupRules';
import TurnStructureRules from './content/TurnStructureRules';
import BattleRules from './content/BattleRules';
import ElementRules from './content/ElementRules';
import ShieldRules from './content/ShieldRules';
import CardTypes from './content/CardTypes';
import Keywords from './content/Keywords';

const RulesContent = ({ activeTab }) => {
  const components = {
    setup: SetupRules,
    'card-types': CardTypes,
    'turn-structure': TurnStructureRules,
    battle: BattleRules,
    shields: ShieldRules,
    elements: ElementRules,
    keywords: Keywords
  };

  const Component = components[activeTab];
  
  return Component ? <Component /> : null;
};

export default RulesContent; 