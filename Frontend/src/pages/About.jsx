// src/pages/About.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import OurStory from '@sections/about/OurStory';
import WhyChooseUs from '@sections/about/WhyChooseUs';
import TeamSection from '@sections/about/TeamSection';
import StatsSection from '@sections/home/StatsSection';
import CTABanner from '@components/ui/CTABanner';

export default function About() {
  return (
    <>
      <SEOHead
        title={pageSEO.about.title}
        description={pageSEO.about.description}
        url={pageSEO.about.path}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'About Us', path: '/about' },
          ],
        }}
      />

      <PageHero
        title="About Buildcare"
        subtitle="Who We Are"
        description="We are a passionate team of architects, designers, and craftsmen dedicated to creating extraordinary interior spaces that inspire and transform lives."
        breadcrumbs={[{ label: 'About Us' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />

      <OurStory />
      <WhyChooseUs />
      <StatsSection />
      <TeamSection />
      
      <CTABanner
        title="Ready to Start Your Project?"
        description="Book a free consultation and let our experts help you design your dream space."
        variant="gold"
      />
    </>
  );
}