import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  
  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', data);
    setSuccess(true);
    reset();
    setIsLoading(false);
    
    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            {/* Contact Information */}
            <div className="md:w-1/3 bg-primary-600 text-white p-8">
              <h2 className="text-2xl font-bold mb-6">{t('contact.info.title')}</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-5 w-5 text-primary-200" />
                  <span>{t('contact.info.address')}</span>
                </div>
                
                <div className="flex items-start">
                  <Phone className="mr-3 h-5 w-5 text-primary-200" />
                  <span>{t('contact.info.phone')}</span>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mr-3 h-5 w-5 text-primary-200" />
                  <span>{t('contact.info.email')}</span>
                </div>
                
                <div className="flex items-start">
                  <Clock className="mr-3 h-5 w-5 text-primary-200" />
                  <span>{t('contact.info.hours')}</span>
                </div>
              </div>
              
              <div className="mt-12">
                <iframe 
                  className="w-full h-40 rounded-md"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63520.661229502875!2d2.3664945731251194!3d6.377201000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023550eec4f9287%3A0x535ba069f4a8758!2sCotonou%2C%20Benin!5e0!3m2!1sen!2sus!4v1715544381694!5m2!1sen!2sus" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:w-2/3 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('contact.title')}</h2>
                <p className="text-gray-600">{t('contact.subtitle')}</p>
              </div>
              
              {success && (
                <motion.div 
                  className="mb-6 p-4 bg-green-50 text-green-600 rounded-md"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Votre message a été envoyé avec succès. Nous vous contacterons bientôt!
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('contact.name')}
                    type="text"
                    id="name"
                    error={errors.name?.message}
                    {...register('name', { 
                      required: 'Name is required'
                    })}
                  />
                  
                  <Input
                    label={t('contact.email')}
                    type="email"
                    id="email"
                    error={errors.email?.message}
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      } 
                    })}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label={t('contact.phone')}
                    type="tel"
                    id="phone"
                    error={errors.phone?.message}
                    {...register('phone', { 
                      pattern: {
                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/i,
                        message: 'Invalid phone number'
                      } 
                    })}
                  />
                  
                  <Input
                    label={t('contact.subject')}
                    type="text"
                    id="subject"
                    error={errors.subject?.message}
                    {...register('subject', { 
                      required: 'Subject is required'
                    })}
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('contact.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className={`
                      block w-full rounded-md border-gray-300 shadow-sm
                      focus:border-primary-500 focus:ring-primary-500 sm:text-sm
                      py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-offset-0
                      ${errors.message ? 'border-red-500' : 'border-gray-300'}
                    `}
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: {
                        value: 10,
                        message: 'Message must be at least 10 characters'
                      }
                    })}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isLoading}
                >
                  {t('contact.button')}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;