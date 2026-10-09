import React from 'react';
import { HeartPulse, Phone, Moon, Sun } from 'lucide-react';
import { useThemeMode } from '../context/ThemeModeContext';

export const Layout: React.FC<{
  children: React.ReactNode;
  onNavigateHome?: () => void;
  onOpenConsultation?: () => void;
}> = ({ children, onNavigateHome, onOpenConsultation }) => {
  const { isDark, toggleDark } = useThemeMode();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors duration-200">
      {/* Clean Minimalist Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Zone 1: Single Brand Wordmark */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-left focus:outline-none cursor-pointer group"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 group-hover:bg-emerald-600 transition">
              <HeartPulse className="h-4 w-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
              MedBooking
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden sm:flex items-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <button onClick={onNavigateHome} className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
              Больницы и клиники
            </button>
            <a href="#how-it-works" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              О сервисе
            </a>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 dark:text-slate-400 font-normal">
              Душанбе · Ташкент · Стамбул
            </span>
          </nav>

          {/* Zone 3: Actions (Theme Toggle + Consultation) */}
          <div className="flex items-center gap-2.5">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleDark}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}
              aria-label="Переключение темы"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-600" />
              )}
            </button>

            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 px-3.5 py-1.5 text-xs font-medium transition cursor-pointer"
            >
              <Phone className="h-3 w-3" />
              <span>Консультация 24/7</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-500 dark:text-slate-400 py-8 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-200">MedBooking</span>
            <span>·</span>
            <span>Агрегатор больниц и клиник</span>
            <span>·</span>
            <span>Лицензированные учреждения</span>
          </div>

          <div className="flex items-center gap-4 text-slate-600 dark:text-slate-400">
            <a href="tel:+992446008822" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              +992 44 600 8822 (TJ)
            </a>
            <span>·</span>
            <a href="tel:+998712004040" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              +998 71 200 4040 (UZ)
            </a>
            <span>·</span>
            <a href="tel:+902129883344" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              +90 212 988 3344 (TR)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
