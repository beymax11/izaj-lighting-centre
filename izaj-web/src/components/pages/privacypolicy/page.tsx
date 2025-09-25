"use client";

import { useState } from 'react';

const PrivacyPolicy = () => {

    const [email, setEmail] = useState('');
  
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <main className="flex-grow bg:white w-full">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Statement</h1>
            <section className="prose prose-gray max-w-none text-gray-800 text-left">
              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 1 - WHAT DO WE DO WITH YOUR INFORMATION?</h2>
              <p className="mb-4">When you purchase something from our store, as part of the buying and selling process, we collect the personal information you give us such as your name, address and email address.</p>
              <p className="mb-4">When you browse our store, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
              <p className="mb-4">Email marketing (if applicable): With your permission, we may send you emails about our store, new products and other updates.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 2 - CONSENT</h2>
              <h3 className="text-xl font-semibold mt-4 mb-2">How do you get my consent?</h3>
              <p className="mb-4">When you provide us with personal information to complete a transaction, verify your credit card, place an order, arrange for a delivery or return a purchase, we imply that you consent to our collecting it and using it for that specific reason only.</p>
              <p className="mb-4">If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to say no.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">How do I withdraw my consent?</h3>
              <p className="mb-4">If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at anytime, by contacting us at izajph@gmail.com</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 3 - DISCLOSURE</h2>
              <p className="mb-4">We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 4 - SHOPIFY</h2>
              <p className="mb-4">Our store is hosted on Shopify Inc. They provide us with the online e-commerce platform that allows us to sell our products and services to you.</p>
              <p className="mb-4">Your data is stored through Shopify's data storage, databases and the general Shopify application. They store your data on a secure server behind a firewall.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Payment:</h3>
              <p className="mb-4">If you choose a direct payment gateway to complete your purchase, then Shopify stores your credit card data. It is encrypted through the Payment Card Industry Data Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as is necessary to complete your purchase transaction. After that is complete, your purchase transaction information is deleted.</p>
              <p className="mb-4">All direct payment gateways adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover.</p>
              <p className="mb-4">PCI-DSS requirements help ensure the secure handling of credit card information by our store and its service providers.</p>
              <p className="mb-4">For more insight, you may also want to read Shopify's <a href="https://www.shopify.com/legal/terms" className="text-blue-600 hover:underline">Terms of Service</a> or <a href="https://www.shopify.com/legal/privacy" className="text-blue-600 hover:underline">Privacy Statement</a>.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 5 - THIRD-PARTY SERVICES</h2>
              <p className="mb-4">In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us.</p>
              <p className="mb-4">However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
              <p className="mb-4">For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled by these providers.</p>
              <p className="mb-4">In particular, remember that certain providers may be located in or have facilities that are located a different jurisdiction than either you or us. So if you elect to proceed with a transaction that involves the services of a third-party service provider, then your information may become subject to the laws of the jurisdiction(s) in which that service provider or its facilities are located.</p>
              <p className="mb-4">As an example, if you are located in Canada and your transaction is processed by a payment gateway located in the United States, then your personal information used in completing that transaction may be subject to disclosure under United States legislation, including the Patriot Act.</p>
              <p className="mb-4">Once you leave our store's website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.</p>

              <h3 className="text-xl font-semibold mt-4 mb-2">Links</h3>
              <p className="mb-4">When you click on links on our store, they may direct you away from our site. We are not responsible for the privacy practices of other sites and encourage you to read their privacy statements.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 6 - SECURITY</h2>
              <p className="mb-4">To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
              <p className="mb-4">If you provide us with your credit card information, the information is encrypted using secure socket layer technology (SSL) and stored with a AES-256 encryption. Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all PCI-DSS requirements and implement additional generally accepted industry standards.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 7 - COOKIES</h2>
              <p className="mb-4">Here is a list of cookies that we use. We've listed them here so you that you can choose if you want to opt-out of cookies or not.</p>
              <ul className="list-disc pl-6 mb-4">
                <li>_session_id, unique token, sessional, Allows Shopify to store information about your session (referrer, landing page, etc).</li>
                <li>_shopify_visit, no data held, Persistent for 30 minutes from the last visit, Used by our website provider's internal stats tracker to record the number of visits</li>
                <li>_shopify_uniq, no data held, expires midnight (relative to the visitor) of the next day, Counts the number of visits to a store by a single customer.</li>
                <li>cart, unique token, persistent for 2 weeks, Stores information about the contents of your cart.</li>
                <li>_secure_session_id, unique token, sessional</li>
                <li>storefront_digest, unique token, indefinite If the shop has a password, this is used to determine if the current visitor has access.</li>
              </ul>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 8 - AGE OF CONSENT</h2>
              <p className="mb-4">By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">SECTION 9 - CHANGES TO THIS PRIVACY POLICY</h2>
              <p className="mb-4">We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
              <p className="mb-4">If our store is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to sell products to you.</p>

              <h2 className="text-xl font-bold mt-8 mb-4">QUESTIONS AND CONTACT INFORMATION</h2>
              <p className="mb-4">If you would like to: access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information contact our Privacy Compliance Officer at izajph@gmail.com or by mail at</p>
              <p className="mb-4">
                Izaj Lighting Centre<br />
                [Re: Privacy Compliance Officer]
              </p>
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
  
  export default PrivacyPolicy;
  

