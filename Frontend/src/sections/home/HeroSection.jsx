// src/sections/home/HeroSection.jsx
import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Send, Play, ChevronDown } from 'lucide-react';
import Button from '@components/ui/Button';
import { useEnquiry } from '@hooks/useEnquiry';
import { COMPANY } from '@utils/constants';

export default function HeroSection() {
  const videoRef = useRef(null);
  const { openEnquiry } = useEnquiry();

  const scrollToNext = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden" role="banner" aria-label="Hero section">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline preload="auto"
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
        >
          <source src="https://cdn.coverr.co/videos/coverr-interior-of-a-modern-house-1584/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-dark-950/70 to-dark-950/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/30" />
      </div>

      {/* Decorative particles */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-primary-400/30"
            style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-12 h-[2px] bg-primary-400" />
            <span className="text-primary-400 font-accent font-medium text-sm tracking-[0.2em] uppercase">
              {COMPANY.tagline}
            </span>
          </motion.div>

          <motion.h2
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <span className="text-dark-50">Interior Design Without </span> 
            <span className="text-gradient">Cost Surprises, </span> 
            <span className="text-dark-50">Delays or Regret</span>
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-dark-200 max-w-xl leading-relaxed mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            We guide you step-by-step with a structured process so you stay in control of your budget, design and execution from day one.
          </motion.p>

          {/* CTA Buttons - Enquiry Now + View Portfolio */}
          <motion.div
            className="flex flex-col sm:flex-row items-start gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              variant="primary"
              size="lg"
              icon={Send}
              iconPosition="left"
              onClick={() => openEnquiry()}
              className="animate-pulse-glow"
            >
              Enquiry Now
            </Button>
            <Link to="/portfolio">
              <Button variant="secondary" size="lg" icon={Play} iconPosition="left">
                View Portfolio
              </Button>
            </Link>
          </motion.div>

          {/* Stats inline */}
          <motion.div
            className="flex items-center gap-8 mt-12 pt-8 border-t border-dark-600/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { value: 'Response within 10–15 minutes' },
              { value: '|' },
              { value: 'Expert guidance' },
              // { value: '350+', label: 'Clients' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-lg md:text-xl font-bold text-primary-400">{stat.value}</p>
                {/* <p className="text-xs text-dark-400 uppercase tracking-wider font-accent">{stat.label}</p> */}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-dark-400 cursor-pointer"
        onClick={scrollToNext}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="Scroll down"
      >
        <span className="text-xs font-accent tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </motion.button>

      {/* Side decoration */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4 z-10">
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-primary-400/40" />
        <span className="text-primary-400/60 font-accent text-xs tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
          SINCE 2012
        </span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-primary-400/40 to-transparent" />
      </div>
    </section>
  );
}