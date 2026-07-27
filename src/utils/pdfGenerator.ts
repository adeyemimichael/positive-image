// PDF Generation utilities for Positive Image Schools

/**
 * Generate a receipt PDF for student registration
 */
export const generateReceiptPDF = (
  dataOrName: any,
  ref?: string,
  amount?: string,
  date?: string,
  method?: string,
  className?: string,
  guardianName?: string,
  guardianPhone?: string
) => {
  let registrationData: any = {};

  if (typeof dataOrName === 'object' && dataOrName !== null) {
    registrationData = dataOrName;
  } else {
    registrationData = {
      fullName: dataOrName,
      paymentReference: ref,
      paymentAmount: amount,
      paymentDate: date,
      paymentMethod: method,
      classApplyingFor: className,
      guardianName,
      guardianPhone
    };
  }

  const fullName = registrationData.fullName || registrationData.full_name || 'N/A';
  const reference = registrationData.paymentReference || registrationData.payment_reference || ref || 'N/A';
  const cls = registrationData.classApplyingFor || registrationData.class_applying_for || registrationData.className || className || 'N/A';
  const campus = registrationData.campus || 'Main Campus';
  const dob = registrationData.dateOfBirth || registrationData.date_of_birth || 'N/A';

  const fatherName = registrationData.fatherName || registrationData.father_name || 'N/A';
  const motherName = registrationData.motherName || registrationData.mother_name || 'N/A';
  const phone = registrationData.fatherPhone || registrationData.father_phone || registrationData.motherPhone || registrationData.mother_phone || registrationData.guardianPhone || guardianPhone || 'N/A';
  const email = registrationData.fatherEmail || registrationData.father_email || registrationData.motherEmail || registrationData.mother_email || 'N/A';

  const rawAmount = registrationData.paymentAmount || registrationData.payment_amount || registrationData.registrationFee || amount || 0;
  const formattedAmount = typeof rawAmount === 'number' ? `₦${rawAmount.toLocaleString()}` : rawAmount;
  const payMethod = registrationData.paymentMethod || method || 'Online / Bank Transfer';
  const payStatus = registrationData.paymentStatus || registrationData.payment_status || 'Completed';
  const payDate = registrationData.paymentDate || date || new Date().toLocaleDateString();

  const receiptContent = `
================================================================
          POSITIVE IMAGE SCHOOLS - OFFICIAL RECEIPT
================================================================

Date: ${payDate}
Receipt / Ref No: ${reference}

STUDENT INFORMATION
----------------------------------------------------------------
Name:           ${fullName}
Class:          ${cls}
Campus:         ${campus}
Date of Birth:  ${dob}

PARENT / GUARDIAN INFORMATION
----------------------------------------------------------------
Father's Name:  ${fatherName}
Mother's Name:  ${motherName}
Contact Phone:  ${phone}
Email:          ${email}

PAYMENT DETAILS
----------------------------------------------------------------
Registration Fee:  ${formattedAmount}
Payment Method:    ${payMethod}
Payment Status:    ${payStatus}
Transaction Date:  ${payDate}

----------------------------------------------------------------
Thank you for choosing Positive Image Schools!

For inquiries, please contact:
Email: info@positiveimageschools.com
Phone: +234 803 123 4567
Website: www.positiveimageschools.com
================================================================
  `.trim();

  // Create a text file download receipt
  const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `PIS-Receipt-${reference}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Generate School Anthem Lyrics
 */
export const generateAnthemLyricsPDF = () => {
  const anthemContent = `
================================================================
          POSITIVE IMAGE SCHOOLS - SCHOOL ANTHEM
================================================================

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

----------------------------------------------------------------
© Positive Image Schools
  `.trim();

  const blob = new Blob([anthemContent], { type: 'text/plain;charset=utf-8' });
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
 * Generate School Brochure
 */
export const generateBrochurePDF = () => {
  const brochureContent = `
================================================================
          POSITIVE IMAGE SCHOOLS - BROCHURE
================================================================

ABOUT US
Positive Image Schools is committed to providing quality education
and character development from Nursery to Secondary levels.

PROGRAMS OFFERED
- Nursery Education (Nursery 1 & 2)
- Primary Education (Primary 1 - 6)
- Secondary Education (JSS 1 - SSS 3)

CAMPUSES
1. Amuloko Campus: 13 Sangogade Street, Akoyoyo Area, Amuloko, Ibadan
2. Odeyale Campus: Elebolo Junction, Opposite Petrocam Gas Station, Odeyale Ajia

CONTACT US
Email: info@positiveimageschools.com
Phone: +234 803 123 4567
================================================================
  `.trim();

  const blob = new Blob([brochureContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Positive-Image-Schools-Brochure.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
