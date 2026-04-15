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
    <section className="py-24 relative overflow-hidden" aria-label="About Buildcare">
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/doo2og4l3/image/upload/v1776255236/home-about_dp5sbb.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Dark Overlay for better contrast */}
        <div className="absolute inset-0 bg-white/90"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column with Up/Down Animation */}
          <motion.div
            className="relative -my-8 sm:my-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{
              y: {
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut"
              }
            }}
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776256090/ser-img-3_vmfybv.png"
                alt="Buildcare premium interior design showcase - luxury living room"
                className="w-full h-auto sm:h-[500px] md:h-[550px] lg:h-[600px] object-contain object-center"
                loading="lazy"
                onLoad={(e) => e.target.classList.add('loaded')}
              />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="pb-8 sm:pb-0"
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