import React, { useState } from "react";

interface SignUpFormProps {
  toggleForm: () => void; // Define the type for toggleForm prop
}

const SignUpForm: React.FC<SignUpFormProps> = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
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

        <div className="mb-4">
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

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800">
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Already have an account? <button onClick={toggleForm} className="text-blue-500 cursor-pointer">Login</button>
      </p>
    </div>
  );
};

export default SignUpForm;
