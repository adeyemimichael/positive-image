// PDF Generation utilities for Positive Image Schools
// This file provides functions to generate PDF documents for receipts and other documents

/**
 * Generate a receipt PDF for student registration
 * @param registrationData - Student registration information
 */
export const generateReceiptPDF = (registrationData: any) => {
  // For now, create a simple text-based receipt
  const receiptContent = `
╔════════════════════════════════════════════════════════════╗
║        POSITIVE IMAGE SCHOOLS - REGISTRATION RECEIPT      ║
╚════════════════════════════════════════════════════════════╝

Date: ${new Date().toLocaleDateString()}
Receipt No: ${registrationData.paymentReference || 'N/A'}

STUDENT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:           ${registrationData.fullName || 'N/A'}
Class:          ${registrationData.classApplyingFor || registrationData.className || 'N/A'}
Campus:         ${registrationData.campus || 'N/A'}
Date of Birth:  ${registrationData.dateOfBirth || 'N/A'}

PARENT/GUARDIAN INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Father's Name:  ${registrationData.fatherName || 'N/A'}
Mother's Name:  ${registrationData.motherName || 'N/A'}
Phone:          ${registrationData.fatherPhone || registrationData.guardianPhone || 'N/A'}
Email:          ${registrationData.fatherEmail || registrationData.parentEmail || 'N/A'}

PAYMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Registration Fee:  ₦${(registrationData.registrationFee || registrationData.paymentAmount || 0).toLocaleString()}
Payment Method:    ${registrationData.paymentMethod || 'Paystack'}
Payment Status:    ${registrationData.paymentStatus || 'Completed'}
Payment Date:      ${registrationData.paymentDate ? new Date(registrationData.paymentDate).toLocaleDateString() : 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for choosing Positive Image Schools!

For inquiries, please contact:
📧 Email: info@positiveimgeschools.com
📞 Phone: +234 XXX XXX XXXX

Visit us: www.positiveimgeschools.com
  `.trim();

  // Create a blob and download
  const blob = new Blob([receiptContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PIS-Receipt-${registrationData.paymentReference || Date.now()}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate School Anthem Lyrics PDF
 */
export const generateAnthemLyricsPDF = () => {
  const anthemContent = `
╔════════════════════════════════════════════════════════════╗
║          POSITIVE IMAGE SCHOOLS - SCHOOL ANTHEM           ║
╚════════════════════════════════════════════════════════════╝

POSITIVE IMAGE SCHOOLS ANTHEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Verse 1]
In halls of learning, we stand so tall
Positive Image, we heed your call
With knowledge and wisdom, we shall grow
Excellence in all we do, we'll show

[Chorus]
Positive Image, our guiding light
Leading us forward, shining bright
With faith and courage, we'll pave the way
Building tomorrow, starting today

[Verse 2]
United together, hand in hand
The future of our beloved land
With discipline, respect, and care
We'll make our nation proud everywhere

[Chorus]
Positive Image, our guiding light
Leading us forward, shining bright
With faith and courage, we'll pave the way
Building tomorrow, starting today

[Bridge]
In sports, in studies, in all we pursue
We'll always strive to be true
To our school, our family, our name
Forever proud, we'll stake our claim

[Final Chorus]
Positive Image, forever we'll sing
Your praises high, let freedom ring
With unity, strength, and pride so true
Positive Image, we honor you!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

© Positive Image Schools
Inspiring Excellence, Building Character, Creating Leaders
  `.trim();

  // Create a blob and download
  const blob = new Blob([anthemContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Positive-Image-Schools-Anthem.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate a simple brochure PDF (text format)
 */
export const generateBrochurePDF = () => {
  const brochureContent = `
╔════════════════════════════════════════════════════════════╗
║          POSITIVE IMAGE SCHOOLS - SCHOOL BROCHURE         ║
╚════════════════════════════════════════════════════════════╝

ABOUT US
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Positive Image Schools is a leading educational institution
committed to providing quality education and character development
for students from Nursery to Secondary School levels.

Founded: 2003
Locations: Amuloko Campus & Odeyale Campus
Students: 1000+ Happy Learners
Staff: 50+ Qualified Teachers

OUR MISSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To nurture young minds, build strong character, and create
future leaders through quality education and holistic development.

FACILITIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✓ Modern Classrooms
✓ Science Laboratories
✓ Computer Labs
✓ Sports Facilities
✓ Library & Reading Rooms
✓ Recreational Areas

PROGRAMS OFFERED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Nursery Education (Ages 2-5)
• Primary Education (Primary 1-6)
• Secondary Education (JSS 1 - SSS 3)

CONTACT US
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: info@positiveimgeschools.com
Phone: +234 XXX XXX XXXX
Website: www.positiveimgeschools.com

Amuloko Campus:
13 Sangogade Street, Akoyoyo Area, Amuloko, Ibadan

Odeyale Campus:
Elebolo Junction, Opposite Petrocam Gas Station, Odeyale Ajia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Join us today and give your child the best start in life!
  `.trim();

  const blob = new Blob([brochureContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Positive-Image-Schools-Brochure.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Note: For proper PDF generation with formatting, images, and styling,
// consider using a library like jsPDF or pdfmake in the future.
// This is a simple text-based implementation for now.
