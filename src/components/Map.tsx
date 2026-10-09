import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Clinic } from '../data/mockData';
import { useThemeMode } from '../context/ThemeModeContext';

interface MapProps {
  clinics: Clinic[];
  selectedClinicId?: string | null;
  onSelectClinic?: (clinicId: string) => void;
  userLocation?: { lat: number; lng: number } | null;
  centerCity?: string;
  className?: string;
}

const CITY_COORDINATES: Record<string, [number, number]> = {
  'Душанбе': [38.5737, 68.7844],
  'Ташкент': [41.3195, 69.2787],
  'Стамбул': [41.0369, 28.9850],
};

export const Map: React.FC<MapProps> = ({
  clinics,
  selectedClinicId,
  onSelectClinic,
  userLocation,
  centerCity,
  className = 'h-[460px] w-full rounded-xl',
}) => {
  const { isDark } = useThemeMode();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const userMarkerRef = useRef<L.Marker | null>(null);

  // Initialize Map with Official OpenStreetMap Tiles (100% Free, NO API KEY REQUIRED)
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    const defaultCenter: [number, number] = [41.3195, 69.2787];
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: 6,
      zoomControl: false,
    });

    // Official OpenStreetMap tile server
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstanceRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.invalidateSize();
    });
    resizeObserver.observe(mapContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Center when city or user location changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (centerCity && CITY_COORDINATES[centerCity]) {
      map.flyTo(CITY_COORDINATES[centerCity], 12, { duration: 1.0 });
    } else if (userLocation) {
      map.flyTo([userLocation.lat, userLocation.lng], 13, { duration: 1.0 });
    } else if (clinics.length > 0) {
      const bounds = L.latLngBounds(clinics.map((c) => [c.lat, c.lng]));
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
    }
  }, [centerCity, userLocation, clinics]);

  // Update User Location Marker
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        className: 'user-geo-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="absolute inline-flex h-6 w-6 rounded-full ${isDark ? 'bg-cyan-400/30' : 'bg-slate-900/20'}"></span>
            <div class="relative flex h-4 w-4 items-center justify-center rounded-full border-2 border-white ${isDark ? 'bg-cyan-400' : 'bg-slate-900'} shadow">
              <div class="h-1.5 w-1.5 rounded-full bg-white"></div>
            </div>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon })
        .addTo(map)
        .bindPopup('<div class="p-1 text-xs font-medium text-slate-800">Вы здесь</div>');
      userMarkerRef.current = marker;
    }
  }, [userLocation, isDark]);

  // Update Clinic Markers
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    clinics.forEach((clinic) => {
      const isSelected = clinic.id === selectedClinicId;

      const markerIcon = L.divIcon({
        className: 'clinic-custom-marker',
        html: `
          <div class="group cursor-pointer transition-transform duration-150 ${isSelected ? 'scale-110 z-30' : 'hover:scale-105'}">
            <div class="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold shadow-sm border transition ${
              isSelected
                ? isDark ? 'bg-white text-slate-950 border-white' : 'bg-slate-900 text-white border-slate-900'
                : isDark ? 'bg-slate-900 text-white border-slate-700 hover:border-white' : 'bg-white text-slate-900 border-slate-300 hover:border-slate-800'
            }">
              <span>★</span>
              <span>${clinic.rating}</span>
            </div>
            <div class="mx-auto h-1 w-1 rotate-45 ${
              isSelected
                ? isDark ? 'bg-white' : 'bg-slate-900'
                : isDark ? 'bg-slate-900 border-r border-b border-slate-700' : 'bg-white border-r border-b border-slate-300'
            }"></div>
          </div>
        `,
        iconSize: [60, 32],
        iconAnchor: [30, 28],
        popupAnchor: [0, -28],
      });

      const marker = L.marker([clinic.lat, clinic.lng], { icon: markerIcon }).addTo(map);

      // Popup
      const popupHtml = `
        <div class="w-60 p-2 font-sans ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}">
          <div class="h-24 w-full overflow-hidden rounded mb-2 bg-slate-100">
            <img src="${clinic.images[0]}" alt="${clinic.name}" class="h-full w-full object-cover" />
          </div>
          <h4 class="font-semibold text-xs leading-tight line-clamp-1">${clinic.name}</h4>
          <p class="mt-0.5 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} line-clamp-1">${clinic.address}, ${clinic.city}</p>
          <div class="mt-2 flex items-center justify-between border-t ${isDark ? 'border-slate-800' : 'border-slate-100'} pt-2">
            <span class="text-xs font-semibold">от $${clinic.minPrice}</span>
            <button id="popup-btn-${clinic.id}" class="rounded ${isDark ? 'bg-white text-slate-900 hover:bg-slate-200' : 'bg-slate-900 text-white hover:bg-slate-800'} px-2 py-1 text-[11px] font-medium transition cursor-pointer">
              Подробнее
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, { maxWidth: 260, closeButton: false });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-btn-${clinic.id}`);
        if (btn && onSelectClinic) {
          btn.onclick = () => onSelectClinic(clinic.id);
        }
      });

      marker.on('click', () => {
        if (onSelectClinic) onSelectClinic(clinic.id);
      });

      markersRef.current.push(marker);
    });
  }, [clinics, selectedClinicId, onSelectClinic, isDark]);

  return (
    <div className={`relative overflow-hidden border border-slate-200/80 dark:border-slate-800 ${className}`}>
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
};

export default Map;
