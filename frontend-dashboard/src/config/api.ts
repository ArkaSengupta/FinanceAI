// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login/',
  REGISTER: '/auth/register/',
  LOGOUT: '/auth/logout/',
  TOKEN_REFRESH: '/auth/token/refresh/',
  
  // User endpoints
  USER_PROFILE: '/auth/profile/',
  USER_PROFILE_UPDATE: '/auth/profile/',
  
  // Add more endpoints as needed
} as const;

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
}; 