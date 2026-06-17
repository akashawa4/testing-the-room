import { useState, useEffect, useMemo, lazy, Suspense, useCallback } from 'react';
import { Search, Filter, Home, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Checkbox } from '@/components/ui/checkbox.jsx';
import { Slider } from '@/components/ui/slider.jsx';
import RoomCard from './components/RoomCard.jsx';
import InAppToast from './components/InAppToast.jsx';
import LoginScreen from './components/LoginScreen.jsx';
import ConfirmationModal from './components/ConfirmationModal.jsx';

import { useLanguage } from './contexts/LanguageContext.jsx';
import { useAuth } from './contexts/AuthContext.jsx';
import { useUserPreferences } from './contexts/UserPreferencesContext.jsx';
import './App.css';

// Lazy load modal components
const RoomDetailModal = lazy(() => import('./components/RoomDetailModal.jsx'));
const MessCard = lazy(() => import('./components/MessCard.jsx'));
const AddRoomModal = lazy(() => import('./components/AddRoomModal.jsx'));
const AdminLoginModal = lazy(() => import('./components/AdminLoginModal.jsx'));
const FeatureFilterModal = lazy(() => import('./components/FeatureFilterModal.jsx'));
const BookingModal = lazy(() => import('./components/BookingModal.jsx'));

// Loading component
const ModalLoadingSpinner = () => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 flex items-center gap-3">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500"></div>
      <span className="text-gray-600">Loading...</span>
    </div>
  </div>
);

// Feature Normalization Utility
const normalizeFeature = (feature) => {
  if (!feature) return '';
  const lower = feature.toLowerCase().trim();

  if (lower.includes('wifi')) return 'Wi-Fi';
  if (lower.includes('geyser') || lower === 'hot water') return 'Hot Water';
  if (lower.includes('solar')) return 'Hot Water';
  if (lower.includes('cupboard') || lower.includes('cubert')) return 'Cupboard';
  if (lower.includes('bed') || lower.includes('mattress')) return 'Bed/Mattress';
  if (lower.includes('shoestand') || lower.includes('shoe stand') || lower.includes('shoes stand')) return 'Shoe Stand';
  if (lower.includes('charging bulb')) return 'Emergency Light';
  if (lower.includes('aqua') || lower.includes('water jar') || lower.includes('drinking water')) return 'Drinking Water';
  if (lower.includes('owner') && lower.includes('mess')) return "Owner's Mess";
  if ((lower.includes('near') || lower.includes('neighbour')) && lower.includes('mess')) return 'Nearby Mess';
  if (lower.includes('parking')) return 'Parking';
  if (lower.includes('terrace')) return 'Terrace Access';
  if (lower.includes('parents')) return 'Parents Allowed';
  if (lower.includes('group stud')) return 'Group Study Allowed';
  if (lower.includes('new room')) return 'New Room';
  if (lower.includes('light bill') && lower.includes('meter')) return 'Separate Light Meter';
  if (lower.includes('induction') || lower.includes('cooking')) return 'Cooking Allowed';
  if (lower.includes('dressing')) return 'Dressing Table';
  if (lower.includes('cctv')) return 'CCTV Camera';

  // Default: Proper Case
  return lower.replace(/\b\w/g, l => l.toUpperCase());
};

// Deduplicate rooms by their unique Firestore document ID only
// Each room in Firestore has a unique document ID, so we strictly use that
const deduplicateRooms = (rooms) => {
  const seen = new Set();
  const result = [];

  rooms.forEach((room) => {
    if (!room) return;

    // Only use the unique Firestore document ID for deduplication
    // This prevents filtering out rooms with similar data
    if (room.id) {
      if (!seen.has(room.id)) {
        seen.add(room.id);
        result.push(room);
      }
    } else {
      // For rooms without ID (edge case), always include them
      result.push(room);
    }
  });

  return result;
};

function App() {
  const { t, currentLanguage } = useLanguage();
  const { user, loading, isAuthenticated, redirectLoading } = useAuth();
  const { selectedGender, selectedLocation, isAdmin, setIsAdmin } = useUserPreferences();

  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [editRoom, setEditRoom] = useState(null);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false, title: '' });

  const [showFeatureFilter, setShowFeatureFilter] = useState(false);
  const [featureFilters, setFeatureFilters] = useState({});
  const [maxPrice, setMaxPrice] = useState(10000);
  const [activeSection, setActiveSection] = useState('rooms'); // 'rooms' | 'mess'
  const [messItems, setMessItems] = useState([]);
  const [roomToDelete, setRoomToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [roomToToggleHidden, setRoomToToggleHidden] = useState(null);

  // iOS Debug logging
  useEffect(() => {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      console.log('App: iOS Device - Auth State:', {
        user: user ? 'exists' : 'null',
        loading,
        isAuthenticated
      });
    }
  }, [user, loading, isAuthenticated]);



  // Load rooms data from Firestore AND static data (merged, avoiding duplicates)
  useEffect(() => {
    const loadRooms = async () => {
      try {
        // Load rooms from Firestore
        const { fetchRooms } = await import('./services/roomService.js');
        const firestoreRooms = await fetchRooms();

        console.log(`📊 Fetched ${firestoreRooms.length} rooms from Firestore`);

        // Also load static rooms
        const { sampleRooms } = await import('./data/rooms.js');
        console.log(`📦 Loaded ${sampleRooms.length} static rooms from rooms.js`);

        // Create a Set of unique identifiers from Firestore rooms to avoid duplicates
        // Use title + contact + rent as a composite key
        const firestoreKeys = new Set(
          firestoreRooms.map(r => `${(r.title || '').toLowerCase().trim()}|${(r.contact || '').trim()}|${r.rent}`)
        );

        // Filter static rooms that don't already exist in Firestore
        const newStaticRooms = sampleRooms.filter(room => {
          const key = `${(room.title || '').toLowerCase().trim()}|${(room.contact || '').trim()}|${room.rent}`;
          return !firestoreKeys.has(key);
        });

        console.log(`🆕 ${newStaticRooms.length} static rooms not in Firestore`);

        // Merge: Firestore rooms take priority, then add non-duplicate static rooms
        const allRooms = [...firestoreRooms, ...newStaticRooms];

        // Final deduplication by ID
        const dedupedRooms = deduplicateRooms(allRooms);

        console.log(`📋 Final room count: ${dedupedRooms.length} rooms`);

        setRooms(dedupedRooms);

        if (dedupedRooms.length === 0) {
          console.log('No rooms found. Add rooms via the admin panel.');
        }
      } catch (error) {
        console.error('Failed to load rooms:', error);
        // Fallback to static data only if Firestore fails
        try {
          const { sampleRooms } = await import('./data/rooms.js');
          console.log(`📦 Fallback: Loaded ${sampleRooms.length} static rooms`);
          setRooms(sampleRooms);
        } catch (staticError) {
          console.error('Failed to load static rooms:', staticError);
          setRooms([]);
        }
      } finally {
        setIsLoadingRooms(false);
      }
    };

    loadRooms();
  }, [currentLanguage]);

  // Handle deep linking - check for shared room ID in URL
  useEffect(() => {
    if (isLoadingRooms || rooms.length === 0) return;

    // Check for room ID in URL
    const urlParams = new URLSearchParams(window.location.search);
    const sharedRoomId = urlParams.get('room');

    // Also check sessionStorage for room ID stored before login
    const storedRoomId = sessionStorage.getItem('nivasi_shared_room');

    const roomIdToOpen = sharedRoomId || storedRoomId;

    if (roomIdToOpen) {
      // Find the room by ID
      const room = rooms.find(r => String(r.id) === String(roomIdToOpen));

      if (room && isAuthenticated) {
        // User is authenticated, show the room
        setSelectedRoom(room);
        // Clear the stored room ID and URL param
        sessionStorage.removeItem('nivasi_shared_room');
        // Clean up URL without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (sharedRoomId && !isAuthenticated) {
        // Store room ID for after login
        sessionStorage.setItem('nivasi_shared_room', sharedRoomId);
      }
    }
  }, [rooms, isLoadingRooms, isAuthenticated]);

  // Load mess data lazily when selected first time
  useEffect(() => {
    const loadMess = async () => {
      try {
        const { getMess } = await import('./data/mess.js');
        const items = getMess();
        setMessItems(items);
      } catch (error) {
        console.error('Failed to load mess data:', error);
        setMessItems([]);
      }
    };

    if (activeSection === 'mess' && messItems.length === 0) {
      loadMess();
    }
  }, [activeSection, messItems.length]);

  // Room type categories
  const categories = useMemo(() => [
    { key: 'All', label: t('all') },
    { key: 'Single Room', label: t('singleRoom') },
    { key: 'Cot Basis', label: t('cotBasis') },
    { key: '1 RK', label: t('oneRK') },
    { key: '1 BHK', label: t('oneBHK') },
    { key: '2 BHK', label: t('twoBHK') }
  ], [t]);

  // Helper function to get the original English key for a category
  const getCategoryKey = useCallback((categoryKey) => {
    const categoryMap = {
      'All': 'All',
      'Single Room': 'Single Room',
      'Cot Basis': 'Cot Basis',
      '1 RK': '1 RK',
      '1 BHK': '1 BHK',
      '2 BHK': '2 BHK'
    };
    return categoryMap[categoryKey] || categoryKey;
  }, []);

  // Helper function to check if a room matches a category
  const roomMatchesCategory = useCallback((room, category) => {
    if (category === 'All') return true;

    const originalCategory = getCategoryKey(category);

    // Map category keys to translation keys
    const categoryTranslationMap = {
      'Single Room': 'singleRoom',
      'Cot Basis': 'cotBasis',
      '1 RK': 'oneRK',
      '1 BHK': 'oneBHK',
      '2 BHK': 'twoBHK'
    };

    const translationKey = categoryTranslationMap[category];
    const translatedCategory = translationKey ? t(translationKey) : category;

    // Check roomType for exact match
    if (room.roomType === originalCategory || room.roomType === translatedCategory) {
      return true;
    }

    // Check rooms field - use includes for partial matching (e.g., "1 RK & 1RK" matches "1 RK")
    const roomsField = room.rooms?.toLowerCase() || '';
    const categoryLower = originalCategory.toLowerCase();
    const translatedLower = translatedCategory.toLowerCase();

    if (roomsField.includes(categoryLower) || roomsField.includes(translatedLower)) {
      return true;
    }

    return false;
  }, [t, getCategoryKey]);

  // Available Features
  const availableFeatures = useMemo(() => {
    const uniqueFeatures = new Set();

    rooms.forEach(room => {
      if (room.features && Array.isArray(room.features)) {
        room.features.forEach(feature => {
          if (feature && typeof feature === 'string') {
            const normalized = normalizeFeature(feature);
            if (normalized) uniqueFeatures.add(normalized);
          }
        });
      }
    });
    return Array.from(uniqueFeatures).sort();
  }, [rooms]);

  const handleFeatureToggle = useCallback((feature) => {
    setFeatureFilters(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }));
  }, []);

  // Enhanced filtering with memoization
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Hide hidden rooms from non-admin users
      if (room.hidden && !isAdmin) {
        return false;
      }

      // Gender filtering - only show rooms matching the selected gender
      let matchesGender = true;
      if (selectedGender) {
        const roomGender = (room.gender || '').toLowerCase().trim();
        if (selectedGender === 'boy') {
          // Match 'boy', 'boys', 'male' for boys
          matchesGender = roomGender === 'boy' || roomGender === 'boys' || roomGender === 'male';
        } else if (selectedGender === 'girl') {
          // Match 'girl', 'girls', 'female' for girls
          matchesGender = roomGender === 'girl' || roomGender === 'girls' || roomGender === 'female';
        } else {
          matchesGender = roomGender === selectedGender.toLowerCase();
        }
      }
      const matchesCategory = roomMatchesCategory(room, category);
      const matchesSearch = room.title && room.title.toLowerCase().includes(search.toLowerCase());
      const matchesPrice = room.rent ? room.rent <= maxPrice : true;

      // Feature filtering
      const matchesFeatures = Object.keys(featureFilters).length === 0 ||
        Object.entries(featureFilters).every(([feature, isSelected]) => {
          if (!isSelected) return true; // Skip unselected features
          return room.features && room.features.some(roomFeature =>
            normalizeFeature(roomFeature) === feature
          );
        });

      return matchesGender && matchesCategory && matchesSearch && matchesFeatures && matchesPrice;
    });
  }, [rooms, selectedGender, category, search, featureFilters, roomMatchesCategory, maxPrice, isAdmin]);

  const handleShowAddForm = useCallback(() => {
    if (isAdmin) {
      setShowAddForm(true);
    } else {
      setShowAdminLogin(true);
    }
  }, [isAdmin]);

  const handleAdminLogin = useCallback(() => {
    setIsAdmin(true);
    setShowAdminLogin(false);
    setShowAddForm(true);
    setNotification({
      message: 'You now have access to add, edit, and delete rooms.',
      type: 'success',
      isVisible: true,
      title: 'Admin Mode Activated!'
    });
  }, [setIsAdmin]);

  const handleAddRoom = useCallback(async (newRoom) => {
    try {
      const { addRoom } = await import('./services/roomService.js');
      const savedRoom = await addRoom(newRoom);
      setRooms(prev => deduplicateRooms([savedRoom, ...prev]));
      setShowAddForm(false);
      setNotification({
        message: 'Your new room listing is now live and visible to students.',
        type: 'success',
        isVisible: true,
        title: 'Room Added Successfully!'
      });
    } catch (error) {
      console.error('Error adding room:', error);
      // Still add locally even if Firestore fails
      setRooms(prev => deduplicateRooms([newRoom, ...prev]));
      setShowAddForm(false);
      setNotification({
        message: 'Room saved locally. Will sync when connection is restored.',
        type: 'warning',
        isVisible: true,
        title: 'Room Saved Locally'
      });
    }
  }, []);

  const handleBookingSuccess = useCallback(() => {
    setShowBookingModal(false);
    setSelectedRoomForBooking(null);
    setNotification({
      message: 'Your booking request has been submitted. The owner will contact you soon.',
      type: 'success',
      isVisible: true,
      title: 'Booking Submitted!'
    });
  }, [t]);

  const handleUpdateRoom = useCallback(async (updatedRoom) => {
    try {
      const { updateRoom } = await import('./services/roomService.js');
      const savedRoom = await updateRoom(updatedRoom.id, updatedRoom);
      setRooms(prev => deduplicateRooms(prev.map(r => r.id === savedRoom.id ? savedRoom : r)));
      setEditRoom(null);
      setNotification({
        message: 'Your room listing has been updated with the new details.',
        type: 'success',
        isVisible: true,
        title: 'Room Updated Successfully!'
      });
    } catch (error) {
      console.error('Error updating room:', error);
      // Still update locally even if Firestore fails
      setRooms(prev => deduplicateRooms(prev.map(r => r.id === updatedRoom.id ? updatedRoom : r)));
      setEditRoom(null);
      setNotification({
        message: 'Changes saved locally. Will sync when connection is restored.',
        type: 'warning',
        isVisible: true,
        title: 'Room Updated Locally'
      });
    }
  }, []);

  const handleRequestDeleteRoom = useCallback((room) => {
    setRoomToDelete(room);
  }, []);

  const handleConfirmDeleteRoom = useCallback(async () => {
    if (!roomToDelete || isDeleting) return;

    setIsDeleting(true);
    try {
      const { deleteRoom } = await import('./services/roomService.js');
      if (roomToDelete.id) {
        await deleteRoom(roomToDelete.id);
      }
    } catch (error) {
      console.error('Error deleting room from Firestore (will still remove locally):', error);
    } finally {
      // Only delete by unique Firestore document ID to prevent deleting rooms with similar data
      setRooms(prev => prev.filter(r => {
        // Only remove the room with the exact matching ID
        if (r.id && roomToDelete.id) {
          return r.id !== roomToDelete.id;
        }
        // If somehow a room has no ID, don't delete it
        return true;
      }));
      setNotification({
        message: 'The room has been removed from the listings.',
        type: 'success',
        isVisible: true,
        title: 'Room Deleted Successfully!'
      });
      setIsDeleting(false);
      setRoomToDelete(null);
    }
  }, [roomToDelete, isDeleting]);

  // Handler to request toggle room visibility (opens confirmation modal)
  const handleRequestToggleHidden = useCallback((room) => {
    setRoomToToggleHidden(room);
  }, []);

  // Handler to confirm toggle room visibility (Admin only)
  const handleConfirmToggleHidden = useCallback(async () => {
    if (!isAdmin || !roomToToggleHidden) return;

    const room = roomToToggleHidden;

    try {
      const { updateRoom } = await import('./services/roomService.js');
      const updatedRoom = { ...room, hidden: !room.hidden };
      await updateRoom(room.id, updatedRoom);

      setRooms(prev => prev.map(r => r.id === room.id ? updatedRoom : r));

      setNotification({
        message: room.hidden
          ? 'Room is now visible to all users.'
          : 'Room is now hidden from users (only visible to admin).',
        type: 'success',
        isVisible: true,
        title: room.hidden ? 'Room Unhidden!' : 'Room Hidden!'
      });
    } catch (error) {
      console.error('Error toggling room visibility:', error);
      // Still update locally even if Firestore fails
      const updatedRoom = { ...room, hidden: !room.hidden };
      setRooms(prev => prev.map(r => r.id === room.id ? updatedRoom : r));
      setNotification({
        message: 'Visibility changed locally. Will sync when connection is restored.',
        type: 'warning',
        isVisible: true,
        title: 'Updated Locally'
      });
    } finally {
      setRoomToToggleHidden(null);
    }
  }, [isAdmin, roomToToggleHidden]);

  // Handler to cleanup duplicate rooms from Firestore (Admin only)
  const handleCleanupDuplicates = useCallback(async () => {
    if (!isAdmin) return;

    try {
      setNotification({
        message: 'Scanning for duplicate rooms...',
        type: 'info',
        isVisible: true,
        title: 'Cleaning Up'
      });

      const { cleanupDuplicateRooms } = await import('./utils/cleanupDuplicates.js');
      const result = await cleanupDuplicateRooms();

      if (result.duplicatesRemoved > 0) {
        // Reload rooms after cleanup
        const { fetchRooms } = await import('./services/roomService.js');
        const freshRooms = await fetchRooms();
        setRooms(deduplicateRooms(freshRooms));

        setNotification({
          message: `Removed ${result.duplicatesRemoved} duplicate rooms. ${result.remainingRooms} rooms remaining.`,
          type: 'success',
          isVisible: true,
          title: 'Cleanup Complete!'
        });
      } else {
        setNotification({
          message: 'No duplicate rooms found. Your listings are clean!',
          type: 'success',
          isVisible: true,
          title: 'All Good!'
        });
      }
    } catch (error) {
      console.error('Error cleaning up duplicates:', error);
      setNotification({
        message: 'Failed to cleanup duplicates. Check console for details.',
        type: 'error',
        isVisible: true,
        title: 'Cleanup Failed'
      });
    }
  }, [isAdmin]);

  // Handler to debug rooms - list all rooms by owner (Admin only)
  const handleDebugRooms = useCallback(async () => {
    if (!isAdmin) return;

    try {
      setNotification({
        message: 'Check browser console (F12) for room details...',
        type: 'info',
        isVisible: true,
        title: 'Debugging Rooms'
      });

      const { listRoomsByOwner, getAllRoomsDebug } = await import('./utils/cleanupDuplicates.js');

      console.log('\n========== FIRESTORE ROOMS DEBUG ==========\n');
      const result = await listRoomsByOwner();
      console.log('\n');
      await getAllRoomsDebug();
      console.log('\n============================================\n');

      setNotification({
        message: `Found ${result.totalRooms} rooms from ${result.totalOwners} owners. ${result.ownersWithMultiple.length} owners have multiple properties. Check console for details.`,
        type: 'success',
        isVisible: true,
        title: 'Debug Complete'
      });
    } catch (error) {
      console.error('Error debugging rooms:', error);
      setNotification({
        message: 'Failed to debug rooms. Check console for details.',
        type: 'error',
        isVisible: true,
        title: 'Debug Failed'
      });
    }
  }, [isAdmin]);

  // Handler to migrate static rooms to Firestore (Admin only)
  const handleMigrateToFirestore = useCallback(async () => {
    if (!isAdmin) return;

    try {
      setNotification({
        message: 'Migrating static rooms to Firestore...',
        type: 'info',
        isVisible: true,
        title: 'Migration Started'
      });

      // Load static rooms
      const { sampleRooms } = await import('./data/rooms.js');
      const { fetchRooms, addRoom } = await import('./services/roomService.js');

      // Get existing rooms from Firestore
      const existingRooms = await fetchRooms();

      // Create a Set of unique identifiers from existing Firestore rooms
      const existingKeys = new Set(
        existingRooms.map(r => `${(r.title || '').toLowerCase().trim()}|${(r.contact || '').trim()}|${r.rent}`)
      );

      // Filter static rooms that don't already exist in Firestore
      const roomsToMigrate = sampleRooms.filter(room => {
        const key = `${(room.title || '').toLowerCase().trim()}|${(room.contact || '').trim()}|${room.rent}`;
        return !existingKeys.has(key);
      });

      console.log(`📦 Found ${roomsToMigrate.length} rooms to migrate out of ${sampleRooms.length} static rooms`);

      if (roomsToMigrate.length === 0) {
        setNotification({
          message: 'All static rooms are already in Firestore!',
          type: 'success',
          isVisible: true,
          title: 'Already Migrated'
        });
        return;
      }

      // Migrate rooms one by one
      let migrated = 0;
      let failed = 0;

      for (const room of roomsToMigrate) {
        try {
          // Remove the local numeric ID so Firestore generates a new one
          const roomData = { ...room };
          delete roomData.id;

          await addRoom(roomData);
          migrated++;
          console.log(`✅ Migrated: ${room.title}`);
        } catch (err) {
          failed++;
          console.error(`❌ Failed to migrate: ${room.title}`, err);
        }
      }

      // Reload rooms after migration
      const freshRooms = await fetchRooms();
      const { sampleRooms: latestStaticRooms } = await import('./data/rooms.js');

      // Merge with remaining static rooms (in case some weren't migrated)
      const firestoreKeys = new Set(
        freshRooms.map(r => `${(r.title || '').toLowerCase().trim()}|${(r.contact || '').trim()}|${r.rent}`)
      );
      const remainingStatic = latestStaticRooms.filter(room => {
        const key = `${(room.title || '').toLowerCase().trim()}|${(room.contact || '').trim()}|${room.rent}`;
        return !firestoreKeys.has(key);
      });

      setRooms(deduplicateRooms([...freshRooms, ...remainingStatic]));

      setNotification({
        message: `Successfully migrated ${migrated} rooms to Firestore.${failed > 0 ? ` ${failed} failed.` : ''}`,
        type: failed > 0 ? 'warning' : 'success',
        isVisible: true,
        title: 'Migration Complete!'
      });

    } catch (error) {
      console.error('Error migrating rooms:', error);
      setNotification({
        message: 'Failed to migrate rooms. Check console for details.',
        type: 'error',
        isVisible: true,
        title: 'Migration Failed'
      });
    }
  }, [isAdmin]);

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    if (isIOS) {
      try {
        const storedUser = localStorage.getItem('nivasi_auth_user');
        if (storedUser) {
          if (loading || redirectLoading) {
            return (
              <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Reconnecting...</p>
                </div>
              </div>
            );
          } else {
            // Reconnection failed, clean up the stale storage
            localStorage.removeItem('nivasi_auth_user');
          }
        }
      } catch {
        // Ignore storage access errors
      }
    }

    if (loading || redirectLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">
              Completing sign-in...
            </p>
          </div>
        </div>
      );
    }

    return <LoginScreen onLoginSuccess={() => { }} />;
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <InAppToast
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        title={notification.title}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
        duration={4000}
      />

      {/* Sticky Search & Controls Header */}
      <div className="bg-white sticky top-0 z-30 border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="w-full flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-orange-500 transition-colors w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder={t('searchBookings') || "Search by location or room..."}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all outline-none text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 no-scrollbar items-center justify-between md:justify-end">
            {/* Section Tabs */}
            <div className="bg-gray-100 p-1 rounded-lg flex flex-shrink-0">
              <button
                onClick={() => setActiveSection('rooms')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${activeSection === 'rooms'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Home className="w-4 h-4" />
                Rooms
              </button>
              <button
                onClick={() => setActiveSection('mess')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-all text-sm font-medium ${activeSection === 'mess'
                  ? 'bg-white text-orange-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Utensils className="w-4 h-4" />
                Mess
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setShowFeatureFilter(true)}
                variant="outline"
                size="sm"
                className={`bg-white lg:hidden ${Object.keys(featureFilters).length > 0 || maxPrice < 10000 ? 'border-orange-500 text-orange-600' : ''}`}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <Button
                onClick={handleShowAddForm}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white whitespace-nowrap text-xs sm:text-sm"
              >
                <span className="hidden sm:inline">+ {t('addRoom')}</span>
                <span className="sm:hidden">+ Add</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-start">
        {/* SIDEBAR - Flipkart Style */}
        {activeSection === 'rooms' && (
          <aside className="hidden lg:block w-[280px] flex-shrink-0 bg-white min-h-[calc(100vh-65px)] border-r border-gray-200 sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto overscroll-contain custom-scrollbar">
            <div className="p-5 space-y-8">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                {(Object.keys(featureFilters).length > 0 || maxPrice < 50000 || category !== 'All') && (
                  <button
                    onClick={() => {
                      setFeatureFilters({});
                      setMaxPrice(10000);
                      setCategory('All');
                    }}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 uppercase tracking-wide"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Categories Section */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h4>
                <div className="space-y-3">
                  {categories.map(cat => (
                    <label key={cat.key} className="flex items-center gap-3 cursor-pointer group select-none">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${category === cat.key ? 'border-orange-500' : 'border-gray-300 group-hover:border-gray-400'}`}>
                        {category === cat.key && <div className="w-2 h-2 rounded-full bg-orange-500" />}
                      </div>
                      <span className={`text-sm ${category === cat.key ? 'font-medium text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{cat.label}</span>
                      <input type="radio" checked={category === cat.key} onChange={() => setCategory(cat.key)} className="hidden" />
                    </label>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Budget Section */}
              <div>
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{t('budget') || 'Budget'}</h4>
                <div className="px-1 mb-4">
                  <Slider
                    defaultValue={[maxPrice]}
                    value={[maxPrice]}
                    max={10000}
                    step={500}
                    onValueChange={(vals) => setMaxPrice(vals[0])}
                    className="py-2"
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">₹0</span>
                  <div className="bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    <span className="font-bold text-orange-700">₹{maxPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-gray-100" />

              {/* Features Section */}
              <div className="pb-8">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">{t('amenities') || 'Amenities'}</h4>
                <div className="space-y-3">
                  {availableFeatures.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 group">
                      <Checkbox
                        id={`sidebar-filter-${feature}`}
                        checked={featureFilters[feature] || false}
                        onCheckedChange={() => handleFeatureToggle(feature)}
                        className="data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500 rounded-sm"
                      />
                      <label
                        htmlFor={`sidebar-filter-${feature}`}
                        className="text-sm text-gray-600 group-hover:text-gray-900 cursor-pointer flex-1"
                      >
                        {feature}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        )}

        {/* CONTENT AREA */}
        <main className="flex-1 min-w-0 p-4 lg:p-6">

          {/* Mobile Categories (Horizontal Scroll) */}
          {activeSection === 'rooms' && (
            <div className="lg:hidden flex overflow-x-auto pb-4 gap-2 mb-4 scrollbar-hide -mx-4 px-4">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setCategory(cat.key)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${category === cat.key
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          {activeSection === 'rooms' ? (
            <>
              {/* Loading State */}
              {isLoadingRooms ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 animate-pulse">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-white rounded-2xl h-[380px] shadow-sm"></div>
                  ))}
                </div>
              ) : filteredRooms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                  {filteredRooms.map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onViewDetails={() => setSelectedRoom(room)}
                      onBookNow={() => {
                        setSelectedRoomForBooking(room);
                        setShowBookingModal(true);
                      }}
                      isAdmin={isAdmin}
                      onEdit={() => setEditRoom(room)}
                      onDelete={() => handleRequestDeleteRoom(room)}
                      onToggleHidden={() => handleRequestToggleHidden(room)}
                      t={t}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-orange-50">
                  <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-orange-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No Rooms Found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search query.</p>
                  <Button onClick={handleShowAddForm}>
                    {t('addFirstRoom')}
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Mess Section */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {messItems.map((mess) => (
                <Suspense key={mess.id} fallback={<div className="h-[300px] bg-white rounded-2xl animate-pulse"></div>}>
                  <MessCard mess={mess} />
                </Suspense>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Local Modals */}
      {
        selectedRoom && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <RoomDetailModal
              room={selectedRoom}
              onClose={() => setSelectedRoom(null)}
            />
          </Suspense>
        )
      }

      {
        showAddForm && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <AddRoomModal
              onClose={() => setShowAddForm(false)}
              onAddRoom={handleAddRoom}
            />
          </Suspense>
        )
      }

      {
        editRoom && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <AddRoomModal
              onClose={() => setEditRoom(null)}
              onAddRoom={handleUpdateRoom}
              initialRoom={editRoom}
              isEdit
            />
          </Suspense>
        )
      }

      {
        showAdminLogin && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <AdminLoginModal
              onClose={() => setShowAdminLogin(false)}
              onAdminLogin={handleAdminLogin}
            />
          </Suspense>
        )
      }

      {
        showBookingModal && selectedRoomForBooking && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <BookingModal
              isOpen={showBookingModal}
              onClose={() => {
                setShowBookingModal(false);
                setSelectedRoomForBooking(null);
              }}
              room={selectedRoomForBooking}
              onBookingSuccess={handleBookingSuccess}
            />
          </Suspense>
        )
      }

      {
        showFeatureFilter && (
          <Suspense fallback={<ModalLoadingSpinner />}>
            <FeatureFilterModal
              isOpen={showFeatureFilter}
              onClose={() => setShowFeatureFilter(false)}
              onApplyFilters={(features, price) => {
                setFeatureFilters(features);
                if (price) setMaxPrice(price);
              }}
              currentFilters={featureFilters}
              currentMaxPrice={maxPrice}
            />
          </Suspense>
        )
      }

      {/* In-app delete confirmation popup */}
      {roomToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              Delete Room
            </h2>
            <p className="text-sm text-gray-700">
              Are you sure you want to delete&nbsp;
              <span className="font-semibold">"{roomToDelete.title}"</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                onClick={() => !isDeleting && setRoomToDelete(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDeleteRoom}
                disabled={isDeleting}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hide/Unhide confirmation popup */}
      <ConfirmationModal
        isOpen={!!roomToToggleHidden}
        onClose={() => setRoomToToggleHidden(null)}
        onConfirm={handleConfirmToggleHidden}
        title={roomToToggleHidden?.hidden ? 'Unhide Room?' : 'Hide Room?'}
        message={roomToToggleHidden?.hidden
          ? `Are you sure you want to unhide "${roomToToggleHidden?.title}"? This room will become visible to all users.`
          : `Are you sure you want to hide "${roomToToggleHidden?.title}"? This room will only be visible to admins.`
        }
        confirmText={roomToToggleHidden?.hidden ? 'Yes, Unhide' : 'Yes, Hide'}
        cancelText="Cancel"
        type={roomToToggleHidden?.hidden ? 'success' : 'warning'}
      />
    </div >
  );
}

export default App;
