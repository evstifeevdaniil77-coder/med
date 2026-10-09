/**
 * Мощная система Rate Limiting для защиты API от DDoS и спам-атак
 * Поддерживает Cloudflare WAF headers (CF-Connecting-IP), X-Real-IP и X-Forwarded-For
 */

const ipRequestsMap = new Map();

/**
 * Извлечение реального IP клиента с учетом Cloudflare, Reverse Proxy и Load Balancer
 * @param {import('express').Request} req
 * @returns {string}
 */
export function getClientIp(req) {
  // 1. Приоритет: Cloudflare Connecting IP (гарантирован Cloudflare WAF)
  const cfIp = req.headers['cf-connecting-ip'];
  if (cfIp) return String(cfIp).trim();

  // 2. Nginx / Ingress Real IP
  const realIp = req.headers['x-real-ip'];
  if (realIp) return String(realIp).trim();

  // 3. X-Forwarded-For (берем первый IP из цепочки прокси)
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) {
    const list = String(forwarded).split(',');
    if (list.length > 0 && list[0].trim()) {
      return list[0].trim();
    }
  }

  // 4. Прямой сокет TCP
  return req.socket?.remoteAddress || 'unknown-ip';
}

/**
 * Периодическая очистка устаревших записей (каждые 3 минуты)
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, data] of ipRequestsMap.entries()) {
    if (now - data.firstRequestTime > 15 * 60 * 1000) {
      ipRequestsMap.delete(key);
    }
  }
}, 3 * 60 * 1000).unref?.();

/**
 * Фабрика middleware для ограничения частоты запросов
 * @param {Object} options
 * @param {number} options.maxRequests Максимальное число запросов в окне
 * @param {number} options.windowMs Длительность окна в миллисекундах
 * @param {string} options.prefix Префикс ключа для разделения эндпоинтов
 * @param {string} options.message Сообщение об ошибке
 */
export function createRateLimiter({
  maxRequests = 60,
  windowMs = 60 * 1000,
  prefix = 'global',
  message = 'Слишком много запросов. Попробуйте позже.'
} = {}) {
  return (req, res, next) => {
    const ip = getClientIp(req);
    const key = `${prefix}:${ip}`;
    const now = Date.now();

    const record = ipRequestsMap.get(key);

    if (!record || now - record.firstRequestTime > windowMs) {
      ipRequestsMap.set(key, {
        count: 1,
        firstRequestTime: now
      });

      // Передаем заголовки оставшихся лимитов
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', maxRequests - 1);
      return next();
    }

    if (record.count >= maxRequests) {
      const retryAfterSeconds = Math.max(1, Math.ceil((windowMs - (now - record.firstRequestTime)) / 1000));
      res.setHeader('Retry-After', retryAfterSeconds);
      res.setHeader('X-RateLimit-Limit', maxRequests);
      res.setHeader('X-RateLimit-Remaining', 0);

      console.warn(`🚨 [RateLimit Exceeded]: IP ${ip} превысил лимит на ${prefix} (${record.count}/${maxRequests}). Блокировка на ${retryAfterSeconds}s.`);

      return res.status(429).json({
        success: false,
        error: message,
        retryAfterSeconds
      });
    }

    record.count += 1;
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', maxRequests - record.count);
    next();
  };
}

/**
 * 1. Общий Rate Limiter для публичного API (получение списка клиник, поиск, meta):
 * Лимит: максимум 100 запросов в 1 минуту с одного IP
 */
export const generalApiLimiter = createRateLimiter({
  maxRequests: 100,
  windowMs: 60 * 1000,
  prefix: 'api_general',
  message: 'Слишком много запросов к API. Попробуйте позже.'
});

/**
 * 2. Строгий Rate Limiter для критических эндпоинтов (/api/bookings, отправка заявок):
 * Лимит: максимум 5 запросов в 10 минут с одного IP для защиты Telegram-бота от спама и DoS
 */
export const bookingLimiter = createRateLimiter({
  maxRequests: 5,
  windowMs: 10 * 60 * 1000,
  prefix: 'booking_post',
  message: 'Слишком много запросов на бронирование. Пожалуйста, подождите перед следующей отправкой.'
});

// Экспорт по умолчанию для обратной совместимости
export const rateLimiter = createRateLimiter;
