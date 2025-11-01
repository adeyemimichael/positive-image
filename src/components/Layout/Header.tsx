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
    { name: 'Staff', path: '/teachers' },
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
        <Link to="/" className="flex items-center group">
          {/* Logo Image */}
          <div className="relative">
            <img
              src="/logo.png" // You can replace this with your actual logo path
              alt="Positive Image Schools Logo"
              className={`transition-all duration-300 ${
                scrolled ? 'h-12 w-12' : 'h-14 w-14'
              } object-contain mr-3 group-hover:scale-105`}
              onError={(e) => {
                // Fallback to icon if image fails to load
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback Icon (hidden by default) */}
            <GraduationCap
              size={scrolled ? 48 : 56}
              className={`hidden ${scrolled ? 'text-[#1B1464]' : 'text-white'} mr-3 group-hover:scale-105 transition-all duration-300`}
            />
          </div>
          
          {/* School Name */}
          <div className="flex flex-col">
            <span
              className={`font-heading font-bold transition-all duration-300 ${
                scrolled ? 'text-[#1B1464] text-lg' : 'text-white text-xl'
              } leading-tight`}
            >
              Positive Image Schools
            </span>
            <span
              className={`font-medium transition-all duration-300 ${
                scrolled ? 'text-[#6FC1FF] text-xs' : 'text-[#FFF4B2] text-sm'
              } leading-tight`}
            >
              Excellence in Education
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${scrolled
                  ? 'text-[#1B1464] hover:text-[#D6261D]'
                  : 'text-white hover:text-[#FFF4B2]'
                  } ${location.pathname === link.path ? 'border-b-2 border-[#6FC1FF]' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <Link
            to="/register"
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${scrolled
              ? 'bg-[#D6261D] text-white hover:bg-[#D6261D]/90'
              : 'bg-[#FFF4B2] text-[#1B1464] hover:bg-[#FFF4B2]/90'
              } shadow-lg hover:shadow-xl transform hover:scale-105`}
          >
            Register Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className={`p-2 focus:outline-none ${scrolled ? 'text-[#1B1464]' : 'text-white'
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
                  className={`font-medium py-2 transition-colors duration-200 text-[#1B1464] hover:text-[#D6261D] ${location.pathname === link.path ? 'text-[#D6261D] font-semibold' : ''
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/register"
                className="bg-[#D6261D] text-white px-6 py-3 rounded-full font-medium text-center hover:bg-[#D6261D]/90 transition-colors duration-200 mt-4"
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