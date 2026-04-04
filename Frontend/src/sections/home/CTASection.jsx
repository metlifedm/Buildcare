// src/sections/home/CTASection.jsx
import CTABanner from '@components/ui/CTABanner';

export default function CTASection() {
  return (
    <CTABanner
      title="Let's Build Your Dream Space"
      description="Ready to transform your home or office? Send us an enquiry and our experts will get back to you within minutes on WhatsApp."
      primaryAction={{ label: 'Enquiry Now' }}
      secondaryAction={{ label: 'Call Now', link: 'tel:+91-98765-43210' }}
      variant="gold"
    />
  );
}