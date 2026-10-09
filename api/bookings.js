import { validateBookingData } from '../server/src/validators/bookingValidator.js';
import { sendBookingNotification } from '../server/src/services/telegramService.js';

export default async function handler(req, res) {
  // Заголовки безопасности и CORS для Vercel Serverless
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: `Метод ${req.method} не разрешен. Используйте POST`
    });
  }

  try {
    const rawData = req.body || {};

    // 1. Валидация, Honeypot проверка и санитизация
    const { isValid, isBot, errors, sanitized } = validateBookingData(rawData);

    if (isBot) {
      return res.status(400).json({
        success: false,
        message: 'Запрос заблокирован системой безопасности',
        isBot: true
      });
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Ошибка валидации входных данных заявки',
        errors
      });
    }

    // 2. Генерация ID
    const bookingId = `MB-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();

    // 3. Отправка в Telegram
    const telegramResult = await sendBookingNotification(sanitized, bookingId);

    // 4. Ответ клиенту
    return res.status(201).json({
      success: true,
      message: 'Заявка успешно принята и отправлена координаторам',
      bookingId,
      data: {
        id: bookingId,
        patientName: sanitized.patientName,
        patientPhone: sanitized.patientPhone,
        clinicName: sanitized.clinicName,
        service: sanitized.service,
        desiredDate: sanitized.desiredDate,
        createdAt
      },
      telegram: {
        delivered: !telegramResult.simulated,
        simulated: Boolean(telegramResult.simulated)
      }
    });

  } catch (error) {
    console.error('Ошибка в Vercel Serverless Bookings:', error);
    return res.status(500).json({
      success: false,
      message: 'Внутренняя ошибка сервера при отправке заявки',
      error: error.message
    });
  }
}
