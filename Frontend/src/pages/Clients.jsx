// src/pages/Clients.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import StarRating from '@components/ui/StarRating';
import CTABanner from '@components/ui/CTABanner';
import StatsSection from '@sections/home/StatsSection';
import testimonialsData from '@data/testimonials.json';
import clientsData from '@data/clients.json';

export default function Clients() {
  return (
    <>
      <SEOHead
        title={pageSEO.clients.title}
        description={pageSEO.clients.description}
        url={pageSEO.clients.path}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Clients', path: '/clients' },
          ],
        }}
      />

      <PageHero
        title="Our Clients"
        subtitle="Trusted Partnerships"
        description="We're proud to have served 350+ clients across India, from homeowners to Fortune 500 companies. Their trust drives our excellence."
        breadcrumbs={[{ label: 'Clients' }]}
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
      />

      {/* Brand Logos Carousel */}
      <BrandLogosSection />

      <StatsSection />

      {/* All Testimonials */}
      <TestimonialsGrid />

      <CTABanner
        title="Join Our Growing Family of Happy Clients"
        description="Experience the Buildcare difference. Book your free consultation today and see why our clients keep coming back."
        variant="gold"
      />
    </>
  );
}

function BrandLogosSection() {
  const scrollRef = useRef(null);
  const clients = clientsData.clients;
  const duplicated = [...clients, ...clients];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let animId;
    let scrollPos = 0;

    const animate = () => {
      scrollPos += 0.5;
      if (scrollPos >= container.scrollWidth / 2) scrollPos = 0;
      container.scrollLeft = scrollPos;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="py-20 bg-dark-900 overflow-hidden" aria-label="Our clients">
      <div className="container-custom">
        <SectionHeading
          subtitle="Our Clients"
          title="Brands That Trust Us"
          description="Partnering with leading brands and organizations across industries."
        />
      </div>

      <div
        ref={scrollRef}
        className="flex items-center gap-12 overflow-hidden whitespace-nowrap py-8"
        aria-label="Client logos carousel"
      >
        {duplicated.map((client, index) => (
          <div
            key={`${client.id}-${index}`}
            className="flex-shrink-0 w-48 h-20 glass-card rounded-xl flex items-center justify-center px-6 hover:shadow-gold hover:border-primary-400/30 transition-all duration-300"
          >
            <img
              src={client.logo}
              alt={`${client.name} logo - Buildcare client`}
              className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsGrid() {
  const testimonials = testimonialsData.testimonials;
  const [visibleCount, setVisibleCount] = useState(4);

  return (
    <section className="py-24 bg-dark-950" aria-label="Client testimonials">
      <div className="container-custom">
        <SectionHeading
          subtitle="Testimonials"
          title="Words From Our Clients"
          description="Real feedback from real clients. Their satisfaction is our greatest achievement."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.slice(0, visibleCount).map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full" padding="lg" variant="gradient">
                <div className="flex items-start gap-4 mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-400/20 flex-shrink-0"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                  <div>
                    <h4 className="font-heading font-semibold text-dark-50">
                      {testimonial.name}
                    </h4>
                    <p className="text-dark-400 text-sm">{testimonial.designation}</p>
                    <p className="text-primary-400/60 text-xs mt-0.5">{testimonial.location}</p>
                  </div>
                  <Quote className="w-10 h-10 text-primary-400/10 ml-auto flex-shrink-0" />
                </div>

                <StarRating rating={testimonial.rating} className="mb-4" />

                <p className="text-dark-200 leading-relaxed italic">
                  "{testimonial.review}"
                </p>

                <div className="mt-4 pt-4 border-t border-dark-600/20">
                  <span className="text-xs text-primary-400/60 font-accent">
                    Project: {testimonial.project}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {visibleCount < testimonials.length && (
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setVisibleCount(testimonials.length)}
              className="px-8 py-3 rounded-xl glass-card text-primary-300 font-medium hover:shadow-gold hover:border-primary-400/30 transition-all cursor-pointer"
            >
              View All Testimonials
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}