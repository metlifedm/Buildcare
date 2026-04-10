// src/components/ui/MobileDropdownMenu.jsx (Fixed)
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function MobileDropdownMenu({ label, items, path, isActive, onClose }) {
  const [isOpen, setIsOpen] = useState(false);

  // If no dropdown items, render as regular link
  if (!items || items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          to={path}
          className={cn(
            'flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all',
            isActive
              ? 'bg-primary-50 text-primary-700 border border-primary-200'
              : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
          )}
          onClick={onClose}
        >
          {label}
          <ChevronRight className="w-4 h-4 opacity-40" />
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-medium transition-all',
          isActive
            ? 'bg-primary-50 text-primary-700 border border-primary-200'
            : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
        )}
      >
        {label}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 opacity-40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-2 space-y-1 border-l-2 border-primary-200 pl-4">
              {items.map((item, index) => (
                <Link
                  key={item.id || index}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-gray-600 hover:text-primary-600 hover:bg-gray-50 transition-all group"
                  onClick={() => {
                    setIsOpen(false);
                    onClose();
                  }}
                >
                  <span className="text-base">{item.icon || '•'}</span>
                  <div className="flex-1">
                    <div>{item.label}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400 group-hover:text-primary-500">
                        {item.description}
                      </div>
                    )}
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}