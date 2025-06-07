import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

interface UserData {
  name: string;
  email: string;
}

interface LightingCategoryProps {
  user: UserData | null;
}

const LightingCategory: React.FC<LightingCategoryProps> = ({ user }) => {
  const allItems = [
    { id: 1, name: "Ceiling Lights", image: "ceiling.avif" },
    { id: 2, name: "Chandelier", image: "chandelier.avif" },
    { id: 3, name: "Pendant Lights", image: "pendant.avif" },
    { id: 4, name: "Wall Lights", image: "wall.avif" },
    { id: 5, name: "Table Lamps", image: "table.avif" },
    { id: 6, name: "Cluster Chandelier", image: "cluster2.avif" },
    { id: 7, name: "Floor Lamps", image: "floor.avif" },
    { id: 8, name: "Painting Lights", image: "painting.avif" },
    { id: 9, name: "Indoor Lights", image: "indoor.avif" },
    { id: 10, name: "Outdoor Lights", image: "outdoor.avif" },
    { id: 11, name: "Mirror", image: "mirror.avif" },
    { id: 12, name: "Magnetic Lights", image: "magnetic.avif" },
  ];

  const [currentPage, setCurrentPage] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [totalPages, setTotalPages] = useState(Math.ceil(allItems.length / 6));
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // sm breakpoint
        setItemsPerPage(3);
        setTotalPages(Math.ceil(allItems.length / 3));
      } else {
        setItemsPerPage(6);
        setTotalPages(Math.ceil(allItems.length / 6));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCurrentPageItems = () => {
    const start = currentPage * itemsPerPage;
    return allItems.slice(start, start + itemsPerPage);
  };

  const handleNextClick = () => {
    setSlideDirection('forward');
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevClick = () => {
    setSlideDirection('backward');
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

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
      handleNextClick();
    }
    if (isRightSwipe && currentPage > 0) {
      handlePrevClick();
    }
  };

  // Add this style block for the animation
  const slideLeftKeyframes = `
    @keyframes slideLeft {
      0% { transform: translateX(0);}
      100% { transform: translateX(-16px);}
    }
    .slide-left-anim {
      animation: slideLeft 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
    }
  `;

  const slideAnimationKeyframes = `
    @keyframes slideInForward {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideInBackward {
      from { transform: translateX(-100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    .slide-in-forward {
      animation: slideInForward 0.5s ease-out forwards;
    }
    .slide-in-backward {
      animation: slideInBackward 0.5s ease-out forwards;
    }
  `;

  return (
    <>
      <style>{slideLeftKeyframes}</style>
      <style>{slideAnimationKeyframes}</style>
      <div className="flex justify-between items-center mb-4 px-4 sm:px-6 md:px-8 mt-8 md:mt-16 mx-4 sm:mx-8 md:mx-20">
        <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
          Lighting Category
        </h2>
        <div className="flex items-center">
          <Link
            to="/product-list"
            state={user ? { user } : undefined}
            className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
          >
            View all
          </Link>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative group mx-4 sm:mx-8 md:mx-20"
        style={{
          minHeight: "180px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              width: 0;
              height: 0;
              display: none;
            }
            @media (max-width: 639px) {
              .slide-in-forward {
                animation: slideInForward 0.3s ease-out forwards;
              }
              .slide-in-backward {
                animation: slideInBackward 0.3s ease-out forwards;
              }
            }
          `}
        </style>

        <div
          className={`flex flex-wrap justify-center gap-4 sm:gap-6 transition-all duration-700 ease-in-out ${
            slideDirection === 'forward' ? 'slide-in-forward' : 'slide-in-backward'
          }`}
          style={{
            position: 'relative',
            width: '100%',
            touchAction: 'pan-y pinch-zoom'
          }}
        >
          {getCurrentPageItems().map((item, idx) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-32 sm:w-40 md:w-48 flex flex-col items-center relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-white duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative">
                <h3
                  className="text-sm sm:text-base md:text-lg font-light text-black mt-2 text-center hover:text-orange-500 transition-all duration-500 inline-flex items-center"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "300" }}
                >
                  <span
                    className={`inline-flex items-center transition-transform duration-500 ${
                      hoveredIndex === idx ? "slide-left-anim" : ""
                    }`}
                  >
                    {item.name}
                    <span
                      className={`ml-1 sm:ml-2 transition-opacity duration-500 ${
                        hoveredIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Icon
                        icon="cil:arrow-right"
                        className="h-4 w-4 sm:h-5 sm:w-5 text-black"
                        width="20"
                        height="20"
                      />
                    </span>
                  </span>
                </h3>
              </div>
            </div>
          ))}
        </div>

        {currentPage > 0 && (
          <button
            onClick={handlePrevClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100 hidden sm:block"
            style={{ zIndex: 10 }}
          >
            <Icon icon="mdi:chevron-left" className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" width="24" height="24" />
          </button>
        )}

        {currentPage < totalPages - 1 && (
          <button
            onClick={handleNextClick}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1.5 sm:p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-70 sm:opacity-0 group-hover:opacity-100 hidden sm:block"
            style={{ zIndex: 10 }}
          >
            <Icon icon="mdi:chevron-right" className="h-4 w-4 sm:h-6 sm:w-6 text-gray-600" width="24" height="24" />
          </button>
        )}
      </div>
    </>
  );
};

export default LightingCategory; 