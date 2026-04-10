// src/pages/Portfolio.jsx
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize2, X, ChevronLeft, ChevronRight, Calendar, Ruler } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import CTABanner from '@components/ui/CTABanner';
import portfolioData from '@data/portfolio.json';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { categories, projects } = portfolioData;

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory, projects]);

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateLightbox = useCallback(
    (direction) => {
      setLightboxIndex((prev) => {
        const next = prev + direction;
        if (next < 0) return filteredProjects.length - 1;
        if (next >= filteredProjects.length) return 0;
        return next;
      });
    },
    [filteredProjects.length]
  );

  return (
    <>
      <SEOHead
        title={pageSEO.portfolio.title}
        description={pageSEO.portfolio.description}
        url={pageSEO.portfolio.path}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Portfolio', path: '/portfolio' },
          ],
        }}
      />

      <PageHero
        title="Our Portfolio"
        subtitle="Our Work"
        description="Explore our curated collection of interior design projects — each one a testament to our commitment to excellence and innovation."
        breadcrumbs={[{ label: 'Portfolio' }]}
        backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
      />

      <section className="py-24 bg-white" aria-label="Project gallery">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-600'
                }`}
                aria-pressed={activeCategory === category}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <motion.div layout className="masonry-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const heights = ['h-64', 'h-80', 'h-72', 'h-96', 'h-64', 'h-80'];
                const heightClass = heights[index % heights.length];

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="masonry-grid-item"
                  >
                    <div
                      className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md"
                      onClick={() => openLightbox(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
                      aria-label={`View project: ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={`${project.title} - ${project.category} interior design by Buildcare in ${project.location}`}
                        className={`w-full ${heightClass} object-cover group-hover:scale-110 transition-transform duration-700`}
                        loading="lazy"
                        onLoad={(e) => e.target.classList.add('loaded')}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                        <span className="inline-block px-3 py-1 rounded-full bg-primary-600/80 text-white text-xs font-medium mb-2">
                          {project.category}
                        </span>
                        <h3 className="font-heading text-lg font-semibold text-white mb-1">
                          {project.title}
                        </h3>
                        <div className="flex items-center gap-3 text-gray-300 text-xs">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </span>
                          <span>{project.area}</span>
                        </div>
                      </div>

                      {/* Expand Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.p
              className="text-center text-gray-500 py-20 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No projects found in this category.
            </motion.p>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredProjects[lightboxIndex] && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Project lightbox"
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-primary-400 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-primary-400 transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:text-primary-400 transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Content */}
            <motion.div
              key={lightboxIndex}
              className="max-w-5xl w-full mx-4 md:mx-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={filteredProjects[lightboxIndex].image}
                  alt={filteredProjects[lightboxIndex].title}
                  className="w-full max-h-[70vh] object-cover"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-heading text-2xl font-bold text-white mb-2">
                  {filteredProjects[lightboxIndex].title}
                </h3>
                <p className="text-gray-300 mb-3 max-w-2xl mx-auto">
                  {filteredProjects[lightboxIndex].description}
                </p>
                <div className="flex items-center justify-center gap-6 text-gray-400 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    {filteredProjects[lightboxIndex].location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Ruler className="w-4 h-4 text-primary-500" />
                    {filteredProjects[lightboxIndex].area}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-primary-500" />
                    {filteredProjects[lightboxIndex].year}
                  </span>
                </div>
              </div>
              <div className="text-center mt-3 text-gray-500 text-sm">
                {lightboxIndex + 1} / {filteredProjects.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CTABanner
        title="Love What You See?"
        description="Let's create something equally stunning for your space. Get started with a free consultation today."
        variant="default"
      />
    </>
  );
}