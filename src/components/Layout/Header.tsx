import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Teachers', path: '/teachers' },
    { name: 'Staff', path: '/staff' },
    { name: 'Management', path: '/management' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white shadow-md py-6'
        : 'bg-transparent py-8'
        }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <GraduationCap
            size={36}
            className={`${scrolled ? 'text-primary-700' : 'text-white'} mr-2`}
          />
          <span
            className={`font-heading font-bold text-xl ${scrolled ? 'text-primary-700' : 'text-white'
              }`}
          >
            Positive Image Schools
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${scrolled
                  ? 'text-gray-800 hover:text-primary-600'
                  : 'text-white hover:text-secondary-300'
                  } ${location.pathname === link.path ? 'border-b-2 border-secondary-500' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link
            to="/register"
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${scrolled
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-secondary-500 text-white hover:bg-secondary-600'
              } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none ${scrolled ? 'text-gray-800' : 'text-white'
              }`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium py-2 transition-colors duration-200 text-gray-800 hover:text-primary-600 ${location.pathname === link.path ? 'text-primary-600 font-semibold' : ''
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/register"
                className="bg-primary-600 text-white px-6 py-3 rounded-full font-medium text-center hover:bg-primary-700 transition-colors duration-200 mt-4"
              >
                Register Now
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;