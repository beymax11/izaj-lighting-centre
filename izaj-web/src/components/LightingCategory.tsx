import React, { useState } from 'react';
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
  const firstPageItems = allItems.slice(0, 6);
  const secondPageItems = allItems.slice(6, 12);

  const handleNextClick = () => {
    setCurrentPage((prev) => (prev === 0 ? 1 : 0));
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

  return (
    <>
      <style>{slideLeftKeyframes}</style>
      <div className="flex justify-between items-center mb-4 px-8 mt-16 mx-20">
        <h2 className="text-xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
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
        className="relative group mx-20"
        style={{
          minHeight: "220px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <style>
          {`
            div::-webkit-scrollbar {
              width: 0;
              height: 0;
              display: none;
            }
          `}
        </style>

        <div
          className="flex justify-center space-x-6 transition-all duration-700 ease-in-out absolute w-full"
          style={{
            opacity: currentPage === 0 ? 1 : 0,
            transform: `translateX(${currentPage === 0 ? "0" : "-100%"})`,
            pointerEvents: currentPage === 0 ? "auto" : "none",
          }}
        >
          {firstPageItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 flex flex-col items-center relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden bg-white duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative">
                <h3
                  className="text-lg font-light text-black mt-2 text-center hover:text-orange-500 transition-all duration-500 inline-flex items-center"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "300" }}
                >
                  <span
                    className={`inline-flex items-center transition-transform duration-500 ${
                      hoveredIndex === idx ? "slide-left-anim" : ""
                    }`}
                  >
                    {item.name}
                    <span
                      className={`ml-2 transition-opacity duration-500 ${
                        hoveredIndex === idx ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Icon
                        icon="cil:arrow-right"
                        className="h-5 w-5 text-black"
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

        <div
          className="flex justify-center space-x-6 transition-all duration-700 ease-in-out absolute w-full"
          style={{
            opacity: currentPage === 1 ? 1 : 0,
            transform: `translateX(${currentPage === 1 ? "0" : "100%"})`,
            pointerEvents: currentPage === 1 ? "auto" : "none",
          }}
        >
          {secondPageItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-48 flex flex-col items-center relative"
              onMouseEnter={() => setHoveredIndex(idx + 6)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="w-48 h-48 rounded-full overflow-hidden bg-white duration-300">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="relative">
                <h3
                  className="text-lg font-light text-black mt-2 text-center hover:text-orange-500 transition-all duration-500 inline-flex items-center"
                  style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "300" }}
                >
                  <span
                    className={`inline-flex items-center transition-transform duration-500 ${
                      hoveredIndex === idx + 6 ? "slide-left-anim" : ""
                    }`}
                  >
                    {item.name}
                    <span
                      className={`ml-2 transition-opacity duration-500 ${
                        hoveredIndex === idx + 6 ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Icon
                        icon="cil:arrow-right"
                        className="h-5 w-5 text-black"
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

        {currentPage === 1 && (
          <button
            onClick={handleNextClick}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-0 group-hover:opacity-100"
            style={{ zIndex: 10 }}
          >
            <Icon icon="mdi:chevron-left" className="h-6 w-6 text-gray-600" width="24" height="24" />
          </button>
        )}

        <button
          onClick={handleNextClick}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110 opacity-0 group-hover:opacity-100"
          style={{ zIndex: 10 }}
        >
          <Icon icon="mdi:chevron-right" className="h-6 w-6 text-gray-600" width="24" height="24" />
        </button>
      </div>
    </>
  );
};

export default LightingCategory; 