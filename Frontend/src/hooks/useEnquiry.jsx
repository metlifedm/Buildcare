// src/hooks/useEnquiry.js
import { createContext, useContext, useState, useCallback } from 'react';

const EnquiryContext = createContext(null);

export function EnquiryProvider({ children }) {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');

  const openEnquiry = useCallback((service = '') => {
    setPrefilledService(service);
    setIsEnquiryOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeEnquiry = useCallback(() => {
    setIsEnquiryOpen(false);
    setPrefilledService('');
    document.body.style.overflow = 'unset';
  }, []);

  return (
    <EnquiryContext.Provider value={{
      isEnquiryOpen,
      openEnquiry,
      closeEnquiry,
      prefilledService,
    }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiry() {
  const context = useContext(EnquiryContext);
  if (!context) {
    throw new Error('useEnquiry must be used within EnquiryProvider');
  }
  return context;
}