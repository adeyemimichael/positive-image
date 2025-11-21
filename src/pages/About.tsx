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
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                Positive Image Schools was founded in 2003 with a vision to provide quality education 
                to children in and around Ibadan. What started as a divine idea
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
                src="./public/fullstaff.jpg" 
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
              <p className="text-gray-700 text-lg leading-relaxed">
                To offer standard and qualitative education to all <br/>
               To contribute to the transformation of societies through qualitative teaching <br/>
                To make all children, stars in their fields of learning, careers and gifts.
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
              <p className="text-gray-700  text-lg leading-relaxed">
                To be a world class center for excellence  <br/>
                To produce Graduates who are worthy in character.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* School Anthem Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center max-w-4xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-700 mb-4">
              Our School Anthem
            </h2>
            <p className="text-gray-600 text-lg">
              The song that unites us all and embodies our school spirit and values.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Anthem Lyrics */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">
                  Positive Image"
                </h3>
                <p className="text-gray-600 italic">Official School Anthem</p>
              </div>

              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div className="text-center">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 1:</h4>
                  <p className="italic">
                   Positive! Positive!! Positive Image There I go, there you go<br/>
                   Go to learn for life, May the God of Universe, Make me reach my goal,<br/> In future to become a future leader.
                  </p>
                </div>

                <div className="text-center bg-primary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 2.</h4>
                  <p className="italic font-medium">
                    No matter what situation, I will still be there.<br/>
                      Because I want to become Success in my life.<br/>
                        No matter what devil say, No controversy,<br/>
                          Positive! Positive!! Positive Image.

                  </p>
                </div>

                <div className="text-center">
                  <h4 className="font-semibold text-primary-600 mb-3">Verse 3.</h4>
                  <p className="italic">
                    Proprietor, our teachers and our Parents Let us reason together,<br/>
                    To make a progress. Payment of our School levies is our concern.<br/>
                    Divided we fall, United we stand.

                  </p>
                </div>

                <div className="text-center bg-secondary-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-secondary-600 mb-3">Bridge:</h4>
                  <p className="italic">
                    Glory! Glory! Glory! Positive Image<br/>
                      Wisdom embassy, Positive Image, No matter what devil say,<br/>
                        We will overcome
                          Overcome, Overcome, Positive Image.
                  </p>
                </div>

              
              </div>
            </motion.div>

            {/* Media Player Section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="bg-white rounded-2xl shadow-xl p-8 border border-primary-100"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-heading font-bold text-primary-700 mb-2">
                  Listen to Our Anthem
                </h3>
                <p className="text-gray-600">Experience the spirit of Positive Image Schools</p>
              </div>

              {/* Custom Audio Player */}
              <div className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">Positive Image Anthem</h4>
                    <p className="text-primary-200 text-sm">School Choir Performance</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary-200 text-sm">Duration</p>
                    <p className="font-semibold">3:45</p>
                  </div>
                </div>

                {/* Audio Element */}
                <audio 
                  controls 
                  className="w-full mb-4"
                  style={{
                    filter: 'invert(1) hue-rotate(180deg)',
                    borderRadius: '8px'
                  }}
                >
                  <source src="/audio/school-anthem.mp3" type="audio/mpeg" />
                  <source src="/audio/school-anthem.ogg" type="audio/ogg" />
                  Your browser does not support the audio element.
                </audio>

                <div className="flex items-center justify-between text-sm text-primary-200">
                  <span>🎵 Recorded: 2023</span>
                  <span>🎤 School Choir</span>
                  <span>🎼 Live Performance</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">About This Recording</h4>
                  <p className="text-gray-600 text-sm">
                    This beautiful rendition was performed by our school choir during the 
                    2023 Founders' Day celebration. 
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary-600">15</div>
                    <div className="text-sm text-gray-600">Choir Members</div>
                  </div>
                  <div className="bg-secondary-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-secondary-600">20+</div>
                    <div className="text-sm text-gray-600">Years Sung</div>
                  </div>
                </div>

                {/* Download Options */}
                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Download Options</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm hover:bg-primary-700 transition-colors">
                      MP3 Format
                    </button>
                    
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors">
                      Lyrics PDF
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Anthem Performance Schedule */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="mt-16 bg-white rounded-2xl shadow-lg p-8 border border-primary-100"
          >
            <h3 className="text-2xl font-heading font-bold text-primary-700 mb-6 text-center">
              When We Sing Our Anthem
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl mb-2">🌅</div>
                <h4 className="font-semibold text-primary-700">Morning Assembly</h4>
                <p className="text-gray-600 text-sm">Every school day at 7:45 AM</p>
              </div>
              <div className="text-center p-4 bg-secondary-50 rounded-lg">
                <div className="text-3xl mb-2">🎉</div>
                <h4 className="font-semibold text-secondary-700">Special Events</h4>
                <p className="text-gray-600 text-sm">Graduations, Sports Day, Cultural Day</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🏆</div>
                <h4 className="font-semibold text-green-700">Achievements</h4>
                <p className="text-gray-600 text-sm">Award ceremonies and celebrations</p>
              </div>
            </div>
          </motion.div>
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
              {/* <div className="flex items-start mb-4">
                <Clock size={20} className="text-primary-700 mr-2 mt-1" />
                <div>
                  <p className="font-medium">Saturday (Tutorial)</p>
                  <p className="text-gray-700">8:00 AM - 12:00 PM</p>
                </div>
              </div> */}
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
              <div className="flex items-start flex-col">
                <MapPin size={24} className="text-primary-700 mr-2 mt-1 " />
                <div className='w-full p-4 '>
                  <p className="font-medium text-lg">Our Address</p>
                  <p className="text-gray-700">13 Sangogade Street</p>
                  <p className="text-gray-700">Akoyoyo Area</p>
                  <p className="text-gray-700"> Amuloko, Ibadan, Oyo State</p>
                  <p className="text-gray-700">Nigeria</p>
                </div>
                 <div className='w-full p-4 '>
                  <p className="font-medium text-lg">Our Address 2</p>
                  <p className="text-gray-700">Elebolo Junction,</p>
                                        <p className="text-gray-700">Opposite Petrocam Gas Station Odeyale</p>
                                        <p className="text-gray-700"> Ajia, Ibadan, Oyo State</p>
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