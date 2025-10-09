import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Award, Users, Target } from 'lucide-react';

interface ManagementMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  email: string;
  phone: string;
  linkedin?: string;
  achievements: string[];
  isCEO?: boolean;
}

const Management: React.FC = () => {
  const managementTeam: ManagementMember[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "Dr. Sarah Johnson brings over 20 years of experience in educational leadership and administration. She holds a Ph.D. in Educational Leadership from Harvard University and has been instrumental in transforming educational institutions across the country. Under her leadership, Positive Image Schools has achieved remarkable growth and recognition.",
      image: "/api/placeholder/300/300",
      email: "sarah.johnson@positiveimage.edu",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      achievements: [
        "20+ years in educational leadership",
        "Ph.D. in Educational Leadership - Harvard",
        "Transformed 15+ educational institutions",
        "National Education Excellence Award 2023"
      ],
      isCEO: true
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Chief Academic Officer",
      bio: "Michael Chen oversees all academic programs and curriculum development. With a Master's in Education from Stanford and 15 years of teaching experience, he ensures our educational standards remain at the forefront of modern pedagogy.",
      image: "/api/placeholder/300/300",
      email: "michael.chen@positiveimage.edu",
      phone: "+1 (555) 123-4568",
      achievements: [
        "M.Ed. from Stanford University",
        "15+ years teaching experience",
        "Curriculum Innovation Award 2022",
        "Published researcher in education"
      ]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Director of Operations",
      bio: "Emily Rodriguez manages daily operations and ensures smooth functioning of all school activities. Her MBA in Operations Management and 12 years of experience in educational administration make her invaluable to our team.",
      image: "/api/placeholder/300/300",
      email: "emily.rodriguez@positiveimage.edu",
      phone: "+1 (555) 123-4569",
      achievements: [
        "MBA in Operations Management",
        "12+ years in educational admin",
        "Operational Excellence Award 2023",
        "Process optimization specialist"
      ]
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Head of Student Affairs",
      bio: "David Thompson is dedicated to student welfare and development. With a background in psychology and student counseling, he ensures every student receives the support they need to thrive academically and personally.",
      image: "/api/placeholder/300/300",
      email: "david.thompson@positiveimage.edu",
      phone: "+1 (555) 123-4570",
      achievements: [
        "M.A. in Psychology",
        "Certified Student Counselor",
        "10+ years in student affairs",
        "Student Advocacy Award 2022"
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Our <span className="text-primary-600">Leadership</span> Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who guide Positive Image Schools towards excellence in education and student development.
          </p>
        </motion.div>

        {/* CEO Section - Special Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          {managementTeam
            .filter(member => member.isCEO)
            .map((ceo) => (
              <motion.div
                key={ceo.id}
                variants={itemVariants}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-500 opacity-10"></div>
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* CEO Image */}
                    <div className="relative overflow-hidden">
                      <img
                        src={ceo.image}
                        alt={ceo.name}
                        className="w-full h-96 md:h-full object-cover transform hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    
                    {/* CEO Info */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <h2 className="text-4xl font-bold text-gray-800 mb-2">{ceo.name}</h2>
                        <p className="text-2xl text-primary-600 font-semibold mb-4">{ceo.position}</p>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full"></div>
                      </div>
                      
                      <p className="text-gray-600 text-lg leading-relaxed mb-8">{ceo.bio}</p>
                      
                      {/* Achievements */}
                      <div className="mb-8">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                          <Award className="mr-2 text-primary-600" size={24} />
                          Key Achievements
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                          {ceo.achievements.map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center text-gray-600"
                            >
                              <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4">
                        <a
                          href={`mailto:${ceo.email}`}
                          className="flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full hover:bg-primary-200 transition-colors duration-200"
                        >
                          <Mail size={16} className="mr-2" />
                          Email
                        </a>
                        <a
                          href={`tel:${ceo.phone}`}
                          className="flex items-center px-4 py-2 bg-secondary-100 text-secondary-700 rounded-full hover:bg-secondary-200 transition-colors duration-200"
                        >
                          <Phone size={16} className="mr-2" />
                          Call
                        </a>
                        {ceo.linkedin && (
                          <a
                            href={ceo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
                          >
                            <Linkedin size={16} className="mr-2" />
                            LinkedIn
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {/* Other Management Team */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Management <span className="text-primary-600">Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementTeam
              .filter(member => !member.isCEO)
              .map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-500 group"
                >
                  {/* Member Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-lg text-primary-600 font-semibold mb-4">{member.position}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full mb-4"></div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.bio}</p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-gray-800 mb-3 flex items-center">
                        <Target className="mr-2 text-primary-600" size={16} />
                        Achievements
                      </h4>
                      <div className="space-y-2">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-600">
                            <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200 text-sm"
                      >
                        <Mail size={14} className="mr-1" />
                        Email
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex-1 flex items-center justify-center px-3 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors duration-200 text-sm"
                      >
                        <Phone size={14} className="mr-1" />
                        Call
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-8 text-white"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Leadership Excellence</h3>
            <p className="text-lg opacity-90">Our management team's combined experience and dedication</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">60+</div>
              <div className="text-lg opacity-90">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Awards & Recognitions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg opacity-90">Students Impacted</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Management;