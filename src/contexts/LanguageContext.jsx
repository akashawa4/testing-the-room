import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [translations, setTranslations] = useState({ en: {} });
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(false);

  // Load translations dynamically
  useEffect(() => {
    const loadTranslations = async () => {
      if (currentLanguage === 'en') {
        // English translations are loaded by default
        const { translations } = await import('../data/translations.js');
        setTranslations(translations);
        return;
      }

      setIsLoadingTranslations(true);
      try {
        const { translations } = await import('../data/translations.js');
        setTranslations(translations);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const { translations } = await import('../data/translations.js');
        setTranslations(translations);
      } finally {
        setIsLoadingTranslations(false);
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  const t = (key) => {
    return translations[currentLanguage]?.[key] || translations.en?.[key] || key;
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    // Store in localStorage for persistence
    localStorage.setItem('preferredLanguage', language);
  };

  // Initialize language from localStorage on mount
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['en', 'hi', 'mr'].includes(savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    isLoadingTranslations,
    availableLanguages: ['en', 'hi', 'mr']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 