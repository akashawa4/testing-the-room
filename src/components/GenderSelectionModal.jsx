import { useState } from 'react';
import { User, Users } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';


const GenderSelectionModal = ({ onGenderSelect, isUpdateMode = false, onClose }) => {
  const { t } = useLanguage();
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    // Add a small delay for visual feedback
    setTimeout(() => {
      onGenderSelect(gender);
    }, 200);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 animate-slide-up">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {isUpdateMode ? (t('changeGender') || 'Change Gender') : t('welcomeToCollegeRoomRental')}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {isUpdateMode ? (t('selectNewGender') || 'Select your new preference') : t('selectGenderToSeeRooms')}
              </p>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <Button
            onClick={() => handleGenderSelect('boy')}
            className={`w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 ${selectedGender === 'boy'
              ? 'bg-blue-600 hover:bg-blue-700 text-white scale-105'
              : 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200 hover:border-blue-300'
              }`}
            variant={selectedGender === 'boy' ? 'default' : 'outline'}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('boys')}</span>
            </div>
          </Button>

          <Button
            onClick={() => handleGenderSelect('girl')}
            className={`w-full h-14 sm:h-16 text-base sm:text-lg font-semibold rounded-xl transition-all duration-200 ${selectedGender === 'girl'
              ? 'bg-pink-600 hover:bg-pink-700 text-white scale-105'
              : 'bg-pink-50 hover:bg-pink-100 text-pink-700 border-2 border-pink-200 hover:border-pink-300'
              }`}
            variant={selectedGender === 'girl' ? 'default' : 'outline'}
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('girls')}</span>
            </div>
          </Button>
        </div>

        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500">
            {t('changeSelectionLater')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GenderSelectionModal; 