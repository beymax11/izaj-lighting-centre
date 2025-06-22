import express from 'express';
import cors from 'cors';
import  { supabase } from './supabaseClient.js';
import sessionHandler from './sessionHandler.js';
import { supabase as productSupabase } from './supabaseProduct.js';
import { logAuditEvent, AuditActions } from './util/auditLogger.js';

const app = express();
app.use(cors());
app.use(express.json());

const generateAvatarUrl = (avatarPath) => {
  if (!avatarPath) {
    return '/profile.jpg';
  }

  try {
    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(avatarPath);
    
    return `${data.publicUrl}?t=${Date.now()}`;
  } catch (error) {
    console.error("Error generating avatar URL:", error);
    return '/profile.jpg';
  }
};

// Middleware for authentication
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authorization token required' });
    }

    const token = authHeader.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
};

// LOGIN ROUTE
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      await logAuditEvent(null, AuditActions.LOGIN, {
        email,
        success: false,
        error: error.message
      }, req);
      
      return res.status(401).json({ error: error.message });
    }

    await logAuditEvent(data.user.id, AuditActions.LOGIN, {
      email,
      success: true
    }, req);

    await sessionHandler.saveAdminSession(data.session);
    res.json({ 
      message: 'Login successful', 
      user: data.user, 
      session: data.session 
    });
  } catch (err) {
    console.error('Internal error:', err);
    return res.status(500).json({ 
      error: 'Request timed out or something went wrong', 
      details: err.message 
    });
  }
});

// UPDATE Profile Route
app.put('/api/profile/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, phone, address, password, avatar } = req.body;

    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Access denied. You can only update your own profile.' 
      });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ 
        error: 'Name is required' 
      });
    }

    let cleanAvatarPath = null;
    if (avatar) {
      cleanAvatarPath = avatar.replace(/^https?:\/\/[^/]+\/storage\/v1\/object\/public\/avatars\//, '');
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('adminUser')
      .update({
        name,
        contact: phone || null,
        address: address || null,
        avatar: cleanAvatarPath,
        last_login: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    if (updateError) {
      console.error("Error updating profile:", updateError);
      return res.status(500).json({ 
        error: 'Failed to update profile',
        details: updateError.message 
      });
    }

    if (!updatedUser) {
      return res.status(404).json({ 
        error: 'No rows were updated' 
      });
    }

    let passwordUpdated = false;
    if (password && password.trim()) {
      if (password.length < 6) {
        return res.status(400).json({ 
          error: 'Password must be at least 6 characters long' 
        });
      }

      const { error: passwordError } = await supabase.auth.admin.updateUserById(
        userId,
        { password }
      );

      if (passwordError) {
        console.error("Error updating password:", passwordError);
        console.warn("Password update failed, but profile was updated successfully");
      } else {
        passwordUpdated = true;
      }
    }

    await logAuditEvent(userId, AuditActions.UPDATE_PROFILE, {
      fieldsUpdated: {
        name: !!name,
        phone: !!phone,
        address: !!address,
        avatar: !!avatar,
        password: passwordUpdated
      },
      success: true
    }, req);

    let avatarUrl = generateAvatarUrl(updatedUser.avatar);

    const profileData = {
      name: updatedUser.name || '',
      email: req.user.email || '',
      phone: updatedUser.contact || '',
      role: updatedUser.role || '',
      address: updatedUser.address || '',
      avatar: avatarUrl,
      userId: updatedUser.user_id
    };

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      profile: profileData
    });

  } catch (error) {
    console.error("Server error in profile update:", error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// GET Profile Route
app.get('/api/profile/:userId', authenticate, async (req, res) => {
  try {
    const { userId } = req.params;
    
    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Access denied. You can only view your own profile.' 
      });
    }

    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (adminError) {
      console.error("Supabase error:", adminError);
      
      if (adminError.code === 'PGRST116') {
        return res.status(404).json({ 
          error: 'User profile not found' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Database error occurred',
        details: adminError.message 
      });
    }

    if (!adminUser) {
      return res.status(404).json({ 
        error: 'User profile not found' 
      });
    }

    const userEmail = req.user.email || '';
    let avatarUrl = generateAvatarUrl(adminUser.avatar);

    const profileData = {
      name: adminUser.name || '',
      email: userEmail,
      phone: adminUser.contact || '',
      role: adminUser.role || '',
      address: adminUser.address || '',
      avatar: avatarUrl,
      userId: adminUser.user_id
    };

    res.status(200).json({
      success: true,
      profile: profileData
    });

  } catch (error) {
    console.error("Server error in profile fetch:", error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// GET Profile Route (without userId in URL)
app.get('/api/profile', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (adminError) {
      console.error("Supabase error:", adminError);
      
      if (adminError.code === 'PGRST116') {
        return res.status(404).json({ 
          error: 'User profile not found' 
        });
      }
      
      return res.status(500).json({ 
        error: 'Database error occurred',
        details: adminError.message 
      });
    }

    if (!adminUser) {
      return res.status(404).json({ 
        error: 'User profile not found' 
      });
    }

    const profileData = {
      name: adminUser.name || '',
      email: req.user.email || '',
      phone: adminUser.contact || '',
      role: adminUser.role || '',
      address: adminUser.address || '',
      avatar: '/profile.jpg',
      userId: adminUser.user_id
    };

    res.status(200).json({
      success: true,
      profile: profileData
    });

  } catch (error) {
    console.error("Server error in profile fetch:", error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// Logout Route
app.post('/api/admin/logout', authenticate, async (req, res) => {
  try {
    await logAuditEvent(req.user.id, AuditActions.LOGOUT, {
      success: true
    }, req);

    const result = await sessionHandler.logoutAdmin();
    if (result.error) {
      console.error("Logout Error:", result.error);
      return res.status(500).json({ 
        error: 'Logout failed',
        details: result.error
      });
    }
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    console.error('Internal error during logout:', err);
    res.status(500).json({ 
      error: 'Request timed out or something went wrong',
      details: err.message 
    });
  }
});

// ADD User Route (Only for users with role 'Admin')
app.post('/api/admin/addUsers', authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== 'Admin') {
      return res.status(403).json({ error: 'Access denied. Only Admins can add users.' });
    }

    const { email, name, role } = req.body;

    if (!email || !name || !role) {
      return res.status(400).json({ error: 'Email, name, and role are required' });
    }

    const allowedRoles = ['Admin', 'Customer Support'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ error: 'Role must be Admin or Customer Support' });
    }

    const defaultPassword = 'admin1234';
    const { data, error } = await supabase.auth.signUp({
      email,
      password: defaultPassword,
    });

    if (error) {
      await logAuditEvent(req.user.id, AuditActions.CREATE_USER, {
        targetUser: { email, name, role },
        success: false,
        error: error.message
      }, req);
      
      return res.status(400).json({ error: error.message });
    }

    const userId = data.user.id;
    const { error: dbError } = await supabase
      .from('adminUser')
      .insert([{ user_id: userId, name, role }]);

    if (dbError) {
      await logAuditEvent(req.user.id, AuditActions.CREATE_USER, {
        targetUser: { email, name, role },
        success: false,
        error: dbError.message
      }, req);
      
      return res.status(500).json({ error: dbError.message });
    }

    await logAuditEvent(req.user.id, AuditActions.CREATE_USER, {
      targetUser: { 
        id: userId, 
        email, 
        name, 
        role 
      },
      success: true
    }, req);

    res.status(201).json({
      success: true,
      message: 'User created. Confirmation email sent.',
      user: { id: userId, email, name, role }
    });
  } catch (error) {
    console.error('Error creating admin user:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET all admins (Only for users with role 'Admin')
app.get('/api/admin/users', authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (adminError) {
      return res.status(500).json({ 
        error: 'Database error while checking admin status',
        details: adminError.message 
      });
    }

    if (!adminUser) {
      return res.status(404).json({ 
        error: 'Admin user profile not found. Please contact system administrator.' 
      });
    }

    if (adminUser.role !== 'Admin') {
      return res.status(403).json({ 
        error: `Access denied. Your role is '${adminUser.role}' but only 'Admin' users can view all users.` 
      });
    }

    const { data: users, error } = await supabase
      .from('adminUser')
      .select('*');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const usersWithEmail = [];
    
    for (const user of users || []) {
      try {
        const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(user.user_id);
        
        if (!authError && authUser?.user?.email) {
          usersWithEmail.push({
            ...user,
            email: authUser.user.email,
          });
        } else {
          usersWithEmail.push({
            ...user,
            email: 'Email not available',
          });
        }
      } catch (emailError) {
        console.warn(`Exception getting email for user ${user.user_id}:`, emailError);
        usersWithEmail.push({
          ...user,
          email: 'Email error',
        });
      }
    }

    res.status(200).json({ 
      success: true, 
      users: usersWithEmail,
      debug: {
        currentUserRole: adminUser.role,
        totalUsers: usersWithEmail.length
      }
    });
    
  } catch (error) {
    console.error('Error fetching admin users:', error);
    res.status(500).json({ 
      error: 'Internal server error', 
      details: error.message 
    });
  }
});

// EDIT user status (Only for Admins)
app.put('/api/admin/users/:id/status', authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== 'Admin') {
      return res.status(403).json({ error: 'Access denied. Only Admins can edit users.' });
    }

    const { status } = req.body;
    const { id } = req.params;

    if (typeof status !== 'boolean') {
      return res.status(400).json({ error: 'Status must be a boolean.' });
    }

    const { data: targetUser } = await supabase
      .from('adminUser')
      .select('name, role')
      .eq('user_id', id)
      .single();

    const { error: updateError } = await supabase
      .from('adminUser')
      .update({ status })
      .eq('user_id', id);

    if (updateError) {
      await logAuditEvent(req.user.id, AuditActions.UPDATE_STATUS, {
        targetUser: {
          id,
          name: targetUser?.name,
          role: targetUser?.role
        },
        newStatus: status,
        success: false,
        error: updateError.message
      }, req);
      
      return res.status(500).json({ error: updateError.message });
    }

    await logAuditEvent(req.user.id, AuditActions.UPDATE_STATUS, {
      targetUser: {
        id,
        name: targetUser?.name,
        role: targetUser?.role
      },
      newStatus: status,
      success: true
    }, req);

    res.json({ success: true, message: 'User status updated.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// DELETE user (Only for Admins)
app.delete('/api/admin/users/:id', authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== 'Admin') {
      return res.status(403).json({ error: 'Access denied. Only Admins can delete users.' });
    }

    const { id } = req.params;

    const { data: targetUser } = await supabase
      .from('adminUser')
      .select('name, role')
      .eq('user_id', id)
      .single();

    const { error: deleteError } = await supabase
      .from('adminUser')
      .delete()
      .eq('user_id', id);

    if (deleteError) {
      await logAuditEvent(req.user.id, AuditActions.DELETE_USER, {
        targetUser: {
          id,
          name: targetUser?.name,
          role: targetUser?.role
        },
        success: false,
        error: deleteError.message
      }, req);
      
      return res.status(500).json({ error: deleteError.message });
    }

    await logAuditEvent(req.user.id, AuditActions.DELETE_USER, {
      targetUser: {
        id,
        name: targetUser?.name,
        role: targetUser?.role
      },
      success: true
    }, req);

    res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// GET audit logs (Only for Admins)
app.get('/api/admin/audit-logs', authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from('adminUser')
      .select('role')
      .eq('user_id', req.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== 'Admin') {
      return res.status(403).json({ 
        error: 'Access denied. Only Admins can view audit logs.' 
      });
    }

    const { 
      page = 1, 
      limit = 50, 
      fromDate, 
      toDate, 
      action, 
      userId 
    } = req.query;

    let query = supabase
      .from('audit_logs')
      .select('*')
      .order('timestamp', { ascending: false });

    if (fromDate) {
      query = query.gte('timestamp', fromDate);
    }
    if (toDate) {
      query = query.lte('timestamp', toDate);
    }
    if (action) {
      query = query.eq('action', action);
    }
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: logs, error } = await query;

    if (error) {
      console.error('Error fetching audit logs:', error);
      return res.status(500).json({ error: 'Failed to fetch audit logs' });
    }

    res.json({
      success: true,
      logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: logs.length
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
});

// GET Products from Inventory DB and upsert into Client DB
app.get('/api/products', authenticate, async (req, res) => {
  try {
    const { after, limit = 100, sync } = req.query;

    if (!sync || sync === 'false') {
      return res.redirect('/api/products/existing');
    }

    let invQuery = productSupabase
      .from('centralized_product')
      .select(`
        id,
        product_name,
        quantity,
        price,
        status,
        category:category ( category_name ),
        branch:branch ( location )
      `)
      .order('created_at', { ascending: true })
      .limit(parseInt(limit, 10));

    if (after) invQuery = invQuery.gt('created_at', after);

    const { data: invRows, error: fetchErr } = await invQuery;
    if (fetchErr) {
      console.error('Error fetching products:', fetchErr);
      return res.status(500).json({
        error: 'Failed to fetch products',
        details: fetchErr.message
      });
    }

    if (!invRows?.length) {
      return res.json({
        success: true,
        products: [],
        synced: 0,
        skipped: 0,
        timestamp: new Date().toISOString()
      });
    }

    const rowsForClient = invRows.map((r) => ({
      product_id: r.id,
      product_name: r.product_name,
      quantity: r.quantity,
      price: r.price,
      status: r.status ?? 'active',
      category: r.category?.category_name?.trim() || null,
      branch: r.branch?.location?.trim() || null,
      is_published: false,
    }));

    const { data: upserted, error: upsertErr } = await supabase
      .from('products')
      .upsert(rowsForClient, {
        onConflict: 'product_id',
        ignoreDuplicates: false
      })
      .select();

    if (upsertErr) {
      console.error('Error inserting into client DB:', upsertErr);
      return res.status(500).json({
        error: 'Failed to insert products into client database',
        details: upsertErr.message
      });
    }

    const syncedCount = upserted ? upserted.length : rowsForClient.length;

    res.json({
      success: true,
      products: upserted,
      synced: syncedCount,
      skipped: Math.max(0, invRows.length - syncedCount),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error syncing products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to sync products'
    });
  }
});

// GET Products from Client DB (DB2) for display
app.get('/api/client-products', async (req, res) => {
  try {
    const { page = 1, limit = 100, status, category, search } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let query = supabase
      .from('products')
      .select(`
        id,
        product_id,
        product_name,
        quantity,
        price,
        status,
        category,
        branch,
        inserted_at
      `)
      .eq('is_published', true)
      .order('inserted_at', { ascending: false });

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (search && search.trim()) {
      query = query.ilike('product_name', `%${search.trim()}%`);
    }

    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data: products, error: fetchError, count } = await query;

    if (fetchError) {
      console.error('Error fetching client products:', fetchError);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch products from client database',
        details: fetchError.message
      });
    }

    const { count: totalCount, error: countError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
       .eq('is_published', true);

    if (countError) {
      console.error('Error getting product count:', countError);
    }

    res.json({
      success: true,
      products: products || [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalCount || 0,
        totalPages: Math.ceil((totalCount || 0) / parseInt(limit))
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Server error in client-products:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// GET Product categories from Client DB for filters
app.get('/api/client-products/categories', async (req, res) => {
  try {
    const { data: categories, error } = await supabase
      .from('products')
      .select('category')
      .not('category', 'is', null)
      .order('category');

    if (error) {
      console.error('Error fetching categories:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch categories',
        details: error.message
      });
    }

    // Get unique categories
    const uniqueCategories = [...new Set(categories.map(item => item.category))];

    res.json({
      success: true,
      categories: uniqueCategories,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Server error in categories:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});

// UPDATE product description & image URL in Client DB
app.put('/api/client-products/:id/configure', async (req, res) => {
  const { id } = req.params;
  const { description, image_url } = req.body;
  try {
    const { data, error } = await supabase
      .from('products')
      .update({ description, image_url })
      .eq('id', id)
      .select()
      .single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ success: true, product: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET existing products from Client DB
app.get('/api/products/existing', authenticate, async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select(`
        id,
        product_id,
        product_name,
        quantity,
        price,
        status,
        category,
        branch,
        description,
        image_url,
        is_published
      `)
      .eq('is_published', true)
      .order('inserted_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching existing products:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to fetch existing products',
        details: error.message
      });
    }

    res.json({
      success: true,
      products: products || []
    });
  } catch (error) {
    console.error('Error fetching existing products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch existing products'
    });
  }
});

// Get pending products count
app.get('/api/products/pending-count', authenticate, async (req, res) => {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', false);
  
  res.json({ count: count || 0 });
});

// Get pending products for modal
app.get('/api/products/pending', authenticate, async (req, res) => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', false);
  
  res.json({ success: true, products: data || [] });
});

// Publish selected products
app.post('/api/products/publish', authenticate, async (req, res) => {
  const { productIds } = req.body;
  
  const { data, error } = await supabase
    .from('products')
    .update({ is_published: true })
    .in('id', productIds);
  
  res.json({ success: !error });
});

// GET only product_id, product_name, and quantity for all published products
app.get('/api/products/stock-summary', authenticate, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('product_id, product_name, quantity')
      .eq('is_published', true);

    // Audit log: record the stock summary fetch
    await logAuditEvent(
      req.user.id,
      AuditActions.VIEW_STOCK_SUMMARY || 'VIEW_STOCK_SUMMARY',
      {
        action: 'Fetched stock summary',
        count: data ? data.length : 0,
        timestamp: new Date().toISOString()
      },
      req
    );

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json({ success: true, products: data || [] });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error', details: err.message });
  }
});









// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Catch-all route for 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});