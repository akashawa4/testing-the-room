import { useState, useEffect } from 'react';
import {
  X,
  Phone,
  MapPin,
  ExternalLink,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Heart,
  Wifi,
  Car,
  Shield,
  Zap,
  Calendar,
  Home,
  Users,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useIsMobile } from '@/hooks/use-mobile.js';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import BookingModal from './BookingModal.jsx';

const RoomDetailModal = ({ room, onClose }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [shareMessage, setShareMessage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const isMobile = useIsMobile();

  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${room.contact}`;
  };

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleBookingSuccess = (booking) => {
    console.log('Booking successful:', booking);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
  };

  const handleViewOnMap = () => {
    window.open(room.mapLink, '_blank');
  };

  const handleShare = async () => {
    // Create a shareable URL with room ID
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}?room=${room.id}`;

    const shareData = {
      title: room.title,
      text: `Check out this room: ${room.title} - Rs.${room.rent}/month on Nivasi Space`,
      url: shareUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareMessage(t('sharedSuccessfully'));
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}\n\n${t('foundOnNivasi')}`;
      navigator.clipboard.writeText(shareText).then(() => {
        setShareMessage(t('linkCopied'));
      });
    }

    setTimeout(() => setShareMessage(''), 3000);
  };

  const getAmenityIcon = (amenity) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi className="w-4 h-4" />;
    if (lower.includes('parking')) return <Car className="w-4 h-4" />;
    if (lower.includes('security')) return <Shield className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 md:p-4">
      <div className="bg-white w-full max-w-6xl max-h-[95vh] rounded-xl shadow-2xl overflow-hidden flex flex-col animate-fade-scale">

        {/* Header - Mobile Only */}
        <div className="lg:hidden sticky top-0 bg-white border-b px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-gray-900 truncate flex-1 mr-4">{room.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content - Flipkart Style Layout */}
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col lg:flex-row">

            {/* LEFT SIDE - Image Gallery */}
            <div className="lg:w-[45%] xl:w-[40%] lg:sticky lg:top-0 lg:h-[calc(95vh-60px)] bg-gray-50 p-3 sm:p-4 lg:p-5 flex items-center">
              <div className="flex flex-col lg:flex-row gap-3 w-full">

                {/* Vertical Thumbnails - Desktop Only */}
                <div className="hidden lg:flex flex-col gap-2 w-16 overflow-y-auto max-h-[450px] custom-scrollbar flex-shrink-0">
                  {room.images && room.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-14 h-14 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${idx === currentImageIndex
                        ? 'border-orange-500 shadow-md'
                        : 'border-gray-200 hover:border-orange-300'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Main Image */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm w-full">
                    {room.images && room.images.length > 0 ? (
                      <>
                        <img
                          src={room.images[currentImageIndex]}
                          alt={`${room.title} - Image ${currentImageIndex + 1}`}
                          className="w-full h-auto max-h-[35vh] sm:max-h-[45vh] lg:max-h-[60vh] object-contain cursor-zoom-in mx-auto block"
                          onClick={() => setIsFullscreen(true)}
                        />

                        {/* Navigation Arrows */}
                        {room.images.length > 1 && (
                          <>
                            <button
                              onClick={handlePrevImage}
                              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all active:scale-95"
                            >
                              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
                            </button>
                            <button
                              onClick={handleNextImage}
                              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full shadow-md flex items-center justify-center transition-all active:scale-95"
                            >
                              <ChevronRight className="w-5 h-5 text-gray-700" />
                            </button>
                          </>
                        )}

                        {/* Favorite Button */}
                        <button
                          onClick={() => setIsFavorite(!isFavorite)}
                          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${isFavorite ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400 hover:text-red-500'
                            }`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>

                        {/* Image Counter */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full">
                          {currentImageIndex + 1} / {room.images.length}
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <div className="text-center">
                          <Home className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                          <p className="text-gray-500">{t('noImageAvailable')}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Horizontal Thumbnails - Mobile Only */}
                  {room.images && room.images.length > 1 && (
                    <div className="lg:hidden flex gap-2 mt-3 overflow-x-auto pb-2 scrollbar-hide">
                      {room.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`w-14 h-14 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all ${idx === currentImageIndex
                            ? 'border-orange-500'
                            : 'border-gray-200'
                            }`}
                        >
                          <img
                            src={img}
                            alt={`Thumb ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Room Details */}
            <div className="lg:w-[55%] xl:w-[60%] p-4 lg:p-6 lg:pl-8 space-y-5">

              {/* Title & Location */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900 leading-tight flex-1">
                    {room.title}
                  </h1>
                  {/* Close Button - Desktop Only */}
                  <button
                    onClick={onClose}
                    className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-2">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">{room.location}</span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-gray-900">₹{room.rent.toLocaleString()}</span>
                  <span className="text-gray-600">/month</span>
                  <span className="text-sm text-orange-600 font-medium bg-orange-100 px-2 py-0.5 rounded">
                    {room.pricingType === 'perRoom' ? t('perRoom') : t('perStudent')}
                  </span>
                </div>
                {room.note && (
                  <p className="text-sm text-gray-700 mt-2 font-medium">{room.note}</p>
                )}
              </div>

              {/* Room Type */}
              {room.rooms && (
                <div className="flex items-center gap-3 text-gray-700">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Room Type</p>
                    <p className="font-semibold">{room.rooms}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={handleCall}
                  variant="outline"
                  className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-gray-300 py-3 text-sm font-semibold shadow-sm"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t('callNow')}
                </Button>
                <Button
                  onClick={handleBookNow}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-3 text-sm font-semibold"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {t('bookNow') || 'Book Now'}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={handleViewOnMap}
                  className="py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(135deg, #4285F4 0%, #34A853 35%, #FBBC05 70%, #EA4335 100%)'
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('viewOnMap')}
                </Button>
                <Button
                  onClick={handleShare}
                  className="py-3 text-sm font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  {t('shareRoom')}
                </Button>
              </div>

              {shareMessage && (
                <div className="flex items-center gap-2 text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                  <Check className="w-4 h-4" />
                  {shareMessage}
                </div>
              )}

              {/* Features/Amenities */}
              {room.features && room.features.length > 0 && (
                <div className="border-t pt-5">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                    {t('features') || 'Amenities'}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {room.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="truncate">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description/Conditions */}
              {room.description && (
                <div className="border-t pt-5">
                  <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                    {t('conditions') || 'Conditions'}
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {room.description.split(/,|\n/).map((item, idx) => (
                      item.trim() && (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 flex-shrink-0"></span>
                          {item.trim()}
                        </li>
                      )
                    ))}
                  </ul>
                </div>
              )}

              {/* Address */}
              <div className="border-t pt-5">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                  {t('location') || 'Location'}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 text-sm">{room.address}</p>
                  <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {room.location}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="border-t pt-5 pb-4">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
                  Contact
                </h3>
                <button
                  onClick={handleCall}
                  className="flex items-center gap-3 w-full text-left hover:bg-gray-50 p-2 -ml-2 rounded-lg transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{room.contact}</p>
                    <p className="text-xs text-gray-500">Tap to call</p>
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        room={room}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Fullscreen Image View */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 bg-white/20 hover:bg-white/40 rounded-full p-2 sm:p-3 transition-colors active:scale-95"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Image Counter */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full max-w-[70vw] truncate">
            <span className="hidden sm:inline">{room.title} • </span>{currentImageIndex + 1} / {room.images?.length || 0}
          </div>

          {/* Navigation */}
          {room.images && room.images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/40 rounded-full p-2 sm:p-3 transition-colors active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 bg-white/20 hover:bg-white/40 rounded-full p-2 sm:p-3 transition-colors active:scale-95"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </button>
            </>
          )}

          {/* Main Image */}
          <img
            src={room.images?.[currentImageIndex]}
            alt={`${room.title} - Full Size`}
            className="max-w-[95vw] sm:max-w-[90vw] max-h-[75vh] sm:max-h-[85vh] object-contain"
          />

          {/* Thumbnails */}
          {room.images && room.images.length > 1 && (
            <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 bg-black/60 p-1.5 sm:p-2 rounded-lg max-w-[95vw] overflow-x-auto scrollbar-hide">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-12 h-9 sm:w-16 sm:h-12 rounded overflow-hidden border-2 flex-shrink-0 transition-all active:scale-95 ${idx === currentImageIndex ? 'border-orange-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomDetailModal;
