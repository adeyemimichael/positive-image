import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone, Home, Calendar } from 'lucide-react';
import { generateReceiptPDF } from '../utils/pdfGenerator';

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { registrationData, paymentReference } = location.state || {};

  useEffect(() => {
    // If no registration data, redirect to home
    if (!registrationData) {
      navigate('/');
    }
  }, [registrationData, navigate]);

  const downloadReceipt = () => {
    if (!registrationData || !paymentReference) return;
    
    // Generate PDF receipt
    generateReceiptPDF(
      registrationData.fullName,
      paymentReference,
      `₦${registrationData.paymentAmount?.toLocaleString()}`,
      new Date().toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      }),
      'Online Payment (Paystack)',
      registrationData.classApplyingFor,
      registrationData.guardianName || 'N/A',
      registrationData.guardianPhone || 'N/A'
    );
  };

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Registration Data Found</h2>
          <button
            onClick={() => navigate('/')}
            className="bg-[#1B1464] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1B1464]/90 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-[#6FC1FF]/10 pt-32 pb-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={80} className="text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your registration has been completed successfully. 
            Welcome to the Positive Image Schools family!
          </p>
        </motion.div>

        {/* Registration Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-[#1B1464] mb-6 text-center">Registration Details</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D6261D] border-b border-gray-200 pb-2">
                Student Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-semibold text-[#1B1464]">{registrationData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold text-[#1B1464]">{registrationData.classApplyingFor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="font-semibold text-[#1B1464]">
                    {new Date(registrationData.dateOfBirth).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold text-[#1B1464]">{registrationData.gender}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D6261D] border-b border-gray-200 pb-2">
                Payment Information
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Reference:</span>
                  <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    {paymentReference}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-bold text-green-600 text-lg">
                    ₦{registrationData.paymentAmount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Date:</span>
                  <span className="font-semibold text-[#1B1464]">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Contact Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#D6261D] mb-4">Parent Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Father: <span className="font-semibold text-[#1B1464]">{registrationData.fatherName}</span></p>
                <p className="text-gray-600">Phone: <span className="font-semibold text-[#1B1464]">{registrationData.fatherPhone}</span></p>
                {registrationData.fatherEmail && (
                  <p className="text-gray-600">Email: <span className="font-semibold text-[#1B1464]">{registrationData.fatherEmail}</span></p>
                )}
              </div>
              <div>
                <p className="text-gray-600">Mother: <span className="font-semibold text-[#1B1464]">{registrationData.motherName}</span></p>
                <p className="text-gray-600">Phone: <span className="font-semibold text-[#1B1464]">{registrationData.motherPhone}</span></p>
                {registrationData.motherEmail && (
                  <p className="text-gray-600">Email: <span className="font-semibold text-[#1B1464]">{registrationData.motherEmail}</span></p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#1B1464] to-[#D6261D] rounded-2xl p-8 text-white mb-8"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">Email Confirmation</h3>
              <p className="text-sm text-white/90">
                You'll receive a confirmation email with all registration details within 24 hours.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">School Contact</h3>
              <p className="text-sm text-white/90">
                Our admissions team will contact you within 2-3 business days to discuss next steps.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar size={32} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">Orientation</h3>
              <p className="text-sm text-white/90">
                You'll be invited to attend our new student orientation program.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={downloadReceipt}
            className="flex items-center justify-center px-6 py-3 bg-[#6FC1FF] text-white rounded-full font-semibold hover:bg-[#6FC1FF]/90 transition-colors shadow-lg"
          >
            <Download size={20} className="mr-2" />
            Download Receipt
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center px-6 py-3 bg-white text-[#1B1464] border-2 border-[#1B1464] rounded-full font-semibold hover:bg-[#1B1464] hover:text-white transition-colors"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </button>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center bg-white rounded-2xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-[#1B1464] mb-4">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            If you have any questions about your registration, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <div className="flex items-center justify-center">
              <Mail size={16} className="text-[#6FC1FF] mr-2" />
              <span>info@positiveimage.edu.ng</span>
            </div>
            <div className="flex items-center justify-center">
              <Phone size={16} className="text-[#6FC1FF] mr-2" />
              <span>+234 803 123 4567</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;