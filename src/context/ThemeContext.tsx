import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zenAudio } from '../utils/audioZen';

export type ThemeMode = 'washi' | 'zen-night';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('yumeiho_theme');
    if (saved === 'zen-night' || saved === 'washi') {
      return saved;
    }
    // Respect system preference if no explicit setting
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'zen-night';
    }
    return 'washi';
  });

  const isDark = theme === 'zen-night';

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'zen-night') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'zen-night');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'washi');
    }
    localStorage.setItem('yumeiho_theme', theme);
  }, [theme]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'washi' ? 'zen-night' : 'washi';
    setThemeState(nextTheme);
    zenAudio.playZenBowl(nextTheme === 'zen-night' ? 396 : 528, 0.6);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
