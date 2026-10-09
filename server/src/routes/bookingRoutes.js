import { Router } from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { rateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Защита от спама: не более 10 заявок с одного IP в течение 5 минут
const bookingLimiter = rateLimiter({ maxRequests: 10, windowMs: 5 * 60 * 1000 });

// POST /api/bookings или /api/send-booking
router.post('/bookings', bookingLimiter, createBooking);
router.post('/send-booking', bookingLimiter, createBooking);

export default router;
