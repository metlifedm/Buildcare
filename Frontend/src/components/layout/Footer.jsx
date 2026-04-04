// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, ArrowUp,
  Heart,
  ChevronRight
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { COMPANY } from '@utils/constants';
import navigationData from '@data/navigation.json';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = navigationData.mainNav.slice(0, 4);
  const serviceLinks = [
    { label: 'Residential Interior', path: '/services#residential-interior' },
    { label: 'Commercial Interior', path: '/services#commercial-interior' },
    { label: 'Modular Kitchen', path: '/services#modular-kitchen' },
    { label: 'False Ceiling', path: '/services#false-ceiling' },
    { label: 'Painting Works', path: '/services#painting-works' },
  ];

  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
    youtube: FaYoutube,
  };

  return (
    <footer className="relative bg-dark-900 border-t border-dark-700/30" role="contentinfo">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent" />
      
      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-dark-950">B</span>
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-gradient">{COMPANY.name}</h3>
                <p className="text-[10px] text-dark-400 tracking-[0.15em] uppercase font-accent">Interior & Architecture</p>
              </div>
            </Link>
            <p className="text-dark-300 text-sm leading-relaxed mb-6">
              Crafting exceptional interior spaces that inspire, function, and endure. 
              From concept to completion, we bring your vision to life with premium quality and attention to detail.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {navigationData.socialLinks.map((social) => {
                const Icon = socialIcons[social.icon];
                return (
                  <a
                    key={social.icon}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-dark-300 hover:text-primary-400 hover:border-primary-400/30 transition-all duration-300 hover:-translate-y-1"
                    aria-label={`Follow us on ${social.label}`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="font-heading text-lg font-semibold text-dark-50 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {navigationData.mainNav.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.path}
                    className="text-dark-300 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary-500/50 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="font-heading text-lg font-semibold text-dark-50 mb-6">Our Services</h4>
            <ul className="space-y-3">
              {serviceLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-dark-300 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ChevronRight className="w-3 h-3 text-primary-500/50 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="font-heading text-lg font-semibold text-dark-50 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={COMPANY.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-dark-300 hover:text-primary-400 transition-colors text-sm"
                >
                  <MapPin className="w-4 h-4 mt-0.5 text-primary-500 flex-shrink-0" />
                  <span>{COMPANY.address}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${COMPANY.phone}`}
                  className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  {COMPANY.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY.email}`}
                  className="flex items-center gap-3 text-dark-300 hover:text-primary-400 transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary-500 flex-shrink-0" />
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-dark-300 text-sm">
                <Clock className="w-4 h-4 text-primary-500 flex-shrink-0" />
                {COMPANY.workingHours}
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700/30">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-sm text-center md:text-left">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved. Made with{' '}
            <Heart className="w-3 h-3 inline text-red-400 fill-red-400" /> in India.
          </p>
          <div className="flex items-center gap-6 text-sm text-dark-400">
            <Link to="/faq" className="hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/faq" className="hover:text-primary-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-xl glass-card flex items-center justify-center text-primary-400 hover:text-primary-300 hover:shadow-gold transition-all cursor-pointer"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
}