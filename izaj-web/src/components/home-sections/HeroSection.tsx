import React, { useState, useEffect } from 'react';
import { useHeroSlideshow, HeroSlide } from '../../hooks/useHeroSlideshow';

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Hero images for desktop
  const desktopHeroImages: HeroSlide[] = [
    {
      image: "hero1.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances,\nsoft lighting enhances the feeling of ease.",
    },
    {
      image: "hero2.jpg",
      heading: "Gentle Light, Quiet Moments",
      subheading: "Soft luminance warms your space while the rain whispers outside.",
    },
    {
      image: "hero3.jpg",
      heading: "Warmth in Every Corner",
      subheading: "A warm glow that embraces your space, creating a cozy atmosphere.",
    },
  ];

  // Hero images for mobile
  const mobileHeroImages: HeroSlide[] = [
    {
      image: "chadelier.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances,\nsoft lighting enhances the feeling of ease",
    },
    {
      image: "ceiling.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances,\nsoft lighting enhances the feeling of ease",
    },
    {
      image: "cluster.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances,\nsoft lighting enhances the feeling of ease",
    },
  ];

  // Use the appropriate hero images based on screen size
  const heroImages = isMobile ? mobileHeroImages : desktopHeroImages;
  
  useEffect(() => {
    const checkMobile = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1024;
      setIsMobile(w < 768); 
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { currentIndex } = useHeroSlideshow(heroImages, 5000);

  return (
    <div className="relative w-full h-[400px] overflow-hidden z-0">
      {/* Hero Image */}
      <img 
        src={`/${heroImages[currentIndex].image}`}
        alt="Hero Slide"
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay Text */}
      <div className="absolute inset-0 w-full bg-gradient-to-r from-black/70 to-transparent text-white p-4 sm:p-6 md:p-8 flex items-end">
        <div className="max-w-4xl">
          <h1 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4" 
            style={{ fontFamily: "'Poppins', serif" }}
          >
            {heroImages[currentIndex].heading}
          </h1>
          <p 
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl whitespace-pre-line" 
            style={{ fontFamily: "'Poppins', serif" }}
          >
            {heroImages[currentIndex].subheading}
          </p>
        </div>
      </div>
    </div>
  );
}
