// src/sections/home/StatsSection.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, Users, Award, Palette } from 'lucide-react';

const stats = [
  { icon: Briefcase, value: 500, suffix: '+', label: 'Projects Completed' },
  { icon: Users, value: 350, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 12, suffix: '+', label: 'Years Experience' },
  { icon: Palette, value: 45, suffix: '+', label: 'Expert Designers' },
];

function AnimatedCounter({ value, suffix, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return (
    <span className="font-heading text-4xl md:text-5xl font-bold text-gradient">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      className="relative py-20 bg-gradient-to-b from-dark-950 to-dark-900 overflow-hidden"
      aria-label="Company statistics"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(201,169,110,0.5) 2px, transparent 0)',
        backgroundSize: '50px 50px',
      }} />

      <div className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-2xl glass-card mx-auto mb-4 flex items-center justify-center group-hover:shadow-gold transition-all duration-300">
                <stat.icon className="w-7 h-7 text-primary-400" />
              </div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
              <p className="text-dark-300 text-sm mt-2 font-accent">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}