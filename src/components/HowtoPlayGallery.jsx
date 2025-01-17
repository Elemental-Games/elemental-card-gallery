import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const galleryItems = [
  {
    type: 'image',
    src: '/images/backgrounds/Ancient Winds.png',
    alt: 'Ancient Winds'
  },
  {
    type: 'image',
    src: '/images/backgrounds/Ancient Ember2.png',
    alt: 'Ancient Ember'
  },
  {
    type: 'image',
    src: '/images/backgrounds/Ancient Tide.png',
    alt: 'Ancient Tide'
  },
  {
    type: 'image',
    src: '/images/backgrounds/Ancient Roots.png',
    alt: 'Ancient Roots'
  }
];

const HowtoPlayGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const previousSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg mb-8 group">
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

      <Button
        variant="ghost"
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={previousSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {galleryItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HowtoPlayGallery; 