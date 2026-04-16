import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://res.cloudinary.com/doo2og4l3/image/upload/v1776269611/2151008741_q3kybz.jpg",
    title: "Elegant Interior",
    desc: "Architecture shapes not just spaces, but how we live and feel.",
    button: "Learn More",
    link: "/about/our-story"
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    title: "Modern Living",
    desc: "Design that blends comfort, style, and functionality.",
    button: "Explore Services",
    link: "/services"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    title: "Luxury Spaces",
    desc: "Premium interiors crafted with perfection.",
    button: "See Our Blogs",
    link: "/blog"
  },
  {
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
    title: "Creative Concepts",
    desc: "Turning imagination into beautiful spaces.",
    button: "How It Works",
    link: "/about/process"
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    title: "Smart Interiors",
    desc: "Innovation meets modern lifestyle.",
    button: "Get Started",
    link: "/contact"
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    if (isAnimating) return;
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const activeSlide = slides[current];

  // Professional Wipe Animation Variants
  const wipeVariants = {
    initial: { clipPath: "inset(0 0 0 100%)" },
    animate: { clipPath: "inset(0 0 0 0%)" },
    exit: { clipPath: "inset(0 100% 0 0%)" },
  };

  return (
    <section className="relative h-screen w-full bg-[#0a0a0a] overflow-hidden">

      {/* BACKGROUND LAYER (Current Image) */}
      <AnimatePresence mode="popLayout" onExitComplete={() => setIsAnimating(false)}>
        <motion.div
          key={current}
          variants={wipeVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationStart={() => setIsAnimating(true)}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }} // Professional Cubic Bezier
          className="absolute inset-0 z-10"
        >
          {/* Image with subtle Ken Burns effect */}
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src={activeSlide.image}
            alt={activeSlide.title}
            className="h-full w-full object-cover"
          />

          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* STATIC CONTENT LAYER (Always on top) */}
      <div className="relative z-20 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pointer-events-none">
        <div className="max-w-3xl overflow-hidden">
          <motion.span
            key={`subtitle-${current}`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block text-primary-400 bg-dark-50/70 py-1 px-3 rounded-xl font-medium tracking-[0.3em] uppercase text-xs md:text-sm mb-4"
          >
            Premium Architecture
          </motion.span>

          <motion.h2
            key={`title-${current}`}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: "circOut" }}
            className="text-white! text-5xl md:text-8xl font-light tracking-tight mb-6 leading-[1.1]"
          >
            {activeSlide.title.split(' ')[0]} <br />
            <span className="font-bold">{activeSlide.title.split(' ')[1]}</span>
          </motion.h2>

          <motion.p
            key={`desc-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/60 text-lg md:text-xl mb-10 max-w-lg leading-relaxed pointer-events-auto"
          >
            {activeSlide.desc}
          </motion.p>

          <motion.div
            key={`btn-${current}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="pointer-events-auto"
          >
            <Link to={activeSlide.link}>
              <button className="group relative cursor-pointer px-10 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest overflow-hidden transition-all">
                <span className="relative z-10">{activeSlide.button}</span>
                <div className="absolute inset-0 bg-primary-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* UI CONTROLS */}
      <div className="absolute bottom-12 right-6 md:right-12 z-30 flex items-center gap-8">
        {/* Counter */}
        <div className="flex items-baseline gap-2">
          <span className="text-white text-2xl font-bold">{String(current + 1).padStart(2, '0')}</span>
          <div className="h-[1px] w-12 bg-white/30" />
          <span className="text-white/40 text-sm">{String(slides.length).padStart(2, '0')}</span>
        </div>

        {/* Arrow Navigation */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="p-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all rounded-full cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="p-4 border border-white/10 text-white hover:bg-white hover:text-black transition-all rounded-full cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10 z-30">
        <motion.div
          key={current}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          className="h-full bg-primary-600"
        />
      </div>

    </section>
  );
}