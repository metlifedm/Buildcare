// src/pages/About/WhyChooseUs.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import PageHero from '@components/shared/PageHero';
import WhyChooseUsSection from '@sections/about/WhyChooseUs';
import StatsSection from '@sections/home/StatsSection';
import CTABanner from '@components/ui/CTABanner';

export default function WhyChooseUs() {
  return (
    <>
      <SEOHead
        title="Why Choose Us | Buildcare Interior Design"
        description="Discover why Buildcare is the trusted choice for interior design. Expert team, transparent process, and guaranteed quality."
        url="/about/why-choose-us"
      />
      <SchemaMarkup
        type="WhyChooseUs"
        data={{
          name: "Buildcare Interior Design",
          features: ["Expert Team", "Transparent Process", "Quality Guarantee"]
        }}
      />

      <PageHero
        title="Why Choose Us"
        subtitle="Excellence in Every Detail"
        description="Discover what makes Buildcare the trusted choice for interior design. Our commitment to quality, transparency, and customer satisfaction sets us apart."
        breadcrumbs={[
          { label: 'About Us', path: '/about' },
          { label: 'Why Choose Us' }
        ]}
        backgroundImage="https://res.cloudinary.com/doo2og4l3/image/upload/v1778921644/musemind-ux-agency-srTPWPbK0Dg-unsplash_ujqecm.jpg"
      />

      <WhyChooseUsSection />
      <StatsSection />
      
      <CTABanner
        title="Experience the Buildcare Difference"
        description="Join hundreds of satisfied clients who trusted us with their dream spaces."
        variant="gold"
      />
    </>
  );
}