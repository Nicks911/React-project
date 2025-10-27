import { useState } from 'react';
import CustomerDashboardLayout from "./CustomerDashboardLayout";

const CustomerHistory = () => {
  const [filterStatus, setFilterStatus] = useState('All');

  // Sample booking data
  const bookings = [
    {
      id: 1,
      service: "Hair Cut & Styling",
      date: "Nov 5, 2025",
      time: "10:00 AM",
      stylist: "Emily Chen",
      price: "Rp 50,000",
      status: "upcoming",
      bookingDate: "Oct 25, 2025"
    },
    {
      id: 2,
      service: "Hair Coloring - Balayage",
      date: "Nov 8, 2025",
      time: "2:00 PM",
      stylist: "Sarah Johnson",
      price: "Rp 250,000",
      status: "upcoming",
      bookingDate: "Oct 26, 2025"
    },
    {
      id: 3,
      service: "Hair Treatment - Keratin",
      date: "Oct 20, 2025",
      time: "11:00 AM",
      stylist: "Lisa Martinez",
      price: "Rp 80,000",
      status: "completed",
      bookingDate: "Oct 15, 2025"
    },
    {
      id: 4,
      service: "Hair Cut & Blow Dry",
      date: "Oct 15, 2025",
      time: "3:00 PM",
      stylist: "Amanda White",
      price: "Rp 45,000",
      status: "completed",
      bookingDate: "Oct 10, 2025"
    },
    {
      id: 5,
      service: "Hair Smoothing",
      date: "Oct 12, 2025",
      time: "1:00 PM",
      stylist: "Emily Chen",
      price: "Rp 450,000",
      status: "cancelled",
      bookingDate: "Oct 8, 2025"
    },
    {
      id: 6,
      service: "Bridal Hair & Makeup",
      date: "Sep 28, 2025",
      time: "9:00 AM",
      stylist: "Sarah Johnson",
      price: "Rp 800,000",
      status: "completed",
      bookingDate: "Sep 20, 2025"
    },
    {
      id: 7,
      service: "Hair Spa Treatment",
      date: "Oct 5, 2025",
      time: "4:00 PM",
      stylist: "Lisa Martinez",
      price: "Rp 60,000",
      status: "cancelled",
      bookingDate: "Oct 1, 2025"
    }
  ];

  const statusConfig = {
    upcoming: {
      label: 'Upcoming',
      color: 'bg-blue-100 text-blue-700',
      icon: '📅',
      borderColor: 'border-blue-200'
    },
    completed: {
      label: 'Completed',
      color: 'bg-green-100 text-green-700',
      icon: '✓',
      borderColor: 'border-green-200'
    },
    cancelled: {
      label: 'Cancelled',
      color: 'bg-red-100 text-red-700',
      icon: '✕',
      borderColor: 'border-red-200'
    }
  };

  const filteredBookings = filterStatus === 'All' 
    ? bookings 
    : bookings.filter(booking => booking.status === filterStatus.toLowerCase());

  const getStatusCount = (status) => {
    return bookings.filter(b => b.status === status).length;
  };

  return (
    <CustomerDashboardLayout title="Booking History">
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{bookings.length}</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Upcoming</p>
                <p className="text-3xl font-bold">{getStatusCount('upcoming')}</p>
              </div>
              <div className="text-4xl">📅</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Completed</p>
                <p className="text-3xl font-bold">{getStatusCount('completed')}</p>
              </div>
              <div className="text-4xl">✓</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Cancelled</p>
                <p className="text-3xl font-bold">{getStatusCount('cancelled')}</p>
              </div>
              <div className="text-4xl">✕</div>
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-semibold text-gray-700">Filter by Status:</span>
            <div className="flex gap-2 flex-wrap">
              {['All', 'Upcoming', 'Completed', 'Cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const config = statusConfig[booking.status];
              return (
                <div
                  key={booking.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-l-4 ${config.borderColor}`}
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left Section - Service Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-3 flex items-center justify-center min-w-[60px]">
                            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-800 mb-1">{booking.service}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                                <span>{booking.date}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                <span>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span>{booking.stylist}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-500 mt-2">
                              Booked on: {booking.bookingDate}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Price & Status */}
                      <div className="flex md:flex-col items-center md:items-end gap-3">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">{booking.price}</p>
                        </div>
                        <span className={`${config.color} px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-sm`}>
                          <span className="text-lg">{config.icon}</span>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 flex-wrap">
                      {booking.status === 'upcoming' && (
                        <>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Cancel Booking
                          </button>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <>
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Book Again
                          </button>
                          <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-lg">
                            Leave Review
                          </button>
                        </>
                      )}
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Bookings Found</h3>
              <p className="text-gray-500">No bookings match the selected filter.</p>
            </div>
          )}
        </div>
      </div>
    </CustomerDashboardLayout>
  );
};

export default CustomerHistory;
