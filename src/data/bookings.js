// Firebase collection reference
import { db, collection, addDoc, updateDoc, deleteDoc, doc, getDoc, getDocs, query, where, orderBy, serverTimestamp, onSnapshot } from '../firebase.js';

// Booking Types
export const bookingTypes = {
  INQUIRY: 'inquiry',
  BOOKING: 'booking',
  VIEWING: 'viewing'
};

// Booking Statuses
export const bookingStatuses = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed'
};

// Sample bookings data (for initial setup)
export const sampleBookings = [
  {
    id: '1',
    roomId: 'room1',
    userId: 'user1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '+91 9876543210',
    type: bookingTypes.INQUIRY,
    status: bookingStatuses.PENDING,
    message: 'Interested in this room',
    requestedDate: '2024-01-15',
    requestedTime: '14:00',
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  }
];

const BOOKINGS_COLLECTION = 'bookings';

// Add a new booking to Firebase
export const addBooking = async (bookingData) => {
  try {
    const newBooking = {
      ...bookingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), newBooking);
    
    // Return the booking with the generated ID
    return {
      id: docRef.id,
      ...newBooking
    };
  } catch (error) {
    console.error('Error adding booking to Firebase:', error);
    throw new Error('Failed to create booking');
  }
};

// Update an existing booking in Firebase
export const updateBooking = async (bookingId, updates) => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    await updateDoc(bookingRef, updateData);
    
    // Return the updated booking data
    return {
      id: bookingId,
      ...updates,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error updating booking in Firebase:', error);
    throw new Error('Failed to update booking');
  }
};

// Delete a booking from Firebase
export const deleteBooking = async (bookingId) => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    await deleteDoc(bookingRef);
    return true;
  } catch (error) {
    console.error('Error deleting booking from Firebase:', error);
    throw new Error('Failed to delete booking');
  }
};

// Get all bookings from Firebase
export const getAllBookings = async () => {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings from Firebase:', error);
    throw new Error('Failed to fetch bookings');
  }
};

// Get bookings by room ID from Firebase
export const getBookingsByRoom = async (roomId) => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION), 
      where('roomId', '==', roomId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by room from Firebase:', error);
    throw new Error('Failed to fetch room bookings');
  }
};

// Get bookings by user ID from Firebase
export const getBookingsByUser = async (userId) => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION), 
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by user from Firebase:', error);
    throw new Error('Failed to fetch user bookings');
  }
};

// Get a specific booking by ID from Firebase
export const getBookingById = async (bookingId) => {
  try {
    const bookingRef = doc(db, BOOKINGS_COLLECTION, bookingId);
    const bookingDoc = await getDoc(bookingRef);
    
    if (bookingDoc.exists()) {
      return {
        id: bookingDoc.id,
        ...bookingDoc.data()
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting booking by ID from Firebase:', error);
    throw new Error('Failed to fetch booking');
  }
};

// Real-time listener for bookings (useful for admin dashboard)
export const subscribeToBookings = (callback) => {
  try {
    const q = query(collection(db, BOOKINGS_COLLECTION), orderBy('createdAt', 'desc'));
    
    return onSnapshot(q, (querySnapshot) => {
      const bookings = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(bookings);
    }, (error) => {
      console.error('Error listening to bookings:', error);
      callback([]);
    });
  } catch (error) {
    console.error('Error setting up bookings listener:', error);
    return null;
  }
};

// Get bookings by status from Firebase
export const getBookingsByStatus = async (status) => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION), 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting bookings by status from Firebase:', error);
    throw new Error('Failed to fetch bookings by status');
  }
};

// Get pending bookings count (useful for admin dashboard)
export const getPendingBookingsCount = async () => {
  try {
    const q = query(
      collection(db, BOOKINGS_COLLECTION), 
      where('status', '==', bookingStatuses.PENDING)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.size;
  } catch (error) {
    console.error('Error getting pending bookings count:', error);
    return 0;
  }
}; 