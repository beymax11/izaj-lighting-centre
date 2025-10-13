import { useState, useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';
import { PaymentService, Payment, PaymentStats } from '../services/paymentService';

export const usePayments = (session: Session | null) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<PaymentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [filters, setFilters] = useState<{
    search?: string;
    status?: string;
    payment_method?: string;
  }>({});

  const fetchPayments = useCallback(async () => {
    if (!session) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await PaymentService.getAllPayments(session, currentPage, 10, filters);
      
      if (response.success) {
        setPayments(response.payments || []);
        setPagination(response.pagination);
      } else {
        toast.error('Failed to load payments');
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments');
    } finally {
      setIsLoading(false);
    }
  }, [session, currentPage, filters]);

  const fetchStats = useCallback(async () => {
    if (!session) return;

    try {
      const response = await PaymentService.getPaymentStats(session);
      if (response.success) {
        setStats(response.stats);
      }
    } catch (error) {
      console.error('Error fetching payment stats:', error);
    }
  }, [session]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refetchPayments = useCallback(() => {
    fetchPayments();
    fetchStats();
  }, [fetchPayments, fetchStats]);

  const updateFilters = useCallback((newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  }, []);

  return {
    payments,
    stats,
    isLoading,
    currentPage,
    pagination,
    filters,
    setCurrentPage,
    updateFilters,
    refetchPayments
  };
};

export const usePaymentActions = (refetch: () => void) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updatePaymentStatus = useCallback(async (
    session: Session | null,
    paymentId: string,
    payment_status: string
  ) => {
    if (!session) {
      toast.error('Not authenticated');
      return { success: false };
    }

    try {
      setIsUpdating(true);
      const result = await PaymentService.updatePaymentStatus(session, paymentId, payment_status);
      
      if (result.success) {
        toast.success(`Payment status updated to ${payment_status}`);
        refetch();
        return { success: true };
      } else {
        toast.error(result.error || 'Failed to update payment status');
        return { success: false };
      }
    } catch (error: any) {
      console.error('Error updating payment status:', error);
      toast.error('Failed to update payment status');
      return { success: false };
    } finally {
      setIsUpdating(false);
    }
  }, [refetch]);

  return {
    isUpdating,
    updatePaymentStatus
  };
};

// Helper functions
export const formatPaymentDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: '2-digit', 
    day: '2-digit', 
    year: '2-digit' 
  });
};

export const formatPaymentTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false
  });
};

export const formatPrice = (amount: number | string | null | undefined) => {
  // Handle null, undefined, or empty values
  if (amount === null || amount === undefined || amount === '') {
    return '₱0.00';
  }
  
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  // Handle NaN or invalid numbers
  if (isNaN(numAmount) || !isFinite(numAmount)) {
    return '₱0.00';
  }
  
  return `₱${numAmount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const getPaymentStatusColor = (status: string | null | undefined) => {
  if (!status || typeof status !== 'string') {
    return 'bg-gray-100 text-gray-700';
  }
  
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-700',
    paid: 'bg-green-100 text-green-700',
    failed: 'bg-red-100 text-red-700',
    refunded: 'bg-blue-100 text-blue-700'
  };
  return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-700';
};

export const getPaymentMethodLabel = (method: string | null | undefined) => {
  if (!method || typeof method !== 'string') {
    return 'Unknown';
  }
  
  const labels: Record<string, string> = {
    gcash: 'GCash',
    maya: 'Maya',
    cod: 'Cash on Delivery',
    bank_transfer: 'Bank Transfer'
  };
  return labels[method.toLowerCase()] || method;
};
