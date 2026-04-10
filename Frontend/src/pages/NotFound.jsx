// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@components/ui/Button';
import SEOHead from '@seo/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found | Buildcare"
        description="The page you're looking for doesn't exist."
        noindex
      />
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden bg-white">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[8rem] md:text-[12rem] font-heading font-bold text-primary-600 leading-none mb-4">
              404
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-heading text-3xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 text-lg max-w-md mx-auto mb-8">
              The page you're looking for doesn't exist or has been moved.
              Let's get you back to creating beautiful spaces.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/">
              <Button variant="primary" size="lg" icon={Home} iconPosition="left">
                Go Home
              </Button>
            </Link>
            <button onClick={() => window.history.back()}>
              <Button variant="secondary" size="lg" icon={ArrowLeft} iconPosition="left">
                Go Back
              </Button>
            </button>
          </motion.div>
        </div>
      </section>
    </>
  );
}