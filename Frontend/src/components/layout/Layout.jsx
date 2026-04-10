// src/components/layout/Layout.jsx
import { Suspense } from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import FloatingWhatsApp from '@components/ui/FloatingWhatsApp';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.4,
};

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 rounded-xl bg-primary-600 flex items-center justify-center mx-auto mb-4"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="font-heading text-2xl font-bold text-white">B</span>
        </motion.div>
        <p className="text-gray-500 text-sm font-accent tracking-wider">Loading...</p>
      </div>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1" role="main">
        <Suspense fallback={<PageLoader />}>
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {children}
          </motion.div>
        </Suspense>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}