import { storageService } from '../storage/storageService';
import type { UserProfile } from '@/types';

const TOKEN_KEY = 'auth_access_token';
const USER_KEY = 'auth_user_session';
const THEME_KEY = 'app_theme_preference';

export const tokenService = {
  getToken(): string | null {
    return storageService.getItem<string>(TOKEN_KEY);
  },

  setToken(token: string, remember: boolean = false): void {
    storageService.setItem(TOKEN_KEY, token, remember ? 'localStorage' : 'sessionStorage');
  },

  removeToken(): void {
    storageService.removeItem(TOKEN_KEY, 'localStorage');
    storageService.removeItem(TOKEN_KEY, 'sessionStorage');
  },

  getUser(): UserProfile | null {
    return (
      storageService.getItem<UserProfile>(USER_KEY, 'localStorage') ||
      storageService.getItem<UserProfile>(USER_KEY, 'sessionStorage')
    );
  },

  setUser(user: UserProfile, remember: boolean = false): void {
    storageService.setItem(USER_KEY, user, remember ? 'localStorage' : 'sessionStorage');
  },

  removeUser(): void {
    storageService.removeItem(USER_KEY, 'localStorage');
    storageService.removeItem(USER_KEY, 'sessionStorage');
  },

  getSavedTheme(): 'dark' | 'light' {
    return storageService.getItem<'dark' | 'light'>(THEME_KEY) || 'dark';
  },

  setSavedTheme(theme: 'dark' | 'light'): void {
    storageService.setItem(THEME_KEY, theme);
  },

  clearSession(): void {
    this.removeToken();
    this.removeUser();
  },
};
