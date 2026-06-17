import { useState, useEffect } from 'react';
import { Calendar, Clock, MessageSquare, Phone, Mail, User, X, CheckCircle, AlertCircle, Info, Building } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Textarea } from '@/components/ui/textarea.jsx';
import { Label } from '@/components/ui/label.jsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { addBooking, bookingTypes, bookingStatuses } from '../data/bookings.js';
import { openWhatsAppWithBooking, copyBookingMessage } from '../utils/whatsapp.js';
import { db } from '../firebase.js';
import { doc, getDoc } from 'firebase/firestore';
import ConfirmationModal from './ConfirmationModal.jsx';

const BookingModal = ({ isOpen, onClose, room, onBookingSuccess }) => {
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    type: bookingTypes.INQUIRY,
    message: '',
    requestedDate: '',
    requestedTime: '',
    userName: '',
    userEmail: '',
    userPhone: '',
    userCollege: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Reset form and fetch profile when modal opens
  useEffect(() => {
    if (isOpen) {
      const initializeForm = async () => {
        // Default reset
        let initialData = {
          type: bookingTypes.INQUIRY,
          message: '',
          requestedDate: '',
          requestedTime: '',
          userName: '',
          userEmail: '',
          userPhone: '',
          userCollege: ''
        };

        // If authenticated, try to fetch profile data
        if (isAuthenticated && user?.uid) {
          // Set basic auth data first
          initialData.userName = user.displayName || '';
          initialData.userEmail = user.email || '';

          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              initialData.userName = data.displayName || data.name || user.displayName || '';
              initialData.userPhone = data.phone || '';
              initialData.userCollege = data.college || '';
              initialData.userEmail = user.email || data.email || '';
            }
          } catch (error) {
            console.error("Error fetching profile for booking:", error);
          }
        }

        setFormData(initialData);
        setSubmitStatus(null);
      };

      initializeForm();
    }
  }, [isOpen, isAuthenticated, user]);

  const handleInputChange = (field, value) => {
    // Special handling for phone number to limit to 10 digits
    if (field === 'userPhone') {
      // Remove all non-digit characters and limit to 10 digits
      const cleanValue = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({
        ...prev,
        [field]: cleanValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.userName.trim()) {
      alert(t('pleaseEnterName') || 'Please enter your full name');
      return;
    }

    if (!formData.userPhone.trim()) {
      alert(t('pleaseEnterPhone') || 'Please enter your phone number');
      return;
    }

    // Validate phone number (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = formData.userPhone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      alert(t('invalidPhoneNumber') || 'Please enter a valid 10-digit phone number starting with 6, 7, 8, or 9');
      return;
    }

    if (!formData.userEmail.trim()) {
      alert(t('pleaseEnterEmail') || 'Please enter your email address');
      return;
    }

    if (!formData.userCollege.trim()) {
      alert('Please enter your college name');
      return;
    }

    if (!formData.requestedDate) {
      alert(t('pleaseSelectPreferredDate') || 'Please select your preferred date for visiting');
      return;
    }

    // Show confirmation popup
    setShowConfirmation(true);
  };

  const handleConfirmBooking = async () => {
    setShowConfirmation(false);
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const bookingData = {
        roomId: room.id,
        userId: user?.uid || 'anonymous',
        userName: formData.userName.trim(),
        userEmail: formData.userEmail.trim(),
        userPhone: formData.userPhone.trim(),
        userCollege: formData.userCollege.trim(),
        type: formData.type,
        status: bookingStatuses.PENDING,
        message: formData.message.trim(),
        requestedDate: formData.requestedDate,
        requestedTime: formData.requestedTime
      };

      // Await the async addBooking function
      const newBooking = await addBooking(bookingData);

      // Create a complete booking object with all data for WhatsApp
      const completeBooking = {
        ...bookingData,
        id: newBooking.id,
        createdAt: new Date().toISOString()
      };

      setSubmittedBooking(completeBooking);
      setSubmitStatus('success');

      // Call success callback if provided
      if (onBookingSuccess) {
        onBookingSuccess(completeBooking);
      }

      // Auto redirect to WhatsApp after 1 second
      setTimeout(() => {
        openWhatsAppWithBooking(completeBooking, room);
      }, 1000);

    } catch (error) {
      console.error('Booking submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getBookingTypeLabel = (type) => {
    switch (type) {
      case bookingTypes.INQUIRY:
        return t('inquiry') || 'Inquiry';
      case bookingTypes.BOOKING:
        return t('booking') || 'Booking';
      case bookingTypes.VIEWING:
        return t('viewing') || 'Viewing';
      default:
        return type;
    }
  };

  const getBookingTypeDescription = (type) => {
    switch (type) {
      case bookingTypes.INQUIRY:
        return t('inquiryDescription') || 'Ask questions about the room';
      case bookingTypes.BOOKING:
        return t('bookingDescription') || 'Request to book this room';
      case bookingTypes.VIEWING:
        return t('viewingDescription') || 'Schedule a room viewing';
      default:
        return '';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                {t('bookRoom') || 'Book Room'}
              </h2>
              <p className="text-sm text-gray-600">
                {room.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
          {submitStatus === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('bookingSubmitted') || 'Booking Submitted!'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('bookingSubmittedMessage') || 'Your request has been sent to the room owner. Redirecting to WhatsApp...'}
              </p>

              {/* WhatsApp Actions */}
              <div className="space-y-3">
                <Button
                  onClick={() => openWhatsAppWithBooking(submittedBooking, room)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  {t('openWhatsApp') || 'Open WhatsApp'}
                </Button>

                <Button
                  onClick={async () => {
                    const success = await copyBookingMessage(submittedBooking, room);
                    if (success) {
                      // Show success message
                      alert(t('messageCopied') || 'Message copied to clipboard!');
                    }
                  }}
                  variant="outline"
                  className="w-full"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  {t('copyMessage') || 'Copy Message'}
                </Button>

                <Button
                  onClick={() => window.open(room.mapLink, '_blank')}
                  className="w-full visit-room-btn-attractive relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 group-hover:from-blue-700 group-hover:via-blue-600 group-hover:to-blue-700 transition-all duration-300"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    <div className="relative">
                      <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping"></div>
                    </div>
                    <span className="text-white font-semibold text-lg drop-shadow-lg">
                      {t('visitThisRoom') || 'Visit This Room'}
                    </span>
                    <svg className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </Button>

                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full"
                >
                  {t('close') || 'Close'}
                </Button>
              </div>
            </div>
          ) : submitStatus === 'error' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {t('bookingError') || 'Booking Error'}
              </h3>
              <p className="text-gray-600">
                {t('bookingErrorMessage') || 'There was an error submitting your booking. Please try again.'}
              </p>
              <Button
                onClick={() => setSubmitStatus(null)}
                className="mt-4"
              >
                {t('tryAgain') || 'Try Again'}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Booking Type Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">
                  {t('bookingType') || 'Booking Type'}
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {Object.values(bookingTypes).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleInputChange('type', type)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${formData.type === type
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                        }`}
                    >
                      <div className="font-semibold mb-1">
                        {getBookingTypeLabel(type)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {getBookingTypeDescription(type)}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">
                    {t('fullName') || 'Full Name'} *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="userName"
                      value={formData.userName}
                      onChange={(e) => handleInputChange('userName', e.target.value)}
                      placeholder={t('enterFullName') || 'Enter your full name'}
                      className={`pl-10 ${!formData.userName.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userPhone">
                    {t('phoneNumber') || 'Phone Number'} *
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="userPhone"
                      type="tel"
                      value={formData.userPhone}
                      onChange={(e) => handleInputChange('userPhone', e.target.value)}
                      placeholder={t('enterPhoneNumber') || 'Enter your phone number'}
                      className={`pl-10 ${!formData.userPhone.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">
                    {t('emailAddress') || 'Email Address'} *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="userEmail"
                      type="email"
                      value={formData.userEmail}
                      onChange={(e) => handleInputChange('userEmail', e.target.value)}
                      placeholder={t('enterEmail') || 'Enter your email address'}
                      className={`pl-10 ${!formData.userEmail.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userCollege">
                    Your College / University *
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="userCollege"
                      value={formData.userCollege}
                      onChange={(e) => handleInputChange('userCollege', e.target.value)}
                      placeholder="Enter your college name"
                      className={`pl-10 ${!formData.userCollege.trim() ? 'border-red-300 focus:border-red-500' : ''}`}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestedDate">
                    {t('preferredDate') || 'Preferred Date'} *
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="requestedDate"
                      type="date"
                      value={formData.requestedDate}
                      onChange={(e) => handleInputChange('requestedDate', e.target.value)}
                      className={`pl-10 ${!formData.requestedDate ? 'border-red-300 focus:border-red-500' : ''}`}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">
                  {t('message') || 'Message'}
                </Label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder={t('enterMessage') || 'Tell the room owner about your requirements...'}
                    className="pl-10 min-h-[100px]"
                  />
                </div>
              </div>

              {/* Room Information Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  {t('roomDetails') || 'Room Details'}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">{t('rent') || 'Rent'}:</span>
                    <span className="font-semibold ml-2">₹{room.rent.toLocaleString()}/month</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('location') || 'Location'}:</span>
                    <span className="font-semibold ml-2">{room.location}</span>
                  </div>
                </div>
              </div>

              {/* Important Notice */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-orange-800 mb-1">
                      {t('importantNotice') || 'Important Notice'}
                    </h4>
                    <p className="text-sm text-orange-700">
                      {t('bookingNotice') || 'This platform connects you with room owners. All agreements and payments are made directly between you and the room owner. We are not responsible for any transactions.'}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        {!submitStatus && (
          <div className="p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Info className="w-4 h-4" />
                <span>{t('allFieldsRequired') || 'All fields marked with * are required'}</span>
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  {t('cancel') || 'Cancel'}
                </Button>
                <Button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.userName.trim() || !formData.userPhone.trim() || !formData.userEmail.trim() || !formData.userCollege.trim() || !formData.requestedDate}
                  className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('submitting') || 'Submitting...'}
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 mr-2" />
                      {t('submitBooking') || 'Submit Booking'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirmBooking}
        title="Confirm Booking"
        message={`Are you sure you want to send a booking request for "${room?.title}"? Your contact details will be shared with the room owner.`}
        confirmText="Send Booking"
        cancelText="Cancel"
        type="info"
        isLoading={isSubmitting}
      />
    </div>
  );
};

export default BookingModal;