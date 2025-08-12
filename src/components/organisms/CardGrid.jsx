import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CardPlaceholder from '../atoms/CardPlaceholder';

const LazyCard = ({ card }) => {
  const [isVisible, setIsVisible] = useState(false);
  const placeholderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px 200px 0px', // Preload images 200px before they enter the viewport
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current);
      }
    };
  }, []);

  return (
    <Link to={`/cards/${card.id}`} className="group" ref={placeholderRef}>
      {isVisible ? (
        <div className="aspect-[5/7] w-full rounded-lg overflow-hidden transform transition-transform duration-300 group-hover:scale-105">
          <img
            src={card.imagePath}
            alt={card.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <CardPlaceholder />
      )}
    </Link>
  );
};

const CardGrid = ({ cards, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <CardPlaceholder key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {cards.map(card => (
        <LazyCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardGrid;