'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

export default function MembersSection({ members: initialMembers }) {
  const { theme } = useTheme();
  const { user } = useUser();
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [members, setMembers] = useState(initialMembers || []);

  // Enhanced members data with more details
  const enhancedMembers = members.map(member => ({
    ...member,
    role: member.id === 1 ? 'admin' : 'member',
    joinedDate: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30),
    lastActive: member.isOnline ? 'Now' : `${Math.floor(Math.random() * 24) + 1}h ago`,
    hangoutsAttended: Math.floor(Math.random() * 15) + 1,
    pollsCreated: Math.floor(Math.random() * 5),
    favoriteActivity: ['🏖️ Beach', '🎬 Movies', '🥾 Hiking', '🍕 Food', '🎮 Gaming'][Math.floor(Math.random() * 5)]
  }));

  const handleInviteMember = () => {
    if (inviteEmail.trim()) {
      // Mock invite functionality
      console.log('Inviting:', inviteEmail);
      setInviteEmail('');
      setShowInviteModal(false);
      // You can add actual invite logic here
    }
  };

  const handleRemoveMember = (memberId) => {
    // Mock remove functionality (only admins can remove)
    if (user.role === 'admin') {
      setMembers(members.filter(member => member.id !== memberId));
    }
  };

  const handleMakeAdmin = (memberId) => {
    // Mock make admin functionality
    console.log('Making admin:', memberId);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return theme.colors.primary;
      case 'moderator': return theme.colors.secondary;
      default: return theme.colors.textSecondary;
    }
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return { text: 'Admin', icon: '👑' };
      case 'moderator': return { text: 'Mod', icon: '⚡' };
      default: return { text: 'Member', icon: '👤' };
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div 
        className="border-b p-4 flex items-center justify-between"
        style={{ borderColor: `${theme.colors.text}20` }}
      >
        <div>
          <h2 
            className="text-xl font-bold"
            style={{ color: theme.colors.text }}
          >
            Group Members 👥
          </h2>
          <p 
            className="text-sm mt-1"
            style={{ color: theme.colors.textSecondary }}
          >
            {enhancedMembers.filter(m => m.isOnline).length} online • {enhancedMembers.length} total members
          </p>
        </div>
        <button
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
          }}
        >
          + Invite
        </button>
      </div>

      {/* Members List */}
      <div className="flex-1 overflow-y-auto">
        {/* Online Members */}
        <div className="p-4">
          <h3 
            className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center"
            style={{ color: theme.colors.textSecondary }}
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Online ({enhancedMembers.filter(m => m.isOnline).length})
          </h3>
          <div className="space-y-3">
            {enhancedMembers.filter(member => member.isOnline).map((member) => (
              <div 
                key={member.id}
                className="flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:shadow-md"
                style={{
                  backgroundColor: `${theme.colors.background}60`,
                  borderColor: `${theme.colors.text}20`,
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: `${getRoleColor(member.role)}40`,
                      }}
                    >
                      {member.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 
                        className="font-semibold"
                        style={{ color: theme.colors.text }}
                      >
                        {member.name}
                        {member.name === (user.firstName || user.username) && ' (You)'}
                      </h4>
                      <span 
                        className="text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                        style={{
                          backgroundColor: `${getRoleColor(member.role)}20`,
                          color: getRoleColor(member.role),
                        }}
                      >
                        <span>{getRoleBadge(member.role).icon}</span>
                        <span>{getRoleBadge(member.role).text}</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mt-1">
                      <p 
                        className="text-sm"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        Active now
                      </p>
                      <p 
                        className="text-sm"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {member.favoriteActivity}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: `${theme.colors.primary}20`,
                      color: theme.colors.primary,
                    }}
                    title="Send Message"
                  >
                    💬
                  </button>
                  <button
                    className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: `${theme.colors.secondary}20`,
                      color: theme.colors.secondary,
                    }}
                    title="View Profile"
                  >
                    👤
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Members */}
        {enhancedMembers.filter(member => !member.isOnline).length > 0 && (
          <div className="p-4 border-t" style={{ borderColor: `${theme.colors.text}20` }}>
            <h3 
              className="text-sm font-semibold uppercase tracking-wide mb-3 flex items-center"
              style={{ color: theme.colors.textSecondary }}
            >
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
              Offline ({enhancedMembers.filter(m => !m.isOnline).length})
            </h3>
            <div className="space-y-3">
              {enhancedMembers.filter(member => !member.isOnline).map((member) => (
                <div 
                  key={member.id}
                  className="flex items-center justify-between p-4 rounded-xl border backdrop-blur-sm opacity-75"
                  style={{
                    backgroundColor: `${theme.colors.background}40`,
                    borderColor: `${theme.colors.text}10`,
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl opacity-60"
                        style={{
                          backgroundColor: `${theme.colors.text}20`,
                        }}
                      >
                        {member.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 
                          className="font-semibold"
                          style={{ color: theme.colors.text }}
                        >
                          {member.name}
                        </h4>
                        <span 
                          className="text-xs px-2 py-1 rounded-full flex items-center space-x-1"
                          style={{
                            backgroundColor: `${getRoleColor(member.role)}20`,
                            color: getRoleColor(member.role),
                          }}
                        >
                          <span>{getRoleBadge(member.role).icon}</span>
                          <span>{getRoleBadge(member.role).text}</span>
                        </span>
                      </div>
                      <p 
                        className="text-sm mt-1"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        Last seen {member.lastActive}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-2 rounded-lg transition-all duration-300 hover:scale-110 opacity-60"
                      style={{
                        backgroundColor: `${theme.colors.text}10`,
                        color: theme.colors.textSecondary,
                      }}
                      title="Send Message"
                    >
                      💬
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Member Stats */}
        <div className="p-4 border-t" style={{ borderColor: `${theme.colors.text}20` }}>
          <h3 
            className="text-sm font-semibold uppercase tracking-wide mb-3"
            style={{ color: theme.colors.textSecondary }}
          >
            Group Stats 📊
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${theme.colors.primary}20`,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                {enhancedMembers.reduce((sum, m) => sum + m.hangoutsAttended, 0)}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                Total Hangouts
              </div>
            </div>
            <div 
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${theme.colors.secondary}20`,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: theme.colors.secondary }}>
                {enhancedMembers.reduce((sum, m) => sum + m.pollsCreated, 0)}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                Polls Created
              </div>
            </div>
            <div 
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${theme.colors.primary}20`,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                {Math.floor(enhancedMembers.reduce((sum, m) => sum + (Date.now() - m.joinedDate.getTime()), 0) / (1000 * 60 * 60 * 24) / enhancedMembers.length)}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                Avg Days Active
              </div>
            </div>
            <div 
              className="p-3 rounded-lg text-center"
              style={{
                backgroundColor: `${theme.colors.secondary}20`,
              }}
            >
              <div className="text-2xl font-bold" style={{ color: theme.colors.secondary }}>
                {Math.round((enhancedMembers.filter(m => m.isOnline).length / enhancedMembers.length) * 100)}%
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                Online Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-xl border shadow-2xl max-w-md w-full"
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
                Invite New Member
              </h3>
              
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="friend@example.com"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              <div 
                className="mb-4 p-3 rounded-lg"
                style={{
                  backgroundColor: `${theme.colors.primary}10`,
                }}
              >
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.text }}
                >
                  💡 <strong>Tip:</strong> They'll receive an invitation email with a link to join your group!
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 py-2 px-4 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleInviteMember}
                  disabled={!inviteEmail.trim()}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors ${
                    !inviteEmail.trim() ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  style={{
                    backgroundColor: inviteEmail.trim() ? theme.colors.primary : `${theme.colors.text}40`,
                  }}
                >
                  Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
