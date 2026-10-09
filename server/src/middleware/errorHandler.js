import { config } from '../config/env.js';

/**
 * Гибкий middleware для CORS
 */
export function corsMiddleware(req, res, next) {
  const requestOrigin = req.headers.origin;
  const allowedOrigins = config.corsOrigins;

  // Разрешаем запрос, если разрешены все (*) или заголовок origin в списке разрешенных
  if (allowedOrigins.includes('*') || (requestOrigin && allowedOrigins.includes(requestOrigin))) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin || '*');
  } else if (!requestOrigin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    // В dev-режиме разрешаем любой origin для удобства тестирования
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  next();
}

/**
 * Централизованный обработчик ошибок
 */
export function errorHandler(err, req, res, next) {
  console.error('🔥 [Unhandled Error]:', err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Внутренняя ошибка сервера';

  res.status(status).json({
    success: false,
    error: message,
    ...(config.isDev ? { stack: err.stack } : {})
  });
}

/**
 * Обработчик неизвестных маршрутов (404)
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    error: `Маршрут ${req.method} ${req.originalUrl} не найден на сервере MedBooking API`
  });
}
