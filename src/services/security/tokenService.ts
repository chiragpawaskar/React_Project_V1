import { storageService } from '../storage/storageService';
import type { UserProfile } from '@/types';

const TOKEN_KEY = 'auth_access_token';
const USER_KEY = 'auth_user_session';

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

  clearSession(): void {
    this.removeToken();
    this.removeUser();
  },
};
