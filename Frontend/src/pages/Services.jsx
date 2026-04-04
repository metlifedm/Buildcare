// src/pages/Services.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { ArrowRight, CheckCircle, Send, ArrowUpRight } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import CTABanner from '@components/ui/CTABanner';
import { useEnquiry } from '@hooks/useEnquiry';
import servicesData from '@data/services.json';

const iconMap = {
  home: 'Home', building: 'Building2', grid3x3: 'Grid3X3',
  layers: 'Layers', chefHat: 'ChefHat', paintbrush: 'Paintbrush',
  wrench: 'Wrench', doorOpen: 'DoorOpen', zap: 'Zap',
};

export default function Services() {
  const { openEnquiry } = useEnquiry();

  return (
    <>
      <SEOHead
        title={pageSEO.services.title}
        description={pageSEO.services.description}
        url={pageSEO.services.path}
      />
      <SchemaMarkup type="BreadcrumbList" data={{
        items: [
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ],
      }} />

      <PageHero
        title="Our Services"
        subtitle="What We Do"
        description="From residential dream homes to inspiring commercial spaces, we offer comprehensive interior design and renovation solutions."
        breadcrumbs={[{ label: 'Services' }]}
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
      />

      {/* Process */}
      <section className="py-20 bg-dark-900" aria-label="Our process">
        <div className="container-custom">
          <SectionHeading
            subtitle="Our Process"
            title="How We Work"
            description="A streamlined approach to bring your interior vision to life."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'Free initial discussion to understand your vision and budget.' },
              { step: '02', title: 'Design & Plan', desc: '3D visualization, material selection, and detailed planning.' },
              { step: '03', title: 'Execution', desc: 'Expert craftsmen bring designs to life with precision.' },
              { step: '04', title: 'Handover', desc: 'Final quality inspection and joyful handover.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center h-full relative overflow-hidden group" padding="lg">
                  <span className="absolute top-4 right-4 font-heading text-6xl font-bold text-primary-400/5 group-hover:text-primary-400/10 transition-colors">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-primary-400/10 flex items-center justify-center mx-auto mb-4">
                    <span className="font-heading text-lg font-bold text-primary-400">{item.step}</span>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-dark-50 mb-3">{item.title}</h3>
                  <p className="text-dark-300 text-sm">{item.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Grid */}
      <section className="py-24 bg-dark-950" aria-label="All services">
        <div className="container-custom">
          <SectionHeading
            subtitle="All Services"
            title="Complete Interior Design Solutions"
            description="Click on any service to view full details, gallery, process, and pricing."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.services.map((service, index) => {
              const iconName = iconMap[service.icon] || 'Sparkles';
              const Icon = LucideIcons[iconName] || LucideIcons.Sparkles;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Card className="h-full group overflow-hidden flex flex-col" padding="none">
                    {/* Image */}
                    <Link to={`/services/${service.slug}`} className="block">
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img
                          src={service.image}
                          alt={`${service.title} - interior design service by Buildcare`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy"
                          onLoad={(e) => e.target.classList.add('loaded')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Price badge */}
                        <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-primary-300 text-xs font-medium">{service.priceRange}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-colors">
                          <Icon className="w-5 h-5 text-primary-400" />
                        </div>
                        <div>
                          <h3 className="font-heading text-lg font-semibold text-dark-50 group-hover:text-primary-300 transition-colors">
                            {service.title}
                          </h3>
                          <span className="text-dark-500 text-xs">{service.duration}</span>
                        </div>
                      </div>

                      <p className="text-dark-300 text-sm leading-relaxed mb-4 flex-1">
                        {service.shortDescription}
                      </p>

                      {/* Top 3 features */}
                      <div className="space-y-1.5 mb-5">
                        {service.features.slice(0, 3).map((f) => (
                          <div key={f} className="flex items-center gap-2 text-xs text-dark-400">
                            <CheckCircle className="w-3 h-3 text-primary-400/60" />
                            {f}
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-auto pt-4 border-t border-dark-700/20">
                        <Link to={`/services/${service.slug}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full" icon={ArrowUpRight}>
                            View Details
                          </Button>
                        </Link>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={Send}
                          iconPosition="left"
                          onClick={() => openEnquiry(service.title)}
                        >
                          Enquiry
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner
        title="Not Sure Which Service You Need?"
        description="No worries! Send us an enquiry and our experts will guide you to the perfect solution for your space."
        primaryAction={{ label: 'Send Enquiry', link: '/contact' }}
        variant="gold"
      />
    </>
  );
}