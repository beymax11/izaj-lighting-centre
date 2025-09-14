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
app.use(cors());
app.use(express.json());

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