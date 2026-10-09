import https from 'node:https';
import { config } from '../config/env.js';

/**
 * Экранирование спецсимволов для безопасного HTML-форматирования Telegram API
 * @param {string} text
 * @returns {string}
 */
function escapeHtml(text = '') {
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Выполнение HTTP POST-запроса через fetch или нативный https
 * @param {string} url
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
async function sendHttpRequest(url, payload) {
  const jsonPayload = JSON.stringify(payload);

  if (typeof fetch !== 'undefined') {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonPayload,
    });
    return await response.json();
  }

  // Fallback для сред без нативного fetch (Node < 18)
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(jsonPayload),
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (err) {
          reject(new Error(`Failed to parse Telegram response: ${data}`));
        }
      });
    });

    req.on('error', (err) => reject(err));
    req.write(jsonPayload);
    req.end();
  });
}

/**
 * Форматирование и отправка уведомления о заявке в Telegram-чат
 * @param {Object} bookingData
 * @param {string} bookingId
 * @returns {Promise<{ success: boolean, messageId?: number, simulated?: boolean }>}
 */
export async function sendBookingNotification(bookingData, bookingId) {
  const { botToken, chatId } = config.telegram;

  // Форматирование даты и времени в удобном виде (UTC+5 / местное время)
  const now = new Date();
  const formattedDateTime = now.toLocaleString('ru-RU', {
    timeZone: 'Asia/Tashkent',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  const cleanPhone = bookingData.patientPhone.replace(/\D/g, '');
  const waLink = `https://wa.me/${cleanPhone}`;

  // Красивое HTML-сообщение для Telegram
  const messageHtml = [
    `🏥 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ | MedBooking</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>Номер заявки:</b> <code>#${escapeHtml(bookingId)}</code>`,
    `🕒 <b>Время создания:</b> <code>${formattedDateTime} (UTC+5)</code>`,
    ``,
    `👤 <b>Пациент:</b> ${escapeHtml(bookingData.patientName)}`,
    `📞 <b>Телефон:</b> <a href="tel:${escapeHtml(bookingData.patientPhone)}">${escapeHtml(bookingData.displayPhone || bookingData.patientPhone)}</a>`,
    `💬 <b>WhatsApp:</b> <a href="${waLink}">Написать в WhatsApp</a>`,
    ``,
    `🏢 <b>Клиника / Рехаб:</b> ${escapeHtml(bookingData.clinicName)}`,
    `🩺 <b>Программа / Услуга:</b> ${escapeHtml(bookingData.service)}`,
    `🗓 <b>Желаемая дата:</b> ${escapeHtml(bookingData.desiredDate)}`,
    ``,
    `📝 <b>Комментарий:</b>`,
    `<i>${escapeHtml(bookingData.comment)}</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Рекомендуется связаться с пациентом в течение 15 минут!</i>`
  ].join('\n');

  // Если токен не настроен (режим разработки / теста)
  if (!botToken || !chatId || botToken.includes('YOUR_TELEGRAM_BOT_TOKEN') || botToken.includes('FakeToken')) {
    console.warn('\n⚠️ [TELEGRAM_SIMULATION] Токен Telegram бота не настроен в .env!');
    console.warn(`📩 Имитация отправки заявки #${bookingId} в Telegram:\n`);
    console.log(messageHtml.replace(/<[^>]+>/g, ''));
    console.warn('-------------------------------------------------------\n');
    return {
      success: true,
      simulated: true,
      message: 'Заявка обработана в режиме симуляции (добавьте TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID в .env)'
    };
  }

  const telegramApiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const payload = {
    chat_id: chatId,
    text: messageHtml,
    parse_mode: 'HTML',
    disable_web_page_preview: true,
    reply_markup: {
      inline_keyboard: [
        [
          { text: '💬 Открыть WhatsApp', url: waLink },
          { text: '🌐 Сайт MedBooking', url: 'https://evstifeevdaniil77-coder.github.io/med/' }
        ]
      ]
    }
  };

  try {
    const result = await sendHttpRequest(telegramApiUrl, payload);

    if (!result.ok) {
      const errorMsg = result.description || 'Неизвестная ошибка Telegram API';
      console.error(`❌ [TelegramService Error]: ${errorMsg} (Код: ${result.error_code})`);
      throw new Error(`Telegram Bot API Error: ${errorMsg}`);
    }

    console.log(`✅ [TelegramService]: Заявка #${bookingId} успешно отправлена в чат ${chatId}`);
    return {
      success: true,
      messageId: result.result?.message_id,
      simulated: false
    };
  } catch (error) {
    console.error('❌ [TelegramService Exception]:', error.message);
    throw error;
  }
}
