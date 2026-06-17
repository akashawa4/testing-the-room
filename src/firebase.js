// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';
import { detectWebView } from './utils/webview.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPdQcmQksnlMr5oIMGkXzoc6y7N_6qjI",
  authDomain: "nivasispace-7ed76.firebaseapp.com",
  projectId: "nivasispace-7ed76",
  storageBucket: "nivasispace-7ed76.firebasestorage.app",
  messagingSenderId: "98552673378",
  appId: "1:98552673378:web:a8086a34cd1fb82a198d3b",
  measurementId: "G-634HFYP25V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Enhanced Google Auth Provider with better configuration for WebView compatibility
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Add additional scopes if needed
  scope: 'email profile',
  // Add login hint for better UX
  login_hint: '',
  // Add hd parameter if you want to restrict to specific domains
  // hd: 'yourdomain.com'
});

// Configure auth settings to handle popup issues and COOP warnings
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = false;

// Set auth persistence based on environment using the WebView detection utility
const detection = detectWebView();
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// Initialize auth persistence asynchronously
(async () => {
  try {
    // For iOS devices, always use local persistence to maintain auth state after redirect
    if (isIOS) {
      await setPersistence(auth, browserLocalPersistence);
    } else if (detection.shouldUseRedirect) {
      // For other WebView environments, use local persistence
      await setPersistence(auth, browserLocalPersistence);
    } else {
      // For regular browsers, use local persistence
      await setPersistence(auth, browserLocalPersistence);
    }
  } catch (error) {
    // Fallback - try local persistence
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (fallbackError) {
      // Silent fail - persistence error
    }
  }
})();

// getRedirectResult() can only be consumed once per page load.
// React StrictMode mounts twice in dev — cache the promise at module scope.
let redirectResultPromise = null;

export const consumeRedirectResult = () => {
  if (!redirectResultPromise) {
    redirectResultPromise = getRedirectResult(auth);
  }
  return redirectResultPromise;
};

// Analytics disabled due to permission issues
// Can be re-enabled later when Firebase project is properly configured
export const analytics = null;

// Export the Firebase app instance
export default app;

// Re-export Firebase services for easy importing
export {
  // Firestore
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  // Auth
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  // Storage
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
};