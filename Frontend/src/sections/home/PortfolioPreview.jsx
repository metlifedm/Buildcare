// src/sections/home/PortfolioPreview.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Maximize2 } from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import Button from '@components/ui/Button';
import portfolioData from '@data/portfolio.json';

export default function PortfolioPreview() {
  const featuredProjects = portfolioData.projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section className="py-24 bg-dark-950 relative overflow-hidden" aria-label="Featured portfolio">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl" />
      
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
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
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
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block px-3 py-1 rounded-full bg-primary-400/20 text-primary-300 text-xs font-medium mb-3">
                  {project.category}
                </span>
                <h3 className="font-heading text-xl font-semibold text-dark-50 mb-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-4 text-dark-300 text-sm">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {project.location}
                  </span>
                  <span>{project.area}</span>
                </div>
              </div>

              {/* Expand icon */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
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
          <Link to="/portfolio">
            <Button variant="secondary" size="lg" icon={ArrowRight}>
              View Full Portfolio
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}