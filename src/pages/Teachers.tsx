import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ZoomIn } from 'lucide-react';
import { teachers as mockTeachers } from '../data/mock-data';
import { getTeachers } from '../services/teacherService';
import { Teacher } from '../lib/supabase';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; subject: string } | null>(null);

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch teachers from Supabase
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const fetchedTeachers = await getTeachers();
        if (fetchedTeachers.length > 0) {
          setTeachers(fetchedTeachers);
        } else {
          // Fallback to mock data if DB is empty
          const formattedMock: Teacher[] = mockTeachers.map((t: any) => ({
            ...t,
            photo_url: t.photo
          }));
          setTeachers(formattedMock);
        }
      } catch (error) {
        console.error('Error fetching teachers:', error);
        // Fallback to mock data
        const formattedMock: Teacher[] = mockTeachers.map((t: any) => ({
          ...t,
          photo_url: t.photo
        }));
        setTeachers(formattedMock);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Our Staff</h1>
            <p className="text-xl opacity-90">
              Meet our dedicated team of experienced educators and staff members who inspire and guide our students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO and Staff Group Photos Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CEO with Staff Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-2xl shadow-xl group"
            >
              <img 
                src="/positive2/ceoandstaff.jpg" 
                alt="CEO with Staff" 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">Leadership & Staff</h3>
                <p className="text-white/90 text-sm">Our dedicated team working together</p>
              </div>
            </motion.div>

            {/* Full Staff Photo */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative overflow-hidden rounded-2xl shadow-xl group"
            >
              <img 
                src="/fullstaff.JPG" 
                alt="Full Staff Team" 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h3 className="text-white text-xl font-bold">Our Complete Team</h3>
                <p className="text-white/90 text-sm">United in excellence and dedication</p>
              </div>
            </motion.div>
          </div>
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
              Staff Directory
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
                  placeholder="Search staff..."
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
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : (
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
                  <Card className="h-full overflow-hidden group hover:shadow-xl transition-all duration-300">
                    {/* Image takes most of the card */}
                      <div 
                        className="h-96 overflow-hidden relative cursor-pointer bg-gray-100"
                        onClick={() => setSelectedImage({ url: teacher.photo_url || '', subject: teacher.name })}
                      >
                        <img 
                          src={teacher.photo_url} 
                          alt={teacher.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/logo.jpg';
                          }}
                        />
                      {/* Overlay gradient for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Zoom icon on hover */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                          <ZoomIn size={24} className="text-primary-600" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Staff name and qualification */}
                    <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
                      <div className="text-center">
                        <h3 className="text-xl font-heading font-bold text-primary-700 mb-2">
                          {teacher.name}
                        </h3>
                        <p className="text-sm text-gray-600 italic">
                          ({teacher.subject})
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg">
                  No staff members found matching your search criteria.
                </p>
              </div>
            )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Popup Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.subject}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              {/* Image info */}
              <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50">
                <h3 className="text-2xl font-heading font-bold text-primary-700 text-center">
                  {selectedImage.subject}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Teachers;