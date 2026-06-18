import { useAuth } from '../contexts/AuthContext.jsx';
import { Loader2, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

const AuthStatus = () => {
  const { loading, redirectLoading, authError, clearAuthError } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (loading || redirectLoading || authError) {
      setIsVisible(true);
    }
    
    // Auto dismiss error after 5 seconds
    let timeout;
    if (authError) {
      timeout = setTimeout(() => {
        setIsVisible(false);
        // Allow time for exit animation
        setTimeout(clearAuthError, 300);
      }, 5000);
    }
    
    // Auto dismiss loading if it finishes and there is no error
    if (!loading && !redirectLoading && !authError) {
      setIsVisible(false);
    }

    return () => clearTimeout(timeout);
  }, [loading, redirectLoading, authError, clearAuthError]);

  if (!isVisible) return null;

  if (loading || redirectLoading) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white rounded-full px-4 py-2 shadow-xl z-50 flex items-center gap-2 text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-4">
        <Loader2 className="w-4 h-4 animate-spin text-orange-400" />
        <span>{redirectLoading ? 'Finishing sign in...' : 'Connecting...'}</span>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white rounded-full px-4 py-2 shadow-xl z-50 flex items-center gap-2 text-sm font-medium transition-all animate-in fade-in slide-in-from-bottom-4">
        <AlertCircle className="w-4 h-4 flex-shrink-0" />
        <span className="truncate max-w-[200px]">{authError.message || 'Authentication error'}</span>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(clearAuthError, 300);
          }}
          className="ml-2 bg-white/20 hover:bg-white/30 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
        >
          &times;
        </button>
      </div>
    );
  }

  return null;
};

export default AuthStatus;
