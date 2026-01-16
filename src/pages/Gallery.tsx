import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight, Upload, LogOut, Clock, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import ImageUpload from '../components/ImageUpload';
import { AdminAuth } from '../config/admin';

interface GalleryImage {
  id: number;
  url: string;
  title: string;
  category: string;
  description: string;
  uploadDate?: string;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Check admin authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAuth = AdminAuth.isValidSession();
      setIsAdminAuthenticated(isAuth);
      if (isAuth) {
        setSessionTimeRemaining(AdminAuth.getSessionTimeRemaining());
      }
    };

    checkAuth();
    
    // Check every minute for session expiry
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load images from localStorage or use default images
  useEffect(() => {
    const savedImages = localStorage.getItem('gallery_images');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setImages([...defaultGalleryImages, ...parsedImages]);
      } catch (error) {
        console.error('Error loading saved images:', error);
        setImages(defaultGalleryImages);
      }
    } else {
      setImages(defaultGalleryImages);
    }
  }, []);

  const defaultGalleryImages: GalleryImage[] = [
    {
      id: 1,
      url: 'https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Main Campus Building',
      category: 'Campus',
      description: 'Our modern main building houses administrative offices and senior classrooms'
    },
    {
      id: 2,
      url: 'https://images.pexels.com/photos/8617960/pexels-photo-8617960.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'State-of-the-art Library',
      category: 'Facilities',
      description: 'A quiet space for learning with thousands of books and digital resources'
    },
    {
      id: 3,
      url: 'https://images.pexels.com/photos/8617914/pexels-photo-8617914.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Science Laboratory',
      category: 'Facilities',
      description: 'Fully equipped labs for physics, chemistry, and biology experiments'
    },
    {
      id: 4,
      url: 'https://images.pexels.com/photos/8617477/pexels-photo-8617477.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Sports Complex',
      category: 'Sports',
      description: 'Modern sports facilities including football field and basketball court'
    },
    {
      id: 5,
      url: 'https://images.pexels.com/photos/8617704/pexels-photo-8617704.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Modern Classrooms',
      category: 'Campus',
      description: 'Bright, spacious classrooms equipped with modern teaching aids'
    },
    {
      id: 6,
      url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Student Activities',
      category: 'Student Life',
      description: 'Students engaged in various educational and recreational activities'
    },
    {
      id: 7,
      url: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Computer Laboratory',
      category: 'Facilities',
      description: 'Modern computer lab with high-speed internet and latest software'
    },
    {
      id: 8,
      url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Art & Creativity Center',
      category: 'Facilities',
      description: 'Dedicated space for artistic expression and creative learning'
    },
    {
      id: 9,
      url: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'School Assembly',
      category: 'Student Life',
      description: 'Daily morning assembly fostering unity and school spirit'
    },
    {
      id: 10,
      url: 'https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Graduation Ceremony',
      category: 'Events',
      description: 'Celebrating our graduates as they move to the next phase of their journey'
    },
    {
      id: 11,
      url: 'https://images.pexels.com/photos/8617960/pexels-photo-8617960.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Cultural Day',
      category: 'Events',
      description: 'Annual cultural celebration showcasing our rich Nigerian heritage'
    },
    {
      id: 12,
      url: 'https://images.pexels.com/photos/8617914/pexels-photo-8617914.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Science Fair',
      category: 'Events',
      description: 'Students presenting their innovative science projects and experiments'
    }
  ];

  const categories = ['All', 'Campus', 'Facilities', 'Student Life', 'Sports', 'Events'];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const handleAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setSessionTimeRemaining(AdminAuth.getSessionTimeRemaining());
  };

  const handleAdminLogout = () => {
    AdminAuth.clearSession();
    setIsAdminAuthenticated(false);
    setSessionTimeRemaining(0);
  };

  const handleImageUpload = (imageData: any) => {
    const newImages = [...images, imageData];
    setImages(newImages);
    
    // Save to localStorage (in real app, this would be saved to database)
    const uploadedImages = newImages.filter(img => img.uploadDate);
    localStorage.setItem('gallery_images', JSON.stringify(uploadedImages));
    
    setShowImageUpload(false);
  };

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  const handleDeleteImage = (imageId: number) => {
    // Filter out the deleted image
    const updatedImages = images.filter(img => img.id !== imageId);
    setImages(updatedImages);
    
    // Update localStorage
    const uploadedImages = updatedImages.filter(img => img.uploadDate);
    localStorage.setItem('gallery_images', JSON.stringify(uploadedImages));
    
    // Close the modal
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <h1 className="text-5xl font-bold text-black mb-6">
              School Gallery
            </h1>
          </div>
          
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            Explore our beautiful campus, modern facilities, and vibrant school life through these photos.
          </p>
          
          {/* Bold Call to Action */}
          <div className="bg-[#1B1464]/90 rounded-2xl p-8 mb-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              🎓 ENROLL YOUR CHILD TODAY! 🎓
            </h2>
            <p className="text-xl text-white mb-6">
              Give your child the best education at Positive Image Schools
            </p>
            <Link to="/register">
              <button className="px-8 py-4 bg-[#FFF4B2] text-[#1B1464] rounded-full font-bold text-lg hover:bg-white hover:text-[#1B1464] transition-colors duration-300 shadow-lg transform hover:scale-105">
                REGISTER NOW - LIMITED SPACES AVAILABLE!
              </button>
            </Link>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredImages.map((image) => (
            <motion.div
              key={image.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer bg-gray-100"
              onClick={() => openImageModal(image)}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.category}</p>
                </div>
                
                {/* Zoom Icon */}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <ZoomIn size={20} className="text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Admin Controls */}
        <div className="mt-12 flex justify-center">
          {isAdminAuthenticated ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg font-semibold text-green-700">Admin Panel</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <Clock size={16} />
                <span>Session: {sessionTimeRemaining} minutes remaining</span>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="bg-gradient-to-r from-[#6FC1FF] to-[#6B46C1] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-pointer transform active:scale-95"
                >
                  <Upload size={18} />
                  Upload Image
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAdminLogin}
              className="bg-gradient-to-r from-[#1B1464] to-[#6B46C1] text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-3 cursor-pointer transform active:scale-95"
            >
              <Upload size={24} />
              Admin Upload
            </button>
          )}
        </div>

        {/* Another Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-[#1B1464]/90 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Join Our School Family?
            </h2>
            <p className="text-xl text-white mb-6">
              Don't wait! Secure your child's future with quality education at Positive Image Schools
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <button className="px-8 py-4 bg-[#FFF4B2] text-[#1B1464] rounded-full font-bold text-lg hover:bg-white hover:text-[#1B1464] transition-colors duration-300 shadow-lg transform hover:scale-105">
                  ENROLL NOW
                </button>
              </Link>
              <Link to="/contact">
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-[#1B1464] transition-colors duration-300">
                  CONTACT US
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>

              {/* Navigation arrows */}
              {filteredImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 rounded-full p-3 shadow-lg hover:bg-white transition-colors z-10"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
              />

              {/* Image info */}
              <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-black">{selectedImage.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {selectedImage.category}
                    </span>
                    {/* Delete button - only visible for admins */}
                    {isAdminAuthenticated && (
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this image?')) {
                            handleDeleteImage(selectedImage.id);
                          }
                        }}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-semibold hover:bg-red-200 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-700">{selectedImage.description}</p>
                
                {filteredImages.length > 1 && (
                  <div className="mt-4 text-center text-sm text-gray-500">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AdminLogin
        isOpen={showAdminLogin}
        onClose={() => setShowAdminLogin(false)}
        onSuccess={handleAdminLoginSuccess}
      />

      {/* Image Upload Modal */}
      <ImageUpload
        isOpen={showImageUpload}
        onClose={() => setShowImageUpload(false)}
        onUpload={handleImageUpload}
      />
    </div>
  );
};

export default Gallery;