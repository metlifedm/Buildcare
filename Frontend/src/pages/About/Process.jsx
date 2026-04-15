// src/pages/Process.jsx
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import WhyProcessMatters from '@sections/process/WhyProcessMatters';
import VisualTimeline from '@sections/process/VisualTimeline';
import CommunicationFAQ from '@sections/process/CommunicationFAQ';
import CTABanner from '@components/ui/CTABanner';
import PageHero from '../../components/shared/PageHero';

export default function Process() {
  return (
    <>
      <SEOHead
        title="Our Interior Design Process | Step-by-Step Guide"
        description="A clear, transparent 5-step interior design process from consultation to handover. No surprises, no delays. Get your free consultation today."
        url="/process"
        keywords="interior design process, home renovation steps, design consultation, execution timeline"
      />
      <SchemaMarkup
        type="HowTo"
        data={{
          name: "5-Step Interior Design Process",
          description: "From consultation to handover - a structured approach to interior design",
          totalTime: "P90D",
          step: [
            { text: "Consultation", position: 1 },
            { text: "Design", position: 2 },
            { text: "Material Selection", position: 3 },
            { text: "Execution", position: 4 },
            { text: "Handover", position: 5 }
          ]
        }}
      />

      <PageHero
        title="A Clear, Step-by-Step Interior Process You Can Trust"
        subtitle="How Its Works"
        description="From planning to execution, every stage is structured so you stay in control. No surprises, no hidden costs—just exceptional results."
        breadcrumbs={[
          { label: 'About Us', path: '/about' },
          { label: 'How Its Works' }
        ]}
        backgroundImage="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
      />
      <WhyProcessMatters />
      <VisualTimeline />
      <CommunicationFAQ />
      
      <CTABanner
        title="Ready to Transform Your Space?"
        description="Book a free consultation and experience our seamless process firsthand."
        variant="gold"
        primaryCTA={{ text: "📞 Get Free Consultation", link: "/contact" }}
        secondaryCTA={{ text: "💬 WhatsApp Now", link: "https://wa.me/" }}
      />
    </>
  );
}