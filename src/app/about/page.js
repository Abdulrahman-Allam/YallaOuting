'use client';

import Image from "next/image";
import { useTheme } from "../contexts/ThemeContext";

export default function About() {
  const { theme, currentTheme } = useTheme();
  
  return (
    <div 
      className={`min-h-screen theme-${currentTheme}`} 
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header Section with Dynamic Theme */}
      <header className="theme-gradient-header text-white shadow-lg overflow-hidden">
        <div className="shimmer-layer"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-16 z-10">
          <div className="text-center">
            <h1 
              className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg animate-fade-in"
              style={{ color: theme.colors.text }}
            >
              YallaOuting
            </h1>
            <p 
              className="text-2xl md:text-3xl drop-shadow-md animate-slide-up"
              style={{ color: theme.colors.text, opacity: 0.9 }}
            >
              Where Friends Come Together
            </p>
            <div 
              className="mt-8 w-32 h-1 mx-auto rounded-full animate-expand"
              style={{ backgroundColor: `${theme.colors.text}cc` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* About Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up"
              style={{ color: theme.colors.primary }}
            >
              About YallaOuting
            </h2>
            <div 
              className="w-32 h-1 mx-auto mb-8 animate-expand"
              style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
            ></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <p 
                className="text-xl leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                YallaOuting is your ultimate companion for organizing memorable hangouts with friends. 
                We understand that coordinating group activities can be challenging, so we've created 
                a platform that makes planning effortless and fun.
              </p>
              <p 
                className="text-xl leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                Whether you're planning a casual coffee meetup, an adventure-packed weekend, or a 
                special celebration, YallaOuting helps you bring your friend group together with 
                ease and excitement.
              </p>
            </div>
            <div className="relative animate-slide-in-right">
              <div 
                className="absolute -inset-2 rounded-2xl blur opacity-20 animate-pulse"
                style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              ></div>
              <div 
                className="relative rounded-2xl shadow-2xl p-8 border-l-8"
                style={{ 
                  backgroundColor: theme.colors.secondary,
                  borderImage: `linear-gradient(to bottom, ${theme.colors.primary}, ${theme.colors.text}) 1`
                }}
              >
                <div className="flex items-center mb-6">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
                  >
                    <span style={{ color: theme.colors.background }} className="text-xl">🎯</span>
                  </div>
                  <h3 
                    className="text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
                  >
                    Our Mission
                  </h3>
                </div>
                <p 
                  className="leading-relaxed text-lg"
                  style={{ color: theme.colors.text }}
                >
                  To strengthen friendships by making group hangouts seamless, enjoyable, and 
                  unforgettable. We believe that the best memories are made when friends come 
                  together, and we're here to make that happen more often.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up"
              style={{ color: theme.colors.primary }}
            >
              What We Offer
            </h2>
            <div 
              className="w-32 h-1 mx-auto mb-8 animate-expand"
              style={{ background: `linear-gradient(to right, transparent, ${theme.colors.primary}, transparent)` }}
            ></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div 
                className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"
                style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              ></div>
              <div 
                className="relative rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: theme.colors.secondary }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow"
                  style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
                >
                  <span style={{ color: theme.colors.background }} className="text-3xl">📅</span>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  Smart Scheduling
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Coordinate schedules effortlessly with our intelligent scheduling system that 
                  finds the perfect time for everyone.
                </p>
              </div>
            </div>
            
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div 
                className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"
                style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              ></div>
              <div 
                className="relative rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: theme.colors.secondary }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow"
                  style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
                >
                  <span style={{ color: theme.colors.background }} className="text-3xl">👥</span>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  Group Management
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Easily manage your friend groups, track who's coming, and keep everyone 
                  in the loop with real-time updates.
                </p>
              </div>
            </div>
            
            <div className="group relative animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div 
                className="absolute -inset-1 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"
                style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
              ></div>
              <div 
                className="relative rounded-2xl shadow-xl p-8 text-center transform group-hover:scale-105 transition-all duration-300"
                style={{ backgroundColor: theme.colors.secondary }}
              >
                <div 
                  className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow"
                  style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
                >
                  <span style={{ color: theme.colors.background }} className="text-3xl">🎯</span>
                </div>
                <h3 
                  className="text-2xl font-bold mb-4"
                  style={{ color: theme.colors.text }}
                >
                  Activity Planning
                </h3>
                <p 
                  className="leading-relaxed"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Discover and plan amazing activities with built-in suggestions and 
                  customizable options for every type of hangout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="theme-gradient-complex rounded-3xl overflow-hidden">
            <div className="relative p-12 md:p-16 text-white z-10">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in text-white">Our Values</h2>
                <p className="text-2xl opacity-90 animate-slide-up text-white">What drives us every day</p>
                <div className="mt-6 w-32 h-1 bg-white/80 mx-auto rounded-full animate-expand"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🤝</div>
                  <h3 className="font-bold text-xl mb-3 text-white">Friendship</h3>
                  <p className="opacity-90 leading-relaxed text-white">Building stronger bonds between friends</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">⚡</div>
                  <h3 className="font-bold text-xl mb-3 text-white">Simplicity</h3>
                  <p className="opacity-90 leading-relaxed text-white">Making planning effortless and intuitive</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🎉</div>
                  <h3 className="font-bold text-xl mb-3 text-white">Fun</h3>
                  <p className="opacity-90 leading-relaxed text-white">Bringing joy to every gathering</p>
                </div>
                <div className="text-center group animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🚀</div>
                  <h3 className="font-bold text-xl mb-3 text-white">Innovation</h3>
                  <p className="opacity-90 leading-relaxed text-white">Constantly improving the experience</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="relative">
            <div 
              className="absolute -inset-4 rounded-3xl blur opacity-20 animate-pulse"
              style={{ background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})` }}
            ></div>
            <div 
              className="relative rounded-3xl shadow-2xl p-12 md:p-16 border-t-8 animate-fade-in-up"
              style={{ 
                backgroundColor: theme.colors.secondary,
                borderImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text}) 1`
              }}
            >
              <h2 
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-8"
                style={{ backgroundImage: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.text})` }}
              >
                Ready to Start Planning?
              </h2>
              <p 
                className="text-xl mb-10 max-w-3xl mx-auto leading-relaxed"
                style={{ color: theme.colors.text }}
              >
                Join thousands of friend groups who are already using YallaOuting to create 
                amazing memories together. Your next great hangout is just a click away!
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button 
                  className="group relative px-10 py-4 rounded-full font-bold text-lg shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                  style={{ 
                    background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    color: theme.colors.text 
                  }}
                >
                  <span className="relative z-10">Get Started</span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(to right, ${theme.colors.secondary}, ${theme.colors.primary})` }}
                  ></div>
                </button>
                <button 
                  className="group border-2 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  style={{ 
                    borderColor: `${theme.colors.primary}80`,
                    color: theme.colors.text 
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="theme-gradient-header text-white mt-24 overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6 py-12 z-10">
          <div className="text-center text-white">
            <h3 className="text-3xl font-bold mb-4 animate-fade-in text-white">YallaOuting</h3>
            <p className="text-xl opacity-90 mb-8 animate-slide-up text-white">Making every hangout unforgettable</p>
            <div className="mt-8 pt-8 border-t border-white/30">
              <p className="opacity-75 animate-fade-in text-white">© 2025 YallaOuting. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
