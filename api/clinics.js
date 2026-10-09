import { CLINICS_DATA } from '../server/src/data/clinicsData.js';
import { filterAndSortClinics } from '../server/src/services/geoService.js';

export default function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      error: `Метод ${req.method} не разрешен. Используйте GET`
    });
  }

  try {
    const { lat, lng, city, category, search, maxPrice, sortBy, id } = req.query;

    // Если запрошена конкретная клиника по ID
    if (id) {
      const clinic = CLINICS_DATA.find(c => c.id === id);
      if (!clinic) {
        return res.status(404).json({
          success: false,
          error: `Клиника с id "${id}" не найдена`
        });
      }
      return res.status(200).json({ success: true, data: clinic });
    }

    // Иначе список клиник с фильтрацией и Haversine
    const result = filterAndSortClinics(CLINICS_DATA, {
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
      count: result.length,
      userLocation: (lat && lng) ? { lat: parseFloat(lat), lng: parseFloat(lng) } : null,
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
