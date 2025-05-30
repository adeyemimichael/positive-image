import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../components/UI/Button';
import Card from '../components/UI/Card';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const schoolImages = [
    {
      url: 'https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg',
      caption: 'Our Modern Campus'
    },
    {
      url: 'https://images.pexels.com/photos/8617960/pexels-photo-8617960.jpeg',
      caption: 'State-of-the-art Library'
    },
    {
      url: 'https://images.pexels.com/photos/8617914/pexels-photo-8617914.jpeg',
      caption: 'Science Laboratory'
    },
    {
      url: 'https://images.pexels.com/photos/8617477/pexels-photo-8617477.jpeg',
      caption: 'Sports Facilities'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % schoolImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % schoolImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + schoolImages.length) % schoolImages.length);
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
      <section className="relative h-screen bg-gradient-to-r from-primary-800 to-primary-700 flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8617557/pexels-photo-8617557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 z-10">
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
              Nurturing minds, building character, and creating future leaders in Amuloko, Ibadan.
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
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === index ? 'bg-primary-700 w-6' : 'bg-gray-300'
                  }`}
                />
              ))}
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
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
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