# Supabase Database Schema for Positive Image Schools

## Overview
This document outlines the complete database schema for migrating from localStorage to Supabase.

---

## 📊 Database Tables

### 1. **students** (Student Records)
Stores all student information from registration forms.

```sql
CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Campus Information
  campus TEXT NOT NULL, -- 'amuloko' or 'odeyale'
  
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
  passport_photo_url TEXT, -- Cloudinary/Supabase Storage URL
  
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
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  payment_amount DECIMAL(10,2),
  payment_date TIMESTAMP,
  
  -- Metadata
  registration_date TIMESTAMP DEFAULT NOW(),
  registration_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_students_campus ON students(campus);
CREATE INDEX idx_students_class ON students(class_applying_for);
CREATE INDEX idx_students_registration_date ON students(registration_date);
CREATE INDEX idx_students_payment_status ON students(payment_status);
```

---

### 2. **teachers** (Staff Information)
Stores teacher/staff profiles.

```sql
CREATE TABLE teachers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  photo_url TEXT,
  subject TEXT NOT NULL,
  experience INTEGER DEFAULT 0, -- Years of experience
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  bio TEXT,
  qualifications TEXT[], -- Array of qualifications
  campus TEXT, -- 'amuloko', 'odeyale', or 'both'
  status TEXT DEFAULT 'active', -- 'active', 'inactive'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_teachers_campus ON teachers(campus);
CREATE INDEX idx_teachers_status ON teachers(status);
```

---

### 3. **announcements** (School Announcements)
Stores admin-created announcements displayed on the homepage.

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- 'Academic', 'Event', 'Notice', 'Achievement', 'General'
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'normal', -- 'urgent', 'normal', 'info'
  image_url TEXT, -- Supabase Storage URL
  status TEXT DEFAULT 'active', -- 'active', 'archived', 'draft'
  upload_date TIMESTAMP DEFAULT NOW(),
  published_date TIMESTAMP,
  expires_date TIMESTAMP, -- Optional expiration date
  created_by UUID, -- Admin user ID
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_announcements_status ON announcements(status);
CREATE INDEX idx_announcements_priority ON announcements(priority);
CREATE INDEX idx_announcements_upload_date ON announcements(upload_date DESC);
```

---

### 4. **gallery_images** (School Gallery)
Stores images for the gallery page.

```sql
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'Campus', 'Facilities', 'Student Life', 'Sports', 'Events'
  image_url TEXT NOT NULL, -- Supabase Storage URL
  thumbnail_url TEXT, -- Optimized thumbnail
  campus TEXT, -- 'amuloko', 'odeyale', 'both'
  display_order INTEGER DEFAULT 0, -- For manual ordering
  is_featured BOOLEAN DEFAULT false,
  upload_date TIMESTAMP DEFAULT NOW(),
  uploaded_by UUID, -- Admin user ID
  status TEXT DEFAULT 'active', -- 'active', 'archived'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_gallery_status ON gallery_images(status);
CREATE INDEX idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX idx_gallery_display_order ON gallery_images(display_order);
```

---

### 5. **contact_messages** (Contact Form Submissions)
Stores messages from the contact form.

```sql
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- 'new', 'read', 'responded', 'archived'
  response TEXT,
  responded_at TIMESTAMP,
  responded_by UUID, -- Admin user ID
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_created_at ON contact_messages(created_at DESC);
```

---

### 6. **payments** (Payment Records)
Stores all payment transactions from Paystack.

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  reference TEXT UNIQUE NOT NULL, -- Paystack reference
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  payment_type TEXT NOT NULL, -- 'registration', 'tuition', 'other'
  status TEXT DEFAULT 'pending', -- 'pending', 'success', 'failed', 'abandoned'
  payment_method TEXT, -- 'card', 'bank', 'ussd', etc.
  channel TEXT, -- Paystack channel used
  
  -- Paystack Response Data
  paystack_data JSONB, -- Full Paystack response
  authorization_code TEXT, -- For recurring payments
  
  -- Email/Receipt
  receipt_sent BOOLEAN DEFAULT false,
  receipt_sent_at TIMESTAMP,
  
  -- Metadata
  ip_address TEXT,
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_payments_student_id ON payments(student_id);
CREATE INDEX idx_payments_reference ON payments(reference);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at DESC);
```

---

### 7. **admin_users** (Admin Authentication)
Stores admin user accounts for dashboard access.

```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Hashed password
  name TEXT NOT NULL,
  role TEXT DEFAULT 'admin', -- 'super_admin', 'admin', 'editor'
  permissions JSONB, -- Custom permissions
  last_login TIMESTAMP,
  login_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active', -- 'active', 'suspended', 'inactive'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_admin_email ON admin_users(email);
CREATE INDEX idx_admin_status ON admin_users(status);
```

---

### 8. **admin_sessions** (Admin Session Management)
Tracks active admin sessions.

```sql
CREATE TABLE admin_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sessions_token ON admin_sessions(session_token);
CREATE INDEX idx_sessions_expires ON admin_sessions(expires_at);
```

---

### 9. **email_logs** (Email Tracking)
Tracks all emails sent from the system.

```sql
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  email_type TEXT NOT NULL, -- 'registration', 'payment_receipt', 'announcement', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'bounced'
  provider TEXT, -- 'formspree', 'resend', 'sendgrid', etc.
  provider_response JSONB,
  error_message TEXT,
  related_id UUID, -- Reference to student_id, payment_id, etc.
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at DESC);
```

---

### 10. **system_settings** (Application Settings)
Stores dynamic system configuration.

```sql
CREATE TABLE system_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  category TEXT, -- 'general', 'payment', 'email', 'registration'
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Example settings
INSERT INTO system_settings (key, value, description, category) VALUES
('registration_open', 'true', 'Whether registration is currently open', 'registration'),
('registration_fee', '{"amount": 5000, "currency": "NGN"}', 'Registration fee details', 'payment'),
('paystack_public_key', '"pk_test_..."', 'Paystack public key', 'payment'),
('school_email', '"info@positiveimgeschools.com"', 'Primary school email', 'general'),
('session_duration', '3600000', 'Admin session duration in milliseconds', 'general');
```

---

## 🔐 Row Level Security (RLS) Policies

### Public Access (No Auth Required)
```sql
-- Public can read active announcements
CREATE POLICY "Public can view active announcements"
  ON announcements FOR SELECT
  USING (status = 'active');

-- Public can view active gallery images
CREATE POLICY "Public can view active gallery"
  ON gallery_images FOR SELECT
  USING (status = 'active');

-- Public can view active teachers
CREATE POLICY "Public can view active teachers"
  ON teachers FOR SELECT
  USING (status = 'active');

-- Public can insert contact messages
CREATE POLICY "Public can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

-- Public can insert student registrations
CREATE POLICY "Public can register students"
  ON students FOR INSERT
  WITH CHECK (true);

-- Public can insert payments
CREATE POLICY "Public can create payments"
  ON payments FOR INSERT
  WITH CHECK (true);
```

### Admin Access
```sql
-- Admins can do everything on all tables
CREATE POLICY "Admins have full access to students"
  ON students FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins have full access to announcements"
  ON announcements FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Similar policies for other tables...
```

---

## 📁 Supabase Storage Buckets

### 1. **student-photos**
- Stores student passport photographs
- Max file size: 5MB
- Allowed formats: JPG, PNG, WEBP
- Public access: No (admin only)

### 2. **announcement-images**
- Stores images for announcements
- Max file size: 5MB
- Allowed formats: JPG, PNG, WEBP
- Public access: Yes (read-only)

### 3. **gallery-images**
- Stores school gallery photos
- Max file size: 10MB
- Allowed formats: JPG, PNG, WEBP
- Public access: Yes (read-only)

### 4. **documents**
- Stores PDF receipts and other documents
- Max file size: 10MB
- Allowed formats: PDF
- Public access: No (signed URLs only)

---

## 🔄 Triggers & Functions

### Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ... etc
```

---

## 🚀 Migration Priority

### Phase 1 (Critical - Implement First)
1. ✅ **students** - Student registrations
2. ✅ **payments** - Payment tracking
3. ✅ **admin_users** - Admin authentication
4. ✅ **email_logs** - Email tracking

### Phase 2 (Important)
5. ✅ **announcements** - Homepage announcements
6. ✅ **contact_messages** - Contact form
7. ✅ **gallery_images** - School gallery

### Phase 3 (Enhancement)
8. ✅ **teachers** - Staff directory
9. ✅ **system_settings** - Configuration
10. ✅ **admin_sessions** - Session management

---

## 📝 Environment Variables Needed

```env
# Supabase Configuration
VITE_SUPABASE_URL=your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-side only (for admin operations)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Paystack (existing)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...

# Email (existing)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/...
```

---

## 🎯 Next Steps

1. **Create Supabase Project**
   - Sign up at supabase.com
   - Create new project
   - Note down project URL and keys

2. **Run SQL Scripts**
   - Copy table creation scripts
   - Run in Supabase SQL Editor
   - Enable RLS on all tables

3. **Set up Storage Buckets**
   - Create the 4 buckets listed above
   - Configure size limits and policies

4. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

5. **Create Supabase Service File**
   - Set up client initialization
   - Create helper functions

6. **Migrate Existing Data**
   - Export localStorage data
   - Import to Supabase tables

---

**Total Tables:** 10  
**Storage Buckets:** 4  
**Estimated Setup Time:** 2-3 hours  
**Migration Complexity:** Medium
