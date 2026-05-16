// src/pages/About/Testimonials.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import PageHero from '@components/shared/PageHero';
import CTABanner from '@components/ui/CTABanner';
import { TestimonialsGrid } from '../../sections/about/TestimonialsGrid';

export default function Testimonials() {
  return (
    <>
      <SEOHead
        title="Testimonials | Buildcare Interior Design"
        description="Read what our happy clients say about Buildcare. Real stories, real results from our interior design projects."
        url="/about/testimonials"
      />
      <SchemaMarkup
        type="TestimonialPage"
        data={{
          name: "Client Testimonials",
          description: "What our clients say about Buildcare"
        }}
      />

      <PageHero
        title="Testimonials"
        subtitle="Client Stories"
        description="Don't just take our word for it. Here's what our amazing clients have to say about their experience with Buildcare."
        breadcrumbs={[
          { label: 'About Us', path: '/about' },
          { label: 'Testimonials' }
        ]}
        backgroundImage="https://res.cloudinary.com/doo2og4l3/image/upload/v1778921555/photo-1600607687644-c7171b42498f_usmeln.jpg"
      />
      <TestimonialsGrid />
      
      <CTABanner
        title="Ready to Write Your Story?"
        description="Join our family of satisfied clients. Book your free consultation today."
        variant="gold"
      />
    </>
  );
}