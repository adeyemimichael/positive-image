import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  // Separate state for hero bubble slider
  const [heroSlide, setHeroSlide] = useState(0);
  
  // Separate state for gallery section slider
  const [gallerySlide, setGallerySlide] = useState(0);
  
  // State for lightbox/modal
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // State for admin announcements - THIS IS STATE MANAGEMENT
  const [adminAnnouncements, setAdminAnnouncements] = useState<any[]>([]);

  // Load admin announcements from localStorage - THIS IS DATA PERSISTENCE
  useEffect(() => {
    const loadAnnouncements = () => {
      const savedAnnouncements = localStorage.getItem('admin_announcements');
      if (savedAnnouncements) {
        try {
          const parsed = JSON.parse(savedAnnouncements);
          setAdminAnnouncements(parsed);
        } catch (error) {
          console.error('Error loading announcements:', error);
        }
      }
    };

    loadAnnouncements();

    // Listen for storage changes (when admin creates new announcement)
    // THIS IS EVENT-DRIVEN PROGRAMMING
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'admin_announcements') {
        loadAnnouncements();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also check for updates every 5 seconds (polling)
    const interval = setInterval(loadAnnouncements, 5000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Preload critical images for better performance
  useEffect(() => {
    const criticalImages = [
      '/ceo2.jpg',
      '/positive2/ceoandstaff.jpg',
      '/outing3.jpg',
      '/positive2/smallexcursion.jpeg',
      '/positive2/announcement.jpeg',
      '/positive2/facility.jpeg',
      '/positive2/practicals.jpeg'
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Hero section content (for the bubble slider)
  const heroContent = [
    {
      url: '/ceo2.jpg',
      caption: 'Dedicated Leadership & Staff',
      title: 'Welcome to Positive Image Schools',
      subtitle: 'Where Excellence Meets Innovation',
      description: 'Nurturing minds, building character, and creating future leaders in our state-of-the-art facilities.'
    },
    {
      url: '/positive2/ceoandstaff.jpg',
      caption: 'Registration Now Open',
      title: 'Discover Knowledge at Positive Image Schools',
      subtitle: 'Your Gateway to Academic Excellence',
      description: 'Empowering students with world-class resources and innovative learning environments.'
    },
    {
      url: '/outing3.jpg',
      caption: 'Science Practicals',
      title: 'Explore Science at Positive Image Schools',
      subtitle: 'Where Curiosity Meets Discovery',
      description: 'Inspiring the next generation of scientists, innovators, and critical thinkers.'
    },
    {
      url: '/positive2/smallexcursion.jpeg',
      caption: 'Educational Excursions',
      title: 'Achieve Greatness at Positive Image Schools',
      subtitle: 'Building Champions in Every Field',
      description: 'Developing well-rounded individuals through academic excellence and athletic achievement.'
    }
  ];

  // Gallery section content (for the slider below hero)
  const galleryContent = [
    {
      url: '/positive2/announcement.jpeg',
      caption: 'Registration Now Open - Join Us for 2026!'
    },
    {
      url: '/positive2/pastevent.jpeg',
      caption: 'Annual School Events & Celebrations'
    },
    {
      url: '/positive2/pastevent2.jpeg',
      caption: 'Student Achievement Awards Ceremony'
    },
    {
      url: '/positive2/eventspast.jpeg',
      caption: 'Past Events & Memorable Moments'
    },
    {
      url: '/positive2/facility.jpeg',
      caption: 'State-of-the-Art School Facilities'
    },
    {
      url: '/positive2/practicals.jpeg',
      caption: 'Hands-On Science Laboratory Sessions'
    },
    {
      url: '/positive2/smallexcursion.jpeg',
      caption: 'Educational Field Trips & Excursions'
    },
    {
      url: '/positive2/studnetassembly.jpeg',
      caption: 'Morning Assembly & Student Gatherings'
    },
    {
      url: '/positive2/ceoandstudent.JPG',
      caption: 'Leadership Engagement with Students'
    },
    {
      url: '/positive2/primaryschool.jpeg',
      caption: 'Primary School Learning Environment'
    }
  ];

  // Hero slider auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Gallery slider auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setGallerySlide((prev) => (prev + 1) % galleryContent.length);
    }, 6000); // Slightly different timing to keep them independent

    return () => clearInterval(timer);
  }, []);

  const nextHeroSlide = () => {
    setHeroSlide((prev) => (prev + 1) % heroContent.length);
  };

  const prevHeroSlide = () => {
    setHeroSlide((prev) => (prev - 1 + heroContent.length) % heroContent.length);
  };

  const nextGallerySlide = () => {
    setGallerySlide((prev) => (prev + 1) % galleryContent.length);
  };

  const prevGallerySlide = () => {
    setGallerySlide((prev) => (prev - 1 + galleryContent.length) % galleryContent.length);
  };

  // Lightbox functions
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextLightboxImage = () => {
    setLightboxIndex((prev) => (prev + 1) % galleryContent.length);
  };

  const prevLightboxImage = () => {
    setLightboxIndex((prev) => (prev - 1 + galleryContent.length) % galleryContent.length);
  };

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLightboxOpen]);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen bg-[#1B1464] to-[#D6261D] flex items-center overflow-hidden md:my-0 mt-24">
        <div className="absolute inset-0 overflow-hidden ">
          <div className="absolute inset-0 bg-[url('/asa.jpg')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 z-10 ">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content - Animated Text */}
            <div className="max-w-2xl">
              {/* Animated Title */}
              <div className="overflow-hidden mb-4">
                <motion.h1
                  key={`title-${heroSlide}`}
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -100, opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white"
                >
                  {heroContent[heroSlide].title.split(' ').slice(0, -3).join(' ')}{' '}
                  <span className="text-[#FFF4B2]">
                    {heroContent[heroSlide].title.split(' ').slice(-3).join(' ')}
                  </span>
                </motion.h1>
              </div>

              {/* Animated Subtitle */}
              <div className="overflow-hidden mb-2">
                <motion.h2
                  key={`subtitle-${heroSlide}`}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-heading font-semibold text-[#6FC1FF] mb-4"
                >
                  {heroContent[heroSlide].subtitle}
                </motion.h2>
              </div>

              {/* Animated Description */}
              <div className="overflow-hidden mb-8">
                <motion.p
                  key={`description-${heroSlide}`}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="text-xl text-white/90"
                >
                  {heroContent[heroSlide].description}
                </motion.p>
              </div>
              {/* Static Call-to-Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/register">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#FFF4B2] text-[#1B1464] rounded-full font-bold text-base sm:text-lg hover:bg-[#FFF4B2]/90 transition-all duration-300 shadow-lg transform hover:scale-105">
                    Enroll Now
                  </button>
                </Link>
                <Link to="/about">
                  <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Side - Organic Bubble Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative mt-8 lg:mt-0"
            >
              {/* Responsive Organic Bubble Container */}
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] mx-auto">
                {/* Background Decorative Shapes - Reduced Size */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br from-[#6FC1FF]/30 to-[#6FC1FF]/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-14 -right-14 w-36 h-36 bg-gradient-to-br from-[#D6261D]/25 to-[#D6261D]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/3 -left-14 w-28 h-28 bg-gradient-to-br from-[#FFF4B2]/35 to-[#FFF4B2]/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                <div className="absolute top-1/5 -right-8 w-24 h-24 bg-gradient-to-br from-[#1B1464]/30 to-[#1B1464]/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-[#6FC1FF]/25 to-[#6FC1FF]/15 rounded-full blur-md animate-pulse" style={{ animationDelay: '3s' }}></div>

                {/* Main Larger Organic Bubble Shape */}
                <div
                  className="relative w-full h-full overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-1000 group"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    background: 'linear-gradient(135deg, rgba(255,244,178,0.2) 0%, rgba(111,193,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '4px solid rgba(255,244,178,0.4)',
                    boxShadow: '0 25px 50px -12px rgba(27, 20, 100, 0.25), inset 0 1px 0 rgba(255, 244, 178, 0.3)'
                  }}
                >
                  {/* Inner glow effect with brand colors */}
                  <div
                    className="absolute inset-2 rounded-full opacity-50"
                    style={{
                      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                      background: 'linear-gradient(135deg, rgba(111,193,255,0.1) 0%, transparent 50%)',
                    }}
                  ></div>
                  {/* Synced Image Slider */}
                  <div className="relative w-full h-full">
                    {heroContent.map((content, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: heroSlide === index ? 1 : 0,
                          scale: heroSlide === index ? 1 : 1.1,
                          rotate: heroSlide === index ? 0 : 2
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <img
                          src={content.url}
                          alt={content.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1464]/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="bg-[#1B1464]/60 backdrop-blur-sm rounded-2xl p-4 border border-[#FFF4B2]/30">
                            <p className="text-[#FFF4B2] font-semibold text-xl text-center">{content.caption}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Navigation Dots with Brand Colors */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                    {heroContent.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setHeroSlide(index)}
                        className={`rounded-full transition-all duration-500 shadow-lg ${heroSlide === index
                          ? 'w-12 h-4 bg-gradient-to-r from-[#FFF4B2] to-[#6FC1FF] shadow-[#FFF4B2]/50'
                          : 'w-4 h-4 bg-white/60 hover:bg-[#6FC1FF]/80 hover:scale-110'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Floating Play Button */}
                  {/* <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group">
                      <div className="w-0 h-0 border-l-[12px] border-l-[#1B1464] border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 group-hover:border-l-[#D6261D]"></div>
                    </button>
                  </motion.div> */}
                </div>

                {/* Floating Info Cards - Repositioned for larger bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-12 -right-12 bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl transform hover:scale-110 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6FC1FF]/20 to-[#6FC1FF]/40 rounded-full flex items-center justify-center shadow-lg">
                      <Users size={28} className="text-[#1B1464]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">1000+</p>
                      <p className="text-sm text-gray-600">Students</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="absolute -bottom-12 -left-12 bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl transform hover:scale-110 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FFF4B2]/60 to-[#FFF4B2]/80 rounded-full flex items-center justify-center shadow-lg">
                      <Award size={28} className="text-[#D6261D]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">10+</p>
                      <p className="text-sm text-gray-600">Awards</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.4 }}
                  className="absolute top-1/2 -left-16 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#6FC1FF]/20 to-[#6FC1FF]/40 rounded-full flex items-center justify-center shadow-lg">
                      <BookOpen size={28} className="text-[#1B1464]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">20+</p>
                      <p className="text-sm text-gray-600">Years</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.6 }}
                  className="absolute top-1/4 -right-16 bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl hover:scale-110 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-[#FFF4B2]/60 to-[#FFF4B2]/80 rounded-full flex items-center justify-center shadow-lg">
                      <UserPlus size={28} className="text-[#D6261D]" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">50+</p>
                      <p className="text-sm text-gray-600">Teachers</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
      </section>

      {/* School Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-4">
              Explore Our Campus
            </h2>
            <p className="text-gray-600 text-lg">
              Take a virtual tour of our world-class facilities and learning environments.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative max-w-5xl mx-auto"
          >
            <div 
              className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-xl cursor-pointer group"
              onClick={() => openLightbox(gallerySlide)}
            >
              <motion.img
                key={gallerySlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={galleryContent[gallerySlide].url}
                alt={galleryContent[gallerySlide].caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1B1464]/70 to-transparent p-6">
                <p className="text-[#FFF4B2] text-xl font-heading">{galleryContent[gallerySlide].caption}</p>
              </div>
              {/* Click to expand hint */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-[#1B1464] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Click to expand
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevGallerySlide();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
            >
              <ChevronLeft size={24} className="text-primary-700" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextGallerySlide();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10"
            >
              <ChevronRight size={24} className="text-primary-700" />
            </button>

            <div className="flex justify-center mt-4 gap-2">
              {galleryContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGallerySlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${gallerySlide === index ? 'bg-[#1B1464] w-6' : 'bg-gray-300'
                    }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Bento Grid Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">
                Campus Highlights
              </h3>
              <p className="text-gray-600">
                Discover more of our beautiful facilities and vibrant school life
              </p>
            </div>

            {/* Improved Bento Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4 max-w-6xl mx-auto">
              {/* Large featured image */}
              <motion.div
                variants={fadeInUp}
                className="col-span-2 md:col-span-3 row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer min-h-[200px] md:min-h-[300px]"
              >
                <img
                  src="/positive2/facility.jpeg"
                  alt="School Facilities"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-semibold">School Facilities</h4>
                  <p className="text-sm">Modern learning environment</p>
                </div>
              </motion.div>

              {/* Medium images */}
              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="/positive2/practicals.jpeg"
                  alt="Science Practicals"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Science Lab</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="md:col-span-1 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="/positive2/practice.jpeg"
                  alt="Practical Learning"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Practicals</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="md:col-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="/positive2/smallexcursion.jpeg"
                  alt="School Excursion"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Excursions</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="md:col-span-1 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="/positive2/primaryschool.jpeg"
                  alt="Primary School"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Primary School</h4>
                </div>
              </motion.div>

              {/* Tall image */}
              <motion.div
                variants={fadeInUp}
                className="col-span-2 md:col-span-3 row-span-1 md:row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer min-h-[150px] md:min-h-[200px]"
              >
                <img
                  src="/positive2/studnetassembly.jpeg"
                  alt="Student Assembly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-semibold">Student Life</h4>
                  <p className="text-sm">Vibrant community</p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="/positive2/ceoandstudent.JPG"
                  alt="CEO with Students"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Leadership</h4>
                </div>
              </motion.div>
            </div>

            {/* See More Button */}
            <div className="text-center mt-8">
              <Link to="/gallery">
                <button className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  See More Photos
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-4">
              Why Choose Positive Image Schools?
            </h2>
            <p className="text-gray-600 text-lg">
              We provide a nurturing environment where academic excellence meets character development.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <motion.div variants={fadeInUp}>
              <Card className="p-6 text-center h-full">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-700 mb-2">Quality Education</h3>
                <p className="text-gray-600">
                  Our curriculum is designed to inspire critical thinking and academic excellence.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 text-center h-full">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={32} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-700 mb-2">Experienced Teachers</h3>
                <p className="text-gray-600">
                  Our dedicated educators bring years of experience and passion to every classroom.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 text-center h-full">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={32} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-700 mb-2">Character Development</h3>
                <p className="text-gray-600">
                  We instill strong values and build character alongside academic achievement.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="p-6 text-center h-full">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus size={32} className="text-primary-700" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-primary-700 mb-2">Inclusive Community</h3>
                <p className="text-gray-600">
                  We foster a diverse and inclusive environment where every student feels welcome.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* Announcements Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#6FC1FF]/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B1464] mb-4">
              Latest Announcements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest news, events, and important information from Positive Image Schools
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Featured Announcement - DYNAMIC: Shows latest admin announcement or default */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#6FC1FF]/20"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={adminAnnouncements.length > 0 && adminAnnouncements[0].imageUrl 
                    ? adminAnnouncements[0].imageUrl 
                    : "/positive2/announcement.jpeg"}
                  alt="School Registration Announcement"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    adminAnnouncements.length > 0 && adminAnnouncements[0].priority === 'urgent'
                      ? 'bg-[#D6261D] text-white'
                      : adminAnnouncements.length > 0 && adminAnnouncements[0].priority === 'normal'
                      ? 'bg-[#6FC1FF] text-white'
                      : 'bg-[#D6261D] text-white'
                  }`}>
                    {adminAnnouncements.length > 0 
                      ? adminAnnouncements[0].priority.toUpperCase() 
                      : 'URGENT'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-[#D6261D] rounded-full"></div>
                  <span className="text-sm text-gray-500">
                    {adminAnnouncements.length > 0 
                      ? new Date(adminAnnouncements[0].uploadDate).toLocaleDateString()
                      : 'Latest Update'}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1B1464] mb-3">
                  {adminAnnouncements.length > 0 
                    ? adminAnnouncements[0].title 
                    : 'Second Term 2026 Registration Now Open!'}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {adminAnnouncements.length > 0 
                    ? adminAnnouncements[0].description 
                    : 'We are excited to announce that registration for the Second Term 2026 academic session is now open. Early bird discount of 15% available for early registrations. Detailed information and deadlines will be sent to all interested parents via email and SMS.'}
                </p>
                <div className="flex items-center justify-between">
                  <Link to="/register">
                    <button className="bg-[#FFF4B2] text-[#1B1464] px-6 py-2 rounded-full font-semibold hover:bg-[#FFF4B2]/80 transition-colors">
                      Register Now
                    </button>
                  </Link>
                  <span className="text-sm text-[#6FC1FF] font-medium">
                    {adminAnnouncements.length > 0 
                      ? adminAnnouncements[0].category 
                      : 'Limited Spaces'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Announcements List - DYNAMIC: Shows admin announcements */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Show admin announcements (skip first one as it's featured) */}
              {adminAnnouncements.slice(1, 5).map((announcement, index) => {
                const getCategoryIcon = (category: string) => {
                  switch (category.toLowerCase()) {
                    case 'academic': return <BookOpen size={20} className="text-[#1B1464]" />;
                    case 'event': return <Users size={20} className="text-[#D6261D]" />;
                    case 'achievement': return <Award size={20} className="text-[#D6261D]" />;
                    case 'notice': return <UserPlus size={20} className="text-[#1B1464]" />;
                    default: return <BookOpen size={20} className="text-[#1B1464]" />;
                  }
                };

                const getCategoryColor = (category: string) => {
                  switch (category.toLowerCase()) {
                    case 'academic': return { border: 'border-[#6FC1FF]', bg: 'bg-[#6FC1FF]/20', text: 'text-[#1B1464]' };
                    case 'event': return { border: 'border-[#FFF4B2]', bg: 'bg-[#FFF4B2]/60', text: 'text-[#D6261D]' };
                    case 'achievement': return { border: 'border-[#D6261D]', bg: 'bg-[#D6261D]/20', text: 'text-[#D6261D]' };
                    case 'notice': return { border: 'border-[#6FC1FF]', bg: 'bg-[#6FC1FF]/20', text: 'text-[#1B1464]' };
                    default: return { border: 'border-[#6FC1FF]', bg: 'bg-[#6FC1FF]/20', text: 'text-[#1B1464]' };
                  }
                };

                const colors = getCategoryColor(announcement.category);

                return (
                  <motion.div
                    key={announcement.id}
                    variants={fadeInUp}
                    className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${colors.border} hover:shadow-xl transition-shadow duration-300`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                        {getCategoryIcon(announcement.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`${colors.bg} ${colors.text} px-2 py-1 rounded text-xs font-medium`}>
                            {announcement.category}
                          </span>
                          {announcement.priority === 'urgent' && (
                            <span className="bg-[#D6261D] text-white px-2 py-1 rounded text-xs font-bold">
                              URGENT
                            </span>
                          )}
                        </div>
                        <h4 className="font-semibold text-[#1B1464] mb-2">
                          {announcement.title}
                        </h4>
                        <p className="text-gray-600 text-sm">
                          {announcement.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(announcement.uploadDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Show default announcements if no admin announcements */}
              {adminAnnouncements.length <= 1 && (
                <>
                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#6FC1FF] hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#6FC1FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <BookOpen size={20} className="text-[#1B1464]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#6FC1FF]/20 text-[#1B1464] px-2 py-1 rounded text-xs font-medium">
                            Academic
                          </span>
                          <span className="bg-[#FFF4B2] text-[#1B1464] px-2 py-1 rounded text-xs font-bold">
                            COMING UP
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#1B1464] mb-2">
                          Mid-Term Examination Schedule Released
                        </h4>
                        <p className="text-gray-600 text-sm">
                          The mid-term examination timetable for all classes has been published.
                          Detailed information will be sent to students and parents via email and SMS.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#FFF4B2] hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#FFF4B2]/60 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users size={20} className="text-[#D6261D]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#FFF4B2]/60 text-[#D6261D] px-2 py-1 rounded text-xs font-medium">
                            Event
                          </span>
                          <span className="bg-[#FFF4B2] text-[#1B1464] px-2 py-1 rounded text-xs font-bold">
                            COMING UP
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#1B1464] mb-2">
                          Annual Cultural Day
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Join us for our annual cultural celebration featuring performances,
                          traditional displays, and cultural exhibitions. Event details and date will be communicated to all parents and students soon.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#D6261D] hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#D6261D]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award size={20} className="text-[#D6261D]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#D6261D]/20 text-[#D6261D] px-2 py-1 rounded text-xs font-medium">
                            Achievement
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#1B1464] mb-2">
                          Something Big is Coming Up!
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Stay tuned for an exciting announcement! Positive Image Schools is preparing 
                          something special that will elevate our students' learning experience. More information will be shared with our community soon.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeInUp}
                    className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-[#6FC1FF] hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#6FC1FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <UserPlus size={20} className="text-[#1B1464]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-[#6FC1FF]/20 text-[#1B1464] px-2 py-1 rounded text-xs font-medium">
                            Notice
                          </span>
                          <span className="bg-[#FFF4B2] text-[#1B1464] px-2 py-1 rounded text-xs font-bold">
                            COMING UP
                          </span>
                        </div>
                        <h4 className="font-semibold text-[#1B1464] mb-2">
                          Parent-Teacher Conference Scheduled
                        </h4>
                        <p className="text-gray-600 text-sm">
                          The second term parent-teacher conference has been scheduled.
                          Specific dates and times will be sent to parents via email and SMS. Please confirm your attendance with your child's class teacher.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </>
              )}

              {/* View All Button */}
              <motion.div
                variants={fadeInUp}
                className="text-center pt-4"
              >
                <button className="bg-[#1B1464] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1B1464]/90 transition-colors duration-300 shadow-lg">
                  View All Announcements
                </button>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Links */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 bg-gradient-to-r from-[#1B1464] to-[#D6261D] rounded-2xl p-8 text-white"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Stay Connected</h3>
              <p className="text-white/90">Never miss important updates from Positive Image Schools</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={24} className="text-[#FFF4B2]" />
                </div>
                <h4 className="font-semibold mb-2">Academic Portal</h4>
                <p className="text-sm text-white/80">Access grades, assignments, and academic resources</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users size={24} className="text-[#FFF4B2]" />
                </div>
                <h4 className="font-semibold mb-2">Parent Portal</h4>
                <p className="text-sm text-white/80">Stay updated on your child's progress and school events</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={24} className="text-[#FFF4B2]" />
                </div>
                <h4 className="font-semibold mb-2">Newsletter</h4>
                <p className="text-sm text-white/80">Subscribe to our monthly newsletter for updates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-800 to-primary-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Enroll your child today and be part of our growing family of future leaders.
            </p>
            <Link to="/register">
              <Button variant="secondary" size="lg">
                Register Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-[#FFF4B2] transition-colors z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white text-lg font-semibold bg-black/50 px-4 py-2 rounded-full">
            {lightboxIndex + 1} / {galleryContent.length}
          </div>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevLightboxImage();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-50"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextLightboxImage();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-50"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          {/* Main image */}
          <div 
            className="relative max-w-7xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={galleryContent[lightboxIndex].url}
              alt={galleryContent[lightboxIndex].caption}
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <p className="text-white text-xl font-heading text-center">
                {galleryContent[lightboxIndex].caption}
              </p>
            </div>
          </div>

          {/* Keyboard hints */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm flex gap-4">
            <span>← → Navigate</span>
            <span>ESC Close</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;