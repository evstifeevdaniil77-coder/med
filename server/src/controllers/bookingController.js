import { validateBookingData } from '../validators/bookingValidator.js';
import { sendBookingNotification } from '../services/telegramService.js';

/**
 * Контроллер создания и отправки заявки на бронирование
 * POST /api/bookings
 */
export async function createBooking(req, res, next) {
  try {
    const rawData = req.body;

    // 1. Валидация входных данных, проверка Honeypot и санитизация
    const { isValid, isBot, errors, sanitized } = validateBookingData(rawData);

    if (isBot) {
      // Бот попался в ловушку Honeypot - мгновенный ответ без тревоги Telegram
      return res.status(400).json({
        success: false,
        message: 'Запрос отклонен системой защиты от спама',
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

    // 2. Генерация уникального номера заявки
    const bookingId = `MB-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toISOString();

    // 3. Отправка в Telegram
    let telegramResult;
    try {
      telegramResult = await sendBookingNotification(sanitized, bookingId);
    } catch (telegramError) {
      console.error('❌ Ошибка отправки в Telegram Bot API:', telegramError.message);
      return res.status(500).json({
        success: false,
        message: 'Не удалось доставить уведомление в Telegram-канал координатора',
        error: telegramError.message
      });
    }

    // 4. Успешный ответ
    return res.status(201).json({
      success: true,
      message: 'Заявка успешно отправлена! Наш координатор свяжется с вами в течение 15 минут.',
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
    next(error);
  }
}
