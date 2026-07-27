-- ============================================================================
-- SQL MIGRATION: ADD VIDEO & MEDIA TYPE SUPPORT TO GALLERY_IMAGES TABLE
-- Run this in your Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- ============================================================================

-- Add media_type column if it doesn't exist ('image' or 'video')
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS media_type TEXT DEFAULT 'image';

-- Add video_url column if it doesn't exist
ALTER TABLE gallery_images 
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Create index on media_type for fast filtering
CREATE INDEX IF NOT EXISTS idx_gallery_media_type ON gallery_images(media_type);

-- Update existing records to have media_type = 'image' if null
UPDATE gallery_images 
SET media_type = 'image' 
WHERE media_type IS NULL;

-- Notice of completion
DO $$
BEGIN
  RAISE NOTICE '✅ Database schema updated! gallery_images now supports media_type and video_url.';
END $$;
