// src/components/ui/DropdownMenu.jsx (Fixed)
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function DropdownMenu({ label, items, path, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  // If no dropdown items, render as regular link
  if (!items || items.length === 0) {
    return (
      <Link
        to={path}
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group',
          isActive
            ? 'text-primary-300'
            : 'text-dark-200 hover:text-primary-300'
        )}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-400 rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary-400/50 rounded-full group-hover:w-6 transition-all duration-300" />
      </Link>
    );
  }

  return (
    <div 
      ref={dropdownRef} 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={cn(
          'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 group cursor-pointer',
          isActive || isOpen
            ? 'text-primary-300'
            : 'text-dark-200 hover:text-primary-300'
        )}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
        {isActive && !isOpen && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary-400 rounded-full"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 w-72 z-50"
          >
            <div className="glass-card rounded-xl overflow-hidden border border-primary-500/20 shadow-premium">
              <div className="py-2 max-h-[80vh] overflow-y-auto">
                {items.map((item, index) => (
                  <Link
                    key={item.id || index}
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-dark-200 hover:text-primary-300 hover:bg-primary-500/5 transition-all duration-200 group"
                  >
                    <span className="text-xl">{item.icon || '•'}</span>
                    <div className="flex-1">
                      <div className="font-medium">{item.label}</div>
                      {item.description && (
                        <div className="text-xs text-dark-400 group-hover:text-primary-400/70">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}