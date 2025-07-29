import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL, API_ENDPOINTS, buildApiUrl } from '../config/api';

interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  date_joined: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  refreshToken: () => Promise<boolean>;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Demo mode - set to true to bypass authentication
const DEMO_MODE = true;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Demo user data
  const demoUser: User = {
    id: 1,
    username: 'demo_user',
    email: 'demo@example.com',
    first_name: 'Demo',
    last_name: 'User',
    date_joined: '2024-01-01'
  };

  // Secure token storage with sessionStorage (cleared when browser closes)
  const getStoredToken = () => {
    try {
      return sessionStorage.getItem('access_token');
    } catch {
      return null;
    }
  };

  const setStoredToken = (token: string) => {
    try {
      sessionStorage.setItem('access_token', token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  };

  const getStoredRefreshToken = () => {
    try {
      return sessionStorage.getItem('refresh_token');
    } catch {
      return null;
    }
  };

  const setStoredRefreshToken = (refreshToken: string) => {
    try {
      sessionStorage.setItem('refresh_token', refreshToken);
    } catch (error) {
      console.error('Failed to store refresh token:', error);
    }
  };

  const getStoredUser = () => {
    try {
      const userStr = sessionStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const setStoredUser = (user: User) => {
    try {
      sessionStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error('Failed to store user:', error);
    }
  };

  const clearStoredData = () => {
    try {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('refresh_token');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear stored data:', error);
    }
  };

  useEffect(() => {
    // Check for stored token on app load
    const storedToken = getStoredToken();
    const storedUser = getStoredUser();
    
    if (DEMO_MODE) {
      // Demo mode: automatically set user as authenticated
      setUser(demoUser);
      setToken('demo_token_12345');
      setStoredToken('demo_token_12345');
      setStoredUser(demoUser);
      console.log('Demo mode enabled - bypassing authentication');
    } else if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser);
    }
    
    setLoading(false);
  }, []);

  const refreshToken = async (): Promise<boolean> => {
    if (DEMO_MODE) {
      return true; // Demo mode always returns true
    }

    const refreshTokenValue = getStoredRefreshToken();
    if (!refreshTokenValue) {
      return false;
    }

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.TOKEN_REFRESH), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshTokenValue }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access);
        setStoredToken(data.access);
        return true;
      } else {
        // Refresh token is invalid, logout user
        logout();
        return false;
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      return false;
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    if (DEMO_MODE) {
      // Demo mode: always return true
      setUser(demoUser);
      setToken('demo_token_12345');
      setStoredToken('demo_token_12345');
      setStoredUser(demoUser);
      return true;
    }

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.LOGIN), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access);
        setUser(data.user);
        setStoredToken(data.access);
        setStoredRefreshToken(data.refresh);
        setStoredUser(data.user);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    if (DEMO_MODE) {
      // Demo mode: always return true
      setUser(demoUser);
      setToken('demo_token_12345');
      setStoredToken('demo_token_12345');
      setStoredUser(demoUser);
      return true;
    }

    try {
      const response = await fetch(buildApiUrl(API_ENDPOINTS.REGISTER), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.access);
        setUser(data.user);
        setStoredToken(data.access);
        setStoredRefreshToken(data.refresh);
        setStoredUser(data.user);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    clearStoredData();
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    register,
    logout,
    loading,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 