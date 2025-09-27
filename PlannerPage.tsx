import React, { useState } from 'react';
import { Calendar, Plus, Clock, MapPin, Star } from 'lucide-react';
import { useWardrobe } from '../../context/WardrobeContext';
import { Outfit } from '../../types';
import OutfitCard from '../features/OutfitCard';

const PlannerPage: React.FC = () => {
  const { outfits } = useWardrobe();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar');

  // Generate upcoming events/occasions for demonstration
  const upcomingEvents = [
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(Date.now() + 24 * 60 * 60 * 1000),
      time: '10:00 AM',
      location: 'Office',
      occasion: 'work',
      outfit: outfits[0] || null,
    },
    {
      id: '2',
      title: 'Date Night',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      time: '7:00 PM',
      location: 'Restaurant',
      occasion: 'date',
      outfit: null,
    },
    {
      id: '3',
      title: 'Weekend Party',
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      time: '8:00 PM',
      location: 'Friend\'s House',
      occasion: 'party',
      outfit: null,
    },
  ];

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const hasEvent = upcomingEvents.some(event => 
        event.date.toDateString() === currentDate.toDateString()
      );

      days.push({
        date: currentDate,
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === today.toDateString(),
        hasEvent,
        events: upcomingEvents.filter(event => 
          event.date.toDateString() === currentDate.toDateString()
        ),
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Outfit Planner</h1>
            <p className="text-gray-600">Plan your outfits for upcoming events and occasions</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <div className="flex bg-white rounded-xl border border-gray-200 p-1">
              <button
                onClick={() => setViewMode('calendar')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'calendar' ? 'bg-rose-100 text-rose-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Calendar className="h-4 w-4 mr-2 inline" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  viewMode === 'list' ? 'bg-rose-100 text-rose-700' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                List
              </button>
            </div>
            <button className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold rounded-xl hover:from-rose-700 hover:to-pink-700 transition-all duration-200 shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </button>
          </div>
        </div>

        {viewMode === 'calendar' ? (
          /* Calendar View */
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {monthNames[new Date().getMonth()]} {new Date().getFullYear()}
                </h2>
                <div className="flex gap-2">
                  <button className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200">
                    ←
                  </button>
                  <button className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200">
                    →
                  </button>
                </div>
              </div>
              
              {/* Days of week */}
              <div className="grid grid-cols-7 gap-1 mt-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium py-2">
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-24 p-2 border border-gray-100 rounded-lg transition-all duration-200 hover:bg-gray-50 ${
                      !day.isCurrentMonth ? 'text-gray-300' : ''
                    } ${
                      day.isToday ? 'bg-rose-50 border-rose-200 text-rose-700' : ''
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">{day.date.getDate()}</div>
                    {day.events.map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className="text-xs bg-rose-100 text-rose-700 rounded px-2 py-1 mb-1 truncate"
                      >
                        {event.title}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
              
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-rose-200 transition-all duration-200"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {event.date.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {event.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {event.outfit ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-medium">Outfit Ready</span>
                        </div>
                      ) : (
                        <button className="px-4 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-all duration-200">
                          Plan Outfit
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Saved Outfits */}
            {outfits.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Outfits</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {outfits.map((outfit) => (
                    <OutfitCard key={outfit.id} outfit={outfit} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PlannerPage;