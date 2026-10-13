export type ThemeMode = 'dark' | 'light';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  duration?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  timestamp: string;
  errorCode?: string;
}
