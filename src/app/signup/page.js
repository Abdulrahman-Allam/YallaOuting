'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { useUser } from '../contexts/UserContext';

export default function SignUp() {
  const { theme, currentTheme } = useTheme();
  const { register } = useUser();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

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
    // Clear API error when user makes changes
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
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
      const result = await register(formData);
      
      if (result.success) {
        // Registration successful - redirect to login page with success message
        router.push('/login?registered=true');
      } else {
        // Registration failed - show error
        setApiError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
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
            Join the community and start planning amazing outings!
          </p>
        </div>

        {/* Sign Up Form */}
        <div 
          className="auth-form-container rounded-2xl p-8 backdrop-blur-sm border-2 shadow-2xl"
          style={{
            backgroundColor: `${theme.colors.background}90`,
            borderColor: `${theme.colors.primary}60`,
            boxShadow: `0 25px 50px -12px ${theme.colors.primary}40`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-bold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.firstName ? 'border-red-500' : ''
                  }`}
                  style={{
                    backgroundColor: `${theme.colors.background}70`,
                    borderColor: errors.firstName ? '#ef4444' : `${theme.colors.primary}40`,
                    color: theme.colors.text,
                    fontWeight: '500',
                  }}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-bold mb-2"
                  style={{ color: theme.colors.text }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                    errors.lastName ? 'border-red-500' : ''
                  }`}
                  style={{
                    backgroundColor: `${theme.colors.background}70`,
                    borderColor: errors.lastName ? '#ef4444' : `${theme.colors.primary}40`,
                    color: theme.colors.text,
                    fontWeight: '500',
                  }}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Username Field */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.username ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.username ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Choose a unique username"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.username}</p>
              )}
            </div>

            {/* Phone Number Field (Optional) */}
            <div>
              <label 
                htmlFor="phoneNumber" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Phone Number <span className="text-sm font-normal opacity-70">(Optional)</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2"
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Enter your phone number (optional)"
              />
            </div>

            {/* Email Field */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.email ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.email ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.email}</p>
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
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.password ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.password ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Create a strong password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-bold mb-2"
                style={{ color: theme.colors.text }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 ${
                  errors.confirmPassword ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: `${theme.colors.background}70`,
                  borderColor: errors.confirmPassword ? '#ef4444' : `${theme.colors.primary}40`,
                  color: theme.colors.text,
                  fontWeight: '500',
                }}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="rounded border mr-3 mt-1 flex-shrink-0"
                  style={{ accentColor: theme.colors.primary }}
                />
                <span 
                  className="text-sm leading-relaxed"
                  style={{ color: theme.colors.textSecondary }}
                >
                  I agree to the{' '}
                  <Link 
                    href="/terms" 
                    className="hover:underline"
                    style={{ color: theme.colors.primary }}
                  >
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link 
                    href="/privacy" 
                    className="hover:underline"
                    style={{ color: theme.colors.primary }}
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-1 font-medium">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Sign Up Button */}
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
                  Creating account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
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
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-opacity-80 transition-all duration-300"
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
                className="flex items-center justify-center px-4 py-3 border rounded-lg hover:bg-opacity-80 transition-all duration-300"
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

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p style={{ color: theme.colors.textSecondary }}>
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold hover:underline transition-colors duration-300"
                style={{ color: theme.colors.primary }}
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
