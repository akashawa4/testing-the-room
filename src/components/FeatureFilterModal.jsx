import { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getTranslatedRooms } from '../data/rooms.js';

const FeatureFilterModal = ({ isOpen, onClose, onApplyFilters, currentFilters = {}, currentMaxPrice = 50000 }) => {
  const { t, language } = useLanguage();
  const [selectedFeatures, setSelectedFeatures] = useState(currentFilters);
  const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
  const [availableFeatures, setAvailableFeatures] = useState([]);

  // ... (existing getUniqueFeatures code) ...
  const getUniqueFeatures = () => {
    const rooms = getTranslatedRooms(language);
    const allFeatures = new Set();

    rooms.forEach(room => {
      if (room.features && Array.isArray(room.features)) {
        room.features.forEach(feature => {
          if (feature && typeof feature === 'string' && feature.trim()) {
            allFeatures.add(feature.trim());
          }
        });
      }
    });

    return Array.from(allFeatures)
      .sort()
      .map(feature => ({
        key: feature,
        label: feature
      }));
  };

  // ... (existing useEffects) ...
  useEffect(() => {
    setAvailableFeatures(getUniqueFeatures());
  }, [language]);

  useEffect(() => {
    setSelectedFeatures(currentFilters);
    setMaxPrice(currentMaxPrice);
  }, [currentFilters, currentMaxPrice]);

  const handleFeatureToggle = (featureKey) => {
    setSelectedFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(selectedFeatures, maxPrice);
    onClose();
  };

  const handleClearAll = () => {
    setSelectedFeatures({});
    setMaxPrice(50000); // Reset to default max
  };

  const handleSelectAll = () => {
    const allFeatures = {};
    availableFeatures.forEach(feature => {
      allFeatures[feature.key] = true;
    });
    setSelectedFeatures(allFeatures);
  };

  const selectedCount = Object.values(selectedFeatures).filter(Boolean).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 sm:p-4">
      <div className="bg-white rounded-t-xl sm:rounded-lg shadow-xl w-full sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              {t('filterByFeatures') || 'Filter by Features'}
            </h2>
            {selectedCount > 0 && (
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {selectedCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 overflow-y-auto overscroll-contain max-h-[55vh] sm:max-h-[60vh]">
          <div className="space-y-4 sm:space-y-6">
            {/* Price Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                {t('maxRent') || 'Max Monthly Rent'}: <span className="text-orange-600 font-bold">₹{maxPrice.toLocaleString()}</span>
              </h3>
              <Slider
                defaultValue={[maxPrice]}
                value={[maxPrice]}
                max={50000}
                step={500}
                onValueChange={(vals) => setMaxPrice(vals[0])}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Features list */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-900">
                {t('amenities') || 'Amenities & Features'}
              </h3>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSelectAll}
                  className="text-xs"
                >
                  {t('selectAll') || 'Select All'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-xs"
                >
                  {t('clearAll') || 'Clear All'}
                </Button>
              </div>

              {/* Features list */}
              <div className="space-y-3 pb-2">
                {availableFeatures.map((feature) => (
                  <div key={feature.key} className="flex items-center space-x-3 min-h-[36px]">
                    <Checkbox
                      id={feature.key}
                      checked={selectedFeatures[feature.key] || false}
                      onCheckedChange={() => handleFeatureToggle(feature.key)}
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor={feature.key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {feature.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t('cancel') || 'Cancel'}
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="flex-1 bg-orange-500 hover:bg-orange-600"
          >
            {t('applyFilters') || 'Apply Filters'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureFilterModal;
