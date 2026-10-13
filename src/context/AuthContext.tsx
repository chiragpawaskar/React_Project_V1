import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthState, LoginCredentials, UserProfile } from '@/types';
import { tokenService } from '@/services/security/tokenService';
import { authApi } from '@/features/auth/api/authApi';
import { useToast } from './ToastContext';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toast = useToast();

  useEffect(() => {
    // Check initial existing session
    const savedToken = tokenService.getToken();
    const savedUser = tokenService.getUser();

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authApi.login(credentials);

      if (response.success && response.data) {
        const { user: authUser, token: authToken } = response.data;

        setUser(authUser);
        setToken(authToken);

        // Store tokens according to 'rememberMe'
        tokenService.setToken(authToken, credentials.rememberMe);
        tokenService.setUser(authUser, credentials.rememberMe);

        toast.success(
          'Authentication Verified',
          `Welcome back, ${authUser.username}! You are securely signed in.`
        );
        return true;
      } else {
        const errMessage = response.message || 'Authentication failed. Please verify credentials.';
        setError(errMessage);
        toast.error('Sign In Failed', errMessage);
        return false;
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected security error occurred.';
      setError(message);
      toast.error('Authentication Error', message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    tokenService.clearSession();
    setUser(null);
    setToken(null);
    setError(null);
    toast.info('Session Terminated', 'You have been safely signed out.');
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    error,
    login,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
