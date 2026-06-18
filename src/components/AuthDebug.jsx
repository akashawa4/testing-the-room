import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { detectWebView } from '../utils/webview.js';

const AuthDebug = () => {
  // Strip out of production completely
  if (!import.meta.env.DEV) {
    return null;
  }

  const { user, loading, redirectLoading, authError, isAuthenticated } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const detection = detectWebView();

  if (!isExpanded) {
    return (
      <button 
        onClick={() => setIsExpanded(true)}
        className="fixed bottom-4 right-4 bg-black/80 text-white text-[10px] px-2 py-1 rounded shadow-lg z-50 opacity-50 hover:opacity-100 font-mono"
      >
        Auth Debug
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-green-400 p-4 rounded-lg shadow-2xl z-50 text-[11px] font-mono w-80 max-h-[80vh] overflow-y-auto border border-gray-800">
      <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
        <h3 className="text-white font-bold text-sm">Auth State (DEV)</h3>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-gray-400 hover:text-white px-2"
        >
          Close
        </button>
      </div>
      
      <div className="space-y-3">
        <section>
          <h4 className="text-gray-400 mb-1">State</h4>
          <div className="grid grid-cols-2 gap-1">
            <span>Loading:</span><span className={loading ? 'text-yellow-400' : 'text-gray-300'}>{String(loading)}</span>
            <span>Redirect Load:</span><span className={redirectLoading ? 'text-yellow-400' : 'text-gray-300'}>{String(redirectLoading)}</span>
            <span>Auth:</span><span className={isAuthenticated ? 'text-green-400' : 'text-red-400'}>{String(isAuthenticated)}</span>
          </div>
        </section>

        <section>
          <h4 className="text-gray-400 mb-1">Environment</h4>
          <div className="grid grid-cols-2 gap-1">
            <span>iOS:</span><span className={detection.isIOS ? 'text-yellow-400' : 'text-gray-300'}>{String(detection.isIOS)}</span>
            <span>WebView:</span><span className={detection.isWebView ? 'text-yellow-400' : 'text-gray-300'}>{String(detection.isWebView)}</span>
            <span>Standalone:</span><span className={detection.isStandalone ? 'text-yellow-400' : 'text-gray-300'}>{String(detection.isStandalone)}</span>
            <span>Strategy:</span><span className="text-blue-400">{detection.shouldUseRedirect ? 'Redirect' : 'Popup'}</span>
          </div>
        </section>

        {user && (
          <section className="bg-gray-900 p-2 rounded">
            <h4 className="text-gray-400 mb-1">User</h4>
            <div className="truncate">UID: {user.uid}</div>
            <div className="truncate">Email: {user.email}</div>
          </section>
        )}

        {authError && (
          <section className="bg-red-950 p-2 rounded border border-red-900 text-red-400">
            <h4 className="text-red-300 mb-1">Error</h4>
            <div>Code: {authError.code}</div>
            <div className="text-[10px] mt-1 break-words">{authError.message}</div>
          </section>
        )}
      </div>
    </div>
  );
};

export default AuthDebug;
