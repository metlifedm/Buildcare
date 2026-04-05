// src/components/layout/Navbar.jsx (Fixed - Complete)
import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ChevronRight, Send } from 'lucide-react';
import { cn } from '@utils/helpers';
import { COMPANY } from '@utils/constants';
import Button from '@components/ui/Button';
import DropdownMenu from '@components/ui/DropdownMenu';
import MobileDropdownMenu from '@components/ui/MobileDropdownMenu';
import { useEnquiry } from '@hooks/useEnquiry';
import navigationData from '@data/navigation.json';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openEnquiry } = useEnquiry();

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // Helper function to check if a path or its dropdown items is active
  const isPathActive = (item) => {
    if (location.pathname === item.path) return true;
    if (item.dropdown && item.dropdown.length > 0) {
      return item.dropdown.some(dropItem => location.pathname === dropItem.path);
    }
    return false;
  };

  return (
    <>
      {/* Top Bar */}
      <div className={cn(
        'hidden lg:block bg-dark-900 border-b border-dark-700/30 transition-all duration-300',
        isScrolled && 'hidden'
      )}>
        <div className="container-custom py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6 text-dark-300">
            <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Phone className="w-3 h-3" /> {COMPANY.phone}
            </a>
            <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 hover:text-primary-400 transition-colors">
              <Mail className="w-3 h-3" /> {COMPANY.email}
            </a>
          </div>
          <p className="text-dark-400 text-xs tracking-wide">
            {COMPANY.workingHours} | Free Consultation Available
          </p>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.header
        className={cn(
          'sticky top-0 z-50 transition-all duration-500',
          isScrolled ? 'glass shadow-premium py-3' : 'bg-transparent py-4'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-custom flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Buildcare Home">
            <motion.div
              className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-gold"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <span className="font-heading text-xl font-bold text-dark-950">B</span>
            </motion.div>
            <div>
              <h1 className="font-heading text-xl font-bold text-gradient">{COMPANY.name}</h1>
              <p className="text-[10px] text-dark-400 tracking-[0.15em] uppercase font-accent -mt-0.5">
                Interior & Architecture
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Primary navigation">
            {navigationData.mainNav.map((item) => (
              <DropdownMenu
                key={item.id}
                label={item.label}
                items={item.dropdown || []}
                path={item.path}
                isActive={isPathActive(item)}
              />
            ))}
          </nav>

          {/* Desktop CTA - ENQUIRY BUTTON */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              icon={Send}
              iconPosition="left"
              onClick={() => openEnquiry()}
              className="animate-pulse-glow"
            >
              Enquiry Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-dark-200 hover:text-primary-400 transition-colors cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.nav
              className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-dark-900 border-l border-dark-700/30 shadow-2xl overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              aria-label="Mobile navigation"
            >
              <div className="p-6 pt-20">
                <div className="space-y-1">
                  {navigationData.mainNav.map((item) => (
                    <MobileDropdownMenu
                      key={item.id}
                      label={item.label}
                      items={item.dropdown || []}
                      path={item.path}
                      isActive={isPathActive(item)}
                      onClose={() => setIsOpen(false)}
                    />
                  ))}
                </div>

                {/* Mobile Enquiry Button */}
                <motion.div
                  className="mt-8 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    icon={Send}
                    iconPosition="left"
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => openEnquiry(), 300);
                    }}
                  >
                    Enquiry Now
                  </Button>
                  <a href={`tel:${COMPANY.phone}`} className="block">
                    <Button variant="secondary" size="md" className="w-full" icon={Phone} iconPosition="left">
                      Call Us
                    </Button>
                  </a>
                </motion.div>

                <motion.div
                  className="mt-8 pt-6 border-t border-dark-700/30 space-y-3 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors">
                    <Mail className="w-4 h-4" /> {COMPANY.email}
                  </a>
                  <p className="text-dark-400 text-xs">{COMPANY.workingHours}</p>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}