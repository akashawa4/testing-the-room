import { useState } from 'react';
import { 
  X, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';

const AdminLoginModal = ({ onClose, onAdminLogin }) => {
  const { t } = useLanguage();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Default admin password - in production, this should be more secure
  const ADMIN_PASSWORD = '0147@May';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      onAdminLogin();
      onClose();
    } else {
      setError(t('invalidPassword'));
    }
    
    setIsLoading(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full animate-fade-scale">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b bg-gradient-to-r from-orange-50 to-orange-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold title-gradient">{t('adminLogin')}</h2>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isLoading}
            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={t('password')}
                className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="btn-primary w-32"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner mx-auto" />
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {t('login')}
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;

