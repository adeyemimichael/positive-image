// Alternative email service using Formspree
// This is simpler than EmailJS - just requires a Formspree form endpoint

export const sendRegistrationWithFormspree = async (registrationData: any): Promise<boolean> => {
  try {
    // Replace 'YOUR_FORM_ID' with your actual Formspree form ID
    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
    
    // Prepare the data for Formspree
    const formData = {
      // Basic info
      subject: `New Student Registration - ${registrationData.campus}`,
      studentName: registrationData.fullName,
      campus: registrationData.campus,
      className: registrationData.classApplyingFor,
      registrationFee: registrationData.registrationFee,
      registrationId: registrationData.id,
      registrationDate: registrationData.registrationDate,
      
      // Parent contact
      fatherName: registrationData.fatherName,
      fatherPhone: registrationData.fatherPhone,
      fatherEmail: registrationData.fatherEmail,
      motherName: registrationData.motherName,
      motherPhone: registrationData.motherPhone,
      motherEmail: registrationData.motherEmail,
      
      // Student details
      dateOfBirth: registrationData.dateOfBirth,
      gender: registrationData.gender,
      stateOfOrigin: registrationData.stateOfOrigin,
      nationality: registrationData.nationality,
      
      // Address
      homeAddress: registrationData.homeAddress,
      city: registrationData.city,
      state: registrationData.state,
      
      // Emergency contact
      emergencyContactName: registrationData.emergencyContactName,
      emergencyContactPhone: registrationData.emergencyContactPhone,
      emergencyContactRelationship: registrationData.emergencyContactRelationship,
      
      // Academic
      previousSchool: registrationData.previousSchool || 'Not provided',
      previousClass: registrationData.previousClass || 'Not provided',
      
      // Additional
      specialNeeds: registrationData.specialNeeds || 'None',
      extracurricularInterests: registrationData.extracurricularInterests || 'None',
      howDidYouHearAboutUs: registrationData.howDidYouHearAboutUs || 'Not specified',
      additionalComments: registrationData.additionalComments || 'None',
      
      // Full data as JSON for reference
      fullRegistrationData: JSON.stringify(registrationData, null, 2)
    };

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      console.log('Registration data sent successfully via Formspree');
      return true;
    } else {
      console.error('Formspree submission failed:', response.statusText);
      return false;
    }
  } catch (error) {
    console.error('Error sending registration via Formspree:', error);
    return false;
  }
};

// Simple setup instructions for Formspree
export const FORMSPREE_SETUP_INSTRUCTIONS = `
🚀 FORMSPREE SETUP (Easiest Option):

1. Go to https://formspree.io/
2. Sign up for free account
3. Create a new form
4. Copy your form endpoint (looks like: https://formspree.io/f/xxxxxxxx)
5. Replace 'YOUR_FORM_ID' in formspreeService.ts with your actual form ID
6. Update Register.tsx to use sendRegistrationWithFormspree instead of sendRegistrationEmail

That's it! Formspree will email you all form submissions automatically.
`;