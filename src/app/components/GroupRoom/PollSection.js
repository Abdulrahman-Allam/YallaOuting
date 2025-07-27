'use client';

import { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

export default function PollSection() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({
    question: '',
    options: ['', ''],
    allowMultiple: false,
    anonymous: false,
    endDate: '',
  });

  // Mock polls data
  const [polls, setPolls] = useState([
    {
      id: 1,
      question: "Where should we go this weekend?",
      options: [
        { id: 1, text: "Beach Day 🏖️", votes: 8, voters: ["Sarah", "Omar", "Lina"] },
        { id: 2, text: "Hiking Adventure 🥾", votes: 5, voters: ["Ahmed", "Karim"] },
        { id: 3, text: "City Exploration 🏙️", votes: 3, voters: ["Sarah"] }
      ],
      creator: { name: "Ahmed", avatar: "🧑‍💻" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
      allowMultiple: false,
      anonymous: false,
      totalVotes: 16,
      hasVoted: false,
      status: "active"
    },
    {
      id: 2,
      question: "What time should we meet?",
      options: [
        { id: 1, text: "9:00 AM ☀️", votes: 6, voters: ["Sarah", "Omar"] },
        { id: 2, text: "11:00 AM 🌅", votes: 10, voters: ["Ahmed", "Lina", "Karim"] },
        { id: 3, text: "2:00 PM 🌞", votes: 2, voters: ["Omar"] }
      ],
      creator: { name: "Sarah", avatar: "👩‍🎨" },
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6),
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 12),
      allowMultiple: false,
      anonymous: true,
      totalVotes: 18,
      hasVoted: true,
      userVote: [2],
      status: "active"
    }
  ]);

  const handleCreatePoll = () => {
    if (newPoll.question.trim() && newPoll.options.every(opt => opt.trim())) {
      const poll = {
        id: polls.length + 1,
        question: newPoll.question,
        options: newPoll.options.map((text, index) => ({
          id: index + 1,
          text,
          votes: 0,
          voters: []
        })),
        creator: { name: user.firstName || user.username, avatar: "👤" },
        createdAt: new Date(),
        endDate: newPoll.endDate ? new Date(newPoll.endDate) : null,
        allowMultiple: newPoll.allowMultiple,
        anonymous: newPoll.anonymous,
        totalVotes: 0,
        hasVoted: false,
        status: "active"
      };
      
      setPolls([poll, ...polls]);
      setNewPoll({
        question: '',
        options: ['', ''],
        allowMultiple: false,
        anonymous: false,
        endDate: '',
      });
      setShowCreatePoll(false);
    }
  };

  const handleVote = (pollId, optionId) => {
    setPolls(polls.map(poll => {
      if (poll.id === pollId) {
        const updatedOptions = poll.options.map(option => {
          if (option.id === optionId) {
            return {
              ...option,
              votes: option.votes + 1,
              voters: poll.anonymous ? option.voters : [...option.voters, user.firstName || user.username]
            };
          }
          return option;
        });
        
        return {
          ...poll,
          options: updatedOptions,
          hasVoted: true,
          userVote: [optionId],
          totalVotes: poll.totalVotes + 1
        };
      }
      return poll;
    }));
  };

  const addPollOption = () => {
    setNewPoll({
      ...newPoll,
      options: [...newPoll.options, '']
    });
  };

  const removePollOption = (index) => {
    if (newPoll.options.length > 2) {
      setNewPoll({
        ...newPoll,
        options: newPoll.options.filter((_, i) => i !== index)
      });
    }
  };

  const formatTimeRemaining = (endDate) => {
    if (!endDate) return "No deadline";
    const now = new Date();
    const diff = endDate - now;
    
    if (diff <= 0) return "Ended";
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''} left`;
    }
    
    return `${hours}h ${minutes}m left`;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div 
        className="border-b p-4 flex items-center justify-between"
        style={{ borderColor: `${theme.colors.text}20` }}
      >
        <h2 
          className="text-xl font-bold"
          style={{ color: theme.colors.text }}
        >
          Group Polls 📊
        </h2>
        <button
          onClick={() => setShowCreatePoll(true)}
          className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: theme.colors.primary,
            color: 'white',
          }}
        >
          + Create Poll
        </button>
      </div>

      {/* Polls List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {polls.map((poll) => (
          <div 
            key={poll.id}
            className="rounded-xl border p-6 backdrop-blur-sm"
            style={{
              backgroundColor: `${theme.colors.background}80`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            {/* Poll Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: `${theme.colors.secondary}40`,
                  }}
                >
                  {poll.creator.avatar}
                </div>
                <div>
                  <h3 
                    className="font-semibold text-lg"
                    style={{ color: theme.colors.text }}
                  >
                    {poll.question}
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    By {poll.creator.name} • {poll.createdAt.toLocaleDateString()}
                    {poll.anonymous && " • Anonymous"}
                  </p>
                </div>
              </div>
              <div 
                className="text-sm font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: poll.status === 'active' ? `${theme.colors.primary}20` : `${theme.colors.text}20`,
                  color: poll.status === 'active' ? theme.colors.primary : theme.colors.textSecondary,
                }}
              >
                {formatTimeRemaining(poll.endDate)}
              </div>
            </div>

            {/* Poll Options */}
            <div className="space-y-3">
              {poll.options.map((option) => {
                const percentage = poll.totalVotes > 0 ? (option.votes / poll.totalVotes) * 100 : 0;
                const isUserVote = poll.userVote && poll.userVote.includes(option.id);
                
                return (
                  <div key={option.id} className="relative">
                    <button
                      onClick={() => !poll.hasVoted && handleVote(poll.id, option.id)}
                      disabled={poll.hasVoted || poll.status !== 'active'}
                      className={`w-full p-4 rounded-lg text-left transition-all duration-300 border-2 ${
                        poll.hasVoted || poll.status !== 'active' 
                          ? 'cursor-default' 
                          : 'hover:scale-102 cursor-pointer'
                      } ${isUserVote ? 'ring-2' : ''}`}
                      style={{
                        backgroundColor: `${theme.colors.background}`,
                        borderColor: isUserVote ? theme.colors.primary : `${theme.colors.text}20`,
                        ringColor: isUserVote ? theme.colors.primary : 'transparent',
                      }}
                    >
                      {/* Progress Bar */}
                      <div 
                        className="absolute inset-0 rounded-lg opacity-20 transition-all duration-500"
                        style={{
                          backgroundColor: isUserVote ? theme.colors.primary : theme.colors.secondary,
                          width: `${percentage}%`,
                        }}
                      ></div>
                      
                      {/* Option Content */}
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span 
                            className="font-medium"
                            style={{ color: theme.colors.text }}
                          >
                            {option.text}
                          </span>
                          {isUserVote && <span className="text-lg">✓</span>}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span 
                            className="font-bold"
                            style={{ color: theme.colors.text }}
                          >
                            {option.votes} votes
                          </span>
                          <span 
                            className="text-sm font-medium"
                            style={{ color: theme.colors.textSecondary }}
                          >
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </button>
                    
                    {/* Voters List (if not anonymous) */}
                    {!poll.anonymous && option.voters.length > 0 && (
                      <div className="mt-2 ml-4">
                        <p 
                          className="text-xs"
                          style={{ color: theme.colors.textSecondary }}
                        >
                          Voted by: {option.voters.join(', ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Poll Footer */}
            <div className="mt-4 pt-4 border-t flex items-center justify-between" style={{ borderColor: `${theme.colors.text}20` }}>
              <p 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                Total votes: {poll.totalVotes}
                {poll.allowMultiple && " • Multiple choice allowed"}
              </p>
              {poll.hasVoted && (
                <span 
                  className="text-sm font-medium"
                  style={{ color: theme.colors.primary }}
                >
                  You voted ✓
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Poll Modal */}
      {showCreatePoll && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div 
            className="rounded-xl border shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
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
                Create New Poll
              </h3>
              
              {/* Poll Question */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Question
                </label>
                <input
                  type="text"
                  value={newPoll.question}
                  onChange={(e) => setNewPoll({ ...newPoll, question: e.target.value })}
                  placeholder="What would you like to ask?"
                  className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                  style={{
                    backgroundColor: `${theme.colors.background}`,
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                    focusRingColor: theme.colors.primary,
                  }}
                />
              </div>

              {/* Poll Options */}
              <div className="mb-4">
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Options
                </label>
                {newPoll.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => {
                        const updatedOptions = [...newPoll.options];
                        updatedOptions[index] = e.target.value;
                        setNewPoll({ ...newPoll, options: updatedOptions });
                      }}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                      style={{
                        backgroundColor: `${theme.colors.background}`,
                        borderColor: `${theme.colors.text}30`,
                        color: theme.colors.text,
                        focusRingColor: theme.colors.primary,
                      }}
                    />
                    {newPoll.options.length > 2 && (
                      <button
                        onClick={() => removePollOption(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addPollOption}
                  className="text-sm font-medium p-2 rounded-lg transition-colors"
                  style={{
                    color: theme.colors.primary,
                    backgroundColor: `${theme.colors.primary}10`,
                  }}
                >
                  + Add Option
                </button>
              </div>

              {/* Poll Settings */}
              <div className="mb-6 space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newPoll.allowMultiple}
                    onChange={(e) => setNewPoll({ ...newPoll, allowMultiple: e.target.checked })}
                    className="rounded"
                  />
                  <span 
                    className="text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    Allow multiple choices
                  </span>
                </label>
                
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={newPoll.anonymous}
                    onChange={(e) => setNewPoll({ ...newPoll, anonymous: e.target.checked })}
                    className="rounded"
                  />
                  <span 
                    className="text-sm"
                    style={{ color: theme.colors.text }}
                  >
                    Anonymous voting
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreatePoll(false)}
                  className="flex-1 py-2 px-4 rounded-lg border font-medium transition-colors"
                  style={{
                    borderColor: `${theme.colors.text}30`,
                    color: theme.colors.text,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePoll}
                  className="flex-1 py-2 px-4 rounded-lg font-medium text-white transition-colors"
                  style={{
                    backgroundColor: theme.colors.primary,
                  }}
                >
                  Create Poll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
