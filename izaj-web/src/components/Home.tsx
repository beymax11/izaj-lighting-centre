import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import LightingCategory from './LightingCategory';

interface HomeProps {
  user: {
    name: string;
    email: string;
  } | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0);
  const heroImages = [
    {
      image: "hero1.jpg",
      heading: "Soft Light, Slow Days",
      subheading: "In a space where texture breathe and sunlight dances, soft lighting enhances the feeling of ease",
    },
    {
      image: "hero2.jpg",
      heading: "IZAJ LIGHTING CENTRE",
      subheading: "Illuminate your home with style.",
    },
    {
      image: "hero3.jpg",
      heading: "IZAJ LIGHTING CENTRE",
      subheading: "Discover what's new and trending.",
    },
  ];
  
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prevIndex) =>
        (prevIndex + 1) % heroImages.length
      );
    }, 5000); // 5 seconds
  
    return () => clearInterval(interval);
  }, []);
  
  // Sample deals data
  const deals = [
    {
      id: 1,
      image: "ceiling.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 2,
      image: "chadelier.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 3,
      image: "cluster.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 4,
      image: "pendant.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 5,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 6,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 7,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
    {
      id: 8,
      image: "floor.jpg",
      title: "Aberdeen | Modern LED Chandelier",
      oldPrice: "₱16,995",
      newPrice: "₱15,995",
      discount: "10% off"
    },
  ];

  return (
    <div className="min-h-screen bg-white text-white font-sans">
      {/* Main Content */}
      <main className="p-0 mx-0 w-full">
        {/* Hero Slideshow */}
        <div className="relative w-full h-[500px] overflow-hidden z-0 mt-[-1px]">
          {/* Hero Image */}
          <img 
            src={`/public/${heroImages[currentHeroIndex].image}`}
            alt="Hero Slide"
            className="w-full h-full object-cover transition-opacity duration-1000"
          />

          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white p-8">
            <div className="max-w-4xl">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" 
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {heroImages[currentHeroIndex].heading}
              </h1>
              <p 
                className="text-xl md:text-2xl lg:text-3xl" 
                style={{ fontFamily: "'Poppins', serif" }}
              >
                {heroImages[currentHeroIndex].subheading}
              </p>
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentHeroIndex(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentHeroIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        <LightingCategory user={user} />

        {/* About Us Section - Plain Version */}
        <div className="mt-16 mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>About IZAJ</h2>
          <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto"style={{ fontFamily: "'Poppins', sans-serif", }}>
            Izaj Lighting Centre is a premier provider of high-quality chandeliers and lighting solutions in the Philippines. With a commitment to enhancing interiors through exceptional illumination, we offer a curated selection of lighting fixtures that blend functionality with aesthetic appeal.
          </p>
          
          <div className="max-w-4xl mx-auto flex justify-center">
            <Link to="/aboutus" className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                About Us
            </Link>
          </div>
        </div>

        {/* Monthly Deals Section */}
        <div className="mt-16 px-16 mx-16">
          {/* Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-black text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
              Monthly Deals
            </h2>
            <Link
            to="/product-list"
            state={user ? { user } : undefined}
            className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
          >
            View all
        
          </Link>
          </div>
          
          <div className="relative group" style={{
            height: "500px", // Fixed height to prevent vertical scrolling
            overflow: "hidden", // Hide overflow
          }}>
            {/* First Page with 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 0 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
                pointerEvents: currentDealIndex === 0 ? "auto" : "none",
              }}
            >
              {deals.slice(0, 4).map((deal) => (
                <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      MONTHLY DEALS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
                  <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
                  <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Second Page with next 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 1 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
                pointerEvents: currentDealIndex === 1 ? "auto" : "none",
              }}
            >
              {deals.slice(4, 8).map((deal) => (
                <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      MONTHLY DEALS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">{deal.title}</h3>
                  <p className="text-gray-500 text-sm line-through">{deal.oldPrice}</p>
                  <p className="text-black font-semibold">{deal.newPrice} <span className="text-red-500">{deal.discount}</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {currentDealIndex === 1 && (
              <button
                onClick={() => setCurrentDealIndex(0)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <Icon icon="mdi:chevron-left" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}

            {currentDealIndex === 0 && (
              <button
                onClick={() => setCurrentDealIndex(1)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <Icon icon="mdi:chevron-right" className="h-6 w-6 text-gray-600" width="24" height="24" />
              </button>
            )}
          </div>
        </div>

        {/* New Collection Banner */}
        <div className="w-full h-screen bg-cover bg-center relative mt-4"
          style={{
            backgroundImage: "url('/bradakan-uzlUBEYwufo-unsplash.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
            {/* Left content - Image area */}
            <div className="w-3/5 h-4/5">
              <img 
                src="/collection.jpg"
                alt="Chandelier"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right content - Text and Button */}
            <div className="w-1/2 h-4/5 flex flex-col justify-between px-12 text-white bg-black">
              {/* IZAJ text at the top */}
              <div className="mt-2">
                <h1 
                  className="text-6xl" 
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
                <p className="text-5xl font-semibold" style={{ fontFamily: "'Playfair Display', serif", letterSpacing: "0.2em" }}>NEW COLLECTION</p>
                <p className="mt-1 text-lg" style={{ fontFamily: "'Poppins', serif" }}>Free Delivery & Installation</p>
                <div className="flex items-center justify-center mt-4 px-4 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300 w-40">
                    <Link
                      to="/product-list"
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

        {/* Fresh Drops Section */}
        <div className="mt-8 px-16 mx-16">
          {/* Title */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-black text-left" style={{ fontFamily: "'Maven Pro', sans-serif", fontWeight: "bold" }}>
              Fresh Drops
            </h2>
            <Link
              to="/product-list"
              state={user ? { user } : undefined}
              className="text-sm font-medium text-gray-500 hover:underline mt-1 flex items-center"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}
            >
              View all
            </Link>
          </div>
          
          <div className="relative group" style={{
            height: "500px",
            overflow: "hidden",
          }}>
            {/* First Page with 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 0 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 0 ? "0" : "-100%"})`,
                pointerEvents: currentDealIndex === 0 ? "auto" : "none",
              }}
            >
              {deals.slice(0, 4).map((deal) => (
                <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      FRESH DROPS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
                  <p className="text-gray-500 text-sm line-through">₱16,995</p>
                  <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Second Page with next 4 items */}
            <div
              className="grid grid-cols-4 gap-6 transition-all duration-700 ease-in-out absolute w-full"
              style={{
                opacity: currentDealIndex === 1 ? 1 : 0,
                transform: `translateX(${currentDealIndex === 1 ? "0" : "100%"})`,
                pointerEvents: currentDealIndex === 1 ? "auto" : "none",
              }}
            >
              {deals.slice(4, 8).map((deal) => (
                <div key={deal.id} className="p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden flex-grow">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-72 object-cover transform transition-transform duration-300 hover:scale-110"
                    />
                    <span className="absolute top-4 left-4 bg-green-600 text-white px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>
                      FRESH DROPS
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
                  <p className="text-gray-500 text-sm line-through">₱16,995</p>
                  <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
                  <Link to="/item-description">
                    <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                      CHOOSE OPTIONS
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            {currentDealIndex === 1 && (
              <button
                onClick={() => setCurrentDealIndex(0)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {currentDealIndex === 0 && (
              <button
                onClick={() => setCurrentDealIndex(1)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none transition-transform duration-500 hover:scale-110"
                style={{ zIndex: 10 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Featured Products Section */}
        <div className="mt-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* Top Picks Card */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src="featured.jpg"
                alt="Top Picks"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-extrabold text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>TOP PICKS</h3>
                <p className="mt-2 text-sm text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>SHOP DESIGNER FAVORITES</p>
                <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>

            {/* What's Hot Card */}
            <div className="relative w-full h-64 rounded-lg overflow-hidden">
              <img
                src="featured.jpg"
                alt="What's Hot"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-2xl font-extrabold text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extrabold" }}>WHAT'S HOT?</h3>
                <p className="mt-2 text-sm text-white"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "400" }}>GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
                <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "900" }}>
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* FREE DESIGN CONSULTATION*/}
        <div className="mt-16 mb-16 px-4">
          <h2 className="text-3xl font-bold text-black mb-8 text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "extra-bold" }}>FREE DESIGN CONSULTATION</h2>
          <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto"style={{ fontFamily: "'Poppins', sans-serif", }}>
          We'd love to hear from you! Whether you have questions about our products, need assistance with your order, or want to provide feedback, please reach out to us through any of the following      
          channels.
          </p>
          
          <div className="max-w-4xl mx-auto flex justify-center">
            <Link to="/contactus" className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center"style={{ fontFamily: "'Poppins', sans-serif", fontWeight: "bold" }}>Contact Us</Link>
                
          </div>
        </div>

        {/* Inserted Image Section */}
        <div className="w-full">
          <img
            src="banner.png"
            alt="Testimonials"
            className="w-full object-cover"
          />
        </div>

       
      </main>
    </div>
  );
};

export default Home; 