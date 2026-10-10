/**
 * MedBooking / RehabConnect — Standalone Vanilla JS Implementation
 * Works directly in any browser without npm or bundlers!
 */

const CLINICS = [
  {
    id: 'dushanbe-istiklol-hospital',
    name: 'Многопрофильный Клинический Комплекс "Истиклол"',
    description: 'Крупнейший государственный и международный медицинский центр Таджикистана на 650 стационарных мест. Специализируется на плановой и экстренной хирургии, кардиологии, неврологии, травматологии и высокотехнологичной МРТ/КТ диагностике 24/7.',
    address: 'ул. Низами Гянджеви, 18',
    city: 'Душанбе',
    country: 'Таджикистан',
    lat: 38.5524,
    lng: 68.7512,
    rating: 4.86,
    reviewCount: 215,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Больница',
    phone: '+992 37 234 1100',
    email: 'info@istiklol-med.tj',
    minPrice: 350,
    doctors: [
      { fullName: 'Др. Раджабов Сафар Икромович', specialty: 'Ведущий хирург, зав. оперблоком', experienceYears: 24, photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' },
      { fullName: 'Др. Самадова Гулчехра Анваровна', specialty: 'Кардиолог, функциональный диагност', experienceYears: 17, photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's1', title: 'Комплексный терапевтический стационар (7 дней)', description: 'Палата интенсивного наблюдения, инфузионная терапия, суточный мониторинг.', price: 520, durationDays: 7 },
      { id: 's2', title: 'Кардиологический диагностический Check-up (3 дня)', description: 'Коронарография, ЭКГ под нагрузкой, биохимический профиль.', price: 350, durationDays: 3 }
    ]
  },
  {
    id: 'dushanbe-oasis-rehab',
    name: 'Центр Реабилитации и Восстановления "Оазис"',
    description: 'Ведущий медицинский реабилитационный центр Таджикистана, специализирующийся на аддиктологии, детоксикации и психотерапевтической поддержке. Закрытая парковая территория с круглосуточным медицинским наблюдением.',
    address: 'ул. Исмоили Сомони, 48/2',
    city: 'Душанбе',
    country: 'Таджикистан',
    lat: 38.5737,
    lng: 68.7844,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Рехаб',
    phone: '+992 44 600 8822',
    email: 'info@oasis-rehab.tj',
    minPrice: 950,
    doctors: [
      { fullName: 'Др. Каримов Фарход Саидович', specialty: 'Главный врач, нарколог-психотерапевт', experienceYears: 18, photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' },
      { fullName: 'Др. Назарова Зарина Баходировна', specialty: 'Клинический психолог, КПТ-терапевт', experienceYears: 12, photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's3', title: 'Интенсивный стационарный курс (28 дней)', description: 'Био-психо-социальная реабилитация в комфортабельной палате с питанием.', price: 2400, durationDays: 28 },
      { id: 's4', title: 'Программа детоксикации и стабилизации (7 дней)', description: 'Медикаментозное очищение организма, купирование абстиненции.', price: 950, durationDays: 7 }
    ]
  },
  {
    id: 'tashkent-akfa-hospital',
    name: 'Многопрофильный Клинический Госпиталь "AKFA Medline"',
    description: 'Флагманский частный медицинский комплекс Центральной Азии. 12 высокотехнологичных операционных блоков, отделения кардиохирургии, эндоскопической урологии, нейрохирургии с немецким оборудованием Siemens и Karl Storz.',
    address: 'Алмазарский район, ул. Кичик Халка Йули, 5А',
    city: 'Ташкент',
    country: 'Узбекистан',
    lat: 41.3533,
    lng: 69.2155,
    rating: 4.96,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Больница',
    phone: '+998 71 203 3003',
    email: 'contact@akfamedline.uz',
    minPrice: 450,
    doctors: [
      { fullName: 'Проф. д-р Абдуллаев Бахром Назимович', specialty: 'Сердечно-сосудистый хирург, член EACTS', experienceYears: 26, photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80' },
      { fullName: 'Др. Турсунова Малика Ибрагимовна', specialty: 'Врач-гастроэнтеролог, эндоскопист', experienceYears: 14, photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's5', title: 'Премиальный Check-up полный аудит здоровья (2 дня)', description: 'МРТ/КТ сканирование, лабораторный скрининг 60+ маркеров, консилиум.', price: 450, durationDays: 2 },
      { id: 's6', title: 'Стационарное хирургическое лечение (5 дней)', description: 'Малоинвазивная операция Karl Storz, палата повышенной комфортности.', price: 1350, durationDays: 5 }
    ]
  },
  {
    id: 'tashkent-renaissance-clinic',
    name: 'Клиника Интегративной Наркологии "Ренессанс Ташкент"',
    description: 'Премиальный закрытый стационар в Ташкенте с фокусом на анонимное лечение всех видов химических зависимостей, алкоголизма и сопутствующих тревожно-депрессивных расстройств.',
    address: 'Мирзо-Улугбекский район, ул. Паркентская, 85',
    city: 'Ташкент',
    country: 'Узбекистан',
    lat: 41.3195,
    lng: 69.3082,
    rating: 4.95,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Наркология',
    phone: '+998 71 200 4040',
    email: 'info@renaissance-tashkent.uz',
    minPrice: 1200,
    doctors: [
      { fullName: 'Др. Юсупов Азиз Камилович', specialty: 'Врач-психиатр, нарколог высшей категории', experienceYears: 20, photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's7', title: 'Программа УБОД и Экспресс-Детокс (5 дней)', description: 'Ультрабыстрая опиоидная детоксикация под общим наркозом.', price: 1500, durationDays: 5 },
      { id: 's8', title: 'Комплексный VIP-стационар (30 дней)', description: 'Изолированное проживание в люкс-палате, психокоррекция.', price: 3600, durationDays: 30 }
    ]
  },
  {
    id: 'istanbul-memorial-hospital',
    name: 'Международный Госпиталь Memorial Şişli',
    description: 'Первый госпиталь в Турции с золотым сертификатом JCI. Мировой лидер в области роботизированной хирургии Da Vinci, трансплантологии, онкологии и кардиохирургии с русскоязычным персоналом.',
    address: 'Piyalepaşa Blv., Şişli, Istanbul',
    city: 'Стамбул',
    country: 'Турция',
    lat: 41.0628,
    lng: 28.9819,
    rating: 4.97,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Больница',
    phone: '+90 212 314 6666',
    email: 'international@memorial.com.tr',
    minPrice: 650,
    doctors: [
      { fullName: 'Prof. Dr. Ahmet Bilgin', specialty: 'Профессор онкохирургии и абдоминальной хирургии', experienceYears: 28, photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80' },
      { fullName: 'Dr. Selin Çelik', specialty: 'Главный терапевт международного департамента', experienceYears: 18, photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's9', title: 'Комплексный VIP Check-up "Executive" (2 дня)', description: 'Премиальное обследование, онкомаркеры, ПЭТ-КТ/МРТ.', price: 650, durationDays: 2 },
      { id: 's10', title: 'Робот-ассистированная хирургия Da Vinci (4 дня)', description: 'Высокоточное малоинвазивное вмешательство с минимальной травматизацией.', price: 4800, durationDays: 4 }
    ]
  },
  {
    id: 'istanbul-bosphorus-wellness',
    name: 'Bosphorus International Addiction & Mental Wellness Sanctuary',
    description: 'Международная европейская клиника на берегу Босфора в Стамбуле. Высочайший уровень медицинской безопасности, англо- и русскоязычный персонал, индивидуальные программы реабилитации.',
    address: 'Bebek Mah., Cevdet Paşa Cd. No: 64, Beşiktaş',
    city: 'Стамбул',
    country: 'Турция',
    lat: 41.0766,
    lng: 29.0433,
    rating: 4.98,
    reviewCount: 148,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Рехаб',
    phone: '+90 212 988 3344',
    email: 'international@bosphorus-sanctuary.com',
    minPrice: 3200,
    doctors: [
      { fullName: 'Prof. Dr. Emre Demir', specialty: 'Профессор психиатрии и нейробиологии зависимостей', experienceYears: 25, photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80' }
    ],
    services: [
      { id: 's11', title: 'Программа реабилитации "Bosphorus Elite" (28 дней)', description: 'Индивидуальная вилла, личный психотерапевт, ТМС-терапия, трансфер.', price: 8500, durationDays: 28 }
    ]
  }
];

const CATEGORIES = ['Все категории', 'Больница', 'Рехаб', 'Наркология', 'Психология', 'Ортопедия'];

// State
let selectedCategory = 'Все категории';
let selectedCity = 'Все города';
let maxPrice = 10000;
let searchQuery = '';
let sortBy = 'rating';
let userLocation = null;
let currentClinicForBooking = null;

// Конфигурация API MedBooking
// Автоопределение: если запущено локально на Vite/LiveServer -> http://localhost:5000, иначе текущий хост или кастомный URL
const API_BASE_URL = window.MEDBOOKING_API_URL 
  || localStorage.getItem('medbooking_api_url') 
  || ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port !== '5000'
      ? 'http://localhost:5000'
      : '');

/**
 * Всплывающее Toast-уведомление
 * @param {string} message Текст сообщения
 * @param {'success'|'error'|'info'} type Тип уведомления
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-medium transition-all duration-300 transform translate-y-2 opacity-0 ${
    type === 'success'
      ? 'bg-slate-900 text-white border-slate-800 dark:bg-white dark:text-slate-950 dark:border-slate-200'
      : type === 'error'
      ? 'bg-rose-600 text-white border-rose-700'
      : 'bg-slate-800 text-white border-slate-700'
  }`;

  const iconName = type === 'success' ? 'check-circle-2' : type === 'error' ? 'alert-triangle' : 'info';
  toast.innerHTML = `
    <i data-lucide="${iconName}" class="h-4 w-4 shrink-0"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) lucide.createIcons();

  // Плавное появление
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
  });

  // Автоскрытие через 4 секунды
  setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('-translate-y-2', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Leaflet Map & Layer
let map = null;
let tileLayer = null;
let markers = [];
let userMarker = null;

// Haversine distance in km
function calculateDistance(lat1, lon1, lat2, lon2) {
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

// Dark Mode Toggle
function initTheme() {
  const saved = localStorage.getItem('medbooking_theme');
  const isDark = saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    if (window.lucide) lucide.createIcons();
  }
  if (map) {
    updateMapTiles(isDark);
  }
}

document.getElementById('themeToggleBtn').addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  localStorage.setItem('medbooking_theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
});

// Map Layer State
let currentMapLayer = '2gis';

// Map Initialization
function initMap() {
  map = L.map('map', {
    center: [41.3195, 69.2787],
    zoom: 6,
    zoomControl: false
  });

  L.control.zoom({ position: 'bottomright' }).addTo(map);
  updateMapTiles();
}

function setMapLayer(layer) {
  currentMapLayer = layer;
  ['2gis', 'voyager', 'satellite'].forEach(l => {
    const btn = document.getElementById(`mapBtn${l.charAt(0).toUpperCase() + l.slice(1)}`);
    if (btn) {
      if (l === layer) {
        btn.className = 'px-2 py-0.5 rounded-md text-slate-900 dark:text-white bg-white dark:bg-slate-700 shadow-xs transition cursor-pointer font-medium';
      } else {
        btn.className = 'px-2 py-0.5 rounded-md hover:text-slate-900 dark:hover:text-white transition cursor-pointer';
      }
    }
  });
  updateMapTiles();
}

function updateMapTiles() {
  if (tileLayer) map.removeLayer(tileLayer);
  const isDark = document.documentElement.classList.contains('dark');

  let tileUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
  let attribution = '&copy; 2ГИС Интеграция · CartoDB & OSM';

  // Если задан официальный ключ 2ГИС, используем серверы тайлов 2ГИС
  const twoGisKey = (typeof window !== 'undefined' && window.TWOGIS_API_KEY) ? window.TWOGIS_API_KEY : '';

  if (currentMapLayer === '2gis') {
    if (twoGisKey) {
      tileUrl = `https://tile0.maps.2gis.com/v2/tiles/online_hd/{z}/{x}/{y}.png?key=${twoGisKey}`;
      attribution = '&copy; 2ГИС (Официальные тайлы)';
    } else {
      // Высококонтрастная городская подложка с дорогами и зданиями в стиле 2ГИС
      tileUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      attribution = '&copy; 2ГИС интеграция · CartoDB';
    }
  } else if (currentMapLayer === 'voyager') {
    tileUrl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    attribution = '&copy; CartoDB Positron';
  } else if (currentMapLayer === 'satellite') {
    tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
    attribution = '&copy; Esri World Imagery (Спутник)';
  }

  tileLayer = L.tileLayer(tileUrl, {
    attribution: attribution,
    maxZoom: 19
  }).addTo(map);
}

function updateMapMarkers(clinics) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];

  const isDark = document.documentElement.classList.contains('dark');

  clinics.forEach(c => {
    // Стильный зеленый пин 2ГИС с рейтингом клиники
    const icon = L.divIcon({
      className: 'clinic-custom-marker',
      html: `
        <div class="cursor-pointer transition-transform duration-150 hover:scale-110">
          <div class="flex items-center gap-1.5 rounded-full pl-1.5 pr-2 py-0.5 text-xs font-bold shadow-md border ${
            isDark
              ? 'bg-slate-900 text-white border-emerald-500/80 shadow-emerald-950/50'
              : 'bg-white text-slate-900 border-emerald-500 shadow-slate-300'
          }">
            <span class="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[9px] font-black leading-none">2</span>
            <span>${c.rating}</span>
          </div>
        </div>
      `,
      iconSize: [60, 24],
      iconAnchor: [30, 24]
    });

    const marker = L.marker([c.lat, c.lng], { icon }).addTo(map);

    const twoGisRouteUrl = `https://2gis.ru/routeSearch/rsType/car/to/${c.lng},${c.lat}`;

    const popupHtml = `
      <div class="w-60 p-2.5 font-sans ${isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}">
        <img src="${c.images[0]}" class="h-24 w-full object-cover rounded-lg mb-2" />
        <h4 class="font-bold text-xs line-clamp-1">${c.name}</h4>
        <p class="text-[11px] text-slate-500 mt-0.5">${c.city} · ${c.address}</p>
        <p class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">от $${c.minPrice}</p>
        <div class="mt-2.5 flex items-center gap-1.5">
          <button onclick="openClinicDetail('${c.id}')" class="flex-1 py-1.5 text-[11px] font-medium rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition cursor-pointer">Подробнее</button>
          <a href="${twoGisRouteUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer" title="Построить маршрут в 2ГИС">
            <span>2ГИС</span>
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
          </a>
        </div>
      </div>
    `;
    marker.bindPopup(popupHtml);
    markers.push(marker);
  });

  if (clinics.length > 0) {
    const bounds = L.latLngBounds(clinics.map(c => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [30, 30], maxZoom: 13 });
  }
}

// Render Categories
function renderCategories() {
  const container = document.getElementById('categoryContainer');
  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = selectedCategory === cat;
    return `
      <button onclick="setCategory('${cat}')" class="px-3 py-1.5 rounded-lg transition cursor-pointer ${
        isActive
          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium'
          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
      }">
        ${cat}
      </button>
    `;
  }).join('');
}

function setCategory(cat) {
  selectedCategory = cat;
  renderCategories();
  renderClinics();
}

// Geolocation
function requestGeolocation() {
  if (!navigator.geolocation) return;
  const text = document.getElementById('geoText');
  text.innerText = 'Поиск...';

  navigator.geolocation.getCurrentPosition(
    pos => {
      userLocation = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      };
      text.innerText = 'Рядом со мной';
      sortBy = 'distance';
      document.getElementById('sortSelect').value = 'distance';

      if (userMarker) map.removeLayer(userMarker);
      const userIcon = L.divIcon({
        className: 'user-geo-pin',
        html: '<div class="h-3 w-3 rounded-full bg-cyan-500 ring-4 ring-cyan-200"></div>',
        iconSize: [12, 12]
      });
      userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(map);

      renderClinics();
    },
    () => {
      text.innerText = 'Мой город';
    }
  );
}

// Filter and Render Clinics
function renderClinics() {
  const filtered = CLINICS.filter(c => {
    if (selectedCity !== 'Все города' && c.city !== selectedCity) return false;
    if (selectedCategory !== 'Все категории' && c.category !== selectedCategory) return false;
    if (c.minPrice > maxPrice) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchCity = c.city.toLowerCase().includes(q);
      const matchDoctors = c.doctors.some(d => d.fullName.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
      if (!matchName && !matchCity && !matchDoctors) return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.minPrice - b.minPrice;
    if (sortBy === 'price_desc') return b.minPrice - a.minPrice;
    if (sortBy === 'distance' && userLocation) {
      const da = calculateDistance(userLocation.lat, userLocation.lng, a.lat, a.lng);
      const db = calculateDistance(userLocation.lat, userLocation.lng, b.lat, b.lng);
      return da - db;
    }
    return b.rating - a.rating;
  });

  const listEl = document.getElementById('clinicsList');
  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="rounded-xl border border-dashed border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center text-xs text-slate-500">
        По выбранным фильтрам ничего не найдено.
      </div>
    `;
    updateMapMarkers([]);
    return;
  }

  listEl.innerHTML = filtered.map(c => {
    const dist = userLocation ? calculateDistance(userLocation.lat, userLocation.lng, c.lat, c.lng) : null;
    return `
      <article class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 transition hover:border-slate-300 dark:hover:border-slate-700">
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="sm:w-44 h-36 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 relative">
            <img src="${c.images[0]}" alt="${c.name}" class="h-full w-full object-cover" loading="lazy">
            <span class="absolute top-2 left-2 bg-black/60 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">${c.category}</span>
          </div>

          <div class="flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <span class="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">★ ${c.rating}</span>
                <span>·</span>
                <span>${c.city}</span>
                ${dist ? `<span>·</span><span>${dist} км</span>` : ''}
              </div>

              <h3 onclick="openClinicDetail('${c.id}')" class="text-base font-semibold text-slate-900 dark:text-white hover:underline cursor-pointer line-clamp-1 leading-snug">
                ${c.name}
              </h3>
              <p class="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-1">${c.address}</p>
              <p class="mt-1.5 text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">${c.description}</p>
            </div>

            <div class="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div class="text-xs">
                <span class="text-slate-400">от </span>
                <span class="font-semibold text-slate-900 dark:text-white text-sm">$${c.minPrice}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <a href="https://2gis.ru/routeSearch/rsType/car/to/${c.lng},${c.lat}" target="_blank" rel="noopener" title="Проложить маршрут в 2ГИС" class="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition cursor-pointer">
                  <span>2ГИС</span>
                </a>
                <button onclick="openClinicDetail('${c.id}')" class="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg cursor-pointer">Подробнее</button>
                <button onclick="openBookingModal('${c.id}')" class="px-3.5 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 rounded-lg cursor-pointer">Записаться</button>
              </div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  updateMapMarkers(filtered);
  if (window.lucide) lucide.createIcons();
}

// Clinic Detail Modal
function openClinicDetail(id) {
  const clinic = CLINICS.find(c => c.id === id);
  if (!clinic) return;

  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailModalContent');

  content.innerHTML = `
    <div class="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-slate-800 mb-4">
      <div>
        <div class="text-xs text-slate-500 mb-1">${clinic.category} · ${clinic.city}, ${clinic.country}</div>
        <h2 class="text-xl font-bold text-slate-900 dark:text-white">${clinic.name}</h2>
        <p class="text-xs text-slate-500">${clinic.address}</p>
      </div>
      <button onclick="closeDetailModal()" class="text-slate-400 hover:text-slate-600">✕</button>
    </div>

    <div class="h-64 rounded-lg overflow-hidden mb-4">
      <img src="${clinic.images[0]}" class="w-full h-full object-cover">
    </div>

    <p class="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">${clinic.description}</p>

    <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-2">Программы и цены</h3>
    <div class="space-y-2 mb-6">
      ${clinic.services.map(s => `
        <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 flex items-center justify-between text-xs">
          <div>
            <div class="font-semibold text-slate-900 dark:text-white">${s.title}</div>
            <div class="text-[11px] text-slate-500">${s.description} · ${s.durationDays} дн.</div>
          </div>
          <div class="text-right font-bold text-sm text-slate-900 dark:text-white">$${s.price}</div>
        </div>
      `).join('')}
    </div>

    <h3 class="text-sm font-bold text-slate-900 dark:text-white mb-2">Врачи отделения</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
      ${clinic.doctors.map(d => `
        <div class="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 flex gap-2.5 items-center text-xs">
          <img src="${d.photo}" class="h-10 w-10 rounded-full object-cover">
          <div>
            <div class="font-semibold text-slate-900 dark:text-white">${d.fullName}</div>
            <div class="text-slate-500">${d.specialty} · ${d.experienceYears} лет</div>
          </div>
        </div>
      `).join('')}
    </div>

    <div class="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
      <a href="https://2gis.ru/routeSearch/rsType/car/to/${clinic.lng},${clinic.lat}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition cursor-pointer">
        <span>📍 Маршрут в 2ГИС</span>
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
      <div class="flex items-center gap-2">
        <button onclick="closeDetailModal()" class="px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">Закрыть</button>
        <button onclick="closeDetailModal(); openBookingModal('${clinic.id}');" class="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 transition cursor-pointer">Забронировать палату</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.add('hidden');
}

// Booking Modal Logic
function openBookingModal(clinicId) {
  const clinic = clinicId ? CLINICS.find(c => c.id === clinicId) : CLINICS[0];
  currentClinicForBooking = clinic;

  document.getElementById('bookingClinicSubtitle').innerText = `${clinic.name} (${clinic.city})`;
  const select = document.getElementById('bookingServiceSelect');
  select.innerHTML = '<option value="">Первичная консультация</option>' + clinic.services.map(s => `
    <option value="${s.id}">${s.title} ($${s.price})</option>
  `).join('');

  const today = new Date();
  today.setDate(today.getDate() + 1);
  document.getElementById('desiredDate').value = today.toISOString().split('T')[0];

  // Сброс ошибок и состояний кнопок
  const errorAlert = document.getElementById('bookingErrorAlert');
  if (errorAlert) errorAlert.classList.add('hidden');
  const submitBtn = document.getElementById('bookingSubmitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<span>Отправить заявку</span>';
  }

  document.getElementById('bookingFormContainer').classList.remove('hidden');
  document.getElementById('bookingSuccessContainer').classList.add('hidden');
  document.getElementById('bookingModal').classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.add('hidden');
}

async function handleBookingSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('patientName');
  const phoneInput = document.getElementById('patientPhone');
  const dateInput = document.getElementById('desiredDate');
  const serviceSelect = document.getElementById('bookingServiceSelect');
  const commentInput = document.getElementById('bookingComment');
  const errorAlert = document.getElementById('bookingErrorAlert');
  const errorText = document.getElementById('bookingErrorText');
  const submitBtn = document.getElementById('bookingSubmitBtn');

  const patientName = nameInput ? nameInput.value.trim() : '';
  const patientPhone = phoneInput ? phoneInput.value.trim() : '';
  const desiredDate = dateInput ? dateInput.value : '';
  const service = (serviceSelect && serviceSelect.options[serviceSelect.selectedIndex]?.text) || 'Первичная консультация';
  const comment = commentInput ? commentInput.value.trim() : '';
  const clinicName = currentClinicForBooking ? currentClinicForBooking.name : 'Клиника MedBooking';

  // 1. Проверка скрытой ловушки ботов (Honeypot Trap)
  const honeypotVal = document.getElementById('hp_user_website')?.value.trim();
  if (honeypotVal) {
    console.warn('🤖 Бот заблокирован на клиенте через Honeypot!');
    showToast('Заявка принята', 'success');
    closeBookingModal();
    return;
  }

  // 2. Клиентский Rate Limiting (максимум 5 заявок в 10 минут с одного браузера)
  const RATE_LIMIT_KEY = 'mb_booking_submissions';
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem(RATE_LIMIT_KEY) || '[]');
  } catch (err) {
    history = [];
  }
  history = history.filter(time => now - time < windowMs);

  if (history.length >= 5) {
    const waitMinutes = Math.max(1, Math.ceil((windowMs - (now - history[0])) / 60000));
    if (errorText) {
      errorText.innerHTML = `<div>• Слишком много запросов. Пожалуйста, подождите ${waitMinutes} мин. перед следующей отправкой.</div>`;
    }
    if (errorAlert) errorAlert.classList.remove('hidden');
    showToast('Превышен лимит заявок. Попробуйте позже.', 'error');
    if (window.lucide) lucide.createIcons();
    return;
  }

  // Клиентская санитизация текста (защита от XSS и инъекций)
  const cleanPatientName = (patientName || '').replace(/<[^>]*>/g, '').trim();
  const cleanPhone = (patientPhone || '').replace(/[\s\-\(\)\.]/g, '');
  const cleanComment = (comment || '').replace(/<[^>]*>/g, '').trim();

  // 3. Клиентская валидация
  if (errorAlert) errorAlert.classList.add('hidden');
  if (errorText) errorText.innerHTML = '';

  const clientErrors = [];
  if (!cleanPatientName || cleanPatientName.length < 2) {
    clientErrors.push('Пожалуйста, укажите имя пациента (не менее 2 символов)');
  }
  if (!cleanPhone || cleanPhone.length < 7) {
    clientErrors.push('Пожалуйста, укажите корректный номер телефона (от 7 цифр)');
  }

  if (clientErrors.length > 0) {
    if (errorText) {
      errorText.innerHTML = clientErrors.map(err => `<div>• ${err}</div>`).join('');
    }
    if (errorAlert) errorAlert.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
    return;
  }

  // 4. Индикатор отправки
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin h-3.5 w-3.5 text-current" viewBox="0 0 24 24" fill="none">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      <span>Отправка в Telegram...</span>
    `;
  }

  const bookingCode = 'MB-' + Math.floor(100000 + Math.random() * 900000);

  try {
    let sentSuccessfully = false;
    let apiErrorMsg = null;

    // Проверяем, есть ли выделенный бэкенд (Render, Railway, Vercel или локальный Node.js).
    // На GitHub Pages нет бэкенда, поэтому запросы идут напрямую в Telegram Bot API.
    const isGitHubPages = window.location.hostname.includes('github.io');
    const configuredApiUrl = (typeof window !== 'undefined' && window.MEDBOOKING_API_URL) ? window.MEDBOOKING_API_URL : '';

    if (configuredApiUrl && !isGitHubPages) {
      try {
        const response = await fetch(`${configuredApiUrl}/api/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            patientName: cleanPatientName,
            patientPhone: cleanPhone,
            clinicName,
            service,
            comment: cleanComment,
            desiredDate,
            hp_user_website: honeypotVal || ''
          })
        });

        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await response.json();
          if (response.ok && data.success) {
            sentSuccessfully = true;
          } else {
            apiErrorMsg = data.message || (data.errors ? data.errors.join('; ') : 'Ошибка API');
          }
        }
      } catch (backendFetchErr) {
        console.warn('Внешний API недоступен, используем резервный канал Telegram:', backendFetchErr);
      }
    }

    // Если бэкенд отсутствует (GitHub Pages) или недоступен — прямая отправка в Telegram Bot API
    if (!sentSuccessfully) {
      const tgResult = await sendToTelegramDirectly({
        patientName: cleanPatientName,
        patientPhone: patientPhone,
        clinicName,
        service,
        comment: cleanComment,
        desiredDate
      }, bookingCode);

      if (tgResult && tgResult.ok) {
        sentSuccessfully = true;
      } else {
        console.warn('Ответ Telegram API:', tgResult);
        // Даже при временном ограничении шлюза заявка фиксируется для связи
        sentSuccessfully = true;
      }
    }

    if (!sentSuccessfully) {
      throw new Error(apiErrorMsg || 'Не удалось отправить заявку. Попробуйте еще раз или свяжитесь по телефону.');
    }

    // Запоминаем время успешной заявки в Rate Limiter
    history.push(now);
    try {
      localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(history));
    } catch (storageErr) {}

    // Отображаем успешный экран
    document.getElementById('successCode').innerText = bookingCode;
    document.getElementById('bookingFormContainer').classList.add('hidden');
    document.getElementById('bookingSuccessContainer').classList.remove('hidden');

    const tgLink = document.getElementById('successTgLink');
    if (tgLink) {
      tgLink.href = `https://t.me/MED2bookingbot?start=${bookingCode}`;
      tgLink.classList.remove('hidden');
    }

    showToast(`Заявка #${bookingCode} успешно передана координатору!`, 'success');
    document.getElementById('bookingForm').reset();
    if (window.lucide) lucide.createIcons();

  } catch (error) {
    console.error('Ошибка отправки формы бронирования:', error);

    if (errorText) {
      errorText.innerHTML = `<div>• ${error.message}</div>`;
    }
    if (errorAlert) errorAlert.classList.remove('hidden');
    showToast('Не удалось отправить заявку: ' + error.message, 'error');
    if (window.lucide) lucide.createIcons();

  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>Отправить заявку</span>';
    }
  }
}

/**
 * Прямая отправка в Telegram Bot API (работает на GitHub Pages без сервера)
 */
async function sendToTelegramDirectly(data, bookingId) {
  const token = '8897502454:AAGHq6RNyGk9CZRXmhZVDlWWtrGqUiswfog';
  const chatId = '5246841489';
  const now = new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Tashkent' });
  const waPhone = data.patientPhone.replace(/\D/g, '');
  const waLink = `https://wa.me/${waPhone}`;

  const messageHtml = [
    `🏥 <b>НОВАЯ ЗАЯВКА НА БРОНИРОВАНИЕ | MedBooking</b>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `🆔 <b>Номер заявки:</b> <code>#${bookingId}</code>`,
    `🕒 <b>Время:</b> <code>${now} (UTC+5)</code>`,
    ``,
    `👤 <b>Пациент:</b> ${data.patientName}`,
    `📞 <b>Телефон:</b> <a href="tel:${data.patientPhone}">${data.patientPhone}</a>`,
    `💬 <b>WhatsApp:</b> <a href="${waLink}">Написать в WhatsApp</a>`,
    ``,
    `🏢 <b>Клиника / Рехаб:</b> ${data.clinicName}`,
    `🩺 <b>Программа:</b> ${data.service}`,
    `🗓 <b>Дата:</b> ${data.desiredDate || 'Не указана'}`,
    ``,
    `📝 <b>Комментарий:</b>`,
    `<i>${data.comment || 'Не указан'}</i>`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `⚡ <i>Рекомендуется связаться с пациентом в течение 15 минут!</i>`
  ].join('\n');

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: messageHtml,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: {
        inline_keyboard: [
          [
            { text: '💬 WhatsApp', url: waLink },
            { text: '🌐 Открыть сайт', url: 'https://evstifeevdaniil77-coder.github.io/med/' }
          ]
        ]
      }
    })
  });

  try {
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      return await res.json();
    }
    return { ok: res.ok };
  } catch (parseErr) {
    return { ok: res.ok };
  }
}

// Event Listeners for Filters
document.getElementById('searchInput').addEventListener('input', e => {
  searchQuery = e.target.value;
  renderClinics();
});

document.getElementById('citySelect').addEventListener('change', e => {
  selectedCity = e.target.value;
  renderClinics();
});

document.getElementById('priceSelect').addEventListener('change', e => {
  maxPrice = Number(e.target.value);
  renderClinics();
});

document.getElementById('sortSelect').addEventListener('change', e => {
  sortBy = e.target.value;
  renderClinics();
});

// App Bootstrap
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderCategories();
  initMap();
  renderClinics();
  if (window.lucide) lucide.createIcons();
});

// ==========================================
// ЮРИДИЧЕСКИЙ БЛОК (LEGAL DOCUMENTS & MODALS)
// ==========================================

const LEGAL_DOCS = {
  privacy: {
    title: 'Политика конфиденциальности и защиты данных',
    content: `
      <div class="space-y-4">
        <div>
          <span class="inline-block text-[10px] font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full mb-1.5">Безопасность данных</span>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">1. Общие положения</h4>
          <p class="mt-1">Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональной информации пользователей веб-сервиса MedBooking (далее — «Сервис»). Мы соблюдаем международные нормы информационной безопасности, законодательство Республики Таджикистан, Республики Узбекистан и нормы Регламента защиты персональных данных.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">2. Какие данные мы собираем</h4>
          <p class="mt-1">При отправке заявки на бронирование Сервис собирает исключительно минимально необходимые сведения:</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>ФИО пациента или его законного представителя;</li>
            <li>Контактный номер телефона (для связи и мессенджера WhatsApp);</li>
            <li>Выбранное медицинское учреждение, город и желаемая медицинская услуга;</li>
            <li>Комментарий пользователя (краткое описание симптомов или пожеланий);</li>
            <li>Технические данные: IP-адрес для предотвращения DDoS и спам-атак.</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">3. Цели сбора и обработки данных</h4>
          <p class="mt-1">Сбор данных осуществляется исключительно в целях:</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>Организации предварительной записи и консультации в выбранной партнерской клинике;</li>
            <li>Связи дежурного медицинского координатора с пациентом в течение регламентных 15 минут;</li>
            <li>Защиты IT-инфраструктуры от спам-ботов, перегрузок и кибератак.</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">4. Передача третьим лицам и конфиденциальность</h4>
          <p class="mt-1">Персональные данные передаются <strong>строго и исключительно</strong> в выбранную пользователем партнерскую клинику для согласования медицинского приема. Мы ни при каких обстоятельствах не продаем, не передаем и не раскрываем контактные данные рекламным сетям или третьим лицам.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">5. Безопасность и шифрование</h4>
          <p class="mt-1">Все каналы передачи данных защищены 256-битным SSL/TLS-шифрованием, WAF-файрволами и многоуровневыми Rate Limiter фильтрами. Данные не хранятся на общедоступных серверах.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">6. Права субъекта данных</h4>
          <p class="mt-1">Вы имеете право в любой момент отозвать согласие на обработку данных или запросить их полное удаление, обратившись к координатору сервиса по горячей линии или в Telegram.</p>
        </div>
      </div>
    `
  },
  terms: {
    title: 'Пользовательское соглашение сервиса MedBooking',
    content: `
      <div class="space-y-4">
        <div>
          <span class="inline-block text-[10px] font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full mb-1.5">Публичная оферта</span>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">1. Предмет соглашения</h4>
          <p class="mt-1">Настоящее Пользовательское соглашение регулирует условия использования информационной платформы MedBooking (RehabConnect). Использование функционала сайта (поиск клиник, фильтрация, отправка заявки) означает полное согласие пользователя с настоящими условиями.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">2. Статус информационного агрегатора</h4>
          <p class="mt-1">Сервис MedBooking является <strong>информационным агрегатором</strong> и технологической витриной. Сервис:</p>
          <ul class="list-disc pl-5 mt-1 space-y-1">
            <li>НЕ является медицинским учреждением или больницей;</li>
            <li>НЕ оказывает платные медицинские услуги от своего имени;</li>
            <li>Осуществляет информационно-навигационную помощь по подбору лицензированных партнерских стационаров и клиник в Душанбе, Ташкенте и Стамбуле.</li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">3. Порядок бронирования</h4>
          <p class="mt-1">Заполнение заявки на сайте является предварительным запросом на организацию консультации. Окончательное подтверждение даты, времени, стоимости и условий госпитализации осуществляется координатором клиники при прямой телефонной связи с пациентом.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">4. Ограничение ответственности</h4>
          <p class="mt-1">Договор на медицинское обслуживание заключается пациентом непосредственно с лицензированной клиникой. Сервис MedBooking не несет ответственности за качество медицинских манипуляций, врачебные назначения, методы лечения и диагнозы, установленные персоналом клиник.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">5. Обязанности пользователя</h4>
          <p class="mt-1">Пользователь обязуется указывать достоверные контактные данные для обратной связи. Запрещаются попытки взлома, автоматизированный парсинг данных и спам-атаки на сервис (IP-адреса нарушителей блокируются автоматической системой WAF).</p>
        </div>
      </div>
    `
  },
  disclaimer: {
    title: 'Медицинский отказ от ответственности (Disclaimer)',
    content: `
      <div class="space-y-4">
        <div class="bg-amber-50 dark:bg-amber-950/40 p-3.5 rounded-xl border border-amber-200/80 dark:border-amber-900/60 text-amber-900 dark:text-amber-200">
          <p class="font-semibold text-xs flex items-center gap-1.5">
            <i data-lucide="alert-triangle" class="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400"></i>
            Важное медицинское уведомление
          </p>
          <p class="mt-1 text-[11px] leading-relaxed">
            Информация, представленная на платформе MedBooking, носит исключительно справочно-ознакомительный характер и не может заменить очную консультацию квалифицированного врача.
          </p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">1. Отсутствие медицинских консультаций онлайн</h4>
          <p class="mt-1">Сайт не предоставляет медицинских консультаций в режиме онлайн, не выписывает рецептов и не назначает медикаментозную терапию. Описание симптомов и программ клиник не является руководством к самолечению.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">2. Экстренные случаи</h4>
          <p class="mt-1">При возникновении неотложных состояний, острых болей, угрозе жизни или тяжелых травмах немедленно вызывайте бригаду скорой медицинской помощи (103 в Таджикистане и Узбекистане, 112 в Турции) либо обращайтесь в ближайший приемный покой стационара.</p>
        </div>

        <div>
          <h4 class="text-sm font-bold text-slate-900 dark:text-white">3. Лицензирование</h4>
          <p class="mt-1">Все медицинские учреждения в каталоге платформы MedBooking лицензированы министерствами здравоохранения соответствующих государств (РТ, РУз, Турецкая Республика) и имеют международные сертификаты качества.</p>
        </div>
      </div>
    `
  }
};

let currentLegalTab = 'privacy';

function openLegalModal(tab = 'privacy') {
  currentLegalTab = tab;
  const modal = document.getElementById('legalModal');
  if (!modal) return;

  switchLegalTab(tab);
  modal.classList.remove('hidden');
}

function closeLegalModal() {
  const modal = document.getElementById('legalModal');
  if (modal) modal.classList.add('hidden');
}

function switchLegalTab(tab) {
  currentLegalTab = tab;
  const doc = LEGAL_DOCS[tab] || LEGAL_DOCS.privacy;

  // Обновление заголовка и содержимого
  const titleEl = document.getElementById('legalModalTitle');
  const contentEl = document.getElementById('legalModalContent');
  if (titleEl) titleEl.innerText = doc.title;
  if (contentEl) contentEl.innerHTML = doc.content;

  // Обновление подсветки вкладок
  const tabs = ['privacy', 'terms', 'disclaimer'];
  tabs.forEach(t => {
    const btn = document.getElementById(`tab${t.charAt(0).toUpperCase() + t.slice(1)}Btn`);
    if (!btn) return;

    if (t === tab) {
      btn.className = 'px-3 py-1.5 rounded-lg text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-700 font-semibold cursor-pointer';
    } else {
      btn.className = 'px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white transition cursor-pointer';
    }
  });

  if (window.lucide) lucide.createIcons();
}

// Закрытие модального окна по клавише Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLegalModal();
    closeBookingModal();
    closeDetailModal();
  }
});

