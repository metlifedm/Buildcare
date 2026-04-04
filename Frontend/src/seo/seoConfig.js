// src/seo/seoConfig.js
import { COMPANY } from '@utils/constants';

export const defaultSEO = {
  title: `${COMPANY.name} - Premium Interior Design & Architecture`,
  description: 'Buildcare delivers world-class interior design, modular kitchens, false ceilings, and renovation services. Transform your space with our expert architects and designers.',
  keywords: 'interior design, architecture, modular kitchen, false ceiling, home renovation, commercial interior, residential interior, Mumbai interior designer',
  image: `${COMPANY.siteUrl}/og-image.jpg`,
  url: COMPANY.siteUrl,
  type: 'website',
};

export const pageSEO = {
  home: {
    title: `${COMPANY.name} - Premium Interior Design & Architecture Services`,
    description: 'Transform your space with world-class interior design services. Expert architects, premium materials, stunning results. Get a free quote today!',
    path: '/',
  },
  about: {
    title: `About Us - ${COMPANY.name} | Our Story & Team`,
    description: `Learn about ${COMPANY.name}'s journey, our expert team of designers and architects, and our commitment to creating exceptional spaces.`,
    path: '/about',
  },
  services: {
    title: `Interior Design Services - ${COMPANY.name} | Complete Solutions`,
    description: 'Comprehensive interior design services including residential, commercial, modular kitchen, false ceiling, painting, fabrication, and more.',
    path: '/services',
  },
  portfolio: {
    title: `Our Portfolio - ${COMPANY.name} | View Our Projects`,
    description: 'Explore our stunning portfolio of completed interior design projects. From luxury homes to premium offices, see our work.',
    path: '/portfolio',
  },
  clients: {
    title: `Our Clients & Testimonials - ${COMPANY.name}`,
    description: 'Read what our clients say about us. Trusted by 350+ happy clients across India for premium interior design services.',
    path: '/clients',
  },
  blog: {
    title: `Interior Design Blog - ${COMPANY.name} | Tips & Trends`,
    description: 'Expert interior design tips, latest trends, guides, and inspiration from our team of professional designers and architects.',
    path: '/blog',
  },
  faq: {
    title: `FAQ - ${COMPANY.name} | Frequently Asked Questions`,
    description: 'Find answers to common questions about our interior design services, pricing, timeline, materials, and process.',
    path: '/faq',
  },
  contact: {
    title: `Contact Us - ${COMPANY.name} | Get Free Quote`,
    description: `Contact ${COMPANY.name} for a free consultation. Call ${COMPANY.phone}, email ${COMPANY.email}, or fill our quick form.`,
    path: '/contact',
  },
};