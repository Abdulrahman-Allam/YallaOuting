'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

export default function Login() {
  const { theme, currentTheme } = useTheme();
  const { login } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Check for registration success message
  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Registration successful! Please login with your credentials.');
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear API error and success message when user makes changes
    if (apiError) {
      setApiError('');
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.emailOrUsername) {
      newErrors.emailOrUsername = 'Email or username is required';
    } else if (formData.emailOrUsername.includes('@') && !/\S+@\S+\.\S+/.test(formData.emailOrUsername)) {
      newErrors.emailOrUsername = 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');
    
    try {
      const result = await login(formData.emailOrUsername, formData.password, formData.rememberMe);
      
      if (result.success) {
        // Login successful - redirect to home page
        router.push('/');
      } else {
        // Login failed - show error
        setApiError(result.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Welcome back! Login to your account
          </p>
        </div>

        {/* Login Form */}
        <div 
          className="auth-form-container rounded-2xl p-8 backdrop-blur-sm border-2 shadow-2xl"
          style={{
            backgroundColor: `${theme.colors.background}90`,
            borderColor: `${theme.colors.primary}60`,
            boxShadow: `0 25px 50px -12px ${theme.colors.primary}40`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Success Message */}
            {successMessage && (
              <div 
                className="p-4 rounded-lg border-2 text-center"
                style={{
                  backgroundColor: `${theme.colors.primary}20`,
                  borderColor: theme.colors.primary,
                  color: theme.colors.primary,
                }}
              >
                <p className="font-medium">{successMessage}</p>
              </div>
            )}

            {/* API Error Message */}
            {apiError && (
              <div 
                className="p-4 rounded-lg border-2 border-red-500 text-center"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                }}
              >
                <p className="font-medium">{apiError}</p>
              </div>
            )}
            {/* Email or Username Field */}
            <div>
              <label 
                htmlFor="emailOrUsername" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Email or Username
              </label>                <input
                type="text"
                id="emailOrUsername"
                name="emailOrUsername"
                value={formData.emailOrUsername}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.emailOrUsername ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.emailOrUsername ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                  '::placeholder': { color: theme.colors.textSecondary }
                }}
                placeholder="Enter your email or username"
              />
              {errors.emailOrUsername && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.emailOrUsername}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Password
              </label>                <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.password ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="rounded border mr-2"
                  style={{ accentColor: theme.colors.primary }}
                />
                <span 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Remember me
                </span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm hover:underline transition-colors duration-300"
                style={{ color: theme.colors.primary }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`auth-button w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${
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
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div 
                className="absolute inset-0 flex items-center"
              >
                <div 
                  className="w-full border-t"
                  style={{ borderColor: `${theme.colors.text}20` }}
                ></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  className="px-4"
                  style={{ 
                    backgroundColor: `${theme.colors.secondary}20`,
                    color: theme.colors.textSecondary 
                  }}
                >
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="social-button flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-opacity-80 transition-all duration-300"
                style={{
                  borderColor: `${theme.colors.text}30`,
                  backgroundColor: `${theme.colors.background}20`,
                  color: theme.colors.text,
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button
                type="button"
                className="social-button flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-opacity-80 transition-all duration-300"
                style={{
                  borderColor: `${theme.colors.text}30`,
                  backgroundColor: `${theme.colors.background}20`,
                  color: theme.colors.text,
                }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p style={{ color: theme.colors.textSecondary }}>
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="font-semibold hover:underline transition-colors duration-300"
                style={{ color: theme.colors.primary }}
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
