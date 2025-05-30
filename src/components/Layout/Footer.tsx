import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-700 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* School Information */}
          <div>
            <Link to="/" className="flex items-center mb-4">
              <GraduationCap size={32} className="text-secondary-500 mr-2" />
              <span className="font-heading font-bold text-xl">Positive Image Schools</span>
            </Link>
            <p className="mb-4">
              Providing quality education and character development for future leaders since 2005.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-secondary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-secondary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-secondary-400 transition-colors">
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
                <span>Amuloko Area, Ibadan, Oyo State, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-secondary-500 mr-2 flex-shrink-0" />
                <span>+234 803 123 4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-secondary-500 mr-2 flex-shrink-0" />
                <span>info@positiveimagesch.edu.ng</span>
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;