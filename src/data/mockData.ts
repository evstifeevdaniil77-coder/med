export interface Doctor {
  id: string;
  clinicId: string;
  fullName: string;
  specialty: string;
  experienceYears: number;
  photo: string;
  bio?: string;
}

export interface Service {
  id: string;
  clinicId: string;
  title: string;
  description: string;
  price: number; // in USD
  durationDays: number;
  category?: string;
}

export interface Clinic {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: 'Больница' | 'Рехаб' | 'Наркология' | 'Психология' | 'Ортопедия';
  phone: string;
  email: string;
  website?: string;
  minPrice: number;
  accreditation?: string;
  features?: string[];
  doctors: Doctor[];
  services: Service[];
}

export interface Booking {
  id: string;
  clinicId: string;
  doctorId?: string;
  serviceId?: string;
  patientName: string;
  patientPhone: string;
  desiredDate: string;
  comment?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
}

export const MOCK_CLINICS: Clinic[] = [
  {
    id: 'dushanbe-oasis-rehab',
    name: 'Центр Реабилитации и Восстановления "Оазис"',
    description: 'Ведущий медицинский реабилитационный центр Таджикистана, специализирующийся на аддиктологии, детоксикации и психотерапевтической поддержке. Закрытая парковая территория с круглосуточным медицинским наблюдением, приватными палатами европейского стандарта и программами "12 шагов" и когнитивно-поведенческой терапии.',
    address: 'ул. Исмоили Сомони, 48/2',
    city: 'Душанбе',
    country: 'Таджикистан',
    lat: 38.5737,
    lng: 68.7844,
    rating: 4.9,
    reviewCount: 64,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Рехаб',
    phone: '+992 44 600 8822',
    email: 'info@oasis-rehab.tj',
    website: 'https://oasis-rehab.tj',
    minPrice: 950,
    accreditation: 'Международный сертификат ISO 9001:2015',
    features: ['100% Конфиденциальность', 'Круглосуточный стационар', 'Парковая зона 2 Га', 'Спортивный комплекс', 'Психотерапевтические группы'],
    doctors: [
      {
        id: 'doc-tj-1',
        clinicId: 'dushanbe-oasis-rehab',
        fullName: 'Др. Каримов Фарход Саидович',
        specialty: 'Главный врач, нарколог-психотерапевт',
        experienceYears: 18,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        bio: 'Член Евразийской ассоциации аддиктологов. Специализируется на комплексной реабилитации химических и нехимических зависимостей.'
      },
      {
        id: 'doc-tj-2',
        clinicId: 'dushanbe-oasis-rehab',
        fullName: 'Др. Назарова Зарина Баходировна',
        specialty: 'Клинический психолог, КПТ-терапевт',
        experienceYears: 12,
        photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80',
        bio: 'Сертифицированный специалист по кризисной интервенции и семейной терапии созависимости.'
      }
    ],
    services: [
      {
        id: 'serv-tj-1',
        clinicId: 'dushanbe-oasis-rehab',
        title: 'Интенсивный стационарный курс "Возрождение" (28 дней)',
        description: 'Полный курс био-психо-социальной реабилитации с проживанием в комфортабельной одноместной палате, 5-разовым питанием, ежедневной индивидуальной и групповой терапией.',
        price: 2400,
        durationDays: 28,
        category: 'Стационар'
      },
      {
        id: 'serv-tj-2',
        clinicId: 'dushanbe-oasis-rehab',
        title: 'Программа детоксикации и стабилизации (7 дней)',
        description: 'Медикаментозное очищение организма, мониторинг жизненных функций, купирование абстинентного синдрома под наблюдением реаниматолога.',
        price: 950,
        durationDays: 7,
        category: 'Детоксикация'
      },
      {
        id: 'serv-tj-3',
        clinicId: 'dushanbe-oasis-rehab',
        title: 'Амбулаторная постреабилитационная поддержка (60 дней)',
        description: 'Регулярные сессии с куратором, профилактика рецидивов, интеграция в здоровую социальную среду.',
        price: 600,
        durationDays: 60,
        category: 'Амбулаторно'
      }
    ]
  },
  {
    id: 'dushanbe-sino-ortho',
    name: 'Институт Ортопедии и Нейрореабилитации "Авиценна"',
    description: 'Современный научно-практический комплекс восстановления опорно-двигательного аппарата и неврологических функций после инсультов, травм позвоночника и спортивных повреждений. Оснащен роботизированными тренажерами и гидротерапевтическим бассейном.',
    address: 'проспект Рудаки, 120',
    city: 'Душанбе',
    country: 'Таджикистан',
    lat: 38.5882,
    lng: 68.7891,
    rating: 4.8,
    reviewCount: 47,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Ортопедия',
    phone: '+992 37 221 4455',
    email: 'contact@avicenna-rehab.tj',
    website: 'https://avicenna-rehab.tj',
    minPrice: 800,
    accreditation: 'Государственная лицензия Минздрава РТ №4882',
    features: ['Роботизированная кинезиотерапия', 'Гидрокинезотерапия', 'Эрготерапевтический зал', 'Детское отделение'],
    doctors: [
      {
        id: 'doc-tj-3',
        clinicId: 'dushanbe-sino-ortho',
        fullName: 'Др. Мирзоев Рустам Шарифович',
        specialty: 'Травматолог-ортопед высшей категории',
        experienceYears: 22,
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
        bio: 'Доктор медицинских наук, специализируется на сложной посттравматической реконструкции суставов.'
      }
    ],
    services: [
      {
        id: 'serv-tj-4',
        clinicId: 'dushanbe-sino-ortho',
        title: 'Комплексная нейрореабилитация после инсульта (21 день)',
        description: 'Восстановление двигательных стереотипов, логопедическая коррекция, физиотерапия и механотерапия.',
        price: 1850,
        durationDays: 21,
        category: 'Стационар'
      },
      {
        id: 'serv-tj-5',
        clinicId: 'dushanbe-sino-ortho',
        title: 'Реабилитация после эндопротезирования суставов (14 дней)',
        description: 'Разработка суставов на аппаратах пассивной мобилизации (CPM), кинезиотерапия, массаж.',
        price: 1200,
        durationDays: 14,
        category: 'Ортопедия'
      }
    ]
  },
  {
    id: 'tashkent-renaissance-clinic',
    name: 'Клиника Интегративной Наркологии "Ренессанс Ташкент"',
    description: 'Премиальный закрытый стационар в Ташкенте с фокусом на анонимное лечение всех видов химических зависимостей, алкоголизма и сопутствующих тревожно-депрессивных расстройств. Собственная лаборатория, реанимационное отделение и бассейн.',
    address: 'Мирзо-Улугбекский район, ул. Паркентская, 85',
    city: 'Ташкент',
    country: 'Узбекистан',
    lat: 41.3195,
    lng: 69.3082,
    rating: 4.95,
    reviewCount: 92,
    images: [
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Наркология',
    phone: '+998 71 200 4040',
    email: 'info@renaissance-tashkent.uz',
    website: 'https://renaissance-tashkent.uz',
    minPrice: 1200,
    accreditation: 'Международная аккредитация JCI (В процессе аудита)',
    features: ['100% Анонимность', 'VIP-номера с отдельным входом', 'Ксенонотерапия', 'Индивидуальный шеф-повар', 'Охраняемая территория'],
    doctors: [
      {
        id: 'doc-uz-1',
        clinicId: 'tashkent-renaissance-clinic',
        fullName: 'Др. Юсупов Азиз Камилович',
        specialty: 'Врач-психиатр, нарколог высшей категории',
        experienceYears: 20,
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
        bio: 'Стажировался в клиниках Германии и Швейцарии. Эксперт в области аппаратной детоксикации и нейромодуляции.'
      },
      {
        id: 'doc-uz-2',
        clinicId: 'tashkent-renaissance-clinic',
        fullName: 'Др. Алимова Нигора Шухратовна',
        specialty: 'Психотерапевт, транзактный аналитик',
        experienceYears: 15,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
        bio: 'Специалист по преодолению созависимости и посттравматических стрессовых состояний.'
      }
    ],
    services: [
      {
        id: 'serv-uz-1',
        clinicId: 'tashkent-renaissance-clinic',
        title: 'Программа УБОД и Экспресс-Детокс (5 дней)',
        description: 'Ультрабыстрая опиоидная детоксикация под общим наркозом с непрерывным кардиомониторингом.',
        price: 1500,
        durationDays: 5,
        category: 'Детоксикация'
      },
      {
        id: 'serv-uz-2',
        clinicId: 'tashkent-renaissance-clinic',
        title: 'Комплексный VIP-стационар "Новая жизнь" (30 дней)',
        description: 'Изолированное проживание в люкс-палате, психокоррекция, SPA-восстановление, персональный куратор.',
        price: 3600,
        durationDays: 30,
        category: 'Стационар'
      }
    ]
  },
  {
    id: 'tashkent-mind-center',
    name: 'Центр Психотерапии и Ментального Здоровья "Harmonia"',
    description: 'Уютный амбулаторно-стационарный центр в зеленой зоне Ташкента. Специализируется на лечении депрессий, тревожных и панических расстройств, эмоционального выгорания и психосоматики.',
    address: 'Юнусабадский район, ул. Амира Темура, 107',
    city: 'Ташкент',
    country: 'Узбекистан',
    lat: 41.3412,
    lng: 69.2845,
    rating: 4.88,
    reviewCount: 53,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Психология',
    phone: '+998 71 233 1188',
    email: 'welcome@harmonia-mind.uz',
    website: 'https://harmonia-mind.uz',
    minPrice: 500,
    accreditation: 'Сертификат Ассоциации когнитивно-поведенческой психотерапии',
    features: ['Индивидуальные сессии', 'Арт-терапия', 'Телесно-ориентированная терапия', 'Медитативный сад'],
    doctors: [
      {
        id: 'doc-uz-3',
        clinicId: 'tashkent-mind-center',
        fullName: 'Др. Рахимова Дильноза Бахтияровна',
        specialty: 'Клинический психолог, гештальт-терапевт',
        experienceYears: 14,
        photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80',
        bio: 'Автор программ эмоционального баланса и преодоления кризисных жизненных периодов.'
      }
    ],
    services: [
      {
        id: 'serv-uz-3',
        clinicId: 'tashkent-mind-center',
        title: 'Интенсив антистресс и восстановление сна (10 дней)',
        description: 'Нормализация биоритмов, аппаратная релаксация, сеансы индивидуальной когнитивной терапии.',
        price: 900,
        durationDays: 10,
        category: 'Психология'
      }
    ]
  },
  {
    id: 'istanbul-bosphorus-wellness',
    name: 'Bosphorus International Addiction & Mental Wellness Sanctuary',
    description: 'Международная европейская клиника на берегу Босфора в Стамбуле. Высочайший уровень медицинской безопасности, англо- и русскоязычный персонал, индивидуальные программы реабилитации, трансфер из аэропорта и консьерж-сервис для международных пациентов.',
    address: 'Bebek Mah., Cevdet Paşa Cd. No: 64, Beşiktaş',
    city: 'Стамбул',
    country: 'Турция',
    lat: 41.0766,
    lng: 29.0433,
    rating: 4.98,
    reviewCount: 148,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Рехаб',
    phone: '+90 212 988 3344',
    email: 'international@bosphorus-sanctuary.com',
    website: 'https://bosphorus-sanctuary.com',
    minPrice: 3200,
    accreditation: 'JCI Gold Seal of Approval & ISO 15189',
    features: ['Вид на Босфор', 'VIP трансфер из аэропорта', 'Русскоязычный координатор', 'Частный причал', 'Биохимическая реставрация мозга'],
    doctors: [
      {
        id: 'doc-tr-1',
        clinicId: 'istanbul-bosphorus-wellness',
        fullName: 'Prof. Dr. Emre Demir',
        specialty: 'Профессор психиатрии и нейробиологии зависимостей',
        experienceYears: 25,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        bio: 'Бывший руководитель отделения аддиктологии в Университетской клинике Стамбула. Член WPA.'
      },
      {
        id: 'doc-tr-2',
        clinicId: 'istanbul-bosphorus-wellness',
        fullName: 'Dr. Ayşe Yılmaz',
        specialty: 'Невролог, специалист по транскраниальной стимуляции (ТМС)',
        experienceYears: 16,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
        bio: 'Ведущий исследователь протоколов нейропластичности при химических зависимостях.'
      }
    ],
    services: [
      {
        id: 'serv-tr-1',
        clinicId: 'istanbul-bosphorus-wellness',
        title: 'Премиальная программа реабилитации "Bosphorus Elite" (28 дней)',
        description: 'Индивидуальная вилла, личный психотерапевт, ТМС-терапия, биохимическое восстановление, круглосуточная охрана и консьерж.',
        price: 8500,
        durationDays: 28,
        category: 'Стационар'
      },
      {
        id: 'serv-tr-2',
        clinicId: 'istanbul-bosphorus-wellness',
        title: 'Комплексный 14-дневный курс нейровосстановления',
        description: 'Интенсивная нормализация сна, когнитивных функций и психоэмоционального фона с применением протоколов биохакинга.',
        price: 4900,
        durationDays: 14,
        category: 'Психология'
      }
    ]
  },
  {
    id: 'istanbul-anatolian-ortho',
    name: 'Anatolian Joint & Sports Trauma Rehab Clinic',
    description: 'Специализированная клиника спортивной медицины и ортопедической реабилитации в Стамбуле. Центр оснащен изокинетическими системами Biodex, криокамерами и гидродинамическими дорожками для скорейшего восстановления суставов и связок.',
    address: 'Kadıköy, Bağdat Cd. No: 210',
    city: 'Стамбул',
    country: 'Турция',
    lat: 40.9723,
    lng: 29.0612,
    rating: 4.92,
    reviewCount: 110,
    images: [
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Ортопедия',
    phone: '+90 216 450 7700',
    email: 'info@anatolian-rehab.com',
    website: 'https://anatolian-rehab.com',
    minPrice: 1100,
    accreditation: 'FIFA Medical Centre of Excellence Partner',
    features: ['Биомеханический анализ походки', 'Криотерапия -110°C', 'Реабилитационный бассейн', 'Подбор ортезов'],
    doctors: [
      {
        id: 'doc-tr-3',
        clinicId: 'istanbul-anatolian-ortho',
        fullName: 'Dr. Mehmet Kaya',
        specialty: 'Ортопед-травматолог, спортивный врач',
        experienceYears: 19,
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
        bio: 'Консультант олимпийских сборных команд Турции. Специалист по артроскопической хирургии и ускоренной реабилитации.'
      }
    ],
    services: [
      {
        id: 'serv-tr-3',
        clinicId: 'istanbul-anatolian-ortho',
        title: 'Интенсивный курс реабилитации ПКС и мениска (14 дней)',
        description: 'Восстановление полного объема движений в коленном суставе, укрепление квадрицепса на аппарате Biodex.',
        price: 1900,
        durationDays: 14,
        category: 'Ортопедия'
      },
      {
        id: 'serv-tr-4',
        clinicId: 'istanbul-anatolian-ortho',
        title: 'Курс восстановления позвоночника "Здоровая спина" (21 день)',
        description: 'Тракционная терапия, декомпрессия позвоночника, миофасциальный релиз и индивидуальный комплекс ЛФК.',
        price: 2400,
        durationDays: 21,
        category: 'Ортопедия'
      }
    ]
  },
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
    accreditation: 'Государственная лицензия Минздрава РТ высшей категории',
    features: ['Круглосуточный приемный покой 24/7', 'МРТ 3.0 Tesla & КТ 128 срезов', 'Отделение ангиографии', 'Собственная экспресс-лаборатория'],
    doctors: [
      {
        id: 'doc-tj-h1',
        clinicId: 'dushanbe-istiklol-hospital',
        fullName: 'Др. Раджабов Сафар Икромович',
        specialty: 'Ведущий хирург, заведующий операционным блоком',
        experienceYears: 24,
        photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        bio: 'Заслуженный врач, выполнил более 3 500 успешных лапароскопических и полостных вмешательств.'
      },
      {
        id: 'doc-tj-h2',
        clinicId: 'dushanbe-istiklol-hospital',
        fullName: 'Др. Самадова Гулчехра Анваровна',
        specialty: 'Кардиолог, функциональный диагност',
        experienceYears: 17,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
        bio: 'Специалист по холтеровскому мониторированию, ЭХО-КГ и ведению пациентов после стентирования.'
      }
    ],
    services: [
      {
        id: 'serv-tj-h1',
        clinicId: 'dushanbe-istiklol-hospital',
        title: 'Комплексный терапевтический стационар (7 дней)',
        description: 'Палата интенсивного наблюдения, инфузионная терапия, суточный мониторинг витальных показателей.',
        price: 520,
        durationDays: 7,
        category: 'Терапия'
      },
      {
        id: 'serv-tj-h2',
        clinicId: 'dushanbe-istiklol-hospital',
        title: 'Кардиологический диагностический Check-up (3 дня)',
        description: 'Коронарография, ЭКГ под нагрузкой, биохимический профиль, экспертное заключение консилиума.',
        price: 350,
        durationDays: 3,
        category: 'Диагностика'
      }
    ]
  },
  {
    id: 'tashkent-akfa-hospital',
    name: 'Многопрофильный Клинический Госпиталь "AKFA Medline"',
    description: 'Флагманский частный медицинский комплекс Центральной Азии. 12 высокотехнологичных операционных блоков, отделения взрослой и детской кардиохирургии, эндоскопической урологии, нейрохирургии и интервенционной радиологии с немецким оборудованием Siemens и Karl Storz.',
    address: 'Алмазарский район, ул. Кичик Халка Йули, 5А',
    city: 'Ташкент',
    country: 'Узбекистан',
    lat: 41.3533,
    lng: 69.2155,
    rating: 4.96,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Больница',
    phone: '+998 71 203 3003',
    email: 'contact@akfamedline.uz',
    website: 'https://akfamedline.uz',
    minPrice: 450,
    accreditation: 'Международный аудит качества ISO 9001 & TUV Rheinland',
    features: ['12 ультрасовременных операционных', 'Вертолетная площадка санавиации', 'Палаты класса Junior Suite', 'Международный отдел (English/Russian)'],
    doctors: [
      {
        id: 'doc-uz-h1',
        clinicId: 'tashkent-akfa-hospital',
        fullName: 'Проф. д-р Абдуллаев Бахром Назимович',
        specialty: 'Сердечно-сосудистый хирург, интервенционный кардиолог',
        experienceYears: 26,
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80',
        bio: 'Доктор медицинских наук, член Европейской ассоциации кардиоторакальных хирургов (EACTS).'
      },
      {
        id: 'doc-uz-h2',
        clinicId: 'tashkent-akfa-hospital',
        fullName: 'Др. Турсунова Малика Ибрагимовна',
        specialty: 'Врач-гастроэнтеролог, эндоскопист',
        experienceYears: 14,
        photo: 'https://images.unsplash.com/photo-1594824813589-b0c4424613bb?auto=format&fit=crop&w=600&q=80',
        bio: 'Специалист по капсульной эндоскопии и малоинвазивному лечению заболеваний ЖКТ.'
      }
    ],
    services: [
      {
        id: 'serv-uz-h1',
        clinicId: 'tashkent-akfa-hospital',
        title: 'Премиальный Check-up "Полный аудит здоровья" (2 дня)',
        description: 'Полное сканирование организма МРТ/КТ, лабораторный скрининг 60+ маркеров, консультации 7 узких специалистов.',
        price: 450,
        durationDays: 2,
        category: 'Диагностика'
      },
      {
        id: 'serv-uz-h2',
        clinicId: 'tashkent-akfa-hospital',
        title: 'Стационарное хирургическое лечение (5 дней)',
        description: 'Малоинвазивная операция Karl Storz, анестезиологическое пособие, палата повышенной комфортности.',
        price: 1350,
        durationDays: 5,
        category: 'Хирургия'
      }
    ]
  },
  {
    id: 'istanbul-memorial-hospital',
    name: 'Международный Госпиталь Memorial Şişli',
    description: 'Первый госпиталь в Турции, удостоенный престижного золотого сертификата JCI (Joint Commission International). Центр трансплантологии, роботизированной хирургии Da Vinci, кардиоваскулярных операций и комплексной онкологии.',
    address: 'Piyalepaşa Blv., Şişli, Istanbul',
    city: 'Стамбул',
    country: 'Турция',
    lat: 41.0628,
    lng: 28.9819,
    rating: 4.97,
    reviewCount: 520,
    images: [
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80'
    ],
    category: 'Больница',
    phone: '+90 212 314 6666',
    email: 'international@memorial.com.tr',
    website: 'https://memorial.com.tr',
    minPrice: 650,
    accreditation: 'JCI Gold Seal of Approval & ISO 15189',
    features: ['Золотой стандарт JCI', 'Роботизированная хирургия Da Vinci Xi', 'Русскоязычные персональные координаторы', 'Лаборатория молекулярной генетики'],
    doctors: [
      {
        id: 'doc-tr-h1',
        clinicId: 'istanbul-memorial-hospital',
        fullName: 'Prof. Dr. Ahmet Bilgin',
        specialty: 'Профессор онкохирургии и абдоминальной хирургии',
        experienceYears: 28,
        photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
        bio: 'Международный эксперт в робот-ассистированных операциях, спикер Всемирного конгресса хирургов.'
      },
      {
        id: 'doc-tr-h2',
        clinicId: 'istanbul-memorial-hospital',
        fullName: 'Dr. Selin Çelik',
        specialty: 'Главный терапевт международного департамента',
        experienceYears: 18,
        photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
        bio: 'Куратор иностранных пациентов из стран СНГ, Европы и Ближнего Востока.'
      }
    ],
    services: [
      {
        id: 'serv-tr-h1',
        clinicId: 'istanbul-memorial-hospital',
        title: 'Комплексный VIP Check-up "Executive" (1-2 дня)',
        description: 'Премиальное скрининговое обследование, онкомаркеры, ПЭТ-КТ/МРТ, индивидуальный план здоровья.',
        price: 650,
        durationDays: 2,
        category: 'Диагностика'
      },
      {
        id: 'serv-tr-h2',
        clinicId: 'istanbul-memorial-hospital',
        title: 'Робот-ассистированная хирургия Da Vinci (стационар 4 дня)',
        description: 'Высокоточное малоинвазивное вмешательство с минимальной кровопотерей и ускоренным восстановлением.',
        price: 4800,
        durationDays: 4,
        category: 'Хирургия'
      }
    ]
  }
];

export const CATEGORIES = ['Все категории', 'Больница', 'Рехаб', 'Наркология', 'Психология', 'Ортопедия'] as const;
export const CITIES = ['Все города', 'Душанбе', 'Ташкент', 'Стамбул'] as const;
export const COUNTRIES = ['Все страны', 'Таджикистан', 'Узбекистан', 'Турция'] as const;

