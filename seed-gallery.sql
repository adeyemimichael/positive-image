-- ============================================================================
-- SEED GALLERY IMAGES AND VIDEOS INTO SUPABASE DATABASE
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- Step 1: Ensure columns exist
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image';
ALTER TABLE gallery_images ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Step 2: Clear old default images if re-seeding (optional - comment out if preserving custom uploads)
-- DELETE FROM gallery_images WHERE status = 'active';

-- Step 3: Insert Curated Gallery Media (Photos & Videos)
INSERT INTO gallery_images (title, category, description, image_url, video_url, media_type, thumbnail_url, status, display_order, is_featured)
VALUES
-- PHOTO 1
(
  'School Facilities',
  'Facilities',
  'Our modern facilities provide excellent learning environment for students',
  '/positive2/facility.jpeg',
  NULL,
  'image',
  '/positive2/facility.jpeg',
  'active',
  1,
  true
),
-- PHOTO 2
(
  'Primary School Section',
  'Campus',
  'Dedicated primary school section with age-appropriate facilities',
  '/positive2/primaryschool.jpeg',
  NULL,
  'image',
  '/positive2/primaryschool.jpeg',
  'active',
  2,
  true
),
-- PHOTO 3
(
  'Science Practicals',
  'Facilities',
  'Students engaged in hands-on science experiments and practicals',
  '/positive2/practicals.jpeg',
  NULL,
  'image',
  '/positive2/practicals.jpeg',
  'active',
  3,
  true
),
-- PHOTO 4
(
  'Cultural Day Celebration',
  'Events',
  'Vibrant cultural heritage performance and celebration by Positive Image pupils',
  '/culture.jpg',
  NULL,
  'image',
  '/culture.jpg',
  'active',
  4,
  true
),
-- PHOTO 5
(
  'Full Staff Assembly',
  'Campus',
  'Complete staff team photo showcasing our dedicated educational family',
  '/fullstaff.JPG',
  NULL,
  'image',
  '/fullstaff.JPG',
  'active',
  5,
  true
),
-- PHOTO 6
(
  'Educational Excursion',
  'Events',
  'Students on exciting educational field trips and excursions',
  '/positive2/smallexcursion.jpeg',
  NULL,
  'image',
  '/positive2/smallexcursion.jpeg',
  'active',
  6,
  false
),
-- PHOTO 7
(
  'Asa Culture Showcase',
  'Events',
  'Rich traditional cultural display showcasing students talent and heritage',
  '/asa.jpg',
  NULL,
  'image',
  '/asa.jpg',
  'active',
  7,
  false
),
-- PHOTO 8
(
  'Interactive Learning',
  'Student Life',
  'Students enjoying engaging classroom activities and mentorship',
  '/poitive%20folder/WhatsApp%20Image%202026-07-24%20at%2022.54.30.jpeg',
  NULL,
  'image',
  '/poitive%20folder/WhatsApp%20Image%202026-07-24%20at%2022.54.30.jpeg',
  'active',
  8,
  false
),
-- PHOTO 9
(
  'Executive Leadership & CEO',
  'Campus',
  'Our school executive management leading with vision and excellence',
  '/ceo4.JPG',
  NULL,
  'image',
  '/ceo4.JPG',
  'active',
  9,
  false
),
-- PHOTO 10
(
  'School Outing & Field Trip',
  'Events',
  'Memorable outdoor learning and recreational field trips',
  '/outinge.jpg',
  NULL,
  'image',
  '/outinge.jpg',
  'active',
  10,
  false
),
-- PHOTO 11
(
  'Teaching Staff Team',
  'Campus',
  'Our qualified and passionate educators dedicated to student growth',
  '/staff.jpg',
  NULL,
  'image',
  '/staff.jpg',
  'active',
  11,
  false
),
-- PHOTO 12
(
  'Classroom Science Experiments',
  'Facilities',
  'Hands-on practical experiments building real-world knowledge',
  '/poitive%20folder/WhatsApp%20Image%202026-07-24%20at%2022.49.13.jpeg',
  NULL,
  'image',
  '/poitive%20folder/WhatsApp%20Image%202026-07-24%20at%2022.49.13.jpeg',
  'active',
  12,
  false
),

-- VIDEO 1
(
  'Student Science Practicals (Video)',
  'Facilities',
  'Watch our students in action during interactive laboratory practicals',
  '/positive2/practicals.jpeg',
  '/positive2/studentspracitcalvideo.mp4',
  'video',
  '/positive2/practicals.jpeg',
  'active',
  13,
  true
),
-- VIDEO 2
(
  'Educational Field Trip (Video)',
  'Events',
  'Video highlights from our memorable student educational excursion',
  '/positive2/smallexcursion.jpeg',
  '/positive2/excursionvideo.mp4',
  'video',
  '/positive2/smallexcursion.jpeg',
  'active',
  14,
  true
),
-- VIDEO 3
(
  'School Cultural Event (Video)',
  'Events',
  'Highlights from Positive Image Schools annual cultural festival',
  '/culture.jpg',
  '/poitive%20folder/WhatsApp%20Video%202026-07-24%20at%2022.57.22.mp4',
  'video',
  '/culture.jpg',
  'active',
  15,
  true
),
-- VIDEO 4
(
  'Student Activities Showcase (Video)',
  'Student Life',
  'A glimpse into vibrant daily student life and extracurricular activities',
  '/asa.jpg',
  '/poitive%20folder/WhatsApp%20Video%202026-07-24%20at%2022.57.24.mp4',
  'video',
  '/asa.jpg',
  'active',
  16,
  false
),
-- VIDEO 5
(
  'Campus Life & Morning Assembly (Video)',
  'Campus',
  'Watch our morning assembly, unity chants, and school spirit',
  '/positive2/primaryschool.jpeg',
  '/poitive%20folder/WhatsApp%20Video%202026-07-24%20at%2022.51.26.mp4',
  'video',
  '/positive2/primaryschool.jpeg',
  'active',
  17,
  false
),
-- VIDEO 6
(
  'Creative Practical Learning (Video)',
  'Facilities',
  'Student practical demonstrations and creative arts showcases',
  '/outinge.jpg',
  '/poitive%20folder/WhatsApp%20Video%202026-07-24%20at%2022.57.35%20(2).mp4',
  'video',
  '/outinge.jpg',
  'active',
  18,
  false
);

-- Step 4: Output confirmation notice
DO $$
BEGIN
  RAISE NOTICE '✅ Seeded photos and videos into Supabase successfully!';
  RAISE NOTICE '🖼️ Media is now live in Gallery and Admin Panel!';
END $$;
