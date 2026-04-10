// src/components/ui/AnimatedText.jsx
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

export function AnimatedHeading({
  text,
  className,
  tag: Tag = 'h2',
  delay = 0,
  stagger = 0.03,
  once = true,
}) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={cn('flex flex-wrap', className)}
      style={{ perspective: '1000px' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className="inline-block mr-[0.3em] text-gray-900"
          style={{ transformOrigin: 'bottom' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function AnimatedParagraph({
  text,
  className,
  delay = 0.3,
  once = true,
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-30px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={cn('text-gray-600', className)}
    >
      {text}
    </motion.p>
  );
}

export function AnimatedCounter({ value, suffix = '', duration = 2, className }) {
  return (
    <motion.span
      className={cn('text-gray-900', className)}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {value}{suffix}
      </motion.span>
    </motion.span>
  );
}