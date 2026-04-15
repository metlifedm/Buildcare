// src/App.jsx
import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '@components/layout/Layout';
import { useLenis } from '@hooks/useLenis';
import { EnquiryProvider } from '@hooks/useEnquiry';
import EnquiryModalWrapper from '@components/forms/EnquiryModalWrapper';

const Home = lazy(() => import('@pages/Home'));
const Process = lazy(() => import('@pages/About/Process'));
const OurStory = lazy(() => import('@pages/About/OurStory'));
const WhyChooseUs = lazy(() => import('@pages/About/WhyChooseUs'));
const Testimonials = lazy(() => import('@pages/About/Testimonials'));
const Services = lazy(() => import('@pages/Services'));
const ServiceDetail = lazy(() => import('@pages/ServiceDetail'));
const Blog = lazy(() => import('@pages/Blog'));
const BlogPost = lazy(() => import('@pages/BlogPost'));
const FAQ = lazy(() => import('@pages/FAQ'));
const Contact = lazy(() => import('@pages/Contact'));
const NotFound = lazy(() => import('@pages/NotFound'));

export default function App() {
  useLenis();

  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({
        toggleActions: 'play none none none',
      });
    };
    loadGSAP();
  }, []);

  return (
    <EnquiryProvider>
      <Layout>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about/process" element={<Process />} />
            <Route path="/about/our-story" element={<OurStory />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/about/testimonials" element={<Testimonials />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
      {/* Global Enquiry Modal */}
      <EnquiryModalWrapper />
    </EnquiryProvider>
  );
}