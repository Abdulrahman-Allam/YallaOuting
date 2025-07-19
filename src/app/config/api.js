// API Configuration
const API_BASE_URL = 'https://localhost:7195/api';

export const API_ENDPOINTS = {
  // Base URL
  BASE_URL: API_BASE_URL,
  
  // User Authentication Endpoints
  USER: {
    REGISTER: `${API_BASE_URL}/YallaOutingUser/register`,
    LOGIN: `${API_BASE_URL}/YallaOutingUser/login`,
    LOGOUT: `${API_BASE_URL}/YallaOutingUser/logout`,
  },
};

// HTTP Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
};

// Default headers for API requests
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

// API Request wrapper function with enhanced error handling
export const apiRequest = async (url, options = {}) => {
  const config = {
    headers: DEFAULT_HEADERS,
    ...options,
    headers: {
      ...DEFAULT_HEADERS,
      ...options.headers,
    },
  };

  // Log the request for debugging
  console.log('🚀 API Request:', {
    url,
    method: config.method || 'GET',
    headers: config.headers,
    body: config.body,
  });

  try {
    const response = await fetch(url, config);
    
    // Log the response for debugging
    console.log('📥 API Response:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });
    
    // Check if response is ok
    if (!response.ok) {
      let errorData;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          errorData = await response.json();
        } else {
          errorData = { message: await response.text() };
        }
      } catch (parseError) {
        errorData = { message: `HTTP error! status: ${response.status}` };
      }
      
      console.error('❌ API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        errorData,
      });
      
      throw new Error(errorData.message || errorData.title || `HTTP error! status: ${response.status}`);
    }

    // Check if response has content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      console.log('✅ API Success Data:', data);
      return data;
    }
    
    return response;
  } catch (error) {
    console.error('💥 API Request Error:', error);
    throw error;
  }
};

export default API_ENDPOINTS;
