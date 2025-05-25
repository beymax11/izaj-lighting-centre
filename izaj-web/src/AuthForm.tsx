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
        className={`bg-white border ${error ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm transition-colors duration-200`}
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
  <div className="w-full">
      <div className="px-3 sm:px-4 py-4" role="dialog" aria-labelledby="auth-form-title">
        <form onSubmit={handleSubmit} className="w-full" noValidate>
          {/* Logo at the top */}
          <div className="flex justify-center mb-3">
            <img
              src="izaj.jpg"
              alt="Izaj Logo"
              className="h-12 w-12 rounded-full object-cover shadow"
              style={{ background: "#fff" }}
            />
          </div>
          <h1 
            id="auth-form-title" 
            className="font-bold text-lg sm:text-xl mb-3 text-gray-800 text-center"
          >
            {isLoginForm ? "Welcome Back" : "Create Account"}
          </h1>
          
          {/* Social Login */}
          <div className="flex justify-center space-x-2 my-2">
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
          
          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-2 text-xs text-gray-500">or continue with email</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          {state.errors.general && (
            <div className="bg-red-50 text-red-600 p-2 rounded-md text-xs mb-2" role="alert">
              {state.errors.general}
            </div>
          )}
          
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
                className={`bg-white border ${state.errors.password && state.touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm transition-colors duration-200`}
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
          
          {/* Remember Me (only for login) */}
          {isLoginForm && (
            <div className="flex items-center mb-2">
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-md text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 mt-2 flex items-center justify-center disabled:bg-blue-400 disabled:cursor-not-allowed"
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
            className="w-full border border-gray-300 text-gray-700 font-medium py-2 px-3 rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-2 hover:bg-gray-50 text-xs"
          >
            Continue as Guest
          </button>
          
          {/* Toggle Form Link */}
            <p className="text-gray-600 mt-2 text-xs text-center">
            {isLoginForm ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              type="button"
              onClick={toggleForm} 
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline transition-colors"
            >
              {isLoginForm ? "Create account" : "Sign in"}
            </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;