import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { paystackService } from '../services/paystackService';

const PaymentCallback: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [message, setMessage] = useState('Verifying your payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');
      
      if (!reference) {
        setStatus('failed');
        setMessage('No payment reference found');
        return;
      }

      try {
        // Verify payment with backend
        const response = await paystackService.verifyPayment(reference);

        if (response.status && response.data?.status === 'success') {
          // Payment successful
          setStatus('success');
          setMessage('Payment verified successfully!');

          // Get registration data from localStorage
          const pendingRegistration = localStorage.getItem('pendingRegistration');
          
          if (pendingRegistration) {
            const registrationData = JSON.parse(pendingRegistration);
            
            // Update with payment info
            const completedRegistration = {
              ...registrationData,
              paymentReference: reference,
              paymentStatus: 'completed',
              paymentMethod: 'paystack',
              paymentDate: response.data.paid_at,
              paymentAmount: response.data.amount / 100, // Convert from kobo
              paystackData: response.data
            };

            // Store completed registration
            localStorage.setItem('completedRegistration', JSON.stringify(completedRegistration));
            localStorage.removeItem('pendingRegistration');

            // Redirect to success page immediately
            navigate('/registration-success', {
              state: {
                registrationData: completedRegistration,
                paymentReference: reference
              }
            });
          }
        } else {
          setStatus('failed');
          setMessage('Payment verification failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Failed to verify payment. Please contact support.');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
      >
        {status === 'verifying' && (
          <>
            <Loader size={64} className="text-[#6FC1FF] mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-[#1B1464] mb-2">Verifying Payment</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <p className="text-sm text-gray-500">Redirecting to confirmation page...</p>
          </>
        )}

        {status === 'failed' && (
          <>
            <XCircle size={64} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => navigate('/payment')}
                className="px-6 py-3 bg-[#D6261D] text-white rounded-2xl font-semibold hover:bg-[#D6261D]/90 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default PaymentCallback;
