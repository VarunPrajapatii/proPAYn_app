
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// Helper function to get system theme preference
const getSystemTheme = (): boolean => {
  if (typeof window === 'undefined') return true; // Default to dark on server
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

// Custom storage implementation for theme persistence
const themeStorage = {
  getItem: (key: string): boolean => {
    if (typeof window === 'undefined') return true; // Server-side default to dark
    
    const stored = localStorage.getItem(key);
    if (stored === null) {
      // First time - use system preference
      const systemDark = getSystemTheme();
      localStorage.setItem(key, systemDark ? 'dark' : 'light');
      return systemDark;
    }
    return stored === 'dark';
  },
  setItem: (key: string, value: boolean): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value ? 'dark' : 'light');
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }
};

// Atom with localStorage persistence and system theme detection
export const modeAtom = atomWithStorage<boolean>('theme-mode', true, themeStorage);