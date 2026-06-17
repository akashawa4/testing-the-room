import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { auth } from '../firebase.js';
import { detectWebView } from '../utils/webview.js';

const AuthDebug = () => {
  const { user, loading, redirectLoading, authError, isAuthenticated } = useAuth();
  const [debugInfo, setDebugInfo] = useState({});

  useEffect(() => {
    const updateDebugInfo = () => {
      const detection = detectWebView();
      
      setDebugInfo({
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        webViewDetection: detection,
        authState: {
          user: user ? {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous
          } : null,
          loading,
          redirectLoading,
          isAuthenticated,
          authError: authError ? {
            code: authError.code,
            message: authError.message,
            stack: authError.stack
          } : null
        },
        firebaseAuth: {
          currentUser: auth.currentUser ? {
            uid: auth.currentUser.uid,
            email: auth.currentUser.email
          } : null,
          isSignInWithEmailLink: auth.isSignInWithEmailLink,
          config: {
            authDomain: auth.config?.authDomain,
            apiKey: auth.config?.apiKey ? '***' : null
          }
        },
        localStorage: {
          hasAuthData: !!localStorage.getItem('firebase:authUser:'),
          authKeys: Object.keys(localStorage).filter(key => key.includes('firebase'))
        },
        sessionStorage: {
          hasAuthData: !!sessionStorage.getItem('firebase:authUser:'),
          authKeys: Object.keys(sessionStorage).filter(key => key.includes('firebase'))
        }
      });
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 2000);

    return () => clearInterval(interval);
  }, [user, loading, redirectLoading, authError, isAuthenticated]);

  const copyDebugInfo = () => {
    navigator.clipboard.writeText(JSON.stringify(debugInfo, null, 2));
  };

  const clearAuthData = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.reload();
  };

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-800">🔧 Auth Debug</h3>
        <div className="flex gap-1">
          <button
            onClick={copyDebugInfo}
            className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
          >
            Copy
          </button>
          <button
            onClick={clearAuthData}
            className="text-xs bg-red-500 text-white px-2 py-1 rounded"
          >
            Clear
          </button>
        </div>
      </div>
      
      <div className="text-xs space-y-1 max-h-64 overflow-y-auto">
        <div className="grid grid-cols-2 gap-1">
          <span className="font-medium">Status:</span>
          <span className={isAuthenticated ? 'text-green-600' : 'text-red-600'}>
            {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}
          </span>
          
          <span className="font-medium">Loading:</span>
          <span className={loading ? 'text-yellow-600' : 'text-green-600'}>
            {loading ? '⏳ Loading' : '✅ Ready'}
          </span>
          
          <span className="font-medium">Redirect:</span>
          <span className={redirectLoading ? 'text-yellow-600' : 'text-green-600'}>
            {redirectLoading ? '⏳ Redirecting' : '✅ Ready'}
          </span>
          
          <span className="font-medium">WebView:</span>
          <span className={debugInfo.webViewDetection?.isWebView ? 'text-orange-600' : 'text-green-600'}>
            {debugInfo.webViewDetection?.isWebView ? '📱 WebView' : '🖥️ Browser'}
          </span>
        </div>
        
        {user && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
            <div className="font-medium text-green-800">User Info:</div>
            <div>Email: {user.email}</div>
            <div>Name: {user.displayName || 'N/A'}</div>
            <div>UID: {user.uid.substring(0, 8)}...</div>
          </div>
        )}
        
        {authError && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <div className="font-medium text-red-800">Auth Error:</div>
            <div>Code: {authError.code}</div>
            <div>Message: {authError.message}</div>
          </div>
        )}
        
        <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded">
          <div className="font-medium text-gray-800">Storage:</div>
          <div>Local: {debugInfo.localStorage?.authKeys?.length || 0} items</div>
          <div>Session: {debugInfo.sessionStorage?.authKeys?.length || 0} items</div>
        </div>
      </div>
    </div>
  );
};

export default AuthDebug;
