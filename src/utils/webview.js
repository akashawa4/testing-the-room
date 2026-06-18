// WebView detection and handling utilities

/**
 * Detect if the app is running in a WebView or in-app browser
 * @returns {Object} Object containing detection results
 */
export const detectWebView = () => {
  const userAgent = navigator.userAgent.toLowerCase();
  
  // Standalone PWA detection
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  
  // Common WebView identifiers
  const webViewPatterns = [
    'wv', // Android WebView
    'webview',
    'fb_iab', // Facebook in-app browser
    'fbav', // Facebook app
    'instagram',
    'line',
    'twitter',
    'linkedinapp',
    'whatsapp',
    'nivasi', // Custom app identifier
    'telegram',
    'snapchat',
    'tiktok'
  ];
  
  // React Native WebView
  const isReactNativeWebView = !!window.ReactNativeWebView;
  
  // iOS WKWebView
  const isWKWebView = !!window.webkit?.messageHandlers;
  
  // Check for WebView patterns in user agent
  const isWebViewByUA = webViewPatterns.some(pattern => userAgent.includes(pattern));
  
  // Additional checks for mobile browsers that might have issues
  const isMobile = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/.test(userAgent);
  const isMobileSafari = isIOS && /safari/i.test(userAgent) && !/crios|fxios/i.test(userAgent); // specifically Safari on iOS
  
  const isWebView = isWebViewByUA || isReactNativeWebView || isWKWebView;
  
  return {
    isWebView,
    isStandalone,
    isIOS,
    isMobileSafari,
    userAgent: navigator.userAgent,
    // ALWAYS use redirect on iOS, WebViews, and Installed PWAs
    shouldUseRedirect: isIOS || isWebView || isStandalone
  };
};

/**
 * Get authentication method recommendation based on environment
 * @returns {string} 'popup' or 'redirect'
 */
export const getRecommendedAuthMethod = () => {
  const detection = detectWebView();
  
  if (detection.shouldUseRedirect) {
    return 'redirect';
  }
  
  return 'popup';
};

/**
 * Check if the current environment supports popup authentication
 * @returns {boolean}
 */
export const supportsPopupAuth = () => {
  const detection = detectWebView();
  return !detection.shouldUseRedirect;
};

/**
 * Get user-friendly message for authentication issues
 * @param {Error} error - The authentication error
 * @returns {string} User-friendly error message
 */
export const getAuthErrorMessage = (error) => {
  const detection = detectWebView();
  const isIOS = detection.isIOS;
  const errorCode = error?.code || 'unknown';
  
  if (error.message?.includes('disallowed_useragent') || 
      error.message?.includes('Use secure browsers')) {
    if (detection.isWebView) {
      return 'Google Sign-In requires a secure browser. Please open this link in your default browser or install the Nivasi Space app for the best experience.';
    }
    if (isIOS) {
      return 'Google Sign-In requires a secure browser on iOS. Please try opening this link in Safari or install the Nivasi Space app.';
    }
    return 'Google Sign-In requires a secure browser. Please try using a different browser or install the Nivasi Space app.';
  }
  
  switch (errorCode) {
    case 'auth/popup-blocked':
      return isIOS 
        ? 'Popup authentication is not supported on iOS. You will be redirected to Safari for secure authentication.'
        : 'Popup was blocked. Please allow popups for this site.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completion. Please try again.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized for Google sign-in. Please contact support.';
    case 'auth/network-request-failed':
      return isIOS 
        ? 'Network error on iOS. Please check your connection and try again.'
        : 'Network error. Please check your internet connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many sign-in attempts. Please wait a moment and try again later.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with the same email address but different sign-in credentials.';
    case 'auth/operation-not-supported-in-this-environment':
      return 'This browser does not support popup authentication. Try opening in a standard browser.';
    case 'auth/cancelled-popup-request':
      return 'Only one popup request is allowed at one time. Please close other popups and try again.';
    default:
      if (isIOS && error.message?.includes('timeout')) {
        return 'Authentication is taking longer than expected on iOS. Please try refreshing the page or opening in Safari.';
      }
      return error.message || 'Failed to sign in with Google. Please try again.';
  }
};

/**
 * Get solution suggestions for authentication issues
 * @param {Error} error - The authentication error
 * @returns {string[]} Array of solution suggestions
 */
export const getAuthSolutionSuggestions = (error) => {
  const detection = detectWebView();
  const isIOS = detection.isIOS;
  const suggestions = [];
  
  if (error.message?.includes('disallowed_useragent') || 
      error.message?.includes('Use secure browsers')) {
    if (isIOS) {
      suggestions.push('Open this link in Safari for better compatibility');
      suggestions.push('Install the Nivasi Space app for the best experience');
      suggestions.push('Try refreshing the page and signing in again');
    } else if (detection.isWebView) {
      suggestions.push('Open this link in your default browser');
      suggestions.push('Install the Nivasi Space app for the best experience');
      suggestions.push('Try using Chrome, Firefox, or Safari');
    } else {
      suggestions.push('Try using a different browser');
      suggestions.push('Install the Nivasi Space app');
    }
  }
  
  if (error.code === 'auth/popup-blocked') {
    if (isIOS) {
      suggestions.push('iOS automatically redirects to Safari for secure authentication');
      suggestions.push('Install the Nivasi Space app for seamless experience');
      suggestions.push('Try refreshing the page if redirect doesn\'t work');
    } else {
      suggestions.push('Allow popups for this website');
      suggestions.push('Use the app version instead');
      suggestions.push('Try using a different browser');
    }
  }
  
  if (error.code === 'auth/network-request-failed') {
    if (isIOS) {
      suggestions.push('Check your internet connection');
      suggestions.push('Try opening in Safari if the issue persists');
      suggestions.push('Refresh the page and try again');
    } else {
      suggestions.push('Check your internet connection');
      suggestions.push('Try again later');
    }
  }
  
  if (error.message?.includes('timeout')) {
    if (isIOS) {
      suggestions.push('Authentication is taking longer than expected on iOS');
      suggestions.push('Try refreshing the page');
      suggestions.push('Open in Safari for faster authentication');
      suggestions.push('Install the Nivasi Space app for better performance');
    } else {
      suggestions.push('Authentication is taking longer than expected');
      suggestions.push('Try refreshing the page');
      suggestions.push('Check your internet connection');
    }
  }
  
  if (detection.isWebView && suggestions.length === 0) {
    suggestions.push('Open in your default browser for better compatibility');
    suggestions.push('Install the Nivasi Space app');
  }
  
  // Add iOS-specific general suggestions if no specific suggestions found
  if (isIOS && suggestions.length === 0) {
    suggestions.push('Open in Safari for the best iOS compatibility');
    suggestions.push('Install the Nivasi Space app for seamless experience');
    suggestions.push('Try refreshing the page if issues persist');
  }
  
  return suggestions;
};

export default {
  detectWebView,
  getRecommendedAuthMethod,
  supportsPopupAuth,
  getAuthErrorMessage,
  getAuthSolutionSuggestions
};
