import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

interface SignUpFormProps {
  toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    if (password === confirmPassword) {
      console.log("Signing up with", { email, password, firstName, lastName });
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="bg-white flex items-center justify-center h-full py-0 px-12 text-center">
      <form onSubmit={handleSubmit} className="w-full">
        <h1 className="font-bold m-0">Create Account</h1>
        
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
        
        <span className="text-xs text-black">or use your email for registration</span>
        
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="bg-white border border-black py-3 px-4 my-2 w-full text-black"
        />
        {/* Last Name Input */}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="bg-white border border-black py-3 px-4 my-2 w-full"
        />
        
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
        
        {/* Confirm Password Input */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="bg-white border border-black py-3 px-4 my-2 w-full"
        />
        
        {/* Sign Up Button */}
        <button 
          type="submit" 
          className="rounded-3xl border border-black bg-black text-white text-xs font-bold py-3 px-12 uppercase tracking-wider transition-transform duration-80 ease-in focus:outline-none active:scale-95 mt-4"
        >
          Sign Up
        </button>
        
        {/* Login Link */}
        <p className="text-xs text-gray-600 mt-4">
          Already have an account?{' '}
          <button 
            onClick={toggleForm} 
            className="text-black font-bold cursor-pointer hover:underline"
          >
            Sign In
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;