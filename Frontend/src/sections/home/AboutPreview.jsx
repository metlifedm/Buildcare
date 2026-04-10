// src/sections/home/AboutPreview.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Button from '@components/ui/Button';
import SectionHeading from '@components/ui/SectionHeading';

const highlights = [
  'Award-winning design team',
  '100% customized solutions',
  'Premium quality materials',
  'On-time project delivery',
  'Post-project support',
  'Transparent pricing',
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-white relative overflow-hidden" aria-label="About Buildcare">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-100 rounded-full blur-3xl opacity-50" />
      
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Column */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Buildcare premium interior design showcase - luxury living room"
                className="w-full h-[500px] object-cover"
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Floating card */}
            <motion.div
              className="absolute -bottom-6 -right-6 md:right-8 bg-white rounded-xl p-5 shadow-xl border border-gray-200"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              animate={{ y: [0, -10, 0] }}
            >
              <p className="font-heading text-3xl font-bold text-primary-600">12+</p>
              <p className="text-gray-600 text-sm">Years of Excellence</p>
            </motion.div>

            {/* Decorative border */}
            <div className="absolute -inset-4 rounded-2xl border border-primary-200 -z-10" />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              subtitle="About Us"
              title="We Create Spaces That Tell Your Story"
              description="With over 12 years of experience, Buildcare has established itself as a leading interior design firm, delivering exceptional spaces that combine beauty, functionality, and innovation."
              align="left"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <CheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Learn More About Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}