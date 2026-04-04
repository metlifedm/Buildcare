// src/components/ui/CTABanner.jsx
import { motion } from 'framer-motion';
import { Send, Phone } from 'lucide-react';
import Button from './Button';
import { COMPANY } from '@utils/constants';
import { useEnquiry } from '@hooks/useEnquiry';

export default function CTABanner({
  title = "Ready to Transform Your Space?",
  description = "Get a free consultation with our expert designers. Let's bring your dream interior to life.",
  primaryAction = { label: "Enquiry Now" },
  secondaryAction = { label: "Call Us", link: `tel:${COMPANY.phone}` },
  variant = 'default',
}) {
  const { openEnquiry } = useEnquiry();

  const bgVariants = {
    default: 'bg-gradient-to-r from-dark-800 via-dark-700 to-dark-800',
    gold: 'bg-gradient-to-r from-primary-900/50 via-primary-800/30 to-primary-900/50',
    dark: 'bg-gradient-to-br from-dark-900 to-dark-950',
  };

  return (
    <section className={`relative py-20 overflow-hidden ${bgVariants[variant]}`} aria-label="Call to action">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(201,169,110,0.3) 2px, transparent 0)',
          backgroundSize: '50px 50px',
        }} />
      </div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />

      <div className="container-custom relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gradient mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-lg text-dark-200 mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="left"
              onClick={() => openEnquiry()}
            >
              {primaryAction.label}
            </Button>

            <a href={secondaryAction.link}>
              <Button variant="secondary" size="lg" icon={Phone} iconPosition="left">
                {secondaryAction.label}
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}