import React, { useState, Suspense, lazy, useCallback, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Phone, Users, CheckCircle, Shield, Award, X } from 'lucide-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Notification from './Notification.jsx';
import TermsAndConditionsModal from './TermsAndConditionsModal.jsx';
import { Button } from '@/components/ui/button.jsx';

import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useUserPreferences } from '../contexts/UserPreferencesContext.jsx';

// Lazy load modals
const LocationSelectionModal = lazy(() => import('./LocationSelectionModal.jsx'));
const GenderSelectionModal = lazy(() => import('./GenderSelectionModal.jsx'));
const UserProfileModal = lazy(() => import('./UserProfileModal.jsx'));
const BookingManagementModal = lazy(() => import('./BookingManagementModal.jsx'));
const UserStatisticsModal = lazy(() => import('./UserStatisticsModal.jsx'));

// Loading component
const ModalLoadingSpinner = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
            <span className="text-gray-600">Loading...</span>
        </div>
    </div>
);

const Layout = () => {
    const { t } = useLanguage();
    const { isAuthenticated, user } = useAuth();
    const {
        selectedLocation,
        setSelectedLocation,
        selectedGender,
        setSelectedGender,
        hasAcceptedTerms,
        setHasAcceptedTerms
    } = useUserPreferences();

    // Modal Visibility State
    const [showLocationSelection, setShowLocationSelection] = useState(false);
    const [showGenderSelection, setShowGenderSelection] = useState(false);
    const [showContactPopup, setShowContactPopup] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showBookingManagement, setShowBookingManagement] = useState(false);
    const [showUserStatistics, setShowUserStatistics] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false });

    // Update Modes
    const [isLocationUpdateMode, setIsLocationUpdateMode] = useState(false);
    const [isGenderUpdateMode, setIsGenderUpdateMode] = useState(false);

    // Handlers
    const handleTermsAccept = useCallback(() => {
        setHasAcceptedTerms(true);
        setShowTermsModal(false);
        setShowLocationSelection(true);
    }, [setHasAcceptedTerms]);

    const handleTermsDecline = useCallback(() => {
        setShowTermsModal(false);
    }, []);

    const handleChangeLocation = useCallback(() => {
        setIsLocationUpdateMode(true);
        setShowLocationSelection(true);
    }, []);

    const handleChangeGender = useCallback(() => {
        setIsGenderUpdateMode(true);
        setShowGenderSelection(true);
    }, []);

    const handleLocationSelect = useCallback((location) => {
        setSelectedLocation(location);
        setShowLocationSelection(false);
        if (!isLocationUpdateMode) {
            setShowGenderSelection(true);
        } else {
            setIsLocationUpdateMode(false);
            setNotification({
                message: 'Location updated successfully!',
                type: 'success',
                isVisible: true
            });
        }
    }, [isLocationUpdateMode, setSelectedLocation]);

    const handleGenderSelect = useCallback((gender) => {
        setSelectedGender(gender);
        setShowGenderSelection(false);
        if (isGenderUpdateMode) {
            setIsGenderUpdateMode(false);
            setNotification({
                message: 'Gender updated successfully!',
                type: 'success',
                isVisible: true
            });
        }
    }, [isGenderUpdateMode, setSelectedGender]);

    // Onboarding Check
    const navigate = useNavigate();
    const location = useLocation();

    // Show terms modal only after authentication
    useEffect(() => {
        if (isAuthenticated && !hasAcceptedTerms) {
            setShowTermsModal(true);
        }
    }, [isAuthenticated, hasAcceptedTerms]);

    useEffect(() => {
        const checkProfile = async () => {
            if (isAuthenticated && user?.uid && location.pathname !== '/profile') {
                try {
                    const { doc, getDoc } = await import('firebase/firestore');
                    const { db } = await import('../firebase.js');

                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        // Check if critical fields are missing
                        if (!data.phone || !data.college) {
                            // Only redirect if not already there
                            navigate('/profile?onboarding=true');
                        }
                    } else {
                        // No profile at all
                        navigate('/profile?onboarding=true');
                    }
                } catch (error) {
                    console.error("Error checking profile:", error);
                }
            }
        };

        // Run check after a short delay to ensure auth is settled
        const timer = setTimeout(checkProfile, 2000);
        return () => clearTimeout(timer);
    }, [isAuthenticated, user, location.pathname, navigate]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex flex-col">
            <Notification
                message={notification.message}
                type={notification.type}
                isVisible={notification.isVisible}
                onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
            />

            {isAuthenticated && (
                <TermsAndConditionsModal
                    isOpen={showTermsModal}
                    onAccept={handleTermsAccept}
                    onDecline={handleTermsDecline}
                    t={t}
                />
            )}

            {/* Global Header */}
            {isAuthenticated && (
                <Header
                    onChangeLocation={handleChangeLocation}
                    onChangeGender={handleChangeGender}
                    onContactUs={() => setShowContactPopup(true)}
                    onShowProfile={() => setShowProfileModal(true)}
                    onShowBookingManagement={() => setShowBookingManagement(true)}
                    onShowUserStatistics={() => setShowUserStatistics(true)}
                />
            )}

            {/* Main Content */}
            <main className="flex-grow">
                <Outlet />
            </main>

            {/* Global Footer - Only show if authenticated to avoid clutter on login or if desired site-wide */}
            {isAuthenticated && <Footer />}


            {/* Modals */}
            {(isAuthenticated && showLocationSelection && hasAcceptedTerms) && (
                <Suspense fallback={<ModalLoadingSpinner />}>
                    <LocationSelectionModal
                        onLocationSelect={handleLocationSelect}
                        onClose={() => setShowLocationSelection(false)}
                    />
                </Suspense>
            )}

            {(isAuthenticated && showGenderSelection && hasAcceptedTerms) && (
                <Suspense fallback={<ModalLoadingSpinner />}>
                    <GenderSelectionModal
                        onGenderSelect={handleGenderSelect}
                        onClose={() => setShowGenderSelection(false)}
                    />
                </Suspense>
            )}

            <Suspense fallback={<ModalLoadingSpinner />}>
                <UserProfileModal
                    isOpen={showProfileModal}
                    onClose={() => setShowProfileModal(false)}
                    userPreferences={{
                        city: selectedLocation?.city,
                        college: selectedLocation?.college,
                        gender: selectedGender
                    }}
                    onChangeLocation={handleChangeLocation}
                    onChangeGender={handleChangeGender}
                />
            </Suspense>

            {showBookingManagement && (
                <Suspense fallback={<ModalLoadingSpinner />}>
                    <BookingManagementModal
                        isOpen={showBookingManagement}
                        onClose={() => setShowBookingManagement(false)}
                    />
                </Suspense>
            )}

            {showUserStatistics && (
                <Suspense fallback={<ModalLoadingSpinner />}>
                    <UserStatisticsModal
                        onClose={() => setShowUserStatistics(false)}
                    />
                </Suspense>
            )}

            {/* Contact Popup Modal */}
            {showContactPopup && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">
                                        Contact Us
                                    </h2>
                                    <p className="text-sm text-gray-600">
                                        For Room Registration
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowContactPopup(false)}
                                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="space-y-6">
                                {/* Contact Information */}
                                <div className="space-y-4">
                                    {/* Address */}
                                    <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                                        <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-orange-800 mb-1">📍 Address</h3>
                                            <p className="text-sm text-orange-700 leading-relaxed">
                                                Dr. DY Patil Pratishthan's College of Engineering, Salokhenaga, Kolhapur, Maharashtra, 416007 India
                                            </p>
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-blue-800 mb-1">📞 Phone</h3>
                                            <a
                                                href="tel:+917385553529"
                                                className="text-sm text-blue-700 hover:text-blue-900 transition-colors"
                                            >
                                                +91 7385553529
                                            </a>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-1">✉️ Email</h3>
                                            <a
                                                href="mailto:contactnivasispace@gmail.com"
                                                className="text-sm text-green-700 hover:text-green-900 transition-colors"
                                            >
                                                contactnivasispace@gmail.com
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Button
                                        onClick={() => window.open('tel:+917385553529', '_self')}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                    >
                                        <Phone className="w-4 h-4 mr-2" />
                                        Call Now
                                    </Button>

                                    <Button
                                        onClick={() => window.open('mailto:contactnivasispace@gmail.com', '_self')}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        Send Email
                                    </Button>

                                    <Button
                                        onClick={() => setShowContactPopup(false)}
                                        variant="outline"
                                        className="w-full"
                                    >
                                        Close
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Layout;
