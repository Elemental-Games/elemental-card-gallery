import { Link } from 'react-router-dom';

const CardGrid = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map(card => (
        <Link to={`/cards/${card.id}`} key={card.id} className="group">
          <div className="aspect-[5/7] w-full rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
            <img
              src={card.imagePath}
              alt={card.name}
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CardGrid;