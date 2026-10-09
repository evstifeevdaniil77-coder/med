/**
 * База данных медицинских учреждений MedBooking
 * Охватывает Душанбе (Таджикистан), Ташкент (Узбекистан) и Стамбул (Турция)
 */

export const CLINICS_DATA = [
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
    website: 'https://istiklol-med.tj',
    minPrice: 350,
    doctors: [
      {
        id: 'doc-1',
        fullName: 'Др. Раджабов Сафар Икромович',
        specialty: 'Ведущий хирург, зав. оперблоком',
        experienceYears: 24,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-2',
        fullName: 'Др. Самадова Гулчехра Анваровна',
        specialty: 'Кардиолог, функциональный диагност',
        experienceYears: 17,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's1',
        title: 'Комплексный терапевтический стационар (7 дней)',
        description: 'Палата интенсивного наблюдения, инфузионная терапия, суточный мониторинг.',
        price: 520,
        durationDays: 7
      },
      {
        id: 's2',
        title: 'Кардиологический диагностический Check-up (3 дня)',
        description: 'Коронарография, ЭКГ под нагрузкой, биохимический профиль.',
        price: 350,
        durationDays: 3
      }
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
    rating: 4.90,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Рехаб',
    phone: '+992 44 600 8822',
    email: 'info@oasis-rehab.tj',
    website: 'https://oasis-rehab.tj',
    minPrice: 950,
    doctors: [
      {
        id: 'doc-3',
        fullName: 'Др. Каримов Фарход Саидович',
        specialty: 'Главный врач, нарколог-психотерапевт',
        experienceYears: 18,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-4',
        fullName: 'Др. Назарова Зарина Баходировна',
        specialty: 'Клинический психолог, КПТ-терапевт',
        experienceYears: 12,
        photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's3',
        title: 'Интенсивный стационарный курс (28 дней)',
        description: 'Био-психо-социальная реабилитация в комфортабельной палате с питанием.',
        price: 2400,
        durationDays: 28
      },
      {
        id: 's4',
        title: 'Программа детоксикации и стабилизации (7 дней)',
        description: 'Медикаментозное очищение организма, купирование абстиненции.',
        price: 950,
        durationDays: 7
      }
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
    website: 'https://akfamedline.uz',
    minPrice: 450,
    doctors: [
      {
        id: 'doc-5',
        fullName: 'Проф. д-р Абдуллаев Бахром Назимович',
        specialty: 'Сердечно-сосудистый хирург, член EACTS',
        experienceYears: 26,
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-6',
        fullName: 'Др. Турсунова Малика Ибрагимовна',
        specialty: 'Врач-гастроэнтеролог, эндоскопист',
        experienceYears: 14,
        photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's5',
        title: 'Премиальный Check-up полный аудит здоровья (2 дня)',
        description: 'МРТ/КТ сканирование, лабораторный скрининг 60+ маркеров, консилиум.',
        price: 450,
        durationDays: 2
      },
      {
        id: 's6',
        title: 'Стационарное хирургическое лечение (5 дней)',
        description: 'Малоинвазивная операция Karl Storz, палата повышенной комфортности.',
        price: 1350,
        durationDays: 5
      }
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
    website: 'https://renaissance-tashkent.uz',
    minPrice: 1200,
    doctors: [
      {
        id: 'doc-7',
        fullName: 'Др. Юсупов Азиз Камилович',
        specialty: 'Врач-психиатр, нарколог высшей категории',
        experienceYears: 20,
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's7',
        title: 'Программа УБОД и Экспресс-Детокс (5 дней)',
        description: 'Ультрабыстрая опиоидная детоксикация под общим наркозом.',
        price: 1500,
        durationDays: 5
      },
      {
        id: 's8',
        title: 'Комплексный VIP-стационар (30 дней)',
        description: 'Изолированное проживание в люкс-палате, психокоррекция.',
        price: 3600,
        durationDays: 30
      }
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
    website: 'https://memorial.com.tr',
    minPrice: 650,
    doctors: [
      {
        id: 'doc-8',
        fullName: 'Prof. Dr. Ahmet Bilgin',
        specialty: 'Профессор онкохирургии и абдоминальной хирургии',
        experienceYears: 28,
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'doc-9',
        fullName: 'Dr. Selin Çelik',
        specialty: 'Главный терапевт международного департамента',
        experienceYears: 18,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's9',
        title: 'Комплексный VIP Check-up "Executive" (2 дня)',
        description: 'Премиальное обследование, онкомаркеры, ПЭТ-КТ/МРТ.',
        price: 650,
        durationDays: 2
      },
      {
        id: 's10',
        title: 'Робот-ассистированная хирургия Da Vinci (4 дня)',
        description: 'Высокоточное малоинвазивное вмешательство с минимальной травматизацией.',
        price: 4800,
        durationDays: 4
      }
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
    website: 'https://bosphorus-sanctuary.com',
    minPrice: 3200,
    doctors: [
      {
        id: 'doc-10',
        fullName: 'Prof. Dr. Emre Demir',
        specialty: 'Профессор психиатрии и нейробиологии зависимостей',
        experienceYears: 25,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
      }
    ],
    services: [
      {
        id: 's11',
        title: 'Программа реабилитации "Bosphorus Elite" (28 дней)',
        description: 'Индивидуальная вилла, личный психотерапевт, ТМС-терапия, трансфер.',
        price: 8500,
        durationDays: 28
      }
    ]
  }
];

export const CATEGORIES_LIST = [
  'Все категории',
  'Больница',
  'Рехаб',
  'Наркология',
  'Психология',
  'Ортопедия'
];
