// src/utils/constants.js
export const COMPANY = {
  name: import.meta.env.VITE_COMPANY_NAME || 'Buildcare',
  email: import.meta.env.VITE_COMPANY_EMAIL || 'info@buildcare.in',
  phone: import.meta.env.VITE_COMPANY_PHONE || '+91-98765-43210',
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210',
  address: '123 Design Avenue, Sector 5, Mumbai, Maharashtra 400001',
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://buildcare.in',
  tagline: 'RISK-FREE POSITIONING',
  description: 'Premium Interior Design & Architecture Services',
  workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  mapUrl: 'https://maps.google.com/?q=19.0760,72.8777',
  social: {
    facebook: 'https://facebook.com/buildcare',
    instagram: 'https://instagram.com/buildcare',
    linkedin: 'https://linkedin.com/company/buildcare',
    youtube: 'https://youtube.com/@buildcare',
    twitter: 'https://twitter.com/buildcare',
    pinterest: 'https://pinterest.com/buildcare',
  },
};

export const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
};

export const SERVICE_OPTIONS = [
  'Residential Interior',
  'Commercial Interior',
  'Tile Flooring Works',
  'Gypsum/PVC False Ceiling',
  'Modular Kitchen',
  'Painting Works',
  'Fabrication Works',
  'Aluminum Sliding Doors & Glass Partitions',
  'Plumbing & Electrical Work',
  'Other',
];

export const BUDGET_RANGES = [
  'Under ₹5 Lakhs',
  '₹5 - ₹15 Lakhs',
  '₹15 - ₹30 Lakhs',
  '₹30 - ₹50 Lakhs',
  '₹50 Lakhs - ₹1 Crore',
  'Above ₹1 Crore',
];

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};