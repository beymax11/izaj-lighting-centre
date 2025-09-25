"use client";

import React, { useState } from 'react';



const CookiePolicy: React.FC = () => {


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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">IZAJ Cookie Policy</h1>
          <div className="space-y-8 text-gray-700 text-base text-left">
            <p><strong>Izaj (Philippines), Inc.</strong> ("us", "we", "our") uses cookies on <strong><a href="http://www.izaj.ph" className="text-orange-500 hover:underline">www.izaj.ph</a></strong> (the "Website") to improve our service to you. Some cookies we use are essential for some services on the Website to work; others are used to collect information (statistics) of your use of the Website so that we can make the Website more convenient and useful for you. Some cookies are temporary and will disappear when you close your browser; others are persistent and will stay on your computer for some time. We are also using some local cookies that are tied to local campaigns and which will disappear when the campaign ends.</p>

            <p>Some of the cookies are strictly necessary for the functionality of the Website while others are used to enhance the performance of the Website and your user experience.</p>

            <p><strong>Strictly necessary cookies</strong> are used to:</p>
            <ul className="list-disc pl-6">
              <li>Remember what is in your shopping cart</li>
              <li>Remember how far you are through an order</li>
            </ul>

            <p><strong>Functional cookies</strong> are used to:</p>
            <ul className="list-disc pl-6">
              <li>Remember your log-in details</li>
              <li>Make sure you are secure when logged in</li>
              <li>Make sure that the Website looks consistent</li>
              <li>Offer live chat support</li>
            </ul>

            <p><strong>Performance cookies</strong> are used to:</p>
            <ul className="list-disc pl-6">
              <li>Enhance the performance of the Website</li>
              <li>Enhance the user experience</li>
            </ul>

            <p><strong>Targeting cookies</strong> are used to:</p>
            <ul className="list-disc pl-6">
              <li>Allow you to share and like information that is made available on the Website</li>
              <li>Send information to other websites to customize their advertisement</li>
              <li>Send reminder emails of your shopping cart</li>
            </ul>

            <p>The cookies are used to improve services for you through, for example:</p>
            <ul className="list-disc pl-6">
              <li>Enabling the functionality of some services like payment, which will not work without those cookies</li>
              <li>Enabling the Website to recognize your device so you don't have to give the same information several times during a single session</li>
              <li>Recognizing that you may already have given a username and password when logged in to your account so you don't need to do it for every webpage that you request on the Website</li>
              <li>Measuring how many people are using the Website, so that it can be made easier to use and so that we can ensure that there is enough capacity to ensure that it is fast</li>
              <li>Analyzing data to help us understand how you use the Website so we can improve it</li>
            </ul>

            <p>If you choose not to use cookies during your visit to the Website, you should be aware that certain functions and pages will not work as expected. For example, you will not be able to use the shopping list feature and we will not be able to notify you of products that you may be interested in, based on your previous shopping experiences.</p>

            <p>If you want to delete any cookies already on your computer, please refer to your browser vendor's instructions by clicking "Help" in your browser menu.</p>

            <p>You can also find out more about cookies and how to delete and control them on <strong><a href="http://www.aboutcookies.org" className="text-orange-500 hover:underline">www.aboutcookies.org</a></strong> or click "Help" in your browser menu.</p>
          </div>
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

export default CookiePolicy;