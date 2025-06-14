import express from 'express';
import cors from 'cors';
import { supabase } from '../supabase/supabaseClient.js';
import sessionHandler from './sessionHandler.js';
import { logAuditEvent, AuditActions } from '../../src/util/auditLogger.js';

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

// ADD NEW USER (Only for users with role 'Admin')
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

// GET all admin users (Only for users with role 'Admin')
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

// EDIT admin/support user status (Only for Admins)
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

// DELETE admin/support user (Only for Admins)
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