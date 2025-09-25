"use client";

import { useState, useEffect } from 'react';
import { CartItem, Cart } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({
    id: '',
    items: [],
    totalItems: 0,
    totalPrice: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    setIsLoading(true);
    
    const existingItem = cart.items.find(
      cartItem => 
        cartItem.productId === item.productId && 
        cartItem.size === item.size && 
        cartItem.color === item.color
    );

    let updatedItems: CartItem[];
    
    if (existingItem) {
      updatedItems = cart.items.map(cartItem =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
          : cartItem
      );
    } else {
      const newItem: CartItem = {
        ...item,
        id: Date.now().toString(),
      };
      updatedItems = [...cart.items, newItem];
    }

    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setCart({
      ...cart,
      items: updatedItems,
      totalItems,
      totalPrice,
      updatedAt: new Date(),
    });

    setIsLoading(false);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedItems = cart.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );

    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setCart({
      ...cart,
      items: updatedItems,
      totalItems,
      totalPrice,
      updatedAt: new Date(),
    });
  };

  const removeFromCart = (itemId: string) => {
    const updatedItems = cart.items.filter(item => item.id !== itemId);
    const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    setCart({
      ...cart,
      items: updatedItems,
      totalItems,
      totalPrice,
      updatedAt: new Date(),
    });
  };

  const clearCart = () => {
    setCart({
      id: '',
      items: [],
      totalItems: 0,
      totalPrice: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};
