import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { getCardImagePath, createCardImageErrorHandler } from '@/utils/imageUtils';

const CardGrid = ({ cards }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map((card) => {
        // Get the best image path for this card
        const { marketingPath } = getCardImagePath(card);
        
        return (
          <motion.div
            key={card.id}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(`/cards/${card.id}`)}
          >
            <Card className="p-4 cursor-pointer">
              <img 
                src={marketingPath}
                alt={card.name} 
                className={`w-full h-48 object-contain mb-2 ${
                  ['guardians-sanctuary', 'draconic-shield', 'celestial-fortress'].includes(card.id) 
                    ? 'transform rotate-90' 
                    : ''
                }`}
                onError={createCardImageErrorHandler(card)}
              />
              <h3 className="font-semibold text-lg">{card.name}</h3>
              <p className="text-sm text-gray-600">
                {card.element} | {card.type} | {
                  card.rarity === 'C' ? 'Common' :
                  card.rarity === 'U' ? 'Uncommon' :
                  card.rarity.trim() === 'R' ? 'Rare' :
                  card.rarity === 'E' ? 'Epic' :
                  card.rarity === 'L' ? 'Legendary' :
                  card.rarity
                }
              </p>
              {card.type === 'Creature' && (
                <p className="text-sm text-gray-600">
                  STR: {card.strength || 'N/A'} | AGI: {card.agility || 'N/A'}
                </p>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default CardGrid;