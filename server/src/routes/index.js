import { Router } from 'express';
import bookingRoutes from './bookingRoutes.js';
import clinicRoutes from './clinicRoutes.js';
import { config } from '../config/env.js';

const apiRouter = Router();

// Health Check эндпоинт для мониторинга (Render, Vercel, uptime robots)
apiRouter.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'MedBooking API',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    telegramConfigured: Boolean(config.telegram.botToken && config.telegram.chatId && !config.telegram.botToken.includes('FakeToken'))
  });
});

// Подключение подмаршрутов
apiRouter.use(bookingRoutes);
apiRouter.use(clinicRoutes);

export default apiRouter;
