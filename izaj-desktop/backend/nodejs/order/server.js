/**
 * Orders API Routes for izaj-desktop
 * Handles all order management endpoints
 */

import express from 'express';
import * as orders from './orders.js';

const router = express.Router();

console.log('✅ Orders router loaded');

/**
 * GET /api/orders
 * Get all orders with optional filters
 */
router.get('/orders', async (req, res) => {
  console.log('🔵 GET /api/orders endpoint hit');
  try {
    const { status, payment_status, date_from, date_to, search } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    if (payment_status) filters.payment_status = payment_status;
    if (date_from) filters.date_from = date_from;
    if (date_to) filters.date_to = date_to;
    if (search) filters.search = search;

    const result = await orders.getAllOrders(filters);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data,
        count: result.count
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in GET /api/orders:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/orders/:id
 * Get a single order by ID
 */
router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orders.getOrderById(id);
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(404).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in GET /api/orders/:id:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PUT /api/orders/status
 * Update order status
 */
router.put('/orders/status', async (req, res) => {
  try {
    const { orderId, newStatus, tracking_number, courier, admin_notes } = req.body;
    
    if (!orderId || !newStatus) {
      return res.status(400).json({
        success: false,
        error: 'orderId and newStatus are required'
      });
    }

    const options = {};
    if (tracking_number) options.tracking_number = tracking_number;
    if (courier) options.courier = courier;
    if (admin_notes) options.admin_notes = admin_notes;

    const result = await orders.updateOrderStatus(orderId, newStatus, options);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error in PUT /api/orders/status:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/orders/:id/approve
 * Approve an order
 */
router.post('/orders/:id/approve', async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_notes } = req.body;
    
    const result = await orders.approveOrder(id, { admin_notes });
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error approving order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/orders/:id/delivering
 * Mark order as delivering
 */
router.post('/orders/:id/delivering', async (req, res) => {
  try {
    const { id } = req.params;
    const { tracking_number, courier } = req.body;
    
    if (!tracking_number || !courier) {
      return res.status(400).json({
        success: false,
        error: 'tracking_number and courier are required'
      });
    }
    
    const result = await orders.markAsDelivering(id, tracking_number, courier);
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error marking as delivering:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/orders/:id/cancel
 * Cancel an order
 */
router.post('/orders/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    
    const result = await orders.cancelOrder(id, reason || 'Cancelled by admin');
    
    if (result.success) {
      res.json({
        success: true,
        message: result.message,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/orders/statistics
 * Get order statistics
 */
router.get('/orders/statistics', async (req, res) => {
  try {
    const result = await orders.getOrderStatistics();
    
    if (result.success) {
      res.json({
        success: true,
        data: result.data
      });
    } else {
      res.status(500).json({
        success: false,
        error: result.error
      });
    }
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;

