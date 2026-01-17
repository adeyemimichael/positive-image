import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Linkedin, Award, Target, X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

interface ManagementMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  image: string;
  images?: string[]; 
  email: string;
  phone: string;
  linkedin?: string;
  achievements: string[];
  isCEO?: boolean;
}

const Management: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<{ images: string[]; name: string; position: string } | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const managementTeam: ManagementMember[] = [
    {
      id: 1,
      name: "Mr. Special Oladapo",
      position: "Chief Executive Officer",
      bio: "Mr. Special Oladapo is the visionary CEO of Positive Image Schools. With good experience in education and administration, His dedication to excellence has transformed the lives of hundreds of students.",
      image:"/positive/ceo1.jpg",
      email: "specialoladapo@gmail.com",
      phone: "+234 8165318587",
      linkedin: "https://linkedin.com/in/SpecialOladapo",
      achievements: [
        "7+ years in educational leadership",
        "B.Ed. University of Ibadan",
        "Oyo State Education Excellence Award 2022"
      ],
      isCEO: true
    },
    {
      id: 2,
      name: "Mrs. Folake Adebayo",
      position: "Vice Principal (Academic)",
      bio: "Mrs. Folake Adebayo oversees all academic programs and curriculum development. With her Master's in Education and 18 years of teaching experience, she ensures our educational standards remain excellent and innovative.",
      image: "/positive2/staffingcollections.jpg",
      email: "vp.academic@positiveimage.edu.ng",
      phone: "+234 803 123 4568",
      achievements: [
        "M.Ed. University of Lagos",
        "18+ years teaching experience",
        "Best Academic Coordinator 2021",
        "Curriculum development specialist"
      ]
    },
    {
      id: 3,
      name: "Mr. Johnson Olumide",
      position: "Vice Principal (Administration)",
      bio: "Mr. Johnson Olumide manages daily operations and administrative functions. His MBA in Management and 15 years of experience in educational administration ensure smooth school operations.",
      image: "/positive2/staffs.jpg",
      email: "vp.admin@positiveimage.edu.ng",
      phone: "+234 803 123 4569",
      achievements: [
        "MBA in Management - UI",
        "15+ years in educational admin",
        "Administrative Excellence Award 2022",
        "Operations management expert"
      ]
    },
    {
      id: 4,
      name: "Mrs. Grace Ogundimu",
      position: "Head of Teachers",
      bio: "Mrs. Grace Ogundimu leads our teaching staff and coordinates professional development. With her extensive experience in pedagogy, she ensures our teachers deliver quality education.",
      image: "/staffpositive2.jpg",
      email: "head.teachers@positiveimage.edu.ng",
      phone: "+234 803 123 4570",
      achievements: [
        "B.Ed. & M.Ed. University of Ibadan",
        "20+ years teaching experience",
        "Teacher Training Specialist",
        "Best Head of Department 2020"
      ]
    },
    {
      id: 5,
      name: "Babatunde Bosede Janet",
      position: "Bursar",
      bio: "Miss Babatunde Bosede Janet manages the school's financial operations and ensures fiscal responsibility. Her expertise in accounting and finance is excellent.",
      image: "/staffpositive5.jpg",
      email: "",
      phone: "",
      achievements: [
        "Economics and Social Studies (NCE)",
      ]
    },
    {
      id: 6,
      name: "Mrs. Kemi Adeyemi",
      position: "Head of Student Affairs",
      bio: "Mrs. Kemi Adeyemi is dedicated to student welfare and development. Her background in guidance and counseling ensures every student receives proper support and guidance.",
      image: "/positive2/staffing.JPG",
      email: "student.affairs@positiveimage.edu.ng",
      phone: "+234 803 123 4572",
      achievements: [
        "M.Ed. in Guidance & Counseling",
        "15+ years in student affairs",
        "Student Welfare Champion 2022",
        "Certified School Counselor"
      ]
    }
  ];

  const nextSlide = () => {
    if (selectedMember && selectedMember.images) {
      setCurrentSlideIndex((prev) => (prev + 1) % selectedMember.images.length);
    }
  };

  const prevSlide = () => {
    if (selectedMember && selectedMember.images) {
      setCurrentSlideIndex((prev) => (prev - 1 + selectedMember.images.length) % selectedMember.images.length);
    }
  };

  const openImageSlideshow = (member: ManagementMember) => {
    setSelectedMember({
      images: member.images || [member.image],
      name: member.name,
      position: member.position
    });
    setCurrentSlideIndex(0);
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            Our Leadership Team
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Meet the dedicated professionals who guide Positive Image Schools towards excellence in education and student development.
          </p>
        </div>

        {/* CEO Section - Image on Right */}
        <div className="mb-20">
          {managementTeam
            .filter(member => member.isCEO)
            .map((ceo) => (
              <div
                key={ceo.id}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* CEO Info */}
                  <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-black mb-2">{ceo.name}</h2>
                    <p className="text-xl text-blue-600 font-semibold mb-4">{ceo.position}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-primary-800 to-primary-800 mb-6"></div>
                    
                    <p className="text-gray-700 text-base leading-relaxed mb-6">{ceo.bio}</p>
                    
                    {/* Achievements */}
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-black mb-3">
                        Key Achievements
                      </h3>
                      <div className="space-y-2">
                        {ceo.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center text-gray-700">
                            <div className="w-2 h-2 bg-blue-800 rounded-full mr-3"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={`mailto:${ceo.email}`}
                        className="px-4 py-2 bg-gradient-to-r from-primary-800 to-primary-800  text-white rounded hover:bg-blue-700"
                      >
                        Email
                      </a>
                      <a
                        href={`tel:${ceo.phone}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Call
                      </a>
                    </div>
                  </div>

                  {/* CEO Image  */}
                  <div 
                    className="cursor-pointer relative overflow-hidden group"
                    onClick={() => openImageSlideshow(ceo)}
                  >
                    <img
                      src={ceo.image}
                      alt={ceo.name}
                      className="w-full h-full object-cover min-h-[500px] group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white rounded-full p-4 shadow-lg">
                          <ZoomIn size={32} className="text-blue-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Other Management Team */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Management Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-800 to-primary-800  mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementTeam
              .filter(member => !member.isCEO)
              .map((member) => (
                <div
                  key={member.id}
                  className="bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300"
                >
                  {/* Member Image */}
                  <div 
                    className="cursor-pointer"
                    onClick={() => openImageSlideshow(member)}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  
                  {/* Member Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-black mb-1">{member.name}</h3>
                    <p className="text-lg text-blue-600 font-semibold mb-4">{member.position}</p>
                    <div className="w-16 h-1 bg-gradient-to-r from-primary-800 to-primary-800 mb-4"></div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">{member.bio}</p>
                    
                    {/* Achievements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-black mb-2">
                        Achievements
                      </h4>
                      <div className="space-y-1">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="flex items-center text-xs text-gray-700">
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-800 to-primary-800  rounded-full mr-2"></div>
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Contact Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={`mailto:${member.email}`}
                        className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-primary-800 to-primary-800  text-white rounded hover:bg-blue-700 text-sm"
                      >
                        Email
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="flex-1 text-center px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary-800 to-primary-800  rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Leadership Excellence</h3>
            <p className="text-lg">Our management team's combined experience and dedication</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">60+</div>
              <div className="text-lg">Years Combined Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-lg">Awards & Recognitions</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg">Students Impacted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Slideshow Popup Modal */}
      {selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMember(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <X size={24} className="text-gray-600" />
            </button>

            {/* Slideshow Container */}
            <div className="relative">
              {/* Current Image */}
              <img
                src={selectedMember.images[currentSlideIndex]}
                alt={`${selectedMember.name} - Image ${currentSlideIndex + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
              />

              {/* Navigation Arrows */}
              {selectedMember.images.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronLeft size={24} className="text-gray-800" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all"
                  >
                    <ChevronRight size={24} className="text-gray-800" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {selectedMember.images.length > 1 && (
                <div className="absolute top-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                  {currentSlideIndex + 1} / {selectedMember.images.length}
                </div>
              )}
            </div>

            {/* Image info */}
            <div className="p-6 bg-gray-100">
              <h3 className="text-2xl font-bold text-black text-center mb-2">
                {selectedMember.name}
              </h3>
              <p className="text-lg text-gray-700 text-center mb-4">
                {selectedMember.position}
              </p>

              {/* Thumbnail Navigation */}
              {selectedMember.images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                  {selectedMember.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlideIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentSlideIndex === index 
                          ? 'border-blue-600 opacity-100' 
                          : 'border-gray-300 opacity-60 hover:opacity-80'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;