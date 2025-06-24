import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight, Edit3, Trash2, Clock, MapPin, Users, Trophy } from 'lucide-react';
import { Event } from '../../types';

export default function Scheduler() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Cricket Practice',
      type: 'practice',
      date: new Date(2024, 11, 15),
      time: '18:00',
      description: 'Regular cricket practice session - batting and bowling drills',
      teams: ['Angry Bulls'],
      location: 'Marymoor Park Cricket Ground'
    },
    {
      id: '2',
      title: 'Team Strategy Meeting',
      type: 'meeting',
      date: new Date(2024, 11, 18),
      time: '19:30',
      description: 'Discuss tactics for upcoming tournament matches',
      teams: ['Watermelons', 'Solaris'],
      location: 'Community Center Conference Room'
    },
    {
      id: '3',
      title: 'League Match vs Seattle Strikers',
      type: 'match',
      date: new Date(2024, 11, 22),
      time: '15:00',
      description: 'T20 league match at Marymoor Park Cricket Ground',
      teams: ['Royal Warriors'],
      location: 'Marymoor Park Cricket Ground'
    },
    {
      id: '4',
      title: 'Youth Cricket Training',
      type: 'practice',
      date: new Date(2024, 11, 22),
      time: '10:00',
      description: 'Special training session for youth players',
      teams: ['Watermelons Youth', 'Solaris Youth'],
      location: 'Bellevue Cricket Field'
    }
  ]);

  // Available teams for selection
  const availableTeams = [
    // ARCL Teams
    'Angry Bulls',
    'Royal Warriors', 
    'Cereal Killers',
    
    // NWCL Teams - Adult
    'Watermelons Adult',
    'Solaris Adult',
    
    // NWCL Teams - Youth
    'Watermelons Youth',
    'Solaris Youth'
  ];

  // Common cricket locations
  const commonLocations = [
    'Marymoor Park Cricket Ground',
    'Bellevue Cricket Field',
    'Redmond Sports Complex',
    'Community Center Conference Room',
    'Kirkland Cricket Oval',
    'Seattle Cricket Club',
    'Issaquah Sports Park'
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'practice': return 'bg-blue-500/20 border-blue-500 text-blue-300';
      case 'meeting': return 'bg-green-500/20 border-green-500 text-green-300';
      case 'match': return 'bg-red-500/20 border-red-500 text-red-300';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-300';
    }
  };

  const getEventsForDate = (day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    setSelectedEvent(null);
    setNewEvent({ teams: [], location: '' });
    setShowEventModal(true);
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewEvent(event);
    setShowEventModal(true);
  };

  const handleDeleteEvent = (eventId: string) => {
    // Actually remove the event from the state
    setEvents(prev => prev.filter(e => e.id !== eventId));
    alert('Event deleted successfully!');
  };

  const handleSaveEvent = () => {
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.time) {
      alert('Please fill in all required fields (title, type, date, time).');
      return;
    }

    if (selectedEvent) {
      // Edit existing event
      setEvents(prev => prev.map(e => 
        e.id === selectedEvent.id 
          ? { ...newEvent, id: selectedEvent.id } as Event 
          : e
      ));
      alert('Event updated successfully!');
    } else {
      // Add new event
      const event: Event = {
        ...newEvent,
        id: Date.now().toString(),
        teams: newEvent.teams || [],
        location: newEvent.location || ''
      } as Event;
      setEvents(prev => [...prev, event]);
      alert('Event created successfully!');
    }

    setShowEventModal(false);
    setSelectedEvent(null);
    setNewEvent({});
  };

  const handleTeamToggle = (teamName: string) => {
    const currentTeams = newEvent.teams || [];
    if (currentTeams.includes(teamName)) {
      setNewEvent({
        ...newEvent,
        teams: currentTeams.filter(t => t !== teamName)
      });
    } else {
      setNewEvent({
        ...newEvent,
        teams: [...currentTeams, teamName]
      });
    }
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-32"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEvents = getEventsForDate(day);
      const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

      days.push(
        <div
          key={day}
          className={`h-32 p-2 border border-white/10 rounded-lg hover:bg-white/5 transition-colors ${
            isToday ? 'bg-orange-500/20 border-orange-500/50' : ''
          }`}
        >
          <div className={`text-sm font-semibold mb-2 ${isToday ? 'text-orange-300' : 'text-white'}`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 3).map(event => (
              <div
                key={event.id}
                className={`text-xs px-2 py-1 rounded border ${getEventTypeColor(event.type)} cursor-pointer hover:opacity-80 transition-opacity`}
                onClick={() => handleEditEvent(event)}
                title={`${event.title} - ${event.teams?.join(', ') || 'No teams'} - ${event.location || 'No location'}`}
              >
                <div className="font-semibold truncate">{event.title}</div>
                <div className="text-xs opacity-80 truncate">
                  {event.teams && event.teams.length > 0 && (
                    <span>{event.teams.slice(0, 2).join(', ')}{event.teams.length > 2 ? '...' : ''}</span>
                  )}
                </div>
              </div>
            ))}
            {dayEvents.length > 3 && (
              <div className="text-xs text-white/60">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Cricket
              <span className="bg-gradient-to-r from-orange-400 to-green-400 bg-clip-text text-transparent">
                {' '}Scheduler
              </span>
            </h1>
            <p className="text-white/70">Manage your cricket team's schedule and events</p>
          </div>
          
          <button
            onClick={handleAddEvent}
            className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center space-x-2"
          >
            <Plus size={20} />
            <span>Add Cricket Event</span>
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-8">
          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handlePrevMonth}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <h2 className="text-3xl font-bold text-white">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={handleNextMonth}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-white/80 font-semibold py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-4">
            {renderCalendarDays()}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Calendar size={24} />
            <span>Upcoming Cricket Events</span>
          </h3>
          
          <div className="space-y-4">
            {events
              .filter(event => new Date(event.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map(event => (
                <div
                  key={event.id}
                  className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getEventTypeColor(event.type)}`}>
                          {event.type === 'practice' ? 'Practice' : 
                           event.type === 'meeting' ? 'Meeting' : 'Match'}
                        </span>
                        <h4 className="text-xl font-bold text-white">{event.title}</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/70 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={16} />
                          <span>{event.time}</span>
                        </div>
                        {event.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin size={16} />
                            <span className="truncate">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {event.teams && event.teams.length > 0 && (
                        <div className="flex items-center space-x-2 mb-3">
                          <Users size={16} className="text-orange-400" />
                          <div className="flex flex-wrap gap-2">
                            {event.teams.map(team => (
                              <span
                                key={team}
                                className="bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg text-xs font-semibold border border-orange-500/30"
                              >
                                {team}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {event.description && (
                        <p className="text-white/80 text-sm">{event.description}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEvent(event)}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Event Modal */}
        {showEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 w-full max-w-2xl border border-white/30 max-h-[90vh] overflow-y-auto">
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedEvent ? 'Edit Cricket Event' : 'Add New Cricket Event'}
              </h3>
              
              <div className="space-y-6">
                {/* Basic Event Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Event Title *</label>
                    <input
                      type="text"
                      value={newEvent.title || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Cricket event title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Event Type *</label>
                    <select
                      value={newEvent.type || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      <option value="" className="bg-gray-900">Select type</option>
                      <option value="practice" className="bg-gray-900">Practice Session</option>
                      <option value="meeting" className="bg-gray-900">Team Meeting</option>
                      <option value="match" className="bg-gray-900">Cricket Match</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Date *</label>
                    <input
                      type="date"
                      value={newEvent.date ? new Date(newEvent.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Time *</label>
                    <input
                      type="time"
                      value={newEvent.time || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Location</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newEvent.location || ''}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Enter location or select from common locations"
                      list="locations"
                    />
                    <datalist id="locations">
                      {commonLocations.map(location => (
                        <option key={location} value={location} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Team Selection */}
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-3">
                    Select Teams (Optional)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-48 overflow-y-auto bg-white/5 rounded-lg p-4 border border-white/20">
                    {availableTeams.map(team => (
                      <label
                        key={team}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-white/10 p-2 rounded-lg transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={(newEvent.teams || []).includes(team)}
                          onChange={() => handleTeamToggle(team)}
                          className="w-4 h-4 text-orange-500 bg-white/10 border-white/30 rounded focus:ring-orange-400 focus:ring-2"
                        />
                        <span className="text-white text-sm">{team}</span>
                      </label>
                    ))}
                  </div>
                  {newEvent.teams && newEvent.teams.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {newEvent.teams.map(team => (
                        <span
                          key={team}
                          className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-lg text-sm font-semibold border border-orange-500/30"
                        >
                          {team}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-2">Description</label>
                  <textarea
                    value={newEvent.description || ''}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
                    placeholder="Event description (optional)"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 bg-white/10 text-white py-3 rounded-lg font-semibold hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-green-700 transition-all"
                >
                  {selectedEvent ? 'Update Event' : 'Create Event'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}