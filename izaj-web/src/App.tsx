import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faShoppingCart, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './login'; // Import the LoginForm component
import SignUpForm from './signup'; // Import the SignUpForm component
import ItemDescription from './item-description'; // Import the ItemDescription page
import Cart from './cart'; // Import Cart component
import ProductList from './product-list'; // Import ProductList component
import Collection from './collection'; // Import Collection component
import Sales from './sales';
import Checkout from './checkout'; // Import Checkout component
import { Link } from 'react-router-dom'; // Import Link for routing
import "./App.css";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State for managing modal visibility
  const [isLoginForm, setIsLoginForm] = useState(true); // State to toggle between Login and SignUp form

  // Function to toggle between LoginForm and SignUpForm
  const toggleForm = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart />} /> {/* Cart route */}
        <Route path="/" element={<VideoStreamingUI setIsModalOpen={setIsModalOpen} />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/new" element={<Collection />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/item-description" element={<ItemDescription />} />
      </Routes>

      {/* Modal (Overlay) */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            {isLoginForm ? (
              <LoginForm toggleForm={toggleForm} />
            ) : (
              <SignUpForm toggleForm={toggleForm} />
            )}
            <button
              onClick={() => setIsModalOpen(false)} // Close modal
              className="mt-4 text-center text-gray-500 hover:text-black"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Router>
  );
};

const VideoStreamingUI: React.FC<{ setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setIsModalOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-white font-sans">
      {/* Header */}
      <header className="bg-white px-10 py-3 flex justify-between items-center border-b border-gray-200 sticky top-0 z-50">
        {/* Logo */}
        <div className="text-3xl font-playfair tracking-widest text-black">IZAJ</div>

        {/* Search Bar */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-black-300 rounded-full pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
          />
        </div>

        {/* Right Icons */}
        
          {/* My Account Button */}
          <div className="flex items-center space-x-6">
          <div className="relative">
            {/* Display "Hello {userName}" above My Account */}
            <div className="text-gray-500 text-sm">Hello Daniel</div>
            </div>
          <button
            onClick={() => setIsModalOpen(true)} // Open modal on click
            className="text-black text-sm font-medium flex items-center hover:text-orange-500"
          >
            My Account <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
          </button>

          {/* Icons */}
          <FontAwesomeIcon icon={faBell} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
          <FontAwesomeIcon icon={faShoppingCart} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
        </div>
      </header>

      {/* Navbar */}
      <nav className="bg-white py-3 border-b border-gray-200">
        <ul className="flex justify-center space-x-10 text-sm font-medium">
          <li><a href="#home" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>

          <li className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle Products dropdown
              className="text-black font-medium text-sm hover:border-b-2 border-black pb-1 flex items-center"
            >
              PRODUCTS <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-xs" />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                <ul className="py-2">
                  <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">LIGHTING FIXTURES</a></li>
                  <li>
                    <Link to="/product-list" className="block px-4 py-2 hover:bg-gray-100">
                      All Lighting Fixtures
                    </Link>
                  </li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Ceiling Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Semi Flush Mounted Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Chandeliers</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Cluster Chandeliers</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Pendant Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Floor Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Table Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Rechargeable Table Lamps</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Wall Lights</a></li>
                  <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Painting & Bathroom Lights</a></li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/new" className="text-black hover:border-b-2 border-black pb-1">
              NEW
            </Link>
          </li>

          <li>
            <Link to="/new" className="text-black hover:border-b-2 border-black pb-1">
              SALES
            </Link>
          </li>
          <li><a href="#about" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="p-6 mx-auto">
        {/* Banner - Completely redesigned with CSS background approach */}
        <div 
           className="w-full h-screen bg-cover bg-center relative"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/bradikan-uzlUBEYwufo-unsplash.jpg')", // Replace with your image path
            backgroundSize: "cover",
            backgroundPosition: "center",
            marginLeft: "0",  
            marginRight: "0", 
          
          }}
        >
          <div className="absolute bottom-0 left-0 w-full p-6 text-white flex justify-between items-center">
            {/* Left content */}
            <div className="max-w-lg">
              <h1 className="text-xl font-bold">
                IZAJ LIGHTING CENTRE
              </h1>
              <p className="text-lg mt-2">
                Our team is passionate about helping you find the perfect lighting.
              </p>
            </div>

            {/* Right button */}
            <button className="mt-4 px-6 py-2 text-white font-semibold rounded-lg border border-white hover:bg-white hover:text-black transition-all duration-300">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Lightning Category Section */}
        <h2 className="text-2xl font-bold mt-10 mb-4 text-black flex justify-between items-center">
  <span>LIGHTNING CATEGORY</span>
  <a href="#view-all" className="text-sm text-gray-500 hover:text-black transition duration-300">
    View All
  </a>
</h2>
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-80">
      <img
        src="ceiling-light.jpg" // Correct path to image inside public/images/
        alt="Ceiling Lights"
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold text-black mt-4 text-center">Ceiling Lights</h3>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-80">
      <img
        src="ceiling-light.jpg"
        alt="Chandelier"
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold text-black mt-4 text-center">Chandelier</h3>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-80">
      <img
        src="ceiling-light.jpg"
        alt="Cluster Chandelier"
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold text-black mt-4 text-center">Cluster Chandelier</h3>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-80">
      <img
        src="ceiling-light.jpg"
        alt="Pendant Lights"
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold text-black mt-4 text-center">Pendant Lights</h3>
  </div>

  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div className="relative w-full h-80">
      <img
        src="ceiling-light.jpg"
        alt="Floor Lights"
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
    </div>
    <h3 className="text-lg font-semibold text-black mt-4 text-center">Floor Lights</h3>
  </div>
</div>

{/* About Us Section - Plain Version */}
<div className="mt-16 mb-16 px-4">
<h2 className="text-3xl font-bold text-black mb-8 text-center">About IZAJ</h2>
  <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto">
    Izaj Lighting Centre is a premier provider of high-quality chandeliers and lighting solutions in the Philippines. With a commitment to enhancing interiors through exceptional illumination, we offer a curated selection of lighting fixtures that blend functionality with aesthetic appeal.
  </p>
  
  <div className="max-w-4xl mx-auto flex justify-center">
  <h3 className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center">
      ABOUT US
    </h3>
  </div>
</div>

{/* Monthly Deals Section */}
<div className="mt-16 px-4">
<h2 className="text-2xl font-bold text-black mb-8 text-left">MONTHLY DEALS</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Deal 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
       {/* Link for navigation */}
       <Link to="/item-description">
                <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                  CHOOSE OPTIONS
                </button>
              </Link>

    </div>

    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p> {/* Link for navigation */}
       <Link to="/item-description">
                <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                  CHOOSE OPTIONS
                </button>
              </Link>
    </div>

    {/* Add other deals as needed */}
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
       {/* Link for navigation */}
       <Link to="/item-description">
                <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                  CHOOSE OPTIONS
                </button>
              </Link>
    </div>
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
       {/* Link for navigation */}
       <Link to="/item-description">
                <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">
                  CHOOSE OPTIONS
                </button>
              </Link>
    </div>
  </div>
</div>



{/* New Collection Banner */}
<div className="w-full h-screen bg-cover bg-center relative"
  style={{
    backgroundImage: "url('/bradakan-uzlUBEYwufo-unsplash.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-between">
    {/* Left content - Image area */}
    <div className="w-1/2 h-full">
      <img 
        src="/bradikan-uzlUBEYwufo-unsplash.jpg"
        alt="Chandelier"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Right content - Text and Button */}
    <div className="w-1/2 h-full flex flex-col justify-between px-12 text-white">
      {/* IZAJ text at the top */}
      <h1 className="text-5xl font-bold">IZAJ</h1>

      {/* New Collection text and button at the bottom */}
      <div className="text-right">
        <p className="text-3xl font-semibold">NEW COLLECTION</p>
        <p className="mt-2 text-lg">Free Delivery & Installation</p>
        <button className="mt-6 px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300">
          Shop Now
        </button>
      </div>
    </div>
  </div>
</div>


  {/* Fresh Drops Section */}
<div className="mt-16 px-4">
<h2 className="text-2xl font-bold text-black mb-8 text-left">FRESH DROPS</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {/* Deal 1 */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>

    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>

    {/* Add other deals as needed */}
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>
    {/* Repeat similar blocks for other deals */}
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full absolute top-4 left-4">MONTHLY DEALS</span>
      <img
        src="ceiling-light.jpg" 
        alt="Aberdeen LED Chandelier"
        className="w-full h-80 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-black mt-4">Aberdeen | Modern LED Chandelier</h3>
      <p className="text-gray-500 text-sm line-through">₱16,995</p>
      <p className="text-black font-semibold">₱15,995 <span className="text-red-500">10% off</span></p>
      <button className="mt-4 w-full py-2 bg-black text-white font-semibold rounded-lg">CHOOSE OPTIONS</button>
    </div>
  </div>
</div>

{/* Featured Products Section */}
<div className="mt-16 px-4">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
    {/* Top Picks Card */}
    <div className="relative w-full h-80 rounded-lg overflow-hidden">
      <img
        src="featured.jpg"
        alt="Top Picks"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-xl font-semibold text-white">TOP PICKS</h3>
        <p className="mt-2 text-sm text-white">SHOP DESIGNER FAVORITES</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
          SHOP NOW
        </button>
      </div>
    </div>

    {/* What's Hot Card */}
    <div className="relative w-full h-80 rounded-lg overflow-hidden">
      <img
        src="featured.jpg"
        alt="What's Hot"
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-6">
        <h3 className="text-xl font-semibold text-white">WHAT'S HOT?</h3>
        <p className="mt-2 text-sm text-white">GET THE LATEST DESIGN FOR YOUR HOME AND PROJECTS!</p>
        <button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-black hover:text-white transition-all duration-300">
          SHOP NOW
        </button>
      </div>
    </div>
  </div>
</div>
 {/* FREE DESIGN CONSULTATION*/}
<div className="mt-16 mb-16 px-4">
<h2 className="text-3xl font-bold text-black mb-8 text-center">FREE DESIGN CONSULTATION</h2>
  <p className="text-lg text-black leading-relaxed mb-6 text-center max-w-4xl mx-auto">
  We'd love to hear from you! Whether you have questions about our products, need assistance with your order, or want to provide feedback, please reach out to us through any of the following      
  channels.
  </p>
  
  <div className="max-w-4xl mx-auto flex justify-center">
  <h3 className="text-large font-bold text-white bg-black py-2 px-5 rounded-md text-center">
      CONTACT US
    </h3>
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

{/* Footer */}
<footer className="bg-white text-black py-10">
  <div className="max-w-screen-xl mx-auto px-6">
    {/* Top Footer Sections */}
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
      
      {/* Our Company */}
      <div>
        <h3 className="font-semibold text-lg mb-4">OUR COMPANY</h3>
        <ul className="space-y-2">
          <li><a href="#home" className="hover:text-orange-500">Home</a></li>
          <li><a href="#about-us" className="hover:text-orange-500">About Us</a></li>
          <li><a href="#subscribe" className="hover:text-orange-500">Subscribe</a></li>
        </ul>
      </div>

      {/* More Info */}
      <div>
        <h3 className="font-semibold text-lg mb-4">MORE INFO</h3>
        <ul className="space-y-2">
          <li><a href="#delivery" className="hover:text-orange-500">Delivery & Installation</a></li>
          <li><a href="#privacy" className="hover:text-orange-500">Privacy Policy</a></li>
          <li><a href="#returns" className="hover:text-orange-500">Returns & Refunds</a></li>
          <li><a href="#help" className="hover:text-orange-500">Help & FAQs</a></li>
          <li><a href="#terms" className="hover:text-orange-500">Terms & Conditions</a></li>
          <li><a href="#warranty" className="hover:text-orange-500">Warranty Terms</a></li>
          <li><a href="#careers" className="hover:text-orange-500">Careers</a></li>
        </ul>
      </div>

      {/* Connect with Us */}
      <div>
        <h3 className="font-semibold text-lg mb-4">CONNECT WITH US</h3>
        <ul className="space-y-2">
          <li><a href="tel:+639123456789" className="hover:text-orange-500">+639123456789</a></li>
          <li><a href="mailto:example@gmail.com" className="hover:text-orange-500">example@gmail.com</a></li>
          <li><a href="https://wa.me/639123456789" className="hover:text-orange-500">WhatsApp</a></li>
          <li><a href="https://m.me/yourpage" className="hover:text-orange-500">Messenger</a></li>
        </ul>
      </div>

      {/* Our Location */}
      <div>
        <h3 className="font-semibold text-lg mb-4">OUR LOCATION</h3>
        <p>Izaj Lighting Centre</p>
        <p>San Pablo - 173 I, San Pablo City, 4000 Laguna</p>
        <h3 className="font-semibold text-lg mt-6 mb-4">OUR BRANCHES</h3>
        <ul className="space-y-2">
          <li>Quezon</li>
          <li>Laguna</li>
          <li>Cavite</li>
          <li>Batangas</li>
          <li>Camarines Sur</li>
          <li>Sorsogon</li>
          <li>La Union</li>
        </ul>
      </div>

      {/* Payments Method */}
      <div>
        <h3 className="font-semibold text-lg mb-4">PAYMENTS METHOD</h3>
        <img src="payments.png" alt="Payments Methods" className="w-full" />
      </div>
    </div>

    {/* Bottom Footer */}
    <div className="mt-10 text-center text-sm text-gray-400">
      <p>© 2025 IZAJ LIGHTING CENTRE. All Rights Reserved.</p>
    </div>
  </div>
</footer>




      </main>
    </div>
  );
};
export default App;

