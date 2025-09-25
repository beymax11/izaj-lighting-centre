"use client";

import { useState } from 'react';

const Career = () => {

    const [email, setEmail] = useState('');
  
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };

    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow bg-white">
          <div className="max-w-4xl px-4 sm:px-8 md:px-12 py-12 mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Be a part of our team!</h1>
            <section className="prose prose-gray max-w-none text-gray-800 mx-auto">
              <p className="mb-4">We have everything we need to become the most talked about store in the country.</p>

              <p className="mb-4">Except you.</p>

              <p className="mb-4">We have the best-designed collection of quality lighting fixture and home furnishing in the retail industry. We have unique products made for modern living that are beautifully made; we have beautiful catalogs and buzzing social media presence, high quality service and enduring relationships with our customers.</p>

              <p className="mb-4">And right now, we have something else.<br />
              An opportunity for you.</p>

              <p className="mb-4">Feel free to submit your resume at<br />
              izajhr@gmail.com</p>
            </section>
          </div>
        </main>
      {/* Subscription Section */}
<section className="bg-black py-20 px-6">
  <div className="max-w-7xl mx-auto text-center">
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
  
  export default Career;
  