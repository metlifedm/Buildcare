// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import {
  Phone, Mail, MapPin, Clock, MessageCircle,
  Navigation
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import ContactForm from '@components/forms/ContactForm';
import { COMPANY } from '@utils/constants';
import { openWhatsApp } from '@utils/whatsappService';

const contactInfo = [
  {
    icon: Phone,
    title: 'Call Us',
    details: [COMPANY.phone],
    action: `tel:${COMPANY.phone}`,
    actionLabel: 'Call Now',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: [COMPANY.email],
    action: `mailto:${COMPANY.email}`,
    actionLabel: 'Send Email',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    details: [COMPANY.address],
    action: COMPANY.mapUrl,
    actionLabel: 'Get Directions',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: [COMPANY.workingHours, 'Sunday: Closed'],
    action: null,
    actionLabel: null,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

const socialLinks = [
  { icon: FaFacebook, label: 'Facebook', url: COMPANY.social.facebook },
  { icon: FaInstagram, label: 'Instagram', url: COMPANY.social.instagram },
  { icon: FaLinkedin, label: 'LinkedIn', url: COMPANY.social.linkedin },
  { icon: FaYoutube, label: 'YouTube', url: COMPANY.social.youtube },
];

export default function Contact() {
  return (
    <>
      <SEOHead
        title={pageSEO.contact.title}
        description={pageSEO.contact.description}
        url={pageSEO.contact.path}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Contact Us', path: '/contact' },
          ],
        }}
      />

      <PageHero
        title="Contact Us"
        subtitle="Get In Touch"
        description="Have a project in mind? Ready to transform your space? Reach out to us for a free consultation and let's create something extraordinary together."
        breadcrumbs={[{ label: 'Contact Us' }]}
        backgroundImage="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80"
      />

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50" aria-label="Contact information">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full text-center group" padding="lg" variant="solid">
                  <div className={`w-14 h-14 rounded-2xl ${info.bgColor} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <info.icon className={`w-7 h-7 ${info.color}`} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                  {info.action && (
                    <a
                      href={info.action}
                      target={info.action.startsWith('http') ? '_blank' : undefined}
                      rel={info.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 text-primary-600 text-sm font-medium mt-4 hover:gap-2.5 transition-all"
                    >
                      {info.actionLabel}
                      <Navigation className="w-3 h-3" />
                    </a>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-24 bg-white" aria-label="Contact form">
        <div className="container-custom">
          <SectionHeading
            subtitle="Send Us a Message"
            title="Let's Discuss Your Project"
            description="Fill out the form below and we'll get back to you within 24 hours. Or send directly via WhatsApp for instant response."
          />

          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ContactForm variant="full" />
            </motion.div>

            {/* Sidebar */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* WhatsApp CTA */}
              <Card padding="lg" className="bg-green-50 border-green-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900">
                      WhatsApp Us
                    </h3>
                    <p className="text-green-600 text-sm">Instant Response</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Get instant replies on WhatsApp. Share your requirements and we'll respond within minutes during working hours.
                </p>
                <Button
                  variant="whatsapp"
                  className="w-full"
                  icon={MessageCircle}
                  iconPosition="left"
                  onClick={() => openWhatsApp()}
                >
                  Chat on WhatsApp
                </Button>
              </Card>

              {/* Map */}
              <Card padding="none" className="overflow-hidden border-gray-200 shadow-sm">
                <div className="h-64 bg-gray-100 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1704799200000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Buildcare office location on Google Maps"
                  />
                </div>
                <div className="p-4 bg-white">
                  <a
                    href={COMPANY.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                  </a>
                </div>
              </Card>

              {/* Social Links */}
              <Card padding="lg" variant="solid" className="border-gray-200">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Stay connected for design inspiration and updates.
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 hover:-translate-y-1 transition-all duration-300"
                      aria-label={`Follow Buildcare on ${social.label}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Banner */}
      <section className="py-16 bg-gray-50 border-t border-gray-200" aria-label="Quick contact">
        <div className="container-custom">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <motion.a
              href={`tel:${COMPANY.phone}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                <Phone className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Call Directly</p>
                <p className="text-gray-900 font-semibold text-lg">{COMPANY.phone}</p>
              </div>
            </motion.a>

            <motion.a
              href={`mailto:${COMPANY.email}`}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                <Mail className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email Us</p>
                <p className="text-gray-900 font-semibold text-lg">{COMPANY.email}</p>
              </div>
            </motion.a>

            <motion.button
              onClick={() => openWhatsApp()}
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-white transition-all cursor-pointer"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <MessageCircle className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">WhatsApp</p>
                <p className="text-gray-900 font-semibold text-lg">Instant Chat</p>
              </div>
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}