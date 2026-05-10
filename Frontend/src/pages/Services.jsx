// src/pages/Services.jsx

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';

import {
  ArrowUpRight,
  CheckCircle,
  Send,
  Sparkles,
} from 'lucide-react';

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
  home: 'Home',
  building: 'Building2',
  grid3x3: 'Grid3X3',
  layers: 'Layers',
  chefHat: 'ChefHat',
  paintbrush: 'Paintbrush',
  wrench: 'Wrench',
  doorOpen: 'DoorOpen',
  zap: 'Zap',
};

export default function Services() {
  const { openEnquiry } = useEnquiry();

  const [activeService, setActiveService] = useState(
    servicesData.services[0]?.id
  );

  return (
    <>
      {/* SEO */}
      <SEOHead
        title={pageSEO.services.title}
        description={pageSEO.services.description}
        url={pageSEO.services.path}
      />

      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
          ],
        }}
      />

      {/* HERO */}
      <PageHero
        title="Our Services"
        subtitle="Luxury Interior Solutions"
        description="Crafting elegant residential and commercial interiors with timeless aesthetics, functionality, and premium quality."
        breadcrumbs={[{ label: 'Services' }]}
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
      />

      {/* ========================= */}
      {/* PROCESS SECTION */}
      {/* ========================= */}

      <section className="bg-[#fafafa] py-24">
        <div className="container-custom">
          <SectionHeading
            subtitle="Our Process"
            title="How We Work"
            description="A streamlined design process focused on quality, creativity, and flawless execution."
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Consultation',
                desc: 'Understanding your vision, lifestyle, and project requirements.',
              },
              {
                step: '02',
                title: 'Planning & Design',
                desc: 'Creating layouts, mood boards, and realistic design concepts.',
              },
              {
                step: '03',
                title: 'Execution',
                desc: 'Transforming concepts into reality with premium craftsmanship.',
              },
              {
                step: '04',
                title: 'Final Handover',
                desc: 'Delivering elegant interiors with complete quality assurance.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <Card
                  className="group relative h-full overflow-hidden border border-dark-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-primary-300 hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)]"
                  padding="lg"
                >
                  <div className="absolute right-5 top-5 text-6xl font-bold text-dark-100 transition-all duration-500 group-hover:text-primary-100">
                    {item.step}
                  </div>

                  <div className="relative z-10">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-50 text-lg font-bold text-primary-700 transition-all duration-500 group-hover:bg-primary-500 group-hover:text-white">
                      {item.step}
                    </div>

                    <h3 className="font-heading text-2xl font-semibold text-dark-900">
                      {item.title}
                    </h3>

                    <p className="mt-4 leading-relaxed text-dark-500">
                      {item.desc}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* SERVICES SECTION */}
      {/* ========================= */}

      <section className="bg-white py-24">
        <div className="container-custom">
          <SectionHeading
            subtitle="Our Expertise"
            title="Interior Design Services"
            description="Hover over any service to explore our premium interior design solutions."
          />

          <div className="mt-20 flex flex-col gap-5">
            {servicesData.services.map((service, index) => {
              const iconName = iconMap[service.icon] || 'Sparkles';

              const Icon =
                LucideIcons[iconName] || LucideIcons.Sparkles;

              const isActive = activeService === service.id;

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  onMouseEnter={() => setActiveService(service.id)}
                  className={`group relative overflow-hidden rounded-[32px] border bg-[#fafafa] transition-all duration-700 ${
                    isActive
                      ? 'border-primary-300 shadow-[0_20px_70px_rgba(0,0,0,0.08)]'
                      : 'border-dark-200'
                  }`}
                >
                  <div
                    className={`grid overflow-hidden transition-all duration-700 ease-in-out lg:grid-cols-[0.85fr_1.15fr] cursor-pointer ${
                      isActive
                        ? 'h-[550px]'
                        : 'h-[200px]'
                    }`}
                  >
                    {/* LEFT CONTENT */}
                    <div
                      className={`relative flex flex-col justify-between transition-all duration-700 ${
                        isActive
                          ? 'p-7 lg:p-10'
                          : 'p-5 lg:p-6'
                      }`}
                    >
                      <div>
                        {/* ICON */}
                        <motion.div
                          animate={{
                            scale: isActive ? 1 : 0.95,
                          }}
                          transition={{ duration: 0.4 }}
                          className={`flex items-center justify-center rounded-[24px] transition-all duration-500 ${
                            isActive
                              ? 'mb-8 h-20 w-20'
                              : 'mb-4 h-14 w-14'
                          } ${
                            isActive
                              ? 'bg-primary-500 text-white'
                              : 'bg-primary-50 text-primary-600'
                          }`}
                        >
                          <Icon
                            size={isActive ? 34 : 24}
                          />
                        </motion.div>

                        {/* CATEGORY */}
                        <div className="mb-3 flex items-center gap-2">
                          <Sparkles
                            size={13}
                            className="text-primary-500"
                          />

                          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-dark-500">
                            {service.category ||
                              'Interior Design'}
                          </span>
                        </div>

                        {/* TITLE */}
                        <h3
                          className={`font-heading font-bold leading-tight transition-all duration-500 ${
                            isActive
                              ? 'text-3xl lg:text-4xl text-primary-700'
                              : 'text-xl lg:text-2xl text-dark-900'
                          }`}
                        >
                          {service.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p
                          className={`max-w-lg leading-relaxed text-dark-500 transition-all duration-500 ${
                            isActive
                              ? 'mt-5 text-base opacity-100'
                              : 'mt-3 line-clamp-2 text-sm opacity-80'
                          }`}
                        >
                          {service.shortDescription}
                        </p>

                        {/* FEATURES */}
                        <motion.div
                          initial={false}
                          animate={{
                            opacity: isActive ? 1 : 0,
                            height: isActive ? 'auto' : 0,
                            marginTop: isActive ? 28 : 0,
                          }}
                          transition={{ duration: 0.4 }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-3 sm:grid-cols-2">
                            {service.features
                              ?.slice(0, 4)
                              .map((feature) => (
                                <div
                                  key={feature}
                                  className="flex items-center gap-2 text-sm text-dark-600"
                                >
                                  <CheckCircle className="h-4 w-4 text-primary-500" />
                                  {feature}
                                </div>
                              ))}
                          </div>
                        </motion.div>
                      </div>

                      {/* BUTTONS */}
                      <motion.div
                        animate={{
                          opacity: isActive ? 1 : 0,
                          y: isActive ? 0 : 20,
                        }}
                        transition={{ duration: 0.4 }}
                        className="mt-8 flex flex-wrap gap-4"
                      >
                        <Link to={`/services/${service.slug}`}>
                          <Button
                            variant="primary"
                            size="lg"
                            icon={ArrowUpRight}
                            className="rounded-full px-8"
                          >
                            View Details
                          </Button>
                        </Link>

                        <Button
                          variant="outline"
                          size="lg"
                          icon={Send}
                          iconPosition="left"
                          className="rounded-full border-primary-300 px-8"
                          onClick={() =>
                            openEnquiry(service.title)
                          }
                        >
                          Enquiry
                        </Button>
                      </motion.div>
                    </div>

                    {/* RIGHT IMAGE */}
                    <div
                      className={`relative overflow-hidden transition-all duration-700 ${
                        isActive
                          ? 'opacity-100'
                          : 'opacity-90'
                      }`}
                    >
                      {/* IMAGE */}
                      <motion.img
                        src={service.image}
                        alt={service.title}
                        animate={{
                          scale: isActive ? 1.06 : 1,
                        }}
                        transition={{
                          duration: 0.7,
                        }}
                        className={`h-full w-full object-cover transition-all duration-700 ${
                          isActive
                            ? 'opacity-100'
                            : 'opacity-85 grayscale-[10%]'
                        }`}
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-black/10" />

                      {/* SHINE EFFECT */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <div className="absolute -left-[120%] top-0 h-full w-[40%] rotate-12 bg-white/20 blur-3xl transition-all duration-1000 group-hover:left-[130%]" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready To Transform Your Space?"
        description="Let our experts craft luxurious and functional interiors tailored perfectly to your lifestyle."
        primaryAction={{
          label: 'Get Free Consultation',
          link: '/contact',
        }}
        variant="default"
      />
    </>
  );
}