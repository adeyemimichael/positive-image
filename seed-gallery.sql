-- ============================================================================
-- SEED DEFAULT GALLERY IMAGES INTO SUPABASE DATABASE
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

INSERT INTO gallery_images (title, category, description, image_url, status)
VALUES
(
  'School Facilities',
  'Facilities',
  'Our modern facilities provide excellent learning environment for students',
  '/positive2/facility.jpeg',
  'active'
),
(
  'Primary School Section',
  'Campus',
  'Dedicated primary school section with age-appropriate facilities',
  '/positive2/primaryschool.jpeg',
  'active'
),
(
  'Science Practicals',
  'Facilities',
  'Students engaged in hands-on science experiments and practicals',
  '/positive2/practicals.jpeg',
  'active'
),
(
  'Practical Learning',
  'Student Life',
  'Interactive learning sessions with practical demonstrations',
  '/positive2/practice.jpeg',
  'active'
),
(
  'Laboratory Sessions',
  'Facilities',
  'Well-equipped laboratories for chemistry, physics, and biology',
  '/positive2/schoolpractical.jpeg',
  'active'
),
(
  'Morning Assembly',
  'Student Life',
  'Daily morning assembly fostering unity and school spirit',
  '/positive2/studnetassembly.jpeg',
  'active'
),
(
  'CEO with Students',
  'Student Life',
  'Our CEO engaging with students, fostering mentorship and guidance',
  '/positive2/ceoandstudent.JPG',
  'active'
),
(
  'Leadership & Students',
  'Student Life',
  'Building strong relationships between leadership and students',
  '/positive2/ceoandpupils.jpeg',
  'active'
),
(
  'Student Engagement',
  'Student Life',
  'Active student participation in school activities',
  '/positive2/ceoandstud.jpg',
  'active'
),
(
  'Academic Excellence',
  'Student Life',
  'Celebrating academic achievements and student success',
  '/positive2/ceoandstud3.jpg',
  'active'
),
(
  'School Events',
  'Events',
  'Memorable moments from our school events and celebrations',
  '/positive2/pastevent.jpeg',
  'active'
),
(
  'Past Events Highlights',
  'Events',
  'Highlights from previous school events and activities',
  '/positive2/pastevent2.jpeg',
  'active'
),
(
  'Event Celebrations',
  'Events',
  'Students and staff celebrating special occasions together',
  '/positive2/eventspast.jpeg',
  'active'
),
(
  'Educational Excursion',
  'Events',
  'Students on educational field trips and excursions',
  '/positive2/smallexcursion.jpeg',
  'active'
),
(
  'Leadership Team',
  'Campus',
  'Our dedicated CEO and staff working together for excellence',
  '/positive2/ceoandstaff.jpg',
  'active'
),
(
  'Teaching Staff',
  'Campus',
  'Our experienced and qualified teaching staff',
  '/positive2/staffs.jpg',
  'active'
),
(
  'Staff Team',
  'Campus',
  'Dedicated staff members committed to student success',
  '/positive2/staffing.JPG',
  'active'
),
(
  'Staff Collection',
  'Campus',
  'Our diverse and talented team of educators',
  '/positive2/staffingcollections.jpg',
  'active'
),
(
  'Full Staff Assembly',
  'Campus',
  'Complete staff team photo showcasing our educational family',
  '/fullstaff.JPG',
  'active'
),
(
  'Staff Group Photo',
  'Campus',
  'Our positive and enthusiastic teaching staff',
  '/staffpositive.jpg',
  'active'
),
(
  'School Outing',
  'Events',
  'Fun and educational school outings for students',
  '/outing1.jpg',
  'active'
),
(
  'Outdoor Activities',
  'Events',
  'Students enjoying outdoor learning experiences',
  '/outing2.jpg',
  'active'
),
(
  'Field Trip',
  'Events',
  'Educational field trips enhancing classroom learning',
  '/outing3.jpg',
  'active'
),
(
  'Our Students',
  'Student Life',
  'Bright and enthusiastic students of Positive Image Schools',
  '/students.jpg',
  'active'
);

-- Show success notice
DO $$
BEGIN
  RAISE NOTICE '✅ Seeded 24 gallery images into Supabase successfully!';
  RAISE NOTICE '🖼️ You can now view, edit, and delete them in your Admin Panel (/admin) and Gallery page (/gallery).';
END $$;
