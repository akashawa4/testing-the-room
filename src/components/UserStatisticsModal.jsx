import { useState, useEffect } from 'react';
import { X, Users, User, TrendingUp, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getUserStatistics } from '../services/userService.js';

const UserStatisticsModal = ({ onClose }) => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      const statistics = await getUserStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('Error loading user statistics:', error);
      setError('Failed to load user statistics');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading statistics...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('userStats')}</h2>
              <p className="text-gray-600">{t('userStatsDescription')}</p>
            </div>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {error ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadStatistics} variant="outline">
                Try Again
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total Users</p>
                      <p className="text-2xl font-bold text-blue-800">{stats?.total || 0}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-3">
                    <User className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Boys</p>
                      <p className="text-2xl font-bold text-blue-800">{stats?.boys || 0}</p>
                    </div>
                  </div>
                </div>

                                 <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 rounded-xl border border-pink-200">
                   <div className="flex items-center gap-3">
                     <User className="w-8 h-8 text-pink-600" />
                     <div>
                       <p className="text-pink-600 text-sm font-medium">Girls</p>
                       <p className="text-2xl font-bold text-pink-800">{stats?.girls || 0}</p>
                     </div>
                   </div>
                 </div>
               </div>

               {/* Location Statistics */}
               {stats?.cities && Object.keys(stats.cities).length > 0 && (
                 <div className="bg-gray-50 p-6 rounded-xl">
                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Distribution</h3>
                   <div className="space-y-3">
                     {Object.entries(stats.cities).map(([city, count]) => (
                       <div key={city} className="flex items-center justify-between">
                         <span className="text-sm font-medium text-gray-700">{city}</span>
                         <div className="flex items-center gap-2">
                           <div className="w-32 bg-gray-200 rounded-full h-2">
                             <div 
                               className="bg-green-600 h-2 rounded-full transition-all duration-500"
                               style={{ 
                                 width: stats?.total ? `${(count / stats.total) * 100}%` : '0%' 
                               }}
                             ></div>
                           </div>
                           <span className="text-sm font-medium text-gray-900 w-12 text-right">
                             {stats?.total ? Math.round((count / stats.total) * 100) : 0}%
                           </span>
                         </div>
                       </div>
                     ))}
                   </div>
                 </div>
               )}

              {/* Gender Distribution Chart */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Gender Distribution</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Boys</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: stats?.total ? `${(stats.boys / stats.total) * 100}%` : '0%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {stats?.total ? Math.round((stats.boys / stats.total) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Girls</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-pink-600 h-2 rounded-full transition-all duration-500"
                          style={{ 
                            width: stats?.total ? `${(stats.girls / stats.total) * 100}%` : '0%' 
                          }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-12 text-right">
                        {stats?.total ? Math.round((stats.girls / stats.total) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {formatDate(stats?.lastUpdated)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
          <Button onClick={loadStatistics} className="btn-primary">
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsModal;
