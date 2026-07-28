import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-800 to-primary-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap size={32} className="text-secondary-500 mr-2" />
              <span className="font-heading font-bold text-xl">Positive Image Schools</span>
            </Link>
            <p className="mb-4">
              Providing quality education and character development for future leaders since 2003.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://web.facebook.com/profile.php?id=61592388328086" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary-400 transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.tiktok.com/@positiveimageschools" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-secondary-400 transition-colors"
                aria-label="Visit our TikTok page"
              >
                <TikTokIcon size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-secondary-400 transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-secondary-400 transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 border-b border-secondary-500 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-secondary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-secondary-400 transition-colors">Registration</Link>
              </li>
              <li>
                <Link to="/teachers" className="hover:text-secondary-400 transition-colors">Our Teachers</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-secondary-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 border-b border-secondary-500 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-secondary-500 mr-2 mt-1 flex-shrink-0" />
                <span>13 Sangogade Street Akoyoyo Area Amuloko, Ibadan</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="text-secondary-500 mr-2 mt-1 flex-shrink-0" />
                <span>Elebolo Junction,

Opposite Petrocam Gas Station Odeyale

Ajia, Ibadan, Oyo State

Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-secondary-500 mr-2 flex-shrink-0" />
                <span>+234 8152122218 / +234 8165318587</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-secondary-500 mr-2 flex-shrink-0" />
                <span>positiveimageschools@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* School Hours */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 border-b border-secondary-500 pb-2">
              School Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>7:30 AM - 3:30 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>8:00 AM - 12:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-blue-800 text-center">
          <p>
            &copy; {new Date().getFullYear()} Positive Image Schools. All rights reserved.
          </p>
          <p className="mt-2 text-sm text-white/60">
            <Link to="/admin" className="hover:text-secondary-400 transition-colors">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;