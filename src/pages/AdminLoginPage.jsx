import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  AlertCircle,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { useUserPreferences } from '../contexts/UserPreferencesContext.jsx';
import InAppToast from '../components/InAppToast.jsx';

const AdminLoginPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { setIsAdmin } = useUserPreferences();
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: 'success', isVisible: false, title: '' });

  // Default admin password - in production, this should be more secure
  const ADMIN_PASSWORD = '0147@May';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setNotification({
        message: 'You now have access to admin features.',
        type: 'success',
        isVisible: true,
        title: 'Admin Mode Activated!'
      });
      // Delay navigation slightly so user sees the toast
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError(t('invalidPassword') || 'Invalid admin password. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) {
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {notification.isVisible && (
        <InAppToast
          message={notification.message}
          type={notification.type}
          title={notification.title}
          onClose={() => setNotification({ ...notification, isVisible: false })}
        />
      )}
      
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full overflow-hidden animate-fade-scale">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">{t('adminLogin') || 'Admin Login'}</h2>
          <p className="text-orange-100 mt-2 text-sm">Enter your credentials to access the admin dashboard</p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('password') || 'Password'}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                placeholder={t('password') || 'Password'}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 p-1"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {error}</p>}
          </div>
          
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white h-12 text-lg rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  {t('login') || 'Login'}
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="text-gray-500 hover:text-orange-600 text-sm font-medium transition-colors"
              disabled={isLoading}
            >
              Cancel and go back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
