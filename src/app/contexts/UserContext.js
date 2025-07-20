'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { API_ENDPOINTS, apiRequest, HTTP_METHODS } from '../config/api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for stored user data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem('yalla-user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('yalla-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (emailOrUsername, password, rememberMe = false) => {
    try {
      setIsLoading(true);
      
      console.log('🔑 Login attempt with:', { emailOrUsername, password: '***', rememberMe });
      
      // Try the primary login data format
      const loginData = {
        UsernameOrEmail: emailOrUsername,  // Backend expects 'UsernameOrEmail' not 'emailOrUsername'
        Password: password,  // Try capitalized Password field
      };

      console.log('📤 Sending login data:', { ...loginData, Password: '***' });

      const response = await apiRequest(API_ENDPOINTS.USER.LOGIN, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(loginData),
      });

      console.log('✅ Login API successful:', response);

      // Store user data
      const userData = {
        ...response,
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      setIsAuthenticated(true);

      // Store in localStorage if remember me is checked
      if (rememberMe) {
        localStorage.setItem('yalla-user', JSON.stringify(userData));
      } else {
        // Store in sessionStorage for session-only login
        sessionStorage.setItem('yalla-user', JSON.stringify(userData));
      }

      return { success: true, user: userData };
    } catch (error) {
      console.error('❌ Login error details:', error);
      
      // If 400 error, try alternative format
      if (error.message.includes('400')) {
        console.log('🔄 Trying alternative login format...');
        
        try {
          // Try alternative format based on whether input is email or username
          const isEmail = emailOrUsername.includes('@');
          const alternativeData = isEmail 
            ? { Email: emailOrUsername, Password: password }
            : { Username: emailOrUsername, Password: password };
          
          console.log('📤 Trying alternative format:', { ...alternativeData, Password: '***' });
          
          const response = await apiRequest(API_ENDPOINTS.USER.LOGIN, {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(alternativeData),
          });
          
          console.log('✅ Alternative login successful:', response);
          
          const userData = {
            ...response,
            loginTime: new Date().toISOString(),
          };

          setUser(userData);
          setIsAuthenticated(true);

          if (rememberMe) {
            localStorage.setItem('yalla-user', JSON.stringify(userData));
          } else {
            sessionStorage.setItem('yalla-user', JSON.stringify(userData));
          }

          return { success: true, user: userData };
        } catch (alternativeError) {
          console.error('❌ Alternative login also failed:', alternativeError);
          return { success: false, error: alternativeError.message };
        }
      }
      
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      console.log('📝 Registration attempt with:', { ...userData, password: '***', confirmPassword: '***' });
      
      const registerData = {
        username: userData.username,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        password: userData.password,
        phoneNumber: userData.phoneNumber || null,
      };

      console.log('📤 Sending registration data:', { ...registerData, password: '***' });

      const response = await apiRequest(API_ENDPOINTS.USER.REGISTER, {
        method: HTTP_METHODS.POST,
        body: JSON.stringify(registerData),
      });

      console.log('✅ Registration API successful:', response);

      return { success: true, data: response };
    } catch (error) {
      console.error('❌ Registration error details:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      console.log('🔐 Attempting logout...');
      
      // Try to call logout API, but don't fail if it doesn't work
      if (isAuthenticated) {
        try {
          await apiRequest(API_ENDPOINTS.USER.LOGOUT, {
            method: HTTP_METHODS.POST,
          });
          console.log('✅ Logout API successful');
        } catch (apiError) {
          console.warn('⚠️ Logout API failed, but continuing with local logout:', apiError.message);
          // Don't throw the error, just log it and continue with local logout
        }
      }
    } catch (error) {
      console.error('❌ Logout error:', error);
      // Continue with local logout even if API fails
    } finally {
      // Always clear local state and storage regardless of API success/failure
      console.log('🧹 Clearing local user data...');
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('yalla-user');
      sessionStorage.removeItem('yalla-user');
      setIsLoading(false);
      console.log('✅ Local logout completed');
    }
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    
    // Update stored data
    const storedData = localStorage.getItem('yalla-user') || sessionStorage.getItem('yalla-user');
    if (storedData) {
      const isLocalStorage = localStorage.getItem('yalla-user');
      const storage = isLocalStorage ? localStorage : sessionStorage;
      storage.setItem('yalla-user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;
