'use client';

import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useUser } from '../../contexts/UserContext';

export default function ChatSection() {
  const { theme } = useTheme();
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: { id: 2, name: "Sarah", avatar: "👩‍🎨" },
      content: "Hey everyone! Ready for this weekend's adventure? 🎉",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      type: 'text'
    },
    {
      id: 2,
      sender: { id: 3, name: "Omar", avatar: "👨‍🍳" },
      content: "Absolutely! I've been looking forward to it all week 😄",
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      type: 'text'
    },
    {
      id: 3,
      sender: { id: 1, name: "Ahmed", avatar: "🧑‍💻" },
      content: "Should we do the beach or the hiking trail? Let me create a poll! 📊",
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      type: 'text'
    },
    {
      id: 4,
      sender: { id: 4, name: "Lina", avatar: "👩‍🔬" },
      content: "Great idea! I'm excited either way 🌊🏔️",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      type: 'text'
    },
  ]);
  
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: { 
          id: user.id, 
          name: user.firstName || user.username, 
          avatar: "👤" 
        },
        content: message,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender.id === user.id;
          const showDateSeparator = index === 0 || 
            !isToday(messages[index - 1].timestamp) && isToday(msg.timestamp);

          return (
            <div key={msg.id}>
              {/* Date Separator */}
              {showDateSeparator && (
                <div className="flex items-center justify-center my-4">
                  <div 
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      backgroundColor: `${theme.colors.text}10`,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {isToday(msg.timestamp) ? 'Today' : msg.timestamp.toDateString()}
                  </div>
                </div>
              )}

              {/* Message */}
              <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-end space-x-2 max-w-xs md:max-w-md ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  {/* Avatar */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                      backgroundColor: isCurrentUser ? theme.colors.primary : theme.colors.secondary,
                    }}
                  >
                    {msg.sender.avatar}
                  </div>

                  {/* Message Bubble */}
                  <div>
                    {!isCurrentUser && (
                      <p 
                        className="text-xs mb-1 ml-2"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {msg.sender.name}
                      </p>
                    )}
                    <div 
                      className={`rounded-2xl px-4 py-3 shadow-md ${
                        isCurrentUser ? 'rounded-br-sm' : 'rounded-bl-sm'
                      }`}
                      style={{
                        backgroundColor: isCurrentUser 
                          ? `${theme.colors.primary}` 
                          : `${theme.colors.background}`,
                        color: isCurrentUser ? 'white' : theme.colors.text,
                        border: isCurrentUser ? 'none' : `1px solid ${theme.colors.text}20`,
                      }}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p 
                        className={`text-xs mt-1 ${isCurrentUser ? 'text-white text-opacity-80' : ''}`}
                        style={{ color: isCurrentUser ? 'rgba(255,255,255,0.8)' : theme.colors.textSecondary }}
                      >
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div 
        className="border-t p-4"
        style={{ borderColor: `${theme.colors.text}20` }}
      >
        <div className="flex items-end space-x-3">
          {/* Quick Actions */}
          <div className="flex space-x-2">
            <button
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: `${theme.colors.secondary}20`,
                color: theme.colors.secondary,
              }}
              title="Attach File"
            >
              📎
            </button>
            <button
              className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              style={{
                backgroundColor: `${theme.colors.primary}20`,
                color: theme.colors.primary,
              }}
              title="Add Emoji"
            >
              😊
            </button>
          </div>

          {/* Message Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                adjustTextareaHeight();
              }}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-3 rounded-2xl border resize-none focus:outline-none focus:ring-2 transition-all duration-300"
              style={{
                backgroundColor: `${theme.colors.background}`,
                borderColor: `${theme.colors.text}30`,
                color: theme.colors.text,
                focusRingColor: theme.colors.primary,
                minHeight: '48px',
                maxHeight: '120px',
              }}
              rows={1}
            />
          </div>

          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            disabled={!message.trim()}
            className={`p-3 rounded-xl transition-all duration-300 ${
              message.trim() ? 'hover:scale-110 shadow-lg' : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              backgroundColor: message.trim() ? theme.colors.primary : `${theme.colors.text}20`,
              color: 'white',
            }}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
