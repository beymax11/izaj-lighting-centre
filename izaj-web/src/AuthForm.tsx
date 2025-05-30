import React, { useReducer, useEffect, useRef, useCallback } from "react";
import { Icon } from "@iconify/react";


// Types
interface UserData {
  name: string;
  email: string;
}

interface AuthFormProps {
  isLoginForm: boolean;
  toggleForm: () => void;
  onLogin: (userData: UserData) => void;
  onClose?: () => void; // Optional close handler
}

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  rememberMe: boolean;
  isLoading: boolean;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  };
  touched: {
    name: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
}

type FormAction =
  | { type: 'SET_FIELD'; field: keyof FormState; value: any }
  | { type: 'SET_ERROR'; field: keyof FormState['errors']; message: string }
  | { type: 'SET_TOUCHED'; field: keyof FormState['touched']; value: boolean }
  | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
  | { type: 'SET_LOADING'; value: boolean }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' };

// Input component for reusability
const FormInput: React.FC<{
  id: string;
  type: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error?: string;
  required?: boolean;
  autoFocus?: boolean;
  endAdornment?: React.ReactNode;
}> = ({ 
  id, 
  type, 
  label, 
  value, 
  placeholder, 
  onChange, 
  onBlur, 
  error, 
  required = false, 
  autoFocus = false,
  endAdornment
}) => (
  <div className="mb-2">
    <label htmlFor={id} className="block text-left text-xs font-medium text-gray-700 mb-0.5">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        autoFocus={autoFocus}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`bg-white border ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm transition-colors duration-200 text-black placeholder-gray-500`}
      />
      {endAdornment}
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-0.5 text-xs text-red-600 text-left" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Password strength component
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = (): { strength: number; label: string; color: string } => {
    if (!password) return { strength: 0, label: "", color: "bg-gray-200" };
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    const strengthMap = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-orange-500" },
      { label: "Medium", color: "bg-yellow-500" },
      { label: "Strong", color: "bg-lime-500" },
      { label: "Very Strong", color: "bg-green-500" }
    ];
    
    return { 
      strength, 
      label: strength > 0 ? strengthMap[strength - 1].label : "", 
      color: strength > 0 ? strengthMap[strength - 1].color : "bg-gray-200" 
    };
  };
  
  const { strength, label, color } = getStrength();
  
  return password ? (
    <div className="mt-1" aria-live="polite">
      <div className="flex h-1 overflow-hidden bg-gray-200 rounded">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`${i < strength ? color : 'bg-gray-200'} h-full flex-1 transition-all duration-300`}
          />
        ))}
      </div>
      <p className="text-xs mt-0.5 text-gray-600 text-left">{label}</p>
    </div>
  ) : null;
};

// Social Button Component
const SocialButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  color: string;
}> = ({ icon, label, onClick, color }) => (
  <button 
    type="button"
    onClick={onClick}
    className={`border border-gray-300 rounded-full flex justify-center items-center h-10 w-10 ${color} hover:bg-opacity-10 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500`}
    aria-label={label}
  >
    {icon}
  </button>
);

// Form reducer function
const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return { 
        ...state, 
        errors: { ...state.errors, [action.field]: action.message } 
      };
    case 'SET_TOUCHED':
      return { 
        ...state, 
        touched: { ...state.touched, [action.field]: action.value } 
      };
    case 'TOGGLE_PASSWORD_VISIBILITY':
      return { ...state, showPassword: !state.showPassword };
    case 'SET_LOADING':
      return { ...state, isLoading: action.value };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    case 'RESET_FORM':
      return initialState;
    default:
      return state;
  }
};

// Initial form state
const initialState: FormState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  rememberMe: false,
  isLoading: false,
  errors: {},
  touched: {
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  }
};

const AuthForm: React.FC<AuthFormProps> = ({ isLoginForm, toggleForm, onLogin, onClose }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && onClose) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Focus first field when form type changes
  useEffect(() => {
    setTimeout(() => {
      if (isLoginForm) {
        emailInputRef.current?.focus();
      } else {
        nameInputRef.current?.focus();
      }
    }, 100);
  }, [isLoginForm]);

  // Reset form when switching between login and signup
  useEffect(() => {
    dispatch({ type: 'RESET_FORM' });
  }, [isLoginForm]);

  // Form validation
  const validateField = useCallback((field: keyof FormState['touched'], value: string) => {
    switch (field) {
      case 'name':
        if (!value.trim() && !isLoginForm) {
          dispatch({ type: 'SET_ERROR', field: 'name', message: 'Name is required' });
          return false;
        }
        dispatch({ type: 'SET_ERROR', field: 'name', message: '' });
        return true;
      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          dispatch({ type: 'SET_ERROR', field: 'email', message: 'Email is required' });
          return false;
        } else if (!emailRegex.test(value)) {
          dispatch({ type: 'SET_ERROR', field: 'email', message: 'Please enter a valid email address' });
          return false;
        }
        dispatch({ type: 'SET_ERROR', field: 'email', message: '' });
        return true;
      
      case 'password':
        if (!value) {
          dispatch({ type: 'SET_ERROR', field: 'password', message: 'Password is required' });
          return false;
        } else if (value.length < 8) {
          dispatch({ type: 'SET_ERROR', field: 'password', message: 'Password must be at least 8 characters' });
          return false;
        }
        dispatch({ type: 'SET_ERROR', field: 'password', message: '' });
        return true;
      
      case 'confirmPassword':
        if (!isLoginForm && value !== state.password) {
          dispatch({ type: 'SET_ERROR', field: 'confirmPassword', message: 'Passwords do not match' });
          return false;
        }
        dispatch({ type: 'SET_ERROR', field: 'confirmPassword', message: '' });
        return true;
      
      default:
        return true;
    }
  }, [state.password, isLoginForm]);

  // Handle field blur
  const handleBlur = (field: keyof FormState['touched']) => {
    dispatch({ type: 'SET_TOUCHED', field, value: true });
    
    switch (field) {
      case 'name':
        validateField('name', state.name);
        break;
      case 'email':
        validateField('email', state.email);
        break;
      case 'password':
        validateField('password', state.password);
        break;
      case 'confirmPassword':
        validateField('confirmPassword', state.confirmPassword);
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'CLEAR_ERRORS' });
    
    // Validate all fields
    const isNameValid = isLoginForm || validateField('name', state.name);
    const isEmailValid = validateField('email', state.email);
    const isPasswordValid = validateField('password', state.password);
    const isConfirmPasswordValid = isLoginForm || validateField('confirmPassword', state.confirmPassword);
    
    if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      return;
    }
    
    try {
      dispatch({ type: 'SET_LOADING', value: true });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        name: isLoginForm ? state.email.split('@')[0] : state.name,
        email: state.email
      };
      
      // Call onLogin callback
      onLogin(userData);
      
      // Close modal after successful login/signup
      if (onClose) {
        onClose();
      }
      
      // Log success (for development)
      console.log(`Successfully ${isLoginForm ? 'logged in' : 'signed up'} with`, { email: state.email });
      
    } catch (error) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({ type: 'SET_ERROR', field: 'general', message: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  // Handle social login
  const handleSocialLogin = (provider: string) => {
    console.log(`Initiating ${provider} login`);
    // Implementation would connect to OAuth provider
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="auth-form-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" aria-hidden="true"></div>

      {/* Modal container */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          ref={modalRef}
          className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-5xl"
          style={{ height: '600px' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1 z-10"
            aria-label="Close modal"
          >
            <Icon icon="mdi:close" width={20} height={20} />
          </button>

          <div className="flex flex-col md:flex-row h-full">
            {/* Left Content Section */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 flex-col justify-between relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm p-2 rounded-xl">
                    <img
                      src="izaj.jpg"
                      alt="Izaj Logo"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-2xl font-bold tracking-tight">Izaj</span>
                    <p className="text-blue-100 text-sm">Your Style, Your Way</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-3">
                      {isLoginForm ? "Welcome Back!" : "Join Our Community"}
                    </h2>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      {isLoginForm 
                        ? "Sign in to access your account and continue your shopping journey."
                        : "Create an account to enjoy exclusive benefits and personalized shopping experience."}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-green-400/20 p-2 rounded-lg">
                          <Icon icon="mdi:shield-check" className="text-green-300" width={24} height={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Secure Shopping</h3>
                          <p className="text-blue-100 text-sm mt-1">Your data is protected with industry-standard security</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-400/20 p-2 rounded-lg">
                          <Icon icon="mdi:lightning-bolt" className="text-blue-300" width={24} height={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Fast Checkout</h3>
                          <p className="text-blue-100 text-sm mt-1">Save your details for quicker purchases</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-purple-400/20 p-2 rounded-lg">
                          <Icon icon="mdi:gift" className="text-purple-300" width={24} height={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Exclusive Offers</h3>
                          <p className="text-blue-100 text-sm mt-1">Get access to special deals and promotions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="relative z-10 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <img
                            key={i}
                            src={`https://i.pravatar.cc/150?img=${i + 10}`}
                            alt={`User ${i}`}
                            className="w-10 h-10 rounded-full border-2 border-blue-800"
                          />
                        ))}
                      </div>
                      <div>
                        <p className="text-sm font-medium">Join our community</p>
                        <p className="text-blue-100 text-xs">
                          <span className="font-semibold">10,000+</span> happy customers
                        </p>
                      </div>
                    </div>
                    <div className="bg-green-400/20 px-3 py-1 rounded-full">
                      <span className="text-green-300 text-sm font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-1/2 px-4 pt-5 pb-4 sm:p-6 flex flex-col">
              <form onSubmit={handleSubmit} className="w-full flex flex-col flex-1" noValidate>
                {/* Logo at the top (only visible on mobile) */}
                <div className="flex justify-center mb-4 md:hidden">
                  <img
                    src="izaj.jpg"
                    alt="Izaj Logo"
                    className="h-16 w-16 rounded-full object-cover shadow-lg"
                    style={{ background: "#fff" }}
                  />
                </div>

                <h1 
                  id="auth-form-title" 
                  className="font-bold text-xl sm:text-2xl mb-4 text-gray-800 text-center"
                >
                  {isLoginForm ? "Welcome Back" : "Create Account"}
                </h1>
                
                {/* Social Login */}
                <div className="flex justify-center space-x-3 mb-4">
                  <SocialButton 
                    icon={<Icon icon="fa6-brands:facebook-f" width={18} height={18} />}
                    label={`Sign ${isLoginForm ? 'in' : 'up'} with Facebook`}
                    onClick={() => handleSocialLogin('Facebook')}
                    color="text-blue-600"
                  />
                  <SocialButton 
                    icon={<Icon icon="fa6-brands:google" width={18} height={18} />}
                    label={`Sign ${isLoginForm ? 'in' : 'up'} with Google`}
                    onClick={() => handleSocialLogin('Google')}
                    color="text-red-500"
                  />
                  <SocialButton 
                    icon={<Icon icon="fa6-brands:linkedin-in" width={18} height={18} />}
                    label={`Sign ${isLoginForm ? 'in' : 'up'} with LinkedIn`}
                    onClick={() => handleSocialLogin('LinkedIn')}
                    color="text-blue-700"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="mx-3 text-sm text-gray-500">or continue with email</span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>
                
                {state.errors.general && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4" role="alert">
                    {state.errors.general}
                  </div>
                )}
                
                {/* Form Fields Container */}
                <div className="flex-1 min-h-0">
                  <div className="h-full flex flex-col">
                    {/* Name Input (only for signup) */}
                    {!isLoginForm && (
                      <FormInput
                        id="name"
                        type="text"
                        label="Full Name"
                        value={state.name}
                        placeholder="Your name"
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
                        onBlur={() => handleBlur('name')}
                        error={state.touched.name ? state.errors.name : undefined}
                        required={!isLoginForm}
                        autoFocus={!isLoginForm}
                      />
                    )}
                    
                    {/* Email Input */}
                    <FormInput
                      id="email"
                      type="email"
                      label="Email Address"
                      value={state.email}
                      placeholder="you@example.com"
                      onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
                      onBlur={() => handleBlur('email')}
                      error={state.touched.email ? state.errors.email : undefined}
                      required
                      autoFocus={isLoginForm}
                    />
                    
                    {/* Password Input */}
                    <div className="mb-2">
                      <div className="flex justify-between items-center mb-0.5">
                        <label htmlFor="password" className="block text-left text-xs font-medium text-gray-700">
                          Password <span className="text-red-500">*</span>
                        </label>
                        {isLoginForm && (
                          <button 
                            type="button"
                            className="text-xs text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                            onClick={() => console.log('Forgot password flow')}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          id="password"
                          type={state.showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          value={state.password}
                          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'password', value: e.target.value })}
                          onBlur={() => handleBlur('password')}
                          required
                          aria-invalid={!!state.errors.password && state.touched.password}
                          aria-describedby={state.errors.password && state.touched.password ? "password-error" : undefined}
                          className={`bg-white border ${state.errors.password && state.touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm transition-colors duration-200 text-black placeholder-gray-500`}
                        />
                        <button 
                          type="button" 
                          onClick={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          aria-label={state.showPassword ? "Hide password" : "Show password"}
                        >
                          {state.showPassword ? (
                            <Icon icon="fa6-solid:eye-slash" width={16} height={16} />
                          ) : (
                            <Icon icon="fa6-solid:eye" width={16} height={16} />
                          )}
                        </button>
                      </div>
                      {state.errors.password && state.touched.password && (
                        <p id="password-error" className="mt-0.5 text-xs text-red-600 text-left" role="alert">
                          {state.errors.password}
                        </p>
                      )}
                      {!isLoginForm && <PasswordStrength password={state.password} />}
                    </div>
                    
                    {/* Confirm Password (only for signup) */}
                    {!isLoginForm && (
                      <FormInput
                        id="confirmPassword"
                        type={state.showPassword ? "text" : "password"}
                        label="Confirm Password"
                        value={state.confirmPassword}
                        placeholder="Confirm your password"
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: e.target.value })}
                        onBlur={() => handleBlur('confirmPassword')}
                        error={state.touched.confirmPassword ? state.errors.confirmPassword : undefined}
                        required={!isLoginForm}
                      />
                    )}
                  </div>
                </div>
                
                {/* Bottom Section */}
                <div className="mt-auto pt-4">
                  {/* Remember Me (only for login) */}
                  {isLoginForm && (
                    <div className="flex items-center mb-4">
                      <input
                        id="rememberMe"
                        type="checkbox"
                        checked={state.rememberMe}
                        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'rememberMe', value: e.target.checked })}
                        className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="rememberMe" className="ml-2 block text-xs text-gray-700">
                        Remember me
                      </label>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    disabled={state.isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
                    aria-busy={state.isLoading}
                  >
                    {state.isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>{isLoginForm ? "Signing In..." : "Signing Up..."}</span>
                      </>
                    ) : (
                      <span>{isLoginForm ? "Sign In" : "Sign Up"}</span>
                    )}
                  </button>
                  
                  {/* Guest access option */}
                  <button
                    type="button"
                    onClick={() => console.log('Continue as guest')}
                    className="w-full border border-gray-300 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-3 hover:bg-gray-50 text-sm"
                  >
                    Continue as Guest
                  </button>
                  
                  {/* Toggle Form Link */}
                  <p className="text-gray-600 mt-4 text-sm text-center">
                    {isLoginForm ? "Don't have an account?" : "Already have an account?"}{' '}
                    <button 
                      type="button"
                      onClick={toggleForm} 
                      className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
                    >
                      {isLoginForm ? "Create account" : "Sign in"}
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;