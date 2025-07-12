'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  red: {
    name: 'Red Passion',
    colors: {
      background: '#19171b',
      primary: '#75020f',
      secondary: '#51080d',
      accent: '#2b0307',
      text: '#ffffff',
      textSecondary: '#ffffff80',
    },
    gradients: {
      header: 'from-[#19171b] to-[#75020f]',
      card: 'from-[#75020f] to-[#51080d]',
      button: 'from-[#75020f] to-[#51080d]',
      accent: 'from-[#75020f] to-white',
    }
  },
  purple: {
    name: 'Purple Galaxy',
    colors: {
      background: '#1e202c',
      primary: '#60519b',
      secondary: '#31323e',
      accent: '#bfc0d1',
      text: '#bfc0d1',
      textSecondary: '#bfc0d180',
    },
    gradients: {
      header: 'from-[#1e202c] to-[#60519b]',
      card: 'from-[#60519b] to-[#31323e]',
      button: 'from-[#60519b] to-[#31323e]',
      accent: 'from-[#60519b] to-[#bfc0d1]',
    }
  },
  pink: {
    name: 'Rose Garden',
    colors: {
      background: '#fdf2f8',
      primary: '#ec4899',
      secondary: '#f9a8d4',
      accent: '#fce7f3',
      text: '#1f2937',
      textSecondary: '#6b7280',
    },
    gradients: {
      header: 'from-[#fdf2f8] to-[#ec4899]',
      card: 'from-[#ec4899] to-[#f9a8d4]',
      button: 'from-[#ec4899] to-[#f9a8d4]',
      accent: 'from-[#ec4899] to-[#fce7f3]',
    }
  },
  blue: {
    name: 'Ocean Breeze',
    colors: {
      background: '#f8fafc',
      primary: '#3b82f6',
      secondary: '#93c5fd',
      accent: '#dbeafe',
      text: '#1e293b',
      textSecondary: '#64748b',
    },
    gradients: {
      header: 'from-[#f8fafc] to-[#3b82f6]',
      card: 'from-[#3b82f6] to-[#93c5fd]',
      button: 'from-[#3b82f6] to-[#93c5fd]',
      accent: 'from-[#3b82f6] to-[#dbeafe]',
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('red');

  useEffect(() => {
    const savedTheme = localStorage.getItem('yalla-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    const newTheme = themeKeys[nextIndex];
    setCurrentTheme(newTheme);
    localStorage.setItem('yalla-theme', newTheme);
  };

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
      localStorage.setItem('yalla-theme', themeName);
    }
  };

  const theme = themes[currentTheme];

  return (
    <ThemeContext.Provider value={{ theme, currentTheme, toggleTheme, setTheme, themes }}>
      <div 
        className={`min-h-screen transition-colors duration-500 theme-${currentTheme} theme-gradient-background`}
        style={{
          backgroundImage: currentTheme === 'red' 
            ? 'linear-gradient(45deg, #19171b 0%, #75020f 25%, #51080d 50%, #2b0307 75%, #19171b 100%)'
            : currentTheme === 'purple'
            ? 'linear-gradient(45deg, #1e202c 0%, #60519b 25%, #31323e 50%, #bfc0d1 75%, #1e202c 100%)'
            : currentTheme === 'pink'
            ? 'linear-gradient(45deg, #fdf2f8 0%, #ec4899 25%, #f9a8d4 50%, #fce7f3 75%, #fdf2f8 100%)'
            : 'linear-gradient(45deg, #f8fafc 0%, #3b82f6 25%, #93c5fd 50%, #dbeafe 75%, #f8fafc 100%)',
          backgroundSize: '400% 400%',
          animation: 'slow-gradient-movement 10s ease-in-out infinite'
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
