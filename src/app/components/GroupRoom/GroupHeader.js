'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

export default function GroupHeader({ groupData }) {
  const { theme } = useTheme();
  const [showGroupInfo, setShowGroupInfo] = useState(false);

  return (
    <header 
      className="border-b backdrop-blur-sm sticky top-0 z-20"
      style={{
        backgroundColor: `${theme.colors.background}90`,
        borderColor: `${theme.colors.text}20`,
      }}
    >
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Group Info */}
        <div className="flex items-center space-x-4">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
            }}
          >
            🎉
          </div>
          <div>
            <h1 
              className="text-xl md:text-2xl font-bold"
              style={{ color: theme.colors.text }}
            >
              {groupData.name}
            </h1>
            <p 
              className="text-sm opacity-80"
              style={{ color: theme.colors.textSecondary }}
            >
              {groupData.members.filter(m => m.isOnline).length} of {groupData.memberCount} members online
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Quick Actions */}
          <button
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: `${theme.colors.primary}20`,
              color: theme.colors.primary,
            }}
            title="Start Voice Call"
          >
            📞
          </button>
          <button
            className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
            style={{
              backgroundColor: `${theme.colors.secondary}20`,
              color: theme.colors.secondary,
            }}
            title="Start Video Call"
          >
            🎥
          </button>
          
          {/* Group Settings */}
          <div className="relative">
            <button
              onClick={() => setShowGroupInfo(!showGroupInfo)}
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: `${theme.colors.text}10`,
                color: theme.colors.text,
              }}
            >
              ⚙️
            </button>
            
            {/* Group Info Dropdown */}
            {showGroupInfo && (
              <div 
                className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl border backdrop-blur-sm z-30"
                style={{
                  backgroundColor: `${theme.colors.background}95`,
                  borderColor: `${theme.colors.text}20`,
                }}
              >
                <div className="p-4">
                  <h3 
                    className="font-bold text-lg mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    Group Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p style={{ color: theme.colors.textSecondary }}>
                      <span className="font-medium">Description:</span> {groupData.description}
                    </p>
                    <p style={{ color: theme.colors.textSecondary }}>
                      <span className="font-medium">Created:</span> {new Date(groupData.createdAt).toLocaleDateString()}
                    </p>
                    <p style={{ color: theme.colors.textSecondary }}>
                      <span className="font-medium">Members:</span> {groupData.memberCount}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t" style={{ borderColor: `${theme.colors.text}20` }}>
                    <button
                      className="w-full py-2 px-4 rounded-lg font-medium transition-all duration-300"
                      style={{
                        backgroundColor: `${theme.colors.primary}20`,
                        color: theme.colors.primary,
                      }}
                    >
                      Invite Members
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
