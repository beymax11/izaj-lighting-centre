/**
 * IZAJ Orders Controller
 * Handles all order-related operations for the desktop app
 * Status-based order management system
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role for admin operations

console.log('🔵 Orders module - SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Not set');
console.log('🔵 Orders module - SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Not set');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials! Check your .env file');
  console.error('   Required: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  throw new Error('Missing Supabase credentials in .env file');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
console.log('✅ Supabase client initialized for orders');

/**
 * Get all orders with optional filters
 * @param {Object} filters - Filter options
 * @returns {Promise<Array>}
 */
async function getAllOrders(filters = {}) {
  try {
    let query = supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        status_history:order_status_history(*)
      `)
      .order('created_at', { ascending: false });

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.payment_status) {
      query = query.eq('payment_status', filters.payment_status);
    }
    
    if (filters.date_from) {
      query = query.gte('created_at', filters.date_from);
    }
    
    if (filters.date_to) {
      query = query.lte('created_at', filters.date_to);
    }
    
    if (filters.search) {
      query = query.or(`order_number.ilike.%${filters.search}%,recipient_name.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;

    return {
      success: true,
      data: data,
      count: data.length
    };
  } catch (error) {
    console.error('Error getting orders:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get a single order by ID
 * @param {string} orderId 
 * @returns {Promise<Object>}
 */
async function getOrderById(orderId) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        items:order_items(*),
        status_history:order_status_history(
          *,
          order by created_at desc
        )
      `)
      .eq('id', orderId)
      .single();

    if (error) throw error;

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error getting order:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Update order status (main function for desktop app)
 * @param {string} orderId 
 * @param {string} newStatus 
 * @param {Object} options 
 * @returns {Promise<Object>}
 */
async function updateOrderStatus(orderId, newStatus, options = {}) {
  try {
    const validStatuses = ['pending', 'approved', 'delivering', 'delivered', 'complete', 'cancelled'];
    
    if (!validStatuses.includes(newStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const updateData = {
      status: newStatus
    };

    // Add optional fields
    if (options.tracking_number) {
      updateData.tracking_number = options.tracking_number;
    }
    
    if (options.courier) {
      updateData.courier = options.courier;
    }
    
    if (options.admin_notes) {
      updateData.admin_notes = options.admin_notes;
    }

    // Update the order
    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    // Get updated order with items
    const updatedOrder = await getOrderById(orderId);

    return {
      success: true,
      message: `Order status updated to ${newStatus}`,
      data: updatedOrder.data
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Approve order
 * @param {string} orderId 
 * @param {Object} options 
 * @returns {Promise<Object>}
 */
async function approveOrder(orderId, options = {}) {
  return await updateOrderStatus(orderId, 'approved', options);
}

/**
 * Mark order as delivering
 * @param {string} orderId 
 * @param {string} trackingNumber 
 * @param {string} courier 
 * @returns {Promise<Object>}
 */
async function markAsDelivering(orderId, trackingNumber, courier) {
  return await updateOrderStatus(orderId, 'delivering', {
    tracking_number: trackingNumber,
    courier: courier
  });
}

/**
 * Mark order as delivered
 * @param {string} orderId 
 * @returns {Promise<Object>}
 */
async function markAsDelivered(orderId) {
  return await updateOrderStatus(orderId, 'delivered');
}

/**
 * Mark order as complete
 * @param {string} orderId 
 * @returns {Promise<Object>}
 */
async function markAsComplete(orderId) {
  return await updateOrderStatus(orderId, 'complete');
}

/**
 * Cancel order
 * @param {string} orderId 
 * @param {string} reason 
 * @returns {Promise<Object>}
 */
async function cancelOrder(orderId, reason) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({
        status: 'cancelled',
        cancellation_reason: reason,
        cancelled_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Order cancelled successfully',
      data: data
    };
  } catch (error) {
    console.error('Error cancelling order:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get order statistics
 * @returns {Promise<Object>}
 */
async function getOrderStatistics() {
  try {
    // Get counts by status
    const { data: statusCounts, error: statusError } = await supabase
      .from('orders')
      .select('status')
      .then(result => {
        if (result.error) throw result.error;
        
        const counts = {
          pending: 0,
          approved: 0,
          delivering: 0,
          delivered: 0,
          complete: 0,
          cancelled: 0,
          total: result.data.length
        };
        
        result.data.forEach(order => {
          counts[order.status]++;
        });
        
        return { data: counts, error: null };
      });

    if (statusError) throw statusError;

    // Get total revenue
    const { data: revenueData, error: revenueError } = await supabase
      .from('orders')
      .select('total_amount')
      .in('status', ['delivered', 'complete'])
      .then(result => {
        if (result.error) throw result.error;
        
        const total = result.data.reduce((sum, order) => sum + parseFloat(order.total_amount), 0);
        
        return { data: total, error: null };
      });

    if (revenueError) throw revenueError;

    // Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: todayOrders, error: todayError } = await supabase
      .from('orders')
      .select('id')
      .gte('created_at', today.toISOString())
      .then(result => {
        if (result.error) throw result.error;
        return { data: result.data.length, error: null };
      });

    if (todayError) throw todayError;

    return {
      success: true,
      data: {
        status_counts: statusCounts,
        total_revenue: revenueData,
        today_orders: todayOrders
      }
    };
  } catch (error) {
    console.error('Error getting order statistics:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get pending orders count
 * @returns {Promise<number>}
 */
async function getPendingOrdersCount() {
  try {
    const { count, error } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (error) throw error;

    return {
      success: true,
      count: count
    };
  } catch (error) {
    console.error('Error getting pending orders count:', error);
    return {
      success: false,
      count: 0,
      error: error.message
    };
  }
}

/**
 * Update payment status
 * @param {string} orderId 
 * @param {string} paymentStatus 
 * @param {string} paymentReference 
 * @returns {Promise<Object>}
 */
async function updatePaymentStatus(orderId, paymentStatus, paymentReference = null) {
  try {
    const validPaymentStatuses = ['pending', 'paid', 'failed', 'refunded'];
    
    if (!validPaymentStatuses.includes(paymentStatus)) {
      throw new Error(`Invalid payment status: ${paymentStatus}`);
    }

    const updateData = {
      payment_status: paymentStatus
    };

    if (paymentReference) {
      updateData.payment_reference = paymentReference;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: `Payment status updated to ${paymentStatus}`,
      data: data
    };
  } catch (error) {
    console.error('Error updating payment status:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Add admin notes to order
 * @param {string} orderId 
 * @param {string} notes 
 * @returns {Promise<Object>}
 */
async function addAdminNotes(orderId, notes) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ admin_notes: notes })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      message: 'Admin notes added successfully',
      data: data
    };
  } catch (error) {
    console.error('Error adding admin notes:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Get order status history
 * @param {string} orderId 
 * @returns {Promise<Array>}
 */
async function getOrderStatusHistory(orderId) {
  try {
    const { data, error } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Error getting order status history:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  approveOrder,
  markAsDelivering,
  markAsDelivered,
  markAsComplete,
  cancelOrder,
  getOrderStatistics,
  getPendingOrdersCount,
  updatePaymentStatus,
  addAdminNotes,
  getOrderStatusHistory
};

