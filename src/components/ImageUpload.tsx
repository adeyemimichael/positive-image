import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageData: any) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ isOpen, onClose, onUpload }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus',
    description: '',
    file: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const categories = ['Campus', 'Facilities', 'Student Life', 'Sports', 'Events'];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }

      setFormData({ ...formData, file });
      setMessage(null);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      setMessage({ type: 'error', text: 'Please select an image to upload' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create image data object
      const imageData = {
        id: Date.now(), // Simple ID generation
        url: preview, // In real app, this would be the uploaded image URL
        title: formData.title,
        category: formData.category,
        description: formData.description,
        uploadDate: new Date().toISOString()
      };

      // Call the upload handler
      onUpload(imageData);

      setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      
      // Reset form after success
      setTimeout(() => {
        handleClose();
      }, 1500);

    } catch (error) {
      setMessage({ type: 'error', text: 'Upload failed. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      category: 'Campus',
      description: '',
      file: null
    });
    setPreview(null);
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
        className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-[#6FC1FF] rounded-full p-3 mr-3">
              <ImageIcon size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#1B1464]">Upload Image</h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="imageUpload"
                disabled={isUploading}
              />
              <label
                htmlFor="imageUpload"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#6FC1FF] rounded-lg cursor-pointer bg-[#6FC1FF]/5 hover:bg-[#6FC1FF]/10 transition-colors"
              >
                <Upload size={32} className="text-[#6FC1FF] mb-2" />
                <span className="text-sm text-gray-600 text-center">
                  Click to upload image<br />
                  <span className="text-xs text-gray-500">Max size: 5MB, Format: JPG, PNG</span>
                </span>
              </label>
            </div>
          </div>

          {/* Preview */}
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border-2 border-[#6FC1FF]"
              />
              <button
                type="button"
                onClick={() => {
                  setPreview(null);
                  setFormData({ ...formData, file: null });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter image title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B1464] focus:border-transparent outline-none transition-all"
              required
              disabled={isUploading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B1464] focus:border-transparent outline-none transition-all"
              required
              disabled={isUploading}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Enter image description (optional)"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B1464] focus:border-transparent outline-none transition-all resize-none"
              disabled={isUploading}
            />
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
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || !formData.file || !formData.title}
              className="flex-1 bg-gradient-to-r from-[#1B1464] to-[#6B46C1] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                'Upload Image'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ImageUpload;