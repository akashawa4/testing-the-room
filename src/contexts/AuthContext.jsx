import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { auth, onAuthStateChanged, signOut, consumeRedirectResult } from '../firebase.js';

const PENDING_REDIRECT_KEY = 'nivasi_pending_redirect';

const isIOSDevice = () => /iPad|iPhone|iPod/.test(navigator.userAgent);

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
  const [redirectLoading, setRedirectLoading] = useState(() => hasPendingRedirect());
  const [authError, setAuthError] = useState(null);

  // Keep refs of state to use inside safety timeout without hook dependency warnings
  const stateRef = useRef({ loading, redirectLoading });
  stateRef.current = { loading, redirectLoading };

  useEffect(() => {
    let isMounted = true;
    let authUnsubscribe = null;

    const handleUserAuthenticated = (firebaseUser) => {
      if (!isMounted) return;
      setUser(firebaseUser);
      setAuthError(null);
      setLoading(false);
      setRedirectLoading(false);
      
      // Persist user for iOS recovery
      if (firebaseUser && isIOSDevice()) {
        try {
          localStorage.setItem('nivasi_auth_user', JSON.stringify({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL
          }));
        } catch (e) {
          console.warn('AuthContext: Failed to persist user for iOS:', e);
        }
      }
    };

    const handleNoUser = () => {
      if (!isMounted) return;
      
      // If we are still waiting for a redirect, don't finish yet
      if (hasPendingRedirect()) {
        return;
      }
      
      setUser(null);
      setLoading(false);
      setRedirectLoading(false);
    };

    // 1. Subscribe to auth state changes
    authUnsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
        if (firebaseUser) {
          handleUserAuthenticated(firebaseUser);
        } else {
          handleNoUser();
        }
      },
      (error) => {
        if (isMounted) {
          setAuthError(error);
          setLoading(false);
          setRedirectLoading(false);
        }
      }
    );

    // 2. If there is a pending redirect, consume the redirect result
    if (hasPendingRedirect()) {
      consumeRedirectResult()
        .then((result) => {
          if (!isMounted) return;
          clearPendingRedirectFlag();
          
          if (result?.user) {
            handleUserAuthenticated(result.user);
          } else if (auth.currentUser) {
            handleUserAuthenticated(auth.currentUser);
          } else {
            // No user returned and current user is null.
            // Clear pending redirect flag and finish loading immediately
            setUser(null);
            setLoading(false);
            setRedirectLoading(false);
          }
        })
        .catch((error) => {
          if (!isMounted) return;
          console.error('AuthContext: consumeRedirectResult error:', error);
          clearPendingRedirectFlag();
          
          if (error?.code !== 'auth/credential-already-in-use') {
            setAuthError(error);
          }
          
          // Clear loading states on error so user is not stuck
          setLoading(false);
          setRedirectLoading(false);
          setUser(null);
        });
    }

    // Safety timeout to prevent stuck loading state (e.g. if redirect consumption hangs)
    const safetyTimeout = setTimeout(() => {
      if (isMounted && (stateRef.current.loading || stateRef.current.redirectLoading)) {
        console.warn('AuthContext: Safety timeout reached, force clearing loading states');
        clearPendingRedirectFlag();
        
        if (auth.currentUser) {
          handleUserAuthenticated(auth.currentUser);
        } else {
          setUser(null);
          setLoading(false);
          setRedirectLoading(false);
        }
      }
    }, 15000); // 15 seconds safety timeout

    return () => {
      isMounted = false;
      if (authUnsubscribe) authUnsubscribe();
      clearTimeout(safetyTimeout);
    };
  }, []);

  const logout = async () => {
    try {
      clearPendingRedirectFlag();
      try {
        localStorage.removeItem('nivasi_auth_user');
      } catch {
        // Silent fail
      }
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
    clearAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
