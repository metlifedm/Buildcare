// src/components/sections/AgitationSection.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { 
  AlertTriangle, TrendingUp, ArrowRight, BarChart3, Timer, 
  Eye, Construction, DollarSign, Calendar, Brush, 
  AlertCircle, XCircle
} from 'lucide-react';
import { cn } from '@utils/helpers';

// Import local images
import Agitation1 from '../../assets/images/agitation1.jpg';
import Agitation2 from '../../assets/images/agitation1.jpg';
import Agitation3 from '../../assets/images/agitation1.jpg';
import Agitation4 from '../../assets/images/agitation1.jpg';
import { useEnquiry } from '../../hooks/useEnquiry';

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
  }
];

const floatingStats = [
  { value: "73%", label: "Projects exceed budget", icon: BarChart3 },
  { value: "68%", label: "Face major delays", icon: Timer },
  { value: "82%", label: "Unsatisfied with design", icon: Eye },
  { value: "3.2x", label: "Cost for fixes", icon: TrendingUp }
];

export default function AgitationSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const [imageErrors, setImageErrors] = useState({});

  const { openEnquiry } = useEnquiry();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gray-50 overflow-hidden"
      aria-labelledby="agitation-title"
    >
      {/* Simple Dot and Plus Background Animation - No Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dots - small circles */}
        <div className="absolute top-[5%] left-[3%] w-1 h-1 rounded-full bg-primary-300/40 animate-pulse" style={{ animationDuration: '3s' }} />
        <div className="absolute top-[12%] right-[8%] w-2 h-2 rounded-full bg-primary-400/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
        <div className="absolute top-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-primary-500/35 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[20%] w-2 h-2 rounded-full bg-primary-600/25 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.3s' }} />
        <div className="absolute top-[55%] left-[8%] w-1 h-1 rounded-full bg-primary-700/30 animate-ping" style={{ animationDuration: '4.5s', animationDelay: '0.8s' }} />
        <div className="absolute top-[70%] right-[12%] w-2.5 h-2.5 rounded-full bg-primary-300/25 animate-bounce" style={{ animationDuration: '6s', animationDelay: '0.2s' }} />
        <div className="absolute top-[85%] left-[25%] w-1.5 h-1.5 rounded-full bg-primary-400/30 animate-pulse" style={{ animationDuration: '3.8s', animationDelay: '1.2s' }} />
        <div className="absolute top-[15%] left-[45%] w-2 h-2 rounded-full bg-primary-500/20 animate-ping" style={{ animationDuration: '5.5s', animationDelay: '0.6s' }} />
        <div className="absolute top-[35%] right-[35%] w-1 h-1 rounded-full bg-primary-600/35 animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '0.9s' }} />
        <div className="absolute top-[60%] left-[55%] w-2.5 h-2.5 rounded-full bg-primary-700/25 animate-pulse" style={{ animationDuration: '3.2s', animationDelay: '0.4s' }} />
        <div className="absolute top-[80%] right-[45%] w-1.5 h-1.5 rounded-full bg-primary-300/30 animate-ping" style={{ animationDuration: '4.8s', animationDelay: '1.1s' }} />
        <div className="absolute top-[20%] left-[70%] w-2 h-2 rounded-full bg-primary-400/25 animate-bounce" style={{ animationDuration: '5.2s', animationDelay: '0.7s' }} />
        <div className="absolute top-[50%] right-[60%] w-1 h-1 rounded-full bg-primary-500/35 animate-pulse" style={{ animationDuration: '3.6s', animationDelay: '0.1s' }} />
        <div className="absolute top-[75%] left-[80%] w-2 h-2 rounded-full bg-primary-600/30 animate-ping" style={{ animationDuration: '4.4s', animationDelay: '1.3s' }} />
        <div className="absolute top-[10%] left-[90%] w-1.5 h-1.5 rounded-full bg-primary-700/20 animate-bounce" style={{ animationDuration: '5.8s', animationDelay: '0.5s' }} />

        {/* Plus signs - no gradients, solid color with opacity */}
        <div className="absolute top-[8%] left-[20%] text-primary-400/30 text-2xl font-thin animate-pulse" style={{ animationDuration: '6s' }}>+</div>
        <div className="absolute top-[18%] right-[15%] text-primary-500/25 text-3xl font-thin animate-ping" style={{ animationDuration: '5s', animationDelay: '0.4s' }}>+</div>
        <div className="absolute top-[32%] left-[35%] text-primary-600/20 text-4xl font-thin animate-bounce" style={{ animationDuration: '7s', animationDelay: '1s' }}>+</div>
        <div className="absolute top-[45%] right-[40%] text-primary-300/30 text-2xl font-thin animate-pulse" style={{ animationDuration: '4.5s', animationDelay: '0.6s' }}>+</div>
        <div className="absolute top-[58%] left-[50%] text-primary-700/25 text-3xl font-thin animate-ping" style={{ animationDuration: '5.5s', animationDelay: '0.2s' }}>+</div>
        <div className="absolute top-[68%] right-[25%] text-primary-400/20 text-4xl font-thin animate-bounce" style={{ animationDuration: '6.5s', animationDelay: '1.1s' }}>+</div>
        <div className="absolute top-[78%] left-[65%] text-primary-500/30 text-2xl font-thin animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.8s' }}>+</div>
        <div className="absolute top-[88%] right-[55%] text-primary-600/25 text-3xl font-thin animate-ping" style={{ animationDuration: '5.8s', animationDelay: '0.3s' }}>+</div>
        <div className="absolute top-[5%] left-[75%] text-primary-300/20 text-4xl font-thin animate-bounce" style={{ animationDuration: '6.2s', animationDelay: '1.4s' }}>+</div>
        <div className="absolute top-[95%] left-[10%] text-primary-700/20 text-2xl font-thin animate-pulse" style={{ animationDuration: '4.8s', animationDelay: '0.7s' }}>+</div>
        <div className="absolute top-[28%] left-[85%] text-primary-400/25 text-3xl font-thin animate-ping" style={{ animationDuration: '5.2s', animationDelay: '0.9s' }}>+</div>
        <div className="absolute top-[52%] left-[12%] text-primary-500/20 text-4xl font-thin animate-bounce" style={{ animationDuration: '7.2s', animationDelay: '0.5s' }}>+</div>
        <div className="absolute top-[72%] right-[70%] text-primary-600/30 text-2xl font-thin animate-pulse" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }}>+</div>
        <div className="absolute top-[15%] left-[55%] text-primary-300/25 text-3xl font-thin animate-ping" style={{ animationDuration: '6.8s', animationDelay: '0.1s' }}>+</div>
        <div className="absolute top-[42%] right-[80%] text-primary-700/20 text-4xl font-thin animate-bounce" style={{ animationDuration: '5.5s', animationDelay: '0.8s' }}>+</div>

        {/* Additional small dots for density */}
        <div className="absolute top-[22%] left-[42%] w-1 h-1 rounded-full bg-primary-300/25 animate-pulse" style={{ animationDuration: '3.3s', animationDelay: '0.5s' }} />
        <div className="absolute top-[48%] right-[18%] w-2 h-2 rounded-full bg-primary-400/20 animate-ping" style={{ animationDuration: '4.7s', animationDelay: '0.9s' }} />
        <div className="absolute top-[62%] left-[38%] w-1.5 h-1.5 rounded-full bg-primary-500/30 animate-bounce" style={{ animationDuration: '5.3s', animationDelay: '0.2s' }} />
        <div className="absolute top-[82%] right-[48%] w-1 h-1 rounded-full bg-primary-600/25 animate-pulse" style={{ animationDuration: '3.9s', animationDelay: '1.1s' }} />
        <div className="absolute top-[92%] left-[58%] w-2 h-2 rounded-full bg-primary-700/20 animate-ping" style={{ animationDuration: '4.1s', animationDelay: '0.6s' }} />
        <div className="absolute top-[30%] right-[5%] w-1.5 h-1.5 rounded-full bg-primary-300/35 animate-bounce" style={{ animationDuration: '6.1s', animationDelay: '1.3s' }} />
        <div className="absolute top-[65%] left-[92%] w-1 h-1 rounded-full bg-primary-400/30 animate-pulse" style={{ animationDuration: '3.5s', animationDelay: '0.4s' }} />
        <div className="absolute top-[8%] right-[65%] w-2 h-2 rounded-full bg-primary-500/25 animate-ping" style={{ animationDuration: '5.7s', animationDelay: '0.7s' }} />
        <div className="absolute top-[38%] left-[18%] w-1.5 h-1.5 rounded-full bg-primary-600/20 animate-bounce" style={{ animationDuration: '4.9s', animationDelay: '1s' }} />
        <div className="absolute top-[90%] right-[85%] w-1 h-1 rounded-full bg-primary-700/30 animate-pulse" style={{ animationDuration: '3.7s', animationDelay: '0.3s' }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 mb-8 shadow-sm"
            style={{ 
              backgroundColor: 'rgba(136, 172, 196, 0.1)',
              borderColor: '#88acc4'
            }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <AlertTriangle className="w-5 h-5" style={{ color: '#115989' }} />
            </motion.div>
            <span className="text-sm font-accent tracking-wide uppercase font-bold" style={{ color: '#0e476e' }}>
              The Problems You Face Daily
            </span>
          </motion.div>

          <h1 
            id="agitation-title"
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1]"
          >
            <motion.span 
              className="block mb-2"
              style={{ color: '#171717' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Most Interior Projects
            </motion.span>
            <motion.span 
              className="block"
              style={{ color: '#115989' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              Fail Before They Even Start
            </motion.span>
          </h1>

          <motion.p 
            className="text-xl md:text-2xl leading-relaxed font-medium"
            style={{ color: '#525252' }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            Interior design is not just about looks.{' '}
            <span className="font-bold" style={{ color: '#115989' }}>
              It's about planning it right from the beginning.
            </span>
          </motion.p>
        </motion.div>

        {/* Pain Points - Large Cards */}
        <div className="space-y-24 md:space-y-32 mb-32">
          {painPoints.map((point, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className={cn(
                  "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center",
                  isEven ? "" : "lg:grid-flow-dense"
                )}>
                  {/* Image Side */}
                  <motion.div
                    className={cn(
                      "lg:col-span-7 relative group",
                      isEven ? "" : "lg:col-start-6"
                    )}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-[400px] md:h-[600px]" style={{ backgroundColor: '#f5f5f5' }}>
                      {/* Image */}
                      {!imageErrors[point.id] && point.image ? (
                        <>
                          <motion.img 
                            src={point.image}
                            alt={point.title}
                            className="w-full h-full object-cover"
                            onError={() => handleImageError(point.id)}
                            initial={{ scale: 1.1 }}
                            whileInView={{ scale: 1 }}
                            transition={{ duration: 1.2 }}
                          />
                          <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: '#e5e5e5' }}>
                          <div className="text-center p-8">
                            <point.icon className="w-32 h-32 mx-auto mb-4" style={{ color: '#88acc4' }} />
                            <p className="text-lg" style={{ color: '#525252' }}>{point.title}</p>
                          </div>
                        </div>
                      )}

                      {/* Simple Border Animation */}
                      <motion.div
                        className="absolute inset-0 rounded-3xl border-4"
                        style={{
                          borderColor: '#417aa1',
                          opacity: 0.3
                        }}
                        animate={{ 
                          opacity: [0.2, 0.4, 0.2],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />

                      {/* Floating Stat Badge */}
                      <motion.div
                        className="absolute top-8 right-8 bg-white rounded-2xl shadow-2xl border p-6"
                        style={{ borderColor: '#88acc4' }}
                        animate={{ 
                          y: [0, -12, 0],
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <motion.div 
                          className="text-5xl md:text-6xl font-black mb-2"
                          style={{ color: '#115989' }}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {point.stat}
                        </motion.div>
                        <div className="text-sm font-bold text-center uppercase tracking-wide" style={{ color: '#525252' }}>
                          {point.statLabel}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Content Side */}
                  <motion.div
                    className={cn(
                      "lg:col-span-5",
                      isEven ? "" : "lg:col-start-1 lg:row-start-1"
                    )}
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <div className="relative">
                      {/* Number Badge */}
                      <motion.div 
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 shadow-lg"
                        style={{ backgroundColor: '#115989' }}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <span className="text-white font-black text-2xl">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </motion.div>

                      {/* Icon */}
                      <motion.div
                        className="inline-flex p-5 rounded-2xl mb-6 ml-4 shadow-lg"
                        style={{ backgroundColor: '#417aa1' }}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <point.icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </motion.div>

                      {/* Title */}
                      <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight" style={{ color: '#171717' }}>
                        {point.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xl md:text-2xl mb-8 leading-relaxed font-medium" style={{ color: '#525252' }}>
                        {point.description}
                      </p>

                      {/* Details List */}
                      <div className="space-y-4">
                        {point.details.map((detail, idx) => (
                          <motion.div
                            key={idx}
                            className="flex items-start gap-4 group/item"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ x: 8 }}
                          >
                            <motion.div
                              className="p-2 rounded-lg flex-shrink-0"
                              style={{ backgroundColor: '#115989' }}
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <XCircle className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </motion.div>
                            <span className="text-lg md:text-xl font-medium pt-1 group-hover/item:text-gray-900 transition-colors" style={{ color: '#404040' }}>
                              {detail}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Decorative Line */}
                      <motion.div 
                        className="h-2 rounded-full mt-8"
                        style={{ backgroundColor: '#115989' }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ transformOrigin: isEven ? 'left' : 'right' }}
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Solid Color Background - No Gradients */}
            <div className="absolute inset-0" style={{ backgroundColor: '#115989' }} />
            
            {/* Dot Pattern Overlay - Simple dots */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1.5px, transparent 1.5px)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            <div className="relative p-12 md:p-20">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left Content */}
                <div className="flex-1 text-center lg:text-left">
                  <motion.div 
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 mb-8"
                    style={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.3)'
                    }}
                    whileHover={{ scale: 1.05 }}
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <AlertCircle className="w-5 h-5 text-white" />
                    <span className="text-sm font-accent text-white tracking-wider uppercase font-bold">
                      The Solution Awaits
                    </span>
                  </motion.div>
                  
                  <h3 className="font-heading text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                    Ready to Plan It Right?
                  </h3>
                  
                  <p className="text-xl md:text-2xl text-white/90 font-medium leading-relaxed">
                    Stop wasting time and money.{" "}
                    <span className="font-black" style={{ color: '#88acc4' }}>
                      Start with proper planning today.
                    </span>
                  </p>
                </div>

                {/* CTA Button */}
                <motion.button 
                  onClick={() => openEnquiry()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group/btn relative px-12 py-6 rounded-2xl bg-white hover:bg-gray-50 transition-all shadow-2xl overflow-hidden cursor-pointer"
                >
                  {/* Simple Shine Effect */}
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: '#e5e5e5', opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-3 font-black text-xl" style={{ color: '#115989' }}>
                    Start Your Project Now
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ArrowRight className="w-6 h-6" strokeWidth={3} />
                    </motion.div>
                  </span>
                </motion.button>
              </div>
            </div>

            {/* Floating Dots - Simple elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full"
                style={{
                  left: `${10 + (i % 4) * 20}%`,
                  top: `${20 + Math.floor(i / 4) * 50}%`,
                  opacity: 0.3
                }}
                animate={{ 
                  y: [0, -15, 0],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: 3 + (i * 0.5),
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}