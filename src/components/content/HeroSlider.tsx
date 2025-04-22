
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SlideItem {
  id: string;
  title: string;
  description: string;
  backdropImage: string;
  type: 'live' | 'movie' | 'series';
}

interface HeroSliderProps {
  slides: SlideItem[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!slides.length) return null;

  const slide = slides[currentSlide];

  const getLink = (item: SlideItem) => {
    switch (item.type) {
      case 'live':
        return `/live/${item.id}`;
      case 'movie':
        return `/movie/${item.id}`;
      case 'series':
        return `/series/${item.id}`;
      default:
        return '#';
    }
  };

  return (
    <div className="relative h-[50vh] min-h-[400px] w-full md:h-[70vh]">
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${slide.backdropImage})`, opacity: 1 }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 lg:w-2/3">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl">{slide.title}</h1>
          <p className="mb-4 text-sm text-gray-300 md:text-base">{slide.description}</p>
          <div className="flex space-x-4">
            <Button asChild className="flex items-center space-x-2 bg-white text-black hover:bg-gray-200">
              <Link to={`/watch/${slide.type}/${slide.id}`}>
                <Play className="h-4 w-4" />
                <span>Play</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="flex items-center space-x-2">
              <Link to={getLink(slide)}>
                <Info className="h-4 w-4" />
                <span>More Info</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-1 rounded-full ${
              index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-gray-500'
            } transition-all duration-300`}
            onClick={() => setCurrentSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};
