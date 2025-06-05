import { useState } from 'react';
import { Icon } from '@iconify/react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple static check, replace with real auth as needed
    if (username === 'admin' && password === 'admin') {
      setError('');
      onLogin();
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100">
      <div className="bg-white rounded-3xl shadow-2xl border border-yellow-100 px-10 py-12 w-full max-w-md flex flex-col items-center relative">
        {/* Decorative Icon */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-100 rounded-full p-3 shadow-lg">
          <img
            src="/izaj.jpg"
            alt="IZAJ Logo"
            className="w-16 h-16 rounded-full bg-yellow-400 border-4 border-yellow-200 shadow"
          />
        </div>
        <div className="mt-12 mb-2 flex flex-col items-center">
          <h2
            className="text-4xl font-bold text-gray-800 mb-1"
            style={{
              color: "#000000",
              fontFamily: "'Playfair Display', serif",
              textShadow: "-2px 0px 2px rgba(0, 0, 0, 0.5)",
              letterSpacing: "10px",
            }}
          >
            IZAJ
          </h2>
          <span className="text-yellow-500 font-semibold tracking-widest text-xs mb-2">ADMIN PANEL</span>
        </div>
        <div className="text-gray-500 mb-6 text-sm">Sign in to your account</div>
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          {error && (
            <div className="mb-2 text-red-500 text-sm text-center bg-red-50 rounded-lg py-2 px-3 border border-red-100">
              <Icon icon="mdi:alert-circle-outline" className="inline mr-1" />
              {error}
            </div>
          )}
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Username</label>
            <div className="relative">
              <Icon icon="mdi:account-outline" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-yellow-50 shadow"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoFocus
                placeholder="Enter your username"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium">Password</label>
            <div className="relative">
              <Icon icon="mdi:lock-outline" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400" />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border border-yellow-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-200 bg-yellow-50 shadow"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-xl font-semibold hover:bg-yellow-500 transition shadow-lg mt-2"
          >
            <Icon icon="mdi:login" className="inline mr-2" />
            Login
          </button>
        </form>
        <div className="mt-6 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} IZAJ. All rights reserved.
        </div>
      </div>
    </div>
  );
}
