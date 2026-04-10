// src/components/ui/SectionHeading.jsx
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

export default function SectionHeading({
  subtitle,
  title,
  description,
  align = 'center',
  light = false,
  className,
}) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
    right: 'text-right ml-auto',
  };

  return (
    <motion.div
      className={cn('max-w-3xl mb-16', alignClasses[align], className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {subtitle && (
        <motion.span
          className="inline-block text-primary-600 font-accent font-medium text-sm tracking-[0.2em] uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          — {subtitle} —
        </motion.span>
      )}
      
      <motion.h2
        className={cn(
          'font-heading font-bold leading-tight mb-6',
          'text-3xl md:text-4xl lg:text-5xl',
          light ? 'text-gray-600' : 'text-gray-900'
        )}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {title}
      </motion.h2>
      
      {description && (
        <motion.p
          className={cn(
            'text-lg leading-relaxed',
            light ? 'text-gray-500' : 'text-gray-600'
          )}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}

      {/* Decorative line */}
      <motion.div
        className={cn(
          'mt-6 h-[2px] bg-primary-500',
          align === 'center' ? 'w-24 mx-auto' : 'w-24',
          align === 'right' && 'ml-auto'
        )}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </motion.div>
  );
}