/**
 * Простой и надежный in-memory rate-limiter для защиты эндпоинта отправки заявок от спама
 */

const ipRequestsMap = new Map();

/**
 * Очистка устаревших записей каждые 10 минут
 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of ipRequestsMap.entries()) {
    if (now - data.firstRequestTime > 10 * 60 * 1000) {
      ipRequestsMap.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref?.();

/**
 * Middleware для ограничения частоты запросов
 * @param {number} maxRequests Максимум запросов
 * @param {number} windowMs Окно времени в миллисекундах (по умолчанию 5 минут)
 */
export function rateLimiter({ maxRequests = 15, windowMs = 5 * 60 * 1000 } = {}) {
  return (req, res, next) => {
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown-ip';
    const now = Date.now();

    const record = ipRequestsMap.get(ip);

    if (!record || now - record.firstRequestTime > windowMs) {
      ipRequestsMap.set(ip, {
        count: 1,
        firstRequestTime: now
      });
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.ceil((windowMs - (now - record.firstRequestTime)) / 1000);
      res.setHeader('Retry-After', retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: 'Слишком много запросов. Пожалуйста, подождите несколько минут перед следующей отправкой.',
        retryAfterSeconds
      });
    }

    record.count += 1;
    next();
  };
}
