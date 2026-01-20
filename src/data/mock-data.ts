import { Student, Teacher } from '../types';

// Mock data for teachers - Real Positive Image Schools Staff
export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Mrs Adegoke Reginah Anuoluwapo',
    photo: '/staffpositive2.jpg',
    subject: 'B.tech in Biochemistry',
    experience: 0,
    email: 'info@positiveimgeschools.com',
    bio: '',
    qualifications: ['B.tech in Biochemistry']
  },
  {
    id: '2',
    name: 'Mrs Adesina Kemi',
    photo: '/positive6.jpeg',
    subject: 'Estate Management',
    experience: 0,
    email: 'info@positiveimgeschools.com',
    bio: '',
    qualifications: ['Estate Management']
  },
  {
    id: '3',
    name: 'Mrs Olajide Mary',
    photo: '/staffpos.jpg',
    subject: 'HND - Electrical Engineering',
    experience: 0,
    email: 'info@positiveimgeschools.com',
    bio: '',
    qualifications: ['HND - Electrical Engineering']
  },
  {
    id: '4',
    name: 'Miss Dada Oluwaseun Oluwanifemi',
    photo: '/staffpostive3.jpg',
    subject: 'Political Science',
    experience: 0,
    email: 'info@positiveimgeschools.com',
    bio: '',
    qualifications: ['Political Science']
  },
  {
    id: '5',
    name: 'Miss Babatunde Abosede Janet',
    photo: '/staffpositive5.jpg',
    subject: 'Economics and Social Studies',
    experience: 0,
    email: 'info@positiveimgeschools.com',
    bio: '',
    qualifications: ['Economics and Social Studies']
  }
];

// Mock data for students - Updated with real school photos
export const students: Student[] = [
  {
    id: '1',
    fullName: 'Tunde Bakare',
    age: 14,
    class: 'JSS 3',
    parentName: 'Mr. & Mrs. Bakare',
    contactInfo: '+234 812 345 6789',
    address: '15 Adebayo Street, Amuloko, Ibadan',
    photo: '/positive2/ceoandstudent.JPG',
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
    photo: '/positive2/ceoandstud.jpg',
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
    photo: '/positive2/ceoandstud3.jpg',
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
    photo: '/positive2/ceoandpupils.jpeg',
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
    photo: '/students.jpg',
    registrationDate: '2023-09-01'
  }
];