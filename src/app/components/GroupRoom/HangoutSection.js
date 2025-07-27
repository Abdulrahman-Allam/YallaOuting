'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

export default function HangoutSection() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateHangout, setShowCreateHangout] = useState(false);
  const [newHangout, setNewHangout] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    maxParticipants: '',
    tags: [],
    type: 'hangout' // hangout, suggestion
  });

  // Mock hangouts data
  const [hangouts, setHangouts] = useState([
    {
      id: 1,
      title: "Beach Volleyball & BBQ 🏐🔥",
      description: "Let's hit the beach for some volleyball and then fire up the grill! Bring your appetite and sunscreen.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      time: "10:00 AM",
      location: "Santa Monica Beach",
      organizer: { name: "Sarah", avatar: "👩‍🎨" },
      participants: ["Sarah", "Omar", "Lina"],
      maxParticipants: 8,
      status: "confirmed",
      tags: ["outdoor", "sports", "food"],
      type: "hangout",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12),
      isParticipating: true,
    },
    {
      id: 2,
      title: "Movie Marathon Night 🍿🎬",
      description: "Marvel movie marathon at my place! I'll provide popcorn and drinks. BYOB (Bring Your Own Blanket)!",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      time: "7:00 PM",
      location: "Ahmed's Place",
      organizer: { name: "Ahmed", avatar: "🧑‍💻" },
      participants: ["Ahmed", "Karim"],
      maxParticipants: 6,
      status: "confirmed",
      tags: ["indoor", "entertainment", "chill"],
      type: "hangout",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      isParticipating: false,
    },
    {
      id: 3,
      title: "Hiking at Runyon Canyon 🥾🌄",
      description: "Early morning hike to catch the sunrise! Perfect for some exercise and great photos.",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      time: "6:30 AM",
      location: "Runyon Canyon Park",
      organizer: { name: "Lina", avatar: "👩‍🔬" },
      participants: ["Lina"],
      maxParticipants: 5,
      status: "suggestion",
      tags: ["outdoor", "fitness", "nature"],
      type: "suggestion",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      isParticipating: false,
      likes: 3,
      comments: ["Sounds amazing!", "Count me in!", "What should we bring?"]
    }
  ]);

  const handleCreateHangout = () => {
    if (newHangout.title.trim() && newHangout.date && newHangout.time) {
      const hangout = {
        id: hangouts.length + 1,
        title: newHangout.title,
        description: newHangout.description,
        date: new Date(newHangout.date + 'T' + newHangout.time),
        time: newHangout.time,
        location: newHangout.location,
        organizer: { name: user.firstName || user.username, avatar: "👤" },
        participants: [user.firstName || user.username],
        maxParticipants: parseInt(newHangout.maxParticipants) || 10,
        status: newHangout.type === 'hangout' ? 'confirmed' : 'suggestion',
        tags: newHangout.tags,
        type: newHangout.type,
        createdAt: new Date(),
        isParticipating: true,
        likes: 0,
        comments: []
      };
      
      setHangouts([hangout, ...hangouts]);
      setNewHangout({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        maxParticipants: '',
        tags: [],
        type: 'hangout'
      });
      setShowCreateHangout(false);
    }
  };

  const handleJoinHangout = (hangoutId) => {
    setHangouts(hangouts.map(hangout => {
      if (hangout.id === hangoutId && !hangout.isParticipating) {
        return {
          ...hangout,
          participants: [...hangout.participants, user.firstName || user.username],
          isParticipating: true
        };
      }
      return hangout;
    }));
  };

  const handleLeaveHangout = (hangoutId) => {
    setHangouts(hangouts.map(hangout => {
      if (hangout.id === hangoutId && hangout.isParticipating) {
        return {
          ...hangout,
          participants: hangout.participants.filter(p => p !== (user.firstName || user.username)),
          isParticipating: false
        };
      }
      return hangout;
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return theme.colors.primary;
      case 'suggestion': return theme.colors.secondary;
      default: return theme.colors.textSecondary;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'suggestion': return 'Suggestion';
      default: return 'Unknown';
    }
  };

  const filteredHangouts = hangouts.filter(hangout => {
    if (activeTab === 'upcoming') {
      return hangout.date > new Date();
    } else if (activeTab === 'suggestions') {
      return hangout.type === 'suggestion';
    } else if (activeTab === 'my-hangouts') {
      return hangout.isParticipating || hangout.organizer.name === (user.firstName || user.username);
    }
    return true;
  });

  const addTag = (tag) => {
    if (tag && !newHangout.tags.includes(tag)) {
      setNewHangout({
        ...newHangout,
        tags: [...newHangout.tags, tag]
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setNewHangout({
      ...newHangout,
      tags: newHangout.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const commonTags = ['outdoor', 'indoor', 'food', 'sports', 'entertainment', 'chill', 'fitness', 'nature', 'adventure'];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div 
        className="border-b p-4"
        style={{ borderColor: `${theme.colors.text}20` }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 
            className="text-xl font-bold"
            style={{ color: theme.colors.text }}
          >
            Hangouts & Activities 🎯
          </h2>
          <button
            onClick={() => setShowCreateHangout(true)}
            className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: theme.colors.primary,
              color: 'white',
            }}
          >
            + Plan Hangout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 rounded-lg p-1" style={{ backgroundColor: `${theme.colors.text}10` }}>
          {[
            { id: 'upcoming', label: 'Upcoming', icon: '📅' },
            { id: 'suggestions', label: 'Suggestions', icon: '💡' },
            { id: 'my-hangouts', label: 'My Hangouts', icon: '⭐' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id ? 'shadow-sm' : ''
              }`}
              style={{
                backgroundColor: activeTab === tab.id ? theme.colors.background : 'transparent',
                color: activeTab === tab.id ? theme.colors.text : theme.colors.textSecondary,
              }}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hangouts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredHangouts.map((hangout) => (
          <div 
            key={hangout.id}
            className="rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            style={{
              backgroundColor: `${theme.colors.background}80`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            {/* Hangout Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${getStatusColor(hangout.status)}40`,
                  }}
                >
                  {hangout.organizer.avatar}
                </div>
                <div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: theme.colors.text }}
                  >
                    {hangout.title}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    Organized by {hangout.organizer.name}
                  </p>
                </div>
              </div>
              <div 
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: `${getStatusColor(hangout.status)}20`,
                  color: getStatusColor(hangout.status),
                }}
              >
                {getStatusText(hangout.status)}
              </div>
            </div>

            {/* Description */}
            <p 
              className="mb-4 leading-relaxed"
              style={{ color: theme.colors.text }}
            >
              {hangout.description}
            </p>

            {/* Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p 
                  className="text-xs font-medium uppercase tracking-wide mb-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Date & Time
                </p>
                <p 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {hangout.date.toLocaleDateString()}
                </p>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {hangout.time}
                </p>
              </div>
              <div>
                <p 
                  className="text-xs font-medium uppercase tracking-wide mb-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Location
                </p>
                <p 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {hangout.location || 'TBD'}
                </p>
              </div>
              <div>
                <p 
                  className="text-xs font-medium uppercase tracking-wide mb-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Participants
                </p>
                <p 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {hangout.participants.length}/{hangout.maxParticipants}
                </p>
              </div>
              <div>
                <p 
                  className="text-xs font-medium uppercase tracking-wide mb-1"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Tags
                </p>
                <div className="flex flex-wrap gap-1">
                  {hangout.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${theme.colors.secondary}20`,
                        color: theme.colors.secondary,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                  {hangout.tags.length > 2 && (
                    <span 
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: `${theme.colors.text}10`,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      +{hangout.tags.length - 2}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Participants List */}
            <div className="mb-4">
              <p 
                className="text-sm font-medium mb-2"
                style={{ color: theme.colors.text }}
              >
                Going ({hangout.participants.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {hangout.participants.map((participant, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${theme.colors.primary}20`,
                      color: theme.colors.primary,
                    }}
                  >
                    {participant === (user.firstName || user.username) ? 'You' : participant}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: `${theme.colors.text}20` }}>
              <div className="flex items-center space-x-4">
                {hangout.type === 'suggestion' && (
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-sm font-medium transition-colors"
                      style={{ color: theme.colors.primary }}
                    >
                      👍 {hangout.likes || 0}
                    </button>
                    <button
                      className="text-sm font-medium transition-colors"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      💬 {hangout.comments?.length || 0}
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex space-x-2">
                {hangout.status === 'suggestion' && (
                  <button
                    className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                    style={{
                      backgroundColor: `${theme.colors.primary}20`,
                      color: theme.colors.primary,
                    }}
                  >
                    Make It Happen!
                  </button>
                )}
                
                {hangout.status === 'confirmed' && (
                  hangout.isParticipating ? (
                    <button
                      onClick={() => handleLeaveHangout(hangout.id)}
                      className="px-4 py-2 rounded-lg font-medium border-2 transition-all duration-300"
                      style={{
                        borderColor: `${theme.colors.text}40`,
                        color: theme.colors.text,
                        backgroundColor: 'transparent',
                      }}
                    >
                      Leave
                    </button>
                  ) : (
                    <button
                      onClick={() => handleJoinHangout(hangout.id)}
                      className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300"
                      style={{
                        backgroundColor: theme.colors.primary,
                      }}
                      disabled={hangout.participants.length >= hangout.maxParticipants}
                    >
                      {hangout.participants.length >= hangout.maxParticipants ? 'Full' : 'Join'}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        
        {filteredHangouts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <h3 
              className="text-lg font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              No hangouts yet
            </h3>
            <p 
              className="text-sm mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Be the first to plan an amazing hangout for your group!
            </p>
            <button
              onClick={() => setShowCreateHangout(true)}
              className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300"
              style={{
                backgroundColor: theme.colors.primary,
              }}
            >
              Plan First Hangout
            </button>
          </div>
        )}
      </div>

      {/* Create Hangout Modal */}
      {showCreateHangout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-xl border shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: theme.colors.background,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            <div className="p-6">
              <h3 
                className="text-xl font-bold mb-4"
                style={{ color: theme.colors.text }}
              >
                Plan New Hangout
              </h3>
              
              {/* Type Selection */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Type
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setNewHangout({ ...newHangout, type: 'hangout' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newHangout.type === 'hangout' ? 'shadow-md' : ''
                    }`}
                    style={{
                      backgroundColor: newHangout.type === 'hangout' ? theme.colors.primary : `${theme.colors.primary}20`,
                      color: newHangout.type === 'hangout' ? 'white' : theme.colors.primary,
                    }}
                  >
                    Confirmed Hangout
                  </button>
                  <button
                    onClick={() => setNewHangout({ ...newHangout, type: 'suggestion' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      newHangout.type === 'suggestion' ? 'shadow-md' : ''
                    }`}
                    style={{
                      backgroundColor: newHangout.type === 'suggestion' ? theme.colors.secondary : `${theme.colors.secondary}20`,
                      color: newHangout.type === 'suggestion' ? 'white' : theme.colors.secondary,
                    }}
                  >
                    Suggestion
                  </button>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Title
                </label>
                <input
                  type="text"
                  value={newHangout.title}
                  onChange={(e) => setNewHangout({ ...newHangout, title: e.target.value })}
                  placeholder="What's the plan?"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Description
                </label>
                <textarea
                  value={newHangout.description}
                  onChange={(e) => setNewHangout({ ...newHangout, description: e.target.value })}
                  placeholder="Tell everyone what to expect..."
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 resize-none"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    value={newHangout.date}
                    onChange={(e) => setNewHangout({ ...newHangout, date: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${theme.colors.background}`,
                      borderColor: `${theme.colors.text}30`,
                      color: theme.colors.text,
                      focusRingColor: theme.colors.primary,
                    }}
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    value={newHangout.time}
                    onChange={(e) => setNewHangout({ ...newHangout, time: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                    style={{
                      backgroundColor: `${theme.colors.background}`,
                      borderColor: `${theme.colors.text}30`,
                      color: theme.colors.text,
                      focusRingColor: theme.colors.primary,
                    }}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Location
                </label>
                <input
                  type="text"
                  value={newHangout.location}
                  onChange={(e) => setNewHangout({ ...newHangout, location: e.target.value })}
                  placeholder="Where should everyone meet?"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              {/* Max Participants */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Max Participants
                </label>
                <input
                  type="number"
                  value={newHangout.maxParticipants}
                  onChange={(e) => setNewHangout({ ...newHangout, maxParticipants: e.target.value })}
                  placeholder="10"
                  min="2"
                  max="50"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              {/* Tags */}
              <div className="mb-6">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {newHangout.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm flex items-center space-x-1"
                      style={{
                        backgroundColor: `${theme.colors.primary}20`,
                        color: theme.colors.primary,
                      }}
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-xs ml-1 hover:bg-red-200 rounded-full w-4 h-4 flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonTags.filter(tag => !newHangout.tags.includes(tag)).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => addTag(tag)}
                      className="px-3 py-1 rounded-full text-sm transition-colors"
                      style={{
                        backgroundColor: `${theme.colors.text}10`,
                        color: theme.colors.textSecondary,
                      }}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateHangout(false)}
                  className="flex-1 py-2 px-4 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateHangout}
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  {newHangout.type === 'suggestion' ? 'Suggest' : 'Create'} Hangout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
