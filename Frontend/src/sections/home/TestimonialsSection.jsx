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
      {/* Simple dot and plus background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[5%] w-3 h-3 rounded-full bg-primary-300/30 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute top-20 right-[10%] w-2 h-2 rounded-full bg-primary-400/40 animate-ping" style={{ animationDuration: '3s', animationDelay: '0.5s' }} />
        <div className="absolute top-1/3 left-[15%] w-4 h-4 rounded-full bg-primary-500/20 animate-bounce" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 right-[8%] w-3 h-3 rounded-full bg-primary-600/25 animate-pulse" style={{ animationDuration: '5s', animationDelay: '0.3s' }} />
        <div className="absolute top-2/3 left-[20%] w-2 h-2 rounded-full bg-primary-700/30 animate-ping" style={{ animationDuration: '3.5s', animationDelay: '0.8s' }} />
        <div className="absolute bottom-10 right-[20%] w-5 h-5 rounded-full bg-primary-300/20 animate-bounce" style={{ animationDuration: '7s', animationDelay: '0.2s' }} />
        
        <div className="absolute top-40 left-[30%] text-primary-400/25 text-4xl font-thin animate-pulse" style={{ animationDuration: '8s' }}>+</div>
        <div className="absolute bottom-32 left-[10%] text-primary-500/20 text-3xl font-thin animate-ping" style={{ animationDuration: '5s', animationDelay: '0.4s' }}>+</div>
        <div className="absolute top-1/2 right-[15%] text-primary-600/30 text-5xl font-thin animate-bounce" style={{ animationDuration: '6s', animationDelay: '1.2s' }}>+</div>
        <div className="absolute bottom-20 right-[25%] text-primary-300/25 text-4xl font-thin animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '0.6s' }}>+</div>
        <div className="absolute top-24 right-[40%] text-primary-700/20 text-2xl font-thin animate-ping" style={{ animationDuration: '3s', animationDelay: '0.1s' }}>+</div>
        <div className="absolute bottom-40 left-[35%] text-primary-400/20 text-3xl font-thin animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '0.9s' }}>+</div>
        
        <div className="absolute top-1/4 right-[5%] w-1.5 h-1.5 rounded-full bg-primary-200/40 animate-pulse" style={{ animationDuration: '3s', animationDelay: '0.7s' }} />
        <div className="absolute bottom-1/3 left-[40%] w-2.5 h-2.5 rounded-full bg-primary-400/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.2s' }} />
        <div className="absolute top-3/4 right-[30%] w-2 h-2 rounded-full bg-primary-500/25 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1.5s' }} />
        <div className="absolute top-10 left-[60%] w-3 h-3 rounded-full bg-primary-600/20 animate-pulse" style={{ animationDuration: '6s', animationDelay: '0.4s' }} />
        <div className="absolute bottom-10 left-[70%] w-1.5 h-1.5 rounded-full bg-primary-300/35 animate-ping" style={{ animationDuration: '3.8s', animationDelay: '0.6s' }} />
        <div className="absolute top-1/2 left-[45%] text-primary-500/20 text-4xl font-thin animate-pulse" style={{ animationDuration: '7s', animationDelay: '0.5s' }}>+</div>
        <div className="absolute bottom-1/4 left-[55%] w-2 h-2 rounded-full bg-primary-700/25 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.1s' }} />
        <div className="absolute top-32 left-[75%] w-4 h-4 rounded-full bg-primary-400/20 animate-ping" style={{ animationDuration: '5s', animationDelay: '0.3s' }} />
        <div className="absolute bottom-48 right-[5%] text-primary-300/20 text-3xl font-thin animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.8s' }}>+</div>
      </div>
      
      <div className="container-custom relative z-10">
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