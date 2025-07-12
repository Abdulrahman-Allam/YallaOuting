'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, currentTheme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeIcons = {
    red: '🔥',
    purple: '🌌',
    pink: '🌸',
    blue: '🌊'
  };

  const handleThemeSelect = (themeName) => {
    setTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative overflow-hidden rounded-full p-3 shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2"
        style={{
          position: 'fixed',
          top: '16px',
          right: '16px',
          zIndex: 9999,
          background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          boxShadow: `0 4px 20px ${theme.colors.primary}40`,
          width: '48px',
          height: '48px',
        }}
        title="Select Theme"
        aria-label="Select Theme"
      >
        {/* Theme icon with animation */}
        <div className="relative z-10 flex items-center justify-center text-white w-full h-full">
          <div className="w-6 h-6 flex items-center justify-center transform transition-transform duration-300 group-hover:rotate-12">
            <span className="text-lg">{themeIcons[currentTheme]}</span>
          </div>
        </div>
        
        {/* Hover effect with theme colors */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
          }}
        ></div>
        
        {/* Subtle border */}
        <div 
          className="absolute inset-0 rounded-full border transition-all duration-300"
          style={{
            borderColor: `${theme.colors.text}20`,
          }}
        ></div>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute top-16 right-0 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-fade-in-up"
          style={{
            position: 'fixed',
            top: '72px',
            right: '16px',
            zIndex: 9998,
            background: theme.colors.secondary,
            border: `1px solid ${theme.colors.primary}30`,
            minWidth: '200px'
          }}
        >
          {Object.entries(themes).map(([key, themeData]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              className="w-full px-4 py-3 text-left hover:bg-opacity-80 transition-all duration-200 flex items-center space-x-3 group"
              style={{
                background: currentTheme === key 
                  ? `linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.secondary})`
                  : 'transparent',
                color: theme.colors.text,
                borderBottom: `1px solid ${theme.colors.primary}20`,
              }}
            >
              <span className="text-xl group-hover:scale-110 transition-transform duration-200">
                {themeIcons[key]}
              </span>
              <div className="flex-1">
                <div className="font-semibold">{themeData.name}</div>
                <div className="text-sm opacity-70" style={{ color: theme.colors.textSecondary }}>
                  {key === 'red' && 'Dark & Bold'}
                  {key === 'purple' && 'Cosmic & Mysterious'}
                  {key === 'pink' && 'Light & Elegant'}
                  {key === 'blue' && 'Fresh & Professional'}
                </div>
              </div>
              {currentTheme === key && (
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ background: theme.colors.primary }}
                ></div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-9997"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
}
