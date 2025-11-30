// Paystack configuration
// Only the public key is stored here - secret key stays on backend

export const PAYSTACK_CONFIG = {
  // Get your public key from https://dashboard.paystack.com/#/settings/developers
  PUBLIC_KEY: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx',
  
  // Currency
  CURRENCY: 'NGN',
  
  // Payment channels to accept
  CHANNELS: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
  
  // Callback URL (where Paystack redirects after payment)
  CALLBACK_URL: import.meta.env.VITE_APP_URL 
    ? `${import.meta.env.VITE_APP_URL}/payment-callback`
    : 'http://localhost:5173/payment-callback',
};

// Helper to format amount for display
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0
  }).format(amount);
};
