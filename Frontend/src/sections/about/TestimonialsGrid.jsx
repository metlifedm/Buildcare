import React, { useState } from "react";
import SectionHeading from '@components/ui/SectionHeading';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import testimonialsData from '@data/testimonials.json';
import Card from '@components/ui/Card';
import StarRating from '@components/ui/StarRating';

export function TestimonialsGrid() {
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