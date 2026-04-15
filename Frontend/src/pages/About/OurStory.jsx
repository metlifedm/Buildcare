// src/pages/About/OurStory.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import PageHero from '@components/shared/PageHero';
import OurStorySection from '@sections/about/OurStory';
import CTABanner from '@components/ui/CTABanner';
import WhoWeAre from '../../sections/about/WhoWeAre';

export default function OurStory() {
  return (
    <>
      <SEOHead
        title="Our Story | Buildcare Interior Design"
        description="Discover the story behind Buildcare - passionate architects, designers, and craftsmen dedicated to creating extraordinary interior spaces."
        url="/about/our-story"
      />
      <SchemaMarkup
        type="AboutPage"
        data={{
          name: "Buildcare Interior Design",
          description: "Passionate team of architects and designers",
          foundingDate: "2015"
        }}
      />

      <PageHero
        title="Our Story"
        subtitle="Who We Are"
        description="We are a passionate team of interior designers, architect craftmen, engineers, civil engineers and structure engineers dedicated to creating extraordinary interior spaces that inspire and transform lives."
        breadcrumbs={[
          { label: 'About Us', path: '/about' },
          { label: 'Our Story' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />

      <WhoWeAre />

      <OurStorySection />
      
      <CTABanner
        title="Ready to Start Your Project?"
        description="Book a free consultation and let our experts help you design your dream space."
        variant="gold"
      />
    </>
  );
}