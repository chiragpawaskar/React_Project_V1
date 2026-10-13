import type { FormValidationErrors, LoginCredentials, PasswordStrengthResult } from '@/types';

export const authValidators = {
  validateUsername(username: string): string | undefined {
    if (!username || !username.trim()) {
      return 'Username is required';
    }
    const trimmed = username.trim();
    if (trimmed.length < 3) {
      return 'Username must be at least 3 characters long';
    }
    if (trimmed.length > 30) {
      return 'Username cannot exceed 30 characters';
    }
    const usernameRegex = /^[a-zA-Z0-9_.-]+$/;
    if (!usernameRegex.test(trimmed)) {
      return 'Username can only contain letters, numbers, dots, hyphens, and underscores';
    }
    return undefined;
  },

  validateEmail(email: string): string | undefined {
    if (!email || !email.trim()) {
      return 'Corporate email address is required';
    }
    const trimmed = email.trim();
    // RFC 5322 compliant regex for enterprise email addresses
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid business email address (e.g., alex@company.com)';
    }
    return undefined;
  },

  validatePassword(password: string): string | undefined {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 8) {
      return 'Password must contain at least 8 characters';
    }
    return undefined;
  },

  validateCaptcha(userInput: string, expectedCode: string): string | undefined {
    if (!userInput || !userInput.trim()) {
      return 'Security captcha code is required';
    }
    if (userInput.trim().toUpperCase() !== expectedCode.trim().toUpperCase()) {
      return 'Incorrect captcha code. Please try again';
    }
    return undefined;
  },

  evaluatePasswordStrength(password: string): PasswordStrengthResult {
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

    const checksPassed = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;

    let score = 0;
    if (password.length > 0) {
      if (checksPassed <= 2) score = 1;
      else if (checksPassed === 3) score = 2;
      else if (checksPassed === 4) score = 3;
      else if (checksPassed === 5 && password.length >= 10) score = 4;
      else score = 3;
    }

    const labels: Array<PasswordStrengthResult['label']> = ['Weak', 'Weak', 'Fair', 'Moderate', 'Strong'];
    const colors = ['#64748b', '#f43f5e', '#f59e0b', '#06b6d4', '#10b981'];

    return {
      score,
      label: labels[score],
      color: colors[score],
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar,
    };
  },

  validateLoginForm(credentials: LoginCredentials, expectedCaptchaCode: string): FormValidationErrors {
    const errors: FormValidationErrors = {};

    const usernameError = this.validateUsername(credentials.username);
    if (usernameError) errors.username = usernameError;

    const emailError = this.validateEmail(credentials.email);
    if (emailError) errors.email = emailError;

    const passwordError = this.validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    const captchaError = this.validateCaptcha(credentials.captchaAnswer, expectedCaptchaCode);
    if (captchaError) errors.captchaAnswer = captchaError;

    return errors;
  },
};
