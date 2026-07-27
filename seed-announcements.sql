-- ============================================================================
-- SEED DEFAULT ANNOUNCEMENTS INTO SUPABASE DATABASE
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================================

INSERT INTO announcements (title, category, description, priority, image_url, status)
VALUES
(
  'Second Term 2026 Registration Now Open!',
  'Academic',
  'We are excited to announce that registration for the Second Term 2026 academic session is now open. Early bird discount of 15% available for early registrations. Detailed information and deadlines will be sent to all interested parents via email and SMS.',
  'urgent',
  '/positive2/announcement.jpeg',
  'active'
),
(
  'Mid-Term Examination Schedule Released',
  'Academic',
  'The mid-term examination timetable for all classes has been published. Detailed information will be sent to students and parents via email and SMS.',
  'normal',
  NULL,
  'active'
),
(
  'Annual Cultural Day',
  'Event',
  'Join us for our annual cultural celebration featuring performances, traditional displays, and cultural exhibitions. Event details and date will be communicated to all parents and students soon.',
  'normal',
  NULL,
  'active'
),
(
  'Something Big is Coming Up!',
  'Achievement',
  'Stay tuned for an exciting announcement! Positive Image Schools is preparing something special that will elevate our students'' learning experience. More information will be shared with our community soon.',
  'normal',
  NULL,
  'active'
);

-- Show success notice
DO $$
BEGIN
  RAISE NOTICE '✅ Seeded 4 announcements into Supabase successfully!';
  RAISE NOTICE '📝 You can now see, edit, and delete them in your Admin Panel (/admin).';
END $$;
