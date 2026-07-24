-- Fix RLS Policies for Public Access
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/dsfmdkvlterqynsjznhr/sql

-- ============================================================================
-- 1. DROP EXISTING RESTRICTIVE POLICIES
-- ============================================================================

-- Drop all existing policies on announcements
DROP POLICY IF EXISTS "Public can view active announcements" ON announcements;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON announcements;
DROP POLICY IF EXISTS "Enable read access for all users" ON announcements;

-- Drop all existing policies on students
DROP POLICY IF EXISTS "Public can register students" ON students;
DROP POLICY IF EXISTS "Public can view own student record" ON students;
DROP POLICY IF EXISTS "Public can update student payment" ON students;
DROP POLICY IF EXISTS "Enable insert for all users" ON students;

-- Drop all existing policies on contact_messages
DROP POLICY IF EXISTS "Public can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Enable insert for all users" ON contact_messages;

-- ============================================================================
-- 2. CREATE NEW PERMISSIVE POLICIES
-- ============================================================================

-- ANNOUNCEMENTS: Allow public read and write
CREATE POLICY "Anyone can view announcements"
  ON announcements FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create announcements"
  ON announcements FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update announcements"
  ON announcements FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete announcements"
  ON announcements FOR DELETE
  USING (true);

-- STUDENTS: Allow public read and write
CREATE POLICY "Anyone can view students"
  ON students FOR SELECT
  USING (true);

CREATE POLICY "Anyone can register students"
  ON students FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can update students"
  ON students FOR UPDATE
  USING (true);

-- CONTACT MESSAGES: Allow public write
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view contact messages"
  ON contact_messages FOR SELECT
  USING (true);

-- PAYMENTS: Allow public read and write
CREATE POLICY "Anyone can create payments"
  ON payments FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view payments"
  ON payments FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update payments"
  ON payments FOR UPDATE
  USING (true);

-- GALLERY IMAGES: Allow public read
CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  USING (true);

CREATE POLICY "Anyone can create gallery images"
  ON gallery_images FOR INSERT
  WITH CHECK (true);

-- TEACHERS: Allow public read
CREATE POLICY "Anyone can view teachers"
  ON teachers FOR SELECT
  USING (true);

-- ============================================================================
-- 3. VERIFY POLICIES
-- ============================================================================

-- Show all policies for announcements
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'announcements';

-- Show all policies for students
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'students';

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================

DO $$
BEGIN
  RAISE NOTICE '✅ RLS policies updated successfully!';
  RAISE NOTICE '📝 Announcements: Full public access enabled';
  RAISE NOTICE '👨‍🎓 Students: Full public access enabled';
  RAISE NOTICE '📧 Contact Messages: Public write access enabled';
  RAISE NOTICE '';
  RAISE NOTICE '⚠️  NOTE: This allows anyone to create/edit/delete.';
  RAISE NOTICE '🔐 For production, implement proper authentication.';
END $$;
