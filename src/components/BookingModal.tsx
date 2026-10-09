import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Clinic, Doctor, Service } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  clinic: Clinic | null;
  selectedDoctor?: Doctor | null;
  selectedService?: Service | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  clinic,
  selectedDoctor: initialDoctor = null,
  selectedService: initialService = null,
}) => {
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [desiredDate, setDesiredDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [doctorId, setDoctorId] = useState(initialDoctor?.id || '');
  const [serviceId, setServiceId] = useState(initialService?.id || '');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingCode, setBookingCode] = useState('');

  React.useEffect(() => {
    if (initialDoctor) setDoctorId(initialDoctor.id);
    if (initialService) setServiceId(initialService.id);
    if (isOpen) {
      setIsSuccess(false);
    }
  }, [isOpen, initialDoctor, initialService]);

  if (!isOpen || !clinic) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const code = 'MB-' + Math.floor(100000 + Math.random() * 900000);
      setBookingCode(code);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-10 transition-colors">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">Бронирование и консультация</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{clinic.name} ({clinic.city})</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition cursor-pointer"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-xs text-slate-700 dark:text-slate-300">
          {isSuccess ? (
            <div className="text-center py-6">
              <CheckCircle className="h-10 w-10 text-emerald-600 mx-auto mb-3" />
              <h4 className="text-base font-semibold text-slate-900 dark:text-white">Заявка успешно принята</h4>
              <p className="mt-1 text-slate-600 dark:text-slate-300">
                Номер заявки: <strong className="font-mono text-slate-900 dark:text-white">{bookingCode}</strong>.
              </p>
              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Координатор клиники свяжется по номеру <strong className="text-slate-800 dark:text-slate-200">{patientPhone}</strong> в течение 15 минут.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-5 py-2 text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition cursor-pointer"
              >
                Закрыть окно
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  ФИО пациента или представителя *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Имя"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Телефон / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+992 / +998 / +90..."
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Желаемая дата *
                  </label>
                  <input
                    type="date"
                    required
                    value={desiredDate}
                    onChange={(e) => setDesiredDate(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Программа лечения
                </label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                >
                  <option value="">Первичная консультация и подбор</option>
                  {clinic.services.map((s) => (
                    <option key={s.id} value={s.id} className="bg-white dark:bg-slate-900">
                      {s.title} — ${s.price} ({s.durationDays} дн.)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Врач (по желанию)
                </label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                >
                  <option value="">Дежурный врач отделения</option>
                  {clinic.doctors.map((d) => (
                    <option key={d.id} value={d.id} className="bg-white dark:bg-slate-900">
                      {d.fullName} ({d.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Комментарий
                </label>
                <textarea
                  rows={2}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Дополнительные пожелания или симптомы"
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent p-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-slate-900 dark:focus:border-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 text-white dark:text-slate-950 px-4 py-2 text-xs font-medium transition disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
