// src/sections/home/TestimonialsSection.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import StarRating from '@components/ui/StarRating';
import Card from '@components/ui/Card';
import testimonialsData from '@data/testimonials.json';

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const testimonials = testimonialsData.testimonials;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden" aria-label="Client testimonials">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary-100 rounded-full blur-3xl opacity-50 -translate-y-1/2" />
      
      <div className="container-custom">
        <SectionHeading
          subtitle="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it. Here's what our valued clients have to say about their experience with Buildcare."
        />

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center" padding="xl" variant="solid">
                <Quote className="w-12 h-12 text-primary-200 mx-auto mb-6" />
                
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light italic">
                  "{testimonials[current].review}"
                </p>

                <div className="flex items-center justify-center mb-4">
                  <StarRating rating={testimonials[current].rating} size="lg" />
                </div>

                <div className="flex items-center justify-center gap-4">
                  <img
                    src={testimonials[current].avatar}
                    alt={testimonials[current].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary-300"
                    loading="lazy"
                  />
                  <div className="text-left">
                    <h4 className="font-heading font-semibold text-gray-900">
                      {testimonials[current].name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {testimonials[current].designation} • {testimonials[current].location}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === current
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={next}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-600 hover:text-primary-600 hover:border-primary-300 hover:shadow-md transition-all cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}