// src/components/sections/AgitationSection.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  AlertTriangle, TrendingUp, ArrowRight, Zap, BarChart3, Timer, 
  Eye, Construction, DollarSign, Calendar, Brush, Sparkles, 
  CheckCircle2, AlertCircle
} from 'lucide-react';
import { cn } from '@utils/helpers';

// Import local images
import Agitation1 from '../../assets/images/agitation1.jpg';
import Agitation2 from '../../assets/images/agitation1.jpg';
import Agitation3 from '../../assets/images/agitation1.jpg';
import Agitation4 from '../../assets/images/agitation1.jpg';

const painPoints = [
  {
    id: 1,
    icon: DollarSign,
    title: "Budget keeps increasing without reason",
    description: "Hidden costs and unexpected expenses blow your budget without clear justification",
    details: [
      "Hidden charges appear mid-project",
      "Unexpected material costs",
      "No transparent pricing",
      "Contractors overcharge"
    ],
    stat: "+73%",
    statLabel: "average overrun",
    image: Agitation1,
    position: "left",
    step: "01"
  },
  {
    id: 2,
    icon: Calendar,
    title: "Endless delays & missed timelines",
    description: "Projects drag on for months with missed deadlines and broken promises",
    details: [
      "Missed project deadlines",
      "Delayed material delivery",
      "Inefficient scheduling",
      "Poor project management"
    ],
    stat: "+68%",
    statLabel: "face delays >2 months",
    image: Agitation2,
    position: "right",
    step: "02"
  },
  {
    id: 3,
    icon: Brush,
    title: "Design doesn't match what you imagined",
    description: "Final result looks nothing like the beautiful renders you were shown",
    details: [
      "Reality vs expectations gap",
      "Poor color matching",
      "Quality variations",
      "Aesthetic disappointment"
    ],
    stat: "82%",
    statLabel: "unsatisfied with result",
    image: Agitation3,
    position: "left",
    step: "03"
  },
  {
    id: 4,
    icon: Construction,
    title: "Fixing mistakes becomes expensive after work starts",
    description: "Mistakes caught late become costly reworks that blow your timeline",
    details: [
      "Late issue discovery",
      "Costly corrections needed",
      "Additional timeline extensions",
      "Wasted resources and time"
    ],
    stat: "3.2x",
    statLabel: "higher cost for fixes",
    image: Agitation4,
    position: "right",
    step: "04"
  }
];

const floatingStats = [
  { value: "73%", label: "Projects exceed budget", icon: BarChart3 },
  { value: "68%", label: "Face major delays", icon: Timer },
  { value: "82%", label: "Unsatisfied with design", icon: Eye },
  { value: "3.2x", label: "Cost for fixes", icon: TrendingUp }
];

// Curved SVG Timeline
const CurvedTimeline = ({ itemCount }) => {
  return (
    <svg
      className="absolute left-1/2 top-0 w-full h-full -translate-x-1/2"
      style={{ pointerEvents: 'none' }}
      viewBox="0 0 200 1200"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="timelineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(201, 169, 110, 0)" />
          <stop offset="50%" stopColor="rgba(201, 169, 110, 0.6)" />
          <stop offset="100%" stopColor="rgba(201, 169, 110, 0)" />
        </linearGradient>
      </defs>

      {/* Main curved path */}
      <motion.path
        d="M 100 0 Q 80 150, 100 300 T 100 600 T 100 900 T 100 1200"
        stroke="url(#timelineGradient)"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDasharray: 2000, strokeDashoffset: 2000 }}
        whileInView={{ strokeDashoffset: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />

      {/* Animated flowing line */}
      <motion.path
        d="M 100 0 Q 80 150, 100 300 T 100 600 T 100 900 T 100 1200"
        stroke="rgba(201, 169, 110, 1)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ strokeDasharray: 100, strokeDashoffset: 100, opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        animate={{ strokeDashoffset: [100, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      {/* Dots along the timeline */}
      {[0, 0.33, 0.66, 1].map((position, idx) => (
        <motion.circle
          key={idx}
          cx="100"
          cy={position * 1200}
          r="8"
          fill="rgba(201, 169, 110, 0.3)"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.2, duration: 0.5 }}
        />
      ))}
    </svg>
  );
};

// Timeline Dot Component
const TimelineDot = ({ index }) => {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 w-20 h-20 flex items-center justify-center"
      style={{ top: `${index * 25}%` }}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-400 to-primary-500 opacity-20"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-2 rounded-full border-2 border-primary-400/60"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, linear: true }}
      />
      
      {/* Center dot */}
      <motion.div
        className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-gold"
        animate={{ 
          boxShadow: [
            "0 0 20px rgba(201, 169, 110, 0.4)",
            "0 0 40px rgba(201, 169, 110, 0.8)",
            "0 0 20px rgba(201, 169, 110, 0.4)"
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <CheckCircle2 className="w-5 h-5 text-dark-950" strokeWidth={3} />
      </motion.div>
    </motion.div>
  );
};

export default function AgitationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 0 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut"
      } 
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-dark-950 overflow-hidden"
      aria-labelledby="agitation-title"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern%20id=%22grid%22%20width=%2260%22%20height=%2260%22%20patternUnits=%22userSpaceOnUse%22%3E%3Cpath%20d=%22M%2060%200%20L%200%200%200%2060%22%20fill=%22none%22%20stroke=%22rgba(201,169,110,0.15)%22%20stroke-width=%221%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect%20width=%22100%25%22%20height=%22100%25%22%20fill=%22url(%23grid)%22/%3E%3C/svg%3E')] animate-[spin_60s_linear_infinite]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-400/30 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: 0
            }}
            animate={{ 
              y: [null, -100, -200],
              opacity: [0, 0.5, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary-500/10 border border-primary-500/30 mb-6 backdrop-blur-sm"
          >
            <AlertTriangle className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-accent text-primary-300 tracking-wide">
              The Problems You Face
            </span>
          </motion.div>

          <h1 
            id="agitation-title"
            className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight text-dark-50"
          >
            <motion.span 
              className="block text-gradient-animated"
            >
              Most Interior Projects Fail Before They Even Start
            </motion.span>
          </h1>

          <p className="text-lg md:text-xl text-dark-300 leading-relaxed">
            Interior design is not just about looks. It's about planning it right from the beginning.
          </p>
        </motion.div>

        {/* Curved Timeline Container */}
        <div className="relative">
          {/* Curved SVG Timeline Background */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-full pointer-events-none">
            <CurvedTimeline itemCount={painPoints.length} />
          </div>

          {/* Timeline Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="relative space-y-48"
          >
            {painPoints.map((point, index) => {
              const isLeft = point.position === "left";
              
              return (
                <motion.div
                  key={point.id}
                  variants={itemVariants}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-20">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                    >
                      {/* Outer glow ring */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary-400 opacity-20"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                      />
                      
                      {/* Middle ring */}
                      <motion.div
                        className="absolute inset-2 rounded-full border-2 border-primary-400/60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, linear: true }}
                      />
                      
                      {/* Center dot */}
                      <motion.div
                        className="absolute inset-3 rounded-full bg-gradient-to-br from-primary-400 to-primary-500 flex items-center justify-center shadow-gold"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(201, 169, 110, 0.4)",
                            "0 0 40px rgba(201, 169, 110, 0.8)",
                            "0 0 20px rgba(201, 169, 110, 0.4)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <span className="font-heading font-bold text-dark-950 text-sm">{point.step}</span>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content Container - Zig Zag Layout */}
                  <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20",
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}>
                    {/* Image Side */}
                    <motion.div
                      className={cn(
                        "relative rounded-2xl overflow-hidden h-80 group",
                        isLeft ? "lg:order-1" : "lg:order-2"
                      )}
                      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Image with fallback */}
                      {!imageErrors[point.id] && point.image ? (
                        <>
                          <img 
                            src={point.image}
                            alt={point.title}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(point.id)}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/60 to-dark-950/30" />
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
                          <div className="text-center">
                            <point.icon className="w-24 h-24 text-primary-400/30 mx-auto mb-4" />
                            <p className="text-dark-400">{point.title}</p>
                          </div>
                        </div>
                      )}

                      {/* Floating Stat Badge */}
                      <motion.div
                        className="absolute top-6 right-6 px-4 py-3 rounded-xl bg-dark-900/80 backdrop-blur-md border border-primary-400/40 flex flex-col items-center"
                        animate={{ 
                          y: [0, -8, 0],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                      >
                        <div className="text-2xl font-bold mb-1 text-primary-400">
                          {point.stat}
                        </div>
                        <div className="text-dark-400 text-xs font-medium text-center">
                          {point.statLabel}
                        </div>
                      </motion.div>

                      {/* Image Border Glow */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl border-2 border-primary-400/30 pointer-events-none"
                        animate={{ 
                          boxShadow: [
                            "0 0 20px rgba(201, 169, 110, 0.3)",
                            "0 0 40px rgba(201, 169, 110, 0.6)",
                            "0 0 20px rgba(201, 169, 110, 0.3)"
                          ]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                      className={cn(
                        "relative",
                        isLeft ? "lg:order-2 lg:pl-8" : "lg:order-1 lg:pr-8"
                      )}
                      initial={{ opacity: 0, x: isLeft ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.8, delay: index * 0.15 }}
                    >
                      <div className="relative p-8 rounded-2xl border border-dark-700/50 bg-dark-900/50 backdrop-blur-sm">
                        {/* Icon and Title */}
                        <div className="flex items-start gap-4 mb-6">
                          <motion.div
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-400 to-primary-500"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                          >
                            <point.icon className="w-7 h-7 text-dark-950" strokeWidth={1.5} />
                          </motion.div>

                          <div className="flex-1">
                            <h3 className="font-heading text-2xl font-bold text-dark-50 mb-2">
                              {point.title}
                            </h3>
                            <p className="text-dark-300 text-sm leading-relaxed">
                              {point.description}
                            </p>
                          </div>
                        </div>

                        {/* Details List */}
                        <motion.div
                          className="space-y-2.5 mt-6"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                          {point.details.map((detail, idx) => (
                            <motion.div
                              key={idx}
                              className="flex items-center gap-3 text-dark-200 text-sm"
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: idx * 0.05 + index * 0.1 }}
                            >
                              <AlertCircle className="w-4 h-4 text-primary-400/60 flex-shrink-0" />
                              <span>{detail}</span>
                            </motion.div>
                          ))}
                        </motion.div>

                        {/* Animated Bottom Border */}
                        <motion.div 
                          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full"
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-32 mb-24"
        >
          <div className="rounded-3xl overflow-hidden border border-primary-400/20 bg-gradient-to-br from-dark-900/95 to-dark-950/95 backdrop-blur-xl">
            <div className="p-12 md:p-16">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-400/30 mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <TrendingUp className="w-4 h-4 text-primary-400" />
                  <span className="text-sm font-accent text-primary-300 tracking-wide">
                    Industry Statistics 2025-26
                  </span>
                </motion.div>
                
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark-50 leading-tight">
                  The Real Cost of <span className="text-gradient">Poor Planning</span>
                </h2>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {floatingStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <div className="text-center p-6 rounded-xl bg-dark-800/50 border border-dark-700/50 group-hover:border-primary-400/40 transition-all backdrop-blur-sm">
                      <motion.div 
                        className="w-12 h-12 rounded-lg bg-primary-400/20 flex items-center justify-center mx-auto mb-4"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      >
                        <stat.icon className="w-6 h-6 text-primary-400" />
                      </motion.div>
                      
                      <motion.div 
                        className="text-4xl md:text-5xl font-bold text-primary-400 mb-2"
                        whileHover={{ scale: 1.1 }}
                      >
                        {stat.value}
                      </motion.div>
                      
                      <div className="text-dark-200 text-xs md:text-sm font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="relative group"
          whileHover={{ scale: 1.02 }}
        >
          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated Border */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="relative bg-gradient-to-r from-primary-950/95 via-dark-900/95 to-primary-950/95 backdrop-blur-xl p-10 md:p-14 rounded-3xl border border-primary-400/30">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Left Content */}
                <div className="flex-1 text-center md:text-left">
                  <motion.div 
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-400/10 border border-primary-400/30 mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Zap className="w-4 h-4 text-primary-400" />
                    <span className="text-xs font-accent text-primary-300 tracking-wide">
                      The Solution
                    </span>
                  </motion.div>
                  
                  <h3 className="font-heading text-3xl md:text-4xl font-bold text-dark-50 mb-4">
                    Interior design is not just about <span className="text-gradient">looks</span>
                  </h3>
                  
                  <p className="text-dark-200 text-lg">
                    It's about planning it{" "}
                    <motion.span 
                      className="text-primary-400 font-semibold inline-block"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      right from the beginning
                    </motion.span>
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button 
                  onClick={() => {
                    const contactSection = document.getElementById('Enquiry Now');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 group/btn relative px-8 py-4 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 hover:from-primary-500 hover:to-primary-600 transition-all shadow-gold overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2 text-dark-950 font-bold">
                    Start Your Project
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blurs */}
      <div className="absolute left-0 top-1/2 -translate-x-1/2 w-96 h-96 bg-primary-400/10 rounded-full blur-[128px] animate-pulse pointer-events-none" />
      <div className="absolute right-0 bottom-1/4 translate-x-1/2 w-96 h-96 bg-primary-400/5 rounded-full blur-[128px] animate-pulse pointer-events-none" />
    </section>
  );
}