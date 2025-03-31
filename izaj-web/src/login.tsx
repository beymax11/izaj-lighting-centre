import React, { useState } from "react";

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
    <div className="max-w-md mx-auto p-15 bg-white">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center text-black" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        Login to my account
      </h2>
      
      {/* Description */}
      <p className="text-center text-black-600 mb-8" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
        Enter your e-mail and password:
      </p>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-normal text-black mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-2 py-2 border-0 border-b border-black focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-normal text-black mb-1" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-2 py-2 border-0 border-b border-gray-300 focus:border-black focus:ring-0 rounded-none"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          />
        </div>

        <button 
          type="submit" 
          className="w-full py-3 bg-black text-white hover:bg-gray-800 mt-8"
          style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
        >
          Login
        </button>
      </form>

      {/* Links */}
      <div className="mt-6 space-y-3 text-center">
        <p className="text-sm text-gray-600" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          New customer?{' '}
          <button 
            onClick={toggleForm} 
            className="text-gray-800 underline cursor-pointer hover:text-black"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Create your account
          </button>
        </p>
        <p className="text-sm text-gray-600" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
          Lost password?{' '}
          <button 
            className="text-gray-800 underline cursor-pointer hover:text-black"
            style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}
          >
            Recover password
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;