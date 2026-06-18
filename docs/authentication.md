# Nivasi Space Authentication Architecture

This document describes the production-ready Firebase Authentication flow implemented for Nivasi Space.

## Overview

The authentication system is designed to provide a seamless, robust experience across all devices, browsers, and embedded WebViews. It explicitly handles edge cases like iOS Safari pop-up blocking, Chrome Custom Tabs, Android WebViews, and Progressive Web App (PWA) standalone modes.

We use **Google Sign-In** exclusively.

## Core State Management (`AuthContext.jsx`)

We strictly trust the internal Firebase state machine. We do **not** use manual timeouts, polling intervals, or cache the `user` object in `localStorage` manually.

- **`onIdTokenChanged`**: We use this instead of `onAuthStateChanged`. It not only fires on initial login/logout but also automatically fires when the Firebase Auth token refreshes (typically every hour). This ensures the session never goes stale.
- **`getRedirectResult`**: This is invoked exactly once on mount to capture any returning credentials if the user was sent through the Redirect flow.

## Authentication Strategies (`webview.js`)

Not all environments support `signInWithPopup`. Popups are routinely blocked by mobile browsers and completely disabled inside embedded WebViews.

The `detectWebView()` utility analyzes the `userAgent` and the `window.matchMedia('(display-mode: standalone)')` state to determine the environment.

### Strategy Matrix

| Environment | Strategy | Rationale |
|-------------|----------|-----------|
| Desktop Chrome / Edge / Firefox | **Popup** | Best UX, no page reload required. |
| Android Chrome | **Popup** (with fallback) | Usually works, but if blocked, falls back to redirect seamlessly. |
| iOS Safari / iPhone Chrome | **Redirect** | iOS aggressively blocks cross-origin popups. Redirect is mandatory. |
| PWA (Standalone Mode) | **Redirect** | PWAs trap popups or open them in generic browser tabs, breaking the flow. Redirect is mandatory. |
| Embedded WebViews (Instagram, FB, WhatsApp) | **Redirect** | WebViews entirely lack the `window.open` APIs required for popups. |

## The AuthGuard Interceptor

Nivasi Space allows unauthenticated users to view rooms (public view). Authentication is only requested when a user attempts a protected action (e.g., adding a room, renewing a room, accessing the admin dashboard).

Because the app is a Single Page Application without standard routing, we use an **Interceptor Pattern** in `App.jsx`.

### Flow:
1. User clicks "Add Room".
2. `requireAuth('add-room', callback)` intercepts the click.
3. If not authenticated, the string `'add-room'` is saved to `sessionStorage` and the state `authPendingAction` is updated.
4. The global UI switches to `LoginScreen`.
5. User completes Google Sign-In.
6. The `onIdTokenChanged` listener updates the `isAuthenticated` context.
7. `LoginScreen` detects authentication and triggers `onLoginSuccess`.
8. `App.jsx` reads the pending action from `sessionStorage`, clears it, and executes the protected callback automatically.

## Security & Persistence

- **Persistence**: We explicitly initialize `browserLocalPersistence` synchronously in `firebase.js`. This guarantees that the Firebase session survives page reloads and browser restarts.
- **Offline Guard**: The `LoginScreen` subscribes to `navigator.onLine`. If the user has no internet connection, the Google Sign-In button is disabled to prevent cryptic Firebase network errors.

## Error Handling

Firebase errors are caught and translated into user-friendly messages via `getAuthErrorMessage()`. Additionally, `getAuthSolutionSuggestions()` parses the environment context (e.g., whether the user is on iOS) to provide actionable advice (like "Open in Safari" instead of "Use a different browser").

### Common Errors Handled
- `auth/popup-blocked`
- `auth/network-request-failed`
- `auth/too-many-requests`
- `auth/popup-closed-by-user`
- `auth/unauthorized-domain`

## Development vs Production

- **`AuthDebug.jsx`**: A floating debugger is available in the bottom right corner. It binds directly to the AuthContext state without any polling intervals. It is strictly disabled in production builds via `import.meta.env.DEV` to ensure it is completely tree-shaken from the final bundle.
- **`AuthStatus.jsx`**: Background processing (e.g., waiting for the redirect to complete) is communicated via a non-intrusive, auto-dismissing toast overlay, preventing UI flickers.
