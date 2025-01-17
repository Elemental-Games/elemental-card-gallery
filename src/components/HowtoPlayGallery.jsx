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
    // aspect ratio 14:5 for top banner
    <div className="w-full max-w-[1400px] mx-auto px-4">
      {/* Container with permanent gold border */}
      <div className="relative mt-4 border-[6px] border-yellow-500/90 rounded-lg">
        {/* Main Gallery Container */}
        <div className="w-full h-[500px] relative overflow-hidden group">
          {/* Gallery Items */}
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

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 hover:bg-black/40"
            onClick={previousSlide}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 hover:bg-black/40"
            onClick={nextSlide}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Navigation Bubbles */}
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
      </div>
    </div>
  );
};

export default HowtoPlayGallery; 