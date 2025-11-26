import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, X, CheckCircle, AlertCircle } from 'lucide-react';
import { AdminAuth } from '../config/admin';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate a brief loading delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (AdminAuth.isAdminEmail(email)) {
      const sessionCreated = AdminAuth.createSession(email);
      if (sessionCreated) {
        setMessage({ type: 'success', text: 'Authentication successful!' });
        setTimeout(() => {
          onSuccess();
          onClose();
          setEmail('');
          setMessage(null);
        }, 1500);
      } else {
        setMessage({ type: 'error', text: 'Failed to create session. Please try again.' });
      }
    } else {
      setMessage({ 
        type: 'error', 
        text: 'Access denied. Only authorized admin can upload images. Please contact the administrator to upload your images.' 
      });
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setEmail('');
    setMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-[#1B1464] rounded-full p-3 mr-3">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1464]">Admin Access</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Enter your admin email to upload images to the gallery. Only authorized administrators can add new photos.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B1464] focus:border-transparent outline-none transition-all"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center p-3 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle size={20} className="mr-2 flex-shrink-0" />
              ) : (
                <AlertCircle size={20} className="mr-2 flex-shrink-0" />
              )}
              <span className="text-sm">{message.text}</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className="w-full bg-gradient-to-r from-[#1B1464] to-[#6B46C1] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Authenticating...
              </>
            ) : (
              'Authenticate & Upload'
            )}
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-800 mb-2">For Non-Admin Users:</h4>
          <p className="text-sm text-gray-600">
            If you have photos to share, please send them to the school administrator. 
            Only authorized personnel can upload images to maintain quality and appropriateness.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;