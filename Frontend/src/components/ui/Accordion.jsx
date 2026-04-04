// src/components/ui/Accordion.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@utils/helpers';

export function Accordion({ items, allowMultiple = false, className }) {
  const [openItems, setOpenItems] = useState(new Set([0]));

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className={cn('space-y-4', className)} role="list">
      {items.map((item, index) => (
        <AccordionItem
          key={item.id || index}
          item={item}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
          index={index}
        />
      ))}
    </div>
  );
}

function AccordionItem({ item, isOpen, onToggle, index }) {
  return (
    <motion.div
      className={cn(
        'glass-card rounded-xl overflow-hidden transition-all duration-300',
        isOpen && 'shadow-gold border-primary-400/30'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      role="listitem"
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${item.id}`}
      >
        <span className={cn(
          'font-heading font-semibold text-lg pr-4 transition-colors duration-300',
          isOpen ? 'text-primary-300' : 'text-dark-100 group-hover:text-primary-400'
        )}>
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            'flex-shrink-0 p-1 rounded-full transition-colors',
            isOpen ? 'bg-primary-400/20 text-primary-400' : 'text-dark-300'
          )}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-content-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-dark-200 leading-relaxed border-t border-dark-600/20 pt-4">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}