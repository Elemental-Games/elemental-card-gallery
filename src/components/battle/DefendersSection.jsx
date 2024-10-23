import React from 'react';
import { motion } from 'framer-motion';
import HealthBar from './HealthBar';
import CardOverlay from './CardOverlay';
import DestroyEffect from '../animations/DestroyEffect';

const DefendersSection = ({ 
  defenders, 
  selectedTarget, 
  onSelectTarget, 
  battleState,
  isDestroying,
  onTargetConfirm,
  onTargetCancel,
  showBlockPrompt,
  onBlockConfirm,
  onBlockCancel,
  showTargetOverlay,
  onDodgeConfirm,
  onDodgeCancel,
  cloudSprinterPosition
}) => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Defenders</h3>
      <div className="flex gap-8 justify-center">
        {defenders.map((defender) => (
          <motion.div
            key={defender.id}
            className={`relative cursor-pointer transition-all duration-300 ${
              battleState === 'inProgress' ? 'hover:ring-4 hover:ring-blue-500' : ''
            } ${
              selectedTarget?.id === defender.id ? 'ring-2 ring-blue-500' : ''
            }`}
            whileHover={{ scale: 1.05 }}
            animate={{
              x: defender.id === 'cloud-sprinter' ? cloudSprinterPosition : 0,
              y: 0
            }}
            onClick={() => battleState === 'inProgress' && onSelectTarget(defender)}
          >
            <div className="w-48">
              <HealthBar 
                health={defender.health} 
                maxHealth={defender.maxHealth} 
                label={`${defender.name}'s Health`} 
              />
            </div>
            <DestroyEffect isDestroying={isDestroying && selectedTarget?.id === defender.id}>
              <div className="relative">
                <img 
                  src={defender.image} 
                  alt={defender.name} 
                  className="w-48 rounded-lg transition-transform duration-300"
                />
                {((selectedTarget?.id === defender.id && showTargetOverlay) || 
                  (defender.id === 'cloud-sprinter' && showBlockPrompt)) && (
                  <CardOverlay
                    onConfirm={
                      defender.id === 'cloud-sprinter' && showBlockPrompt 
                        ? onBlockConfirm 
                        : defender.id === 'cloud-sprinter' 
                        ? onDodgeConfirm 
                        : onTargetConfirm
                    }
                    onCancel={
                      defender.id === 'cloud-sprinter' && showBlockPrompt 
                        ? onBlockCancel 
                        : defender.id === 'cloud-sprinter' 
                        ? onDodgeCancel 
                        : onTargetCancel
                    }
                    isBlockPrompt={defender.id === 'cloud-sprinter' && showBlockPrompt}
                    isDodgePrompt={defender.id === 'cloud-sprinter' && !showBlockPrompt && selectedTarget?.id === 'cloud-sprinter'}
                  />
                )}
              </div>
            </DestroyEffect>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DefendersSection;