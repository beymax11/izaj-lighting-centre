"use client";

import { useState } from 'react';

const Warranty = () => {
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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">WARRANTY TERMS</h1>
            <section className="prose prose-gray max-w-none text-gray-800 text-left">
              <h2 className="text-xl font-bold mt-8 mb-4">Limited Warranty</h2>
              <p className="mb-4">IZAJ warrants all of its products that they are to be free from defects in material and workmanship for a period of ONE (1) year from the date of shipment, unless otherwise stated below.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">IZAJ's Limited Warranty does not apply if:</h2>
              <ul className="list-disc pl-6 mb-4">
                <li>The original bill of sale, delivery date, or product number cannot be verified</li>
                <li>The parts claimed to be defective are not returned for inspection if so requested by IZAJ</li>
                <li>The product is not in possession of the original end use purchaser.</li>
                <li>Warranty does not apply: (i) used in Commercial Applications or 24 hour use, unless otherwise granted by IZAJ (ii) used for purposes for which they are not designed or intended (iii) damaged by abuse, misuse, accident, modifications, alterations, neglect or mishandling (iv) improperly installed, stored, maintained, or operated (v) used in violation of written instructions by IZAJ.</li>
                <li>Additionally this warranty does not cover scratches, abrasions, or deterioration due to the use of paints, solvents, chemicals or abrasive cleaning techniques.</li>
                <li>With regard to outdoor lighting products, such products will weather over time, adding to their character and modifying their appearance. Differences in grain, character and color, and product weathering are naturally occurring variations and not within the control of IZAJ nor considered defects under this limited warranty.</li>
              </ul>

              <p className="mb-4">To obtain warranty service contact IZAJ either by writing us an email or contacting us at +63 2 500 3729.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">DISCLAIMER OF IMPLIED WARRANTY</h2>
              <p className="mb-4">IMPLIED WARRANTIES INCLUDING THAT OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE EXPRESSLY LIMITED IN DURATION TO THE DURATION OF THIS WARRANTY. IZAJ AND/OR SELLER DISCLAIMS ANY LIABILITY FOR SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES.</p>

              <p className="mb-4">Some states/provinces do not allow limitations on how long an implied warranty lasts, or the exclusion or limitation of special, incidental or consequential damages, so these limitations and exclusions may not apply to you. This warranty gives you specific legal rights. You may also have other rights which vary from state/province to state/province.</p>
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
  
  export default Warranty;
  

