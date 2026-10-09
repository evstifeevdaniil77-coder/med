/**
 * Валидатор данных бронирования
 */

// Регулярное выражение для проверки имени (кириллица, латиница, пробелы, дефисы)
const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s\-'.]{2,100}$/u;

// Регулярное выражение для международного телефонного номера (E.164 и локальные форматы)
// Принимает: +992900000000, 998901234567, +90 532 123 4567, 89991234567 и т.д.
const PHONE_CLEAN_REGEX = /[\s\-\(\)\.]/g;
const VALID_PHONE_DIGITS_REGEX = /^\+?[0-9]{7,16}$/;

/**
 * Валидация тела запроса заявки
 * @param {Object} body
 * @returns {{ isValid: boolean, errors: string[], sanitized: Object }}
 */
export function validateBookingData(body = {}) {
  const errors = [];
  const {
    patientName,
    patientPhone,
    clinicName,
    service,
    comment,
    desiredDate
  } = body;

  // 1. Валидация имени пациента
  const rawName = (patientName || '').toString().trim();
  if (!rawName) {
    errors.push('Поле "patientName" (ФИО) обязательно для заполнения');
  } else if (rawName.length < 2) {
    errors.push('Имя пациента должно содержать не менее 2 символов');
  } else if (rawName.length > 100) {
    errors.push('Имя пациента не должно превышать 100 символов');
  } else if (!NAME_REGEX.test(rawName)) {
    errors.push('Имя пациента может содержать только буквы, пробелы и дефисы');
  }

  // 2. Валидация номера телефона
  const rawPhone = (patientPhone || '').toString().trim();
  const cleanedPhone = rawPhone.replace(PHONE_CLEAN_REGEX, '');
  if (!rawPhone) {
    errors.push('Поле "patientPhone" (номер телефона) обязательно для заполнения');
  } else if (!VALID_PHONE_DIGITS_REGEX.test(cleanedPhone)) {
    errors.push('Неверный формат телефона. Укажите корректный номер (от 7 до 16 цифр), например: +992 90 123 4567 или +998 90 123 4567');
  }

  // 3. Валидация названия клиники
  const rawClinicName = (clinicName || '').toString().trim();
  if (!rawClinicName) {
    errors.push('Поле "clinicName" (название клиники) обязательно для заполнения');
  } else if (rawClinicName.length > 200) {
    errors.push('Название клиники слишком длинное (макс. 200 символов)');
  }

  // 4. Очистка и санитизация сервиса и комментария
  const rawService = (service || '').toString().trim() || 'Первичная консультация и осмотр';
  const rawComment = (comment || '').toString().trim();
  if (rawComment.length > 2000) {
    errors.push('Комментарий слишком длинный (макс. 2000 символов)');
  }

  // 5. Валидация даты (если передана)
  let sanitizedDate = null;
  if (desiredDate) {
    const parsedDate = new Date(desiredDate);
    if (isNaN(parsedDate.getTime())) {
      errors.push('Поле "desiredDate" содержит некорректную дату');
    } else {
      sanitizedDate = parsedDate.toISOString().split('T')[0];
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitized: {
      patientName: rawName,
      patientPhone: cleanedPhone.startsWith('+') ? cleanedPhone : `+${cleanedPhone}`,
      displayPhone: rawPhone,
      clinicName: rawClinicName,
      service: rawService,
      comment: rawComment || 'Не указан',
      desiredDate: sanitizedDate || 'Ближайшая доступная дата'
    }
  };
}
