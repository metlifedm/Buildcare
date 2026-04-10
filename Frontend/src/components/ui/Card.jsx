// src/components/ui/Card.jsx
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

const Card = forwardRef(({
  children,
  className,
  variant = 'solid',
  hover = true,
  padding = 'md',
  ...props
}, ref) => {
  const variants = {
    glass: 'bg-white/90 border border-gray-200',
    solid: 'bg-white border border-gray-200',
    transparent: 'bg-transparent',
    elevated: 'bg-white shadow-lg',
    gradient: 'bg-white border border-gray-200',
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
        hover && 'hover:shadow-xl hover:border-primary-300 hover:-translate-y-1',
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