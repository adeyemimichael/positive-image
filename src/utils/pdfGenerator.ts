import jsPDF from 'jspdf';

// Generate PDF for payment receipt
export const generateReceiptPDF = (
  studentName: string,
  paymentReference: string,
  amount: string,
  paymentDate: string,
  paymentMethod: string,
  studentClass: string,
  guardianName: string,
  guardianPhone: string
) => {
  const doc = new jsPDF();
  
  // School colors
  const primaryColor: [number, number, number] = [27, 20, 100]; // #1B1464
  const accentColor: [number, number, number] = [255, 244, 178]; // #FFF4B2
  
  // Header with school name
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('POSITIVE IMAGE SCHOOLS', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('The Real Image Maker', 105, 30, { align: 'center' });
  
  // Receipt title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT RECEIPT', 105, 55, { align: 'center' });
  
  // Receipt details
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let yPos = 75;
  const lineHeight = 10;
  
  // Payment Reference (highlighted)
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 5, 170, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.text('Payment Reference:', 25, yPos);
  doc.setFont('helvetica', 'normal');
  doc.text(paymentReference, 85, yPos);
  
  yPos += lineHeight + 5;
  
  // Student Information
  doc.setFont('helvetica', 'bold');
  doc.text('STUDENT INFORMATION', 25, yPos);
  yPos += lineHeight;
  
  doc.setFont('helvetica', 'normal');
  doc.text('Student Name:', 25, yPos);
  doc.text(studentName, 85, yPos);
  yPos += lineHeight;
  
  doc.text('Class:', 25, yPos);
  doc.text(studentClass, 85, yPos);
  yPos += lineHeight + 5;
  
  // Guardian Information
  doc.setFont('helvetica', 'bold');
  doc.text('GUARDIAN INFORMATION', 25, yPos);
  yPos += lineHeight;
  
  doc.setFont('helvetica', 'normal');
  doc.text('Guardian Name:', 25, yPos);
  doc.text(guardianName, 85, yPos);
  yPos += lineHeight;
  
  doc.text('Phone Number:', 25, yPos);
  doc.text(guardianPhone, 85, yPos);
  yPos += lineHeight + 5;
  
  // Payment Information
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT DETAILS', 25, yPos);
  yPos += lineHeight;
  
  doc.setFont('helvetica', 'normal');
  doc.text('Amount Paid:', 25, yPos);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(amount, 85, yPos);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  yPos += lineHeight;
  
  doc.text('Payment Method:', 25, yPos);
  doc.text(paymentMethod, 85, yPos);
  yPos += lineHeight;
  
  doc.text('Payment Date:', 25, yPos);
  doc.text(paymentDate, 85, yPos);
  yPos += lineHeight + 10;
  
  // Status
  doc.setFillColor(34, 197, 94); // Green
  doc.rect(20, yPos - 5, 170, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.text('STATUS: PAYMENT SUCCESSFUL', 105, yPos, { align: 'center' });
  
  yPos += lineHeight + 10;
  
  // Footer note
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('This is an official receipt from Positive Image Schools.', 105, yPos, { align: 'center' });
  yPos += 5;
  doc.text('Please keep this receipt for your records.', 105, yPos, { align: 'center' });
  
  // Contact information at bottom
  yPos = 270;
  doc.setFillColor(...primaryColor);
  doc.rect(0, yPos, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('13 Sangogade Street, Akoyoyo Area, Amuloko, Ibadan, Oyo State', 105, yPos + 8, { align: 'center' });
  doc.text('Phone: +234 XXX XXX XXXX | Email: info@positiveimgeschools.com', 105, yPos + 14, { align: 'center' });
  doc.text('www.positiveimgeschools.com', 105, yPos + 20, { align: 'center' });
  
  // Save the PDF
  doc.save(`Receipt_${paymentReference}.pdf`);
};

// Generate PDF for anthem lyrics
export const generateAnthemLyricsPDF = () => {
  const doc = new jsPDF();
  
  // School colors
  const primaryColor: [number, number, number] = [27, 20, 100]; // #1B1464
  const accentColor: [number, number, number] = [255, 244, 178]; // #FFF4B2
  
  // Header with school name
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('POSITIVE IMAGE SCHOOLS', 105, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('School Anthem', 105, 30, { align: 'center' });
  
  // Title
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('POSITIVE IMAGE', 105, 55, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'italic');
  doc.text('Official School Anthem', 105, 63, { align: 'center' });
  
  // Lyrics
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  let yPos = 80;
  const lineHeight = 7;
  
  // Verse 1
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.text('Verse 1:', 105, yPos, { align: 'center' });
  yPos += lineHeight + 3;
  
  doc.setFont('helvetica', 'normal');
  const verse1 = [
    'Positive! Positive!! Positive Image There I go, there you go',
    'Go to learn for life, May the God of Universe, Make me reach my goal,',
    'In future to become a future leader.'
  ];
  
  verse1.forEach(line => {
    doc.text(line, 105, yPos, { align: 'center' });
    yPos += lineHeight;
  });
  
  yPos += 5;
  
  // Verse 2
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.text('Verse 2:', 105, yPos, { align: 'center' });
  yPos += lineHeight + 3;
  
  doc.setFont('helvetica', 'normal');
  const verse2 = [
    'No matter what situation, I will still be there.',
    'Because I want to become Success in my life.',
    'No matter what devil say, No controversy,',
    'Positive! Positive!! Positive Image.'
  ];
  
  verse2.forEach(line => {
    doc.text(line, 105, yPos, { align: 'center' });
    yPos += lineHeight;
  });
  
  yPos += 5;
  
  // Verse 3
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.text('Verse 3:', 105, yPos, { align: 'center' });
  yPos += lineHeight + 3;
  
  doc.setFont('helvetica', 'normal');
  const verse3 = [
    'Proprietor, our teachers and our Parents Let us reason together,',
    'To make a progress. Payment of our School levies is our concern.',
    'Divided we fall, United we stand.'
  ];
  
  verse3.forEach(line => {
    doc.text(line, 105, yPos, { align: 'center' });
    yPos += lineHeight;
  });
  
  yPos += 5;
  
  // Bridge
  doc.setFont('helvetica', 'bold');
  doc.setFillColor(...accentColor);
  doc.rect(20, yPos - 5, 170, 8, 'F');
  doc.text('Bridge:', 105, yPos, { align: 'center' });
  yPos += lineHeight + 3;
  
  doc.setFont('helvetica', 'normal');
  const bridge = [
    'Glory! Glory! Glory! Positive Image',
    'Wisdom embassy, Positive Image, No matter what devil say,',
    'We will overcome',
    'Overcome, Overcome, Positive Image.'
  ];
  
  bridge.forEach(line => {
    doc.text(line, 105, yPos, { align: 'center' });
    yPos += lineHeight;
  });
  
  // Footer
  yPos = 270;
  doc.setFillColor(...primaryColor);
  doc.rect(0, yPos, 210, 27, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('13 Sangogade Street, Akoyoyo Area, Amuloko, Ibadan, Oyo State', 105, yPos + 8, { align: 'center' });
  doc.text('Phone: +234 8152122218  | Email: info@positiveimgeschools.com', 105, yPos + 14, { align: 'center' });
  doc.text('www.positiveimgeschools.com', 105, yPos + 20, { align: 'center' });
  
  // Save the PDF
  doc.save('Positive_Image_Schools_Anthem.pdf');
};
