"use client";

import { useState, useEffect } from 'react';
import { Product, ProductFilter, ProductSort } from '../types';

export const useProducts = (filters?: ProductFilter, sort?: ProductSort) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // This would typically be an API call
      // For now, we'll simulate with mock data
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          description: 'High-quality wireless headphones with noise cancellation',
          price: 2999,
          originalPrice: 3999,
          images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Audio',
          brand: 'TechBrand',
          rating: 4.5,
          reviewCount: 128,
          stock: 50,
          sku: 'TB-HP-001',
          tags: ['wireless', 'noise-cancellation', 'premium'],
          isOnSale: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          name: 'Smart Fitness Watch',
          description: 'Track your fitness goals with this advanced smartwatch',
          price: 4999,
          images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Wearables',
          brand: 'FitTech',
          rating: 4.8,
          reviewCount: 256,
          stock: 30,
          sku: 'FT-SW-001',
          tags: ['fitness', 'smartwatch', 'health'],
          isNew: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3',
          name: 'Wireless Bluetooth Speaker',
          description: 'Portable speaker with excellent sound quality',
          price: 1999,
          images: ['https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Audio',
          brand: 'SoundMax',
          rating: 4.3,
          reviewCount: 89,
          stock: 75,
          sku: 'SM-BS-001',
          tags: ['bluetooth', 'portable', 'speaker'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '4',
          name: 'Gaming Mechanical Keyboard',
          description: 'RGB backlit mechanical keyboard for gaming',
          price: 3499,
          images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Gaming',
          brand: 'GameTech',
          rating: 4.6,
          reviewCount: 156,
          stock: 25,
          sku: 'GT-KB-001',
          tags: ['gaming', 'mechanical', 'rgb'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '5',
          name: 'Wireless Gaming Mouse',
          description: 'High-precision wireless gaming mouse',
          price: 2499,
          images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Gaming',
          brand: 'GameTech',
          rating: 4.4,
          reviewCount: 203,
          stock: 40,
          sku: 'GT-MS-001',
          tags: ['gaming', 'wireless', 'precision'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '6',
          name: 'Smartphone Stand',
          description: 'Adjustable smartphone stand for desk use',
          price: 899,
          images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop'],
          category: 'Electronics',
          subcategory: 'Accessories',
          brand: 'DeskPro',
          rating: 4.2,
          reviewCount: 67,
          stock: 100,
          sku: 'DP-ST-001',
          tags: ['stand', 'adjustable', 'desk'],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Apply filters
      let filteredProducts = mockProducts;

      if (filters) {
        if (filters.category) {
          filteredProducts = filteredProducts.filter(p => p.category === filters.category);
        }
        if (filters.brand) {
          filteredProducts = filteredProducts.filter(p => p.brand === filters.brand);
        }
        if (filters.minPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
        }
        if (filters.maxPrice !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
        }
        if (filters.rating !== undefined) {
          filteredProducts = filteredProducts.filter(p => p.rating >= filters.rating!);
        }
        if (filters.inStock) {
          filteredProducts = filteredProducts.filter(p => p.stock > 0);
        }
      }

      // Apply sorting
      if (sort) {
        filteredProducts.sort((a, b) => {
          const aValue = a[sort.field];
          const bValue = b[sort.field];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sort.direction === 'asc' 
              ? aValue.localeCompare(bValue)
              : bValue.localeCompare(aValue);
          }
          
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sort.direction === 'asc' 
              ? aValue - bValue
              : bValue - aValue;
          }
          
          return 0;
        });
      }

      setProducts(filteredProducts);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, sort]);

  return {
    products,
    isLoading,
    error,
    refetch: fetchProducts,
  };
};
