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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-center">Login to my account</h2>
      
      {/* Description */}
      <p className="text-center text-sm text-gray-500 mb-6">Enter your e-mail and password:</p>
      
      {/* Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Login
        </button>
      </form>

      {/* Sign up link */}
      <p className="mt-4 text-sm text-center">
        New customer? <button onClick={toggleForm} className="text-blue-500 cursor-pointer">Create your account</button>
      </p>

      {/* Lost password link */}
      <p className="mt-2 text-sm text-center">
        Lost password? <button className="text-blue-500 cursor-pointer">Recover password</button>
      </p>
    </div>
  );
};

export default LoginForm;