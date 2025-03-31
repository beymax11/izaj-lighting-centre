import React, { useState } from "react";

interface SignUpFormProps {
  toggleForm: () => void; // Define the type for toggleForm prop
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here
    if (password === confirmPassword) {
      console.log("Signing up with", { email, password });
    } else {
      console.log("Passwords do not match");
    }
  };

  return (
    <div className="max-w-md mx-auto p-3 bg-white">
      {/* Title */}
      <h2 className="text-2xl font-normal mb-4 text-center text-gray-800" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        Create my account
      </h2>
      
      {/* Description */}
      <p className="text-center text-gray-600 mb-8" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        Please fill in the information below:
      </p>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-normal text-gray-700 mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            First name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-normal text-gray-700 mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-normal text-gray-700 mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-normal text-gray-700 mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-0 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-black text-white hover:bg-gray-800 mt-8"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          Signup
        </button>
      </form>

      {/* Login link */}
      <p className="mt-6 text-sm text-center text-gray-600" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        Already have an account?{' '}
        <button 
          onClick={toggleForm} 
          className="text-gray-800 underline cursor-pointer hover:text-black"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          Login Here
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
