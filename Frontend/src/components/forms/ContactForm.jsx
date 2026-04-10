// src/components/forms/ContactForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Button from '@components/ui/Button';
import FormField from '@components/ui/FormField';
import { sendEmail } from '@utils/emailService';
import { sendToWhatsApp } from '@utils/whatsappService';
import { SERVICE_OPTIONS, BUDGET_RANGES } from '@utils/constants';
import { cn } from '@utils/helpers';

// Zod validation schema
const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long')
    .regex(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  service: z.string()
    .min(1, 'Please select a service'),
  budget: z.string().optional(),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export default function ContactForm({
  variant = 'full', // 'full' | 'compact'
  className,
  onSuccess,
}) {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: '',
      budget: '',
      message: '',
    },
  });

  const onSubmitEmail = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setSubmitStatus('success');
        reset();
        onSuccess?.();
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const onSubmitWhatsApp = (data) => {
    sendToWhatsApp(data);
  };

  const inputStyles = cn(
    'w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200',
    'text-gray-900 placeholder-gray-400',
    'focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500',
    'transition-all duration-300',
    'hover:border-gray-300'
  );

  const isCompact = variant === 'compact';

  return (
    <motion.div
      className={cn('bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8', className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Status Messages */}
      {submitStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3"
          role="alert"
        >
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
          <p className="text-green-700 text-sm">
            Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
        </motion.div>
      )}

      {submitStatus === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3"
          role="alert"
        >
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <p className="text-red-700 text-sm">
            Something went wrong. Please try again or contact us via WhatsApp.
          </p>
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmitEmail)} noValidate>
        <div className={cn(
          'grid gap-5',
          isCompact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
        )}>
          {/* Name */}
          <FormField label="Full Name" error={errors.name?.message} required>
            <input
              type="text"
              placeholder="John Doe"
              className={cn(inputStyles, errors.name && 'border-red-400')}
              {...register('name')}
              aria-invalid={errors.name ? 'true' : 'false'}
            />
          </FormField>

          {/* Email */}
          <FormField label="Email Address" error={errors.email?.message} required>
            <input
              type="email"
              placeholder="john@example.com"
              className={cn(inputStyles, errors.email && 'border-red-400')}
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
          </FormField>

          {/* Phone */}
          <FormField label="Phone Number" error={errors.phone?.message} required>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              className={cn(inputStyles, errors.phone && 'border-red-400')}
              {...register('phone')}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
          </FormField>

          {/* Service */}
          <FormField label="Service Interested In" error={errors.service?.message} required>
            <select
              className={cn(inputStyles, 'cursor-pointer', errors.service && 'border-red-400')}
              {...register('service')}
              aria-invalid={errors.service ? 'true' : 'false'}
            >
              <option value="">Select a service</option>
              {SERVICE_OPTIONS.map((service) => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </FormField>

          {/* Budget (optional, full variant only) */}
          {!isCompact && (
            <FormField label="Budget Range" helpText="Optional">
              <select
                className={cn(inputStyles, 'cursor-pointer')}
                {...register('budget')}
              >
                <option value="">Select budget range</option>
                {BUDGET_RANGES.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </FormField>
          )}

          {/* Message */}
          <FormField
            label="Your Message"
            error={errors.message?.message}
            required
            className={isCompact ? '' : 'md:col-span-2'}
          >
            <textarea
              rows={isCompact ? 3 : 5}
              placeholder="Tell us about your project requirements..."
              className={cn(inputStyles, 'resize-none', errors.message && 'border-red-400')}
              {...register('message')}
              aria-invalid={errors.message ? 'true' : 'false'}
            />
          </FormField>
        </div>

        {/* Submit Buttons */}
        <div className={cn(
          'mt-6 flex gap-3',
          isCompact ? 'flex-col' : 'flex-col sm:flex-row'
        )}>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            disabled={isSubmitting}
            icon={isSubmitting ? Loader2 : Send}
            className="flex-1"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Button>

          <Button
            type="button"
            variant="whatsapp"
            size="lg"
            icon={MessageCircle}
            iconPosition="left"
            onClick={handleSubmit(onSubmitWhatsApp)}
            className={isCompact ? '' : 'sm:flex-1'}
          >
            Send via WhatsApp
          </Button>
        </div>
      </form>
    </motion.div>
  );
}