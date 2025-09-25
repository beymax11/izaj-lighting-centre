"use client";

import { useState } from 'react';

const Return = () => {

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
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>
            <section className="prose prose-gray max-w-none text-gray-800 text-left">
              <p className="text-lg mb-6">
                Placed an order but changed your mind? No worries! You can cancel your order within 7 days of placing your order. 
                Your payment will be used as store credit and should be used within 60 days. Unfortunately, after you have received 
                an email saying that "Your order is on its way!", delivery costs will be non-refundable and there is a pick-up fee 
                at 10% of the price you paid for the item. As such, you will be refunded the following amount:
              </p>

              <div className=" p-6 rounded-lg mb-8">
                <p className="font-semibold">Refunded Amount = Final Paid Price - Delivery Fee - Pick-Up Fee - 10% of Final Paid Price.</p>
                <p className="mt-2">This is because the item would already be on its way to you and we will no longer be able to make amendments.</p>
              </div>

              <h2 className="text-2xl font-bold mt-12 mb-6">Store Credit Policy</h2>
              <h2 className="text-2xl font-bold mt-12 mb-6">Returns</h2>
              <p className="mb-4">Our policy lasts 7 days. If 7 days have gone by since your purchase, unfortunately we can't offer you a refund or exchange.</p>
              
              <p className="mb-4">To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.</p>
              
              <p className="mb-4">To complete your return, we require a receipt or proof of purchase.</p>
              
              <p className="mb-4">There are certain situations where only partial store credits are granted (if applicable):</p>
              
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Any item not in its original condition, is damaged or missing parts for reasons not due to our error - 100% of final paid price will be charged.</li>
                <li>Any item that is returned more than 30 days after delivery - 50% of final paid price will be charged.</li>
                <li>If the item has been opened, tampered, or installed already - 50% of final paid price will be charged.</li>
              </ul>

              <h2 className="text-2xl font-bold mt-12 mb-6">Refunds (if applicable)</h2>
              <p className="mb-4">Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.</p>
              <p className="mb-4">If you are approved, then your store credit will be processed.</p>

              <h2 className="text-2xl font-bold mt-12 mb-6">Sale items (if applicable)</h2>
              <p className="mb-4">Only regular priced items may be refunded, unfortunately sale items cannot be refunded.</p>

              <h2 className="text-2xl font-bold mt-12 mb-6">Exchanges (if applicable)</h2>
              <p className="mb-4">We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at izajph@gmail.com</p>

              <h2 className="text-2xl font-bold mt-12 mb-6">Gifts / Bridal Registry</h2>
              <p className="mb-4">If the item was marked as a gift when purchased and shipped directly to you, you'll receive a gift credit for the value of your return. Once the returned item is received, a gift certificate will be mailed to you.</p>
              <p className="mb-4">If the item wasn't marked as a gift when purchased, or the gift giver had the order shipped to themselves to give to you later, we will send a refund to the gift giver and he will find out about your return.</p>

              <h2 className="text-2xl font-bold mt-12 mb-6">Shipping</h2>
              <p className="mb-4">You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.</p>
              <p className="mb-4">Depending on where you live, the time it may take for your exchanged product to reach you, may vary.</p>
              <p className="mb-4">If you are shipping an item over Php4000, you should consider using a trackable shipping service or purchasing shipping insurance. We don't guarantee that we will receive your returned item.</p>
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
  
  export default Return;
  

