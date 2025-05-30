// Type definitions for the project

export interface Student {
  id: string;
  fullName: string;
  age: number;
  class: string;
  parentName: string;
  contactInfo: string;
  address: string;
  photo?: string; // URL to photo
  registrationDate: string;
}

export interface Teacher {
  id: string;
  name: string;
  photo: string;
  subject: string;
  experience: number;
  email: string;
  bio: string;
  qualifications: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}