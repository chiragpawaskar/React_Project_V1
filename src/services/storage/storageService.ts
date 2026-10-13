/**
 * Enterprise Safe Local & Session Storage Service
 * Handles serialization, exceptions in restricted environments, and quota errors.
 */

class StorageService {
  private isAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      const storage = window[type];
      const testKey = '__storage_test__';
      storage.setItem(testKey, testKey);
      storage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  public getItem<T>(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): T | null {
    if (!this.isAvailable(storageType)) return null;

    try {
      const item = window[storageType].getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[StorageService] Failed to retrieve item for key: ${key}`, error);
      return null;
    }
  }

  public setItem<T>(key: string, value: T, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): boolean {
    if (!this.isAvailable(storageType)) return false;

    try {
      window[storageType].setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`[StorageService] Failed to save item for key: ${key}`, error);
      return false;
    }
  }

  public removeItem(key: string, storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    if (!this.isAvailable(storageType)) return;
    try {
      window[storageType].removeItem(key);
    } catch (error) {
      console.warn(`[StorageService] Failed to remove item for key: ${key}`, error);
    }
  }

  public clear(storageType: 'localStorage' | 'sessionStorage' = 'localStorage'): void {
    if (!this.isAvailable(storageType)) return;
    try {
      window[storageType].clear();
    } catch (error) {
      console.warn(`[StorageService] Failed to clear storage`, error);
    }
  }
}

export const storageService = new StorageService();
