import { app } from './server/src/app.js';
import { config } from './server/src/config/env.js';

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🏥 MedBooking API Server запущен на порту ${PORT}`);
  console.log(`🌐 Локальный URL: http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`📋 Список клиник: http://localhost:${PORT}/api/clinics`);
  console.log(`📩 Прием заявок: POST http://localhost:${PORT}/api/bookings`);
  console.log(`🤖 Telegram Bot: ${config.telegram.botToken ? 'Настроен ✅' : 'Ожидает токен в .env ⚠️'}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});

// Корректное завершение работы процесса (Graceful Shutdown)
function handleShutdown(signal) {
  console.log(`\n🛑 Получен сигнал ${signal}. Завершение работы MedBooking API...`);
  server.close(() => {
    console.log('✅ HTTP-сервер успешно остановлен.');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('⚠️ Принудительное завершение по таймауту.');
    process.exit(1);
  }, 10000);
}

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));
