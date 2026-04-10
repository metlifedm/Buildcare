// src/sections/home/HomeEstimate.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, Mail, MapPin, Clock, Send, MessageCircle, 
  CheckCircle, User, Home, Ruler, Calendar, IndianRupee,
  Building2, Loader2
} from 'lucide-react';
import { COMPANY, SERVICE_OPTIONS } from '@utils/constants';
import { useEnquiry } from '@hooks/useEnquiry';
import { cn } from '@utils/helpers';
import Button from '@components/ui/Button';
import FormField from '@components/ui/FormField';
import ContactImg from '@assets/images/agitation1.jpg';

// Form validation schema
const estimateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  phone: z.string().min(10, 'Enter a valid phone number').max(15)
    .regex(/^[+]?[\d\s\-()]+$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  service: z.string().min(1, 'Please select a service'),
  propertySize: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500),
});

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: Mail, label: 'Email Us', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPin, label: 'Visit Us', value: COMPANY.address || 'Mumbai, India', href: '#' },
  { icon: Clock, label: 'Working Hours', value: COMPANY.workingHours || 'Mon-Sat: 10AM - 7PM', href: null },
];

const propertySizes = [
  'Below 500 sq ft',
  '500 - 1000 sq ft',
  '1000 - 1500 sq ft',
  '1500 - 2000 sq ft',
  '2000 - 3000 sq ft',
  'Above 3000 sq ft',
];

const budgetRanges = [
  'Below ₹5 Lakhs',
  '₹5 Lakhs - ₹10 Lakhs',
  '₹10 Lakhs - ₹20 Lakhs',
  '₹20 Lakhs - ₹35 Lakhs',
  '₹35 Lakhs - ₹50 Lakhs',
  'Above ₹50 Lakhs',
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
  const { openEnquiry } = useEnquiry();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(estimateSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      propertySize: '',
      budget: '',
      timeline: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Build WhatsApp message
    const lines = [
      `🏠 *FREE ESTIMATE REQUEST - ${COMPANY.name}*`,
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `📋 *CUSTOMER DETAILS*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `👤 *Name:* ${data.name}`,
      `📞 *Phone:* ${data.phone}`,
    ];
    
    if (data.email) lines.push(`📧 *Email:* ${data.email}`);
    
    lines.push(
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `🏠 *PROJECT DETAILS*`,
      `━━━━━━━━━━━━━━━━━━━━━`,
      ``,
      `🔧 *Service:* ${data.service}`,
    );
    
    if (data.propertySize) lines.push(`📐 *Property Size:* ${data.propertySize}`);
    if (data.budget) lines.push(`💰 *Budget Range:* ${data.budget}`);
    if (data.timeline) lines.push(`⏱️ *Timeline:* ${data.timeline}`);
    
    lines.push(
      ``,
      `━━━━━━━━━━━━━━━━━━━━━`,
      `💬 *MESSAGE*`,
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
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-3xl opacity-50" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          
          {/* Left Side - Image & Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8">
              <img
                src={ContactImg}
                alt="Luxury interior design consultation"
                className="w-full h-[400px] object-cover"
                // loading="lazy"
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
                    <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0 group-hover:bg-primary-200 transition-colors">
                      <item.icon className="w-5 h-5 text-primary-600" />
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
              className="mt-6 flex items-center justify-start gap-6 pt-4 border-t border-gray-100"
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

          {/* Right Side - Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Form Header */}
            <div className="bg-primary-600 px-6 py-6 text-center flex-shrink-0">
              <h2 className="font-heading text-2xl font-bold text-white mb-1">
                Get Free Estimate
              </h2>
              <p className="text-primary-100 text-sm">
                Fill the form & get response within 15 minutes
              </p>
            </div>

            {/* Form Body - No scrollbar, full height */}
            <div className="p-6 flex-1 overflow-y-auto scrollbar-hide">
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
                    Estimate Request Sent!
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
                  {/* Name */}
                  <FormField label="Full Name" error={errors.name?.message} required>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className={cn(inputStyles, 'pl-10', errors.name && 'border-red-400')}
                        {...register('name')}
                      />
                    </div>
                  </FormField>

                  {/* Phone */}
                  <FormField label="Phone Number" error={errors.phone?.message} required>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className={cn(inputStyles, 'pl-10', errors.phone && 'border-red-400')}
                        {...register('phone')}
                      />
                    </div>
                  </FormField>

                  {/* Email */}
                  <FormField label="Email Address" error={errors.email?.message} helpText="Optional">
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className={cn(inputStyles, 'pl-10', errors.email && 'border-red-400')}
                        {...register('email')}
                      />
                    </div>
                  </FormField>

                  {/* Service Required */}
                  <FormField label="Service Required" error={errors.service?.message} required>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none', errors.service && 'border-red-400')}
                        {...register('service')}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                      <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </FormField>

                  {/* Property Size */}
                  <FormField label="Property Size" error={errors.propertySize?.message} helpText="Optional">
                    <div className="relative">
                      <Ruler className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                        {...register('propertySize')}
                      >
                        <option value="">Select property size</option>
                        {propertySizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  </FormField>

                  {/* Budget Range */}
                  <FormField label="Budget Range" error={errors.budget?.message} helpText="Optional">
                    <div className="relative">
                      <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                        {...register('budget')}
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((budget) => (
                          <option key={budget} value={budget}>{budget}</option>
                        ))}
                      </select>
                    </div>
                  </FormField>

                  {/* Timeline */}
                  <FormField label="Timeline" error={errors.timeline?.message} helpText="Optional">
                    <div className="relative">
                      <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <select
                        className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none')}
                        {...register('timeline')}
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </FormField>

                  {/* Message */}
                  <FormField label="Project Details" error={errors.message?.message} required>
                    <div className="relative">
                      <Home className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project, requirements, and preferences..."
                        className={cn(inputStyles, 'pl-10 resize-none', errors.message && 'border-red-400')}
                        {...register('message')}
                      />
                    </div>
                  </FormField>

                  {/* Submit Button */}
                  <div className="pt-2">
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
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Add this style to hide scrollbar globally or use Tailwind plugin */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}