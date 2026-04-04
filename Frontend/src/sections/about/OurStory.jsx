// src/sections/about/OurStory.jsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '@components/ui/SectionHeading';

const milestones = [
  { year: '2012', title: 'Founded', description: 'Buildcare was born from a vision to redefine interior design in India with international standards.' },
  { year: '2015', title: 'First 100 Projects', description: 'Crossed 100 residential and commercial projects across Mumbai and Pune.' },
  { year: '2018', title: 'National Expansion', description: 'Expanded operations to Delhi, Bangalore, Hyderabad, and Chennai with dedicated teams.' },
  { year: '2020', title: 'Digital Innovation', description: 'Introduced 3D visualization, VR walkthroughs, and online consultation services.' },
  { year: '2023', title: 'Award-Winning', description: 'Received "Best Interior Design Firm" by India Design Awards for commercial excellence.' },
  { year: '2025', title: '500+ Projects', description: 'Celebrating 500+ successfully delivered projects with 350+ happy clients nationwide.' },
];

export default function OurStory() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const line = timelineRef.current?.querySelector('.timeline-line-fill');
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              scrub: 1,
            },
          }
        );
      }
    };
    loadGSAP();
  }, []);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden" aria-label="Our story">
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl" />

      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              subtitle="Our Story"
              title="A Legacy of Design Excellence"
              description="Founded in 2012, Buildcare has grown from a small design studio into one of India's most trusted interior design firms. Our journey is defined by unwavering commitment to quality, innovation, and client satisfaction."
              align="left"
            />
            <p className="text-dark-300 leading-relaxed mt-6">
              Every project we undertake is a canvas for creativity. We believe that great design 
              goes beyond aesthetics — it's about understanding how people live, work, and interact 
              with their spaces. Our multidisciplinary team brings together architecture, engineering, 
              and artistic vision to create environments that are both beautiful and functional.
            </p>
            <p className="text-dark-300 leading-relaxed mt-4">
              From luxurious residential interiors to cutting-edge commercial spaces, we've built 
              our reputation on delivering projects that exceed expectations — on time, within budget, 
              and with meticulous attention to every detail.
            </p>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80"
                    alt="Buildcare luxury interior design project"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80"
                    alt="Modern modular kitchen by Buildcare"
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80"
                    alt="Premium living room interior"
                    className="w-full h-72 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80"
                    alt="Modern commercial office interior"
                    className="w-full h-56 object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-3xl border border-primary-400/5 -z-10" />
          </motion.div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <h3 className="font-heading text-2xl font-bold text-center text-gradient mb-16">Our Journey</h3>
          
          {/* Timeline line */}
          <div className="absolute left-1/2 top-20 bottom-0 w-[2px] bg-dark-700/30 -translate-x-1/2 hidden md:block">
            <div className="timeline-line-fill absolute inset-0 bg-gradient-to-b from-primary-400 to-primary-600 origin-top" />
          </div>

          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                className={`relative md:flex items-center gap-8 md:mb-16 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                  <div className="glass-card rounded-xl p-6 hover:shadow-gold transition-all duration-300 inline-block">
                    <span className="text-primary-400 font-heading text-2xl font-bold block mb-2">
                      {milestone.year}
                    </span>
                    <h4 className="font-heading text-lg font-semibold text-dark-50 mb-2">
                      {milestone.title}
                    </h4>
                    <p className="text-dark-300 text-sm">{milestone.description}</p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary-400 border-4 border-dark-950 z-10 shadow-gold" />

                <div className="md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}