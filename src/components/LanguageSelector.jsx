import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const languageNames = {
    en: 'English',
    hi: 'हिंदी',
    mr: 'मराठी'
  };

  // Calculate dropdown position when opening
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.right - 120, // 120px is min-width
        width: 120
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center gap-2 px-3 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-all border border-white/30"
        >
          <Globe className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{languageNames[currentLanguage]}</span>
          <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {isOpen && createPortal(
        <div
          ref={dropdownRef}
          className="fixed bg-white rounded-lg shadow-lg border border-gray-200 z-[9999] min-w-[120px] animate-fade-in"
          style={{
            top: dropdownPosition.top,
            left: dropdownPosition.left,
            width: dropdownPosition.width
          }}
        >
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 transition-colors ${currentLanguage === lang ? 'bg-orange-50 text-orange-700 font-medium' : 'text-gray-700'
                }`}
            >
              {languageNames[lang]}
            </button>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};

export default LanguageSelector; 