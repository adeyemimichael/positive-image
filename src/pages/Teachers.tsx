import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Mail } from 'lucide-react';
import { teachers } from '../data/mock-data';
import { Teacher } from '../types';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import { filterArrayBySearchTerm } from '../utils/helpers';

const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  // Get unique subjects for filter
  const subjects = [...new Set(teachers.map(teacher => teacher.subject))];

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle subject filter change
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  // Filter teachers based on search term and subject
  const filteredTeachers = teachers
    .filter(teacher => {
      // Apply subject filter if selected
      if (selectedSubject && teacher.subject !== selectedSubject) {
        return false;
      }
      return true;
    })
    .filter(teacher => {
      // Apply search filter
      if (!searchTerm.trim()) return true;
      
      const searchLower = searchTerm.toLowerCase();
      return (
        teacher.name.toLowerCase().includes(searchLower) ||
        teacher.subject.toLowerCase().includes(searchLower) ||
        teacher.bio.toLowerCase().includes(searchLower)
      );
    });

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 bg-primary-700">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Teachers</h1>
            <p className="text-xl opacity-90">
              Meet our dedicated team of experienced educators who inspire and guide our students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teachers List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-heading font-bold text-primary-700"
            >
              Teacher Directory
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full md:w-auto flex flex-col md:flex-row gap-4"
            >
              <div className="relative w-full md:w-60">
                <Input
                  id="search"
                  placeholder="Search teachers..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
                <Search size={20} className="absolute left-3 top-[13px] text-gray-400" />
              </div>
              
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={selectedSubject}
                onChange={handleSubjectChange}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Teachers Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredTeachers.length > 0 ? (
              filteredTeachers.map((teacher, index) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="h-60 overflow-hidden">
                      <img 
                        src={teacher.photo} 
                        alt={teacher.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-primary-700 mb-1">
                        {teacher.name}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {teacher.subject} • {teacher.experience} years experience
                      </p>
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {teacher.bio}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-800 mb-1">Qualifications</h4>
                        <ul className="text-sm text-gray-600">
                          {teacher.qualifications.map((qualification, idx) => (
                            <li key={idx} className="mb-1">• {qualification}</li>
                          ))}
                        </ul>
                      </div>
                      <a 
                        href={`mailto:${teacher.email}`}
                        className="inline-flex items-center text-primary-700 hover:text-primary-800 transition-colors"
                      >
                        <Mail size={18} className="mr-1" />
                        Contact
                      </a>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No teachers found matching your search criteria.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Teachers;