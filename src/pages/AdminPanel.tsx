import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, Upload, Trash2, Edit, Eye, LogOut, Clock, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/AdminLogin';
import AnnouncementUpload from '../components/AnnouncementUpload';
import ImageUpload from '../components/ImageUpload';
import { AdminAuth } from '../config/admin';

interface Announcement {
  id: number;
  title: string;
  category: string;
  description: string;
  priority: string;
  imageUrl: string | null;
  uploadDate: string;
  status: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showAnnouncementUpload, setShowAnnouncementUpload] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [editingGalleryImage, setEditingGalleryImage] = useState<any | null>(null);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [galleryImages, setGalleryImages] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'announcements' | 'gallery'>('announcements');

  useEffect(() => {
    const checkAuth = () => {
      const isAuth = AdminAuth.isValidSession();
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        setShowLogin(true);
      } else {
        setSessionTimeRemaining(AdminAuth.getSessionTimeRemaining());
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const { getAnnouncements } = await import('../services/announcementService');
      const { getGalleryImages } = await import('../services/galleryService');
      
      const [announcementsData, galleryData] = await Promise.all([
        getAnnouncements().catch(() => []),
        getGalleryImages().catch(() => [])
      ]);

      setAnnouncements(announcementsData);
      setGalleryImages(galleryData);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setSessionTimeRemaining(AdminAuth.getSessionTimeRemaining());
  };

  const handleLogout = () => {
    AdminAuth.clearSession();
    setIsAuthenticated(false);
    navigate('/');
  };

  const handleEditAnnouncement = (announcement: any) => {
    setEditingAnnouncement(announcement);
    setShowAnnouncementUpload(true);
  };

  const handleCreateNewAnnouncement = () => {
    setEditingAnnouncement(null);
    setShowAnnouncementUpload(true);
  };

  const handleAnnouncementUpload = async (announcementData: any) => {
    try {
      const { createAnnouncement, updateAnnouncement, uploadAnnouncementImage } = await import('../services/announcementService');
      
      // Upload image if provided
      let imageUrl = announcementData.imageUrl || (editingAnnouncement ? (editingAnnouncement.image_url || editingAnnouncement.imageUrl) : null);
      if (announcementData.imageFile) {
        try {
          const tempId = editingAnnouncement ? editingAnnouncement.id : `announcement-${Date.now()}`;
          imageUrl = await uploadAnnouncementImage(announcementData.imageFile, tempId);
        } catch (error) {
          console.error('Image upload failed, using base64/previous:', error);
        }
      }

      if (editingAnnouncement) {
        // Update existing announcement in Supabase
        const updated = await updateAnnouncement(editingAnnouncement.id, {
          title: announcementData.title,
          category: announcementData.category,
          description: announcementData.description,
          priority: announcementData.priority,
          image_url: imageUrl
        });

        const updatedList = announcements.map(a => a.id === editingAnnouncement.id ? { ...a, ...updated, imageUrl: imageUrl } : a);
        setAnnouncements(updatedList);
        localStorage.setItem('admin_announcements', JSON.stringify(updatedList));
      } else {
        // Create new announcement in Supabase
        const newAnnouncement = await createAnnouncement({
          title: announcementData.title,
          category: announcementData.category,
          description: announcementData.description,
          priority: announcementData.priority,
          image_url: imageUrl,
          status: 'active'
        });
        
        const updatedList = [newAnnouncement, ...announcements];
        setAnnouncements(updatedList);
        localStorage.setItem('admin_announcements', JSON.stringify(updatedList));
      }
      
      setShowAnnouncementUpload(false);
      setEditingAnnouncement(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Failed to save announcement. Please try again.');
    }
  };

  const handleDeleteAnnouncement = async (id: number | string) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      try {
        const { deleteAnnouncement } = await import('../services/announcementService');
        await deleteAnnouncement(id.toString());
        
        // Update local state
        const updatedAnnouncements = announcements.filter(a => a.id !== id);
        setAnnouncements(updatedAnnouncements);
        
        // Update localStorage for backward compatibility
        localStorage.setItem('admin_announcements', JSON.stringify(updatedAnnouncements));
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Failed to delete announcement. Please try again.');
      }
    }
  };

  const handleEditGalleryImage = (image: any) => {
    setEditingGalleryImage(image);
    setShowImageUpload(true);
  };

  const handleCreateGalleryImage = () => {
    setEditingGalleryImage(null);
    setShowImageUpload(true);
  };

  const handleDeleteGalleryImage = async (id: string, imageUrl?: string) => {
    if (window.confirm('Are you sure you want to delete this gallery image?')) {
      try {
        const { deleteGalleryImage } = await import('../services/galleryService');
        await deleteGalleryImage(id, imageUrl);
        setGalleryImages(galleryImages.filter(img => img.id !== id));
      } catch (error) {
        console.error('Error deleting gallery image:', error);
        alert('Failed to delete image. Please try again.');
      }
    }
  };

  const handleGalleryUploadSuccess = () => {
    setShowImageUpload(false);
    setEditingGalleryImage(null);
    loadData();
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-300';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'info': return 'bg-gray-100 text-gray-700 border-gray-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1B1464] to-[#D6261D] flex items-center justify-center p-4">
        <div className="text-center text-white">
          <Bell size={64} className="mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
          <p className="mb-6">Please login to access the admin panel</p>
        </div>
        <AdminLogin
          isOpen={showLogin}
          onClose={() => navigate('/')}
          onSuccess={handleLoginSuccess}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#1B1464] mb-2">Admin Panel</h1>
              <p className="text-gray-600">Manage announcements and gallery content</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={16} />
                  <span>Session: {sessionTimeRemaining} min</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Active</span>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('announcements')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'announcements'
                  ? 'text-[#1B1464] border-b-2 border-[#1B1464]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Bell size={20} className="inline mr-2" />
              Announcements
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex-1 px-6 py-4 font-semibold transition-colors ${
                activeTab === 'gallery'
                  ? 'text-[#1B1464] border-b-2 border-[#1B1464]'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <ImageIcon size={20} className="inline mr-2" />
              Gallery
            </button>
          </div>
        </div>

        {/* Announcements Tab */}
        {activeTab === 'announcements' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1B1464]">Manage Announcements</h2>
              <button
                onClick={handleCreateNewAnnouncement}
                className="bg-gradient-to-r from-[#1B1464] to-[#D6261D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Upload size={18} />
                Create Announcement
              </button>
            </div>

            {announcements.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Bell size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Announcements Yet</h3>
                <p className="text-gray-500 mb-6">Create your first announcement to get started</p>
                <button
                  onClick={handleCreateNewAnnouncement}
                  className="bg-[#1B1464] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1B1464]/90 transition-colors"
                >
                  Create Announcement
                </button>
              </div>
            ) : (
              <div className="grid gap-6">
                {announcements.map((announcement) => {
                  const img = announcement.image_url || announcement.imageUrl;
                  const dateStr = announcement.upload_date || announcement.uploadDate || announcement.created_at;

                  return (
                    <motion.div
                      key={announcement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="flex">
                        {img && (
                          <div className="w-48 h-48 flex-shrink-0">
                            <img
                              src={img}
                              alt={announcement.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                                  {(announcement.priority || 'normal').toUpperCase()}
                                </span>
                                <span className="px-3 py-1 bg-[#6FC1FF]/20 text-[#1B1464] rounded-full text-xs font-medium">
                                  {announcement.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-[#1B1464] mb-2">
                                {announcement.title}
                              </h3>
                              <p className="text-gray-600 mb-3">{announcement.description}</p>
                              <p className="text-sm text-gray-500">
                                Published: {dateStr ? new Date(dateStr).toLocaleDateString() : 'Just now'}
                              </p>
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEditAnnouncement(announcement)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Edit Announcement"
                              >
                                <Edit size={20} />
                              </button>
                              <button
                                onClick={() => window.open('/', '_blank')}
                                className="p-2 text-[#1B1464] hover:bg-[#6FC1FF]/10 rounded-lg transition-colors"
                                title="View on Homepage"
                              >
                                <Eye size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteAnnouncement(announcement.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#1B1464]">Manage Gallery</h2>
              <button
                onClick={handleCreateGalleryImage}
                className="bg-gradient-to-r from-[#1B1464] to-[#D6261D] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <Upload size={18} />
                Upload Image
              </button>
            </div>

            {galleryImages.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Gallery Images in Database</h3>
                <p className="text-gray-500 mb-6">Upload an image or seed the default gallery images to get started</p>
                <button
                  onClick={handleCreateGalleryImage}
                  className="bg-[#1B1464] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1B1464]/90 transition-colors"
                >
                  Upload Image
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((img) => {
                  const imageUrl = img.image_url || img.url;
                  return (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={imageUrl}
                          alt={img.title}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-[#1B1464]/80 text-white px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                          {img.category}
                        </span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-[#1B1464] text-lg mb-1">{img.title}</h4>
                          {img.description && (
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{img.description}</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-2">
                          <button
                            onClick={() => window.open(imageUrl, '_blank')}
                            className="p-2 text-[#1B1464] hover:bg-[#6FC1FF]/10 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                            title="View full image"
                          >
                            <Eye size={16} /> View
                          </button>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEditGalleryImage(img)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit Image"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteGalleryImage(img.id, imageUrl)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Image"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      <AnnouncementUpload
        isOpen={showAnnouncementUpload}
        onClose={() => {
          setShowAnnouncementUpload(false);
          setEditingAnnouncement(null);
        }}
        onUpload={handleAnnouncementUpload}
        initialData={editingAnnouncement}
      />

      <ImageUpload
        isOpen={showImageUpload}
        onClose={() => {
          setShowImageUpload(false);
          setEditingGalleryImage(null);
        }}
        onUpload={handleGalleryUploadSuccess}
        initialData={editingGalleryImage}
      />
    </div>
  );
};

export default AdminPanel;
