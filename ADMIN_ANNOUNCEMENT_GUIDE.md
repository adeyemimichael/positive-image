# Admin Announcement Management Guide

## Overview
The admin panel now includes a comprehensive announcement management system that allows administrators to create, manage, and publish announcements for the school website.

## Access
- **URL**: `/admin`
- **Password**: `adminadmin`
- **Session Duration**: 2 hours

## Features

### 1. Announcement Creation
Administrators can create announcements with the following fields:
- **Title**: Main heading of the announcement
- **Category**: Academic, Event, Notice, Achievement, or General
- **Priority**: Urgent, Normal, or Info
- **Description**: Detailed announcement text
- **Image**: Optional image upload (max 5MB)

### 2. Announcement Management
- View all published announcements
- Delete announcements
- Announcements are stored in browser localStorage
- Automatic timestamp for each announcement

### 3. Gallery Management
- Upload images to the school gallery
- Manage existing gallery images
- Categorize images (Campus, Facilities, Student Life, Events)

## How to Use

### Creating an Announcement

1. Navigate to `/admin` in your browser
2. Login with the admin password: `adminadmin`
3. Click on the "Announcements" tab
4. Click "Create Announcement" button
5. Fill in the required fields:
   - Title (required)
   - Category (required)
   - Priority (required)
   - Description (required)
   - Image (optional)
6. Click "Publish Announcement"

### Managing Announcements

1. View all announcements in the admin panel
2. Click the trash icon to delete an announcement
3. Announcements are displayed with:
   - Priority badge (color-coded)
   - Category tag
   - Publication date
   - Preview image (if uploaded)

### Gallery Management

1. Click on the "Gallery" tab in the admin panel
2. Click "Upload Image" to add new images
3. Fill in image details:
   - Title
   - Category
   - Description (optional)
4. Select an image file (max 5MB)
5. Click "Upload Image"

## Technical Details

### Files Created
- `src/components/AnnouncementUpload.tsx` - Announcement upload modal
- `src/pages/AdminPanel.tsx` - Main admin panel page
- `src/App.tsx` - Updated with admin route

### Files Modified
- `src/pages/Home.tsx` - Updated announcement section text to "Second Term"
- `src/components/Layout/Header.tsx` - Fixed mobile navbar transparency
- `src/components/Layout/Footer.tsx` - Added admin link

### Storage
- Announcements are stored in `localStorage` under key `admin_announcements`
- Gallery images are stored in `localStorage` under key `gallery_images`

### Image Optimization
- Critical images are preloaded on Home page load
- Removed lazy loading for better performance
- Images are optimized for web display

## Updates Made

### 1. Mobile Navbar Fix
- Changed mobile menu background from solid white to `bg-white/95 backdrop-blur-md`
- This provides transparency while maintaining readability

### 2. Announcement Section Updates
- Changed "2026 Academic Session" to "Second Term 2026"
- Changed "first term" to "second term" in parent-teacher conference announcement
- Added announcement image from `/positive2/announcement.jpeg`

### 3. Image Optimization
- Added image preloading for critical images
- Preloaded images include:
  - Hero section images
  - Gallery slider images
  - Announcement images
  - Bento grid images

## Future Enhancements

### Recommended Improvements
1. **Backend Integration**: Connect to a real database instead of localStorage
2. **Rich Text Editor**: Add formatting options for announcement descriptions
3. **Email Notifications**: Send email alerts when new announcements are published
4. **Scheduling**: Allow scheduling announcements for future publication
5. **Analytics**: Track announcement views and engagement
6. **Multi-language Support**: Support for multiple languages
7. **Image Compression**: Automatic image optimization on upload
8. **Announcement Categories**: More granular categorization options

## Security Notes

- Admin password should be changed in production
- Consider implementing:
  - Password hashing
  - Session encryption
  - Rate limiting
  - Two-factor authentication
  - IP whitelisting for admin access

## Support

For issues or questions:
- Email: positiveimageschools@gmail.com
- Phone: +234 8165318587

---

**Last Updated**: January 22, 2026
**Version**: 1.0.0
