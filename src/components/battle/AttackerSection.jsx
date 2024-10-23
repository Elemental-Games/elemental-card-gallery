import React from 'react';
import { motion } from 'framer-motion';
import RippleEffect from '../animations/RippleEffect';
import HealthBar from './HealthBar';

const AttackerSection = ({ attacker, isAttacking, selectedTarget }) => {
  return (
    <div className="relative flex flex-col items-center">
      <h3 className="text-xl font-semibold mb-4">Attacker</h3>
      <div className="w-48">
        <HealthBar 
          health={attacker.health} 
          maxHealth={attacker.maxHealth} 
          label={`${attacker.name}'s Health`} 
        />
      </div>
      <motion.div
        animate={{
          y: isAttacking ? 200 : 0,
          scale: isAttacking ? 1.2 : 1,
          transition: { duration: 0.5 }
        }}
        className="relative"
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src={attacker.image} 
          alt={attacker.name} 
          className="w-48 rounded-lg transition-transform duration-300"
        />
        <RippleEffect isActive={isAttacking && selectedTarget} />
      </motion.div>
    </div>
  );
};

export default AttackerSection;