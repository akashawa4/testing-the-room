import { useAuth } from '../contexts/AuthContext.jsx';
import { Loader2, CheckCircle, AlertCircle, User } from 'lucide-react';

const AuthStatus = () => {
  const { user, loading, redirectLoading, authError, isAuthenticated } = useAuth();

  if (loading || redirectLoading) {
    return (
      <div className="fixed top-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-3 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
          <span className="text-sm text-blue-800">
            {redirectLoading ? 'Processing authentication...' : 'Loading...'}
          </span>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="fixed top-4 right-4 bg-red-50 border border-red-200 rounded-lg p-3 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span className="text-sm text-red-800">
            Authentication error occurred
          </span>
        </div>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-3 shadow-lg z-50">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <div className="text-sm">
            <div className="text-green-800 font-medium">
              Welcome, {user.displayName || user.email}
            </div>
            <div className="text-green-600 text-xs">
              Successfully authenticated
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthStatus;
