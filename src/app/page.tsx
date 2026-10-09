import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  Star,
  DollarSign,
  ArrowUpDown,
  X
} from 'lucide-react';
import { MOCK_CLINICS, CATEGORIES, CITIES, Clinic, Doctor, Service } from '../data/mockData';
import { Map } from '../components/Map';
import { BookingModal } from '../components/BookingModal';

interface HomePageProps {
  onNavigateToClinic?: (clinicId: string) => void;
}

// Distance calculation between coordinates (Haversine formula in km)
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

const PRICE_TIERS = [
  { label: 'Любая цена', max: 10000 },
  { label: 'до $500', max: 500 },
  { label: 'до $1 000', max: 1000 },
  { label: 'до $2 000', max: 2000 },
  { label: 'до $4 000', max: 4000 },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigateToClinic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('Все города');
  const [selectedCategory, setSelectedCategory] = useState<string>('Все категории');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc' | 'distance'>('rating');
  const [selectedClinicId, setSelectedClinicId] = useState<string | null>(null);

  // HTML5 Geolocation State
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [geoGranted, setGeoGranted] = useState(false);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingClinic, setBookingClinic] = useState<Clinic | null>(null);

  // Request HTML5 Geolocation
  const requestUserLocation = () => {
    if (!('geolocation' in navigator)) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGeoGranted(true);
        setSortBy('distance');
        setIsLocating(false);
      },
      () => {
        setIsLocating(false);
      },
      { timeout: 8000 }
    );
  };

  useEffect(() => {
    requestUserLocation();
  }, []);

  // Filter & Sort Clinics
  const filteredClinics = useMemo(() => {
    return MOCK_CLINICS.filter((clinic) => {
      if (selectedCity !== 'Все города' && clinic.city !== selectedCity) {
        return false;
      }
      if (selectedCategory !== 'Все категории' && clinic.category !== selectedCategory) {
        return false;
      }
      if (clinic.minPrice > maxPrice) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = clinic.name.toLowerCase().includes(q);
        const matchesCity = clinic.city.toLowerCase().includes(q);
        const matchesSpecialty = clinic.category.toLowerCase().includes(q);
        const matchesDoctors = clinic.doctors.some((d) => d.fullName.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
        if (!matchesName && !matchesCity && !matchesSpecialty && !matchesDoctors) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') {
        return a.minPrice - b.minPrice;
      }
      if (sortBy === 'price_desc') {
        return b.minPrice - a.minPrice;
      }
      if (sortBy === 'distance' && userLocation) {
        const distA = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
        const distB = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
        return distA - distB;
      }
      return b.rating - a.rating;
    });
  }, [selectedCity, selectedCategory, maxPrice, searchQuery, sortBy, userLocation]);

  const handleOpenBooking = (clinic: Clinic) => {
    setBookingClinic(clinic);
    setIsBookingOpen(true);
  };

  const handleClinicClick = (clinicId: string) => {
    setSelectedClinicId(clinicId);
    if (onNavigateToClinic) {
      onNavigateToClinic(clinicId);
    }
  };

  const hasActiveFilters = selectedCity !== 'Все города' || selectedCategory !== 'Все категории' || maxPrice < 10000 || searchQuery;

  return (
    <div className="pb-16 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Minimalist Hero Section */}
      <section className="pt-10 pb-6 text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
          Больницы, клиники и реабилитационные центры
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl">
          Прямое бронирование стационаров и запись к врачам в Душанбе, Ташкенте и Стамбуле.
        </p>

        {/* Clean Unified Search & Filter Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-2.5 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
          {/* Search Query */}
          <div className="relative flex-grow flex items-center">
            <Search className="absolute left-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск по названию, отделению или врачу..."
              className="w-full bg-transparent pl-10 pr-3 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="h-px sm:h-8 sm:w-px bg-slate-200 dark:bg-slate-800" />

          {/* City Filter */}
          <div className="flex items-center gap-1.5 px-2">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent py-2 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">{c}</option>
              ))}
            </select>
          </div>

          <div className="h-px sm:h-8 sm:w-px bg-slate-200 dark:bg-slate-800" />

          {/* Price Selector Dropdown */}
          <div className="flex items-center gap-1.5 px-2">
            <DollarSign className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="bg-transparent py-2 text-xs font-medium text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              {PRICE_TIERS.map((tier) => (
                <option key={tier.max} value={tier.max} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {tier.label}
                </option>
              ))}
            </select>
          </div>

          {/* Geolocation Button */}
          <button
            onClick={requestUserLocation}
            className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition cursor-pointer whitespace-nowrap ${
              geoGranted
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title="Определить ближайшие учреждения"
          >
            <Navigation className={`h-3.5 w-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{geoGranted ? 'Рядом со мной' : 'Мой город'}</span>
          </button>
        </div>

        {/* Clean Segmented Category Tabs & Quick Price Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <ArrowUpDown className="h-3 w-3" />
              <span>Сортировка:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-medium focus:outline-none cursor-pointer"
            >
              <option value="rating" className="bg-white dark:bg-slate-900">По рейтингу</option>
              <option value="price_asc" className="bg-white dark:bg-slate-900">Сначала дешевле</option>
              <option value="price_desc" className="bg-white dark:bg-slate-900">Сначала дороже</option>
              {userLocation && (
                <option value="distance" className="bg-white dark:bg-slate-900">По удаленности</option>
              )}
            </select>
          </div>
        </div>

        {/* Active Filters Clear Bar */}
        {hasActiveFilters && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span>Фильтры:</span>
            {selectedCity !== 'Все города' && (
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {selectedCity}
              </span>
            )}
            {selectedCategory !== 'Все категории' && (
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {selectedCategory}
              </span>
            )}
            {maxPrice < 10000 && (
              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                до ${maxPrice}
              </span>
            )}
            <button
              onClick={() => {
                setSelectedCity('Все города');
                setSelectedCategory('Все категории');
                setMaxPrice(10000);
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 underline ml-1 cursor-pointer"
            >
              <X className="h-3 w-3" />
              <span>Сбросить все</span>
            </button>
          </div>
        )}
      </section>

      {/* Main Content: Clean Split View (Catalog + Leaflet Map) */}
      <section className="mt-2">
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div>
            Найдено учреждений: <span className="font-semibold text-slate-800 dark:text-white">{filteredClinics.length}</span>
          </div>
          {maxPrice < 10000 && (
            <div className="text-[11px] text-slate-500">
              Бюджет до ${maxPrice}
            </div>
          )}
        </div>

        {filteredClinics.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">По выбранным параметрам ничего не найдено</p>
            <button
              onClick={() => {
                setSelectedCity('Все города');
                setSelectedCategory('Все категории');
                setMaxPrice(10000);
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-semibold text-slate-900 dark:text-white underline cursor-pointer"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (7 cols): Minimalist Cards */}
            <div className="lg:col-span-7 space-y-4">
              {filteredClinics.map((clinic) => {
                const distance = userLocation
                  ? calculateDistance(userLocation.lat, userLocation.lng, clinic.lat, clinic.lng)
                  : null;
                const isSelected = clinic.id === selectedClinicId;

                return (
                  <article
                    key={clinic.id}
                    onClick={() => setSelectedClinicId(clinic.id)}
                    className={`group bg-white dark:bg-slate-900 rounded-xl border p-4 transition-all duration-150 ${
                      isSelected
                        ? 'border-slate-900 dark:border-white ring-1 ring-slate-900 dark:ring-white'
                        : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image Thumbnail */}
                      <div className="sm:w-44 h-36 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 relative">
                        <img
                          src={clinic.images[0]}
                          alt={clinic.name}
                          className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-200"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                          {clinic.category}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          {/* Rating & Location line */}
                          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                            <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                              <Star className="h-3 w-3 fill-current text-amber-500" />
                              {clinic.rating}
                            </span>
                            <span>·</span>
                            <span>{clinic.city}</span>
                            {distance !== null && (
                              <>
                                <span>·</span>
                                <span className="font-mono">{distance} км</span>
                              </>
                            )}
                          </div>

                          {/* Clinic Name */}
                          <h3
                            onClick={() => handleClinicClick(clinic.id)}
                            className="text-base font-semibold text-slate-900 dark:text-white hover:text-slate-700 dark:hover:text-slate-300 transition cursor-pointer line-clamp-1 leading-snug"
                          >
                            {clinic.name}
                          </h3>

                          {/* Address */}
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {clinic.address}
                          </p>

                          {/* Short description */}
                          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {clinic.description}
                          </p>
                        </div>

                        {/* Price & Action Row */}
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
                          <div className="text-xs">
                            <span className="text-slate-400">от </span>
                            <span className="font-semibold text-slate-900 dark:text-white text-sm">${clinic.minPrice}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleClinicClick(clinic.id)}
                              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                            >
                              Подробнее
                            </button>
                            <button
                              onClick={() => handleOpenBooking(clinic)}
                              className="px-3.5 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 rounded-lg transition cursor-pointer"
                            >
                              Записаться
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Right Column (5 cols): Clean Integrated Map */}
            <div className="lg:col-span-5 sticky top-20">
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-2 shadow-xs transition-colors">
                <Map
                  clinics={filteredClinics}
                  selectedClinicId={selectedClinicId}
                  onSelectClinic={(id) => {
                    setSelectedClinicId(id);
                    if (onNavigateToClinic) onNavigateToClinic(id);
                  }}
                  userLocation={userLocation}
                  centerCity={selectedCity !== 'Все города' ? selectedCity : undefined}
                  className="h-[480px] rounded-lg"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Minimalist Trust Indicator Footer Section */}
      <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800" id="how-it-works">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-400">
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">100% Конфиденциальность</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Заявка передается непосредственно лечащему координатору клиники в защищенном режиме.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Аккредитованные врачи</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Все медицинские учреждения проверены и работают по международным стандартам JCI и ISO.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Прямые цены без наценок</h4>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              Официальные тарифы больниц с возможностью бесплатной консультации и бронирования.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        clinic={bookingClinic}
      />
    </div>
  );
};

export default HomePage;
