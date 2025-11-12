# 📧 Email Setup Instructions

## Overview
The registration form sends detailed student registration information directly to your admin email automatically.

## 🚀 **Quick Setup with EmailJS (Recommended)**

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Email Service
1. **Add Email Service**:
   - Go to "Email Services" in your EmailJS dashboard
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Follow the connection steps

2. **Create Email Template**:
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template content:

```html
Subject: New Student Registration - {{campus}}

Dear Admin,

A new student registration has been submitted:

Student Information:
- Name: {{student_name}}
- Campus: {{campus}}
- Class: {{class_name}}
- Registration Fee: ₦{{registration_fee}}
- Registration ID: {{registration_id}}
- Date: {{registration_date}}

Parent Contact:
- Email: {{parent_email}}
- Phone: {{parent_phone}}

Full Details:
{{message}}

Please review and process this registration.

Best regards,
School Registration System
```

### Step 3: Configure Your App
1. **Get Your Credentials**:
   - Service ID: Found in "Email Services"
   - Template ID: Found in "Email Templates"
   - Public Key: Found in "Account" → "General"

2. **Update Configuration**:
   Edit `src/config/email.ts`:

```typescript
export const EMAIL_CONFIG = {
  ADMIN_EMAIL: 'your-admin@email.com',        // Your admin email
  EMAILJS: {
    SERVICE_ID: 'service_xxxxxxx',            // Your service ID
    TEMPLATE_ID: 'template_xxxxxxx',          // Your template ID
    USER_ID: 'user_xxxxxxxxxxxxxxx'           // Your public key
  }
};
```

## 🔧 **Alternative Options**

### Option B: Formspree (Simple Form Backend)
1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Update form submission to POST to Formspree endpoint

### Option C: Netlify Forms (If hosting on Netlify)
1. Add `netlify` attribute to your form
2. Netlify automatically handles form submissions
3. View submissions in Netlify dashboard

### Option D: Custom Backend API
1. Create a backend service (Node.js, Python, etc.)
2. Use email services like SendGrid, Mailgun, or Nodemailer
3. Update form to POST to your API endpoint

## Email Content
The email includes:
- Campus selection
- Complete student information
- Parent/guardian details
- Academic information
- Contact details
- Registration ID and date
- Registration fee amount

## Testing
Currently, the email service simulates sending (logs to console). To test:
1. Fill out the registration form
2. Check browser console for email content
3. Verify all data is properly formatted

## Production Setup
For production use:
1. Replace the simulated email sending with actual service
2. Add error handling and retry logic
3. Consider adding email delivery confirmation
4. Set up email templates in your chosen service

## Campus Options
- **Amuloko Ona-Ara Campus**: Main campus with comprehensive programs
- **Odeyale Akanran Campus**: Modern campus with specialized learning environments

## File Structure
```
src/
├── config/
│   └── email.ts          # Email configuration
├── utils/
│   └── emailService.ts   # Email sending logic
└── pages/
    └── Register.tsx      # Updated registration form
```

## Next Steps
1. Set up your preferred email service
2. Update the admin email address
3. Test the complete registration flow
4. Monitor email delivery in production