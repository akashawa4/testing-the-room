import React from 'react';
import { Home, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { isSubscriptionActive } from '../utils/subscriptionConfig.js';

const AdminMetrics = ({ rooms, adminFilter, setAdminFilter }) => {
  // Calculate room metrics directly from props
  const roomMetrics = React.useMemo(() => {
    let active = 0;
    let pending = 0;
    let expired = 0;

    rooms.forEach(room => {
      const hasSub = room.subscriptionStatus !== undefined;
      if (!hasSub) return;
      
      if (room.paymentStatus === 'pending') {
        pending++;
      } else if (room.paymentStatus === 'paid' && isSubscriptionActive(room.subscriptionEnd)) {
        active++;
      } else if (room.paymentStatus === 'expired' || (room.paymentStatus === 'paid' && !isSubscriptionActive(room.subscriptionEnd))) {
        expired++;
      }
    });

    return { total: rooms.length, active, pending, expired };
  }, [rooms]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Home className="w-5 h-5 text-orange-500" />
        Admin Dashboard
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Room Status Filter Buttons */}
        <button 
          onClick={() => setAdminFilter('all')}
          className={`p-3 rounded-lg border transition-all text-left ${adminFilter === 'all' ? 'bg-gray-100 border-gray-400 shadow-inner' : 'bg-gray-50 border-gray-200 hover:bg-gray-100'}`}
        >
          <p className="text-xs font-semibold text-gray-500 mb-1">Total Rooms</p>
          <p className="text-xl font-bold text-gray-800">{roomMetrics.total}</p>
        </button>

        <button 
          onClick={() => setAdminFilter('active')}
          className={`p-3 rounded-lg border transition-all text-left ${adminFilter === 'active' ? 'bg-blue-100 border-blue-400 shadow-inner' : 'bg-blue-50 border-blue-200 hover:bg-blue-100'}`}
        >
          <p className="text-xs font-semibold text-blue-600 flex items-center gap-1 mb-1">
            <CheckCircle className="w-3 h-3" /> Active Subs
          </p>
          <p className="text-xl font-bold text-blue-800">{roomMetrics.active}</p>
        </button>

        <button 
          onClick={() => setAdminFilter('pending')}
          className={`p-3 rounded-lg border transition-all text-left ${adminFilter === 'pending' ? 'bg-amber-100 border-amber-400 shadow-inner' : 'bg-amber-50 border-amber-200 hover:bg-amber-100'}`}
        >
          <p className="text-xs font-semibold text-amber-600 flex items-center gap-1 mb-1">
            <Clock className="w-3 h-3" /> Pending
          </p>
          <p className="text-xl font-bold text-amber-800">{roomMetrics.pending}</p>
        </button>

        <button 
          onClick={() => setAdminFilter('expired')}
          className={`p-3 rounded-lg border transition-all text-left ${adminFilter === 'expired' ? 'bg-red-100 border-red-400 shadow-inner' : 'bg-red-50 border-red-200 hover:bg-red-100'}`}
        >
          <p className="text-xs font-semibold text-red-600 flex items-center gap-1 mb-1">
            <AlertCircle className="w-3 h-3" /> Expired
          </p>
          <p className="text-xl font-bold text-red-800">{roomMetrics.expired}</p>
        </button>
      </div>
    </div>
  );
};

export default AdminMetrics;
