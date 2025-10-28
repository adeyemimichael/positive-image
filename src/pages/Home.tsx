import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const schoolContent = [
    {
      url: 'https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg',
      caption: 'Our Modern Campus',
      title: 'Welcome to Positive Image Schools',
      subtitle: 'Where Excellence Meets Innovation',
      description: 'Nurturing minds, building character, and creating future leaders in our state-of-the-art facilities.'
    },
    {
      url: 'https://images.pexels.com/photos/8617960/pexels-photo-8617960.jpeg',
      caption: 'State-of-the-art Library',
      title: 'Discover Knowledge at Positive Image Schools',
      subtitle: 'Your Gateway to Academic Excellence',
      description: 'Empowering students with world-class resources and innovative learning environments.'
    },
    {
      url: 'https://images.pexels.com/photos/8617914/pexels-photo-8617914.jpeg',
      caption: 'Science Laboratory',
      title: 'Explore Science at Positive Image Schools',
      subtitle: 'Where Curiosity Meets Discovery',
      description: 'Inspiring the next generation of scientists, innovators, and critical thinkers.'
    },
    {
      url: 'https://images.pexels.com/photos/8617477/pexels-photo-8617477.jpeg',
      caption: 'Sports Facilities',
      title: 'Achieve Greatness at Positive Image Schools',
      subtitle: 'Building Champions in Every Field',
      description: 'Developing well-rounded individuals through academic excellence and athletic achievement.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % schoolContent.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % schoolContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + schoolContent.length) % schoolContent.length);
  };

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
      <section className="relative h-screen bg-gradient-to-r from-primary-800 to-primary-700 flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
              className="max-w-2xl"
            >
              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4"
              >
                Welcome to <span className="text-secondary-400">Positive Image Schools</span>
              </motion.h1>
              <motion.p
                variants={fadeInUp}
                className="text-xl text-white/90 mb-8"
              >
                Nurturing minds, building character, and creating future leaders.
              </motion.p>
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-4"
              >
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Enroll Now
                  </Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                    Learn More
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Side - Irregular Circular Image Slider */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              {/* Organic Bubble Container */}
              <div className="relative w-[550px] h-[550px] mx-auto">
                {/* Enhanced Background Decorative Shapes */}
                <div className="absolute -top-12 -left-12 w-40 h-40 bg-gradient-to-br from-secondary-400/30 to-secondary-300/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-gradient-to-br from-primary-300/25 to-primary-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/3 -left-16 w-32 h-32 bg-gradient-to-br from-secondary-500/35 to-secondary-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2.5s' }}></div>
                <div className="absolute top-1/5 -right-8 w-28 h-28 bg-gradient-to-br from-primary-400/30 to-primary-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-400/20 to-yellow-300/15 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3s' }}></div>

                {/* Main Organic Bubble Shape */}
                <div
                  className="relative w-full h-full overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-all duration-1000 group"
                  style={{
                    borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '4px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {/* Inner glow effect */}
                  <div
                    className="absolute inset-2 rounded-full opacity-50"
                    style={{
                      borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)',
                    }}
                  ></div>
                  {/* Image Slider */}
                  <div className="relative w-full h-full">
                    {schoolImages.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: currentSlide === index ? 1 : 0,
                          scale: currentSlide === index ? 1 : 1.1
                        }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                      >
                        <img
                          src={image.url}
                          alt={image.caption}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute bottom-8 left-8 right-8">
                          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                            <p className="text-white font-semibold text-xl text-center">{image.caption}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Enhanced Navigation Dots */}
                  <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-4">
                    {schoolImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`rounded-full transition-all duration-500 shadow-lg ${currentSlide === index
                          ? 'w-12 h-4 bg-gradient-to-r from-secondary-400 to-secondary-500 shadow-secondary-400/50'
                          : 'w-4 h-4 bg-white/60 hover:bg-white/80 hover:scale-110'
                          }`}
                      />
                    ))}
                  </div>

                  {/* Floating Play Button */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                  >
                    <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 group">
                      <div className="w-0 h-0 border-l-[12px] border-l-primary-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1 group-hover:border-l-primary-700"></div>
                    </button>
                  </motion.div>
                </div>

                {/* Floating Info Cards - Repositioned for larger bubble */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  className="absolute -top-12 -right-12 bg-white/95 backdrop-blur-sm rounded-3xl p-5 shadow-2xl transform hover:scale-110 transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center shadow-lg">
                      <Users size={28} className="text-primary-600" />
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
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-full flex items-center justify-center shadow-lg">
                      <Award size={28} className="text-secondary-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">15+</p>
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
                    <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-lg">
                      <BookOpen size={28} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-800">25+</p>
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
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center shadow-lg">
                      <UserPlus size={28} className="text-purple-600" />
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
            <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl shadow-xl">
              <motion.img
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                src={schoolImages[currentSlide].url}
                alt={schoolImages[currentSlide].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <p className="text-white text-xl font-heading">{schoolImages[currentSlide].caption}</p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronLeft size={24} className="text-primary-700" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
            >
              <ChevronRight size={24} className="text-primary-700" />
            </button>

            <div className="flex justify-center mt-4 gap-2">
              {schoolImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-primary-700 w-6' : 'bg-gray-300'
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

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {/* Large featured image */}
              <motion.div
                variants={fadeInUp}
                className="col-span-2 row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Main Campus Building"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg font-semibold">Main Campus</h4>
                  <p className="text-sm">Modern learning environment</p>
                </div>
              </motion.div>

              {/* Smaller images */}
              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/8617960/pexels-photo-8617960.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Library"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Library</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/8617914/pexels-photo-8617914.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Science Lab"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Science Lab</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/8617477/pexels-photo-8617477.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Sports Field"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Sports Field</h4>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/8617704/pexels-photo-8617704.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Classroom"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Classroom</h4>
                </div>
              </motion.div>

              {/* Tall image */}
              <motion.div
                variants={fadeInUp}
                className="row-span-2 relative overflow-hidden rounded-2xl shadow-lg group cursor-pointer"
              >
                <img
                  src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Students"
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
                  src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Computer Lab"
                  className="w-full h-32 md:h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-2 left-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-sm font-semibold">Computer Lab</h4>
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
    </div>
  );
};

export default Home;