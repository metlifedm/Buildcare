// src/sections/process/ProcessHero.jsx
import { motion } from 'framer-motion';
import { Phone, MessageCircle, ArrowRight, Play, Star } from 'lucide-react';

export default function ProcessHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hero Background Image - Unsplash */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
          alt="Luxury interior design background"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950 via-dark-950/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/50" />
      </div>

      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] w-32 h-32 border border-primary-500/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-32 right-[15%] w-48 h-48 border border-primary-400/10 rounded-full animate-spin-slow animation-delay-2000" />
        <div className="absolute top-1/3 right-[5%] w-24 h-24 bg-primary-500/5 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container-custom py-32">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary-400 text-primary-400" />
                ))}
              </div>
              <span className="text-sm text-primary-300">Trusted by 500+ happy clients</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight text-white!">
              A Clear, Step-by-Step{' '}
              <span className="text-gradient bg-gradient-to-r from-primary-300 via-primary-400 to-primary-500 bg-clip-text">
                Interior Process
              </span>
              <br />
              You Can Trust
            </h1>
            
            <p className="text-xl text-dark-100 max-w-2xl mb-8 leading-relaxed">
              From planning to execution, every stage is structured so you stay in control. 
              No surprises, no hidden costs—just exceptional results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-dark-950 font-semibold flex items-center justify-center gap-2 shadow-gold hover:shadow-xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2 text-white">
                  📞 Get Free Consultation
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
              
              <motion.a
                href="https://wa.me/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full glass-light border border-primary-500/30 text-primary-500 font-semibold flex items-center justify-center gap-2 bg-gray-50! hover:bg-primary-500 hover:border-primary-500 transition-all duration-300"
              >
                💬 WhatsApp Now
              </motion.a>
            </div>

            <div className="flex items-center gap-8 text-sm text-dark-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-400" />
                </div>
                <span>2-day consultation</span>
              </div>
              <div className="w-px h-4 bg-dark-700" />
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-400" />
                </div>
                <span>30-60 day execution</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-dark-400 uppercase tracking-wider">Scroll</span>
          <div className="w-6 h-10 border-2 border-dark-600 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-2 bg-primary-400 rounded-full mt-2"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}