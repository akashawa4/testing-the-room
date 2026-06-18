import { createContext, useContext, useState, useEffect } from 'react';
import {
  auth,
  signOut,
  consumeRedirectResult,
  googleProvider,
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence
} from '../firebase.js';

import { onIdTokenChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

/* -------------------- iOS SAFE DETECTION -------------------- */
const shouldForceRedirect = () => {
  const ua = navigator.userAgent || "";
  const platform = navigator.platform || "";

  const isIOS =
    /iPad|iPhone|iPod/i.test(ua) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1);

  const isInAppBrowser =
    /FBAN|FBAV|Instagram|Line|MicroMessenger|WhatsApp|Telegram|wv/i.test(ua);

  const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

  const isMobileSafari = isSafari && /Mobile|iPhone|iPad|iPod/i.test(ua);

  return isIOS || isInAppBrowser || isMobileSafari;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    let mounted = true;
    let redirectDone = false;
    let tokenDone = false;

    const finishLoading = () => {
      if (mounted && redirectDone && tokenDone) {
        setLoading(false);
      }
    };

    /* -------------------- REDIRECT HANDLING (LIKE PROJECT 2) -------------------- */
    consumeRedirectResult()
      .then((result) => {
        console.log("[auth] redirect result:", result ? "SUCCESS" : "NONE");
      })
      .catch((err) => {
        console.error("[auth] redirect error:", err?.code, err?.message);
        if (err?.code !== "auth/credential-already-in-use") {
          setAuthError(err);
        }
      })
      .finally(() => {
        redirectDone = true;
        finishLoading();
      });

    /* -------------------- TOKEN LISTENER (SOURCE OF TRUTH) -------------------- */
    const unsub = onIdTokenChanged(auth, (firebaseUser) => {
      if (!mounted) return;

      setUser(firebaseUser || null);
      setAuthError(null);

      tokenDone = true;
      finishLoading();
    });

    return () => {
      mounted = false;
      unsub();
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  /* -------------------- LOGIN (CLEAN PROJECT 2 STYLE) -------------------- */
  const loginWithGoogle = async () => {
    setAuthError(null);

    if (isOffline) throw new Error("No internet connection");

    await setPersistence(auth, browserLocalPersistence);

    const forceRedirect = shouldForceRedirect();

    try {
      if (forceRedirect) {
        setLoading(true);
        await signInWithRedirect(auth, googleProvider);
        return { method: "redirect" };
      }

      await signInWithPopup(auth, googleProvider);
      return { method: "popup" };

    } catch (err) {
      console.warn("[auth] popup failed:", err?.code);

      if (
        err?.code === "auth/popup-blocked" ||
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request"
      ) {
        setLoading(true);
        await signInWithRedirect(auth, googleProvider);
        return { method: "redirect" };
      }

      setAuthError(err);
      throw err;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const clearAuthError = () => setAuthError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authError,
        isOffline,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout,
        clearAuthError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};