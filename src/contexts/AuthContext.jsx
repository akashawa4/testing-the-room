import { createContext, useContext, useState, useEffect } from 'react';
import { auth, signOut, consumeRedirectResult, googleProvider, signInWithPopup, signInWithRedirect, setPersistence, browserLocalPersistence } from '../firebase.js';
import { onIdTokenChanged } from 'firebase/auth';

const AuthContext = createContext();

const shouldForceRedirect = () => {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";
  const isIOS =
    /iPad|iPhone|iPod/i.test(ua) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isSafari =
    /^((?!chrome|android).)*safari/i.test(ua);

  const isStandalone =
    window.matchMedia?.("(display-mode: standalone)")?.matches ||
    window.navigator.standalone === true;

  const isInAppBrowser =
    /FBAN|FBAV|Instagram|Line|MicroMessenger|WhatsApp|Telegram|wv/i.test(ua);

  const isMobileSafari = isSafari && /Mobile|iPhone|iPad|iPod/i.test(ua);

  const forceRedirect = isIOS || isStandalone || isInAppBrowser || isMobileSafari;

  console.log("[auth] hostname:", window.location.hostname);
  console.log("[auth] isIOS:", isIOS);
  console.log("[auth] isStandalone:", isStandalone);
  console.log("[auth] isInAppBrowser:", isInAppBrowser);
  console.log("[auth] isMobileSafari:", isMobileSafari);
  console.log("[auth] forceRedirect:", forceRedirect);

  return forceRedirect;
};

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
  const [authError, setAuthError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Track network status for offline guard
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    let isMounted = true;
    let redirectFinished = false;
    let tokenFired = false;

    const checkLoading = () => {
      if (isMounted && redirectFinished && tokenFired) {
        setLoading(false);
      }
    };

    // 1. Check for redirect results ONCE
    consumeRedirectResult()
      .then((result) => {
        console.log("[auth] redirect result:", result ? "received" : "none");
      })
      .catch((error) => {
        console.error("[auth] redirect result error:", error?.code, error?.message);
        if (error?.code !== 'auth/credential-already-in-use') {
          setAuthError(error);
        }
      })
      .finally(() => {
        redirectFinished = true;
        checkLoading();
      });

    // 2. Trust Firebase strictly. onIdTokenChanged handles initial load, sign-in, sign-out, AND token refreshes!
    const authUnsubscribe = onIdTokenChanged(
      auth,
      async (firebaseUser) => {
        if (!isMounted) return;
        
        if (firebaseUser) {
          // Token refreshed or authenticated
          setUser(firebaseUser);
          setAuthError(null);
        } else {
          setUser(null);
        }
        
        tokenFired = true;
        checkLoading();
      },
      (error) => {
        if (isMounted) {
          console.error('[AuthContext] onIdTokenChanged error:', error);
          setAuthError(error);
          tokenFired = true;
          checkLoading();
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
      await signOut(auth);
      setUser(null);
      setAuthError(null);
    } catch (error) {
      setAuthError(error);
    }
  };

  // Centralized Google login logic
  const loginWithGoogle = async () => {
    clearAuthError();
    setAuthError(null);

    if (isOffline) {
      throw new Error("No internet connection");
    }

    await setPersistence(auth, browserLocalPersistence);

    const forceRedirect = shouldForceRedirect();

    console.log("[auth] userAgent:", navigator.userAgent);

    if (forceRedirect) {
      setLoading(true);
      console.log("[auth] starting redirect sign-in");
      await signInWithRedirect(auth, googleProvider);
      return { method: "redirect" };
    }

    try {
      console.log("[auth] starting popup sign-in");
      await signInWithPopup(auth, googleProvider);
      return { method: "popup" };
    } catch (err) {
      console.warn("[auth] popup failed, fallback redirect:", err?.code);

      if (
        err?.code === "auth/popup-blocked" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request" ||
        err?.code === "auth/operation-not-supported-in-this-environment"
      ) {
        setLoading(true);
        await signInWithRedirect(auth, googleProvider);
        return { method: "redirect" };
      }

      setAuthError(err);
      throw err;
    }
  };

  const clearAuthError = () => {
    setAuthError(null);
  };

  const value = {
    user,
    loading,
    logout,
    loginWithGoogle,
    isAuthenticated: !!user,
    authError,
    clearAuthError,
    isOffline,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
