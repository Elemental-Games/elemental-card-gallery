import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getImageFromS3 } from '../utils/awsUtils';
import { useQuery } from '@tanstack/react-query';

const Card = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardImage, setCardImage] = useState(null);

  useEffect(() => {
    const fetchImage = async () => {
      const imageUrl = await getImageFromS3('your-bucket-name', card.imageKey);
      setCardImage(imageUrl);
    };
    fetchImage();
  }, [card.imageKey]);

  const handleHover = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  return (
    <div className="w-64 h-96 perspective">
      <motion.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onHoverStart={handleHover}
      >
        <div className="absolute w-full h-full backface-hidden">
          <img
            src="/cards/card-back.png"
            alt="Card Back"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="absolute w-full h-full backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          {cardImage && (
            <img
              src={cardImage}
              alt={card.name}
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
      </motion.div>
    </div>
  );
};

const fetchCards = async () => {
  // This is a placeholder. In a real application, you would fetch this data from your API.
  return [
    { id: 1, name: 'Cloud Warden', imageKey: 'air/cloud-warden.png' },
    { id: 2, name: 'Ancient Roots', imageKey: 'earth/ancient-roots.png' },
    { id: 3, name: 'Flame Ravager', imageKey: 'fire/flame-ravager.png' },
    { id: 4, name: 'Aqua Shade', imageKey: 'water/aqua-shade.png' },
  ];
};

const CardsOfTheWeek = () => {
  const { data: cards, isLoading, error } = useQuery({
    queryKey: ['cardsOfTheWeek'],
    queryFn: fetchCards,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading cards</div>;

  return (
    <div className="py-16 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center text-white">Cards of the Week</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsOfTheWeek;
