import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Bell, CheckCircle, AlertCircle } from 'lucide-react';

interface AnnouncementUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (announcementData: any) => void;
  initialData?: any;
}

const AnnouncementUpload: React.FC<AnnouncementUploadProps> = ({ isOpen, onClose, onUpload, initialData }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Academic');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('normal');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Populate form when initialData changes (Edit Mode)
  React.useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setCategory(initialData.category || 'Academic');
      setDescription(initialData.description || '');
      setPriority(initialData.priority || 'normal');
      setPreview(initialData.image_url || initialData.imageUrl || null);
    } else {
      resetForm();
    }
  }, [initialData, isOpen]);

  const categories = ['Academic', 'Event', 'Notice', 'Achievement', 'General'];
  const priorities = [
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600' },
    { value: 'info', label: 'Info', color: 'text-gray-600' }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }

      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setMessage(null);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title.trim()) {
      setMessage({ type: 'error', text: 'Please enter a title' });
      return;
    }
    
    if (!description.trim()) {
      setMessage({ type: 'error', text: 'Please enter a description' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      // Create announcement data
      const announcementData = {
        id: Date.now(),
        title: title.trim(),
        category,
        description: description.trim(),
        priority,
        imageUrl: preview, // For now, use base64. Will be replaced with Supabase URL later
        imageFile, // Include file for Supabase upload
        uploadDate: new Date().toISOString(),
        status: 'active'
      };

      // Call parent handler
      await onUpload(announcementData);

      // Success
      setMessage({ type: 'success', text: 'Announcement uploaded successfully!' });
      
      // Reset form after short delay
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Failed to upload announcement. Please try again.' });
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setCategory('Academic');
    setDescription('');
    setPriority('normal');
    setImageFile(null);
    setPreview(null);
    setIsUploading(false);
    setMessage(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-[#1B1464] to-[#D6261D] text-white p-6 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={24} />
              <h2 className="text-2xl font-bold">{initialData ? 'Edit Announcement' : 'Upload Announcement'}</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              disabled={isUploading}
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Message */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg flex items-center gap-3 ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-800 border border-green-200'
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <p className="flex-1">{message.text}</p>
              </motion.div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Second Term Registration Now Open!"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent"
                disabled={isUploading}
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent"
                disabled={isUploading}
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter the full announcement details..."
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B1464] focus:border-transparent resize-none"
                disabled={isUploading}
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                {description.length} characters
              </p>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Priority <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-3">
                {priorities.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setPriority(p.value)}
                    className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                      priority === p.value
                        ? 'border-[#1B1464] bg-[#1B1464] text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    disabled={isUploading}
                  >
                    <span className={priority === p.value ? 'text-white' : p.color}>
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Image (Optional)
              </label>
              {!preview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#1B1464] hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload size={40} className="text-gray-400 mb-3" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={isUploading}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                    disabled={isUploading}
                  >
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                disabled={isUploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#1B1464] to-[#D6261D] text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {initialData ? 'Saving Changes...' : 'Uploading...'}
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    {initialData ? 'Update Announcement' : 'Upload Announcement'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AnnouncementUpload;
