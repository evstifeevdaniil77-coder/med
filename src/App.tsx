import React, { useState, useEffect } from 'react';
import { ThemeModeProvider } from './context/ThemeModeContext';
import { Layout } from './app/layout';
import { HomePage } from './app/page';
import { ClinicDetailPage } from './app/clinics/[id]/page';
import { BookingModal } from './components/BookingModal';
import { MOCK_CLINICS } from './data/mockData';

export function AppContent() {
  const [currentRoute, setCurrentRoute] = useState<{ path: string; clinicId?: string }>({
    path: '/',
  });
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);

  // Sync with browser URL / history
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const clinicMatch = pathname.match(/\/clinics\/([^/]+)/);
      if (clinicMatch && clinicMatch[1]) {
        setCurrentRoute({ path: '/clinics/:id', clinicId: clinicMatch[1] });
      } else {
        setCurrentRoute({ path: '/' });
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigateToClinic = (clinicId: string) => {
    window.history.pushState({}, '', `/clinics/${clinicId}`);
    setCurrentRoute({ path: '/clinics/:id', clinicId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setCurrentRoute({ path: '/' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout
      onNavigateHome={navigateToHome}
      onOpenConsultation={() => setIsConsultationModalOpen(true)}
    >
      {currentRoute.path === '/clinics/:id' && currentRoute.clinicId ? (
        <ClinicDetailPage
          clinicId={currentRoute.clinicId}
          onBack={navigateToHome}
        />
      ) : (
        <HomePage onNavigateToClinic={navigateToClinic} />
      )}

      {/* Booking Consultation Modal */}
      <BookingModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        clinic={MOCK_CLINICS[0]}
      />
    </Layout>
  );
}

export function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
