import React, { useState, useCallback, memo } from 'react';
import { MapPin, Phone, ExternalLink, Heart, Star, ChevronLeft, ChevronRight, X as XIcon, Calendar, EyeOff, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Dialog, DialogContent } from '@/components/ui/dialog.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const RoomCard = memo(({ room, onViewDetails, isAdmin, onEdit, onDelete, isFirst, onBookNow, onToggleHidden }) => {
  const { t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageIdx, setModalImageIdx] = useState(0);

  const handleCallClick = useCallback(() => {
    window.location.href = `tel:${room.contact}`;
  }, [room.contact]);

  const handleMapClick = useCallback(() => {
    window.open(room.mapLink, '_blank');
  }, [room.mapLink]);

  const handleImageClick = useCallback((idx) => {
    setModalImageIdx(idx);
    setModalOpen(true);
  }, []);

  const handlePrevImage = useCallback((e) => {
    e.stopPropagation();
    setModalImageIdx((prev) => (prev === 0 ? room.images.length - 1 : prev - 1));
  }, [room.images.length]);

  const handleNextImage = useCallback((e) => {
    e.stopPropagation();
    setModalImageIdx((prev) => (prev === room.images.length - 1 ? 0 : prev + 1));
  }, [room.images.length]);

  const handleViewDetails = useCallback(() => {
    onViewDetails(room);
  }, [onViewDetails, room]);

  const handleEdit = useCallback(() => {
    onEdit(room);
  }, [onEdit, room]);

  const handleBookNow = useCallback(() => {
    if (onBookNow) {
      onBookNow(room);
    }
  }, [onBookNow, room]);

  // Safely normalize image URLs so they work in src attributes.
  // - Encodes spaces so paths like "/Ayan Mulla/..." work
  // - Leaves blob: URLs (used for newly added rooms) untouched
  const getSafeImageUrl = useCallback((url) => {
    if (!url || typeof url !== 'string') return null;
    if (url.startsWith('blob:')) return url;
    // Encode only spaces to avoid breaking already-encoded URLs
    return url.replace(/ /g, '%20');
  }, []);

  const primaryImage = room.images && room.images.length > 0 ? getSafeImageUrl(room.images[0]) : null;

  const handleToggleHidden = useCallback(() => {
    if (onToggleHidden) {
      onToggleHidden();
    }
  }, [onToggleHidden]);

  return (
    <div className={`room-card p-3 sm:p-4 hover-lift h-full flex flex-col ${room.hidden ? 'opacity-60 border-2 border-dashed border-gray-400' : ''}`}>
      {/* Hidden Badge for Admin */}
      {room.hidden && isAdmin && (
        <div className="absolute top-2 left-2 z-10 bg-gray-800/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <EyeOff className="w-3 h-3" />
          <span className="hidden xs:inline">Hidden</span>
        </div>
      )}
      {/* Image Section (only first image visible) */}
      <div className="relative mb-4 overflow-hidden rounded-xl flex-shrink-0">
        <div className="w-full h-48 md:h-56 lg:h-64 bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center">
          {primaryImage ? (
            <div className="h-full w-full flex-shrink-0 cursor-pointer" onClick={onViewDetails}>
              <img
                src={primaryImage}
                alt={`${room.title} - 1`}
                className="h-44 md:h-52 lg:h-60 w-full object-cover rounded-lg border border-orange-100 hover:scale-105 transition-transform"
                loading={isFirst ? "eager" : 'lazy'}
                decoding="sync"
                onError={e => {
                  console.error(`Failed to load image: ${primaryImage}`, e);
                  console.error('Room data:', room);
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  if (isFirst) {
                    console.log(`Successfully loaded critical image: ${primaryImage}`);
                  }
                }}
              />
            </div>
          ) : (
            <div className="text-center w-full">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <img src="/logo.svg" alt="Nivasi Space Logo" className="w-12 h-12 object-contain" />
              </div>
              <p className="text-gray-500 text-sm">{t('noImageAvailable')}</p>
            </div>
          )}
          {/* Favorite Button */}
          <button aria-label={t('addToFavorites')} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>

      {/* Fullscreen Modal for Images (unchanged) */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-3xl p-0 bg-black/95 flex flex-col items-center justify-center">
          <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 z-10 text-white bg-black/60 rounded-full p-2 hover:bg-black/80"><XIcon className="w-6 h-6" /></button>
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: '60vh' }}>
            <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-orange-400 rounded-full p-2"><ChevronLeft className="w-7 h-7 text-black" /></button>
            <div className="flex-grow flex items-center justify-center">
              <img
                src={getSafeImageUrl(room.images[modalImageIdx])}
                alt={`${room.title} - Fullscreen ${modalImageIdx + 1}`}
                className="object-contain max-h-[70vh] max-w-full rounded-lg shadow-2xl mx-auto"
                style={{ background: '#222' }}
              />
            </div>
            <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-orange-400 rounded-full p-2"><ChevronRight className="w-7 h-7 text-black" /></button>
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 py-4 overflow-x-auto w-full justify-center bg-black/60">
            {room.images.map((img, idx) => (
              <img
                key={idx}
                src={getSafeImageUrl(img)}
                alt={`Thumb ${idx + 1}`}
                className={`h-14 w-24 object-cover rounded cursor-pointer border-2 transition-all duration-300 ${idx === modalImageIdx ? 'border-orange-400 shadow-lg ring-2 ring-orange-400' : 'border-transparent opacity-70 hover:opacity-100'}`}
                onClick={() => setModalImageIdx(idx)}
                style={{ minWidth: 80 }}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced Content Section */}
      <div className="space-y-2 flex-1 flex flex-col">
        {/* Title and Price */}
        <div className="flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 leading-tight">
            {room.title}
          </h3>
          <div className="price-highlight text-xl font-bold">
            ₹{room.rent.toLocaleString()}/month <span className="text-xs font-semibold">{room.pricingType === 'perRoom' ? t('perRoom') : t('perStudent')}</span>
          </div>
          {room.note && (
            <div className="text-sm font-bold text-gray-700 mt-1 leading-snug">
              {room.note}
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 text-gray-600 flex-shrink-0 text-sm">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium leading-snug">{room.location}</span>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 text-gray-600 flex-shrink-0 text-sm">
          <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Phone className="w-3 h-3 text-white" />
          </div>
          <button
            onClick={handleCallClick}
            className="font-medium hover:text-blue-600 transition-colors"
            aria-label={t('callNow')}
          >
            {room.contact}
          </button>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
          {/* Row 1: Call & Map */}
          <Button
            onClick={handleCallClick}
            className="contact-btn contact-btn-call flex items-center justify-center gap-1 text-xs h-9"
            size="sm"
          >
            <Phone className="w-3 h-3" />
            {t('callNow')}
          </Button>
          <Button
            onClick={handleMapClick}
            className="contact-btn contact-btn-map flex items-center justify-center gap-1 text-xs h-9"
            size="sm"
          >
            <ExternalLink className="w-3 h-3" />
            {t('viewOnMap')}
          </Button>

          {/* Row 2: Details & Book */}
          <Button
            onClick={handleViewDetails}
            className="contact-btn contact-btn-details flex items-center justify-center gap-1 text-xs h-9"
            size="sm"
          >
            {t('viewDetails')}
          </Button>
          <Button
            onClick={handleBookNow}
            className="book-now-btn-high-contrast flex items-center justify-center gap-1 text-xs h-9"
            size="sm"
          >
            <Calendar className="w-3 h-3" />
            {t('bookNow') || 'Book Now'}
          </Button>
        </div>

        {/* Admin Actions */}
        {isAdmin && (
          <div className="flex flex-col gap-1.5 sm:gap-2 mt-2">
            <Button
              onClick={handleToggleHidden}
              variant="outline"
              className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm h-9 sm:h-10 touch-manipulation active:scale-[0.98] transition-transform ${room.hidden ? 'bg-green-50 border-green-300 text-green-700 hover:bg-green-100 active:bg-green-200' : 'bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 active:bg-yellow-200'}`}
              size="sm"
            >
              {room.hidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              {room.hidden ? 'Unhide' : 'Hide'}
            </Button>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              <Button
                onClick={handleEdit}
                className="btn-secondary flex items-center justify-center gap-1 text-xs sm:text-sm h-9 sm:h-10 touch-manipulation active:scale-[0.98] transition-transform"
                size="sm"
              >
                {t('update')}
              </Button>
              <Button
                onClick={onDelete}
                variant="outline"
                className="flex items-center justify-center gap-1 text-xs sm:text-sm h-9 sm:h-10 border-red-300 text-red-700 hover:bg-red-50 active:bg-red-100 touch-manipulation active:scale-[0.98] transition-transform"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default RoomCard;

