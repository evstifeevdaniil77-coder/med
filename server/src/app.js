import express from 'express';
import { corsMiddleware, errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import apiRouter from './routes/index.js';

export const app = express();

// Базовые middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

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
    version: '1.0.0',
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
