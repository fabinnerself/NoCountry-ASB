import { Router, Request, Response } from 'express';
import DatabaseClient from '../config/database';

const router = Router();

router.get('/health', async (req: Request, res: Response) => {
  try {
    const dbConnected = await DatabaseClient.healthCheck();
    
    res.json({
      status: 'ok',
      version: 'fase2',
      timestamp: new Date().toISOString(),
      database: dbConnected ? 'connected' : 'disconnected',
      services: {
        api: 'ok',
        cohere: process.env.COHERE_API_KEY ? 'configured' : 'not configured'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      version: 'fase2',
      timestamp: new Date().toISOString(),
      database: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
