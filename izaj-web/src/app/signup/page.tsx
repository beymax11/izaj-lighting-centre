"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    confirmPassword: '',
    province: '',
    city: '',
    barangay: '',
    address: '',
    agreeToPrivacy: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();
  
  // Add error handling for UserContext
  let register;
  try {
    const userContext = useUserContext();
    register = userContext.register;
  } catch (error) {
    console.error('UserContext error:', error);
    // Fallback to direct API call if UserContext fails
    register = async (userData: any) => {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: `${userData.firstName} ${userData.lastName}`.trim(),
          phone: userData.phone,
        }),
      });
      
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Signup failed');
      }
    };
  }

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber || undefined
      });
      router.push('/');
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ general: (error as Error).message || 'Registration failed.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
     

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Section - Title */}
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-black leading-tight tracking-tight">
              Create an IZAJ account
            </h1>
            <p className="text-lg text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => router.push('/login')}
                className="text-black hover:underline font-medium"
              >
                Log in here
              </button>
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white max-w-lg">
            <p className="text-black text-base mb-8 leading-relaxed font-bold">
              From your profile, you will find all information connected to your account. And it's free to join!
            </p>

            {errors.general && (
              <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.firstName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.lastName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Phone number (optional)</label>
                <div className="flex">
                  <select className="px-4 py-4 text-base border-2 border-gray-300 border-r-0 bg-white text-black focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none">
                    <option value="+63">PH (+63)</option>
                  </select>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={`flex-1 px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  ref={emailInputRef}
                  className={`w-full px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                  placeholder="Enter password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Add Home Address Section */}
              <div 
                className="space-y-4 p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setShowAddressForm(!showAddressForm)}
              >
                <div>
                  <label className="block text-sm font-bold text-black">Add home address (optional)</label>
                </div>
                
                <p className="text-sm text-gray-600">
                  We'll remember your information for a quick and easy checkout experience
                </p>

                {showAddressForm && (
                  <div 
                    className="space-y-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Province */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-black">Province</label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleSelectChange}
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                      >
                        <option value="">Select Province</option>
                        <option value="Metro Manila">Metro Manila</option>
                        <option value="Cebu">Cebu</option>
                        <option value="Davao">Davao</option>
                        <option value="Laguna">Laguna</option>
                        <option value="Cavite">Cavite</option>
                        <option value="Rizal">Rizal</option>
                        <option value="Bulacan">Bulacan</option>
                        <option value="Pampanga">Pampanga</option>
                        <option value="Batangas">Batangas</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-black">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                        placeholder="Enter your city"
                      />
                    </div>

                    {/* Barangay */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-black">Barangay</label>
                      <input
                        type="text"
                        name="barangay"
                        value={formData.barangay}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                        placeholder="Enter your barangay"
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-black">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 text-base border-2 border-gray-300 bg-white text-black placeholder-gray-400 focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none"
                        placeholder="Enter your street address"
                      />
                    </div>

                  </div>
                )}
              </div>

              {/* Privacy Policy */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="agreeToPrivacy"
                  checked={formData.agreeToPrivacy}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToPrivacy: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <div className="text-sm text-gray-600">
                  By creating an account, you agree to our{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/static/privacypolicy')}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Privacy Policy
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-4 px-6 text-base font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 rounded-none"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin mr-3" />
                    <span>Creating account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
