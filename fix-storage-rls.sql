-- ============================================================================
-- FIX STORAGE RLS POLICIES AND BUCKETS FOR SUPABASE
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- 1. CREATE STORAGE BUCKETS (If not already created)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('student-photos', 'student-photos', true),
  ('announcement-images', 'announcement-images', true),
  ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 2. DROP OLD/CONFLICTING STORAGE POLICIES
DROP POLICY IF EXISTS "Public Read Storage" ON storage.objects;
DROP POLICY IF EXISTS "Public Insert Storage" ON storage.objects;
DROP POLICY IF EXISTS "Public Update Storage" ON storage.objects;
DROP POLICY IF EXISTS "Public Delete Storage" ON storage.objects;

DROP POLICY IF EXISTS "Anyone can access student photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can access announcement images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can access gallery images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public reads" ON storage.objects;

-- 3. CREATE PERMISSIVE STORAGE POLICIES
-- Allow public to SELECT/VIEW files in storage buckets
CREATE POLICY "Public Read Storage"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('student-photos', 'announcement-images', 'gallery-images'));

-- Allow public to INSERT/UPLOAD files to storage buckets
CREATE POLICY "Public Insert Storage"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id IN ('student-photos', 'announcement-images', 'gallery-images'));

-- Allow public to UPDATE files in storage buckets
CREATE POLICY "Public Update Storage"
  ON storage.objects FOR UPDATE
  USING (bucket_id IN ('student-photos', 'announcement-images', 'gallery-images'));

-- Allow public to DELETE files in storage buckets
CREATE POLICY "Public Delete Storage"
  ON storage.objects FOR DELETE
  USING (bucket_id IN ('student-photos', 'announcement-images', 'gallery-images'));

-- 4. CONFIRMATION MESSAGE
DO $$
BEGIN
  RAISE NOTICE '✅ Storage buckets and RLS policies updated successfully!';
  RAISE NOTICE '📦 Created / Updated buckets: student-photos, announcement-images, gallery-images';
  RAISE NOTICE '🔓 Public read, insert, update, and delete access granted.';
END $$;
