import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Input from '../components/ui/Input';
import TextArea from '../components/ui/TextArea';
import Button from '../components/ui/Button';
import { ContactMessage } from '../types';
import { generateId } from '../utils/helpers';

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset
  } = useForm<Omit<ContactMessage, 'id' | 'date'>>();

  const onSubmit = async (data: Omit<ContactMessage, 'id' | 'date'>) => {
    setIsSubmitting(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      // Create a new message object
      const newMessage: ContactMessage = {
        ...data,
        id: generateId(),
        date: new Date().toISOString()
      };
      
      // In a real application, you would send this to your backend
      console.log('New contact message:', newMessage);
      
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
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">Contact Us</h1>
            <p className="text-xl opacity-90">
              We'd love to hear from you. Reach out with any questions or feedback.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-6">
                  Send Us a Message
                </h2>
                
                {isSuccess && (
                  <div className="bg-success-50 border border-success-500 text-success-700 px-4 py-3 rounded mb-6">
                    <p className="font-medium">Message Sent Successfully!</p>
                    <p>Thank you for contacting us. We will get back to you as soon as possible.</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      id="name"
                      label="Your Name"
                      placeholder="Enter your full name"
                      {...register("name", { 
                        required: "Name is required" 
                      })}
                      error={errors.name?.message}
                    />
                    
                    <Input
                      id="email"
                      label="Email Address"
                      type="email"
                      placeholder="Enter your email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      error={errors.email?.message}
                    />
                  </div>
                  
                  <Input
                    id="subject"
                    label="Subject"
                    placeholder="What is this regarding?"
                    {...register("subject", { 
                      required: "Subject is required" 
                    })}
                    error={errors.subject?.message}
                  />
                  
                  <TextArea
                    id="message"
                    label="Message"
                    placeholder="Type your message here..."
                    rows={6}
                    {...register("message", { 
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters"
                      }
                    })}
                    error={errors.message?.message}
                  />
                  
                  <div className="mt-6">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                <h2 className="text-2xl font-heading font-semibold text-primary-700 mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <MapPin className="text-primary-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Our Location</h3>
                      <p className="text-gray-600">
                        123 Education Road<br />
                        Amuloko Area<br />
                        Ibadan, Oyo State<br />
                        Nigeria
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Mail className="text-primary-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        info@positiveimagesch.edu.ng<br />
                        admissions@positiveimagesch.edu.ng
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Phone className="text-primary-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        +234 803 123 4567<br />
                        +234 905 678 9012
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-3 rounded-full mr-4">
                      <Clock className="text-primary-700" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 8:00 AM - 4:00 PM<br />
                        Saturday: 9:00 AM - 12:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Simple Map or Image */}
                <div className="mt-8 rounded-lg overflow-hidden h-48 bg-gray-200">
                  <img 
                    src="https://images.pexels.com/photos/417344/pexels-photo-417344.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="School location map" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;