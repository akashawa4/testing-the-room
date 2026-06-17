import { db, auth, serverTimestamp } from '../firebase.js';
import { collection, addDoc, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';

// Collection name for users
const USERS_COLLECTION = 'users';

/**
 * Get current user's profile data
 * @returns {Promise<Object|null>} - User profile or null
 */
export const getUserProfile = async () => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      return null;
    }

    const user = await getUserByUid(currentUser.uid);
    return user;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Save user to Firebase when they select their gender
 * @param {string} gender - The selected gender ('boy' or 'girl')
 * @param {Object} additionalData - Additional user data (optional)
 * @returns {Promise<Object>} - The saved user document
 */
export const saveUserOnGenderSelection = async (gender, additionalData = {}) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No authenticated user found');
    }

    // Check if user already exists
    const existingUser = await getUserByUid(currentUser.uid);

    if (existingUser) {
      // Update existing user with new gender selection
      const userRef = doc(db, USERS_COLLECTION, existingUser.id);
      await updateDoc(userRef, {
        gender: gender,
        genderSelectedAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        lastActive: serverTimestamp(),
        ...additionalData
      });

      console.log('User gender updated successfully');

      return {
        ...existingUser,
        gender: gender,
        genderSelectedAt: new Date(),
        lastUpdated: new Date(),
        lastActive: new Date(),
        ...additionalData
      };
    } else {
      // Create new user
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || 'Anonymous User',
        gender: gender,
        genderSelectedAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        ...additionalData
      };

      const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);

      console.log('User saved successfully with ID:', docRef.id);

      return {
        id: docRef.id,
        ...userData
      };
    }
  } catch (error) {
    console.error('Error saving user on gender selection:', error);
    throw error;
  }
};

/**
 * Get user by UID
 * @param {string} uid - User UID
 * @returns {Promise<Object|null>} - User document or null if not found
 */
export const getUserByUid = async (uid) => {
  try {
    const q = query(collection(db, USERS_COLLECTION), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      };
    }

    return null;
  } catch (error) {
    console.error('Error getting user by UID:', error);
    throw error;
  }
};

/**
 * Update user's gender selection
 * @param {string} uid - User UID
 * @param {string} gender - New gender selection
 * @returns {Promise<Object>} - Updated user document
 */
export const updateUserGender = async (uid, gender) => {
  try {
    const user = await getUserByUid(uid);

    if (!user) {
      throw new Error('User not found');
    }

    const userRef = doc(db, USERS_COLLECTION, user.id);
    await updateDoc(userRef, {
      gender: gender,
      lastUpdated: serverTimestamp(),
      lastActive: serverTimestamp()
    });

    console.log('User gender updated successfully');

    return {
      ...user,
      gender: gender,
      lastUpdated: new Date(),
      lastActive: new Date()
    };
  } catch (error) {
    console.error('Error updating user gender:', error);
    throw error;
  }
};

/**
 * Get all users by gender
 * @param {string} gender - Gender to filter by
 * @returns {Promise<Array>} - Array of users
 */
export const getUsersByGender = async (gender) => {
  try {
    const q = query(collection(db, USERS_COLLECTION), where('gender', '==', gender));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting users by gender:', error);
    throw error;
  }
};

/**
 * Save user location data to Firebase
 * @param {Object} locationData - Location data (city, college)
 * @returns {Promise<Object>} - Updated user document
 */
export const saveUserLocation = async (locationData) => {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      throw new Error('No authenticated user found');
    }

    // Check if user already exists
    const existingUser = await getUserByUid(currentUser.uid);

    if (existingUser) {
      // Update existing user with location data
      const userRef = doc(db, USERS_COLLECTION, existingUser.id);
      await updateDoc(userRef, {
        city: locationData.city,
        college: locationData.college,
        locationSelectedAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        lastActive: serverTimestamp()
      });

      console.log('User location updated successfully');

      return {
        ...existingUser,
        city: locationData.city,
        college: locationData.college,
        locationSelectedAt: new Date(),
        lastUpdated: new Date(),
        lastActive: new Date()
      };
    } else {
      // Create new user with location data
      const userData = {
        uid: currentUser.uid,
        email: currentUser.email,
        displayName: currentUser.displayName || 'Anonymous User',
        city: locationData.city,
        college: locationData.college,
        locationSelectedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, USERS_COLLECTION), userData);

      console.log('User location saved successfully with ID:', docRef.id);

      return {
        id: docRef.id,
        ...userData
      };
    }
  } catch (error) {
    console.error('Error saving user location:', error);
    throw error;
  }
};

/**
 * Get user statistics
 * @returns {Promise<Object>} - User statistics
 */
export const getUserStatistics = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, USERS_COLLECTION));
    const users = usersSnapshot.docs.map(doc => doc.data());

    // Calculate city and college statistics
    const cityStats = {};
    const collegeStats = {};
    users.forEach(user => {
      if (user.city) {
        cityStats[user.city] = (cityStats[user.city] || 0) + 1;
      }
      if (user.college) {
        collegeStats[user.college] = (collegeStats[user.college] || 0) + 1;
      }
    });

    const stats = {
      total: users.length,
      boys: users.filter(user => user.gender === 'boy').length,
      girls: users.filter(user => user.gender === 'girl').length,
      cities: cityStats,
      colleges: collegeStats,
      lastUpdated: new Date()
    };

    return stats;
  } catch (error) {
    console.error('Error getting user statistics:', error);
    throw error;
  }
};
