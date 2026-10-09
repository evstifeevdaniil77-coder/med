import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  MapPin,
  Check,
  Share2,
  Clock,
  Phone,
  Mail
} from 'lucide-react';
import { MOCK_CLINICS, Clinic, Doctor, Service } from '../../../data/mockData';
import { BookingModal } from '../../../components/BookingModal';

interface ClinicDetailPageProps {
  clinicId: string;
  onBack: () => void;
}

export const ClinicDetailPage: React.FC<ClinicDetailPageProps> = ({ clinicId, onBack }) => {
  const clinic = MOCK_CLINICS.find((c) => c.id === clinicId) || MOCK_CLINICS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // In-page quick booking form state
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDate, setQuickDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [quickServiceId, setQuickServiceId] = useState(clinic.services[0]?.id || '');
  const [quickSuccess, setQuickSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleServiceBook = (service: Service) => {
    setSelectedService(service);
    setSelectedDoctor(null);
    setIsBookingModalOpen(true);
  };

  const handleDoctorBook = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setSelectedService(null);
    setIsBookingModalOpen(true);
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickPhone) return;
    setQuickSuccess(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="pb-20 max-w-6xl mx-auto px-4 sm:px-6">
      {/* Top Breadcrumb Nav */}
      <div className="py-5 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 mb-6 text-xs transition-colors">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Все клиники и больницы</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
          >
            {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Share2 className="h-3.5 w-3.5" />}
            <span>{copiedLink ? 'Скопировано' : 'Поделиться'}</span>
          </button>
          <button
            onClick={() => {
              setSelectedDoctor(null);
              setSelectedService(null);
              setIsBookingModalOpen(true);
            }}
            className="rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 px-3.5 py-1.5 font-medium transition cursor-pointer"
          >
            Забронировать
          </button>
        </div>
      </div>

      {/* Clinic Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1.5">
          <span className="font-medium text-slate-800 dark:text-slate-200">{clinic.category}</span>
          <span>·</span>
          <span>{clinic.city}, {clinic.country}</span>
          <span>·</span>
          <span className="flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
            <Star className="h-3 w-3 fill-current text-amber-500" />
            {clinic.rating} ({clinic.reviewCount} отзывов)
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {clinic.name}
        </h1>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          {clinic.address}
        </p>
      </div>

      {/* Photo Gallery: Minimalist 2-column view */}
      <div className="rounded-xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 mb-8 p-3 transition-colors">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
          <div className="md:col-span-8 h-72 sm:h-96 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800">
            <img
              src={clinic.images[activeImageIndex]}
              alt={clinic.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="md:col-span-4 grid grid-cols-3 md:grid-cols-1 gap-2">
            {clinic.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`h-24 md:h-[120px] rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-slate-900 dark:border-white'
                    : 'border-transparent opacity-75 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Вид палаты" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Description, Services, Doctors */}
        <div className="lg:col-span-8 space-y-8">
          {/* Description */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 transition-colors">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              О медицинском центре
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {clinic.description}
            </p>

            {clinic.features && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-400">
                {clinic.features.map((f, i) => (
                  <span key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-md">
                    {f}
                  </span>
                ))}
              </div>
            )}
          </section>

          {/* Services & Treatment Programs with Prices */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Программы и стоимость стационара
              </h2>
              <span className="text-xs text-slate-400">USD</span>
            </div>

            <div className="space-y-3">
              {clinic.services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 p-3.5 hover:border-slate-300 dark:hover:border-slate-700 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div>
                    <div className="font-semibold text-sm text-slate-900 dark:text-white">{service.title}</div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">{service.description}</p>
                    <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{service.durationDays} дней</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <span className="font-bold text-base text-slate-900 dark:text-white">${service.price}</span>
                    <button
                      onClick={() => handleServiceBook(service)}
                      className="px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 rounded-lg transition cursor-pointer"
                    >
                      Выбрать
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Doctors */}
          <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 transition-colors">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
              Врачи клиники
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {clinic.doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="rounded-lg border border-slate-200 dark:border-slate-800 p-3.5 flex gap-3.5 items-start"
                >
                  <img
                    src={doctor.photo}
                    alt={doctor.fullName}
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <h3 className="font-semibold text-sm text-slate-900 dark:text-white">{doctor.fullName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doctor.specialty}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">Стаж: {doctor.experienceYears} лет</p>
                    <button
                      onClick={() => handleDoctorBook(doctor)}
                      className="mt-2 text-xs font-medium text-slate-900 dark:text-slate-200 underline hover:text-slate-700 cursor-pointer"
                    >
                      Записаться на прием
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Minimalist Booking Card */}
        <div className="lg:col-span-4 sticky top-20 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs transition-colors">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Бронирование и запись</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Координатор свяжется с вами для подтверждения времени и деталей госпитализации.
            </p>

            {quickSuccess ? (
              <div className="mt-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800 text-center text-xs text-slate-700 dark:text-slate-300">
                <p className="font-semibold text-slate-900 dark:text-white mb-1">Заявка отправлена</p>
                <p>Мы свяжемся с вами в течение 15 минут.</p>
                <button
                  onClick={() => setQuickSuccess(false)}
                  className="mt-2 text-slate-500 dark:text-slate-400 underline cursor-pointer"
                >
                  Новая заявка
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Имя пациента</label>
                  <input
                    type="text"
                    required
                    value={quickName}
                    onChange={(e) => setQuickName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Телефон / WhatsApp</label>
                  <input
                    type="tel"
                    required
                    value={quickPhone}
                    onChange={(e) => setQuickPhone(e.target.value)}
                    placeholder="+992 / +998 / +90..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Дата визита</label>
                  <input
                    type="date"
                    required
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">Отделение / Программа</label>
                  <select
                    value={quickServiceId}
                    onChange={(e) => setQuickServiceId(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  >
                    {clinic.services.map((s) => (
                      <option key={s.id} value={s.id} className="bg-white dark:bg-slate-900">
                        {s.title} (${s.price})
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 py-2 text-xs font-medium transition cursor-pointer"
                >
                  Отправить заявку
                </button>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5">
                <Phone className="h-3 w-3" />
                <a href={`tel:${clinic.phone}`} className="hover:underline">{clinic.phone}</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="h-3 w-3" />
                <span>{clinic.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        clinic={clinic}
        selectedDoctor={selectedDoctor}
        selectedService={selectedService}
      />
    </div>
  );
};

export default ClinicDetailPage;
