// Admin configuration for gallery uploads
export const ADMIN_CONFIG = {
  // Set your admin email here - only this email can upload images
  ADMIN_EMAIL: 'admin@positiveimage.edu.ng', // Replace with your actual admin email
  
  // Session duration (in milliseconds) - 24 hours
  SESSION_DURATION: 24 * 60 * 60 * 1000,
  
  // Storage keys for local storage
  STORAGE_KEYS: {
    ADMIN_SESSION: 'admin_gallery_session',
    ADMIN_EMAIL: 'admin_email',
    SESSION_EXPIRY: 'admin_session_expiry'
  }
};

// Admin authentication functions
export const AdminAuth = {
  // Check if email is admin email
  isAdminEmail: (email: string): boolean => {
    return email.toLowerCase().trim() === ADMIN_CONFIG.ADMIN_EMAIL.toLowerCase().trim();
  },

  // Create admin session
  createSession: (email: string): boolean => {
    if (!AdminAuth.isAdminEmail(email)) {
      return false;
    }

    const expiryTime = Date.now() + ADMIN_CONFIG.SESSION_DURATION;
    
    localStorage.setItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION, 'true');
    localStorage.setItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_EMAIL, email);
    localStorage.setItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY, expiryTime.toString());
    
    return true;
  },

  // Check if current session is valid
  isValidSession: (): boolean => {
    const session = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION);
    const expiry = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
    const email = localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_EMAIL);

    if (!session || !expiry || !email) {
      return false;
    }

    const expiryTime = parseInt(expiry);
    const currentTime = Date.now();

    if (currentTime > expiryTime) {
      AdminAuth.clearSession();
      return false;
    }

    return AdminAuth.isAdminEmail(email);
  },

  // Clear admin session
  clearSession: (): void => {
    localStorage.removeItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_SESSION);
    localStorage.removeItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_EMAIL);
    localStorage.removeItem(ADMIN_CONFIG.STORAGE_KEYS.SESSION_EXPIRY);
  },

  // Get current admin email
  getCurrentAdminEmail: (): string | null => {
    if (AdminAuth.isValidSession()) {
      return localStorage.getItem(ADMIN_CONFIG.STORAGE_KEYS.ADMIN_EMAIL);
    }
    return null;
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