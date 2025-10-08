import express from 'express';
import cors from 'cors';

// Import route modules
import audit from './audit/server.js'
import auth from './auth/server.js'
import profile from './profile/server.js'
import user from './user/server.js'
import products from './product/server.js'
import stock from './stock/server.js'
import sale from './sales/server.js'

const app = express();

// CORS configuration to allow izaj-web to access the API
app.use(cors({
  origin: [
    'http://localhost:3000',  // Next.js default port
    'http://localhost:3001',  // Alternative Next.js port
    'http://localhost:3002',  // Current izaj-web port
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3002'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Test endpoint to verify API is working
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'izaj-desktop API is running!',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/admin', audit);
app.use('/api/admin', auth);
app.use('/api', profile);
app.use('/api/admin', user);
app.use('/api', products);
app.use('/api/products', stock);
app.use('/api/sales', sale);

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

// Global error handler (for thrown errors or next(err))
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
  });
});

// 404 handler (for unmatched routes)
app.use((req, res) => {
  console.log("🚨 404 ROUTE HIT:", req.method, req.originalUrl);
  res.status(404).json({ error: "Route not found", url: req.originalUrl });
});

// =============================================================================
// SERVER STARTUP
// =============================================================================
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});