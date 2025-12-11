import express, { Application } from 'express';
import cors from 'cors';
import storyRoutes from './routes/story.routes';
import healthRoutes from './routes/health.routes';
import logger from './utils/logger';

const app: Application = express();

// Middleware - CORS configurado para múltiples orígenes
const allowedOrigins = [
  process.env.FRONTEND_URL_LOCAL || 'http://localhost:3000',
  process.env.FRONTEND_URL || 'https://asb-delta.vercel.app',
  'http://localhost:5173', // Vite dev server (por si acaso)
  'http://localhost:3000'  // Fallback
];

app.use(cors({
  origin: (origin, callback) => {
    // Permitir requests sin origin (como Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/', healthRoutes);
app.use('/api', storyRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado'
  });
});

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

export default app;
