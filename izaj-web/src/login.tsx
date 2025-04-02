import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

interface LoginFormProps {
  toggleForm: () => void;
  onLogin: (userData: { name: string; email: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ toggleForm, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock login logic - normally this would be an API call
    const firstName = email.split('@')[0];
    const capitalizedName = 
      firstName.charAt(0).toUpperCase() + firstName.slice(1);

    // Call onLogin with user data
    onLogin({
      name: capitalizedName,
      email: email
    });

    console.log("Logging in with", { email, password });
  };

  return (
    <div className="bg-white flex items-center justify-center h-full py-0 px-12 text-center">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="font-bold m-0">Sign in</h1>
        
        {/* Social Icons */}
        <div className="my-5">
          <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10">
            <FaFacebookF />
          </a>
          <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10">
            <FaGoogle />
          </a>
          <a href="#" className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10">
            <FaLinkedinIn />
          </a>
        </div>
        
        <span className="text-xs">or use your account</span>
        
        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white border border-black py-3 px-4 my-2 w-full"
        />
        
        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white border border-black py-3 px-4 my-2 w-full"
        />
        
        {/* Forgot Password */}
        <a 
          href="#" 
          className="text-gray-600 text-xs my-3 inline-block"
        >
          Forgot your password?
        </a>
        
        {/* Login Button */}
        <button 
          type="submit" 
          className="rounded-3xl border border-black bg-black text-white text-xs font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-80 ease-in focus:outline-none active:scale-95 mt-4"
        >
          Sign In
        </button>
        
        {/* Create Account Link */}
        <p className="text-xs text-gray-600 mt-4">
          Don't have an account?{' '}
          <button 
            onClick={toggleForm} 
            className="text-black font-bold cursor-pointer hover:underline"
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;