import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { students } from '../data/mock-data';
import { Student } from '../types';
import Card from '../components/UI/Card';
import Input from '../components/UI/Input';
import { formatDate, filterArrayBySearchTerm } from '../utils/helpers';

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Student | null;
    direction: 'ascending' | 'descending';
  }>({ key: null, direction: 'ascending' });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle sorting
  const requestSort = (key: keyof Student) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered students
  const getSortedStudents = () => {
    // First filter by search term
    let filteredStudents = filterArrayBySearchTerm<Student>(
      students,
      searchTerm,
      ['fullName', 'class', 'parentName']
    );

    // Then sort if necessary
    if (sortConfig.key) {
      filteredStudents = [...filteredStudents].sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredStudents;
  };

  const sortedStudents = getSortedStudents();

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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Students</h1>
            <p className="text-xl opacity-90">
              Meet the bright minds that make up our school community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Students List Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-3xl font-heading font-bold text-primary-700 mb-4 md:mb-0"
            >
              Student Directory
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative w-full md:w-80"
            >
              <Input
                id="search"
                placeholder="Search students..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
              <Search size={20} className="absolute left-3 top-[13px] text-gray-400" />
            </motion.div>
          </div>

          {/* Students Table */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="overflow-x-auto bg-white rounded-lg shadow"
          >
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium"
                      onClick={() => requestSort('fullName')}
                    >
                      Student
                      {sortConfig.key === 'fullName' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp size={16} className="ml-1" /> 
                          : <ChevronDown size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium"
                      onClick={() => requestSort('class')}
                    >
                      Class
                      {sortConfig.key === 'class' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp size={16} className="ml-1" /> 
                          : <ChevronDown size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium"
                      onClick={() => requestSort('age')}
                    >
                      Age
                      {sortConfig.key === 'age' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp size={16} className="ml-1" /> 
                          : <ChevronDown size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parent
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button 
                      className="flex items-center font-medium"
                      onClick={() => requestSort('registrationDate')}
                    >
                      Registered
                      {sortConfig.key === 'registrationDate' && (
                        sortConfig.direction === 'ascending' 
                          ? <ChevronUp size={16} className="ml-1" /> 
                          : <ChevronDown size={16} className="ml-1" />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedStudents.length > 0 ? (
                  sortedStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                            {student.photo ? (
                              <img src={student.photo} alt={student.fullName} className="h-full w-full object-cover" />
                            ) : (
                              <div className="h-full w-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                                {student.fullName.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{student.fullName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.class}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.age} years</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.parentName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{student.contactInfo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(student.registrationDate)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                      No students found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </motion.div>

          {/* Student cards for mobile view */}
          <div className="md:hidden mt-8 grid gap-4">
            {sortedStudents.length > 0 ? (
              sortedStudents.map((student) => (
                <motion.div 
                  key={student.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-4">
                    <div className="flex items-center mb-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        {student.photo ? (
                          <img src={student.photo} alt={student.fullName} className="h-full w-full object-cover" />
                        ) : (
                          <div className="h-full w-full bg-primary-200 flex items-center justify-center text-primary-700 font-bold">
                            {student.fullName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{student.fullName}</h3>
                        <p className="text-sm text-gray-600">{student.class} • {student.age} years</p>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <p className="text-sm"><span className="font-medium">Parent:</span> {student.parentName}</p>
                      <p className="text-sm"><span className="font-medium">Contact:</span> {student.contactInfo}</p>
                      <p className="text-sm"><span className="font-medium">Registered:</span> {formatDate(student.registrationDate)}</p>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                No students found matching your search criteria.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Students;