import { EMAIL_CONFIG, replaceTemplateVariables } from '../config/email';
import emailjs from '@emailjs/browser';

// Email service for sending registration data to admin
export interface EmailData {
  studentName: string;
  campus: string;
  className: string;
  registrationFee: number;
  parentEmail: string;
  parentPhone: string;
  registrationData: any;
}

export const sendRegistrationEmail = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Prepare email content using template
    const emailSubject = replaceTemplateVariables(EMAIL_CONFIG.TEMPLATES.REGISTRATION_SUBJECT, {
      campus: emailData.campus
    });

    const emailBody = replaceTemplateVariables(EMAIL_CONFIG.TEMPLATES.REGISTRATION_BODY, {
      campus: emailData.campus,
      studentName: emailData.studentName,
      className: emailData.className,
      registrationFee: emailData.registrationFee.toLocaleString(),
      registrationDate: emailData.registrationData.registrationDate,
      registrationId: emailData.registrationData.id,
      
      // Parent information
      fatherName: emailData.registrationData.fatherName || 'Not provided',
      fatherPhone: emailData.registrationData.fatherPhone || 'Not provided',
      fatherEmail: emailData.registrationData.fatherEmail || 'Not provided',
      motherName: emailData.registrationData.motherName || 'Not provided',
      motherPhone: emailData.registrationData.motherPhone || 'Not provided',
      motherEmail: emailData.registrationData.motherEmail || 'Not provided',
      
      // Student details
      dateOfBirth: emailData.registrationData.dateOfBirth || 'Not provided',
      gender: emailData.registrationData.gender || 'Not provided',
      stateOfOrigin: emailData.registrationData.stateOfOrigin || 'Not provided',
      nationality: emailData.registrationData.nationality || 'Not provided',
      
      // Address
      homeAddress: emailData.registrationData.homeAddress || 'Not provided',
      city: emailData.registrationData.city || 'Not provided',
      state: emailData.registrationData.state || 'Not provided',
      
      // Emergency contact
      emergencyContactName: emailData.registrationData.emergencyContactName || 'Not provided',
      emergencyContactRelationship: emailData.registrationData.emergencyContactRelationship || 'Not provided',
      emergencyContactPhone: emailData.registrationData.emergencyContactPhone || 'Not provided',
      
      // Academic
      previousSchool: emailData.registrationData.previousSchool || 'Not provided',
      previousClass: emailData.registrationData.previousClass || 'Not provided',
      
      // Additional
      specialNeeds: emailData.registrationData.specialNeeds || 'None',
      extracurricularInterests: emailData.registrationData.extracurricularInterests || 'None',
      howDidYouHearAboutUs: emailData.registrationData.howDidYouHearAboutUs || 'Not specified'
    });
    
    const emailContent = {
      to_email: EMAIL_CONFIG.ADMIN_EMAIL,
      subject: emailSubject,
      message: emailBody,
      student_name: emailData.studentName,
      campus: emailData.campus,
      registration_id: emailData.registrationData.id
    };

    // Log email content for debugging
    console.log('Sending registration email to admin:', {
      to: EMAIL_CONFIG.ADMIN_EMAIL,
      subject: emailSubject,
      studentName: emailData.studentName,
      campus: emailData.campus
    });
    
    // Send email using EmailJS
    try {
      const result = await emailjs.send(
        EMAIL_CONFIG.EMAILJS.SERVICE_ID,
        EMAIL_CONFIG.EMAILJS.TEMPLATE_ID,
        {
          to_email: EMAIL_CONFIG.ADMIN_EMAIL,
          subject: emailSubject,
          message: emailBody,
          student_name: emailData.studentName,
          campus: emailData.campus,
          class_name: emailData.className,
          registration_fee: emailData.registrationFee.toLocaleString(),
          parent_email: emailData.parentEmail,
          parent_phone: emailData.parentPhone,
          registration_id: emailData.registrationData.id,
          registration_date: emailData.registrationData.registrationDate
        },
        EMAIL_CONFIG.EMAILJS.USER_ID
      );
      
      console.log('Email sent successfully:', result);
      return true;
    } catch (emailError) {
      console.error('EmailJS failed:', emailError);
      
      // Fallback: Log the email content for manual processing
      console.log('Email content for manual processing:', {
        to: EMAIL_CONFIG.ADMIN_EMAIL,
        subject: emailSubject,
        body: emailBody
      });
      
      return false;
    }
  } catch (error) {
    console.error('Failed to send registration email:', error);
    return false;
  }
};

// Alternative: Using EmailJS (you'll need to install emailjs-com)
export const sendEmailWithEmailJS = async (emailData: EmailData): Promise<boolean> => {
  try {
    // Uncomment and configure when you have EmailJS setup
    /*
    const emailjs = require('emailjs-com');
    
    const templateParams = {
      to_email: 'admin@school.com',
      student_name: emailData.studentName,
      campus: emailData.campus,
      class_name: emailData.className,
      registration_fee: emailData.registrationFee,
      parent_email: emailData.parentEmail,
      parent_phone: emailData.parentPhone,
      registration_details: JSON.stringify(emailData.registrationData, null, 2)
    };

    await emailjs.send(
      'YOUR_SERVICE_ID',
      'YOUR_TEMPLATE_ID',
      templateParams,
      'YOUR_USER_ID'
    );
    */
    
    return true;
  } catch (error) {
    console.error('EmailJS failed:', error);
    return false;
  }
};