"use client";

import { useState } from 'react';

import { FiMail, FiCheck } from 'react-icons/fi';

export default function Subscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // TODO: Implement your subscription logic here
      // Example: await subscribeToNewsletter(email);
      setStatus('success');
      setEmail('');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <>
     

      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Stay Updated with IZAJ
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Subscribe to our newsletter for exclusive offers, new arrivals, and style tips.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:ring-black focus:border-black"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text:white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>

              {status === 'success' && (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <FiCheck className="h-5 w-5 text-green-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Successfully subscribed! Thank you for joining us.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {status === 'error' && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">
                        Something went wrong. Please try again later.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex items-center justify:center h-12 w-12 rounded-md bg-black text-white mx-auto">
                <FiMail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Exclusive Offers</h3>
              <p className="mt-2 text-base text-gray-500">
                Be the first to know about our special promotions and discounts.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify:center h-12 w-12 rounded-md bg-black text-white mx-auto">
                <FiMail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">New Arrivals</h3>
              <p className="mt-2 text-base text-gray-500">
                Get notified when we launch new products and collections.
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify:center h-12 w-12 rounded-md bg-black text-white mx-auto">
                <FiMail className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Style Tips</h3>
              <p className="mt-2 text-base text-gray-500">
                Receive fashion advice and styling inspiration from our experts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

