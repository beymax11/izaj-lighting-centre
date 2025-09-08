import { useEffect, useState } from 'react';

export interface HeroSlide {
  image: string;
  heading: string;
  subheading: string;
}

export const useHeroSlideshow = (slides: HeroSlide[], intervalMs: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [slides.length, intervalMs]);

  return { currentIndex };
};


