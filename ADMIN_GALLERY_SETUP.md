# 🖼️ Admin Gallery Upload Setup

## Overview
The gallery now has admin authentication for image uploads. Only authorized admin emails can upload new images to the gallery.

## 🔧 **Setup Instructions**

### Step 1: Configure Admin Email
Edit `src/config/admin.ts` and set your admin email:

```typescript
export const ADMIN_CONFIG = {
  ADMIN_EMAIL: 'your-admin@email.com', // Replace with your actual admin email
  // ... rest of config
};
```

### Step 2: Test the System
1. Go to the Gallery page
2. Click "Admin Upload" button
3. Enter your configured admin email
4. If correct, you'll be authenticated and can upload images
5. If incorrect, you'll see an access denied message

## 🎯 **How It Works**

### For Admin Users:
1. **Click "Admin Upload"** → Opens login modal
2. **Enter admin email** → System validates against configured email
3. **Authentication success** → 24-hour session created
4. **Upload images** → Can add new photos with title, category, description
5. **Session management** → Shows remaining time, logout option

### For Non-Admin Users:
1. **Click "Admin Upload"** → Opens login modal
2. **Enter any other email** → Access denied message
3. **Clear instructions** → Told to contact admin to upload images

## 📋 **Features**

### ✅ **Security Features**:
- **Email-based authentication** (no passwords needed)
- **Session expiry** (24 hours)
- **Local storage** session management
- **Clear access control** messages

### ✅ **Upload Features**:
- **Image validation** (file type, size limits)
- **Image preview** before upload
- **Metadata collection** (title, category, description)
- **Category filtering** (Campus, Facilities, Student Life, Sports, Events)
- **Persistent storage** (saves to localStorage)

### ✅ **User Experience**:
- **Smooth animations** and transitions
- **Clear feedback** messages
- **Session time display** for admins
- **Easy logout** functionality

## 🔒 **Security Notes**

### Current Implementation:
- **Client-side only** - suitable for simple admin control
- **Email-based** - no password required
- **Session-based** - 24-hour expiry
- **Local storage** - data persists in browser

### For Production Enhancement:
- Consider **backend authentication** for higher security
- Add **image hosting service** (Cloudinary, AWS S3, etc.)
- Implement **database storage** instead of localStorage
- Add **role-based permissions** for multiple admin levels

## 📁 **File Structure**

```
src/
├── config/
│   └── admin.ts              # Admin configuration and auth functions
├── components/
│   ├── AdminLogin.tsx        # Admin login modal
│   └── ImageUpload.tsx       # Image upload modal
└── pages/
    └── Gallery.tsx           # Updated gallery with admin features
```

## 🚀 **Usage Examples**

### Setting Up Admin Email:
```typescript
// In src/config/admin.ts
export const ADMIN_CONFIG = {
  ADMIN_EMAIL: 'principal@positiveimage.edu.ng',
  // ...
};
```

### Admin Workflow:
1. Admin visits gallery page
2. Clicks "Admin Upload"
3. Enters their email (principal@positiveimage.edu.ng)
4. Gets authenticated for 24 hours
5. Can upload multiple images during session
6. Session shows remaining time
7. Can logout manually or wait for expiry

### Non-Admin Workflow:
1. User visits gallery page
2. Clicks "Admin Upload"
3. Enters their email (student@example.com)
4. Gets "Access denied" message
5. Sees instructions to contact admin
6. Cannot upload images

## 🛠️ **Customization Options**

### Change Session Duration:
```typescript
// In src/config/admin.ts
SESSION_DURATION: 12 * 60 * 60 * 1000, // 12 hours instead of 24
```

### Add Multiple Admin Emails:
```typescript
// Modify the isAdminEmail function
isAdminEmail: (email: string): boolean => {
  const adminEmails = [
    'principal@school.com',
    'admin@school.com',
    'teacher@school.com'
  ];
  return adminEmails.includes(email.toLowerCase().trim());
}
```

### Change Upload Limits:
```typescript
// In ImageUpload.tsx, modify validation
if (file.size > 10 * 1024 * 1024) { // 10MB instead of 5MB
  setMessage({ type: 'error', text: 'File size must be less than 10MB' });
  return;
}
```

## 🔍 **Testing**

### Test Admin Access:
1. Set your email in `admin.ts`
2. Go to gallery page
3. Click "Admin Upload"
4. Enter your configured email
5. Should see success and upload interface

### Test Non-Admin Access:
1. Click "Admin Upload"
2. Enter different email
3. Should see access denied message

### Test Session Management:
1. Authenticate as admin
2. Check session timer
3. Upload an image
4. Logout and verify session cleared

## 💡 **Pro Tips**

1. **Use school domain email** for admin (looks more professional)
2. **Test with different emails** to ensure security works
3. **Check localStorage** to see saved images
4. **Clear localStorage** to reset gallery if needed
5. **Monitor session time** to avoid unexpected logouts

The system is designed to be simple yet secure, perfect for school gallery management without complex backend requirements!