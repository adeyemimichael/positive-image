import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Copy, Clock, AlertCircle, ArrowLeft } from 'lucide-react';

interface PaymentProps {
  registrationData?: any;
  fee?: number;
  studentName?: string;
  className?: string;
}

const Payment: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'completed' | 'failed'>('pending');
  const [paymentReference, setPaymentReference] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const { registrationData, fee, studentName, className } = location.state as PaymentProps || {};

  useEffect(() => {
    // Generate payment reference
    const reference = `PIS${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    setPaymentReference(reference);

    // If no registration data, redirect back to registration
    if (!registrationData) {
      navigate('/register');
    }
  }, [registrationData, navigate]);

  const bankDetails = {
    bankName: 'First Bank of Nigeria',
    accountName: 'Positive Image Schools',
    accountNumber: '2034567890',
    sortCode: '011'
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePaymentConfirmation = async () => {
    setIsSubmitting(true);
    
    // Simulate payment verification process
    setTimeout(async () => {
      try {
        // In a real application, you would verify the payment with your payment processor
        // For now, we'll simulate a successful payment
        
        const completedRegistration = {
          ...registrationData,
          paymentReference,
          paymentStatus: 'completed',
          paymentDate: new Date().toISOString(),
          paymentAmount: fee
        };

        // Store completed registration
        localStorage.setItem('completedRegistration', JSON.stringify(completedRegistration));
        localStorage.removeItem('pendingRegistration');

        // Send email notifications (simulated)
        await sendEmailNotifications(completedRegistration);

        setPaymentStatus('completed');
        setIsSubmitting(false);

        // Redirect to success page after 3 seconds
        setTimeout(() => {
          navigate('/registration-success', { 
            state: { 
              registrationData: completedRegistration,
              paymentReference 
            } 
          });
        }, 3000);

      } catch (error) {
        setPaymentStatus('failed');
        setIsSubmitting(false);
      }
    }, 2000);
  };

  const sendEmailNotifications = async (registrationData: any) => {
    // Simulate email sending
    console.log('Sending email to parent:', registrationData.fatherEmail || registrationData.motherEmail);
    console.log('Sending email to school admin:', 'admin@positiveimage.edu.ng');
    
    // In a real application, you would integrate with an email service like:
    // - EmailJS
    // - SendGrid
    // - Nodemailer (if you have a backend)
    // - Resend
    
    return new Promise(resolve => setTimeout(resolve, 1000));
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Registration Data Found</h2>
          <p className="text-gray-600 mb-4">Please complete the registration form first.</p>
          <button
            onClick={() => navigate('/register')}
            className="bg-[#1B1464] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1B1464]/90 transition-colors"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#1B1464] mb-4">Complete Your Registration</h1>
          <p className="text-lg text-gray-600">Make your payment to finalize the registration process</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Registration Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-[#1B1464] mb-6">Registration Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Student Name:</span>
                <span className="font-semibold text-[#1B1464]">{studentName}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Class:</span>
                <span className="font-semibold text-[#1B1464]">{className}</span>
              </div>
              
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="font-medium text-gray-700">Registration Fee:</span>
                <span className="font-bold text-2xl text-[#D6261D]">₦{fee?.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <span className="font-medium text-gray-700">Payment Reference:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{paymentReference}</span>
                  <button
                    onClick={() => copyToClipboard(paymentReference)}
                    className="text-[#6FC1FF] hover:text-[#6FC1FF]/80 transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-[#FFF4B2]/30 rounded-lg">
              <h3 className="font-semibold text-[#1B1464] mb-2">Important Note:</h3>
              <p className="text-sm text-gray-700">
                Please use the payment reference above when making your transfer. 
                This helps us identify your payment quickly.
              </p>
            </div>
          </motion.div>

          {/* Payment Instructions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-[#1B1464] mb-6">Payment Instructions</h2>
            
            <div className="space-y-6">
              {/* Bank Transfer Details */}
              <div className="bg-[#1B1464] rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4">Bank Transfer Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Bank Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{bankDetails.bankName}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.bankName)}
                        className="text-[#FFF4B2] hover:text-white transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Account Name:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{bankDetails.accountName}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountName)}
                        className="text-[#FFF4B2] hover:text-white transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Account Number:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-lg">{bankDetails.accountNumber}</span>
                      <button
                        onClick={() => copyToClipboard(bankDetails.accountNumber)}
                        className="text-[#FFF4B2] hover:text-white transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Amount:</span>
                    <span className="font-bold text-xl text-[#FFF4B2]">₦{fee?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Steps */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#1B1464]">Payment Steps:</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-[#6FC1FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <p className="text-gray-700">Transfer the exact amount to the account details above</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="bg-[#6FC1FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <p className="text-gray-700">Use the payment reference as your transfer description</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="bg-[#6FC1FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <p className="text-gray-700">Click "I have made the payment" button below</p>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="bg-[#6FC1FF] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <p className="text-gray-700">Wait for payment verification and confirmation email</p>
                  </div>
                </div>
              </div>

              {copied && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                  Copied to clipboard!
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Payment Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center"
        >
          {paymentStatus === 'pending' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <Clock size={48} className="text-[#6FC1FF] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1B1464] mb-4">Waiting for Payment</h3>
              <p className="text-gray-600 mb-6">
                Please make the transfer using the details above, then click the button below to confirm.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/register')}
                  className="flex items-center justify-center px-6 py-3 border-2 border-[#1B1464] text-[#1B1464] rounded-full font-semibold hover:bg-[#1B1464] hover:text-white transition-colors"
                >
                  <ArrowLeft size={20} className="mr-2" />
                  Back to Registration
                </button>
                
                <button
                  onClick={handlePaymentConfirmation}
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-[#D6261D] text-white rounded-full font-semibold hover:bg-[#D6261D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Verifying Payment...' : 'I have made the payment'}
                </button>
              </div>
            </div>
          )}

          {paymentStatus === 'completed' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-600 mb-4">Payment Successful!</h3>
              <p className="text-gray-600 mb-4">
                Your registration has been completed successfully. You will receive a confirmation email shortly.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to confirmation page...
              </p>
            </div>
          )}

          {paymentStatus === 'failed' && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-600 mb-4">Payment Verification Failed</h3>
              <p className="text-gray-600 mb-6">
                We couldn't verify your payment. Please ensure you've made the transfer and try again.
              </p>
              <button
                onClick={() => setPaymentStatus('pending')}
                className="px-6 py-3 bg-[#D6261D] text-white rounded-full font-semibold hover:bg-[#D6261D]/90 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;