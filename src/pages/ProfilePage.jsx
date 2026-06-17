import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Building, Save, Loader2, CheckCircle, Users, LogOut, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Label } from '@/components/ui/label.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useUserPreferences } from '../contexts/UserPreferencesContext.jsx';
import { db } from '../firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate, useSearchParams } from 'react-router-dom';

// List of colleges
const COLLEGES = [
    "Dr. D. Y. Patil Prathisthan's College of Engineering, Salokhenagar (DYPSN) Kolhapur",
    "Shivaji University, Kolhapur",
    "KIT's College of Engineering, Kolhapur",
    "Rajarambapu Institute of Technology, Islampur",
    "Bharati Vidyapeeth's College of Engineering, Kolhapur",
    "D. Y. Patil College of Engineering and Technology, Kolhapur",
    "Sanjay Ghodawat University, Kolhapur",
    "DKTE's Textile and Engineering Institute, Ichalkaranji",
    "Annasaheb Dange College of Engineering, Ashta",
    "Padmabhooshan Vasantraodada Patil Institute of Technology, Sangli",
    "Other"
];

// List of cities
const CITIES = [
    "Kolhapur",
    "Sangli",
    "Ichalkaranji",
    "Islampur",
    "Satara",
    "Miraj",
    "Karad",
    "Other"
];

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth();
    const { setSelectedGender } = useUserPreferences();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isOnboarding = searchParams.get('onboarding') === 'true';

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [formData, setFormData] = useState({
        displayName: '',
        phone: '',
        college: '',
        city: '',
        email: '',
        gender: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Redirect if not logged in
            return;
        }

        const fetchUserProfile = async () => {
            if (user?.uid) {
                try {
                    const userDocRef = doc(db, 'users', user.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const data = userDoc.data();
                        setFormData({
                            displayName: data.displayName || user.displayName || '',
                            email: user.email || '',
                            phone: data.phone || '',
                            college: data.college || '',
                            city: data.city || '',
                            gender: data.gender || ''
                        });
                        // Sync gender with UserPreferences for room filtering
                        if (data.gender) {
                            setSelectedGender(data.gender);
                        }
                    } else {
                        // Initialize with auth data
                        setFormData({
                            displayName: user.displayName || '',
                            email: user.email || '',
                            phone: '',
                            college: '',
                            city: '',
                            gender: ''
                        });
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        fetchUserProfile();
    }, [user, isAuthenticated, navigate]);

    const handleInputChange = (field, value) => {
        if (field === 'phone') {
            // Only allow numbers
            const cleanValue = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [field]: cleanValue }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
        setSaveSuccess(false);
    };

    const handleLogout = async () => {
        try {
            const { signOut } = await import('../firebase.js');
            const { auth } = await import('../firebase.js');
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.phone || formData.phone.length < 10) {
            alert("Please enter a valid 10-digit phone number");
            return;
        }
        if (!formData.college) {
            alert("Please select your college");
            return;
        }
        if (!formData.city) {
            alert("Please select your city");
            return;
        }
        if (!formData.gender) {
            alert("Please select your gender");
            return;
        }

        setIsSaving(true);
        setSaveSuccess(false);

        try {
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                displayName: formData.displayName,
                email: formData.email,
                phone: formData.phone,
                college: formData.college,
                city: formData.city,
                gender: formData.gender,
                updatedAt: new Date().toISOString()
            }, { merge: true });

            // Sync gender with UserPreferences context for room filtering
            setSelectedGender(formData.gender);

            setSaveSuccess(true);

            // Redirect to home after 1.5 seconds
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } catch (error) {
            console.error("Error saving profile:", error);
            alert("Failed to save profile.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 sm:px-8 py-8 sm:py-10 text-white">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                                    <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold">
                                        {isOnboarding ? 'Complete Your Profile' : 'My Profile'}
                                    </h1>
                                    <p className="text-orange-100 mt-1 text-sm sm:text-base">
                                        {isOnboarding ? 'Please fill in your details to continue' : 'Manage your personal information'}
                                    </p>
                                </div>
                            </div>
                            {!isOnboarding && (
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span className="hidden sm:inline">Logout</span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="p-6 sm:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Success Message */}
                            {saveSuccess && (
                                <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3 border border-green-200 animate-in fade-in slide-in-from-top-2">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Profile updated successfully! Redirecting to rooms...</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="displayName" className="text-gray-700">Full Name</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="displayName"
                                            value={formData.displayName}
                                            onChange={(e) => handleInputChange('displayName', e.target.value)}
                                            className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>

                                {/* Email (Read-only) */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="email"
                                            value={formData.email}
                                            readOnly
                                            className="pl-10 bg-gray-50 text-gray-500 border-gray-200 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500">Email cannot be changed.</p>
                                </div>

                                {/* Phone Number */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-gray-700">Phone Number *</Label>
                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <Input
                                            id="phone"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="pl-10 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                                            placeholder="Enter 10-digit number"
                                            type="tel"
                                            maxLength={10}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Gender Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="gender" className="text-gray-700">Gender *</Label>
                                    <div className="relative">
                                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                                        <select
                                            id="gender"
                                            value={formData.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 outline-none bg-white appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="boy">Boy</option>
                                            <option value="girl">Girl</option>
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* City Selection */}
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-gray-700">City *</Label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                                        <select
                                            id="city"
                                            value={formData.city}
                                            onChange={(e) => handleInputChange('city', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 outline-none bg-white appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Select City</option>
                                            {CITIES.map((city, index) => (
                                                <option key={index} value={city}>
                                                    {city}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* College Dropdown - Full Width */}
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="college" className="text-gray-700">Your College / University *</Label>
                                    <div className="relative">
                                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none z-10" />
                                        <select
                                            id="college"
                                            value={formData.college}
                                            onChange={(e) => handleInputChange('college', e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:ring-opacity-20 outline-none bg-white appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Select your college</option>
                                            {COLLEGES.map((college, index) => (
                                                <option key={index} value={college}>
                                                    {college}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100 flex justify-end">
                                <Button
                                    type="submit"
                                    className="bg-orange-600 hover:bg-orange-700 text-white min-w-[150px]"
                                    disabled={isSaving}
                                >
                                    {isSaving ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            Save & View Rooms
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
