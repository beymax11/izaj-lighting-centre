import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faShoppingCart, faCaretDown, } from '@fortawesome/free-solid-svg-icons';

const SimpleAboutUs: React.FC = () => {
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
      const [isDropdownOpen, setIsDropdownOpen] = useState(false);
      const [email, setEmail] = useState('');
      
            const handleSubscribe = (e: React.FormEvent) => {
                e.preventDefault();
                // Handle subscription logic here
                alert(`Thank you for subscribing with ${email}!`);
                setEmail('');
            };
      

 return (
     <div className="flex flex-col min-h-screen">
       {/* Header */}
       <header className="bg-white px-10 py-3 flex justify-between items-center border-b border-white sticky top-0 z-50">
         <div className="text-3xl font-playfair tracking-widest text-black">IZAJ</div>
 
         <div className="relative w-1/2">
           <input
             type="text"
             placeholder="Search"
             className="w-full border border-black rounded-full pl-10 pr-4 py-2 text-sm text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
           />
           <FontAwesomeIcon
             icon={faSearch}
             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black"
           />
         </div>
 
         <div className="flex items-center space-x-6">
           <div
             className="relative"
             onMouseEnter={() => setIsAccountDropdownOpen(true)}
             onMouseLeave={() => setIsAccountDropdownOpen(false)}
           >
             <span className="text-xs text-gray-500 block text-left">Login/Signup</span>
             <button className="text-black text-sm font-medium flex items-center hover:text-orange-500">
               My Account <FontAwesomeIcon icon={faCaretDown} className="ml-1" />
             </button>
 
             {isAccountDropdownOpen && (
               <div className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                 <ul className="py-2">
                   <li><a href="#profile" className="block px-4 py-2 hover:bg-gray-100">My Account</a></li>
                   <li><a href="#purchases" className="block px-4 py-2 hover:bg-gray-100">My Purchases</a></li>
                   <li><a href="#logout" className="block px-4 py-2 hover:bg-gray-100">Logout</a></li>
                 </ul>
               </div>
             )}
           </div>
 
           <FontAwesomeIcon icon={faBell} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
           <FontAwesomeIcon icon={faShoppingCart} className="text-lg text-black hover:text-orange-500 cursor-pointer" />
         </div>
       </header>
 
       {/* Navigation */}
       <nav className="bg-white py-3 border-b border-gray-200">
         <ul className="flex justify-center space-x-10 text-sm font-medium">
           <li><a href="/" className="text-black hover:border-b-2 border-black pb-1">HOME</a></li>
           <li className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
             <a href="#" className="text-black hover:border-b-2 border-black pb-1 flex items-center">
               PRODUCTS <FontAwesomeIcon icon={faCaretDown} className="ml-1 text-xs" />
             </a>
             {isDropdownOpen && (
               <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg w-48 z-50">
                 <ul className="py-2">
                   <li><a href="#product1" className="block px-4 py-2 hover:bg-gray-100">Ceiling Lights</a></li>
                   <li><a href="#product2" className="block px-4 py-2 hover:bg-gray-100">Pendant Lights</a></li>
                   <li><a href="#product3" className="block px-4 py-2 hover:bg-gray-100">Chandeliers</a></li>
                 </ul>
               </div>
             )}
           </li>
           <li><a href="/new" className="text-black hover:border-b-2 border-black pb-1">NEW</a></li>
           <li><a href="/sales" className="text-black hover:border-b-2 border-black pb-1">SALES</a></li>
           <li><a href="/about" className="text-black hover:border-b-2 border-black pb-1">ABOUT US</a></li>
         </ul>
       </nav>

       {/* Main Content - Contact Information */}
    <main className="flex-grow container mx-auto px-4 py-8">
     <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-sm text-center">
       <h1 className="text-3xl font-bold text-center mb-8">ABOUT US</h1>
       
       <div className="space-y-6 text-lg">
         <div>
        <p className="font-semibold">Our Story</p>
       
         </div>
         
         <div className="space-y-2">
        <p>At Izaj Lightning Centre, we don’t just sell chandeliers—we create breathtaking lighting experiences that transform spaces into works of art. From classic crystal masterpieces to modern, statement-making designs, our chandeliers bring elegance, sophistication, and brilliance to every home and business.

What started as a single store fueled by a passion for luxury lighting has now grown into seven branches, each dedicated to offering the finest selection of chandeliers. Our journey has been built on craftsmanship, innovation, and a deep understanding of what makes a space truly shine.

At Izaj Lightning Centre, we believe the right chandelier does more than illuminate—it tells a story, sets a mood, and adds timeless beauty. Whether you're looking for a grand centerpiece or a contemporary lighting solution, our expert team is here to guide you in finding the perfect piece for your space.

Visit us today and let us light up your world with brilliance and style.</p>
         </div>
         
         <div>
     
         </div>
    
          </div>
        </div>
      </main>

        {/* Subscription Section */}
        <section className="bg-black py-12 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Get fabulous discounts and exclusive offers by signing up in our mailing list.</h2>
                    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black flex-grow max-w-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button
                            type="submit"
                            className="bg-white text-black px-6 py-2  hover:bg-gray-800 transition-colors"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                    <p className="text-sm text-white mt-4">100% free, Unsubscribe any time!</p>
                </div>
            </section>

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
    </div>
  );
};

export default SimpleAboutUs;