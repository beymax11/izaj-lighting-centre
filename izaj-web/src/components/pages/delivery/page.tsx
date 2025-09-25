"use client";

import { useState } from 'react';

const Delivery = () => {

    const [email, setEmail] = useState('');
  
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <main className="flex-grow bg-white w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Delivery and Installation</h1>
            <section className="prose prose-gray max-w-none text-gray-800">
              <p className="text-lg mb-6">To ensure quality service, please read our Delivery and Installation guidelines:</p>
              
              <div className="p-6 rounded-lg mb-8">
                <ul className="list-none space-y-4">
                  <li className="flex items-start justify-center">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Free Delivery:</strong> Orders Php10,000 and above* (within San Pablo City only)</span>
                  </li>
                  <li className="flex items-start justify-center">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Free installation:</strong> Orders Php10,000 and above* (within San Pablo City only) Installation should be done on the same day of Delivery.</span>
                  </li>
                  <li className="flex items-start justify-center">
                    <span className="text-gray-600 mr-2">•</span>
                    <span><strong>Regular Installation Fee</strong> – Php 900.00/pc*</span>
                  </li>
                  <li className="flex items-start justify-center text-sm italic">
                    <span className="text-gray-600 mr-2">•</span>
                    <span>*Installations are applicable to lighting fixtures only.</span>
                  </li>
                </ul>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Added notes on Delivery & Installation:</h2>
              <ol className="list-decimal pl-6 space-y-4 text-left">
                <li>The customer shall be responsible to ensure that either he/she personally or a valid representative will receive the products and approve of its condition before the delivery team leaves. Damaged products should be pointed out to the delivery team upon delivery so a replacement may be scheduled.</li>
                <li>The customer should apply for all necessary gate passes, working and other permits needed for the delivery day.</li>
                <li>If the customer is not available to receive the delivery at the agreed day, new delivery will be scheduled with a corresponding delivery fee.</li>
                <li>Kindly check the condition of goods before signing receipt before the delivery team leaves as warranties are not indulged in our offers.</li>
                <li>For installation, the customer shall be responsible in ensuring that the ceiling are fit for installations. Gypsum boards without support are not fit for big fixture installation.</li>
              </ol>
            </section>
          </div>
        </main>
        {/* Subscription Section */}
<section className="bg-black py-20 px-6 w-full">
  <div className="w-full max-w-[100vw] mx-auto text-center">
    <h2 className="text-4xl font-bold mb-4 text-white leading-tight">
      Join Our Lighting Community
    </h2>
    <p className="text-gray-300 mb-8 text-lg">
      Get exclusive access to new collections, special offers, and lighting design tips.
    </p>
    <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
      <div className="relative flex-grow max-w-md">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-800 w-full placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {email && !email.includes('@') && (
          <p className="absolute -bottom-6 left-4 text-red-400 text-sm">Please enter a valid email address</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-orange-400 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-orange-400 min-w-[180px]"
      >
        Subscribe Now
      </button>
    </form>
    <p className="text-sm text-gray-400 mt-8 italic">Join 10,000+ lighting enthusiasts. Unsubscribe anytime.</p>
  </div>
</section>
      </div>
    );
  };
  
  export default Delivery;
  

