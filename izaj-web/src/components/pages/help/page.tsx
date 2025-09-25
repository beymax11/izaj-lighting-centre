"use client";

import { useState } from 'react';

const Help = () => {

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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">FAQs</h1>
            <section className="prose prose-gray max-w-none text-gray-800 text-left">
              <h2 className="text-xl font-bold mt-8 mb-4">HOW DO WE GO ABOUT FREE DELIVERY & INSTALLATION?</h2>
              <p className="mb-4">Our items are inclusive of FREE delivery and installation within San Pablo City only. Orders should reach an amount of Php10,000 to avail our free delivery and installation services.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">I LIVE IN THE PROVINCE, HOW CAN I HAVE MY ORDER DELIVERED?</h2>
              <p className="mb-4">For provincial addresses, we have our partner couriers ship the items to you and you may opt to pay for the SHIPPING FEE upon delivery. We crate the items for free if your order reaches Php 10,000.00 and above.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">WHAT ARE YOUR PAYMENT OPTIONS?</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>Paypal </li>
                <li>Maya</li>
                <li>GCASH</li>
              </ul>
              <p className="mb-4">*we encourage cashless payments for the safety and security and everyone, if you were asked to pay in CASH, please contact us immediately through our email.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">CAN I HAVE THE ITEM PICKED UP INSTEAD?</h2>
              <p className="mb-4">Yes - you can pick up your items at our warehouse from Mondays to Saturdays (9:00am to 5:00pm). For weekend pickups, please inform us a day ahead.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">THE ITEM I WANT IS NOT AVAILABLE.</h2>
              <p className="mb-4">Don't worry! Most of our items are replenished every 30-60days.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">DO YOU ACCEPT PRE-ORDERS?</h2>
              <p className="mb-4">Yes we do. Please send us e-mail photo of item and we can quote you the price and lead time of arrival. We only require 50% down payment for the reservation of your item.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">I'M NOT SURE IF THE LIGHTING FIXTURE WILL FIT MY SPACE, HELP?</h2>
              <p className="mb-4">No sweat! We have licensed interior designers to assist you for free! Just leave us a message or email and we will help you decide which one works for you!</p>

              <h2 className="text-xl font-bold mt-8 mb-4">ARE YOU OPEN FOR COLLABORATION?</h2>
              <p className="mb-4">We are open for anything! just leave us an email at izajph@gmail.com</p>
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
  
  export default Help;
  

