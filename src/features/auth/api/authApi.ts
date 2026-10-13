import { apiClient } from '@/services/http/apiClient';
import type { ApiResponse, LoginCredentials, UserProfile } from '@/types';

export interface LoginResultData {
  token: string;
  user: UserProfile;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<ApiResponse<LoginResultData>> {
    return apiClient.post<LoginResultData, LoginCredentials>('/api/v1/auth/login', credentials);
  },
};
