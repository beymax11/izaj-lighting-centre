"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '../../context/UserContext';

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  
  const { login } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const isPhoneLike = (raw: string) => {
    if (!raw) return false;
    const v = raw.trim();
    // Only digits and common phone symbols => treat as phone-like
    return /^[+\d\s\-()]+$/.test(v);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Live auto-format for phone when logging in (identifier field)
    if (name === 'email' && isPhoneLike(value)) {
      const formatted = formatAsPhoneDigitsLive(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Live formatter: keep only local PH mobile digits (no +63 in value)
  const formatAsPhoneDigitsLive = (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return '';
    const digits = trimmed.replace(/\D/g, '');
    if (!digits) return '';
    let local = digits;
    // If starts with country code 63 and has at least 12 chars (63 + 10 digits)
    if (digits.startsWith('63') && digits.length >= 12) {
      local = digits.slice(2);
    } else if (digits.startsWith('0') && digits.length >= 11) {
      // Only strip leading 0 when there are 11 digits (0 + 10 digits)
      local = digits.slice(1);
    } else {
      local = digits;
    }
    // Ensure starts with 9 if possible
    if (local.startsWith('9')) {
      return local.slice(0, 10);
    }
    // If user typing partial, just cap length to 10
    return local.slice(0, 10);
  };

  const isPhoneMode = isPhoneLike(formData.email);

  const handleIdentifierBlur = () => {
    const value = (formData.email || '').trim();
    if (!value || !isPhoneLike(value)) return; // treat as email if not phone-like
    const normalized = formatAsPhoneDigitsLive(value);
    if (normalized !== value) {
      setFormData(prev => ({ ...prev, email: normalized }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email or phone is required';
    } else {
      const emailOk = /\S+@\S+\.\S+/.test(formData.email);
      const digits = formData.email.replace(/\D/g, '');
      const phoneOk = /^\d{10,15}$/.test(digits);
      if (!emailOk && !phoneOk) {
        newErrors.email = 'Enter a valid email or phone';
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
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
      await login(formData.email, formData.password);
      router.push('/');
    } catch (error) {
      console.error('Authentication error:', error);
      setErrors({ general: (error as Error).message || 'Authentication failed.' });
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
            <h1 className="text-4xl font-bold text-black leading-tight">
              Log in to your account
            </h1>
            <p className="text-lg text-gray-600">
              New at IZAJ?{' '}
              <button
                onClick={() => router.push('/signup')}
                className="text-black hover:underline font-medium"
              >
                Create an account here
              </button>
            </p>
          </div>

          {/* Right Section - Form */}
          <div className="bg-white max-w-lg">
            <p className="text-black text-base mb-8 leading-relaxed font-bold">
              Get a more personalized experience where you don't need to fill in your information every time.
            </p>

            {errors.general && (
              <div className="mb-6 text-sm text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Email or Phone</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    {isPhoneMode ? (
                      <span className="text-gray-600 text-sm font-medium">+63</span>
                    ) : (
                      <Icon icon="mdi:email" className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    onBlur={handleIdentifierBlur}
                    ref={emailInputRef}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-help' : undefined}
                    className={`w-full ${isPhoneMode ? 'pl-16' : 'pl-12'} pr-4 py-4 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                    placeholder={isPhoneMode ? '9XXXXXXXXXX' : 'Enter your email or phone'}
                  />
                  {errors.email && (
                    <p id="email-help" className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-black">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-4 pr-12 text-base border-2 bg-white text-black placeholder-gray-400 ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 rounded-none`}
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-gray-50 transition-colors"
                  >
                    <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="w-5 h-5 text-gray-500" />
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="text-sm">
                <button 
                  type="button" 
                  onClick={() => router.push('/forgot-password')} 
                  className="text-black hover:underline font-medium"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-black text-white py-4 px-6 text-base font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 rounded-none"
              >
                {isLoading ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin mr-3" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Log in</span>
                )}
              </button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-base text-gray-600">New at IZAJ?</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push('/signup')}
                  className="w-full bg-white text-black py-4 px-6 text-base border-2 border-gray-300 font-medium hover:bg-gray-50 transition-all duration-300 rounded-none mt-4"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
