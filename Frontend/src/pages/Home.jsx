// src/pages/Home.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import HeroSection from '@sections/home/HeroSection';
import ServicesPreview from '@sections/home/ServicesPreview';
import AboutPreview from '@sections/home/AboutPreview';
import PortfolioPreview from '@sections/home/PortfolioPreview';
import TestimonialsSection from '@sections/home/TestimonialsSection';
import StatsSection from '@sections/home/StatsSection';
import CTASection from '@sections/home/CTASection';
import BrandsMarquee from '@sections/home/BrandsMarquee';
import ParallaxCTA from '@sections/home/ParallaxCTA';
import AgitationSection from '@sections/home/AgitationSection';
import HomeEstimate from '@sections/home/HomeEstimate';

export default function Home() {
  return (
    <>
      <SEOHead
        title={pageSEO.home.title}
        description={pageSEO.home.description}
        url={pageSEO.home.path}
      />
      <SchemaMarkup type="LocalBusiness" />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{ items: [{ name: 'Home', path: '/' }] }}
      />

      <HeroSection />
      <BrandsMarquee />
      <AgitationSection />
      <AboutPreview />
      <ServicesPreview />
      {/* <ParallaxCTA /> */}
      <PortfolioPreview />
      <HomeEstimate />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
    </>
  );
}