// src/components/ui/FloatingWhatsApp.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp } from '@utils/whatsappService';
import { COMPANY } from '@utils/constants';

export default function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    const tooltipTimer = setTimeout(() => setShowTooltip(true), 5000);
    const hideTooltipTimer = setTimeout(() => setShowTooltip(false), 12000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tooltipTimer);
      clearTimeout(hideTooltipTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="glass-card rounded-xl p-4 max-w-[260px] shadow-elevated"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 p-1 bg-dark-700 rounded-full text-dark-300 hover:text-white cursor-pointer"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>
            <p className="text-sm text-dark-700">
              👋 Hi! Need help with interior design? Chat with us on WhatsApp!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => openWhatsApp()}
        className="relative w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:shadow-2xl transition-shadow group"
        aria-label={`Chat with ${COMPANY.name} on WhatsApp`}
      >
        {/* Pulse animation */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-30" />
        <span className="absolute inset-0 rounded-full bg-green-500 animate-pulse opacity-20" />
        
        <MessageCircle className="w-7 h-7 text-white relative z-10" fill="currentColor" />
      </motion.button>
    </div>
  );
}