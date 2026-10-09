import { Router } from 'express';
import { getClinics, getClinicById, getMetadata } from '../controllers/clinicController.js';
import { generalApiLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Защита от перегрузки публичных эндпоинтов:
// Максимум 100 запросов в 1 минуту с одного IP
router.use(generalApiLimiter);

// GET /api/clinics
router.get('/clinics', getClinics);

// GET /api/clinics/:id
router.get('/clinics/:id', getClinicById);

// GET /api/meta
router.get('/meta', getMetadata);

export default router;
