import { Router } from 'express';
import { getClinics, getClinicById, getMetadata } from '../controllers/clinicController.js';

const router = Router();

// GET /api/clinics
router.get('/clinics', getClinics);

// GET /api/clinics/:id
router.get('/clinics/:id', getClinicById);

// GET /api/meta
router.get('/meta', getMetadata);

export default router;
