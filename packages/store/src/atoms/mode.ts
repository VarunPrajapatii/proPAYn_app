
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Helper function to get system theme preference
const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return false; // Default to light on server
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Enhanced storage implementation with better error handling and consistency
const themeStorage = {
  getItem: (key: string): boolean => {
    if (typeof window === 'undefined') return false; // Server-side default to light
    
    try {
      const stored = localStorage.getItem(key);
      if (stored === null) {
        // First time - use system preference
        const systemDark = getSystemTheme();
        localStorage.setItem(key, systemDark ? 'dark' : 'light');
        return systemDark;
      }
      return stored === 'dark';
    } catch (error) {
      console.warn('Error reading theme from localStorage:', error);
      return getSystemTheme();
    }
  },
  setItem: (key: string, value: boolean): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, value ? 'dark' : 'light');
      // Immediately apply theme to document
      if (value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Error removing theme from localStorage:', error);
    }
  }
};

// Atom with localStorage persistence and system theme detection
export const modeAtom = atomWithStorage<boolean>('theme-mode', false, themeStorage);

// Derived atom to ensure DOM synchronization
export const themeSyncAtom = atom(
  (get) => get(modeAtom),
  (get, set, newValue: boolean) => {
    set(modeAtom, newValue);
    // Ensure DOM is updated immediately
    if (typeof window !== 'undefined') {
      if (newValue) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
);