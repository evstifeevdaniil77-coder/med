/**
 * Middleware для установки базовых HTTP-заголовков безопасности (Security Headers)
 * Защищает от Clickjacking, MIME-sniffing, XSS и навязывания небезопасного контента
 */
export function securityHeaders(req, res, next) {
  // Защита от MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Защита от встраивания в iframe на чужих доменах (Clickjacking)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Базовый фильтр XSS для старых браузеров
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Политика передачи referrer
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // HSTS (HTTP Strict Transport Security) - принудительный HTTPS
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Запрет несанкционированного доступа к камере и микрофону
  res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()');

  // Скрытие версии сервера
  res.removeHeader('X-Powered-By');

  next();
}
