import { useState, useEffect } from 'react';
import { Calendar, Clock, MessageSquare, Phone, Mail, User, X, CheckCircle, AlertCircle, Eye, Edit, Trash2, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';
import { Input } from '@/components/ui/input.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { useLanguage } from '../contexts/LanguageContext.jsx';
import { getAllBookings, updateBooking, deleteBooking, bookingStatuses, bookingTypes } from '../data/bookings.js';
import { sampleRooms } from '../data/rooms.js';

const BookingManagementModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load bookings on modal open
  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen]);

  // Filter bookings when search or filters change
  useEffect(() => {
    let filtered = bookings;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.userPhone?.includes(searchTerm) ||
        booking.message?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(booking => booking.type === typeFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, typeFilter]);

  const loadBookings = async () => {
    try {
      setIsLoading(true);
      const storedBookings = await getAllBookings();
      setBookings(storedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    setIsLoading(true);
    try {
      const updatedBooking = updateBooking(bookingId, { status: newStatus });
      if (updatedBooking) {
        loadBookings(); // Reload to get updated data
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm(t('confirmDeleteBooking') || 'Are you sure you want to delete this booking?')) {
      setIsLoading(true);
      try {
        deleteBooking(bookingId);
        loadBookings(); // Reload to get updated data
      } catch (error) {
        console.error('Error deleting booking:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      [bookingStatuses.PENDING]: { color: 'bg-yellow-100 text-yellow-800', label: t('pending') || 'Pending' },
      [bookingStatuses.CONFIRMED]: { color: 'bg-green-100 text-green-800', label: t('confirmed') || 'Confirmed' },
      [bookingStatuses.CANCELLED]: { color: 'bg-red-100 text-red-800', label: t('cancelled') || 'Cancelled' },
      [bookingStatuses.COMPLETED]: { color: 'bg-blue-100 text-blue-800', label: t('completed') || 'Completed' }
    };

    const config = statusConfig[status] || statusConfig[bookingStatuses.PENDING];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      [bookingTypes.INQUIRY]: { color: 'bg-purple-100 text-purple-800', label: t('inquiry') || 'Inquiry' },
      [bookingTypes.BOOKING]: { color: 'bg-orange-100 text-orange-800', label: t('booking') || 'Booking' },
      [bookingTypes.VIEWING]: { color: 'bg-indigo-100 text-indigo-800', label: t('viewing') || 'Viewing' }
    };

    const config = typeConfig[type] || typeConfig[bookingTypes.INQUIRY];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const getRoomTitle = (roomId) => {
    const room = sampleRooms.find(r => r.id === roomId);
    return room?.title || `Room ${roomId}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {t('bookingManagement') || 'Booking Management'}
              </h2>
              <p className="text-sm text-gray-600">
                {t('manageAllBookings') || 'View and manage all room bookings'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Filters and Search */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t('searchBookings') || 'Search bookings...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">{t('allStatuses') || 'All Statuses'}</option>
              {Object.values(bookingStatuses).map(status => (
                <option key={status} value={status}>
                  {status === bookingStatuses.PENDING ? (t('pending') || 'Pending') :
                   status === bookingStatuses.CONFIRMED ? (t('confirmed') || 'Confirmed') :
                   status === bookingStatuses.CANCELLED ? (t('cancelled') || 'Cancelled') :
                   status === bookingStatuses.COMPLETED ? (t('completed') || 'Completed') : status}
                </option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">{t('allTypes') || 'All Types'}</option>
              {Object.values(bookingTypes).map(type => (
                <option key={type} value={type}>
                  {type === bookingTypes.INQUIRY ? (t('inquiry') || 'Inquiry') :
                   type === bookingTypes.BOOKING ? (t('booking') || 'Booking') :
                   type === bookingTypes.VIEWING ? (t('viewing') || 'Viewing') : type}
                </option>
              ))}
            </select>

            {/* Total Count */}
            <div className="flex items-center justify-center px-3 py-2 bg-white border border-gray-300 rounded-md">
              <span className="text-sm text-gray-600">
                {t('totalBookings') || 'Total'}: {filteredBookings.length}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {filteredBookings.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t('noBookingsFound') || 'No bookings found'}
              </h3>
              <p className="text-gray-600">
                {t('noBookingsMessage') || 'No bookings match your current filters.'}
              </p>
            </div>
          ) : (
            <div className="p-6">
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {booking.userName}
                          </h3>
                          {getStatusBadge(booking.status)}
                          {getTypeBadge(booking.type)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">{t('room') || 'Room'}:</span>
                            <span className="font-medium ml-2">{getRoomTitle(booking.roomId)}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('email') || 'Email'}:</span>
                            <span className="font-medium ml-2">{booking.userEmail}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('phone') || 'Phone'}:</span>
                            <span className="font-medium ml-2">{booking.userPhone}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t('date') || 'Date'}:</span>
                            <span className="font-medium ml-2">{formatDate(booking.createdAt)}</span>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="mt-3">
                            <span className="text-gray-600 text-sm">{t('message') || 'Message'}:</span>
                            <p className="text-gray-800 mt-1">{booking.message}</p>
                          </div>
                        )}

                        {booking.requestedDate && (
                          <div className="mt-2 text-sm text-gray-600">
                            <span>{t('requestedDate') || 'Requested Date'}: {booking.requestedDate}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedBooking(booking)}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {t('view') || 'View'}
                        </Button>

                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusUpdate(booking.id, e.target.value)}
                          disabled={isLoading}
                          className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-orange-500"
                        >
                          {Object.values(bookingStatuses).map(status => (
                            <option key={status} value={status}>
                              {status === bookingStatuses.PENDING ? (t('pending') || 'Pending') :
                               status === bookingStatuses.CONFIRMED ? (t('confirmed') || 'Confirmed') :
                               status === bookingStatuses.CANCELLED ? (t('cancelled') || 'Cancelled') :
                               status === bookingStatuses.COMPLETED ? (t('completed') || 'Completed') : status}
                            </option>
                          ))}
                        </select>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteBooking(booking.id)}
                          disabled={isLoading}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          {t('delete') || 'Delete'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {t('showingResults') || 'Showing'} {filteredBookings.length} {t('of') || 'of'} {bookings.length} {t('bookings') || 'bookings'}
            </div>
            <Button
              onClick={onClose}
              variant="outline"
            >
              {t('close') || 'Close'}
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">
                {t('bookingDetails') || 'Booking Details'}
              </h3>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-gray-600">{t('bookingId') || 'Booking ID'}:</span>
                    <span className="font-medium ml-2">#{selectedBooking.id}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('status') || 'Status'}:</span>
                    <span className="ml-2">{getStatusBadge(selectedBooking.status)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('type') || 'Type'}:</span>
                    <span className="ml-2">{getTypeBadge(selectedBooking.type)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">{t('room') || 'Room'}:</span>
                    <span className="font-medium ml-2">{getRoomTitle(selectedBooking.roomId)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">{t('userInformation') || 'User Information'}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">{t('name') || 'Name'}:</span>
                      <span className="font-medium ml-2">{selectedBooking.userName}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('email') || 'Email'}:</span>
                      <span className="font-medium ml-2">{selectedBooking.userEmail}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('phone') || 'Phone'}:</span>
                      <span className="font-medium ml-2">{selectedBooking.userPhone}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('userId') || 'User ID'}:</span>
                      <span className="font-medium ml-2">{selectedBooking.userId}</span>
                    </div>
                  </div>
                </div>

                {selectedBooking.message && (
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">{t('message') || 'Message'}</h4>
                    <p className="text-gray-800 bg-gray-50 p-3 rounded-lg">
                      {selectedBooking.message}
                    </p>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">{t('timeline') || 'Timeline'}</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">{t('created') || 'Created'}:</span>
                      <span className="font-medium ml-2">{formatDateTime(selectedBooking.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">{t('updated') || 'Updated'}:</span>
                      <span className="font-medium ml-2">{formatDateTime(selectedBooking.updatedAt)}</span>
                    </div>
                    {selectedBooking.requestedDate && (
                      <div>
                        <span className="text-gray-600">{t('requestedDate') || 'Requested Date'}:</span>
                        <span className="font-medium ml-2">{selectedBooking.requestedDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <Button
                onClick={() => setSelectedBooking(null)}
                className="w-full"
              >
                {t('close') || 'Close'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagementModal; 