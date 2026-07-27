import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Trash2, FolderUp } from 'lucide-react';

interface ImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (imageData: any) => void;
  initialData?: any;
}

interface FileWithPreview {
  file: File;
  preview: string;
  title: string;
  category: string;
  description: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ isOpen, onClose, onUpload, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Campus',
    description: '',
    file: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Bulk upload states
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });

  const categories = ['Campus', 'Facilities', 'Student Life', 'Sports', 'Events'];

  // Populate form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        category: initialData.category || 'Campus',
        description: initialData.description || '',
        file: null
      });
      setPreview(initialData.image_url || initialData.url || null);
      setBulkMode(false);
    } else {
      handleReset();
    }
  }, [initialData, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please select an image file' });
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'File size must be less than 5MB' });
        return;
      }

      setFormData({ ...formData, file });
      setMessage(null);

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBulkFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: FileWithPreview[] = [];
    const invalidFiles: string[] = [];

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(`${file.name} - not an image`);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        invalidFiles.push(`${file.name} - exceeds 5MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        validFiles.push({
          file,
          preview: e.target?.result as string,
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          category: 'Campus',
          description: ''
        });

        // Update state when all files are loaded
        if (validFiles.length + invalidFiles.length === files.length) {
          setSelectedFiles(prev => [...prev, ...validFiles]);
          if (invalidFiles.length > 0) {
            setMessage({ 
              type: 'error', 
              text: `${invalidFiles.length} file(s) skipped: ${invalidFiles.slice(0, 2).join(', ')}${invalidFiles.length > 2 ? '...' : ''}` 
            });
          } else {
            setMessage({ type: 'success', text: `${validFiles.length} image(s) added successfully` });
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveBulkFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBulkFile = (index: number, field: keyof FileWithPreview, value: string) => {
    setSelectedFiles(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (bulkMode) {
      // Handle bulk upload
      if (selectedFiles.length === 0) {
        setMessage({ type: 'error', text: 'Please select at least one image' });
        return;
      }

      setIsUploading(true);
      setMessage(null);
      setUploadProgress({ current: 0, total: selectedFiles.length });

      const { uploadGalleryImage, createGalleryImage } = await import('../services/galleryService');
      let successCount = 0;
      let failCount = 0;

      for (let i = 0; i < selectedFiles.length; i++) {
        const fileData = selectedFiles[i];
        try {
          const imageUrl = await uploadGalleryImage(fileData.file);
          await createGalleryImage({
            title: fileData.title,
            category: fileData.category,
            description: fileData.description,
            image_url: imageUrl,
            status: 'active'
          });
          successCount++;
          setUploadProgress({ current: i + 1, total: selectedFiles.length });
        } catch (error) {
          console.error(`Failed to upload ${fileData.file.name}:`, error);
          failCount++;
        }
      }

      setIsUploading(false);
      
      if (failCount === 0) {
        setMessage({ type: 'success', text: `All ${successCount} images uploaded successfully!` });
      } else {
        setMessage({ 
          type: 'error', 
          text: `${successCount} succeeded, ${failCount} failed. Check console for details.` 
        });
      }

      setTimeout(() => {
        onUpload(null); // Trigger refresh
        handleClose();
      }, 2000);
      return;
    }

    // Single upload (existing functionality)
    if (!initialData && !formData.file && !preview) {
      setMessage({ type: 'error', text: 'Please select an image' });
      return;
    }

    setIsUploading(true);
    setMessage(null);

    try {
      const { uploadGalleryImage, createGalleryImage, updateGalleryImage } = await import('../services/galleryService');
      
      let imageUrl = preview || '';
      if (formData.file) {
        imageUrl = await uploadGalleryImage(formData.file);
      }

      if (initialData) {
        // Edit mode
        const updated = await updateGalleryImage(initialData.id, {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          image_url: imageUrl
        });
        onUpload(updated);
        setMessage({ type: 'success', text: 'Image updated successfully!' });
      } else {
        // Create mode
        const newImage = await createGalleryImage({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          image_url: imageUrl,
          status: 'active'
        });
        onUpload(newImage);
        setMessage({ type: 'success', text: 'Image uploaded successfully!' });
      }

      setTimeout(() => {
        handleClose();
      }, 1200);

    } catch (error) {
      console.error('Save error:', error);
      setMessage({ type: 'error', text: 'Failed to save image. Please try again.' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: 'Campus',
      description: '',
      file: null
    });
    setPreview(null);
    setMessage(null);
    setBulkMode(false);
    setSelectedFiles([]);
    setUploadProgress({ current: 0, total: 0 });
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
    setBulkMode(false);
    setSelectedFiles([]);
    setUploadProgress({ current: 0, total: 0 });
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
            <h2 className="text-2xl font-bold text-[#1B1464]">
              {initialData ? 'Edit Gallery Image' : bulkMode ? 'Bulk Upload Images' : 'Upload Image'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Upload Mode Toggle (only for new uploads) */}
        {!initialData && (
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => {
                setBulkMode(false);
                setSelectedFiles([]);
                setMessage(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                !bulkMode
                  ? 'bg-[#1B1464] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={isUploading}
            >
              <Upload size={18} className="inline mr-2" />
              Single Upload
            </button>
            <button
              type="button"
              onClick={() => {
                setBulkMode(true);
                setPreview(null);
                setFormData({ ...formData, file: null });
                setMessage(null);
              }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                bulkMode
                  ? 'bg-[#1B1464] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              disabled={isUploading}
            >
              <FolderUp size={18} className="inline mr-2" />
              Bulk Upload
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bulk Upload Mode */}
          {bulkMode ? (
            <>
              {/* Bulk File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Multiple Images
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleBulkFileChange}
                    className="hidden"
                    id="bulkImageUpload"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="bulkImageUpload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#6FC1FF] rounded-lg cursor-pointer bg-[#6FC1FF]/5 hover:bg-[#6FC1FF]/10 transition-colors"
                  >
                    <FolderUp size={32} className="text-[#6FC1FF] mb-2" />
                    <span className="text-sm text-gray-600 text-center">
                      Click to select multiple images<br />
                      <span className="text-xs text-gray-500">Max size per file: 5MB, Format: JPG, PNG</span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Selected Files List */}
              {selectedFiles.length > 0 && (
                <div className="max-h-96 overflow-y-auto space-y-4 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2 pb-2 border-b">
                    <h3 className="font-semibold text-[#1B1464]">
                      Selected Images ({selectedFiles.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => setSelectedFiles([])}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                      disabled={isUploading}
                    >
                      Clear All
                    </button>
                  </div>
                  
                  {selectedFiles.map((fileData, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                      <div className="flex gap-3">
                        <img
                          src={fileData.preview}
                          alt={fileData.title}
                          className="w-20 h-20 object-cover rounded border border-gray-300"
                        />
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={fileData.title}
                            onChange={(e) => handleUpdateBulkFile(index, 'title', e.target.value)}
                            placeholder="Image title"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#1B1464] focus:border-transparent outline-none"
                            disabled={isUploading}
                          />
                          <div className="flex gap-2">
                            <select
                              value={fileData.category}
                              onChange={(e) => handleUpdateBulkFile(index, 'category', e.target.value)}
                              className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#1B1464] focus:border-transparent outline-none"
                              disabled={isUploading}
                            >
                              {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                              ))}
                            </select>
                            <button
                              type="button"
                              onClick={() => handleRemoveBulkFile(index)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                              disabled={isUploading}
                              title="Remove"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <input
                            type="text"
                            value={fileData.description}
                            onChange={(e) => handleUpdateBulkFile(index, 'description', e.target.value)}
                            placeholder="Description (optional)"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-[#1B1464] focus:border-transparent outline-none"
                            disabled={isUploading}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && uploadProgress.total > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">
                      Uploading images...
                    </span>
                    <span className="text-sm text-blue-700">
                      {uploadProgress.current} / {uploadProgress.total}
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-[#1B1464] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Single Upload Mode (existing) */
            <>
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Image {initialData && '(Leave unchanged to keep existing image)'}
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
                      Click to upload new image<br />
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
            </>
          )}

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
              disabled={
                isUploading || 
                (bulkMode 
                  ? selectedFiles.length === 0 
                  : (!initialData && !formData.file && !preview) || !formData.title
                )
              }
              className="flex-1 bg-gradient-to-r from-[#1B1464] to-[#6B46C1] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {bulkMode 
                    ? `Uploading ${uploadProgress.current}/${uploadProgress.total}...`
                    : initialData 
                      ? 'Saving Changes...' 
                      : 'Uploading...'
                  }
                </>
              ) : (
                bulkMode 
                  ? `Upload ${selectedFiles.length} Image${selectedFiles.length !== 1 ? 's' : ''}`
                  : initialData 
                    ? 'Update Image' 
                    : 'Upload Image'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ImageUpload;