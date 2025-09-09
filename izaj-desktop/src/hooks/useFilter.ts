import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { Session } from '@supabase/supabase-js';
import { FetchedProduct } from '../types/filter';
import { FilterService } from '../services/filterService';

export const useFilter = (session: Session | null) => {
  const [filteredProducts, setFilteredProducts] = useState<FetchedProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); 
  const normalizedStatus = statusFilter.toLowerCase();

    const fetchCategories = useCallback(async () => {
    if (!session?.access_token) return;
    setIsLoading(true);
    try {
      const fetchedCategories = await FilterService.fetchCategories(session);
      setCategories(['All', ...fetchedCategories]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Failed to fetch categories');
      toast.error('Failed to fetch categories');
    } finally {
      setIsLoading(false);
    }
    }, [session]);

    const fetchFilteredProducts = useCallback(async () => {
    if (!session?.access_token) return;
    setIsLoading(true);
    try {
        let products: FetchedProduct[] = [];

    if (selectedCategory === 'All' && normalizedStatus === 'all') {
      products = await FilterService.fetchByCategory(session, '');
    } else if (selectedCategory === 'All' && normalizedStatus === 'active') {
      products = await FilterService.fetchActiveProducts(session);
    } else if (selectedCategory === 'All' && normalizedStatus === 'inactive') {
      const allProducts = await FilterService.fetchByCategory(session, '');
      products = allProducts.filter(product => product.publish_status === false);

    } else if (selectedCategory !== 'All' && normalizedStatus === 'all') {
      products = await FilterService.fetchByCategory(session, selectedCategory);
    } else if (selectedCategory !== 'All' && normalizedStatus === 'active') {
      const allCategoryProducts = await FilterService.fetchByCategory(session, selectedCategory);
      products = allCategoryProducts.filter(product => product.publish_status === true);
    } else if (selectedCategory !== 'All' && normalizedStatus === 'inactive') {
      const allCategoryProducts = await FilterService.fetchByCategory(session, selectedCategory);

      products = allCategoryProducts.filter(product => product.publish_status === false);
    }


        setFilteredProducts(products);
    } catch (error) {
        console.error('Error fetching filtered products:', error);
        setError('Failed to fetch products');
        toast.error('Failed to fetch products');
    } finally {
        setIsLoading(false);
    }
    }, [session, selectedCategory, statusFilter]);

    const fetchActiveProducts = useCallback(async () => {
    if (!session?.access_token) return;
    setIsLoading(true);
    try {
      const products = await FilterService.fetchActiveProducts(session);
      setFilteredProducts(products);
    } catch (error) {
      console.error('Error fetching active products:', error);
      setError('Failed to fetch active products');
      toast.error('Failed to fetch active products');
    } finally {
      setIsLoading(false);
    }
    }, [session]);

    const visibleProducts = useMemo(() => {
    if (!searchTerm) return filteredProducts;
    return filteredProducts.filter(product =>
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    }, [filteredProducts, searchTerm]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);
    useEffect(() => {
        fetchFilteredProducts();
    }, [fetchFilteredProducts, selectedCategory, statusFilter]);

  return {
    filteredProducts: visibleProducts,
    isLoading,
    categories,
    selectedCategory,
    searchTerm,
    fetchActiveProducts,
    setSearchTerm,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    error,
  };
}
