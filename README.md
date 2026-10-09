# MedBooking / RehabConnect — Full-Stack & Backend Architecture

Международная веб-платформа для поиска и бронирования многопрофильных больниц, клиник и реабилитационных центров в Душанбе, Ташкенте и Стамбуле.

- **Фронтенд (Live):** [https://evstifeevdaniil77-coder.github.io/med/](https://evstifeevdaniil77-coder.github.io/med/)
- **Бэкенд:** Express.js REST API + Vercel Serverless Functions + Telegram Bot API

---

## 🏛 Архитектура Бэкенда

Проект построен по модульной архитектуре промышленного уровня:

```
medbooking.com/
├── api/                             # Serverless API для деплоя на Vercel
│   ├── bookings.js                  # POST /api/bookings (Serverless Function)
│   ├── clinics.js                   # GET /api/clinics (Serverless Function)
│   └── health.js                    # GET /api/health (Serverless Function)
├── server/                          # Модульный Express.js сервер
│   └── src/
│       ├── config/
│       │   └── env.js               # Чтение и валидация переменных окружения
│       ├── controllers/
│       │   ├── bookingController.js # Контроллер обработки и сохранения заявок
│       │   └── clinicController.js  # Контроллер поиска и фильтрации клиник
│       ├── data/
│       │   └── clinicsData.js       # База клиник Душанбе, Ташкента и Стамбула
│       ├── middleware/
│       │   ├── corsMiddleware.js    # Настройка CORS (GitHub Pages + Localhost)
│       │   ├── errorHandler.js      # Централизованная обработка ошибок (400, 404, 500)
│       │   └── rateLimiter.js       # Защита от спама и DoS-атак
│       ├── routes/
│       │   ├── bookingRoutes.js     # Маршруты заявок
│       │   ├── clinicRoutes.js      # Маршруты клиник
│       │   └── index.js             # Главный API роутер и Health Check
│       ├── services/
│       │   ├── geoService.js        # Формула Haversine и расчет расстояний
│       │   └── telegramService.js   # Интеграция с Telegram Bot API
│       └── app.js                   # Конфигурация Express приложения
├── server.js                        # Главный входной файл сервера (Render / VPS)
├── vercel.json                      # Конфигурация для мгновенного деплоя на Vercel
├── render.yaml                      # Спецификация для автоматического деплоя на Render
├── Dockerfile                       # Контейнеризация для Docker / Railway
├── .env.example                     # Шаблон переменных окружения
└── .env                             # Конфиденциальные ключи (в gitignore)
```

---

## 🤖 Настройка Telegram Бота для заявок

1. Откройте в Telegram бота [@BotFather](https://t.me/BotFather) и отправьте команду `/newbot`.
2. Задайте имя (например, `MedBooking Bot`) и юзернейм (например, `medbooking_alert_bot`).
3. Скопируйте полученный **HTTP API Token** (вида `7123456789:AAH...`).
4. Узнайте ваш **Telegram Chat ID**:
   - Напишите боту [@userinfobot](https://t.me/userinfobot) — он пришлет ваш цифровой `Id` (например, `123456789`).
   - *Для группы/канала*: добавьте бота в группу, выдайте права администратора и отправьте любое сообщение, либо используйте ID группы (обычно начинается с `-100...`).
5. Нажмите `/start` в вашем созданном боте, чтобы открыть с ним диалог.
6. Вставьте значения в файл `.env`:
   ```env
   TELEGRAM_BOT_TOKEN=ваш_токен_от_BotFather
   TELEGRAM_CHAT_ID=ваш_chat_id
   ```

---

## 📡 Спецификация API Endpoints

### 1. Отправка заявки на бронирование
`POST /api/bookings` или `POST /api/send-booking`

**Тело запроса (JSON):**
```json
{
  "patientName": "Шерзод Рахимов",
  "patientPhone": "+992900123456",
  "clinicName": "Многопрофильный Клинический Комплекс \"Истиклол\"",
  "service": "Кардиологический диагностический Check-up (3 дня)",
  "comment": "Жалобы на повышенное давление и одышку",
  "desiredDate": "2026-10-15"
}
```

**Ответ (201 Created):**
```json
{
  "success": true,
  "message": "Заявка успешно отправлена! Наш координатор свяжется с вами в течение 15 минут.",
  "bookingId": "MB-482910",
  "data": { ... },
  "telegram": { "delivered": true, "simulated": false }
}
```

**Ответ при ошибке валидации (400 Bad Request):**
```json
{
  "success": false,
  "message": "Ошибка валидации входных данных заявки",
  "errors": [
    "Имя пациента должно содержать не менее 2 символов",
    "Неверный формат телефона..."
  ]
}
```

---

### 2. Получение клиник и расчет геопозиции (Haversine)
`GET /api/clinics`

**Query-параметры:**
- `lat` (число) — широта пользователя (например, `38.56`)
- `lng` (число) — долгота пользователя (например, `68.78`)
- `city` (строка) — город (`Душанбе`, `Ташкент`, `Стамбул`, `Все города`)
- `category` (строка) — категория (`Больница`, `Рехаб`, `Наркология`, `Все категории`)
- `search` (строка) — ключевые слова для поиска по клинике/врачу/услуге
- `maxPrice` (число) — предельная цена
- `sortBy` (строка) — `distance`, `rating`, `price_asc`, `price_desc`

Если переданы `lat` и `lng`, бэкенд автоматически вычисляет расстояние в километрах до каждой клиники по **формуле Haversine** и добавляет поле `distanceKm`:
```json
{
  "success": true,
  "count": 5,
  "userLocation": { "lat": 38.56, "lng": 68.78 },
  "data": [
    {
      "id": "dushanbe-istiklol-hospital",
      "name": "Многопрофильный Клинический Комплекс \"Истиклол\"",
      "city": "Душанбе",
      "distanceKm": 2.6,
      ...
    }
  ]
}
```

---

## 💻 Локальный запуск

1. Установите зависимости:
   ```bash
   npm install
   ```
2. Создайте файл `.env` на основе `.env.example` и укажите переменные.
3. Запустите бэкенд сервер:
   ```bash
   npm run server
   ```
   Сервер запустится на порту `5000`: `http://localhost:5000`

---

## 🚀 Деплой бэкенда

### Вариант A. Бесплатный деплой на Vercel (Serverless) — Рекомендуется!
В репозитории уже подготовлена папка `api/` и файл `vercel.json`.

1. Установите Vercel CLI (или подключите GitHub-репозиторий в панели [vercel.com](https://vercel.com)):
   ```bash
   npx vercel
   ```
2. В панели проекта Vercel перейдите в **Settings -> Environment Variables** и добавьте:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NODE_ENV` = `production`
3. Ваше API сразу доступно по адресу `https://ваш-проект.vercel.app/api/bookings` и `https://ваш-проект.vercel.app/api/clinics`.

### Вариант B. Деплой на Render.com (Node.js Service)
В репозитории подготовлен файл `render.yaml`.

1. Создайте аккаунт на [render.com](https://render.com).
2. Нажмите **New + -> Web Service** и выберите репозиторий `medbooking.com`.
3. Настройки:
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
4. В разделе **Environment Variables** укажите:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `PORT` = `10000`
   - `CORS_ORIGIN` = `https://evstifeevdaniil77-coder.github.io`
5. Нажмите **Deploy Web Service**.

---

## 🔗 Подключение GitHub Pages фронтенда к бэкенду

Для того чтобы сайт на GitHub Pages отправлял заявки на ваш задеплоенный сервер:
В файле `index.html` перед подключением `app.js` достаточно добавить тег:
```html
<script>
  window.MEDBOOKING_API_URL = "https://ваш-проект.onrender.com"; // или https://ваш-проект.vercel.app
</script>
```
Или один раз в консоли браузера на сайте выполнить:
```javascript
localStorage.setItem('medbooking_api_url', 'https://ваш-проект.onrender.com');
```
Фронтенд автоматически направляет все вызовы на указанный бэкенд.
