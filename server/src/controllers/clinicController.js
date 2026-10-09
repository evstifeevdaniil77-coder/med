import { CLINICS_DATA, CATEGORIES_LIST } from '../data/clinicsData.js';
import { filterAndSortClinics } from '../services/geoService.js';

/**
 * Получение списка клиник с фильтрацией и расчетом расстояния по Haversine
 * GET /api/clinics?lat=...&lng=...&city=...&category=...&search=...&maxPrice=...
 */
export function getClinics(req, res, next) {
  try {
    const { lat, lng, city, category, search, maxPrice, sortBy } = req.query;

    const filtered = filterAndSortClinics(CLINICS_DATA, {
      lat,
      lng,
      city,
      category,
      search,
      maxPrice,
      sortBy
    });

    return res.status(200).json({
      success: true,
      count: filtered.length,
      userLocation: (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
      filtersApplied: {
        city: city || 'Все города',
        category: category || 'Все категории',
        search: search || null,
        maxPrice: maxPrice ? parseFloat(maxPrice) : null,
        sortBy: sortBy || (lat && lng ? 'distance' : 'rating')
      },
      data: filtered
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Получение информации о конкретной клинике по её ID
 * GET /api/clinics/:id
 */
export function getClinicById(req, res, next) {
  try {
    const { id } = req.params;
    const clinic = CLINICS_DATA.find(c => c.id === id);

    if (!clinic) {
      return res.status(404).json({
        success: false,
        error: `Клиника с идентификатором "${id}" не найдена`
      });
    }

    return res.status(200).json({
      success: true,
      data: clinic
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Получение метаданных: доступные города, категории, диапазоны цен
 * GET /api/meta
 */
export function getMetadata(req, res, next) {
  try {
    const cities = [...new Set(CLINICS_DATA.map(c => c.city))];
    const prices = CLINICS_DATA.map(c => c.minPrice || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return res.status(200).json({
      success: true,
      categories: CATEGORIES_LIST,
      cities: ['Все города', ...cities],
      priceRange: { min: minPrice, max: maxPrice }
    });
  } catch (error) {
    next(error);
  }
}
