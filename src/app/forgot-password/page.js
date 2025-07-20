'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../contexts/ThemeContext';

export default function ForgotPassword() {
  const { theme, currentTheme } = useTheme();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden theme-${currentTheme}`}>
      {/* Dynamic Animated Background */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.primary}20 50%, ${theme.colors.secondary}30 100%)`,
        }}
      ></div>
      
      {/* Animated overlay */}
      <div className="yalla-gradient absolute inset-0"></div>
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 
              className="text-4xl font-bold mb-2 hover:scale-105 transition-transform duration-300"
              style={{ color: theme.colors.text }}
            >
              YallaOuting
            </h1>
          </Link>
          <p 
            className="text-lg"
            style={{ color: theme.colors.textSecondary }}
          >
            {isSubmitted ? 'Check your email' : 'Reset your password'}
          </p>
        </div>

        {/* Form Container */}
        <div 
          className="rounded-2xl p-8 backdrop-blur-sm border-2 shadow-2xl"
          style={{
            backgroundColor: `${theme.colors.background}90`,
            borderColor: `${theme.colors.primary}60`,
            boxShadow: `0 25px 50px -12px ${theme.colors.primary}40`,
          }}
        >
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <p 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>

              {/* Email Field */}
              <div>              <label 
                htmlFor="email" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  error ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: error ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Enter your email address"
              />
              {error && (
                <p className="text-red-500 text-sm mt-1 font-medium">{error}</p>
              )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
                  isLoading ? 'cursor-wait' : ''
                }`}
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                  boxShadow: `0 4px 15px ${theme.colors.primary}40`,
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Sending reset link...
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>

              {/* Back to Login Link */}
              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm hover:underline transition-colors duration-300"
                  style={{ color: theme.colors.primary }}
                >
                  ← Back to login
                </Link>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="text-center space-y-6">
              <div 
                className="w-16 h-16 mx-auto rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.colors.primary}20` }}
              >
                <svg 
                  className="w-8 h-8" 
                  fill="none" 
                  stroke={theme.colors.primary} 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>

              <div>
                <h3 
                  className="text-xl font-semibold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Reset link sent!
                </h3>
                <p 
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: theme.colors.textSecondary }}
                >
                  We've sent a password reset link to <strong>{email}</strong>. 
                  Check your email and follow the instructions to reset your password.
                </p>
                <p 
                  className="text-xs"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="hover:underline"
                    style={{ color: theme.colors.primary }}
                  >
                    try again
                  </button>
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/login"
                  className="block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
                    color: 'white',
                    boxShadow: `0 4px 15px ${theme.colors.primary}40`,
                  }}
                >
                  Back to Login
                </Link>
                
                <Link
                  href="/"
                  className="block w-full py-3 px-6 rounded-lg font-semibold text-center border transition-all duration-300 transform hover:scale-105"
                  style={{
                    borderColor: `${theme.colors.text}30`,
                    backgroundColor: `${theme.colors.background}20`,
                    color: theme.colors.text,
                  }}
                >
                  Go Home
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
