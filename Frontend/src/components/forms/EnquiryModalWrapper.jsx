// src/components/forms/EnquiryModalWrapper.jsx
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MessageCircle, User, Phone, Mail,
  Wrench, MessageSquare, CheckCircle, Send,
  Loader2, Sparkles, Home, IndianRupee, Calendar,
  MapPin, Clock, FileText, StickyNote
} from 'lucide-react';
import Button from '@components/ui/Button';
import FormField from '@components/ui/FormField';
import { COMPANY, SERVICE_OPTIONS } from '@utils/constants';
import { useEnquiry } from '@hooks/useEnquiry';
import { cn } from '@utils/helpers';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  phone: z.string().min(10, 'Enter a valid phone number').max(15)
    .regex(/^[+]?[\d\s\-()]+$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  propertyType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  address: z.string().optional(),
  meetingTime: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(500),
});

export default function EnquiryModalWrapper() {
  const { isEnquiryOpen, closeEnquiry, prefilledService } = useEnquiry();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      propertyType: '',
      budget: '',
      timeline: '',
      address: '',
      meetingTime: '',
      requirements: '',
      notes: '',
      message: '',
    },
  });

  // Set prefilled service when modal opens
  useEffect(() => {
    if (isEnquiryOpen && prefilledService) {
      setValue('service', prefilledService);
    }
  }, [isEnquiryOpen, prefilledService, setValue]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isEnquiryOpen) handleClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isEnquiryOpen]);

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const lines = [
      `🏠 *NEW LEAD — ${COMPANY.name}*`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `📋 *LEAD DETAILS*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `👤 *Name:* ${data.name}`,
      `📞 *Phone:* ${data.phone}`,
    ];
    
    if (data.email) lines.push(`📧 *Email:* ${data.email}`);
    
    lines.push(
      `🔧 *Service:* ${data.service}`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `🏠 *PROPERTY INFORMATION*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      ``,
    );
    
    if (data.propertyType) lines.push(`🏗️ *Property Type:* ${data.propertyType}`);
    if (data.budget) lines.push(`💰 *Budget:* ${data.budget}`);
    if (data.timeline) lines.push(`⏱️ *Timeline:* ${data.timeline}`);
    if (data.address) lines.push(`📍 *Address:* ${data.address}`);
    if (data.meetingTime) lines.push(`🕐 *Preferred Meeting Time:* ${data.meetingTime}`);
    
    if (data.requirements) {
      lines.push(
        ``,
        `━━━━━━━━━━━━━━━━━━━━━`,
        `📝 *REQUIREMENTS*`,
        `━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        data.requirements
      );
    }
    
    if (data.notes) {
      lines.push(
        ``,
        `━━━━━━━━━━━━━━━━━━━━━`,
        `📌 *ADDITIONAL NOTES*`,
        `━━━━━━━━━━━━━━━━━━━━━`,
        ``,
        data.notes
      );
    }
    
    lines.push(
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `💬 *MESSAGE FROM CLIENT*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      data.message,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `📱 *Source:* ${COMPANY.name} Website`,
      `🕐 *Submitted:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
      `━━━━━━━━━━━━━━━━━━━━━`
    );

    const msg = lines.join('\n');
    const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    }, 700);
  };

  const handleClose = () => {
    reset();
    setIsSubmitted(false);
    setIsSubmitting(false);
    closeEnquiry();
  };

  const inputStyles = cn(
    'w-full px-4 py-3 rounded-xl',
    'bg-dark-800/80 border border-dark-600/40',
    'text-dark-100 placeholder-dark-500',
    'focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:border-primary-400/50',
    'transition-all duration-300 hover:border-dark-500/60'
  );

  return (
    <AnimatePresence>
      {isEnquiryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog" aria-modal="true" aria-label="Enquiry Form">
          <motion.div
            className="absolute inset-0 bg-dark-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-elevated z-10"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 p-6 relative overflow-hidden">
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
<div className="pointer-events-none absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">New Lead Form</h2>
                  <p className="text-white/70 text-xs font-accent">
                    Fill details to get a quick response
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-dark-900 p-6 h-[80vh] overflow-y-auto overscroll-contain"
            onWheel={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </motion.div>
                    <h3 className="font-heading text-xl font-bold text-dark-50 mb-3">
                      Lead Submitted! ✅
                    </h3>
                    <p className="text-dark-300 text-sm">
                      We'll respond on WhatsApp shortly.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Basic Information */}
                    <FormField label="Full Name" error={errors.name?.message} required>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input type="text" placeholder="Enter full name"
                          className={cn(inputStyles, 'pl-10', errors.name && 'border-red-400/50')}
                          {...register('name')} />
                      </div>
                    </FormField>

                    <FormField label="Phone Number" error={errors.phone?.message} required>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input type="tel" placeholder="+91 98765 43210"
                          className={cn(inputStyles, 'pl-10', errors.phone && 'border-red-400/50')}
                          {...register('phone')} />
                      </div>
                    </FormField>

                    <FormField label="Email Address" error={errors.email?.message} helpText="Optional">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input type="email" placeholder="your@email.com"
                          className={cn(inputStyles, 'pl-10')}
                          {...register('email')} />
                      </div>
                    </FormField>

                    {/* Property Information */}
                    <div className="pt-2 pb-1">
                      <h3 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        Property Information
                      </h3>
                    </div>

                    <FormField label="Property Type" error={errors.propertyType?.message} helpText="Optional">
                      <div className="relative">
                        <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <select
                          className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                          {...register('propertyType')}>
                          <option value="">Select property type</option>
                          <option value="Residential - Apartment">Residential - Apartment</option>
                          <option value="Residential - Villa">Residential - Villa</option>
                          <option value="Residential - Independent House">Residential - Independent House</option>
                          <option value="Commercial - Office">Commercial - Office</option>
                          <option value="Commercial - Retail">Commercial - Retail</option>
                          <option value="Commercial - Warehouse">Commercial - Warehouse</option>
                          <option value="Industrial">Industrial</option>
                          <option value="Land/Plot">Land/Plot</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </FormField>

                    <FormField label="Budget Range" error={errors.budget?.message} helpText="Optional">
                      <div className="relative">
                        <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <select
                          className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                          {...register('budget')}>
                          <option value="">Select budget range</option>
                          <option value="Below ₹10 Lakhs">Below ₹10 Lakhs</option>
                          <option value="₹10 Lakhs - ₹25 Lakhs">₹10 Lakhs - ₹25 Lakhs</option>
                          <option value="₹25 Lakhs - ₹50 Lakhs">₹25 Lakhs - ₹50 Lakhs</option>
                          <option value="₹50 Lakhs - ₹75 Lakhs">₹50 Lakhs - ₹75 Lakhs</option>
                          <option value="₹75 Lakhs - ₹1 Crore">₹75 Lakhs - ₹1 Crore</option>
                          <option value="₹1 Crore - ₹2 Crore">₹1 Crore - ₹2 Crore</option>
                          <option value="₹2 Crore - ₹5 Crore">₹2 Crore - ₹5 Crore</option>
                          <option value="Above ₹5 Crore">Above ₹5 Crore</option>
                        </select>
                      </div>
                    </FormField>

                    <FormField label="Timeline" error={errors.timeline?.message} helpText="Optional">
                      <div className="relative">
                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <select
                          className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                          {...register('timeline')}>
                          <option value="">Select timeline</option>
                          <option value="Immediate (Within a week)">Immediate (Within a week)</option>
                          <option value="Urgent (Within 15 days)">Urgent (Within 15 days)</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="Within 3 months">Within 3 months</option>
                          <option value="Within 6 months">Within 6 months</option>
                          <option value="Just exploring">Just exploring</option>
                        </select>
                      </div>
                    </FormField>

                    <FormField label="Property Address" error={errors.address?.message} helpText="Optional">
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-500" />
                        <textarea rows={2} placeholder="Enter full property address"
                          className={cn(inputStyles, 'pl-10 resize-none')}
                          {...register('address')} />
                      </div>
                    </FormField>

                    <FormField label="Preferred Meeting Time" error={errors.meetingTime?.message} helpText="Optional">
                      <div className="relative">
                        <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input type="text" placeholder="e.g., Weekdays after 6 PM, Saturday morning"
                          className={cn(inputStyles, 'pl-10')}
                          {...register('meetingTime')} />
                      </div>
                    </FormField>

                    {/* Service & Requirements */}
                    <div className="pt-2 pb-1">
                      <h3 className="text-sm font-semibold text-primary-400 mb-2 flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Service & Requirements
                      </h3>
                    </div>

                    <FormField label="Service Required" error={errors.service?.message} required>
                      <div className="relative">
                        <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <select
                          className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none', errors.service && 'border-red-400/50')}
                          {...register('service')}>
                          <option value="">Select a service</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </FormField>

                    <FormField label="Specific Requirements" error={errors.requirements?.message} helpText="Optional">
                      <div className="relative">
                        <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-500" />
                        <textarea rows={3} placeholder="List any specific requirements or preferences..."
                          className={cn(inputStyles, 'pl-10 resize-none')}
                          {...register('requirements')} />
                      </div>
                    </FormField>

                    <FormField label="Additional Message" error={errors.message?.message} required>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-500" />
                        <textarea rows={3} placeholder="Tell us more about your project..."
                          className={cn(inputStyles, 'pl-10 resize-none', errors.message && 'border-red-400/50')}
                          {...register('message')} />
                      </div>
                    </FormField>

                    <FormField label="Additional Notes" error={errors.notes?.message} helpText="Optional">
                      <div className="relative">
                        <StickyNote className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-500" />
                        <textarea rows={2} placeholder="Any other information you'd like to share..."
                          className={cn(inputStyles, 'pl-10 resize-none')}
                          {...register('notes')} />
                      </div>
                    </FormField>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="whatsapp"
                        size="lg"
                        className="w-full"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        icon={isSubmitting ? Loader2 : Send}
                        iconPosition="left"
                      >
                        {isSubmitting ? 'Sending...' : 'Submit Lead via WhatsApp'}
                      </Button>
                    </div>

                    <p className="text-center text-dark-500 text-xs">
                      <MessageCircle className="w-3 h-3 inline mr-1" />
                      Lead will be sent directly to our team for immediate follow-up
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}