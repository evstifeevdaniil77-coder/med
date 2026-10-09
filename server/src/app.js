import express from 'express';
import { corsMiddleware, errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { securityHeaders } from './middleware/securityHeaders.js';
import apiRouter from './routes/index.js';

export const app = express();

// Доверие обратному прокси (Cloudflare, Nginx, Render, Vercel)
// Позволяет корректно определять IP клиента для Rate Limiting
app.set('trust proxy', 1);

// Защитные HTTP-заголовки
app.use(securityHeaders);

// Лимит размера тела запроса (защита от атак переполнения памяти)
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: true, limit: '50kb' }));

// Настройка CORS
app.use(corsMiddleware);

// Логирование запросов в консоль
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Корневой информационный маршрут
app.get('/', (req, res) => {
  res.json({
    service: 'MedBooking & RehabConnect Backend API',
    version: '1.1.0',
    security: {
      rateLimiting: 'Active (100 req/min general, 5 req/10min bookings)',
      honeypotAntiBot: 'Enabled',
      headers: 'HSTS, X-Frame-Options, NoSniff'
    },
    documentation: {
      health: 'GET /api/health',
      clinics: 'GET /api/clinics?lat=...&lng=...&city=...&category=...&search=...&maxPrice=...',
      clinicById: 'GET /api/clinics/:id',
      meta: 'GET /api/meta',
      createBooking: 'POST /api/bookings'
    },
    status: 'online'
  });
});

// Подключение API
app.use('/api', apiRouter);

// Обработка 404
app.use(notFoundHandler);

// Централизованная обработка ошибок
app.use(errorHandler);
