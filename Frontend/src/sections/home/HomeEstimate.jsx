// src/sections/home/HomeEstimate.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Phone, Mail, MapPin, Clock, Send, MessageCircle,
  CheckCircle, User, Home, Ruler, Calendar, IndianRupee,
  Building2, Loader2, Wrench, FileText, StickyNote,
  ArrowRight, ArrowLeft
} from 'lucide-react';
import { COMPANY, SERVICE_OPTIONS } from '@utils/constants';
import { useEnquiry } from '@hooks/useEnquiry';
import { cn } from '@utils/helpers';
import Button from '@components/ui/Button';
import FormField from '@components/ui/FormField';
import ContactImg from '@assets/images/contact-bg.jpg';

// Form validation schema
const estimateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  phone: z.string().min(10, 'Enter a valid phone number').max(15)
    .regex(/^[+]?[\d\s\-()]+$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  propertyType: z.string().min(1, 'Please select property type'),
  propertySubType: z.string().optional(),
  customPropertySubType: z.string().optional(),
  carpetArea: z.string().min(1, 'Please enter carpet area'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  address: z.string().optional(),
  meetingTime: z.string().optional(),
  requirements: z.string().optional(),
  notes: z.string().optional(),
  message: z.string().min(5, 'Message must be at least 5 characters').max(500),
});

// Property subtype options
const RESIDENTIAL_OPTIONS = ['1BHK', '2BHK', '3BHK', '4BHK', 'Bungalow', 'Villa', 'Studio Apartment', 'Penthouse'];
const COMMERCIAL_OPTIONS = ['Office', 'Restaurant', 'Hotel', 'Spa & Salon', 'Hospital', 'Retail Store', 'Warehouse', 'Coworking Space', 'Showroom', 'Gym', 'School', 'Other'];

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: Mail, label: 'Email Us', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: 'Visit Us', value: "89, Khuraiyya Estate", href: 'https://www.google.com/maps/place/Buildcare+Interior+Designers+%26+Modular+Kitchen+%7CBest+Painting%7C+Plumbing%7C+Interior+%26+exterior+Designer+In+Mumbai/@19.0766003,72.8711871,20.25z/data=!4m6!3m5!1s0x3be7c99586d51f59:0x1d3bbc110e536d21!8m2!3d19.0765304!4d72.8709913!16s%2Fg%2F11l77sqwbg?entry=ttu&g_ep=EgoyMDI2MDUwMi4wIKXMDSoASAFQAw%3D%3D' },
  { icon: Clock, label: 'Working Hours', value: COMPANY.workingHours || '24/7 Customer Support', href: null },
];

const timelines = [
  'Immediate (Within a week)',
  'Urgent (Within 15 days)',
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Just exploring',
];

export default function HomeEstimate() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [step, setStep] = useState(1);
  const { openEnquiry } = useEnquiry();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      propertyType: '',
      propertySubType: '',
      customPropertySubType: '',
      carpetArea: '',
      budget: '',
      timeline: '',
      address: '',
      meetingTime: '',
      requirements: '',
      notes: '',
      message: '',
    },
  });

  const watchPropertyType = watch('propertyType');
  const watchPropertySubType = watch('propertySubType');

  // Update selected property type and reset subtype when property type changes
  React.useEffect(() => {
    setSelectedPropertyType(watchPropertyType);
    setValue('propertySubType', '');
    setValue('customPropertySubType', '');
    setShowCustomInput(false);
  }, [watchPropertyType, setValue]);

  // Show custom input when "Other" is selected in commercial options
  React.useEffect(() => {
    if (selectedPropertyType === 'commercial' && watchPropertySubType === 'Other') {
      setShowCustomInput(true);
    } else {
      setShowCustomInput(false);
      setValue('customPropertySubType', '');
    }
  }, [watchPropertySubType, selectedPropertyType, setValue]);

  // Get the final property subtype value
  const getFinalPropertySubType = (data) => {
    if (data.propertyType === 'residential') {
      return data.propertySubType;
    } else if (data.propertyType === 'commercial') {
      if (data.propertySubType === 'Other' && data.customPropertySubType) {
        return `Other: ${data.customPropertySubType}`;
      }
      return data.propertySubType;
    }
    return '';
  };

  const getPropertySubTypeOptions = () => {
    if (selectedPropertyType === 'residential') {
      return RESIDENTIAL_OPTIONS;
    } else if (selectedPropertyType === 'commercial') {
      return COMMERCIAL_OPTIONS;
    }
    return [];
  };

  const nextStep = async () => {
    // Validate based on current step
    let isValid = false;

    if (step === 1) {
      // Step 1: Property Type and Carpet Area
      isValid = await trigger(['propertyType', 'carpetArea']);
    } else if (step === 2) {
      // Step 2: Personal Information
      isValid = await trigger(['name', 'phone', 'service']);
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data) => {
    setIsSubmitting(true);

    const finalPropertySubType = getFinalPropertySubType(data);
    const propertyTypeDisplay = data.propertyType === 'residential' ? 'Residential' :
      data.propertyType === 'commercial' ? 'Commercial' :
        data.propertyType === 'other' ? 'Other' : '';

    // Build WhatsApp message
    const lines = [
      `🏠 *FREE ESTIMATE REQUEST - ${COMPANY.name}*`,
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

    if (data.propertyType) {
      lines.push(`🏗️ *Property Type:* ${propertyTypeDisplay}`);
      if (finalPropertySubType) {
        lines.push(`📐 *Property Sub Type:* ${finalPropertySubType}`);
      }
    }

    if (data.carpetArea) lines.push(`📏 *Carpet Area:* ${data.carpetArea}`);
    if (data.budget) lines.push(`💰 *Budget:* ₹${data.budget}`);
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
      `📱 *Source:* ${COMPANY.name} Website (Estimate Form)`,
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
        reset();
        setIsSubmitted(false);
        setSelectedPropertyType('');
        setShowCustomInput(false);
        setStep(1);
      }, 3000);
    }, 700);
  };

  const inputStyles = cn(
    'w-full px-4 py-3 rounded-xl',
    'bg-gray-50 border border-gray-200',
    'text-gray-900 placeholder-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
    'transition-all duration-300 hover:border-gray-300'
  );

  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-label="Free Estimate">
      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">

          {/* Left Side - Image & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex flex-col"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 flex-shrink-0 h-[400px] lg:h-[500px]">
              <img
                src={ContactImg}
                alt="Luxury interior design consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Floating Badge */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-gray-900">Free Consultation</p>
                    <p className="text-gray-600 text-sm">No obligation, just expert advice</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Contact Information Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex-shrink-0"
            >
              <h3 className="font-heading text-2xl font-bold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 border border-gray-200 hover:border-primary-200 hover:shadow-md transition-all duration-300 group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary-400 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-700 transition-colors">
                      <item.icon className="w-5 h-5 text-dark-50" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-accent">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-gray-800 text-sm font-medium hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-gray-800 text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="mt-6 flex items-center justify-start gap-6 pt-4 border-t border-gray-100 flex-shrink-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">100% Transparent</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">No Hidden Costs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs text-gray-600">Free Site Visit</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col h-full"
          >
            {/* Form Header - Fixed */}
            <div className="bg-primary-600 px-6 py-6 text-center flex-shrink-0">
              <h2 className="font-heading text-2xl font-bold text-white! mb-1">
                Get Free Estimate
              </h2>
              <p className="text-dark-100 text-sm">
                Fill the form & get response within 12-24 business hours on WhatsApp
              </p>
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 1 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 2 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
                <div className={`h-2 rounded-full transition-all duration-300 ${step === 3 ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
              </div>
              <p className="text-white/80 text-xs mt-2">
                Step {step} of 3
              </p>
            </div>

            {/* Form Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </motion.div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 mb-3">
                    Estimate Request Sent! ✅
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Thank you for reaching out. Our team will contact you shortly on WhatsApp.
                  </p>
                  <p className="text-gray-500 text-xs">
                    We typically respond within 15 minutes during working hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                  <AnimatePresence mode="wait">
                    {/* Step 1 - Property Information */}
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="pt-2 pb-1">
                          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Personal Information
                          </h3>
                        </div>

                        <FormField label="Full Name" error={errors.name?.message} required>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Enter full name"
                              className={cn(inputStyles, 'pl-10', errors.name && 'border-red-400')}
                              {...register('name')} />
                          </div>
                        </FormField>

                        <FormField label="Phone Number" error={errors.phone?.message} required>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="tel" placeholder="+91 98765 43210"
                              className={cn(inputStyles, 'pl-10', errors.phone && 'border-red-400')}
                              {...register('phone')} />
                          </div>
                        </FormField>

                        <FormField label="Email Address" error={errors.email?.message} helpText="Optional">
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="email" placeholder="your@email.com"
                              className={cn(inputStyles, 'pl-10')}
                              {...register('email')} />
                          </div>
                        </FormField>

                        <div className="pt-2 pb-1">
                          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            Property Information
                          </h3>
                        </div>

                        <FormField label="Property Type" error={errors.propertyType?.message} required>
                          <div className="relative">
                            <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none', errors.propertyType && 'border-red-400')}
                              {...register('propertyType')}
                              onChange={(e) => {
                                register('propertyType').onChange(e);
                                setSelectedPropertyType(e.target.value);
                              }}>
                              <option value="">Select property type</option>
                              <option value="residential">Residential</option>
                              <option value="commercial">Commercial</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </FormField>

                        {/* Dynamic Property Sub Type Field */}
                        {selectedPropertyType && selectedPropertyType !== 'other' && (
                          <FormField
                            label={selectedPropertyType === 'residential' ? "Property Configuration" : "Property Type"}
                            error={errors.propertySubType?.message}
                            helpText={selectedPropertyType === 'residential' ? "Select your preferred configuration" : "Select commercial property type"}
                            required
                          >
                            <div className="relative">
                              <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                              <select
                                className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                                {...register('propertySubType')}
                              >
                                <option value="">Select {selectedPropertyType === 'residential' ? 'configuration' : 'type'}</option>
                                {getPropertySubTypeOptions().map((option) => (
                                  <option key={option} value={option}>{option}</option>
                                ))}
                              </select>
                            </div>
                          </FormField>
                        )}

                        {/* Custom Input for "Other" Commercial Option */}
                        {showCustomInput && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <FormField label="Specify Property Type" error={errors.customPropertySubType?.message}>
                              <div className="relative">
                                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Enter property type (e.g., Mall, Cinema Hall, Bank)"
                                  className={cn(inputStyles, 'pl-10')}
                                  {...register('customPropertySubType', {
                                    required: showCustomInput ? 'Please specify the property type' : false
                                  })}
                                />
                              </div>
                            </FormField>
                          </motion.div>
                        )}

                        {/* Custom Input for "Other" Property Type */}
                        {selectedPropertyType === 'other' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            <FormField label="Specify Property Type" error={errors.customPropertySubType?.message} required>
                              <div className="relative">
                                <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                  type="text"
                                  placeholder="Enter property type"
                                  className={cn(inputStyles, 'pl-10')}
                                  {...register('customPropertySubType', {
                                    required: selectedPropertyType === 'other' ? 'Please specify the property type' : false
                                  })}
                                />
                              </div>
                            </FormField>
                          </motion.div>
                        )}

                        <FormField label="Carpet Area" error={errors.carpetArea?.message} required>
                          <div className="relative">
                            <Ruler className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="e.g., 1200 sq.ft"
                              className={cn(inputStyles, 'pl-10', errors.carpetArea && 'border-red-400')}
                              {...register('carpetArea')}
                            />
                          </div>
                        </FormField>

                        <div className="pt-4">
                          <Button
                            type="button"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            onClick={nextStep}
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            Next: Personal Details
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2 - Personal Information */}
                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >

                        <FormField label="Service Required" error={errors.service?.message} required>
                          <div className="relative">
                            <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none', errors.service && 'border-red-400')}
                              {...register('service')}>
                              <option value="">Select a service</option>
                              {SERVICE_OPTIONS.map((s) => (
                                <option key={s} value={s}>{s}</option>
                              ))}
                            </select>
                          </div>
                        </FormField>

                        <div className="pt-2 pb-1">
                          <h3 className="text-sm font-semibold text-primary-600 mb-2 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Project Details
                          </h3>
                        </div>

                        <FormField label="Budget Range (in INR)" error={errors.budget?.message} helpText="Optional">
                          <div className="relative">
                            <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="number"
                              placeholder="Enter your budget in ₹"
                              className={cn(inputStyles, 'pl-10')}
                              {...register('budget')}
                            />
                          </div>
                        </FormField>

                        <FormField label="Timeline" error={errors.timeline?.message} helpText="Optional">
                          <div className="relative">
                            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <select
                              className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                              {...register('timeline')}>
                              <option value="">Select timeline</option>
                              {timelines.map((timeline) => (
                                <option key={timeline} value={timeline}>{timeline}</option>
                              ))}
                            </select>
                          </div>
                        </FormField>

                        <FormField label="Property Address" error={errors.address?.message} required>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                            <textarea rows={2} placeholder="Enter full property address"
                              className={cn(inputStyles, 'pl-10 resize-none')}
                              {...register('address')} />
                          </div>
                        </FormField>

                        <FormField label="Preferred Meeting Time" error={errors.meetingTime?.message} helpText="Optional">
                          <div className="relative">
                            <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="e.g., Weekdays after 6 PM, Saturday morning"
                              className={cn(inputStyles, 'pl-10')}
                              {...register('meetingTime')} />
                          </div>
                        </FormField>

                        <div className="pt-4 space-y-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={previousStep}
                            icon={ArrowLeft}
                            iconPosition="left"
                          >
                            Back
                          </Button>

                          <Button
                            type="button"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            onClick={nextStep}
                            icon={ArrowRight}
                            iconPosition="right"
                          >
                            Next: Project Details
                          </Button>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3 - Project Details */}
                    {step === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >

                        <FormField label="Specific Requirements" error={errors.requirements?.message} helpText="Optional">
                          <div className="relative">
                            <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                            <textarea rows={3} placeholder="List any specific requirements or preferences..."
                              className={cn(inputStyles, 'pl-10 resize-none')}
                              {...register('requirements')} />
                          </div>
                        </FormField>

                        <FormField label="Additional Message" error={errors.message?.message} required>
                          <div className="relative">
                            <MessageCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                            <textarea rows={3} placeholder="Tell us more about your project..."
                              className={cn(inputStyles, 'pl-10 resize-none', errors.message && 'border-red-400')}
                              {...register('message')} />
                          </div>
                        </FormField>

                        <FormField label="Additional Notes" error={errors.notes?.message} helpText="Optional">
                          <div className="relative">
                            <StickyNote className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                            <textarea rows={2} placeholder="Any other information you'd like to share..."
                              className={cn(inputStyles, 'pl-10 resize-none')}
                              {...register('notes')} />
                          </div>
                        </FormField>

                        <div className="pt-4 space-y-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            className="w-full"
                            onClick={previousStep}
                            icon={ArrowLeft}
                            iconPosition="left"
                          >
                            Back
                          </Button>

                          <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            icon={isSubmitting ? Loader2 : Send}
                            iconPosition="left"
                          >
                            {isSubmitting ? 'Sending...' : 'Get Free Estimate'}
                          </Button>
                        </div>

                        <p className="text-center text-gray-500 text-xs">
                          <MessageCircle className="w-3 h-3 inline mr-1" />
                          We'll respond on WhatsApp within 15 minutes
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}