import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../../frontend/dist');

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Production Static Serving: Serve compiled React frontend if frontend/dist exists
if (fs.existsSync(distPath)) {
  console.log(` Serving static production frontend from: ${distPath}`);
  app.use(express.static(distPath));

  // Catch-all route to serve React's index.html for SPA routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(distPath, 'index.html'));
  });
} else {
  // Development greeting if frontend is not built
  app.get('/', (req, res) => {
    res.json({
      name: 'TripMate Backend API',
      tagline: 'AI-Powered Budget Travel Planner',
      version: '1.0.0',
      status: 'online',
      message: 'Frontend dist not found. Run "npm run build" in frontend or start Vite dev server on port 5173.'
    });
  });
}

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

app.listen(PORT, () => {
  console.log(` TripMate Unified Production Server running on port ${PORT}`);
  console.log(` Access application at: http://localhost:${PORT}`);
  console.log(` Health check at: http://localhost:${PORT}/api/health`);
});
