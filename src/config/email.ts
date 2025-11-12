// Email configuration
export const EMAIL_CONFIG = {
  // Replace with your actual admin email
  ADMIN_EMAIL: 'admin@yourschool.com',
  
  // Email service settings
  SERVICE_TYPE: 'emailjs',
  
  // EmailJS configuration - Get these from https://www.emailjs.com/
  EMAILJS: {
    SERVICE_ID: 'service_xxxxxxx',    // Replace with your EmailJS service ID
    TEMPLATE_ID: 'template_xxxxxxx',  // Replace with your EmailJS template ID
    USER_ID: 'user_xxxxxxxxxxxxxxx'   // Replace with your EmailJS public key
  },
  
  // Email templates
  TEMPLATES: {
    REGISTRATION_SUBJECT: 'New Student Registration - {{campus}}',
    REGISTRATION_BODY: `
      New Student Registration Details:
      
      Campus: {{campus}}
      Student Name: {{studentName}}
      Class: {{className}}
      Registration Fee: ₦{{registrationFee}}
      Registration Date: {{registrationDate}}
      
      Parent Contact Information:
      Father: {{fatherName}} - {{fatherPhone}} - {{fatherEmail}}
      Mother: {{motherName}} - {{motherPhone}} - {{motherEmail}}
      
      Student Details:
      Date of Birth: {{dateOfBirth}}
      Gender: {{gender}}
      State of Origin: {{stateOfOrigin}}
      Nationality: {{nationality}}
      
      Address: {{homeAddress}}, {{city}}, {{state}}
      
      Emergency Contact: {{emergencyContactName}} ({{emergencyContactRelationship}}) - {{emergencyContactPhone}}
      
      Academic Information:
      Previous School: {{previousSchool}}
      Previous Class: {{previousClass}}
      
      Additional Information:
      Special Needs: {{specialNeeds}}
      Extracurricular Interests: {{extracurricularInterests}}
      How they heard about us: {{howDidYouHearAboutUs}}
      
      Please review and process this registration.
      
      Registration ID: {{registrationId}}
    `
  }
};

// Helper function to replace template variables
export const replaceTemplateVariables = (template: string, data: Record<string, any>): string => {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] || match;
  });
};