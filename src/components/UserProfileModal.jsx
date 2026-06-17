import { useState, useEffect } from 'react';
import { X, MapPin, User, Building, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { getUserProfile } from '../services/userService.js';

const UserProfileModal = ({
    isOpen,
    onClose,
    userPreferences,
    onChangeLocation,
    onChangeGender
}) => {
    const { t } = useLanguage();
    const { logout } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        if (isOpen) {
            loadProfile();
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const loadProfile = async () => {
        setIsLoading(true);
        try {
            const profile = await getUserProfile();
            setProfileData(profile);
        } catch (error) {
            console.error('Error loading profile:', error);
            // Fall back to userPreferences if Firebase fails
            setProfileData(userPreferences);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const displayData = profileData || userPreferences;
    const genderDisplay = displayData?.gender === 'boy' ? t('boys') || 'Boys' :
        displayData?.gender === 'girl' ? t('girls') || 'Girls' :
            t('notSet') || 'Not Set';

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-slide-up">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {t('profile') || 'Profile'}
                    </h2>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
                        <p className="text-gray-600">{t('loading') || 'Loading...'}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* City Info */}
                        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{t('city') || 'City'}</p>
                                    <p className="font-semibold text-gray-900">
                                        {displayData?.city || t('notSet') || 'Not Set'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* College Info */}
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                    <Building className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-500">{t('college') || 'College'}</p>
                                    <p className="font-semibold text-gray-900 break-words">
                                        {displayData?.college || t('notSet') || 'Not Set'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Gender Info */}
                        <div className={`p-4 rounded-xl border ${displayData?.gender === 'boy'
                            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                            : displayData?.gender === 'girl'
                                ? 'bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200'
                                : 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                            }`}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${displayData?.gender === 'boy' ? 'bg-blue-500' :
                                    displayData?.gender === 'girl' ? 'bg-pink-500' : 'bg-gray-500'
                                    }`}>
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{t('gender') || 'Gender'}</p>
                                    <p className="font-semibold text-gray-900">{genderDisplay}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                            <Button
                                onClick={onChangeLocation}
                                className="bg-orange-500 hover:bg-orange-600 text-white py-3"
                            >
                                <MapPin className="w-4 h-4 mr-2" />
                                {t('changeLocation') || 'Change Location'}
                            </Button>
                            <Button
                                onClick={onChangeGender}
                                className={`py-3 ${displayData?.gender === 'boy'
                                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                    : displayData?.gender === 'girl'
                                        ? 'bg-pink-500 hover:bg-pink-600 text-white'
                                        : 'bg-gray-500 hover:bg-gray-600 text-white'
                                    }`}
                            >
                                <User className="w-4 h-4 mr-2" />
                                {t('changeGender') || 'Change Gender'}
                            </Button>
                        </div>

                        {/* Logout Button */}
                        <div className="pt-4 border-t border-gray-100">
                            <Button
                                onClick={() => {
                                    onClose();
                                    logout();
                                }}
                                variant="outline"
                                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            >
                                {t('logout') || 'Logout'}
                            </Button>
                        </div>
                    </div>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                        {t('profileNote') || 'Your preferences help us show relevant rooms'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserProfileModal;
