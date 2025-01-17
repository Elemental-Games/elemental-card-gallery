import React, { useState, useEffect } from 'react';

const galleryItems = [
  {
    type: 'image',
    src: '/how-to-play/battle1.png',
    alt: 'Battle Scene 1'
  },
  {
    type: 'image',
    src: '/how-to-play/cards.png',
    alt: 'Card Collection'
  },
  /*
  {
    type: 'video',
    src: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    title: 'How to Play Tutorial'
  },
  */
  // Add more items as needed
];

const HowtoPlayGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg mb-8">
      {galleryItems.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {item.type === 'image' ? (
            <img
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
          ) : (
            <iframe
              className="w-full h-full"
              src={item.src}
              title={item.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default HowtoPlayGallery; 