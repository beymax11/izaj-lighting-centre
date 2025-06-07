import express from 'express';
import cors from 'cors';
import { supabase } from '../supabase/supabaseClient.js';
import sessionHandler from './sessionHandler.js';

const app = express();
app.use(cors());
app.use(express.json());

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
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

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
    const { name, phone, address, password } = req.body;

    // Validate userId parameter
    if (!userId) {
      return res.status(400).json({ 
        error: 'User ID is required' 
      });
    }

    // Check if the authenticated user is updating their own profile
    if (req.user.id !== userId) {
      return res.status(403).json({ 
        error: 'Access denied. You can only update your own profile.' 
      });
    }

    // Validate required fields
    if (!name || !name.trim()) {
      return res.status(400).json({ 
        error: 'Name is required' 
      });
    }

    console.log("Updating profile for user_id:", userId);

    // Update adminUser table (now using just 'name')
    const { data: updatedUser, error: updateError } = await supabase
      .from('adminUser')
      .update({
        name,
        contact: phone || null,
        address: address || null,
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

    // Update password if provided
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
        // Don't fail the entire request if just password update fails
        console.warn("Password update failed, but profile was updated successfully");
      }
    }

    // Return updated profile data
    const profileData = {
      name: updatedUser.name || '',
      email: req.user.email || '',
      phone: updatedUser.contact || '',
      role: updatedUser.role || 'Admin',
      address: updatedUser.address || '',
      avatar: '/profile.webp',
      userId: updatedUser.user_id
    };

    console.log("Profile updated successfully:", profileData);

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
    
    // Validate userId parameter
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

    const profileData = {
      name: adminUser.name || '',
      email: userEmail,
      phone: adminUser.contact || '',
      role: adminUser.role || '',
      address: adminUser.address || '',
      avatar: '/profile.webp', // default avatar
      userId: adminUser.user_id
    };

    console.log("Sending profile data:", profileData);

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
      avatar: '/profile.webp',
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