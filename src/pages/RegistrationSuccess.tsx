import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Download, Mail, Phone, Home, Calendar, Loader } from 'lucide-react';
import { generateReceiptPDF } from '../utils/pdfGenerator';

const RegistrationSuccess: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [registrationData, setRegistrationData] = useState<any>(location.state?.registrationData || null);
  const [paymentReference, setPaymentReference] = useState<string>(
    location.state?.paymentReference || searchParams.get('reference') || ''
  );
  const [isLoading, setIsLoading] = useState<boolean>(!location.state?.registrationData);

  useEffect(() => {
    const loadRegistrationInfo = async () => {
      if (registrationData) {
        setIsLoading(false);
        return;
      }

      const queryRef = searchParams.get('reference');
      const targetRef = queryRef || paymentReference;

      // 1. Try checking completedRegistration in localStorage
      const savedCompleted = localStorage.getItem('completedRegistration');
      if (savedCompleted) {
        try {
          const parsed = JSON.parse(savedCompleted);
          setRegistrationData(parsed);
          setPaymentReference(parsed.paymentReference || parsed.payment_reference || targetRef);
          setIsLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing completedRegistration:', e);
        }
      }

      // 2. Try checking Supabase by reference
      if (targetRef) {
        try {
          const { getStudentByPaymentReference } = await import('../services/studentService');
          const student = await getStudentByPaymentReference(targetRef);
          if (student) {
            setRegistrationData(student);
            setPaymentReference(targetRef);
            setIsLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error fetching student from Supabase:', e);
        }
      }

      // 3. Try checking pendingRegistration in localStorage
      const savedPending = localStorage.getItem('pendingRegistration');
      if (savedPending) {
        try {
          const parsed = JSON.parse(savedPending);
          setRegistrationData(parsed);
          setPaymentReference(parsed.paymentReference || parsed.payment_reference || targetRef);
          setIsLoading(false);
          return;
        } catch (e) {
          console.error('Error parsing pendingRegistration:', e);
        }
      }

      setIsLoading(false);
    };

    loadRegistrationInfo();
  }, [registrationData, paymentReference, searchParams]);

  const downloadReceipt = () => {
    if (!registrationData) return;
    generateReceiptPDF(registrationData, paymentReference);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader size={48} className="text-[#6FC1FF] mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-[#1B1464] mb-2">Loading Receipt...</h2>
          <p className="text-gray-600">Please wait while we retrieve your registration details.</p>
        </div>
      </div>
    );
  }

  if (!registrationData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Registration Data Found</h2>
          <p className="text-gray-600 mb-6">We couldn't find an active registration session.</p>
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

  // Normalized Property Extracts
  const fullName = registrationData.fullName || registrationData.full_name || 'N/A';
  const classApplyingFor = registrationData.classApplyingFor || registrationData.class_applying_for || 'N/A';
  const rawDob = registrationData.dateOfBirth || registrationData.date_of_birth;
  const dateOfBirth = rawDob ? new Date(rawDob).toLocaleDateString() : 'N/A';
  const gender = registrationData.gender || 'N/A';
  const campus = registrationData.campus || 'Main Campus';

  const fatherName = registrationData.fatherName || registrationData.father_name || 'N/A';
  const fatherPhone = registrationData.fatherPhone || registrationData.father_phone || 'N/A';
  const fatherEmail = registrationData.fatherEmail || registrationData.father_email || '';

  const motherName = registrationData.motherName || registrationData.mother_name || 'N/A';
  const motherPhone = registrationData.motherPhone || registrationData.mother_phone || 'N/A';
  const motherEmail = registrationData.motherEmail || registrationData.mother_email || '';

  const rawAmount = registrationData.paymentAmount || registrationData.payment_amount || registrationData.registrationFee || 0;
  const amountStr = typeof rawAmount === 'number' ? `₦${rawAmount.toLocaleString()}` : rawAmount;
  const refCode = paymentReference || registrationData.paymentReference || registrationData.payment_reference || 'N/A';

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
          <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={72} className="text-green-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">
            Registration Successful!
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! Your registration has been completed successfully. 
            Welcome to the Positive Image Schools family!
          </p>
        </motion.div>

        {/* Registration Details Card / Receipt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1B1464]">Registration Receipt</h2>
              <p className="text-sm text-gray-500">Positive Image Schools ({campus})</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
              Payment Completed
            </span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D6261D] border-b border-gray-200 pb-2">
                Student Information
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Full Name:</span>
                  <span className="font-semibold text-[#1B1464]">{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <span className="font-semibold text-[#1B1464]">{classApplyingFor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date of Birth:</span>
                  <span className="font-semibold text-[#1B1464]">{dateOfBirth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gender:</span>
                  <span className="font-semibold text-[#1B1464]">{gender}</span>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#D6261D] border-b border-gray-200 pb-2">
                Payment Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Reference:</span>
                  <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                    {refCode}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-bold text-green-600 text-base">
                    {amountStr}
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
                  <span className="text-green-600 font-semibold">
                    Confirmed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Parent Contact Information */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-[#D6261D] mb-4">Parent Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Father: <span className="font-semibold text-[#1B1464]">{fatherName}</span></p>
                <p className="text-gray-600">Phone: <span className="font-semibold text-[#1B1464]">{fatherPhone}</span></p>
                {fatherEmail && (
                  <p className="text-gray-600">Email: <span className="font-semibold text-[#1B1464]">{fatherEmail}</span></p>
                )}
              </div>
              <div>
                <p className="text-gray-600">Mother: <span className="font-semibold text-[#1B1464]">{motherName}</span></p>
                <p className="text-gray-600">Phone: <span className="font-semibold text-[#1B1464]">{motherPhone}</span></p>
                {motherEmail && (
                  <p className="text-gray-600">Email: <span className="font-semibold text-[#1B1464]">{motherEmail}</span></p>
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
          className="bg-gradient-to-r from-[#1B1464] to-[#D6261D] rounded-2xl p-8 text-white mb-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">What Happens Next?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">Email Confirmation</h3>
              <p className="text-xs text-white/90">
                You will receive a confirmation email with registration details.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">School Contact</h3>
              <p className="text-xs text-white/90">
                Our admissions team will contact you within 2-3 business days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-[#FFF4B2]" />
              </div>
              <h3 className="font-semibold mb-2">Orientation</h3>
              <p className="text-xs text-white/90">
                You will be invited to attend our new student orientation.
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
      </div>
    </div>
  );
};

export default RegistrationSuccess;