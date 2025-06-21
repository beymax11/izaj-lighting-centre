import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LightingCategory from './LightingCategory';

interface HomeProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  } | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [desktopCurrentPage, setDesktopCurrentPage] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && currentPage < totalPages - 1) {
      setSlideDirection('left');
      setCurrentPage(prev => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setSlideDirection('right');
      setCurrentPage(prev => prev - 1);
    }
  };

  // New state variables for Fresh Drops
  const [freshDropsPage, setFreshDropsPage] = useState(0);
  const [desktopFreshDropsPage, setDesktopFreshDropsPage] = useState(0);
  const [freshDropsSlideDirection, setFreshDropsSlideDirection] = useState<'left' | 'right'>('right');
  const [isHoveringFreshDrops, setIsHoveringFreshDrops] = useState(false);
  const [freshDropsTouchStart, setFreshDropsTouchStart] = useState<number | null>(null);
  const [freshDropsTouchEnd, setFreshDropsTouchEnd] = useState<number | null>(null);

  // Fresh Drops touch handlers
  const onFreshDropsTouchStart = (e: React.TouchEvent) => {
    setFreshDropsTouchEnd(null);
    setFreshDropsTouchStart(e.targetTouches[0].clientX);
  };

  const onFreshDropsTouchMove = (e: React.TouchEvent) => {
    setFreshDropsTouchEnd(e.targetTouches[0].clientX);
  };

  const onFreshDropsTouchEnd = () => {
    if (!freshDropsTouchStart || !freshDropsTouchEnd) return;
    const distance = freshDropsTouchStart - freshDropsTouchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && freshDropsPage < totalPages - 1) {
      setFreshDropsSlideDirection('left');
      setFreshDropsPage(prev => prev + 1);
    }
    if (isRightSwipe && freshDropsPage > 0) {
      setFreshDropsSlideDirection('right');
      setFreshDropsPage(prev => prev - 1);
    }
  };

  // Hero images for desktop
  const desktopHeroImages = [
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
  const mobileHeroImages = [
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
      setIsMobile(window.innerWidth < 768); 
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkMobile();

   
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // 5 seconds
  
    return () => clearInterval(interval);
  }, [heroImages.length]); // Add heroImages.length as dependency

  const handleColorSelect = (productId: number, color: string) => {
    setSelectedColors(prev => ({
      ...prev,
      [productId]: color
    }));
  };

  // Sample product data
  const allProducts = [
    {
      id: 1,
      name: "Abednego | Chandelier/Large",
      price: "₱32,995",
      image: "/public/abed.webp",
      size: "φ110*H15cm",
      colors: ["black", "gold", "silver"]
    },
    {
      id: 2,
      name: "Aberdeen | Modern LED Chandelier",
      price: "₱25,464",
      image: "/public/aber.webp",
      colors: ["black", "gold"]
    },
    {
      id: 3,
      name: "Acadia | Table Lamp",
      price: "₱12,234",
      image: "/public/acad.webp",
      colors: ["black"]
    },
    {
      id: 4,
      name: "Ademar | Modern Chandelier",
      price: "₱11,237",
      image: "/public/mar.webp",
      colors: ["black"]
    },
    {
      id: 5,
      name: "Aeris | Modern Pendant Light",
      price: "₱9,435",
      image: "/public/aeris.webp",
      colors: ["black"]
    },
    {
      id: 6,
      name: "Aina | Modern LED Chandelier",
      price: "₱29,995",
      image: "/public/aina.webp",
      colors: ["black"]
    },
    {
      id: 7,
      name: "Alabama | Table Lamp",
      price: "₱27,995",
      image: "/public/alab.webp",
      colors: ["black"]
    },
    {
      id: 8,
      name: "Alphius | Surface Mounted Downlight",
      price: "₱25,995",
      image: "/public/alph.webp",
      colors: ["black"]
    },
    {
      id: 9,
      name: "Altair | Modern LED Chandelier",
      price: "₱23,995",
      image: "/public/alta.jpg",
      colors: ["black"]
    },
    {
      id: 10,
      name: "Amalfi | Boho Rattan Soliya Pendant Lamp",
      price: "₱21,995",
      image: "/public/ama.webp",
      colors: ["black"]
    }
  ];

  // Determine productsPerPage based on screen size
  let productsPerPage = 5;
  if (isMobile) {
    productsPerPage = 2;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
    productsPerPage = 3;
  }
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    (isMobile ? currentPage : desktopCurrentPage) * productsPerPage,
    ((isMobile ? currentPage : desktopCurrentPage) + 1) * productsPerPage
  );

  // Fresh Drops products
  const freshDropsProducts = allProducts.slice(
    (isMobile ? freshDropsPage : desktopFreshDropsPage) * productsPerPage,
    ((isMobile ? freshDropsPage : desktopFreshDropsPage) + 1) * productsPerPage
  );

  // Add new state for animation
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFreshDropsAnimating, setIsFreshDropsAnimating] = useState(false);

  const handlePrevPage = () => {
    if (isMobile) {
      if (currentPage > 0) {
        setSlideDirection('right');
        setCurrentPage(currentPage - 1);
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (desktopCurrentPage > 0) {
        setIsAnimating(true);
        setSlideDirection('right');
        setTimeout(() => {
          setDesktopCurrentPage(desktopCurrentPage - 1);
          setIsAnimating(false);
        }, 300);
      }
    } else {
      if (desktopCurrentPage > 0) {
        setIsAnimating(true);
        setSlideDirection('right');
        setTimeout(() => {
          setDesktopCurrentPage(desktopCurrentPage - 1);
          setIsAnimating(false);
        }, 300);
      }
    }
  };

  const handleNextPage = () => {
    if (isMobile) {
      if (currentPage < totalPages - 1) {
        setSlideDirection('left');
        setCurrentPage(currentPage + 1);
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (desktopCurrentPage < totalPages - 1) {
        setIsAnimating(true);
        setSlideDirection('left');
        setTimeout(() => {
          setDesktopCurrentPage(desktopCurrentPage + 1);
          setIsAnimating(false);
        }, 300);
      }
    } else {
      if (desktopCurrentPage < totalPages - 1) {
        setIsAnimating(true);
        setSlideDirection('left');
        setTimeout(() => {
          setDesktopCurrentPage(desktopCurrentPage + 1);
          setIsAnimating(false);
        }, 300);
      }
    }
  };

  const handleFreshDropsPrevPage = () => {
    if (isMobile) {
      if (freshDropsPage > 0) {
        setFreshDropsSlideDirection('right');
        setFreshDropsPage(freshDropsPage - 1);
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (desktopFreshDropsPage > 0) {
        setIsFreshDropsAnimating(true);
        setFreshDropsSlideDirection('right');
        setTimeout(() => {
          setDesktopFreshDropsPage(desktopFreshDropsPage - 1);
          setIsFreshDropsAnimating(false);
        }, 300);
      }
    } else {
      if (desktopFreshDropsPage > 0) {
        setIsFreshDropsAnimating(true);
        setFreshDropsSlideDirection('right');
        setTimeout(() => {
          setDesktopFreshDropsPage(desktopFreshDropsPage - 1);
          setIsFreshDropsAnimating(false);
        }, 300);
      }
    }
  };

  const handleFreshDropsNextPage = () => {
    if (isMobile) {
      if (freshDropsPage < totalPages - 1) {
        setFreshDropsSlideDirection('left');
        setFreshDropsPage(freshDropsPage + 1);
      }
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
      if (desktopFreshDropsPage < totalPages - 1) {
        setIsFreshDropsAnimating(true);
        setFreshDropsSlideDirection('left');
        setTimeout(() => {
          setDesktopFreshDropsPage(desktopFreshDropsPage + 1);
          setIsFreshDropsAnimating(false);
        }, 300);
      }
    } else {
      if (desktopFreshDropsPage < totalPages - 1) {
        setIsFreshDropsAnimating(true);
        setFreshDropsSlideDirection('left');
        setTimeout(() => {
          setDesktopFreshDropsPage(desktopFreshDropsPage + 1);
          setIsFreshDropsAnimating(false);
        }, 300);
      }
    }
  };

  // Add CSS classes for animations
  const getSlideClass = (isAnimating: boolean, direction: 'left' | 'right') => {
    if (!isAnimating) return '';
    return direction === 'left' ? 'slide-left' : 'slide-right';
  };

  return (
    <div className="min-h-screen bg-white text-white font-sans">
      {/* Main Content */}
      <main className="p-0 mx-0 w-full">
        {/* Hero Slideshow */}
        <div className="relative w-full h-[400px] overflow-hidden z-0">
          {/* Hero Image */}
          <img 
            src={`/public/${heroImages[currentHeroIndex].image}`}
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
                {heroImages[currentHeroIndex].heading}
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl whitespace-pre-line" 
                style={{ fontFamily: "'Poppins', serif" }}
              >
                {heroImages[currentHeroIndex].subheading}
              </p>
            </div>
          </div>
        </div>

        <LightingCategory user={user} />

        {/* About Us Section - Plain Version */}
        <div className="mt-8 sm:mt-12 md:mt-16 mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6 md:px-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6 md:mb-8 text-center" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>
            About IZAJ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed mb-4 sm:mb-6 text-center max-w-[90%] sm:max-w-[80%] md:max-w-3xl mx-auto px-2 sm:px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Izaj Lighting Centre is a premier provider of high-quality chandeliers and lighting solutions in the Philippines. With a commitment to enhancing interiors through exceptional illumination, we offer a curated selection of lighting fixtures that blend functionality with aesthetic appeal.
          </p>
          
          <div className="max-w-[90%] sm:max-w-[80%] md:max-w-3xl mx-auto flex justify-center mt-6 sm:mt-8">
            <Link 
              to="/aboutus" 
              className="text-sm sm:text-base md:text-lg font-bold text-white bg-black py-2 px-4 sm:px-5 md:px-6 rounded-md text-center hover:bg-gray-800 transition-colors duration-300 w-[150px] sm:w-[180px] md:w-[200px]" 
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              About Us
            </Link>
          </div>
        </div>

        {/* Monthly Deals */}
        <section className="container mx-auto px-4 sm:px-14 md:px-18 lg:px-28 py-8 max-w-[90%] relative">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Avenir Next', sans-serif", fontWeight: "bold" }}>
              Monthly Deals 
            </h2>
            <div className="flex-grow"></div>
            <Link
              to="/sales"
              state={user ? { user } : undefined}
              className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              View all
            </Link>
          </div>

          <div 
            className="relative px-4 sm:px-12"
            onMouseEnter={() => setIsHoveringProducts(true)}
            onMouseLeave={() => setIsHoveringProducts(false)}
          >
            {/* Navigation Buttons - Hidden on mobile and tablet */}
            {!isMobile && !isTablet && desktopCurrentPage > 0 && (
              <button 
                onClick={handlePrevPage}
                className={`absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
                  isHoveringProducts ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {!isMobile && !isTablet && desktopCurrentPage < totalPages - 1 && (
              <button 
                onClick={handleNextPage}
                className={`absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
                  isHoveringProducts ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div 
              className="relative overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {(isMobile || isTablet) ? (
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 px-1 -mx-1">
                  {allProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white overflow-hidden flex flex-col h-[420px] max-w-[380px] min-w-0"
                      style={isMobile ? { width: '60vw', minWidth: '60vw', flex: '0 0 60vw' } : isTablet ? { width: '33.33vw', minWidth: '33.33vw', flex: '0 0 33.33vw' } : {}}
                    >
                      <div className="relative flex-shrink-0 h-[340px] flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1  shadow-sm whitespace-nowrap">SALE</span>
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <h3 className="font-semibold text-gray-800 text-xs line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      
                        <div className="flex items-center space-x-2 mb-2">
                          {product.colors?.map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
                              className={`w-3 h-3 border border-gray-300 transition-all duration-200 ${
                                selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color, marginTop: '8px' }}
                              title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                          ))}
                        </div>
                        <p className="font-bold text-gray-800 text-sm">{product.price}</p>
                        <p className="text-green-600 text-xs mt-1">● In stock</p>
                        <div className="flex-grow"></div>
                        <Link
                          to={`/item-description/${product.id}`}
                          state={user ? { user } : undefined}
                          className="mt-auto w-full bg-black text-white py-1.5 hover:bg-gray-800 transition-colors duration-300 text-xs text-center block"
                          style={{ marginTop: '16px' }}
                        >
                          Choose options
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-center transition-all duration-300 ease-out ${getSlideClass(isAnimating, slideDirection)}`}
                >
                  {currentProducts.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-[420px]">
                      <div className="relative flex-grow h-[340px] flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1  shadow-sm whitespace-nowrap">SALE</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                       
                        <div className="flex items-center space-x-2 mb-2">
                          {product.colors?.map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
                              className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 transition-all duration-200 ${
                                selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color, marginTop: '8px' }}
                              title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                          ))}
                        </div>
                        <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{product.price}</p>
                        <p className="text-green-600 text-xs mt-1 mb-3">● In stock</p>
                        <Link
                          to={`/item-description/${product.id}`}
                          state={user ? { user } : undefined}
                          className="mt-auto w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block"
                        >
                          Choose options
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* New Collection Banner */}
        <div className="relative w-full h-auto overflow-hidden z-0 flex flex-col md:flex-row">
          {/* Left side - Image */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px]">
            <img 
              src="/public/collection2.jpg"
              alt="New Collection"
              className="w-full h-full object-cover object-center"
            />
          </div>
          
          {/* Right side - Black background with text */}
          <div className="w-full md:w-1/2 h-[300px] md:h-[400px] bg-black flex items-end pb-2 md:pb-6">
            <div className="w-full px-4 sm:px-6 md:px-8 text-center md:text-left">
              <h2 
                className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 md:mb-3 lg:mb-4 text-white" 
                style={{ fontFamily: "'Poppins', serif" }}
              >
                NEW COLLECTION
              </h2>
              <p 
                className="text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-3 md:mb-0" 
                style={{ fontFamily: "'Poppins', serif" }}
              >
                Discover our latest lighting designs.
              </p>
              <Link
                to="/collection"
                state={user ? { user } : undefined}
                className="mt-3 md:mt-4 inline-block bg-white text-black px-6 py-2 md:px-8 md:py-3 text-sm md:text-base font-semibold hover:bg-black hover:text-white transition-all duration-300"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Fresh Drops */}
        <section className="container mx-auto px-4 sm:px-14 md:px-18 lg:px-28 py-8 max-w-[90%] relative">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Avenir Next', sans-serif", fontWeight: "bold" }}>
              Fresh Drops
            </h2>
            <div className="flex-grow"></div>
            <Link
              to="/sales"
              state={user ? { user } : undefined}
              className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              View all
            </Link>
          </div>

          <div 
            className="relative px-4 sm:px-12"
            onMouseEnter={() => setIsHoveringFreshDrops(true)}
            onMouseLeave={() => setIsHoveringFreshDrops(false)}
          >
            {/* Navigation Buttons - Hidden on mobile and tablet */}
            {!isMobile && !isTablet && desktopFreshDropsPage > 0 && (
              <button 
                onClick={handleFreshDropsPrevPage}
                className={`absolute -left-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
                  isHoveringFreshDrops ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {!isMobile && !isTablet && desktopFreshDropsPage < totalPages - 1 && (
              <button 
                onClick={handleFreshDropsNextPage}
                className={`absolute -right-4 top-1/2 transform -translate-y-1/2 bg-black text-white p-4 rounded-full hover:bg-gray-800 transition-all duration-300 z-10 shadow-lg ${
                  isHoveringFreshDrops ? 'opacity-90' : 'opacity-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            <div 
              className="relative overflow-hidden"
              onTouchStart={onFreshDropsTouchStart}
              onTouchMove={onFreshDropsTouchMove}
              onTouchEnd={onFreshDropsTouchEnd}
            >
              {(isMobile || isTablet) ? (
                <div className="flex flex-nowrap overflow-x-auto gap-4 pb-2 px-1 -mx-1">
                  {allProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white overflow-hidden flex flex-col h-[420px] max-w-[380px] min-w-0 rounded-lg"
                      style={isMobile ? { width: '60vw', minWidth: '60vw', flex: '0 0 60vw' } : isTablet ? { width: '33.33vw', minWidth: '33.33vw', flex: '0 0 33.33vw' } : {}}
                    >
                      <div className="relative flex-shrink-0 h-[340px] flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1  shadow-sm whitespace-nowrap">NEW</span>
                      </div>
                      <div className="p-3 flex flex-col flex-1">
                        <h3 className="font-semibold text-gray-800 text-xs line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                       
                        <div className="flex items-center space-x-2 mb-2">
                          {product.colors?.map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
                              className={`w-3 h-3 border border-gray-300 transition-all duration-200 ${
                                selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color, marginTop: '8px' }}
                              title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                          ))}
                        </div>
                        <p className="font-bold text-gray-800 text-sm">{product.price}</p>
                        <p className="text-green-600 text-xs mt-1">● In stock</p>
                        <div className="flex-grow"></div>
                        <Link
                          to={`/item-description/${product.id}`}
                          state={user ? { user } : undefined}
                          className="mt-auto w-full bg-black text-white py-1.5 hover:bg-gray-800 transition-colors duration-300 text-xs text-center block"
                          style={{ marginTop: '16px' }}
                        >
                          Choose options
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 justify-center transition-all duration-300 ease-out ${getSlideClass(isFreshDropsAnimating, freshDropsSlideDirection)}`}
                >
                  {freshDropsProducts.map((product) => (
                    <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-[420px]">
                      <div className="relative flex-grow h-[340px] flex items-center justify-center overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                        <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2 py-1  shadow-sm whitespace-nowrap">NEW</span>
                      </div>
                      <div className="p-3 sm:p-4 flex flex-col flex-grow">
                        <h3 className="font-semibold text-gray-800 text-xs sm:text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                       
                        <div className="flex items-center space-x-2 mb-2">
                          {product.colors?.map((color) => (
                            <button
                              key={color}
                              onClick={() => handleColorSelect(product.id, color)}
                              className={`w-3 h-3 sm:w-4 sm:h-4 border border-gray-300 transition-all duration-200 ${
                                selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                              }`}
                              style={{ backgroundColor: color, marginTop: '8px' }}
                              title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                          ))}
                        </div>
                        <p className="font-bold text-gray-800 mt-auto text-sm sm:text-base">{product.price}</p>
                        <p className="text-green-600 text-xs mt-1 mb-3">● In stock</p>
                        <Link
                          to={`/item-description/${product.id}`}
                          state={user ? { user } : undefined}
                          className="mt-auto w-full bg-black text-white py-1.5 sm:py-2 hover:bg-gray-800 transition-colors duration-300 text-xs sm:text-sm text-center block"
                        >
                          Choose options
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <div className="mt-8 sm:mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Top Picks Card */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src="featured.jpg"
                alt="Top Picks"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>TOP PICKS</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>SHOP DESIGNER FAVORITES</p>
                <button className="mt-2 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-black text-sm sm:text-base font-semibold hover:bg-black hover:text-white transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* What's Hot Card */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src="featured.jpg"
                alt="What's Hot"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-6">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
                <button className="mt-2 sm:mt-4 px-4 sm:px-6 py-1.5 sm:py-2 bg-white text-black text-sm sm:text-base font-semibold hover:bg-black hover:text-white transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FREE DESIGN CONSULTATION*/}
        <div className="mt-8 md:mt-16 mb-8 md:mb-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-8 text-center" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>
            FREE LIGHTING CONSULTATION
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-black leading-relaxed mb-4 md:mb-6 text-center max-w-[90%] md:max-w-[80%] lg:max-w-4xl mx-auto px-2 md:px-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            We'd love to hear from you! Whether you have questions about our products, need assistance with your order, or want to provide feedback, please reach out to us through any of the following channels.
          </p>
          
          <div className="max-w-[90%] md:max-w-[80%] lg:max-w-4xl mx-auto flex justify-center">
            <Link 
              to="/contactus" 
              className="text-sm md:text-base lg:text-lg font-bold text-white bg-black py-2 px-4 md:px-5 lg:px-6 rounded-md text-center hover:bg-gray-800 transition-colors duration-300 w-[150px] md:w-[180px] lg:w-[200px]" 
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Inserted Image Section */}
        <div className="w-full">
          <Link to="/product-list" state={user ? { user } : undefined}>
            <img
              src="banner.png"
              alt="Testimonials"
              className="w-full object-cover"
            />
          </Link>
        </div>

        {/* Slide Animation Styles */}
        <style>{`
          .slide-left {
            animation: slideLeft 0.3s ease-out;
          }
          .slide-right {
            animation: slideRight 0.3s ease-out;
          }
          @keyframes slideLeft {
            from { transform: translateX(100%); opacity: 0.5; }
            to { transform: translateX(0); opacity: 1; }
          }
          @keyframes slideRight {
            from { transform: translateX(-100%); opacity: 0.5; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
      </main>
    </div>
  );
};

export default Home;