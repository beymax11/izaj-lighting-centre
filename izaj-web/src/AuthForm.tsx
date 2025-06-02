import React, { useState, useCallback, useEffect } from "react";
import { Icon } from "@iconify/react";

// Types
interface UserData {
  name: string;
  email: string;
}

interface AuthFormProps {
  onLogin: (userData: UserData) => void;
  onClose?: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  rememberMe: boolean;
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

// Constants
const SOCIAL_PROVIDERS = [
  { icon: "fa6-brands:facebook-f", label: "Facebook", color: "text-blue-600" },
  { icon: "fa6-brands:google", label: "Google", color: "text-red-500" },
  { icon: "fa6-brands:linkedin-in", label: "LinkedIn", color: "text-blue-700" }
] as const;

const initialFormData: FormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  showPassword: false,
  rememberMe: false,
  errors: {},
  touched: {
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  }
};

// Custom hooks
const useFormState = (initialState: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const setError = useCallback((field: keyof FormData['errors'], message: string) => {
    setFormData(prev => ({
      ...prev,
      errors: { ...prev.errors, [field]: message }
    }));
  }, []);

  return {
    formData,
    isLoading,
    setIsLoading,
    updateField,
    setError
  };
};

// Components
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
}> = React.memo(({ 
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
  <div className="mb-4 group">
    <label htmlFor={id} className="block text-left text-sm font-medium text-gray-700 mb-1.5 transition-colors duration-200 group-focus-within:text-blue-600">
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
        className={`bg-white border-2 ${error ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 rounded-xl py-2.5 px-4 w-full text-sm text-black placeholder-gray-400 transition-all duration-200 shadow-sm hover:border-gray-300`}
      />
      {endAdornment}
    </div>
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600 text-left flex items-center" role="alert">
        <Icon icon="fa6-solid:circle-exclamation" className="w-3 h-3 mr-1" />
        {error}
      </p>
    )}
  </div>
));

const PasswordStrength: React.FC<{ password: string }> = React.memo(({ password }) => {
  const getStrength = useCallback((): { strength: number; label: string; color: string } => {
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
  }, [password]);
  
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
});

const SocialButton: React.FC<{
  icon: string;
  label: string;
  onClick: () => void;
  color: string;
}> = React.memo(({ icon, label, onClick, color }) => (
  <button 
    type="button"
    onClick={onClick}
    className={`border-2 border-gray-200 rounded-xl flex justify-center items-center h-11 w-11 ${color} hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105 hover:border-gray-300 shadow-sm`}
    aria-label={label}
  >
    <Icon icon={icon} width={20} height={20} />
  </button>
));

const LoadingSpinner: React.FC = React.memo(() => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
));

const AuthForm: React.FC<AuthFormProps> = ({ onLogin, onClose }) => {
  const [isRegisterActive, setIsRegisterActive] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { formData: loginData, isLoading: isLoginLoading, setIsLoading: setLoginLoading, updateField: updateLoginField, setError: setLoginError } = useFormState(initialFormData);
  const { formData: registerData, isLoading: isRegisterLoading, setIsLoading: setRegisterLoading, updateField: updateRegisterField, setError: setRegisterError } = useFormState(initialFormData);

  const slides = [
    { 
      src: "slide.jpg", 
      alt: "Lighting Design 1",
      title: "Welcome to IZAJ",
      subtitle: "Discover the perfect lighting for your space"
    },
    { 
      src: "slide2.jpg", 
      alt: "Lighting Design 2",
      title: "Premium Lighting",
      subtitle: "Transform your home with our curated collection"
    },
    { 
      src: "slide3.jpg", 
      alt: "Lighting Design 3",
      title: "Expert Design",
      subtitle: "Let us illuminate your vision"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  const handleToggleForm = useCallback(() => {
    setIsRegisterActive(prev => !prev);
  }, []);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      // Validate login form
      if (!loginData.email || !loginData.password) {
        setLoginError('general', "Please fill in all required fields");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({
        name: loginData.email.split('@')[0],
        email: loginData.email
      });
      if (onClose) onClose();
    } catch (error) {
      setLoginError('general', "Login failed. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterLoading(true);
    try {
      // Validate register form
      if (!registerData.name || !registerData.email || !registerData.password || !registerData.confirmPassword) {
        setRegisterError('general', "Please fill in all required fields");
        return;
      }

      if (registerData.password !== registerData.confirmPassword) {
        setRegisterError('confirmPassword', "Passwords do not match");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      onLogin({
        name: registerData.name,
        email: registerData.email
      });
      if (onClose) onClose();
    } catch (error) {
      setRegisterError('general', "Registration failed. Please try again.");
    } finally {
      setRegisterLoading(false);
    }
  };

  const renderSocialButtons = useCallback((isLogin: boolean) => (
    <div className="flex justify-center space-x-3 mb-4">
      {SOCIAL_PROVIDERS.map(({ icon, label, color }) => (
        <SocialButton
          key={label}
          icon={icon}
          label={`${isLogin ? 'Sign in' : 'Sign up'} with ${label}`}
          onClick={() => console.log(`${label} ${isLogin ? 'login' : 'signup'}`)}
          color={color}
        />
      ))}
    </div>
  ), []);

  const renderFormFields = useCallback((isLogin: boolean) => {
    const data = isLogin ? loginData : registerData;
    const updateField = isLogin ? updateLoginField : updateRegisterField;

    return (
      <div className="flex-1 min-h-0">
        <div className="h-full flex flex-col">
          {!isLogin && (
            <FormInput
              id="register-name"
              type="text"
              label="Full Name"
              value={data.name}
              placeholder="Your name"
              onChange={(e) => updateField('name', e.target.value)}
              onBlur={() => {}}
              error={data.touched.name ? data.errors.name : undefined}
              required
              autoFocus
            />
          )}

          <FormInput
            id={`${isLogin ? 'login' : 'register'}-phone-email`}
            type="text"
            label="Phone/Email"
            value={data.email}
            placeholder="Enter phone number or email"
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => {}}
            error={data.touched.email ? data.errors.email : undefined}
            required
            autoFocus={!isLogin}
          />

          {!isLogin ? (
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="register-password" className="block text-left text-xs font-medium text-gray-700 mb-0.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="register-password"
                      type={data.showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={data.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      required
                      className={`bg-white border ${data.errors.password && data.touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm text-black placeholder-gray-500`}
                    />
                    <button 
                      type="button" 
                      onClick={() => updateField('showPassword', !data.showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      aria-label={data.showPassword ? "Hide password" : "Show password"}
                    >
                      <Icon icon={data.showPassword ? "fa6-solid:eye-slash" : "fa6-solid:eye"} width={16} height={16} />
                    </button>
                  </div>
                  <PasswordStrength password={data.password} />
                </div>
                <div>
                  <label htmlFor="register-confirm-password" className="block text-left text-xs font-medium text-gray-700 mb-0.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="register-confirm-password"
                      type={data.showPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={data.confirmPassword}
                      onChange={(e) => updateField('confirmPassword', e.target.value)}
                      required
                      className={`bg-white border ${data.errors.confirmPassword && data.touched.confirmPassword ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm text-black placeholder-gray-500`}
                    />
                  </div>
                  {data.touched.confirmPassword && data.errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-600 text-left flex items-center" role="alert">
                      <Icon icon="fa6-solid:circle-exclamation" className="w-3 h-3 mr-1" />
                      {data.errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-0.5">
                <label htmlFor="login-password" className="block text-left text-xs font-medium text-gray-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <button 
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                  onClick={() => console.log('Forgot password flow')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={data.showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  required
                  className={`bg-white border ${data.errors.password && data.touched.password ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md py-2 px-3 w-full text-sm text-black placeholder-gray-500`}
                />
                <button 
                  type="button" 
                  onClick={() => updateField('showPassword', !data.showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  aria-label={data.showPassword ? "Hide password" : "Show password"}
                >
                  <Icon icon={data.showPassword ? "fa6-solid:eye-slash" : "fa6-solid:eye"} width={16} height={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }, [loginData, registerData, updateLoginField, updateRegisterField]);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="auth-form-title" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0 z-50">
        <div 
          className="relative overflow-hidden rounded-3xl text-left sm:my-8 w-full max-w-5xl z-50 shadow-2xl" 
          style={{ 
            height: '650px', 
            backgroundColor: '#FFFFFF'
          }}
        >
         
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 z-20"
            aria-label="Close modal"
          >
            <Icon icon="fa6-solid:xmark" className="w-5 h-5 text-gray-500" />
          </button>
          <div className="relative z-10 flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4 flex-1 flex items-center justify-center">
                <div className="text-center p-6 rounded-2xl max-w-md w-full">
                  <div className="flex flex-col h-full">
                    {isRegisterActive ? (
                      <div className="animate-fadein">
                        <h1 
                          id="auth-form-title" 
                          className="font-bold text-2xl sm:text-3xl mb-3 text-gray-800 text-center"
                        >
                          Welcome Back
                        </h1>

                        {renderSocialButtons(true)}

                        <div className="flex items-center mb-6">
                          <div className="flex-grow border-t border-gray-200"></div>
                          <span className="mx-3 text-xs text-gray-500 font-medium">or continue with email</span>
                          <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {loginData.errors.general && (
                          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-4 flex items-center" role="alert">
                            <Icon icon="fa6-solid:circle-exclamation" className="w-4 h-4 mr-2" />
                            {loginData.errors.general}
                          </div>
                        )}

                        <form onSubmit={handleLoginSubmit}>
                          {renderFormFields(true)}

                          <div className="mt-auto pt-4">
                            <div className="flex items-center mb-4">
                              <input
                                id="rememberMe"
                                type="checkbox"
                                checked={loginData.rememberMe}
                                onChange={(e) => updateLoginField('rememberMe', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                                Remember me
                              </label>
                            </div>

                            <button 
                              type="submit" 
                              disabled={isLoginLoading}
                              className="w-full text-gray-900 font-medium py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-all duration-200 transform hover:scale-[1.02]"
                              style={{ backgroundColor: '#FFEB3B' }}
                              aria-busy={isLoginLoading}
                            >
                              {isLoginLoading ? (
                                <>
                                  <LoadingSpinner />
                                  <span>Signing In...</span>
                                </>
                              ) : (
                                <span>Sign In</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={handleToggleForm}
                              className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium mt-3 hover:underline transition-colors duration-200"
                            >
                              Don't have an account? Sign Up
                            </button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="animate-fadein">
                        <h1 
                          id="auth-form-title" 
                          className="font-bold text-2xl sm:text-3xl mb-3 text-gray-800 text-center"
                        >
                          Create Account
                        </h1>

                        {renderSocialButtons(false)}

                        <div className="flex items-center mb-6">
                          <div className="flex-grow border-t border-gray-200"></div>
                          <span className="mx-3 text-xs text-gray-500 font-medium">or continue with email</span>
                          <div className="flex-grow border-t border-gray-200"></div>
                        </div>

                        {registerData.errors.general && (
                          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs mb-4 flex items-center" role="alert">
                            <Icon icon="fa6-solid:circle-exclamation" className="w-4 h-4 mr-2" />
                            {registerData.errors.general}
                          </div>
                        )}

                        <form onSubmit={handleRegisterSubmit}>
                          {renderFormFields(false)}

                          <div className="mt-auto pt-4">
                            <button 
                              type="submit" 
                              disabled={isRegisterLoading}
                              className="w-full text-gray-900 font-medium py-3 px-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-400 transition-all duration-200 transform hover:scale-[1.02]"
                              style={{ backgroundColor: '#FFEB3B' }}
                              aria-busy={isRegisterLoading}
                            >
                              {isRegisterLoading ? (
                                <>
                                  <LoadingSpinner />
                                  <span>Signing Up...</span>
                                </>
                              ) : (
                                <span>Sign Up</span>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => console.log('Continue as guest')}
                              className="w-full border-2 border-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 mt-3 hover:bg-gray-50 text-sm transition-all duration-200 transform hover:scale-[1.02]"
                            >
                              Continue as Guest
                            </button>

                            <button
                              type="button"
                              onClick={handleToggleForm}
                              className="w-full text-blue-600 hover:text-blue-800 text-sm font-medium mt-3 hover:underline transition-colors duration-200"
                            >
                              Already have an account? Sign In
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden md:flex md:w-1/2 p-6 flex-col justify-center items-center h-full relative">
              <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-lg">
                {slides.map((slide, index) => (
                  <div 
                    key={slide.src} 
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      className="w-full h-full object-cover rounded-2xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80 rounded-2xl">
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                        <h2 className="text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                          {slide.title}
                        </h2>
                        <p className="text-xl text-white font-medium max-w-md drop-shadow-md">
                          {slide.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
                    } hover:bg-white/80`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;