import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Layout from './components/Layout.jsx'
import { LanguageProvider } from './contexts/LanguageContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { UserPreferencesProvider } from './contexts/UserPreferencesContext.jsx'

// Import pages
import {
  AboutPage,
  PrivacyPolicyPage,
  TermsOfServicePage,
  SuccessStoriesPage,
  ContactUsPage,
  TermsConditionsPage,
  RefundPolicyPage,
  SafetyGuidelinesPage,
  ProfilePage
} from './pages/index.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <UserPreferencesProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-of-service" element={<TermsOfServicePage />} />
                <Route path="success-stories" element={<SuccessStoriesPage />} />
                <Route path="contact" element={<ContactUsPage />} />
                <Route path="terms-conditions" element={<TermsConditionsPage />} />
                <Route path="refund-policy" element={<RefundPolicyPage />} />
                <Route path="safety-guidelines" element={<SafetyGuidelinesPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </UserPreferencesProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)

// Register Service Worker for PWA - prevents refresh on minimize
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    })
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New version available
              console.log('New version of the app is available');
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });

  // Handle visibility change to prevent refresh
  let hidden, visibilityChange;
  if (typeof document.hidden !== 'undefined') {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    hidden = 'msHidden';
    visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  // Prevent page reload when app becomes visible again
  let wasHidden = false;
  document.addEventListener(visibilityChange, () => {
    if (document[hidden]) {
      // App is being minimized/hidden
      wasHidden = true;
      // Save current scroll position
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    } else if (wasHidden) {
      // App is being restored
      wasHidden = false;
      // Restore scroll position
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
      }
    }
  });

  // Handle page show event (for bfcache)
  window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
      // Page was restored from bfcache
      console.log('Page restored from cache');
    }
  });

  // Prevent page from being discarded
  if ('wasDiscarded' in document) {
    if (document.wasDiscarded) {
      console.log('Page was discarded and restored');
    }
  }
}
