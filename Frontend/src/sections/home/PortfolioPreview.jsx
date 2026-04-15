// src/sections/home/PortfolioPreview.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import Button from '@components/ui/Button';
import portfolioData from '@data/portfolio.json';

export default function PortfolioPreview() {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured).slice(0, 4);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
    setIsChanging(false);
  };

  const nextImage = () => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % featuredProjects.length);
      setTimeout(() => setIsChanging(false), 300);
    }, 150);
  };

  const prevImage = () => {
    if (isChanging) return;
    setIsChanging(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
      setTimeout(() => setIsChanging(false), 300);
    }, 150);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  };

  return (
    <>
      <section className="py-24 bg-gray-50 relative overflow-hidden" aria-label="Featured portfolio">
        
        <div className="container-custom">
          <SectionHeading
            subtitle="Our Portfolio"
            title="Featured Projects"
            description="Explore our handpicked selection of transformative interior design projects that showcase our commitment to excellence."
          />

          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={`${project.title} - ${project.category} interior design project by Buildcare`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-medium mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-white! mb-2">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-200 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                    <span>{project.area}</span>
                  </div>
                </div>

                {/* Expand icon */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 cursor-pointer">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/about/our-story">
              <Button size="lg" icon={ArrowRight}>
                Our Story & More Projects
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center"
            onClick={closeLightbox}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {featuredProjects.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 flex items-center justify-center text-white cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute top-4 left-4 z-10 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm cursor-default">
              {currentImageIndex + 1} / {featuredProjects.length}
            </div>

            {/* Main image with fade animation */}
            <div className="relative max-w-7xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/9] md:aspect-[16/10] rounded-2xl overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={featuredProjects[currentImageIndex].image}
                    alt={featuredProjects[currentImageIndex].title}
                    className="w-full h-full object-contain"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: "easeInOut",
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.4 }
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Image info */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent rounded-b-2xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary-600 text-white text-xs font-medium mb-3">
                  {featuredProjects[currentImageIndex].category}
                </span>
                <h3 className="text-white! font-heading text-xl md:text-2xl font-semiboldmb-2">
                  {featuredProjects[currentImageIndex].title}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {featuredProjects[currentImageIndex].location}
                  </span>
                  <span>{featuredProjects[currentImageIndex].area}</span>
                </div>
              </motion.div>
            </div>

            {/* Thumbnails */}
            {featuredProjects.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
                {featuredProjects.map((project, idx) => (
                  <button
                    key={project.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isChanging) {
                        setIsChanging(true);
                        setTimeout(() => {
                          setCurrentImageIndex(idx);
                          setTimeout(() => setIsChanging(false), 300);
                        }, 150);
                      }
                    }}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                      idx === currentImageIndex
                        ? 'ring-2 ring-primary-500 scale-110'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {idx === currentImageIndex && (
                      <div className="absolute inset-0 bg-primary-500/20" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}