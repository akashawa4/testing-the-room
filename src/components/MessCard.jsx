import React, { useState, useCallback, memo } from 'react';
import { MapPin, Phone, ExternalLink, Utensils, Clock, IndianRupee, X as XIcon, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const MessCard = memo(({ mess, isFirst }) => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  const handleCallClick = useCallback(() => {
    window.location.href = `tel:${mess.contact}`;
  }, [mess.contact]);

  const handleMapClick = useCallback(() => {
    window.open(mess.mapLink, '_blank');
  }, [mess.mapLink]);

  const handleImageClick = useCallback((idx) => {
    setModalImageIdx(idx);
    setModalOpen(true);
  }, []);

  const handlePrevImage = useCallback((e) => {
    e.stopPropagation();
    setModalImageIdx((prev) => (prev === 0 ? mess.images.length - 1 : prev - 1));
  }, [mess.images.length]);

  const handleNextImage = useCallback((e) => {
    e.stopPropagation();
    setModalImageIdx((prev) => (prev === mess.images.length - 1 ? 0 : prev + 1));
  }, [mess.images.length]);

  // Helper function to get main price for display
  const getMainPrice = () => {
    if (mess.pricing?.monthly?.boys?.withoutBreakfast) {
      return mess.pricing.monthly.boys.withoutBreakfast;
    }
    return mess.pricePerMonth || 0;
  };

  // Helper function to get cuisine display
  const getCuisineDisplay = () => {
    if (mess.cuisine && mess.cuisine.length > 0) {
      return mess.cuisine.join(', ');
    }
    return '';
  };

  return (
    <div className="room-card p-6 hover-lift h-full flex flex-col">
      {/* Image Section */}
      <div className="relative mb-4 overflow-hidden rounded-xl flex-shrink-0">
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
          {mess.images && mess.images.length > 0 ? (
            <picture className="h-full w-full flex-shrink-0 cursor-pointer" onClick={() => handleImageClick(0)}>
              <img
                src={mess.images[0]}
                alt={`${mess.title} - 1`}
                className="h-44 md:h-52 lg:h-60 w-full object-cover rounded-lg border border-green-100 hover:scale-105 transition-transform"
                loading={isFirst ? 'eager' : 'lazy'}
                decoding="sync"
                onError={(e) => {
                  e.currentTarget.onerror = null; e.currentTarget.src = '/logo.svg';
                }}
              />
            </picture>
          ) : (
            <div className="text-center w-full">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Utensils className="w-10 h-10 text-white" />
              </div>
              <p className="text-gray-500 text-sm">No image available</p>
            </div>
          )}
          {/* Favorite Button */}
          <button aria-label="Add to favorites" className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal for Images */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl p-0 bg-black/95 flex flex-col items-center justify-center">
          <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 z-10 text-white bg-black/60 rounded-full p-2 hover:bg-black/80">
            <XIcon className="w-6 h-6" />
          </button>
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-400 rounded-full p-2">
              <ChevronLeft className="w-7 h-7 text-black" />
            </button>
            <picture className="flex-grow flex items-center justify-center">
              <img
                src={mess.images[modalImageIdx]}
                alt={`${mess.title} - Fullscreen ${modalImageIdx + 1}`}
                className="object-contain max-h-[70vh] max-w-full rounded-lg shadow-2xl mx-auto"
                style={{ background: '#222' }}
              />
            </picture>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-green-400 rounded-full p-2">
              <ChevronRight className="w-7 h-7 text-black" />
            </button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 py-4 overflow-x-auto w-full justify-center bg-black/60">
            {mess.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumb ${idx + 1}`}
                className={`h-14 w-24 object-cover rounded cursor-pointer border-2 transition-all duration-300 ${idx === modalImageIdx ? 'border-green-400 shadow-lg ring-2 ring-green-400' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => setModalImageIdx(idx)}
                style={{ minWidth: 80 }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Essential Content Section */}
      <div className="space-y-4 flex-1 flex flex-col">
        {/* Title and Price */}
        <div className="flex-shrink-0">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {mess.title}
          </h3>
          <div className="price-highlight text-2xl font-bold text-green-700">
            <IndianRupee className="inline-block w-5 h-5 mr-1" />
            {getMainPrice().toLocaleString()}/month
          </div>
          {getCuisineDisplay() && (
            <div className="text-sm text-gray-700 mt-1">
              Cuisine: {getCuisineDisplay()}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center">
            <MapPin className="w-4 h-4 text-white" />
          </div>
          <span className="font-medium">{mess.location}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 text-gray-600 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <Phone className="w-4 h-4 text-white" />
          </div>
          <button
            onClick={handleCallClick}
            className="font-medium hover:text-blue-600 transition-colors"
          >
            {mess.contact}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4 flex-shrink-0 mt-auto">
          <Button onClick={handleCallClick} className="contact-btn contact-btn-call flex items-center justify-center gap-2" size="sm">
            <Phone className="w-4 h-4" />
            Call Now
          </Button>
          <Button onClick={handleMapClick} className="contact-btn contact-btn-map flex items-center justify-center gap-2" size="sm">
            <ExternalLink className="w-4 h-4" />
            View on Map
          </Button>
        </div>

        {/* View Details Button */}
        <Button
          onClick={() => setModalOpen(true)}
          className="contact-btn contact-btn-details w-full flex items-center justify-center gap-2 mt-3"
        >
          View Details
        </Button>
      </div>

      {/* Detailed Information Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">{mess.title}</h2>
              <p className="text-gray-600 mt-1">{mess.location}</p>
            </div>

            {/* Images */}
            {mess.images && mess.images.length > 0 && (
              <div className="relative">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {mess.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${mess.title} - ${idx + 1}`}
                      className="h-32 w-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-green-400 transition-colors"
                      onClick={() => setModalImageIdx(idx)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Detailed Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pricing Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Pricing & Plans</h3>
                {mess.pricing?.monthly ? (
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="font-medium text-green-800">Boys</div>
                      <div className="text-sm text-gray-700">
                        Without breakfast: ₹{mess.pricing.monthly.boys.withoutBreakfast}/month<br/>
                        With breakfast: ₹{mess.pricing.monthly.boys.withBreakfast}/month
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="font-medium text-green-800">Girls</div>
                      <div className="text-sm text-gray-700">
                        Without breakfast: ₹{mess.pricing.monthly.girls.withoutBreakfast}/month<br/>
                        With breakfast: ₹{mess.pricing.monthly.girls.withBreakfast}/month
                      </div>
                    </div>
                    {mess.pricing.perMeal && (
                      <div className="text-sm text-gray-700">
                        <span className="font-medium">Per meal:</span> ₹{mess.pricing.perMeal}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    Monthly: ₹{mess.pricePerMonth}/month<br/>
                    {mess.pricePerMeal && `Per meal: ₹${mess.pricePerMeal}`}
                  </div>
                )}
              </div>

              {/* Timings & Menu */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Timings & Menu</h3>
                {mess.timings && typeof mess.timings === 'object' ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-medium">Meal Timings</span>
                    </div>
                    <div className="ml-6 space-y-1 text-sm">
                      <div>Breakfast: {mess.timings.breakfast}</div>
                      <div>Lunch: {mess.timings.lunch}</div>
                      <div>Dinner: {mess.timings.dinner}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Timings:</span> {mess.timings}
                  </div>
                )}
                
                {mess.breakfastMenu && (
                  <div className="text-sm text-gray-700">
                    <span className="font-medium">Breakfast:</span> {mess.breakfastMenu.join(', ')}
                  </div>
                )}
              </div>
            </div>

            {/* Meal Details */}
            {mess.pricing?.perPlate && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Meal Details</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="font-medium mb-2">Standard Plate</div>
                  <div className="text-sm text-gray-700">{mess.pricing.perPlate.description}</div>
                  
                  {mess.pricing.perPlate.addons?.specials && (
                    <div className="mt-3">
                      <div className="font-medium mb-2">Weekly Specials</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium">Wednesday:</span><br/>
                          <span className="text-gray-600">Veg: {mess.pricing.perPlate.addons.specials.wednesday.veg}</span><br/>
                          <span className="text-gray-600">Non-Veg: {mess.pricing.perPlate.addons.specials.wednesday.nonVeg}</span>
                        </div>
                        <div>
                          <span className="font-medium">Sunday:</span><br/>
                          <span className="text-gray-600">Veg: {mess.pricing.perPlate.addons.specials.sunday.veg}</span><br/>
                          <span className="text-gray-600">Non-Veg: {mess.pricing.perPlate.addons.specials.sunday.nonVeg}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rules & Policies */}
            {mess.rules && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Rules & Policies</h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                  <div>• {mess.rules.leavePolicy}</div>
                  <div>• {mess.rules.messOff}</div>
                  <div>• Chapati: {mess.rules.chapatiPolicy.lunch} (lunch), {mess.rules.chapatiPolicy.dinner} (dinner)</div>
                  <div>• {mess.rules.service}</div>
                </div>
              </div>
            )}

            {/* Features */}
            {mess.features && mess.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Facilities</h3>
                <div className="flex flex-wrap gap-2">
                  {mess.features.map((feature, idx) => (
                    <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-center gap-4">
                <Button onClick={handleCallClick} className="contact-btn contact-btn-call flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
                <Button onClick={handleMapClick} className="contact-btn contact-btn-map flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
});

export default MessCard;




