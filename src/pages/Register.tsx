import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Camera, CheckCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import { generateId } from '../utils/helpers';
import { sendRegistrationEmail } from '../utils/emailService';
import { sendRegistrationWithFormspree } from '../utils/formspreeService';

interface RegistrationFormData {
  // Campus Information
  campus: string;
  
  // Student Information
  fullName: string;
  dateOfBirth: string;
  gender: string;
  stateOfOrigin: string;
  localGovernment: string;
  nationality: string;
  religion: string;
  bloodGroup: string;
  medicalConditions: string;
  passportPhoto: FileList;

  // Academic Information
  classApplyingFor: string;
  previousSchool: string;
  previousClass: string;
  reasonForLeaving: string;

  // Parent/Guardian Information
  fatherName: string;
  fatherOccupation: string;
  fatherPhone: string;
  fatherEmail: string;
  motherName: string;
  motherOccupation: string;
  motherPhone: string;
  motherEmail: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  guardianEmail: string;

  // Contact Information
  homeAddress: string;
  city: string;
  state: string;
  postalCode: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;

  // Additional Information
  specialNeeds: string;
  extracurricularInterests: string;
  howDidYouHearAboutUs: string;
  additionalComments: string;
}

const Register: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [selectedCampus, setSelectedCampus] = useState('');
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue
  } = useForm<RegistrationFormData>();

  const watchedClass = watch('classApplyingFor');

  const campusOptions = [
    {
      value: 'amuloko',
      label: 'Akoyoyo, Amuloko  Campus',
      address: '13 Sangogade Street Akoyoyo Area, Amuloko, Ibadan, Oyo State',
      description: 'Our main campus with state-of-the-art facilities and comprehensive programs'
    },
    {
      value: 'odeyale',
      label: ' Odeyale Ajia ( Elebolo Junction) Campus ',
      address: ' Elebolo Junction Opposite Petrocam Gas Station Odeyale Ajia ',
      description: 'Modern campus with specialized learning environments and innovative teaching methods'
    }
  ];

  const handleCampusSelection = (campus: string) => {
    setSelectedCampus(campus);
    setValue('campus', campus);
    
    // Show form with animation delay
    setTimeout(() => {
      setShowForm(true);
    }, 300);
  };

  const handlePassportUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      setPassportFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPassportPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Set form value properly for validation
      setValue('passportPhoto', event.target.files as FileList, {
        shouldValidate: true,
        shouldDirty: true
      });
    }
  };

  const removePassportPhoto = () => {
    setPassportFile(null);
    setPassportPreview(null);
    setValue('passportPhoto', null as any, {
      shouldValidate: true,
      shouldDirty: true
    });
  };

  const classOptions = [
    { value: 'Nursery 1', label: 'Nursery 1', category: 'primary' },
    { value: 'Nursery 2', label: 'Nursery 2', category: 'primary' },
    { value: 'Primary 1', label: 'Primary 1', category: 'primary' },
    { value: 'Primary 2', label: 'Primary 2', category: 'primary' },
    { value: 'Primary 3', label: 'Primary 3', category: 'primary' },
    { value: 'Primary 4', label: 'Primary 4', category: 'primary' },
    { value: 'Primary 5', label: 'Primary 5', category: 'primary' },
    { value: 'Primary 6', label: 'Primary 6', category: 'primary' },
    { value: 'JSS 1', label: 'JSS 1', category: 'secondary' },
    { value: 'JSS 2', label: 'JSS 2', category: 'secondary' },
    { value: 'JSS 3', label: 'JSS 3', category: 'secondary' },
    { value: 'SSS 1', label: 'SSS 1', category: 'secondary' },
    { value: 'SSS 2', label: 'SSS 2', category: 'secondary' },
    { value: 'SSS 3', label: 'SSS 3', category: 'secondary' },
  ];

  const getRegistrationFee = (className: string) => {
    const classInfo = classOptions.find(option => option.value === className);
    return classInfo?.category === 'secondary' ? 5000 : 3500;
  };

  const nigerianStates = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
    'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara'
  ];

  const onSubmit = async (data: RegistrationFormData) => {
    console.log('Form submitted with data:', data);
    setIsSubmitting(true);

    try {
      // Store registration data in localStorage for payment page
      const registrationData = {
        ...data,
        id: generateId(),
        registrationDate: new Date().toISOString().split('T')[0],
        registrationFee: getRegistrationFee(data.classApplyingFor),
        campus: selectedCampus
      };

      console.log('Registration data prepared:', registrationData);
      localStorage.setItem('pendingRegistration', JSON.stringify(registrationData));

      // Send email to admin
      const emailData = {
        studentName: data.fullName,
        campus: campusOptions.find(c => c.value === selectedCampus)?.label || selectedCampus,
        className: data.classApplyingFor,
        registrationFee: getRegistrationFee(data.classApplyingFor),
        parentEmail: data.fatherEmail || data.motherEmail || 'Not provided',
        parentPhone: data.fatherPhone || data.motherPhone || 'Not provided',
        registrationData
      };

      // Send email notification to admin
      // Choose one of these methods:
      
      // Method 1: EmailJS (requires EmailJS setup)
      const emailSent = await sendRegistrationEmail(emailData);
      
      // Method 2: Formspree (simpler, uncomment to use)
      // const emailSent = await sendRegistrationWithFormspree(registrationData);
      
      if (!emailSent) {
        console.warn('Failed to send email notification to admin');
        // Don't show alert - registration is still successful
        // The admin can check registrations from the system
      } else {
        console.log('Email notification sent successfully to admin');
      }
      // Navigate to payment page
      console.log('Navigating to payment page...');
      navigate('/payment', {
        state: {
          registrationData,
          fee: getRegistrationFee(data.classApplyingFor),
          studentName: data.fullName,
          className: data.classApplyingFor,
          campus: campusOptions.find(c => c.value === selectedCampus)?.label
        }
      });
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (errors: any) => {
    console.log('Form validation errors:', errors);
    alert('Please fill in all required fields before proceeding.');
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-[#1B1464] to-[#6B46C1]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Student Registration</h1>
            <p className="text-xl opacity-90 mb-6">
              Join our community of learners and begin your educational journey with us.
            </p>

            {/* Registration Form Image */}
            <div className="mb-8">
              {/* <img 
                src="/reg-form.jpg" 
                alt="Registration Form Sample" 
                className="max-w-md mx-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity"
              /> */}
              <p className="text-sm mt-2 text-[#FFF4B2]">Sample of our registration form</p>
            </div>

            {/* Fee Information */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#FFF4B2] mb-4">Registration Fees</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <h4 className="font-semibold text-lg">Primary School</h4>
                  <p className="text-2xl font-bold text-[#FFF4B2]">₦3,000</p>
                  <p className="text-sm opacity-90">Nursery - Primary 6</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4">
                  <h4 className="font-semibold text-lg">Secondary School</h4>
                  <p className="text-2xl font-bold text-[#FFF4B2]">₦5,000</p>
                  <p className="text-sm opacity-90">JSS 1 - SSS 3</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Campus Selection */}
      {!selectedCampus && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1B1464] mb-6">
                Choose Your Campus
              </h2>
              <p className="text-lg text-gray-600 mb-12">
                Select the campus where you'd like to register your child
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                {campusOptions.map((campus) => (
                  <motion.div
                    key={campus.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl shadow-lg border-2 border-gray-100 hover:border-[#6FC1FF] transition-all duration-300 cursor-pointer overflow-hidden"
                    onClick={() => handleCampusSelection(campus.value)}
                  >
                    <div className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-[#1B1464] to-[#6B46C1] rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="text-white font-bold text-xl">
                          {campus.label.charAt(0)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-[#1B1464] mb-3">
                        {campus.label}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 text-sm">
                        {campus.address}
                      </p>
                      
                      <p className="text-gray-700 mb-6">
                        {campus.description}
                      </p>
                      
                      <button className="bg-gradient-to-r from-[#6FC1FF] to-[#6B46C1] text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        Select This Campus
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Registration Form */}
      {selectedCampus && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            {/* Campus Selection Summary */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-6xl mx-auto mb-8"
            >
              <div className="bg-gradient-to-r from-[#6FC1FF]/10 to-[#FFF4B2]/20 rounded-2xl p-6 border border-[#6FC1FF]/20">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#1B1464]">
                      Selected Campus: {campusOptions.find(c => c.value === selectedCampus)?.label}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {campusOptions.find(c => c.value === selectedCampus)?.address}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedCampus('');
                      setShowForm(false);
                    }}
                    className="text-[#D6261D] hover:text-[#D6261D]/80 font-semibold text-sm"
                  >
                    Change Campus
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showForm ? 1 : 0, y: showForm ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-10"
            >
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-10">
              {/* Hidden Campus Field */}
              <input
                type="hidden"
                {...register("campus", { value: selectedCampus })}
              />
              
              {/* Student Information */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-semibold text-[#1B1464] mb-6 flex items-center">
                  <span className="bg-[#6FC1FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Student Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Input
                    id="fullName"
                    label="Full Name *"
                    placeholder="Enter student's full name"
                    {...register("fullName", { required: "Full name is required" })}
                    error={errors.fullName?.message}
                  />

                  {/* Passport Photo Upload */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Photograph (Optional)
                    </label>
                    <div className="flex items-start gap-4">
                      {/* Upload Area */}
                      <div className="flex-1">
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="passportUpload"
                            {...register("passportPhoto", {
                              onChange: handlePassportUpload
                            })}
                          />
                          <label
                            htmlFor="passportUpload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#6FC1FF] rounded-lg cursor-pointer bg-[#6FC1FF]/5 hover:bg-[#6FC1FF]/10 transition-colors"
                          >
                            <Upload size={32} className="text-[#6FC1FF] mb-2" />
                            <span className="text-sm text-gray-600 text-center">
                              Click to upload passport photo<br />
                              <span className="text-xs text-gray-500">Max size: 5MB, Format: JPG, PNG</span>
                            </span>
                          </label>
                        </div>
                        {errors.passportPhoto && (
                          <p className="text-red-500 text-sm mt-1">{errors.passportPhoto.message}</p>
                        )}
                      </div>

                      {/* Preview Area */}
                      {passportPreview && (
                        <div className="relative">
                          <div className="w-32 h-32 border-2 border-[#6FC1FF] rounded-lg overflow-hidden bg-white">
                            <img
                              src={passportPreview}
                              alt="Passport Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={removePassportPhoto}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                          <div className="mt-2 flex items-center justify-center">
                            <CheckCircle size={16} className="text-green-500 mr-1" />
                            <span className="text-xs text-green-600 font-medium">Photo uploaded</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Photo Requirements */}
                    <div className="mt-3 p-3 bg-[#FFF4B2]/20 rounded-lg">
                      <h4 className="text-sm font-semibold text-[#1B1464] mb-2 flex items-center">
                        <Camera size={16} className="mr-2" />
                        Photo Requirements:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Recent passport-size photograph (not older than 6 months)</li>
                        <li>• Clear, high-quality image with white or light blue background</li>
                        <li>• Student should be looking directly at the camera</li>
                        <li>• No sunglasses, hats, or head coverings (except for religious reasons)</li>
                        <li>• File formats: JPG, PNG, JPEG</li>
                        <li>• Maximum file size: 5MB</li>
                      </ul>
                    </div>
                  </div>

                  <Input
                    id="dateOfBirth"
                    label="Date of Birth *"
                    type="date"
                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                    error={errors.dateOfBirth?.message}
                  />

                  <Select
                    id="gender"
                    label="Gender *"
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' }
                    ]}
                    {...register("gender", { required: "Gender is required" })}
                    error={errors.gender?.message}
                  />

                  <Select
                    id="stateOfOrigin"
                    label="State of Origin *"
                    options={nigerianStates.map(state => ({ value: state, label: state }))}
                    {...register("stateOfOrigin", { required: "State of origin is required" })}
                    error={errors.stateOfOrigin?.message}
                  />

                  <Input
                    id="localGovernment"
                    label="Local Government Area *"
                    placeholder="Enter LGA"
                    {...register("localGovernment", { required: "LGA is required" })}
                    error={errors.localGovernment?.message}
                  />

                  <Input
                    id="nationality"
                    label="Nationality *"
                    placeholder="e.g., Nigerian"
                    {...register("nationality", { required: "Nationality is required" })}
                    error={errors.nationality?.message}
                  />

                  <Input
                    id="religion"
                    label="Religion"
                    placeholder="Enter religion"
                    {...register("religion")}
                    error={errors.religion?.message}
                  />

                  <Select
                    id="bloodGroup"
                    label="Blood Group"
                    options={[
                      { value: 'A+', label: 'A+' },
                      { value: 'A-', label: 'A-' },
                      { value: 'B+', label: 'B+' },
                      { value: 'B-', label: 'B-' },
                      { value: 'AB+', label: 'AB+' },
                      { value: 'AB-', label: 'AB-' },
                      { value: 'O+', label: 'O+' },
                      { value: 'O-', label: 'O-' },
                      { value: 'Unknown', label: 'Unknown' }
                    ]}
                    {...register("bloodGroup")}
                    error={errors.bloodGroup?.message}
                  />

                  <div className="md:col-span-2">
                    <TextArea
                      id="medicalConditions"
                      label="Medical Conditions/Allergies"
                      placeholder="List any medical conditions, allergies, or special medical needs"
                      {...register("medicalConditions")}
                      error={errors.medicalConditions?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="bg-[#6FC1FF]/10 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-semibold text-[#1B1464] mb-6 flex items-center">
                  <span className="bg-[#6B46C1] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Academic Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <Select
                      id="classApplyingFor"
                      label="Class Applying For *"
                      options={classOptions.map(option => ({ value: option.value, label: option.label }))}
                      {...register("classApplyingFor", { required: "Class is required" })}
                      error={errors.classApplyingFor?.message}
                    />
                    {watchedClass && (
                      <div className="mt-2 p-3 bg-[#FFF4B2]/50 rounded-lg">
                        <p className="text-sm font-semibold text-[#1B1464]">
                          Registration Fee: ₦{getRegistrationFee(watchedClass).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>

                  <Input
                    id="previousSchool"
                    label="Previous School"
                    placeholder="Enter previous school name"
                    {...register("previousSchool")}
                    error={errors.previousSchool?.message}
                  />

                  <Input
                    id="previousClass"
                    label="Previous Class"
                    placeholder="Enter last class attended"
                    {...register("previousClass")}
                    error={errors.previousClass?.message}
                  />

                  <Input
                    id="reasonForLeaving"
                    label="Reason for Leaving Previous School"
                    placeholder="Enter reason"
                    {...register("reasonForLeaving")}
                    error={errors.reasonForLeaving?.message}
                  />
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div className="bg-[#FFF4B2]/20 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-semibold text-[#1B1464] mb-6 flex items-center">
                  <span className="bg-[#6FC1FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Parent/Guardian Information
                </h2>

                {/* Father's Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#D6261D] mb-4">Father's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                      id="fatherName"
                      label="Father's Full Name *"
                      placeholder="Enter father's full name"
                      {...register("fatherName", { required: "Father's name is required" })}
                      error={errors.fatherName?.message}
                    />

                    <Input
                      id="fatherOccupation"
                      label="Father's Occupation *"
                      placeholder="Enter father's occupation"
                      {...register("fatherOccupation", { required: "Father's occupation is required" })}
                      error={errors.fatherOccupation?.message}
                    />

                    <Input
                      id="fatherPhone"
                      label="Father's Phone Number *"
                      placeholder="Enter father's phone number"
                      {...register("fatherPhone", {
                        required: "Father's phone number is required",
                        pattern: {
                          value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      error={errors.fatherPhone?.message}
                    />

                    <Input
                      id="fatherEmail"
                      label="Father's Email"
                      type="email"
                      placeholder="Enter father's email"
                      {...register("fatherEmail", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address"
                        }
                      })}
                      error={errors.fatherEmail?.message}
                    />
                  </div>
                </div>

                {/* Mother's Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#D6261D] mb-4">Mother's Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                      id="motherName"
                      label="Mother's Full Name *"
                      placeholder="Enter mother's full name"
                      {...register("motherName", { required: "Mother's name is required" })}
                      error={errors.motherName?.message}
                    />

                    <Input
                      id="motherOccupation"
                      label="Mother's Occupation *"
                      placeholder="Enter mother's occupation"
                      {...register("motherOccupation", { required: "Mother's occupation is required" })}
                      error={errors.motherOccupation?.message}
                    />

                    <Input
                      id="motherPhone"
                      label="Mother's Phone Number *"
                      placeholder="Enter mother's phone number"
                      {...register("motherPhone", {
                        required: "Mother's phone number is required",
                        pattern: {
                          value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                          message: "Please enter a valid phone number"
                        }
                      })}
                      error={errors.motherPhone?.message}
                    />

                    <Input
                      id="motherEmail"
                      label="Mother's Email"
                      type="email"
                      placeholder="Enter mother's email"
                      {...register("motherEmail", {
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address"
                        }
                      })}
                      error={errors.motherEmail?.message}
                    />
                  </div>
                </div>

                {/* Guardian Information (if different) */}
                <div>
                  <h3 className="text-lg font-semibold text-[#D6261D] mb-4">Guardian Information (if different from parents)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Input
                      id="guardianName"
                      label="Guardian's Full Name"
                      placeholder="Enter guardian's full name"
                      {...register("guardianName")}
                      error={errors.guardianName?.message}
                    />

                    <Input
                      id="guardianRelationship"
                      label="Relationship to Student"
                      placeholder="e.g., Uncle, Aunt, Grandparent"
                      {...register("guardianRelationship")}
                      error={errors.guardianRelationship?.message}
                    />

                    <Input
                      id="guardianPhone"
                      label="Guardian's Phone Number"
                      placeholder="Enter guardian's phone number"
                      {...register("guardianPhone")}
                      error={errors.guardianPhone?.message}
                    />

                    <Input
                      id="guardianEmail"
                      label="Guardian's Email"
                      type="email"
                      placeholder="Enter guardian's email"
                      {...register("guardianEmail")}
                      error={errors.guardianEmail?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-semibold text-[#1B1464] mb-6 flex items-center">
                  <span className="bg-[#6FC1FF] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <TextArea
                      id="homeAddress"
                      label="Home Address *"
                      placeholder="Enter complete home address"
                      {...register("homeAddress", { required: "Home address is required" })}
                      error={errors.homeAddress?.message}
                    />
                  </div>

                  <Input
                    id="city"
                    label="City *"
                    placeholder="Enter city"
                    {...register("city", { required: "City is required" })}
                    error={errors.city?.message}
                  />

                  <Select
                    id="state"
                    label="State *"
                    options={nigerianStates.map(state => ({ value: state, label: state }))}
                    {...register("state", { required: "State is required" })}
                    error={errors.state?.message}
                  />

                  <Input
                    id="postalCode"
                    label="Postal Code"
                    placeholder="Enter postal code"
                    {...register("postalCode")}
                    error={errors.postalCode?.message}
                  />

                  <Input
                    id="emergencyContactName"
                    label="Emergency Contact Name *"
                    placeholder="Enter emergency contact name"
                    {...register("emergencyContactName", { required: "Emergency contact name is required" })}
                    error={errors.emergencyContactName?.message}
                  />

                  <Input
                    id="emergencyContactPhone"
                    label="Emergency Contact Phone *"
                    placeholder="Enter emergency contact phone"
                    {...register("emergencyContactPhone", {
                      required: "Emergency contact phone is required",
                      pattern: {
                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    error={errors.emergencyContactPhone?.message}
                  />

                  <Input
                    id="emergencyContactRelationship"
                    label="Emergency Contact Relationship *"
                    placeholder="Relationship to student"
                    {...register("emergencyContactRelationship", { required: "Emergency contact relationship is required" })}
                    error={errors.emergencyContactRelationship?.message}
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-[#6FC1FF]/10 rounded-2xl p-8">
                <h2 className="text-2xl font-heading font-semibold text-[#1B1464] mb-6 flex items-center">
                  <span className="bg-[#D6261D] text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                  Additional Information
                </h2>
                <div className="space-y-4">
                  <TextArea
                    id="specialNeeds"
                    label="Special Needs/Learning Difficulties"
                    placeholder="Please describe any special needs or learning difficulties"
                    {...register("specialNeeds")}
                    error={errors.specialNeeds?.message}
                  />

                  <TextArea
                    id="extracurricularInterests"
                    label="Extracurricular Interests"
                    placeholder="List student's interests in sports, arts, music, etc."
                    {...register("extracurricularInterests", {
                      required: "Please list at least one extracurricular interest"
                    })}
                    error={errors.extracurricularInterests?.message}
                    required
                  />

                  <Select
                    id="howDidYouHearAboutUs"
                    label="How did you hear about us?"
                    options={[
                      { value: 'Website', label: 'Website' },
                      { value: 'Social Media', label: 'Social Media' },
                      { value: 'Friend/Family', label: 'Friend/Family Referral' },
                      { value: 'Advertisement', label: 'Advertisement' },
                      { value: 'School Visit', label: 'School Visit' },
                      { value: 'Other', label: 'Other' }
                    ]}
                    {...register("howDidYouHearAboutUs")}
                    error={errors.howDidYouHearAboutUs?.message}
                  />

                  <TextArea
                    id="additionalComments"
                    label="Additional Comments"
                    placeholder="Any additional information you'd like to share"
                    {...register("additionalComments")}
                    error={errors.additionalComments?.message}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <div className="bg-gradient-to-r from-[#1B1464] to-[#D6261D] rounded-2xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">Ready to Submit?</h3>
                  <p className="text-white/90 mb-4">
                    After clicking submit, you'll be redirected to make your registration payment of{' '}
                    {watchedClass && (
                      <span className="font-bold text-[#FFF4B2]">
                        ₦{getRegistrationFee(watchedClass).toLocaleString()}
                      </span>
                    )}
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#FFF4B2] text-[#1B1464] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FFF4B2]/90 transition-colors duration-300 shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      )}
    </div>
  );
};

export default Register;