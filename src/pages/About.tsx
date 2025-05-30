import React from 'react';
import { motion } from 'framer-motion';
import { Book, Clock, MapPin, Goal } from 'lucide-react';

const About: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary-700">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">About Our School</h1>
            <p className="text-xl opacity-90">
              Discover the story, mission, and values that make Positive Image Schools a leader in education.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-heading font-bold text-primary-700 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Positive Image Schools was founded in 2005 with a vision to provide quality education 
                to children in Amuloko, Ibadan. What started as a small school with just three classrooms 
                has grown into a respected educational institution serving hundreds of students.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Over the years, we have built a reputation for academic excellence and character 
                development. Our graduates have gone on to excel in various fields, carrying with 
                them the values and knowledge instilled during their time at Positive Image Schools.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Today, we continue to evolve and improve our educational offerings while staying true 
                to our founding principles of excellence, integrity, and community service.
              </p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="rounded-lg overflow-hidden shadow-xl"
            >
              <img 
                src="https://images.pexels.com/photos/8617704/pexels-photo-8617704.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="School building" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-primary-700 mb-4">
              Our Mission & Vision
            </h2>
            <p className="text-gray-600 text-lg">
              Guiding principles that drive everything we do at Positive Image Schools.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Book className="text-primary-700" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary-700">Our Mission</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To provide a holistic educational experience that nurtures intellectual growth, 
                develops character, and empowers students to become responsible citizens who 
                positively impact their communities.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="bg-primary-100 p-3 rounded-full mr-4">
                  <Goal className="text-primary-700" size={24} />
                </div>
                <h3 className="text-2xl font-heading font-semibold text-primary-700">Our Vision</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                To be the leading educational institution in Ibadan, recognized for academic 
                excellence, innovative teaching methods, and producing well-rounded graduates 
                who are prepared to excel in a rapidly changing global environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Information */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-heading font-bold text-primary-700 mb-4">
              School Information
            </h2>
            <p className="text-gray-600 text-lg">
              Key details about our educational offerings and operations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                Academic Programs
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Early Childhood Education (Age 3-5)</li>
                <li>• Primary Education (Primary 1-6)</li>
                <li>• Junior Secondary (JSS 1-3)</li>
                <li>• Senior Secondary (SSS 1-3)</li>
              </ul>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                School Hours
              </h3>
              <div className="flex items-start mb-4">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Monday - Friday</p>
                  <p className="text-gray-700">7:30 AM - 3:30 PM</p>
                </div>
              </div>
              <div className="flex items-start mb-4">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Saturday (Tutorial)</p>
                  <p className="text-gray-700">8:00 AM - 12:00 PM</p>
                </div>
              </div>
              <div className="flex items-start">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Administrative Office</p>
                  <p className="text-gray-700">8:00 AM - 4:00 PM (Mon-Fri)</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-heading font-semibold text-primary-700 mb-4 border-b border-gray-200 pb-2">
                Location
              </h3>
              <div className="flex items-start">
                <MapPin size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Our Address</p>
                  <p className="text-gray-700">123 Education Road</p>
                  <p className="text-gray-700">Amuloko Area</p>
                  <p className="text-gray-700">Ibadan, Oyo State</p>
                  <p className="text-gray-700">Nigeria</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;