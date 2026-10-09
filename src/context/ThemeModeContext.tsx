import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeModeContextType {
  isDark: boolean;
  toggleDark: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextType>({
  isDark: false,
  toggleDark: () => {},
});

export const ThemeModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('medbooking_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('medbooking_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('medbooking_theme', 'light');
    }
  }, [isDark]);

  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <ThemeModeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeModeContext);
