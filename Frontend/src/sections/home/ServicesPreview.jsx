// src/sections/home/ServicesPreview.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Send } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import { useEnquiry } from '@hooks/useEnquiry';
import servicesData from '@data/services.json';

const iconMap = {
  home: 'Home', building: 'Building2', grid3x3: 'Grid3X3',
  layers: 'Layers', chefHat: 'ChefHat', paintbrush: 'Paintbrush',
  wrench: 'Wrench', doorOpen: 'DoorOpen', zap: 'Zap',
};

export default function ServicesPreview() {
  const { openEnquiry } = useEnquiry();
  const previewServices = servicesData.services.slice(0, 6);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-label="Our services">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-100 rounded-full blur-3xl opacity-50" />

      <div className="container-custom">
        <SectionHeading
          subtitle="Our Services"
          title="Comprehensive Interior Design Solutions"
          description="From concept to completion, we offer a full spectrum of interior design and renovation services."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewServices.map((service, index) => {
            const iconName = iconMap[service.icon] || 'Sparkles';
            const Icon = LucideIcons[iconName] || LucideIcons.Sparkles;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group cursor-pointer relative overflow-hidden" padding="lg" variant="solid">
                  <div className="absolute inset-0 bg-primary-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-5 group-hover:bg-primary-200 transition-all duration-300">
                      <Icon className="w-7 h-7 text-primary-600" />
                    </div>

                    <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                      {service.shortDescription}
                    </p>

                    <div className="flex items-center gap-3">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-primary-600 text-sm font-medium hover:gap-3 transition-all duration-300"
                      >
                        View Details <ArrowUpRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openEnquiry(service.title);
                        }}
                        className="inline-flex items-center gap-1.5 text-green-600 text-sm font-medium hover:text-green-700 transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Enquiry
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Link to="/services">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}