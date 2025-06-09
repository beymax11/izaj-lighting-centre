import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LightingCategory from './LightingCategory';

interface HomeProps {
  user: {
    name: string;
    email: string;
  } | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHoveringProducts, setIsHoveringProducts] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedColors, setSelectedColors] = useState<{ [key: number]: string }>({});
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  // New state variables for Fresh Drops
  const [freshDropsPage, setFreshDropsPage] = useState(0);
  const [freshDropsSlideDirection, setFreshDropsSlideDirection] = useState<'left' | 'right'>('right');
  const [isHoveringFreshDrops, setIsHoveringFreshDrops] = useState(false);

  // Hero images for desktop
  const desktopHeroImages = [
    {
      image: "hero1.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
    {
      image: "hero2.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
    {
      image: "hero3.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
  ];

  // Hero images for mobile
  const mobileHeroImages = [
    {
      image: "chadelier.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
    {
      image: "ceiling.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
    {
      image: "cluster.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
  ];

  // Use the appropriate hero images based on screen size
  const heroImages = isMobile ? mobileHeroImages : desktopHeroImages;
  
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); 
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

  const productsPerPage = 5;
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const currentProducts = allProducts.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  // Fresh Drops products
  const freshDropsProducts = allProducts.slice(
    freshDropsPage * productsPerPage,
    (freshDropsPage + 1) * productsPerPage
  );

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setSlideDirection('right');
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setSlideDirection('left');
      setCurrentPage(currentPage + 1);
    }
  };

  // Fresh Drops navigation handlers
  const handleFreshDropsPrevPage = () => {
    if (freshDropsPage > 0) {
      setFreshDropsSlideDirection('right');
      setFreshDropsPage(freshDropsPage - 1);
    }
  };

  const handleFreshDropsNextPage = () => {
    if (freshDropsPage < totalPages - 1) {
      setFreshDropsSlideDirection('left');
      setFreshDropsPage(freshDropsPage + 1);
    }
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
            className="w-full h-full object-cover object-center transition-all duration-1000"
          />

          {/* Overlay Text */}
          <div className="absolute inset-0 w-full bg-gradient-to-t from-black via-black/70 to-transparent text-white p-4 sm:p-6 md:p-8 flex items-end">
            <div className="max-w-4xl mx-auto">
              <h1 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4 drop-shadow-lg" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {heroImages[currentHeroIndex].heading}
              </h1>
              <p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl drop-shadow-lg" 
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
        <section className="container mx-auto px-14 sm:px-18 md:px-22 lg:px-28 py-8 max-w-[90%] relative">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
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
            className="relative px-12"
            onMouseEnter={() => setIsHoveringProducts(true)}
            onMouseLeave={() => setIsHoveringProducts(false)}
          >
            {/* Navigation Buttons */}
            {currentPage > 0 && (
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
            {currentPage < totalPages - 1 && (
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

            <div className="relative overflow-hidden">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${slideDirection === 'left' ? '-100%' : '100%'})`,
                  animation: `${slideDirection === 'left' ? 'slideInLeft' : 'slideInRight'} 0.5s forwards`
                }}
              >
                {currentProducts.map((product) => (
                  <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-full">
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 flex items-center">
                      Monthly Deals 
                    </div>
                    <div className="relative flex-grow">
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      <p className="text-gray-600 text-xs mb-2">{product.size}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        {product.colors?.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(product.id, color)}
                            className={`w-4 h-4 border border-gray-300 transition-all duration-200 ${
                              selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          />
                        ))}
                      </div>
                      <p className="font-bold text-gray-800 mt-auto">{product.price}</p>
                      <p className="text-green-600 text-xs mt-1">● In stock</p>
                      <button className="mt-4 w-full bg-black text-white py-2 hover:bg-gray-800 transition-colors duration-300 text-sm">
                        Choose options
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

         
        </section>

         {/* New Collection Banner */}
         <div className="w-full min-h-screen bg-cover bg-center relative mt-4"
          style={{
            backgroundImage: "url('/bradakan-uzlUBEYwufo-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col md:flex-row">
            {/* Left content - Image area */}
            <div className="w-full md:w-3/5 h-1/2 md:h-full">
              <img 
                src="/collection.jpg"
                alt="Chandelier"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right content - Text and Button */}
            <div className="w-full md:w-2/5 h-1/2 md:h-full flex flex-col justify-between px-4 md:px-12 text-white bg-black">
              {/* IZAJ text at the top */}
              <div className="mt-2">
                <h1 
                  className="text-4xl md:text-6xl" 
                  style={{ 
                    fontFamily: "'Playfair Display', serif", 
                    letterSpacing: "0.3em" 
                  }}
                >
                  IZAJ
                </h1>
              </div>

              {/* New Collection text and button at the top */}
              <div className="text-left mt-2 mb-6">
                <p className="text-3xl md:text-5xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.2em" }}>NEW COLLECTION</p>
                <p className="mt-1 text-base md:text-lg" style={{ fontFamily: "'Poppins', serif" }}>Free Delivery & Installation</p>
                <div className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 w-40">
                    <Link
                      to="/collection"
                      state={user ? { user } : undefined}
                      className="text-center"
                      style={{ fontFamily: "'Poppins', serif" }}
                    >
                    SHOP NOW
                    </Link>
                </div>  
              </div>
            </div>
          </div>
        </div>


        {/* Fresh Drops */}
        <section className="container mx-auto px-14 sm:px-18 md:px-22 lg:px-28 py-8 max-w-[90%] relative">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-lg md:text-xl text-black" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
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
            className="relative px-12"
            onMouseEnter={() => setIsHoveringFreshDrops(true)}
            onMouseLeave={() => setIsHoveringFreshDrops(false)}
          >
            {/* Navigation Buttons */}
            {freshDropsPage > 0 && (
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
            {freshDropsPage < totalPages - 1 && (
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

            <div className="relative overflow-hidden">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(${freshDropsSlideDirection === 'left' ? '-100%' : '100%'})`,
                  animation: `${freshDropsSlideDirection === 'left' ? 'slideInLeft' : 'slideInRight'} 0.5s forwards`
                }}
              >
                {freshDropsProducts.map((product) => (
                  <div key={product.id} className="bg-white overflow-hidden relative flex flex-col h-full">
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 flex items-center">
                      Fresh Drops
                    </div>
                    <div className="relative flex-grow">
                      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                      <p className="text-gray-600 text-xs mb-2">{product.size}</p>
                      <div className="flex items-center space-x-2 mb-2">
                        {product.colors?.map((color) => (
                          <button
                            key={color}
                            onClick={() => handleColorSelect(product.id, color)}
                            className={`w-4 h-4 border border-gray-300 ${
                              selectedColors[product.id] === color ? 'ring-2 ring-black ring-offset-2' : ''
                            }`}
                            style={{ backgroundColor: color }}
                            title={color.charAt(0).toUpperCase() + color.slice(1)}
                          />
                        ))}
                      </div>
                      <p className="font-bold text-gray-800 mt-auto">{product.price}</p>
                      <p className="text-green-600 text-xs mt-1">● In stock</p>
                      <button className="mt-4 w-full bg-black text-white py-2 text-sm">
                        Choose options
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <div className="mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Top Picks Card */}
            <div className="relative w-full h-64 overflow-hidden">
              <img
                src="featured.jpg"
                alt="Top Picks"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>TOP PICKS</h3>
                <p className="mt-2 text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>SHOP DESIGNER FAVORITES</p>
                <button className="mt-4 px-6 py-2 bg-white text-black font-semibold  hover:bg-black hover:text-white transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* What's Hot Card */}
            <div className="relative w-full h-64  overflow-hidden">
              <img
                src="featured.jpg"
                alt="What's Hot"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-extrabold text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
                <p className="mt-2 text-sm text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
                <button className="mt-4 px-6 py-2 bg-white text-black font-semibold  hover:bg-black hover:text-white transition-all duration-300"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FREE DESIGN CONSULTATION*/}
        <div className="mt-8 md:mt-16 mb-8 md:mb-16 px-4 md:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-8 text-center" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>
            FREE DESIGN CONSULTATION
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

       
      </main>

      <style>
        {`
          @keyframes slideInLeft {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          @keyframes slideInRight {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home; 