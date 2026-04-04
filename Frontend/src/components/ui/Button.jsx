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
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-900
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden group cursor-pointer
  `;

  const variants = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 
      text-dark-950 font-bold
      hover:from-primary-400 hover:to-primary-500 
      hover:shadow-gold active:scale-[0.98]
      border border-primary-400/20
    `,
    secondary: `
      bg-transparent border-2 border-primary-400/50 
      text-primary-300 
      hover:bg-primary-400/10 hover:border-primary-400 
      hover:text-primary-200 active:scale-[0.98]
    `,
    outline: `
      bg-transparent border border-dark-300/30 
      text-dark-100 
      hover:bg-dark-700/50 hover:border-primary-400/50 
      hover:text-primary-300 active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-dark-200 
      hover:bg-dark-700/50 hover:text-primary-300
      active:scale-[0.98]
    `,
    whatsapp: `
      bg-gradient-to-r from-green-600 to-green-500 
      text-white font-bold
      hover:from-green-500 hover:to-green-400 
      hover:shadow-lg active:scale-[0.98]
      border border-green-400/20
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-red-500 
      text-white font-bold
      hover:from-red-500 hover:to-red-400 
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
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      
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