/**
 * Валидатор и санитайзер данных бронирования
 * Защищает от ботов (Honeypot), XSS, инъекций и переполнения памяти
 */

// Регулярное выражение для проверки имени (кириллица, латиница, пробелы, дефисы)
const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-'.]{2,100}$/u;

// Регулярные выражения для телефона
const PHONE_CLEAN_REGEX = /[\s\-\(\)\.]/g;
const VALID_PHONE_DIGITS_REGEX = /^\+?[0-9]{7,16}$/;

// Опасные шаблоны XSS и инъекций
const DANGEROUS_PATTERNS = /<\s*script\b|javascript\s*:|data\s*:|vbscript\s*:|on\w+\s*=|document\s*\.|window\s*\.|eval\s*\(|<iframe|<object|<embed/i;

/**
 * Глубокая санитизация текста: удаление HTML-тегов, управляющих байтов и опасных конструкций
 * @param {string} input
 * @returns {string}
 */
export function sanitizeText(input = '') {
  if (typeof input !== 'string') return '';

  return input
    // Удаление нулевых байтов и опасных управляющих символов
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Удаление любых HTML/XML тегов
    .replace(/<[^>]*>/g, '')
    // Экранирование спецсимволов HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .trim();
}

/**
 * Валидация и санитизация тела запроса заявки
 * @param {Object} body Тело запроса
 * @returns {{ isValid: boolean, isBot: boolean, errors: string[], sanitized: Object }}
 */
export function validateBookingData(body = {}) {
  const errors = [];

  // 1. Проверка ловушки для ботов (Honeypot field)
  // Реальные пользователи не видят это поле, но автоматические спам-боты обязательно его заполняют
  const honeypot = (body.hp_user_website || body.hp_website || body.honey_token || '').toString().trim();
  const isBot = Boolean(honeypot.length > 0);

  if (isBot) {
    console.warn('🤖 [BOT DETECTED]: Сработала ловушка Honeypot! Значение:', honeypot);
    return {
      isValid: false,
      isBot: true,
      errors: ['Обнаружена автоматическая отправка формы'],
      sanitized: null
    };
  }

  const {
    patientName,
    patientPhone,
    clinicName,
    service,
    comment,
    desiredDate
  } = body;

  // 2. Валидация и санитизация имени пациента
  const rawName = (patientName || '').toString().trim();
  if (!rawName) {
    errors.push('Поле "patientName" (ФИО) обязательно для заполнения');
  } else if (rawName.length < 2) {
    errors.push('Имя пациента должно содержать не менее 2 символов');
  } else if (rawName.length > 100) {
    errors.push('Имя пациента не должно превышать 100 символов');
  } else if (DANGEROUS_PATTERNS.test(rawName)) {
    errors.push('Имя пациента содержит недопустимые символы или теги');
  } else if (!NAME_REGEX.test(rawName)) {
    errors.push('Имя пациента может содержать только буквы, пробелы и дефисы');
  }

  // 3. Валидация и санитизация номера телефона
  const rawPhone = (patientPhone || '').toString().trim();
  const cleanedPhone = rawPhone.replace(PHONE_CLEAN_REGEX, '');
  if (!rawPhone) {
    errors.push('Поле "patientPhone" (номер телефона) обязательно для заполнения');
  } else if (!VALID_PHONE_DIGITS_REGEX.test(cleanedPhone)) {
    errors.push('Неверный формат телефона. Укажите корректный номер (от 7 до 16 цифр), например: +992 90 123 4567 или +998 90 123 4567');
  }

  // 4. Валидация названия клиники
  const rawClinicName = (clinicName || '').toString().trim();
  if (!rawClinicName) {
    errors.push('Поле "clinicName" (название клиники) обязательно для заполнения');
  } else if (rawClinicName.length > 200) {
    errors.push('Название клиники слишком длинное (макс. 200 символов)');
  } else if (DANGEROUS_PATTERNS.test(rawClinicName)) {
    errors.push('Название клиники содержит недопустимые символы');
  }

  // 5. Санитизация сервиса и комментария
  const rawService = (service || '').toString().trim() || 'Первичная консультация и осмотр';
  const rawComment = (comment || '').toString().trim();

  if (rawComment.length > 2000) {
    errors.push('Комментарий слишком длинный (макс. 2000 символов)');
  }

  // 6. Валидация даты
  let sanitizedDate = null;
  if (desiredDate) {
    const parsedDate = new Date(desiredDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Поле "desiredDate" содержит некорректную дату');
    } else {
      sanitizedDate = parsedDate.toISOString().split('T')[0];
    }
  }

  // Формируем чистые, обезвреженные данные
  const sanitized = {
    patientName: sanitizeText(rawName),
    patientPhone: cleanedPhone.startsWith('+') ? cleanedPhone : `+${cleanedPhone}`,
    displayPhone: sanitizeText(rawPhone),
    clinicName: sanitizeText(rawClinicName),
    service: sanitizeText(rawService),
    comment: rawComment ? sanitizeText(rawComment) : 'Не указан',
    desiredDate: sanitizedDate || 'Ближайшая доступная дата'
  };

  return {
    isValid: errors.length === 0,
    isBot: false,
    errors,
    sanitized
  };
}
