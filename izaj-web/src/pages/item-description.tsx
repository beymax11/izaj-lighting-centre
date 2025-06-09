import React, { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link, useParams } from 'react-router-dom';

import ChatNow from '../ChatNow';


const ItemDescription: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});
  const imgRef = useRef<HTMLDivElement>(null);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isCareOpen, setIsCareOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  
  useEffect(() => {
    // Get product data from the allProducts array in Home.tsx
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
      }
    ];

    const foundProduct = allProducts.find(p => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setMainImage(foundProduct.image);
      // Set thumbnails based on the product image
      const baseImage = foundProduct.image.replace('.webp', '');
      setThumbnails([
        foundProduct.image,
        `${baseImage}2.webp`,
        `${baseImage}3.webp`,
        `${baseImage}4.webp`
      ]);
    }
  }, [id]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      backgroundImage: `url(${mainImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: '200%',
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Product Images */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {thumbnails.map((thumbnail, index) => (
                  <img 
                    key={index}
                    src={thumbnail}
                    className={`w-16 h-16 md:w-20 md:h-20 object-cover border cursor-pointer transition-all ${
                      mainImage === thumbnail ? 'ring-2 ring-black' : 'border-gray-200'
                    }`}
                    onClick={() => setMainImage(thumbnail)}
                    alt={`Thumbnail ${index + 1}`}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ))}
              </div>

              {/* Main Product Image with Zoom Effect */}
              <div className="flex-1 order-1 md:order-2">
                <div 
                  ref={imgRef}
                  className="relative overflow-hidden rounded-lg aspect-square w-full"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Original Image */}
                  <img
                    src={mainImage}
                    className="w-full h-full object-cover rounded-lg"
                    alt="Product Image"
                  />
                  
                  {/* Zoom Layer */}
                  {Object.keys(zoomStyle).length > 0 && (
                    <div 
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        ...zoomStyle,
                        backgroundRepeat: 'no-repeat',
                        zIndex: 10
                      }}
                    />
                  )}
                </div>

                {/* Social Media Icons below main image */}
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-black">Share:</span>
                    <Icon icon="logos:messenger" className="w-5 h-5 text-blue-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="ic:baseline-facebook" className="w-5 h-5 text-blue-700 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:instagram" className="w-5 h-5 text-pink-500 cursor-pointer hover:opacity-80" />
                    <Icon icon="mdi:twitter" className="w-5 h-5 text-blue-400 cursor-pointer hover:opacity-80" />
                  </div>

                  <div className="flex items-center text-gray-600 text-sm gap-1">
                    <Icon icon="mdi:heart" className="text-red-500 text-lg" />
                    Favorite (2.7k)
                  </div>
                </div>
                {/* Product Description  */}
                <div className="mt-4 p-4 ">
                  <h3 className="font-bold text-black text-lg mb-2">PRODUCT DESCRIPTION</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-black">
                    <li>Color: {product.colors?.[0] || 'Black'}, {product.colors?.[1] || 'Black'} + Gold</li>
                    <li>Material: Iron art + Aluminum</li>
                    <li>Width: {product.size || '120cm'}</li>
                  </ul>
                </div>
                {/* Payment & Security Section */}
                <div className="mt-4 p-4 border-t border-gray-200">
                  <h3 className="font-bold text-black text-lg mb-4">PAYMENT & SECURITY</h3>
                  <div className="flex justify-center">
                    <img 
                      src="payment.webp" 
                      alt="Payment security badges" 
                      className="w-80 h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          {/* Product Details */}
          <div className="flex-1">
            {/* Chat Now Button */}
            <button 
              className="border border-gray-300 px-4 py-2 rounded-lg text-sm mb-6 hover:bg-gray-50 flex items-center gap-2 transition-colors text-black"
              onClick={() => setIsChatModalOpen(true)}
            >
              <Icon icon="material-symbols:chat-outline-rounded" className="text-lg" />
              INQUIRE NOW
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              {product.name}
            </h2>

            {/* Monthly Deals & Ratings */}
            <div className="flex items-center mb-4 gap-2">
              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">MONTHLY DEALS</span>
              <div className="flex items-center">
                <span className="mr-1 text-black">4.5</span>
                {[...Array(4)].map((_, i) => (
                  <Icon key={i} icon="mdi:star" className="text-yellow-500 text-lg" />
                ))}
                <Icon icon="mdi:star-half" className="text-yellow-500 text-lg" />
              </div>
              <span className="text-gray-500 text-sm">7.3K Ratings | 10K+ Sold</span>
            </div>

            {/* Color Options */}
            <div className="mb-6">
              <p className="font-semibold mb-2 text-black">Color: {product.colors?.[0] || 'Black'}</p>
              <div className="flex gap-2">
                {product.colors?.map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-12 h-12 border border-gray-200 rounded cursor-pointer hover:ring-2 hover:ring-black"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <p className="text-2xl font-bold mb-4 text-black">{product.price}</p>

            {/* Stock */}
            <p className="mb-6 text-gray-600">Stock: <span className="font-semibold text-green-600">In Stock</span></p>

            {/* Size */}
            {product.size && (
              <p className="mb-6 text-gray-600">Size: <span className="font-semibold">{product.size}</span></p>
            )}

            {/* Quantity & Branch Availability */}
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4">
                <label className="font-medium text-black">Quantity:</label>
                <input 
                  type="number" 
                  min="1" 
                  defaultValue="1" 
                  className="w-16 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none text-black" 
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="font-medium text-black">Branch Availability:</label>
                <select className="border border-gray-300 p-2 rounded focus:ring-2 focus:ring-black focus:outline-none text-black">
                  <option>San Pablo City</option>
                  <option>Quezon</option>
                  <option>Laguna</option>
                  <option>Cavite</option>
                  <option>Batangas</option>
                  <option>Camarines Sur</option>
                  <option>Sorsogon</option>
                  <option>La Union</option>
                </select>
              </div>
            </div>

            {/* Shipping Schedule */}
            <div className="bg-yellow-100 p-4 rounded-lg mb-8 flex items-start">
              <Icon 
                icon="mdi:truck-delivery-outline" 
                className="text-gray-800 text-2xl mr-3 mt-1 flex-shrink-0"
              />
              <div>
                <h3 className="font-bold text-gray-800 mb-2">Shipping Schedule</h3>
                <p className="text-gray-800 text-sm">
                  Dispatched within 10-14 working days (for store pick up), 10-14 days (Metro Manila), and 14 days (Provincial).
                </p>
              </div>
            </div>

            {/* Buttons */} 
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
              >
                <Icon icon="mdi:cart-outline" className="text-lg" />
                ADD TO CART
              </button>
              
                <Link 
                to="/checkout"
                className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex-1 flex items-center justify-center gap-2"
                >
                <Icon icon="mdi:credit-card-outline" className="text-lg" />
                BUY NOW
                </Link>
            </div>

            {/* Wrap the following two sections in a fragment to avoid JSX errors */}
            <>
              {/* Delivery & Installation Section */}
              <div className="mb-8 border-b border-gray-200 pb-6">
                <button 
                  className="w-full flex items-center justify-between text-xl font-semibold text-black mb-4"
                  onClick={() => setIsDeliveryOpen(!isDeliveryOpen)}
                >
                  <span>DELIVERY & INSTALLATION</span>
                  <Icon 
                    icon={isDeliveryOpen ? "mdi:minus" : "mdi:plus"} 
                    className="text-black text-xl" 
                  />
                </button>
                
                {isDeliveryOpen && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="space-y-4 pr-2">
                      <h4 className="text-lg font-bold text-black">To ensure quality service, please read our Delivery and Installation guidelines:</h4>
                      <ul className="list-disc pl-6 space-y-2">
                        <li className="text-black">
                          <strong>Free Delivery:</strong> Orders Php10,000 and above* 
                          <span className="text-gray-600"> (within San Pablo City only)</span>
                        </li>
                        <li className="text-black">
                          <strong>Free installation:</strong> Orders Php10,000 and above* 
                          <span className="text-gray-600"> (within San Pablo City only)</span> Installation should be done on the same day of Delivery.
                        </li>
                        <li className="text-black">
                          <strong>Regular Installation Fee</strong> – Php 900.00/pc*
                        </li>
                      </ul>
                      <p className="text-gray-600">
                        *Installations are applicable to lighting fixtures only.
                      </p>

                      <div className="pt-4">
                        <h4 className="text-lg font-bold mb-2 text-black">Added notes on Delivery & Installation:</h4>
                        <ul className="list-disc pl-6 space-y-2 text-black">
                          <li>The customer shall be responsible to ensure that either he/she personally or a valid representative will receive the products and approve of its condition before the delivery team leaves. Damaged products should be pointed out to the delivery team upon delivery so a replacement may be scheduled.</li>
                          <li>The customer should apply for all necessary gate passes, working and other permits needed for the delivery day.</li>
                          <li>If the customer is not available to receive the delivery at the agreed day, new delivery will be scheduled with a corresponding delivery fee.</li>
                          <li>Kindly check the condition of goods before signing receipt before the delivery team leaves as warranties are not indulged in our offers.</li>
                          <li>For installation, the customer shall be responsible in ensuring that the ceiling are fit for installations. Gypsum boards without support are not fit for big fixture installation.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Care Instruction Section */}
              <div className="mb-8 border-b border-gray-200 pb-6">
                <button 
                  className="w-full flex items-center justify-between text-xl font-semibold text-black mb-4"
                  onClick={() => setIsCareOpen(!isCareOpen)}
                >
                  <span>CARE INSTRUCTION</span>
                  <Icon 
                    icon={isCareOpen ? "mdi:minus" : "mdi:plus"} 
                    className="text-black text-xl" 
                  />
                </button>
                {isCareOpen && (
                  <div className="max-h-64 overflow-y-auto">
                    <div className="border-t border-gray-200 pt-4 space-y-4 pr-2">
                      <h4 className="font-semibold text-lg text-black">Care Instructions for Your Chandelier</h4>
                      <div className="space-y-6">
                        <div>
                          <h5 className="font-medium mb-2 text-black">1. Identify How Your Chandelier Should be Handled</h5>
                          <p className="text-gray-700">
                            The type, size, and age of your chandelier will affect the steps you will have to take to care for it. If you
                            have an antique or a crystal chandelier, for example, then you will need to take more precautions than
                            if you have a newer or mass-produced chandelier. Check out advice from your chandelier's manufacturer
                            for tips on how you should care for your chandelier and how often. You can find a lot of useful tips online
                            as well.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-black">2. Dismantle and Clean</h5>
                          <p className="text-gray-700 mb-2">
                            It is possible to clean a chandelier with just a dry cloth to avoid risk from the electrical components, but it isn't
                            as effective and can actually take longer sometimes. A better method is to take your chandelier apart and hand
                            clean it piece by piece. It is a little time consuming but doing it every few months or whenever you have an
                            important event coming up will be enough. Experts suggest every two to six months, depending on
                            the conditions in the room the chandelier is hanging.
                          </p>
                          <p className="text-gray-700 font-medium mb-1 text-black">Essentially, you need to:</p>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>Carefully take the chandelier down</li>
                            <li>Lay out each individual piece on a blanket</li>
                            <li>Wash each piece with hot water and a little detergent</li>
                            <li>Rinse, dry, polish, and then put the chandelier back together again</li>
                          </ul>
                          <p className="text-gray-700 mt-2">
                            Take special care with crystals or other delicate components and be wary of electrical parts. Scheduling time to
                            do this however often your chandelier needs it will keep it looking nice at all times.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-black">3. Dust Weekly</h5>
                          <p className="text-gray-700">
                            When you are doing your daily or weekly cleaning, it can be easy to forget about your light fixtures which is
                            how dust and grime can build up on them so easily, often without you noticing. Not only does this make it
                            harder when it does come time to give them a thorough cleaning, it can be troublesome for people with
                            asthma or allergies. Instead, don't forget to run your chandelier over with a duster at least once a week and get
                            as much dust as you are able to. It won't always be possible to get your chandelier completely clean this way,
                            but it will make things easier when you do your thorough cleaning as described above.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-black">4. Hire a Professional</h5>
                          <p className="text-gray-700">
                            If dismantling and cleaning your chandelier seems too difficult or too much for you to do alone, consider hiring
                            a professional cleaning company which specializes in chandeliers. Not only will the professional cleaners be
                            able to take apart and reassemble your chandelier safely, they will also be able to give it that extra sparkle. It is
                            a big job so if you don't have the time or skills, a professional pays for themselves. Check out cleaning
                            companies in your area which can help you and schedule a visit every few months or so.
                          </p>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2 text-black">5. Regular Maintenance</h5>
                          <p className="text-gray-700">
                            Cleaning is only one aspect of keeping your chandelier looking good. You also need to make sure it is working
                            properly and being put together correctly. Again, you can either pick this up yourself by looking for some online guides
                            or YouTube videos or hire a professional who knows how to maintain chandeliers. If you have an antique or a
                            particularly large chandelier then this will be even more important. There are companies which specialize in
                            restoring antique chandeliers which have lost their shine. Even smaller modern chandeliers will need some
                            maintenance every once in a while to keep them functional. Many companies will be able to clean and fix up
                            your chandelier on the same visit, saving you both time and money. Don't forget to clean and change the
                            light bulbs regularly as well.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-700">
                            Taking care of your chandelier can seem like a daunting task at first, but it is well worth it when you see how
                            shiny and nice looking your chandelier will become. Whether you do it yourself or hire a professional,
                            making regular chandelier cleaning, maintenance, and restoration a part of your cleaning routine along
                            with weekly dusting will ensure your chandelier will always impress and make your home look good.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          </div>
        </div>
      </div>

        
       {/* Chat Modal */}
      {isChatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* No backdrop here, just the modal */}
          <div
            className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button overlay */}
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="absolute -top-10 -right-10 md:top-4 md:right-4 z-10 p-2 text-white hover:text-gray-200 transition-colors"
            >
              <Icon icon="mdi:close" width={24} height={24} />
            </button>
            {/* Chat component */}
            <div className="h-full">
              <ChatNow onClose={() => setIsChatModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Product Ratings */}
      <div className="mt-12 max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold text-black mb-6">PRODUCT RATINGS & REVIEWS</h3>

        {/* Ratings Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Overall Rating */}
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <h4 className="text-4xl font-bold text-black">4.5</h4>
                  <div className="flex items-center justify-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Icon key={i} icon="mdi:star" className={`w-5 h-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">Based on 7.3K reviews</p>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${(rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2)}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12">
                      {rating === 5 ? '70%' : rating === 4 ? '20%' : rating === 3 ? '5%' : rating === 2 ? '3%' : '2%'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Review Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="px-4 py-2 bg-red-600 text-white rounded-full text-sm font-medium hover:bg-red-700 transition-colors">
            All Reviews
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            With Photos
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
            Verified Purchase
          </button>
        </div>

        {/* Review Cards */}
        <div className="space-y-6">
          {/* Review Card 1 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="qlementine-icons:user-16" className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-black">John D.</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} icon="mdi:star" className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">2025-03-14</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Verified Purchase</span>
                </div>

                {/* Review Images */}
                <div className="flex gap-2 my-3">
                  <img 
                    src="aber.webp" 
                    alt="Review" 
                    className="w-20 h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 cursor-pointer"
                  />
                  <img 
                    src="aber2.webp" 
                    alt="Review" 
                    className="w-20 h-20 object-cover rounded-md border border-gray-200 hover:opacity-90 cursor-pointer"
                  />
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-3">
                  The chandelier exceeded my expectations! The quality is outstanding and it looks even better in person. The installation was smooth and the customer service was excellent.
                </p>

                {/* Review Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Performance</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durability</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Good</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quality</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                </div>

                {/* Review Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:thumb-up-outline" className="h-5 w-5" />
                    <span>123</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:comment-outline" className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:share-variant" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Review Card 2 */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* User Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Icon icon="qlementine-icons:user-16" className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-black">Sarah M.</p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Icon key={i} icon="mdi:star" className={`w-4 h-4 ${i < 5 ? 'text-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">2025-03-13</span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Verified Purchase</span>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 mb-3">
                  Absolutely stunning piece! The craftsmanship is impeccable and it adds such elegance to our living room. The LED lights are bright but not harsh, creating the perfect ambiance.
                </p>

                {/* Review Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Performance</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durability</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Quality</p>
                    <div className="flex items-center gap-1">
                      <Icon icon="mdi:star" className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                </div>

                {/* Review Actions */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:thumb-up-outline" className="h-5 w-5" />
                    <span>89</span>
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:comment-outline" className="h-5 w-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700">
                    <Icon icon="mdi:share-variant" className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Load More Button */}
        <div className="text-center mt-8">
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
            Load More Reviews
          </button>
        </div>
      </div>
        
     
    </div>
  );
};

export default ItemDescription;