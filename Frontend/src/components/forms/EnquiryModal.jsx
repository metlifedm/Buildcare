// src/components/forms/EnquiryModal.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MessageCircle, User, Phone, Mail,
  Wrench, MessageSquare, CheckCircle, Send,
  Loader2, Sparkles
} from 'lucide-react';
import Button from '@components/ui/Button';
import FormField from '@components/ui/FormField';
import { COMPANY, SERVICE_OPTIONS } from '@utils/constants';
import { cn } from '@utils/helpers';

const enquirySchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long'),
  phone: z.string()
    .min(10, 'Enter a valid phone number')
    .max(15, 'Phone number is too long')
    .regex(/^[+]?[\d\s\-()]+$/, 'Enter a valid phone number'),
  email: z.string()
    .email('Enter a valid email')
    .optional()
    .or(z.literal('')),
  service: z.string()
    .min(1, 'Please select a service'),
  message: z.string()
    .min(5, 'Message must be at least 5 characters')
    .max(500, 'Message is too long'),
});

export default function EnquiryModal({ isOpen, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    },
  });

  const onSubmit = (data) => {
    setIsSubmitting(true);

    // Build WhatsApp message
    const lines = [
      `🏠 *New Enquiry - ${COMPANY.name}*`,
      ``,
      `👤 *Name:* ${data.name}`,
      `📞 *Phone:* ${data.phone}`,
    ];

    if (data.email) {
      lines.push(`📧 *Email:* ${data.email}`);
    }

    lines.push(
      `🔧 *Service Required:* ${data.service}`,
      ``,
      `💬 *Message:*`,
      data.message,
      ``,
      `---`,
      `📱 Sent from ${COMPANY.name} Website`,
      `🕐 ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`
    );

    const message = lines.join('\n');
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${COMPANY.whatsapp}?text=${encodedMessage}`;

    // Small delay for UX
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset after showing success
      setTimeout(() => {
        reset();
        setIsSubmitted(false);
        onClose();
      }, 3000);
    }, 800);
  };

  const handleClose = () => {
    reset();
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
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
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog" aria-modal="true" aria-label="Enquiry Form"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-950/85 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-elevated z-10"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          >
            {/* Header gradient */}
            <div className="bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 p-6 relative overflow-hidden">
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                aria-label="Close enquiry form"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="font-heading text-xl font-bold text-white">
                      Quick Enquiry
                    </h2>
                    <p className="text-white/70 text-xs font-accent">
                      Get instant response on WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="bg-dark-900 p-6 max-h-[70vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
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
                      Enquiry Sent Successfully!
                    </h3>
                    <p className="text-dark-300 text-sm mb-2">
                      Your enquiry has been sent to our WhatsApp.
                    </p>
                    <p className="text-dark-400 text-xs">
                      We'll respond within 30 minutes during working hours.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name */}
                    <FormField label="Your Name" error={errors.name?.message} required>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className={cn(inputStyles, 'pl-10', errors.name && 'border-red-400/50')}
                          {...register('name')}
                        />
                      </div>
                    </FormField>

                    {/* Phone */}
                    <FormField label="Phone Number" error={errors.phone?.message} required>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          className={cn(inputStyles, 'pl-10', errors.phone && 'border-red-400/50')}
                          {...register('phone')}
                        />
                      </div>
                    </FormField>

                    {/* Email (optional) */}
                    <FormField label="Email" error={errors.email?.message} helpText="Optional">
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className={cn(inputStyles, 'pl-10', errors.email && 'border-red-400/50')}
                          {...register('email')}
                        />
                      </div>
                    </FormField>

                    {/* Service */}
                    <FormField label="Service Required" error={errors.service?.message} required>
                      <div className="relative">
                        <Wrench className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                        <select
                          className={cn(inputStyles, 'pl-10 cursor-pointer appearance-none', errors.service && 'border-red-400/50')}
                          {...register('service')}
                        >
                          <option value="">Select a service</option>
                          {SERVICE_OPTIONS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg className="w-4 h-4 text-dark-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </FormField>

                    {/* Message */}
                    <FormField label="Your Message" error={errors.message?.message} required>
                      <div className="relative">
                        <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-dark-500" />
                        <textarea
                          rows={3}
                          placeholder="Tell us about your project..."
                          className={cn(inputStyles, 'pl-10 resize-none', errors.message && 'border-red-400/50')}
                          {...register('message')}
                        />
                      </div>
                    </FormField>

                    {/* Submit */}
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
                        {isSubmitting ? 'Sending to WhatsApp...' : 'Send Enquiry via WhatsApp'}
                      </Button>
                    </div>

                    <p className="text-center text-dark-500 text-xs pt-1">
                      <MessageCircle className="w-3 h-3 inline mr-1" />
                      Your enquiry will be sent directly to our WhatsApp for instant response
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