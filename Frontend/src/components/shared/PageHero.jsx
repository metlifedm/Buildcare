// src/sections/shared/PageHero.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function PageHero({
  title,
  subtitle,
  description,
  breadcrumbs = [],
  backgroundImage,
  className,
}) {
  return (
    <section
      className={cn(
        'relative py-24 md:py-32 overflow-hidden bg-gray-100',
        className
      )}
      role="banner"
    >
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-10"
            loading="eager"
          />
          <div className="absolute inset-0 bg-white/50" />
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-50 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(#3b66f0 1px, transparent 1px), linear-gradient(90deg, #3b66f0 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container-custom relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <motion.nav
            className="flex items-center gap-2 text-sm mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            aria-label="Breadcrumb"
          >
            <Link
              to="/"
              className="text-gray-500 hover:text-primary-600 transition-colors flex items-center gap-1"
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 text-gray-400" />
                {crumb.path ? (
                  <Link
                    to={crumb.path}
                    className="text-gray-500 hover:text-primary-600 transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-primary-600">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Content */}
        <div className="max-w-3xl">
          {subtitle && (
            <motion.span
              className="inline-block text-primary-600 font-accent font-medium text-sm tracking-[0.2em] uppercase mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              — {subtitle} —
            </motion.span>
          )}

          <motion.h1
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {description && (
            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Decorative line */}
        <motion.div
          className="mt-8 h-[2px] w-32 bg-primary-500 rounded-full"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>
    </section>
  );
}