/**
 * Сервис гео-расчетов и фильтрации клиник по формуле Haversine
 */

const EARTH_RADIUS_KM = 6371;

/**
 * Расчет расстояния между двумя географическими точками по формуле Haversine
 * @param {number} lat1 Широта первой точки (градусы)
 * @param {number} lon1 Долгота первой точки (градусы)
 * @param {number} lat2 Широта второй точки (градусы)
 * @param {number} lon2 Долгота второй точки (градусы)
 * @returns {number} Расстояние в километрах с точностью до 1 знака после запятой
 */
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const radLat1 = toRadians(lat1);
  const radLat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(radLat1) * Math.cos(radLat2) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_KM * c;
  return Math.round(distance * 10) / 10;
}

/**
 * Фильтрация и сортировка клиник по геопозиции и параметрам поиска
 * @param {Array} clinics Массив объектов клиник
 * @param {Object} queryParams Параметры фильтрации (lat, lng, city, category, search, maxPrice, sortBy)
 * @returns {Array} Отфильтрованный и отсортированный массив клиник
 */
export function filterAndSortClinics(clinics, queryParams = {}) {
  const {
    lat,
    lng,
    city,
    category,
    search,
    maxPrice,
    sortBy = 'distance'
  } = queryParams;

  const userLat = lat !== undefined && lat !== null && lat !== '' ? parseFloat(lat) : null;
  const userLng = lng !== undefined && lng !== null && lng !== '' ? parseFloat(lng) : null;
  const hasUserCoords = userLat !== null && !isNaN(userLat) && userLng !== null && !isNaN(userLng);

  let result = clinics.map(clinic => {
    const clinicCopy = { ...clinic };
    if (hasUserCoords && clinic.lat != null && clinic.lng != null) {
      clinicCopy.distanceKm = calculateHaversineDistance(userLat, userLng, clinic.lat, clinic.lng);
    } else {
      clinicCopy.distanceKm = null;
    }
    return clinicCopy;
  });

  // Фильтрация по городу
  if (city && city !== 'Все города' && city.toLowerCase() !== 'all') {
    const cleanCity = city.trim().toLowerCase();
    result = result.filter(c => c.city && c.city.toLowerCase() === cleanCity);
  }

  // Фильтрация по категории
  if (category && category !== 'Все категории' && category.toLowerCase() !== 'all') {
    const cleanCategory = category.trim().toLowerCase();
    result = result.filter(c => c.category && c.category.toLowerCase() === cleanCategory);
  }

  // Фильтрация по предельной цене
  if (maxPrice && !isNaN(parseFloat(maxPrice))) {
    const numericMaxPrice = parseFloat(maxPrice);
    result = result.filter(c => (c.minPrice || 0) <= numericMaxPrice);
  }

  // Полнотекстовый поиск (по названию, адресу, описанию, врачам, услугам)
  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    result = result.filter(c => {
      const matchName = c.name?.toLowerCase().includes(query);
      const matchDesc = c.description?.toLowerCase().includes(query);
      const matchCity = c.city?.toLowerCase().includes(query);
      const matchAddress = c.address?.toLowerCase().includes(query);
      const matchDoctor = c.doctors?.some(d => d.fullName?.toLowerCase().includes(query) || d.specialty?.toLowerCase().includes(query));
      const matchService = c.services?.some(s => s.title?.toLowerCase().includes(query));
      return matchName || matchDesc || matchCity || matchAddress || matchDoctor || matchService;
    });
  }

  // Сортировка
  result.sort((a, b) => {
    // Если пользователь передал координаты и не выбрал явную сортировку (или выбрал distance)
    if (hasUserCoords && (sortBy === 'distance' || !sortBy)) {
      if (a.distanceKm !== null && b.distanceKm !== null) {
        return a.distanceKm - b.distanceKm;
      }
    }

    if (sortBy === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    }
    if (sortBy === 'price_asc') {
      return (a.minPrice || 0) - (b.minPrice || 0);
    }
    if (sortBy === 'price_desc') {
      return (b.minPrice || 0) - (a.minPrice || 0);
    }
    if (sortBy === 'reviews') {
      return (b.reviewCount || 0) - (a.reviewCount || 0);
    }
    if (sortBy === 'distance' && hasUserCoords) {
      return (a.distanceKm || 0) - (b.distanceKm || 0);
    }

    // По умолчанию: наивысший рейтинг
    return (b.rating || 0) - (a.rating || 0);
  });

  return result;
}
