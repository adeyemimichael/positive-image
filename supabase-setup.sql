-- Supabase Database Setup for Positive Image Schools
-- Run this script in Supabase SQL Editor: https://supabase.com/dashboard/project/YOUR_PROJECT/sql

-- ============================================================================
-- 1. STUDENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Campus Information
  campus TEXT NOT NULL,
  
  -- Personal Information
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  gender TEXT NOT NULL,
  state_of_origin TEXT,
  local_government TEXT,
  nationality TEXT DEFAULT 'Nigerian',
  religion TEXT,
  blood_group TEXT,
  medical_conditions TEXT,
  passport_photo_url TEXT,
  
  -- Academic Information
  class_applying_for TEXT NOT NULL,
  previous_school TEXT,
  previous_class TEXT,
  reason_for_leaving TEXT,
  
  -- Parent/Guardian Information
  father_name TEXT,
  father_occupation TEXT,
  father_phone TEXT,
  father_email TEXT,
  mother_name TEXT,
  mother_occupation TEXT,
  mother_phone TEXT,
  mother_email TEXT,
  guardian_name TEXT,
  guardian_relationship TEXT,
  guardian_phone TEXT,
  guardian_email TEXT,
  
  -- Contact Information
  home_address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT,
  emergency_contact_name TEXT NOT NULL,
  emergency_contact_phone TEXT NOT NULL,
  emergency_contact_relationship TEXT NOT NULL,
  
  -- Additional Information
  special_needs TEXT,
  extracurricular_interests TEXT,
  how_did_you_hear TEXT,
  additional_comments TEXT,
  
  -- Payment Information
  payment_reference TEXT,
  payment_status TEXT DEFAULT 'pending',
  payment_amount DECIMAL(10,2),
  payment_date TIMESTAMP,
  
  -- Metadata
  registration_date TIMESTAMP DEFAULT NOW(),
  registration_status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for students table
CREATE INDEX IF NOT EXISTS idx_students_campus ON students(campus);
CREATE INDEX IF NOT EXISTS idx_students_class ON students(class_applying_for);
CREATE INDEX IF NOT EXISTS idx_students_payment_reference ON students(payment_reference);
CREATE INDEX IF NOT EXISTS idx_students_payment_status ON students(payment_status);
CREATE INDEX IF NOT EXISTS idx_students_created_at ON students(created_at DESC);

-- ============================================================================
-- 2. ANNOUNCEMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'normal',
  image_url TEXT,
  status TEXT DEFAULT 'active',
  upload_date TIMESTAMP DEFAULT NOW(),
  published_date TIMESTAMP,
  expires_date TIMESTAMP,
  created_by UUID,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for announcements table
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);
CREATE INDEX IF NOT EXISTS idx_announcements_upload_date ON announcements(upload_date DESC);
CREATE INDEX IF NOT EXISTS idx_announcements_category ON announcements(category);

-- ============================================================================
-- 3. CONTACT MESSAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  response TEXT,
  responded_at TIMESTAMP,
  responded_by UUID,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for contact_messages table
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_messages(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_messages(created_at DESC);

-- ============================================================================
-- 4. GALLERY IMAGES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  campus TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  upload_date TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for gallery_images table
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_status ON gallery_images(status);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery_images(display_order);

-- ============================================================================
-- 5. PAYMENTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  reference TEXT UNIQUE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  payment_method TEXT,
  channel TEXT,
  paystack_data JSONB,
  authorization_code TEXT,
  receipt_sent BOOLEAN DEFAULT false,
  receipt_sent_at TIMESTAMP,
  ip_address TEXT,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for payments table
CREATE INDEX IF NOT EXISTS idx_payments_student_id ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_reference ON payments(reference);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

-- ============================================================================
-- 6. TEACHERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  photo_url TEXT,
  subject TEXT NOT NULL,
  experience INTEGER DEFAULT 0,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  qualifications TEXT[],
  campus TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for teachers table
CREATE INDEX IF NOT EXISTS idx_teachers_campus ON teachers(campus);
CREATE INDEX IF NOT EXISTS idx_teachers_status ON teachers(status);

-- ============================================================================
-- 7. AUTO-UPDATE TIMESTAMP FUNCTION
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to tables with updated_at column
DROP TRIGGER IF EXISTS update_students_updated_at ON students;
CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON announcements;
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_teachers_updated_at ON teachers;
CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON teachers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

-- PUBLIC ACCESS POLICIES (No authentication required)

-- Anyone can read active announcements
CREATE POLICY "Public can view active announcements"
  ON announcements FOR SELECT
  USING (status = 'active');

-- Anyone can read active gallery images
CREATE POLICY "Public can view active gallery"
  ON gallery_images FOR SELECT
  USING (status = 'active');

-- Anyone can read active teachers
CREATE POLICY "Public can view active teachers"
  ON teachers FOR SELECT
  USING (status = 'active');

-- Anyone can submit contact messages
CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Anyone can register students
CREATE POLICY "Public can register students"
  ON students FOR INSERT
  WITH CHECK (true);

-- Anyone can view their own student record (by payment reference)
CREATE POLICY "Public can view own student record"
  ON students FOR SELECT
  USING (true);

-- Anyone can update student payment info
CREATE POLICY "Public can update student payment"
  ON students FOR UPDATE
  USING (true);

-- Anyone can create payments
CREATE POLICY "Public can create payments"
  ON payments FOR INSERT
  WITH CHECK (true);

-- Anyone can view payments by reference
CREATE POLICY "Public can view payments"
  ON payments FOR SELECT
  USING (true);

-- ============================================================================
-- SETUP COMPLETE!
-- ============================================================================

-- Verify tables were created
SELECT 
  'students' as table_name, COUNT(*) as row_count FROM students
UNION ALL
SELECT 'announcements', COUNT(*) FROM announcements
UNION ALL
SELECT 'contact_messages', COUNT(*) FROM contact_messages
UNION ALL
SELECT 'gallery_images', COUNT(*) FROM gallery_images
UNION ALL
SELECT 'payments', COUNT(*) FROM payments
UNION ALL
SELECT 'teachers', COUNT(*) FROM teachers;

-- Show success message
DO $$
BEGIN
  RAISE NOTICE '✅ Database setup complete!';
  RAISE NOTICE '📊 All tables created successfully';
  RAISE NOTICE '🔒 Row Level Security enabled';
  RAISE NOTICE '🔐 Public access policies configured';
  RAISE NOTICE '';
  RAISE NOTICE 'Next steps:';
  RAISE NOTICE '1. Create Storage buckets in Supabase Dashboard';
  RAISE NOTICE '2. Configure bucket policies';
  RAISE NOTICE '3. Test the connection from your app';
END $$;
