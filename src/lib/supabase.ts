// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file:\n' +
    '- VITE_SUPABASE_URL\n' +
    '- VITE_SUPABASE_ANON_KEY'
  );
}

// Create and export Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Database Types (will be auto-generated in the future)
export interface Student {
  id: string;
  // Campus Information
  campus: string;
  
  // Personal Information
  full_name: string;
  date_of_birth: string;
  gender: string;
  state_of_origin?: string;
  local_government?: string;
  nationality?: string;
  religion?: string;
  blood_group?: string;
  medical_conditions?: string;
  passport_photo_url?: string;
  
  // Academic Information
  class_applying_for: string;
  previous_school?: string;
  previous_class?: string;
  reason_for_leaving?: string;
  
  // Parent/Guardian Information
  father_name?: string;
  father_occupation?: string;
  father_phone?: string;
  father_email?: string;
  mother_name?: string;
  mother_occupation?: string;
  mother_phone?: string;
  mother_email?: string;
  guardian_name?: string;
  guardian_relationship?: string;
  guardian_phone?: string;
  guardian_email?: string;
  
  // Contact Information
  home_address: string;
  city: string;
  state: string;
  postal_code?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship: string;
  
  // Additional Information
  special_needs?: string;
  extracurricular_interests?: string;
  how_did_you_hear?: string;
  additional_comments?: string;
  
  // Payment Information
  payment_reference?: string;
  payment_status?: string;
  payment_amount?: number;
  payment_date?: string;
  
  // Metadata
  registration_date?: string;
  registration_status?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: string;
  description: string;
  priority: string;
  image_url?: string;
  status?: string;
  upload_date?: string;
  published_date?: string;
  expires_date?: string;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  category: string;
  image_url: string;
  thumbnail_url?: string;
  campus?: string;
  display_order?: number;
  is_featured?: boolean;
  upload_date?: string;
  uploaded_by?: string;
  status?: string;
  created_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status?: string;
  response?: string;
  responded_at?: string;
  responded_by?: string;
  created_at?: string;
}

export interface Payment {
  id: string;
  student_id?: string;
  reference: string;
  amount: number;
  currency?: string;
  payment_type: string;
  status?: string;
  payment_method?: string;
  channel?: string;
  paystack_data?: any;
  authorization_code?: string;
  receipt_sent?: boolean;
  receipt_sent_at?: string;
  ip_address?: string;
  paid_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Teacher {
  id: string;
  name: string;
  photo_url?: string;
  subject: string;
  experience?: number;
  email: string;
  phone?: string;
  bio?: string;
  qualifications?: string[];
  campus?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
}
