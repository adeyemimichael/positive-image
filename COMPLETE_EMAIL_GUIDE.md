# 📧 Complete Email Setup Guide

## 🎯 **Choose Your Method**

### 🥇 **Method 1: Formspree (Easiest - 5 minutes)**
**Best for**: Quick setup, no technical complexity

**Steps**:
1. Go to [Formspree.io](https://formspree.io/)
2. Sign up (free plan available)
3. Create a new form
4. Copy your form endpoint: `https://formspree.io/f/xxxxxxxx`
5. Update `src/utils/formspreeService.ts`:
   ```typescript
   const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_ACTUAL_FORM_ID';
   ```
6. In `src/pages/Register.tsx`, comment out EmailJS and uncomment Formspree:
   ```typescript
   // const emailSent = await sendRegistrationEmail(emailData);
   const emailSent = await sendRegistrationWithFormspree(registrationData);
   ```

**✅ Pros**: Super simple, reliable, handles spam protection
**❌ Cons**: Limited customization, external dependency

---

### 🥈 **Method 2: EmailJS (More Control)**
**Best for**: Custom email templates, direct email sending

**Steps**:
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up and verify email
3. **Add Email Service**:
   - Dashboard → Email Services → Add New Service
   - Choose Gmail/Outlook/etc and connect
4. **Create Template**:
   - Dashboard → Email Templates → Create New Template
   - Use the template from EMAIL_SETUP.md
5. **Get Credentials**:
   - Service ID (from Email Services)
   - Template ID (from Email Templates)  
   - Public Key (Account → General)
6. **Update Config** in `src/config/email.ts`:
   ```typescript
   ADMIN_EMAIL: 'your-admin@email.com',
   EMAILJS: {
     SERVICE_ID: 'service_xxxxxxx',
     TEMPLATE_ID: 'template_xxxxxxx', 
     USER_ID: 'user_xxxxxxxxxxxxxxx'
   }
   ```

**✅ Pros**: Full control, custom templates, direct sending
**❌ Cons**: More setup steps, requires email service connection

---

### 🥉 **Method 3: Netlify Forms (If using Netlify)**
**Best for**: Sites hosted on Netlify

**Steps**:
1. Add `netlify` attribute to form
2. Deploy to Netlify
3. View submissions in Netlify dashboard

---

### 🔧 **Method 4: Custom Backend**
**Best for**: Full control, enterprise needs

**Options**:
- **Node.js + Nodemailer**
- **Python + SendGrid**
- **PHP + PHPMailer**
- **Any backend + email service**

---

## 🚀 **Quick Start (Recommended)**

### For Immediate Testing:
1. Use **Formspree** method above
2. Takes 5 minutes to set up
3. Works immediately
4. Free tier available

### For Production:
1. Start with **Formspree** for quick launch
2. Later migrate to **EmailJS** for more control
3. Eventually consider **custom backend** for enterprise needs

---

## 📋 **What Gets Emailed**

The admin receives:
- **Student Info**: Name, campus, class, registration fee
- **Parent Details**: Names, phones, emails, occupations
- **Contact Info**: Address, emergency contacts
- **Academic Info**: Previous school, class applying for
- **Special Needs**: Medical conditions, learning difficulties
- **Complete Data**: Full JSON for reference
- **Registration ID**: For tracking and follow-up

---

## 🔍 **Testing Your Setup**

1. **Fill out registration form**
2. **Check browser console** for success/error messages
3. **Check your admin email** for the registration details
4. **Verify all data** is properly formatted and complete

---

## 🆘 **Troubleshooting**

### EmailJS Issues:
- Check service ID, template ID, and public key
- Verify email service is connected
- Check browser console for errors
- Test template in EmailJS dashboard

### Formspree Issues:
- Verify form endpoint URL
- Check Formspree dashboard for submissions
- Ensure form ID is correct
- Check network tab for API errors

### General Issues:
- Check browser console for JavaScript errors
- Verify internet connection
- Test with different browsers
- Check spam folder for emails

---

## 💡 **Pro Tips**

1. **Start Simple**: Use Formspree first, then upgrade if needed
2. **Test Thoroughly**: Try different form combinations
3. **Monitor Emails**: Set up email filters for registrations
4. **Backup Plan**: Always log form data to console as backup
5. **User Feedback**: Show success/error messages to users

---

## 📞 **Need Help?**

If you get stuck:
1. Check the browser console for error messages
2. Verify your email service credentials
3. Test with a simple form first
4. Check the email service documentation
5. Try the Formspree method as a fallback

The system is designed to be robust - even if email fails, the registration data is still saved locally and logged to console for manual processing.