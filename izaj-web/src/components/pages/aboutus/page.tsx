"use client";
import React, { useState } from 'react';




const AboutUs: React.FC = () => {
 
    const [email, setEmail] = useState('');
  
      
    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle subscription logic here
        alert(`Thank you for subscribing with ${email}!`);
        setEmail('');
    };

   

 return (
     <div className="flex flex-col min-h-screen">
     

     {/* Main Content  */}
<main className="flex-grow py-16">
  <article className="relative max-w-7xl mx-auto px-8 py-14 md:py-20 md:px-20 prose prose-lg prose-gray text-gray-800 text-center">
    {/* Decorative vertical line for article feel */}
    <div className="hidden md:block absolute left-0 top-10 bottom-10 w-1 bg-gradient-to-b from-orange-400/30 via-gray-200 to-orange-400/30 rounded-full pointer-events-none"></div>
    <header>
      <h1 className="text-4xl font-bold mb-6 tracking-tight text-gray-900 text-center">
        ABOUT US
      </h1>
    </header>
    <section>
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">Our Story</h2>
      <p>
        At <span className="font-semibold text-black">Izaj Lightning Centre</span>, we don't just sell chandeliers—we create breathtaking lighting experiences that transform spaces into works of art. From classic crystal masterpieces to modern, statement-making designs, our chandeliers bring elegance, sophistication, and brilliance to every home and business.
      </p>
      <p>
        What started as a single store fueled by a passion for luxury lighting has now grown into seven branches, each dedicated to offering the finest selection of chandeliers. Our journey has been built on craftsmanship, innovation, and a deep understanding of what makes a space truly shine.
      </p>
      <p>
        At Izaj Lightning Centre, we believe the right chandelier does more than illuminate—it tells a story, sets a mood, and adds timeless beauty. Whether you're looking for a grand centerpiece or a contemporary lighting solution, our expert team is here to guide you in finding the perfect piece for your space.
      </p>
      <p>
        Visit us today and let us light up your world with brilliance and style.
      </p>
    </section>

    {/* New Content: Our Values */}
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Values</h2>
     
        <li>
          <span className="font-semibold text-black">Quality First:</span> We source only the best materials and partner with trusted manufacturers to ensure every product meets our high standards.
        </li>
        <li>
          <span className="font-semibold text-black">Customer-Centric:</span> Your satisfaction is our top priority. Our support team is always ready to assist you before, during, and after your purchase.
        </li>
        <li>
          <span className="font-semibold text-black">Innovation:</span> We stay ahead of trends and technology to bring you the latest in lighting design and smart home integration.
        </li>
        <li>
          <span className="font-semibold text-black">Sustainability:</span> We are committed to offering energy-efficient and eco-friendly lighting solutions.
        </li>
      
    </section>

    {/* New Content: Why Shop With Us */}
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Shop With Us?</h2>
     
        <li>
          <span className="font-semibold text-black">Wide Selection:</span> From timeless classics to modern masterpieces, find lighting for every style and budget.
        </li>
        <li>
          <span className="font-semibold text-black">Expert Advice:</span> Our lighting specialists are available to help you choose the perfect fixture for your space.
        </li>
        <li>
          <span className="font-semibold text-black">Fast & Reliable Delivery:</span> Enjoy quick shipping and professional installation services within Metro Manila and beyond.
        </li>
        <li>
          <span className="font-semibold text-black">Secure Shopping:</span> Shop with confidence using our safe and secure payment options.
        </li>
        <li>
          <span className="font-semibold text-black">After-Sales Support:</span> We offer warranty and hassle-free returns for your peace of mind.
        </li>
      
    </section>

    {/* New Content: Meet Our Team */}
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
      <p>
        Our passionate team is made up of lighting designers, customer service professionals, and installation experts. We work together to ensure every customer receives personalized service and the best lighting solutions for their needs.
      </p>
      <div className="flex flex-wrap gap-8 mt-6 justify-center">
        <div className="flex flex-col items-center">
          <img src="/team1.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-orange-200" />
          <span className="font-semibold">Anna Cruz</span>
          <span className="text-sm text-gray-500">Lighting Designer</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/team2.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-orange-200" />
          <span className="font-semibold">Mark Santos</span>
          <span className="text-sm text-gray-500">Customer Support</span>
        </div>
        <div className="flex flex-col items-center">
          <img src="/team3.jpg" alt="Team Member" className="w-24 h-24 rounded-full object-cover mb-2 border-2 border-orange-200" />
          <span className="font-semibold">Liza Tan</span>
          <span className="text-sm text-gray-500">Installation Lead</span>
        </div>
      </div>
    </section>

    {/* Vision Section */}
    <section className="flex flex-col md:flex-row items-center gap-10 mt-16">
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="/aber.webp"
          alt="Vision"
          className="rounded-xl shadow-lg w-full max-w-xs object-cover border-4 border-orange-100"
          style={{ minHeight: 220, minWidth: 220, background: "#eee" }}
        />
      </div>
      <div className="md:w-1/2 w-full text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
        <p>
          To be the Philippines' most trusted and innovative lighting provider, illuminating every home and business with elegance, quality, and inspiration. We envision a future where every space shines with beauty and purpose, powered by our passion for exceptional lighting solutions.
        </p>
      </div>
    </section>

    {/* Mission Section */}
    <section className="flex flex-col md:flex-row-reverse items-center gap-10 mt-16">
      <div className="md:w-1/2 w-full flex justify-center">
        <img
          src="/aber2.webp"
          alt="Mission"
          className="rounded-xl shadow-lg w-full max-w-xs object-cover border-4 border-orange-100"
          style={{ minHeight: 220, minWidth: 220, background: "#eee" }}
        />
      </div>
      <div className="md:w-1/2 w-full text-left">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
        <p>
          To deliver world-class lighting products and services that exceed customer expectations. We are committed to continuous innovation, outstanding customer care, and empowering our clients to create spaces that reflect their unique style and vision.
        </p>
      </div>
    </section>

    {/* New Content: Customer Testimonials */}
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-orange-50 rounded-xl p-6 shadow">
          <p className="italic text-gray-700">"The chandelier I bought from Izaj transformed my living room. The quality and service were outstanding!"</p>
          <div className="mt-4 flex items-center">
            <img src="/customer1.jpg" alt="Customer" className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-orange-200" />
            <span className="font-semibold">Maria G.</span>
          </div>
        </div>
        <div className="bg-orange-50 rounded-xl p-6 shadow">
          <p className="italic text-gray-700">"Fast delivery and the installation team was very professional. Highly recommended!"</p>
          <div className="mt-4 flex items-center">
            <img src="/customer2.jpg" alt="Customer" className="w-10 h-10 rounded-full object-cover mr-3 border-2 border-orange-200" />
            <span className="font-semibold">James R.</span>
          </div>
        </div>
      </div>
    </section>

    {/* New Content: Our Partners */}
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Partners</h2>
      <div className="flex flex-wrap gap-8 items-center justify-center">
        <img src="/partner1.png" alt="Partner 1" className="h-12 object-contain" />
        <img src="/partner2.png" alt="Partner 2" className="h-12 object-contain" />
        <img src="/partner3.png" alt="Partner 3" className="h-12 object-contain" />
        <img src="/partner4.png" alt="Partner 4" className="h-12 object-contain" />
      </div>
    </section>
  </article>
</main>

{/* Subscription Section */}
<section className="bg-black py-20 px-6">
  <div className="max-w-4xl mx-auto text-center">
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

export default AboutUs; 