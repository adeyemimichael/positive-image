import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Award, Users, Calendar, Mail, Phone } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  class: string;
  age: number;
  image: string;
  achievements: string[];
  subjects: string[];
}

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('');

  const students: Student[] = [
    {
      id: 1,
      name: "Adebayo Kemi",
      class: "SS3",
      age: 17,
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800",
      achievements: ["Best Student in Mathematics", "Science Quiz Champion"],
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology"]
    },
    {
      id: 2,
      name: "Olumide Tunde",
      class: "SS2",
      age: 16,
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=800",
      achievements: ["Football Team Captain", "Leadership Award"],
      subjects: ["English", "Government", "Economics", "Literature"]
    },
    {
      id: 3,
      name: "Folake Grace",
      class: "SS1",
      age: 15,
      image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
      achievements: ["Art Competition Winner", "Creative Writing Award"],
      subjects: ["Fine Arts", "English", "History", "Geography"]
    }
  ];

  const classes = ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6", "JSS 1", "JSS 2", "JSS 3", "SS1", "SS2", "SS3"];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === '' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="min-h-screen bg-white pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-black mb-6">
            Our Students
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Meet some of our outstanding students who represent the excellence and values of Positive Image Schools.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-black">Student Directory</h2>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search size={20} className="absolute left-3 top-3 text-gray-400" />
            </div>
            
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-100 rounded-lg shadow-lg overflow-hidden border-2 border-gray-300 hover:shadow-xl transition-shadow"
              >
                {/* Student Image */}
                <div className="h-64 overflow-hidden">
                  <img
                    src={student.image}
                    alt={student.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Student Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-black mb-1">{student.name}</h3>
                  <p className="text-lg text-blue-600 font-semibold mb-2">{student.class}</p>
                  <p className="text-sm text-gray-600 mb-4">Age: {student.age}</p>
                  
                  {/* Subjects */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-2 flex items-center">
                      <BookOpen className="mr-2 text-blue-600" size={16} />
                      Subjects
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {student.subjects.slice(0, 3).map((subject, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          {subject}
                        </span>
                      ))}
                      {student.subjects.length > 3 && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                          +{student.subjects.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-2 flex items-center">
                      <Award className="mr-2 text-green-600" size={16} />
                      Achievements
                    </h4>
                    <div className="space-y-1">
                      {student.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center text-xs text-gray-700">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No students found matching your search criteria.
              </p>
            </div>
          )}
        </div>

        {/* School Statistics */}
        <div className="bg-blue-600 rounded-lg p-8 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Student Body Statistics</h3>
            <p className="text-lg">Our diverse and talented student community</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-lg">Total Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-lg">Grade Levels</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-lg">Graduation Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-lg">Awards Won</div>
            </div>
          </div>
        </div>

        {/* Student Life Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Student Life at Positive Image Schools
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-100 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-black mb-2">Academic Excellence</h3>
              <p className="text-gray-700">
                Our students consistently achieve outstanding results in both internal and external examinations.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-100 rounded-lg">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-black mb-2">Extracurricular Activities</h3>
              <p className="text-gray-700">
                From sports to arts, our students participate in various activities that develop their talents.
              </p>
            </div>
            
            <div className="text-center p-6 bg-gray-100 rounded-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-black mb-2">Community Service</h3>
              <p className="text-gray-700">
                We encourage our students to give back to the community through various service projects.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;