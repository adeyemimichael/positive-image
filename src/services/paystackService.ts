// Frontend service to interact with Paystack via backend functions
// This ensures the secret key stays secure on the backend

export interface PaymentData {
  email: string;
  amount: number;
  reference: string;
  metadata?: {
    studentName?: string;
    className?: string;
    campus?: string;
    registrationId?: string;
    [key: string]: any;
  };
}

export interface PaymentInitResponse {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface PaymentVerifyResponse {
  status: boolean;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    customer: {
      email: string;
    };
    metadata?: any;
  };
}

class PaystackService {
  private baseUrl: string;

  constructor() {
    // Use Vercel API routes
    this.baseUrl = '/api';
  }

  /**
   * Initialize a payment transaction
   */
  async initializePayment(paymentData: PaymentData): Promise<PaymentInitResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/initialize-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentData)
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Payment server error (${response.status}). Please check local API server or connection.`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to initialize payment');
      }

      return data;
    } catch (error: any) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyPayment(reference: string): Promise<PaymentVerifyResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/verify-payment?reference=${reference}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error(`Verification server error (${response.status}).`);
      }

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to verify payment');
      }

      return data;
    } catch (error: any) {
      console.error('Payment verification error:', error);
      throw error;
    }
  }

  /**
   * Generate a unique payment reference
   */
  generateReference(prefix: string = 'PIS'): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  }
}

export const paystackService = new PaystackService();
