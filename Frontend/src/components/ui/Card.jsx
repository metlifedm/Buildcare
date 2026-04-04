// src/components/ui/Card.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

const Card = forwardRef(({
  children,
  className,
  variant = 'glass',
  hover = true,
  padding = 'md',
  ...props
}, ref) => {
  const variants = {
    glass: 'glass-card',
    solid: 'bg-dark-800 border border-dark-600/30',
    transparent: 'bg-transparent',
    elevated: 'glass-card shadow-elevated',
    gradient: 'bg-gradient-to-br from-dark-800/90 to-dark-700/50 border border-primary-400/10',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'rounded-2xl transition-all duration-500',
        variants[variant],
        paddings[padding],
        hover && 'hover:shadow-gold hover:border-primary-400/30 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
});

Card.displayName = 'Card';
export default Card;