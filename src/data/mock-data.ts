import { Student, Teacher } from '../types';

// Mock data for teachers
export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Dr. Adebayo Johnson',
    photo: 'https://images.pexels.com/photos/5212324/pexels-photo-5212324.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subject: 'Mathematics',
    experience: 15,
    email: 'adebayo.johnson@example.com',
    bio: 'Dr. Johnson has a PhD in Mathematics and has been teaching for 15 years. He specializes in advanced calculus and statistics.',
    qualifications: ['PhD Mathematics', 'B.Sc Mathematics Education']
  },
  {
    id: '2',
    name: 'Mrs. Folake Adeniran',
    photo: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subject: 'English Language',
    experience: 10,
    email: 'folake.adeniran@example.com',
    bio: 'Mrs. Adeniran is passionate about literature and creative writing. She has published several articles on language education.',
    qualifications: ['M.A English Literature', 'B.A English']
  },
  {
    id: '3',
    name: 'Mr. Chinedu Okafor',
    photo: 'https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subject: 'Physics',
    experience: 8,
    email: 'chinedu.okafor@example.com',
    bio: 'Mr. Okafor brings practical experience to his physics classes, having worked in engineering before becoming a teacher.',
    qualifications: ['M.Sc Physics', 'B.Eng Electrical Engineering']
  },
  {
    id: '4',
    name: 'Ms. Amina Bello',
    photo: 'https://images.pexels.com/photos/5212696/pexels-photo-5212696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subject: 'Biology',
    experience: 7,
    email: 'amina.bello@example.com',
    bio: 'Ms. Bello specializes in molecular biology and makes complex concepts accessible through interactive learning.',
    qualifications: ['M.Sc Biological Sciences', 'B.Sc Biology']
  },
  {
    id: '5',
    name: 'Mr. Oluwaseun Adeniyi',
    photo: 'https://images.pexels.com/photos/8617857/pexels-photo-8617857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    subject: 'Computer Science',
    experience: 5,
    email: 'oluwaseun.adeniyi@example.com',
    bio: 'Mr. Adeniyi is a former software developer who now teaches programming and computer science fundamentals.',
    qualifications: ['M.Sc Computer Science', 'B.Sc Computer Engineering']
  }
];

// Mock data for students
export const students: Student[] = [
  {
    id: '1',
    fullName: 'Tunde Bakare',
    age: 14,
    class: 'JSS 3',
    parentName: 'Mr. & Mrs. Bakare',
    contactInfo: '+234 812 345 6789',
    address: '15 Adebayo Street, Amuloko, Ibadan',
    photo: 'https://images.pexels.com/photos/5212339/pexels-photo-5212339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registrationDate: '2023-08-15'
  },
  {
    id: '2',
    fullName: 'Chioma Okonkwo',
    age: 16,
    class: 'SSS 2',
    parentName: 'Dr. Okonkwo',
    contactInfo: '+234 802 123 4567',
    address: '7B Adeleke Avenue, Amuloko, Ibadan',
    photo: 'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registrationDate: '2021-09-03'
  },
  {
    id: '3',
    fullName: 'Ibrahim Musa',
    age: 12,
    class: 'JSS 1',
    parentName: 'Alhaji & Hajia Musa',
    contactInfo: '+234 705 678 1234',
    address: '23 Oguntola Close, Amuloko, Ibadan',
    photo: 'https://images.pexels.com/photos/16277717/pexels-photo-16277717/free-photo-of-young-african-american-schoolboy-posing-for-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registrationDate: '2024-01-10'
  },
  {
    id: '4',
    fullName: 'Funke Adeyemi',
    age: 15,
    class: 'SSS 1',
    parentName: 'Mr. & Mrs. Adeyemi',
    contactInfo: '+234 809 345 6789',
    address: '45 Ilesanmi Street, Amuloko, Ibadan',
    photo: 'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registrationDate: '2022-09-05'
  },
  {
    id: '5',
    fullName: 'David Obasanjo',
    age: 13,
    class: 'JSS 2',
    parentName: 'Chief & Mrs. Obasanjo',
    contactInfo: '+234 803 987 6543',
    address: '12 Akinola Road, Amuloko, Ibadan',
    photo: 'https://images.pexels.com/photos/8617546/pexels-photo-8617546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    registrationDate: '2023-09-01'
  }
];