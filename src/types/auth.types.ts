export interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'security_engineer' | 'compliance_officer' | 'user';
  avatarUrl: string;
  lastLogin: string;
  mfaEnabled: boolean;
}

export interface LoginCredentials {
  username: string;
  email: string;
  password: string;
  captchaAnswer: string;
  rememberMe: boolean;
}

export interface CaptchaChallengeData {
  id: string;
  token: string;
  code: string;
  createdAt: number;
  expiresInSeconds: number;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface FormValidationErrors {
  username?: string;
  email?: string;
  password?: string;
  captchaAnswer?: string;
}

export interface FormTouchedFields {
  username?: boolean;
  email?: boolean;
  password?: boolean;
  captchaAnswer?: boolean;
}

export interface PasswordStrengthResult {
  score: number; // 0 to 4
  label: 'Weak' | 'Fair' | 'Moderate' | 'Strong' | 'Very Strong';
  color: string;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}
