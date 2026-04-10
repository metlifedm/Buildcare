// src/components/ui/Button.jsx
import { forwardRef } from 'react';
import { cn } from '@utils/helpers';
import { motion } from 'framer-motion';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className,
  icon: Icon,
  iconPosition = 'right',
  loading = false,
  disabled = false,
  as = 'button',
  href,
  ...props
}, ref) => {
  const baseStyles = `
    relative inline-flex items-center justify-center gap-2 
    font-semibold rounded-lg transition-all duration-300 
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group cursor-pointer
  `;

  const variants = {
    primary: `
      bg-primary-600 
      text-white font-bold
      hover:bg-primary-700 
      active:scale-[0.98]
      border border-primary-500
    `,
    secondary: `
      bg-transparent border-2 border-primary-500 
      text-primary-600 
      hover:bg-primary-50 hover:border-primary-600 
      hover:text-primary-700 active:scale-[0.98]
    `,
    outline: `
      bg-transparent border border-gray-300 
      text-gray-700 
      hover:bg-gray-50 hover:border-primary-500 
      hover:text-primary-600 active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-gray-600 
      hover:bg-gray-100 hover:text-primary-600
      active:scale-[0.98]
    `,
    whatsapp: `
      bg-green-600 
      text-white font-bold
      hover:bg-green-700 
      hover:shadow-lg active:scale-[0.98]
      border border-green-500
    `,
    danger: `
      bg-red-600 
      text-white font-bold
      hover:bg-red-700 
      active:scale-[0.98]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
    icon: 'p-3',
  };

  const Component = href ? 'a' : as;
  const motionProps = href ? {} : {
    whileHover: { scale: disabled ? 1 : 1.02 },
    whileTap: { scale: disabled ? 1 : 0.98 },
  };

  const MotionComponent = href ? motion.a : motion[as] || motion.button;

  return (
    <MotionComponent
      ref={ref}
      href={href}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...motionProps}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      
      {loading && (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      
      {!loading && Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      <span className="relative z-10">{children}</span>
      {!loading && Icon && iconPosition === 'right' && <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
    </MotionComponent>
  );
});

Button.displayName = 'Button';
export default Button;