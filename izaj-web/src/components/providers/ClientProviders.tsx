"use client";

import React from 'react';
import { CartProvider, UserProvider, CartIconProvider, FavoritesProvider } from '../../context';
import { NotificationProvider } from '../../context/NotificationContext';

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <UserProvider>
      <CartProvider>
        <CartIconProvider>
          <FavoritesProvider>
            <NotificationProvider>
              {children}
            </NotificationProvider>
          </FavoritesProvider>
        </CartIconProvider>
      </CartProvider>
    </UserProvider>
  );
}

