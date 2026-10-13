import type { ApiResponse } from '@/types';

class ApiClient {
  private simulateNetworkLatency(ms = 800): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async post<T, B>(endpoint: string, data: B): Promise<ApiResponse<T>> {
    await this.simulateNetworkLatency(750);

    // Mock router
    if (endpoint === '/api/v1/auth/login') {
      const payload = data as Record<string, unknown>;
      const { username, email, password, captchaAnswer } = payload;

      // Realistic mock checks
      if (!username || !email || !password || !captchaAnswer) {
        throw new Error('All authentication fields including security captcha are required.');
      }

      // Successful simulated auth response
      return {
        success: true,
        data: {
          token: 'eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.enterprise.' + Math.random().toString(36).substring(2),
          user: {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            username: String(username),
            email: String(email),
            role: 'security_engineer' as const,
            avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
            lastLogin: new Date().toISOString(),
            mfaEnabled: true,
          },
        } as unknown as T,
        message: 'Authentication successful. Secure session established.',
        timestamp: new Date().toISOString(),
      };
    }

    throw new Error(`Endpoint ${endpoint} not implemented`);
  }
}

export const apiClient = new ApiClient();
