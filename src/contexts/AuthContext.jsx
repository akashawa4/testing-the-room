import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signOut, consumeRedirectResult } from '../firebase.js';
import { onIdTokenChanged } from 'firebase/auth';

const PENDING_REDIRECT_KEY = 'nivasi_pending_redirect';

export const hasPendingRedirect = () => {
  try {
    return sessionStorage.getItem(PENDING_REDIRECT_KEY) === 'true';
  } catch {
    return false;
  }
};

export const markPendingRedirect = () => {
  try {
    sessionStorage.setItem(PENDING_REDIRECT_KEY, 'true');
  } catch {
    // Silent fail
  }
};

export const clearPendingRedirectFlag = () => {
  try {
    sessionStorage.removeItem(PENDING_REDIRECT_KEY);
  } catch {
    // Silent fail
  }
};

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [redirectLoading, setRedirectLoading] = useState(() => hasPendingRedirect());
  const [authError, setAuthError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Track network status for offline guard
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let isMounted = true;

    // 1. Check for redirect results ONCE
    if (hasPendingRedirect()) {
      consumeRedirectResult()
        .then((result) => {
          if (!isMounted) return;
          clearPendingRedirectFlag();
          
          if (result?.user) {
             // Firebase state machine will catch this in onIdTokenChanged
          }
        })
        .catch((error) => {
          if (!isMounted) return;
          console.error('[AuthContext] consumeRedirectResult error:', error);
          clearPendingRedirectFlag();
          
          if (error?.code !== 'auth/credential-already-in-use') {
            setAuthError(error);
          }
          setRedirectLoading(false);
          setLoading(false);
        });
    }

    // 2. Trust Firebase strictly. onIdTokenChanged handles initial load, sign-in, sign-out, AND token refreshes!
    const authUnsubscribe = onIdTokenChanged(
      auth,
      async (firebaseUser) => {
        if (!isMounted) return;
        
        if (firebaseUser) {
          // Token refreshed or authenticated
          setUser(firebaseUser);
          setAuthError(null);
          // Increment user count for each successful sign‑in
          setUserCount((prev) => prev + 1);        } else {
          setUser(null);
        }
        
        setLoading(false);
        setRedirectLoading(false);
      },
      (error) => {
        if (isMounted) {
          console.error('[AuthContext] onIdTokenChanged error:', error);
          setAuthError(error);
          setLoading(false);
          setRedirectLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      authUnsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const logout = async () => {
    try {
      clearPendingRedirectFlag();
      await signOut(auth);
      setUser(null);
      setAuthError(null);
    } catch (error) {
      setAuthError(error);
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    loading: loading || redirectLoading,
    logout,
    isAuthenticated: !!user,
    redirectLoading,
    authError,
    clearAuthError,
    isOffline,
    userCount,  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
