import { Router } from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { bookingLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Защита от спама и DoS-атак на Telegram:
// Максимум 5 заявок в 10 минут с одного IP-адреса
router.post('/bookings', bookingLimiter, createBooking);
router.post('/send-booking', bookingLimiter, createBooking);

export default router;
