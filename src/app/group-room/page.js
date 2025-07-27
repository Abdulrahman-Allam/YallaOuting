'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';
import ChatSection from '../components/GroupRoom/ChatSection';
import PollSection from '../components/GroupRoom/PollSection';
import HangoutSection from '../components/GroupRoom/HangoutSection';
import MembersSection from '../components/GroupRoom/MembersSection';
import GroupHeader from '../components/GroupRoom/GroupHeader';

export default function GroupRoom() {
  const { theme, currentTheme } = useTheme();
  const { user, isAuthenticated } = useUser();
  const [activeTab, setActiveTab] = useState('chat');

  // Mock group data (will be replaced with real data from backend)
  const groupData = {
    id: 1,
    name: "Weekend Warriors 🎉",
    description: "Best friends planning epic weekend adventures!",
    members: [
      { id: 1, name: "Ahmed", avatar: "🧑‍💻", isOnline: true },
      { id: 2, name: "Sarah", avatar: "👩‍🎨", isOnline: true },
      { id: 3, name: "Omar", avatar: "👨‍🍳", isOnline: false },
      { id: 4, name: "Lina", avatar: "👩‍🔬", isOnline: true },
      { id: 5, name: "Karim", avatar: "👨‍🎵", isOnline: false },
    ],
    memberCount: 5,
    createdAt: "2024-01-15",
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: '💬', count: null },
    { id: 'polls', label: 'Polls', icon: '📊', count: 2 },
    { id: 'hangouts', label: 'Hangouts', icon: '🎯', count: 3 },
    { id: 'members', label: 'Members', icon: '👥', count: groupData.memberCount },
  ];

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 theme-${currentTheme}`}>
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.text }}>
            Please login to access group rooms
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen theme-${currentTheme}`} style={{ backgroundColor: theme.colors.background }}>
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-30"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary}10 50%, ${theme.colors.secondary}20 100%)`,
        }}
      ></div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Group Header */}
        <GroupHeader groupData={groupData} />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar Navigation */}
          <div 
            className="w-20 md:w-64 flex-shrink-0 border-r backdrop-blur-sm"
            style={{
              backgroundColor: `${theme.colors.background}80`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-center md:justify-start p-3 rounded-lg transition-all duration-300 group ${
                    activeTab === tab.id ? 'shadow-lg transform scale-105' : 'hover:scale-102'
                  }`}
                  style={{
                    backgroundColor: activeTab === tab.id 
                      ? `${theme.colors.primary}40` 
                      : 'transparent',
                    borderLeft: activeTab === tab.id 
                      ? `4px solid ${theme.colors.primary}` 
                      : '4px solid transparent',
                  }}
                >
                  <span className="text-2xl md:text-xl">{tab.icon}</span>
                  <span 
                    className="hidden md:block ml-3 font-semibold"
                    style={{ color: theme.colors.text }}
                  >
                    {tab.label}
                  </span>
                  {tab.count && (
                    <span 
                      className="hidden md:block ml-auto px-2 py-1 text-xs rounded-full"
                      style={{
                        backgroundColor: theme.colors.primary,
                        color: 'white',
                      }}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {activeTab === 'chat' && <ChatSection />}
            {activeTab === 'polls' && <PollSection />}
            {activeTab === 'hangouts' && <HangoutSection />}
            {activeTab === 'members' && <MembersSection members={groupData.members} />}
          </div>
        </div>
      </div>
    </div>
  );
}
