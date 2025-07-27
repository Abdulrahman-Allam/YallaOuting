'use client';

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "./contexts/ThemeContext";
import { useUser } from "./contexts/UserContext";

export default function Home() {
  const { theme, currentTheme } = useTheme();
  const { user, isAuthenticated, logout } = useUser();

  return (
    <div className={`min-h-screen flex items-center justify-center p-8 relative overflow-hidden theme-${currentTheme}`}>
      {/* Dynamic Animated Background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary}20 50%, ${theme.colors.secondary}30 100%)`,
        }}
      ></div>
      
      {/* Animated overlay */}
      <div className="yalla-gradient absolute inset-0"></div>
      
      <main className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Welcome Message for Logged In Users */}
        {isAuthenticated && user && (
          <div 
            className="mb-8 p-6 rounded-2xl backdrop-blur-sm border-2"
            style={{
              backgroundColor: `${theme.colors.primary}20`,
              borderColor: `${theme.colors.primary}60`,
              boxShadow: `0 8px 32px ${theme.colors.primary}30`,
            }}
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: theme.colors.text }}
            >
              Welcome back, {user.firstName || user.username}! 🎉
            </h2>
            <p 
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              Ready to plan your next amazing outing?
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/group-room"
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 text-center`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  boxShadow: `0 4px 15px ${theme.colors.primary}40`,
                }}
              >
                Join Group Room 🎉
              </Link>
              <button
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.primary})`,
                  boxShadow: `0 4px 15px ${theme.colors.secondary}40`,
                }}
              >
                Plan New Outing
              </button>
              <button
                onClick={logout}
                className="px-6 py-3 rounded-lg font-semibold border-2 transition-all duration-300 transform hover:scale-105"
                style={{
                  borderColor: `${theme.colors.text}40`,
                  color: theme.colors.text,
                  backgroundColor: 'transparent',
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div className="mb-12">
          <h1 
            className="text-6xl md:text-8xl font-bold mb-8 animate-fade-in"
            style={{ color: theme.colors.text }}
          >
            YallaOuting
          </h1>
          <p 
            className="text-2xl md:text-3xl mb-4 animate-slide-up"
            style={{ color: theme.colors.text, opacity: 0.9 }}
          >
            Your Ultimate Friend Group Hangout Planner
          </p>
          <p 
            className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
            style={{ color: theme.colors.text, opacity: 0.8 }}
          >
            Coordinate schedules, plan amazing activities, and create unforgettable memories 
            with your friends. Making group hangouts effortless and fun!
          </p>
        </div>
        
        {/* Show login/signup buttons only if not authenticated */}
        {!isAuthenticated && (
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up">
            <Link
              href="/signup"
              className={`group relative bg-gradient-to-r ${theme.gradients.button} text-white px-12 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              <span className="relative z-10">Get Started</span>
              <div 
                className={`absolute inset-0 bg-gradient-to-r ${theme.gradients.card} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </Link>
            <Link
              href="/login"
              className="group border-2 px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                borderColor: `${theme.colors.text}50`,
                color: theme.colors.text,
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${theme.colors.primary}20`;
                e.target.style.borderColor = `${theme.colors.text}80`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = `${theme.colors.text}50`;
              }}
            >
              Login
            </Link>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in-up">
          <Link
            href="/about"
            className="text-sm hover:underline transition-colors duration-300"
            style={{ color: theme.colors.textSecondary }}
          >
            Learn About Us
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div 
            className="group rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border backdrop-blur-sm"
            style={{
              backgroundColor: `${theme.colors.secondary}50`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            <div className="text-4xl mb-4">📅</div>
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: theme.colors.text }}
            >
              Smart Scheduling
            </h3>
            <p style={{ color: theme.colors.textSecondary }}>
              Find the perfect time for everyone with our intelligent scheduling system
            </p>
          </div>
          <div 
            className="group rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border backdrop-blur-sm"
            style={{
              backgroundColor: `${theme.colors.secondary}50`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            <div className="text-4xl mb-4">👥</div>
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: theme.colors.text }}
            >
              Group Management
            </h3>
            <p style={{ color: theme.colors.textSecondary }}>
              Easily manage your friend groups and keep everyone connected
            </p>
          </div>
          <div 
            className="group rounded-2xl p-8 text-center transform hover:scale-105 transition-all duration-300 border backdrop-blur-sm"
            style={{
              backgroundColor: `${theme.colors.secondary}50`,
              borderColor: `${theme.colors.text}20`,
            }}
          >
            <div className="text-4xl mb-4">🎯</div>
            <h3 
              className="text-xl font-bold mb-3"
              style={{ color: theme.colors.text }}
            >
              Activity Planning
            </h3>
            <p style={{ color: theme.colors.textSecondary }}>
              Discover and plan amazing activities with customizable options
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
