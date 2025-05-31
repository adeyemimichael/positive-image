import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import { Student } from '../types';
import { generateId } from '../utils/helpers';

const Register: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<Omit<Student, 'id' | 'registrationDate'>>();

  const classOptions = [
    { value: 'Nursery 1', label: 'Nursery 1' },
    { value: 'Nursery 2', label: 'Nursery 2' },
    { value: 'Primary 1', label: 'Primary 1' },
    { value: 'Primary 2', label: 'Primary 2' },
    { value: 'Primary 3', label: 'Primary 3' },
    { value: 'Primary 4', label: 'Primary 4' },
    { value: 'Primary 5', label: 'Primary 5' },
    { value: 'Primary 6', label: 'Primary 6' },
    { value: 'JSS 1', label: 'JSS 1' },
    { value: 'JSS 2', label: 'JSS 2' },
    { value: 'JSS 3', label: 'JSS 3' },
    { value: 'SSS 1', label: 'SSS 1' },
    { value: 'SSS 2', label: 'SSS 2' },
    { value: 'SSS 3', label: 'SSS 3' },
  ];

  const onSubmit = async (data: Omit<Student, 'id' | 'registrationDate'>) => {
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Create a new student object
      const newStudent: Student = {
        ...data,
        id: generateId(),
        registrationDate: new Date().toISOString().split('T')[0]
      };
      
      // In a real application, you would send this to your backend
      console.log('New student registration:', newStudent);
      
      // Show success message and reset form
      setIsSuccess(true);
      setIsSubmitting(false);
      reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div>
      {/* Header */}
      <section className="pt-32 pb-20 bg-primary-700">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Student Registration</h1>
            <p className="text-xl opacity-90">
              Join our community of learners and begin your educational journey with us.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8"
          >
            {isSuccess ? (
              <div className="bg-success-50 border border-success-500 text-success-700 px-4 py-3 rounded mb-6">
                <p className="font-medium">Registration Successful!</p>
                <p>Thank you for registering. We will contact you soon with further information.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-8">
                <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-4">
                  Student Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="fullName"
                    label="Full Name"
                    placeholder="Enter student's full name"
                    {...register("fullName", { 
                      required: "Full name is required" 
                    })}
                    error={errors.fullName?.message}
                  />
                  
                  <Input
                    id="age"
                    label="Age"
                    type="number"
                    placeholder="Enter student's age"
                    {...register("age", { 
                      required: "Age is required",
                      valueAsNumber: true,
                      min: { value: 2, message: "Age must be at least 2" },
                      max: { value: 20, message: "Age must not exceed 20" }
                    })}
                    error={errors.age?.message}
                  />
                  
                  <Select
                    id="class"
                    label="Class"
                    options={classOptions}
                    {...register("class", { 
                      required: "Class is required" 
                    })}
                    error={errors.class?.message}
                  />
                  
                  <Input
                    id="photo"
                    label="Photo URL (optional)"
                    placeholder="Enter URL to student's photo"
                    {...register("photo")}
                    error={errors.photo?.message}
                  />
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-4">
                  Parent/Guardian Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="parentName"
                    label="Parent/Guardian Name"
                    placeholder="Enter parent's full name"
                    {...register("parentName", { 
                      required: "Parent name is required" 
                    })}
                    error={errors.parentName?.message}
                  />
                  
                  <Input
                    id="contactInfo"
                    label="Contact Number"
                    placeholder="Enter contact number"
                    {...register("contactInfo", { 
                      required: "Contact number is required",
                      pattern: {
                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                        message: "Please enter a valid phone number"
                      }
                    })}
                    error={errors.contactInfo?.message}
                  />
                  
                  <div className="md:col-span-2">
                    <TextArea
                      id="address"
                      label="Home Address"
                      placeholder="Enter complete home address"
                      {...register("address", { 
                        required: "Address is required" 
                      })}
                      error={errors.address?.message}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Submit Registration'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Register;