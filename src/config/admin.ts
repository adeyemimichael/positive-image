// Simple hash function for password verification
// Note: For production, consider using a proper backend authentication system
const simpleHash = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

// Admin configuration for gallery uploads
export const ADMIN_CONFIG = {
  // Admin password
  // Set VITE_ADMIN_PASSWORD in your .env file
  ADMIN_PASSWORD: import.meta.env.VITE_ADMIN_PASSWORD || 'adminadmin',
  
  // Session duration (in milliseconds) - 2 hours
  SESSION_DURATION: 2 * 60 * 60 * 1000,
  
  // Storage keys for local storage
  STORAGE_KEYS: {
    ADMIN_SESSION: 'admin_gallery_session',
    SESSION_EXPIRY: 'admin_session_expiry'
  }
};

// Admin authentication functions
export const AdminAuth = {
  // Check if password is correct
  isValidPassword: (password: string): boolean => {
    return password === ADMIN_CONFIG.ADMIN_PASSWORD;
  },

  // Create admin session
  createSession: (password: string): boolean => {
    if (!AdminAuth.isValidPassword(password)) {
      return false;
    }

    const expiryTime = Date.now() + ADMIN_CONFIG.SESSION_DURATION;
    
    localStorage.setItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION, 'true');
    localStorage.setItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY, expiryTime.toString());
    
    return true;
  },

  // Check if current session is valid
  isValidSession: (): boolean => {
    const session = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION);
    const expiry = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);

    if (!session || !expiry) {
      return false;
    }

    const expiryTime = parseInt(expiry);
    const currentTime = Date.now();

    if (currentTime > expiryTime) {
      AdminAuth.clearSession();
      return false;
    }

    return true;
  },

  // Clear admin session
  clearSession: (): void => {
    localStorage.removeItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION);
    localStorage.removeItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
  },

  // Get session time remaining (in minutes)
  getSessionTimeRemaining: (): number => {
    const expiry = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
    if (!expiry) return 0;

    const expiryTime = parseInt(expiry);
    const currentTime = Date.now();
    const timeRemaining = expiryTime - currentTime;

    return Math.max(0, Math.floor(timeRemaining / (1000 * 60))); // Convert to minutes
  }
};