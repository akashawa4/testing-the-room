import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useAuth, hasPendingRedirect, markPendingRedirect, clearPendingRedirectFlag } from '../contexts/AuthContext.jsx';
import { auth, googleProvider, signInWithRedirect, signInWithPopup } from '../firebase.js';
import { getAuthErrorMessage, getAuthSolutionSuggestions, getRecommendedAuthMethod, detectWebView } from '../utils/webview.js';
import { Loader2, RefreshCw, AlertCircle, WifiOff } from 'lucide-react';

const LoginScreen = ({ onLoginSuccess }) => {
  const { t } = useLanguage();
  const { authError, clearAuthError, redirectLoading, isAuthenticated, isOffline } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [isRedirectPending, setIsRedirectPending] = useState(false);
  const { isIOS } = detectWebView();

  useEffect(() => {
    if (hasPendingRedirect()) {
      setIsRedirectPending(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      setIsRedirectPending(false);
      onLoginSuccess?.();
    }
  }, [isAuthenticated, onLoginSuccess]);

  // Clear errors when component mounts
  useEffect(() => {
    clearAuthError();
    setError('');
  }, [clearAuthError]);

  // Handle auth errors from context
  useEffect(() => {
    if (authError) {
      console.error('[LoginScreen] Auth error from context:', authError);
      const errorMessage = getAuthErrorMessage(authError);
      setError(errorMessage);
      setIsLoading(false);
      setIsRedirectPending(false);
      clearPendingRedirectFlag();
    }
  }, [authError]);

  const handleGoogleSignIn = async () => {
    if (isOffline) {
      setError('No internet connection. Please check your network and try again.');
      return;
    }

    setIsLoading(true);
    setError('');
    clearAuthError();

    const authMethod = getRecommendedAuthMethod();
    console.log('[LoginScreen] Auth method:', authMethod, '| retry:', retryCount);

    try {
      if (authMethod === 'popup') {
        const result = await signInWithPopup(auth, googleProvider);
        if (result?.user) {
          setIsLoading(false);
          // onIdTokenChanged handles user injection
          return;
        }
      } else {
        markPendingRedirect();
        setIsRedirectPending(true);
        await signInWithRedirect(auth, googleProvider);
        return;
      }
    } catch (err) {
      console.error('[LoginScreen] Sign-in error:', err);
      
      // Automatic fallback if popup is blocked
      if (err.code === 'auth/popup-blocked' || err.code === 'auth/popup-closed-by-user') {
        console.log('[LoginScreen] Popup blocked/closed, falling back to redirect...');
        try {
          markPendingRedirect();
          setIsRedirectPending(true);
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr) {
          setError(getAuthErrorMessage(redirectErr));
        }
      } else {
        setError(getAuthErrorMessage(err));
      }

      setIsRedirectPending(false);
      clearPendingRedirectFlag();
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setRetryCount(0);
    setError('');
    clearAuthError();
    handleGoogleSignIn();
  };

  const handleClearError = () => {
    setError('');
    clearAuthError();
    setRetryCount(0);
    setIsRedirectPending(false);
    clearPendingRedirectFlag();
  };

  const solutionSuggestions = error ? getAuthSolutionSuggestions({ message: error }) : [];

  // Show loading screen when returning from redirect
  if (isRedirectPending || redirectLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2" aria-live="polite">
            Completing Sign In...
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Please wait while we verify your authentication.
          </p>
          <div className="mt-6">
            <Button
              onClick={handleClearError}
              variant="outline"
              size="sm"
              className="text-xs"
              aria-label="Cancel sign in and try again"
            >
              Cancel and try again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <img src="/logo.svg" alt="Nivasi Space Logo" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('title') || 'Nivasi Space'}
          </h1>
          <p className="text-gray-600">
            {t('tagline') || 'College Room Rental - Find your perfect room near campus'}
          </p>
        </div>

        {/* Google Sign In Button */}
        <div className="space-y-4">
          <Button
            onClick={handleGoogleSignIn}
            disabled={isLoading || isOffline}
            aria-label={isOffline ? "Sign in disabled due to no internet" : "Continue with Google"}
            className="w-full bg-white border-2 border-gray-300 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 text-gray-700 py-3 text-lg font-semibold flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
            ) : isOffline ? (
              <WifiOff className="w-5 h-5" aria-hidden="true" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {isLoading ? 'Signing in...' : isOffline ? 'No Internet Connection' : 'Continue with Google'}
          </Button>

          <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-blue-700 text-xs text-center">
              {isIOS
                ? 'You will be redirected to Google for secure sign-in. On iOS, this works best in Safari.'
                : 'You will be redirected to Google for secure authentication'}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg" role="alert" aria-live="assertive">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-red-600 text-sm font-medium">{error}</p>

                {/* Solution Suggestions */}
                {solutionSuggestions.length > 0 && (
                  <div className="mt-2 p-2 bg-white/50 border border-red-100 rounded">
                    <p className="text-red-700 text-xs font-medium mb-1">
                      💡 <strong>Suggested Solutions:</strong>
                    </p>
                    <ul className="text-red-600 text-xs space-y-1">
                      {solutionSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-red-400">•</span>
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-3 flex gap-2">
                  <Button
                    onClick={handleRetry}
                    size="sm"
                    className="bg-red-600 hover:bg-red-700 text-white text-xs focus:ring-2 focus:ring-red-500"
                    aria-label="Retry sign in"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Try Again
                  </Button>
                  <Button
                    onClick={handleClearError}
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    aria-label="Clear error message"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            {t('poweredBy') || 'Powered by Nivasi Space'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
