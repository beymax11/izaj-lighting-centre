"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loginWithProvider: (provider: 'google') => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await fetch('/api/auth/me', { cache: 'no-store' });
        const { user: supabaseUser } = await res.json();
        if (!supabaseUser) return;

        const name: string = (supabaseUser.user_metadata?.name as string) || '';
        const [firstName, ...rest] = name.trim().split(' ');
        const lastName = rest.join(' ');
        const phone: string = (supabaseUser.user_metadata?.phone as string) || '';

        const userData: User = {
          id: supabaseUser.id,
          email: supabaseUser.email,
          firstName: firstName || '',
          lastName: lastName || '',
          phone,
          role: 'customer',
          isEmailVerified: Boolean(supabaseUser.email_confirmed_at),
          createdAt: new Date(supabaseUser.created_at || Date.now()),
          updatedAt: new Date(),
        };
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } catch {}
    };
    hydrate();
  }, []);

  const login = async (identifier: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Login failed');
      }

      const supabaseUser = result.user || {};
      const name: string = (supabaseUser.user_metadata?.name as string) || '';
      const [firstName, ...rest] = name.trim().split(' ');
      const lastName = rest.join(' ');
      const phone: string = (supabaseUser.user_metadata?.phone as string) || '';

      const userData: User = {
        id: supabaseUser.id || 'unknown',
        email: supabaseUser.email || identifier,
        firstName: firstName || '',
        lastName: lastName || '',
        phone,
        role: 'customer',
        isEmailVerified: Boolean(supabaseUser.email_confirmed_at),
        createdAt: new Date(supabaseUser.created_at || Date.now()),
        updatedAt: new Date(),
      };

      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try { await fetch('/api/auth/logout', { method: 'POST' }); } catch {}
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart'); // Clear cart on logout
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          name: `${userData.firstName} ${userData.lastName}`.trim(),
          phone: userData.phone,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result?.error || 'Signup failed');
      }
      // Do not auto-login after signup; user should login explicitly.
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;

    setIsLoading(true);
    try {
      const updatedUser = { ...user, ...userData, updatedAt: new Date() };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (provider: 'google') => {
    // Redirect to our OAuth route; session will be set by Supabase cookies
    window.location.href = `/api/auth/oauth?provider=${provider}`;
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoading,
      login,
      logout,
      register,
      updateProfile,
      loginWithProvider,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
