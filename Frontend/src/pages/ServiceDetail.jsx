// src/pages/ServiceDetail.jsx
import { useMemo, useRef, useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import {
  CheckCircle, ArrowRight, ArrowLeft, Send,
  Clock, IndianRupee, Phone, MessageCircle,
  Star, Shield, Sparkles, Layers
} from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';
import Button from '@components/ui/Button';
import CTABanner from '@components/ui/CTABanner';
import { useEnquiry } from '@hooks/useEnquiry';
import servicesData from '@data/services.json';
import { COMPANY } from '@utils/constants';
import { cn } from '../utils/helpers';

const iconMap = {
  home: 'Home', building: 'Building2', grid3x3: 'Grid3X3',
  layers: 'Layers', chefHat: 'ChefHat', paintbrush: 'Paintbrush',
  wrench: 'Wrench', doorOpen: 'DoorOpen', zap: 'Zap',
};

// Extended service data for individual pages
const serviceExtendedData = {
  'residential-interior': {
    heroImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Consultation', desc: 'We visit your home, understand your lifestyle, preferences, and budget.' },
      { step: '02', title: '3D Design', desc: 'Our designers create detailed 3D renderings and floor plans for your approval.' },
      { step: '03', title: 'Material Selection', desc: 'Choose from our curated collection of premium materials, colors, and finishes.' },
      { step: '04', title: 'Execution', desc: 'Our skilled craftsmen execute the design with precision and quality.' },
      { step: '05', title: 'Quality Check', desc: 'Rigorous inspection of every detail before the grand reveal.' },
      { step: '06', title: 'Handover', desc: 'Final walkthrough, documentation, and joyful handover of your dream home.' },
    ],
    benefits: [
      'Completely personalized designs reflecting your taste',
      'Premium branded materials with warranty',
      'Dedicated project manager assigned',
      'Regular progress updates with photos',
      'On-time completion guarantee',
      'Post-project maintenance support',
      '3D visualization before execution',
      'Budget-friendly options available',
    ],
    faqs: [
      { q: 'How much does residential interior design cost?', a: 'Our residential packages start from ₹8 lakhs for a 2BHK. The final cost depends on the scope, materials, and customization level. We offer packages for every budget.' },
      { q: 'Do you provide 3D designs before execution?', a: 'Yes! We provide detailed 3D renderings and virtual walkthroughs so you can visualize the final result before we begin execution.' },
      { q: 'What is the timeline for a complete home interior?', a: 'A typical 2-3 BHK takes 45-60 days. Larger homes may take 60-90 days. We provide a detailed timeline during planning.' },
      { q: 'Can I choose my own materials?', a: 'Absolutely! While we recommend premium materials, you\'re free to choose any material. We can also source specific materials on request.' },
    ],
  },
  'commercial-interior': {
    heroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80',
      'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Brand Analysis', desc: 'Understanding your brand, business goals, and spatial requirements.' },
      { step: '02', title: 'Space Planning', desc: 'Optimizing layout for workflow, customer experience, and efficiency.' },
      { step: '03', title: 'Design Development', desc: 'Creating detailed designs with brand integration and compliance.' },
      { step: '04', title: 'Execution', desc: 'Professional execution with minimal disruption to your business.' },
    ],
    benefits: ['Brand-aligned design', 'Ergonomic workspace planning', 'Compliance with safety standards', 'Minimal business disruption', 'Energy-efficient solutions', 'Scalable designs'],
    faqs: [
      { q: 'Do you work on weekends to minimize disruption?', a: 'Yes, we can schedule work during off-hours and weekends to ensure your business operations continue smoothly.' },
      { q: 'What types of commercial spaces do you design?', a: 'We design offices, retail stores, restaurants, hotels, hospitals, showrooms, co-working spaces, and more.' },
    ],
  },
  'tile-flooring-works': {
    heroImage: 'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Site Assessment', desc: 'Evaluating existing flooring and subfloor conditions.' },
      { step: '02', title: 'Material Selection', desc: 'Choosing the right tile type, pattern, and finish for your space.' },
      { step: '03', title: 'Surface Preparation', desc: 'Proper leveling and waterproofing of the subfloor.' },
      { step: '04', title: 'Installation', desc: 'Precision installation with proper grouting and finishing.' },
    ],
    benefits: ['Wide variety of premium tiles', 'Expert precision installation', 'Waterproof solutions', 'Pattern and design consultation', 'Long-lasting quality', 'Easy maintenance options'],
    faqs: [
      { q: 'What tile brands do you work with?', a: 'We work with premium brands like Kajaria, Somany, Johnson, AGL, and also source Italian and Spanish imported tiles.' },
      { q: 'Do you handle removal of existing flooring?', a: 'Yes, we handle complete demolition, removal, disposal, and new installation as a turnkey solution.' },
    ],
  },
  'gypsum-pvc-false-ceiling': {
    heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Design Selection', desc: 'Choose from our catalog or get a custom ceiling design.' },
      { step: '02', title: 'Framework', desc: 'Installing sturdy metal framework with precise measurements.' },
      { step: '03', title: 'Panel Installation', desc: 'Fitting gypsum/PVC panels with lighting cutouts.' },
      { step: '04', title: 'Finishing', desc: 'Seamless joints, painting, and lighting installation.' },
    ],
    benefits: ['Custom design options', 'Integrated lighting solutions', 'Acoustic insulation', 'Fire-resistant materials', 'Quick installation', 'Low maintenance'],
    faqs: [
      { q: 'Which is better - Gypsum or PVC?', a: 'Gypsum offers a smoother finish and is ideal for living rooms. PVC is waterproof and better for kitchens and bathrooms.' },
      { q: 'Can false ceiling hide AC ducts?', a: 'Yes, false ceilings are perfect for concealing AC ducts, wiring, and plumbing while maintaining a clean look.' },
    ],
  },
  'modular-kitchen': {
    heroImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Kitchen Measurement', desc: 'Precise measurements of your kitchen space.' },
      { step: '02', title: 'Layout Design', desc: 'Designing the optimal layout with 3D visualization.' },
      { step: '03', title: 'Manufacturing', desc: 'Factory-precision manufacturing of all components.' },
      { step: '04', title: 'Installation', desc: 'On-site assembly with appliance integration.' },
    ],
    benefits: ['Factory-precision manufacturing', 'Soft-close mechanisms', 'Optimized storage solutions', 'Premium countertop options', 'Built-in appliance integration', '10-year structural warranty'],
    faqs: [
      { q: 'What countertop material is best?', a: 'Quartz offers the best balance of durability, aesthetics, and maintenance. Granite is a natural option, while Corian allows seamless joints.' },
      { q: 'How long does kitchen installation take?', a: 'Manufacturing takes 15-20 days, and on-site installation takes 5-7 days for a standard kitchen.' },
    ],
  },
  'painting-works': {
    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Surface Inspection', desc: 'Evaluating wall conditions and repairs needed.' },
      { step: '02', title: 'Color Consultation', desc: 'Expert color matching and theme selection.' },
      { step: '03', title: 'Preparation', desc: 'Wall prep, putty, primer, and masking.' },
      { step: '04', title: 'Painting', desc: 'Multi-coat premium paint application.' },
    ],
    benefits: ['Premium branded paints only', 'Expert color consultation', 'Texture and designer finishes', 'Clean professional work', 'No paint smell guarantee', 'Touch-up support'],
    faqs: [
      { q: 'Which paint brands do you use?', a: 'We exclusively use Asian Paints, Berger, Nerolac, and Dulux premium ranges for lasting quality.' },
      { q: 'How many coats do you apply?', a: 'We apply 1 coat of primer + 2-3 coats of paint for optimal coverage and durability.' },
    ],
  },
  'fabrication-works': {
    heroImage: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Design & Drawing', desc: 'Technical drawings with measurements.' },
      { step: '02', title: 'Material Sourcing', desc: 'Premium grade MS/SS materials.' },
      { step: '03', title: 'Fabrication', desc: 'Precision cutting, welding, and assembly.' },
      { step: '04', title: 'Installation', desc: 'On-site fitting and finishing.' },
    ],
    benefits: ['Custom designs to specification', 'Premium MS & SS materials', 'Powder-coated finishes', 'Structural engineering support', 'Corrosion-resistant treatments', 'On-site welding capabilities'],
    faqs: [
      { q: 'Do you provide custom gate designs?', a: 'Yes, we design and fabricate custom gates in MS, SS, and wrought iron with any design you envision.' },
      { q: 'What is the warranty on fabrication work?', a: 'We provide a 5-year warranty on structural integrity and 2 years on powder coating.' },
    ],
  },
  'aluminum-sliding-doors-glass-partitions': {
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Site Survey', desc: 'Precise measurements and structural assessment.' },
      { step: '02', title: 'Profile Selection', desc: 'Choose aluminum profile type and glass specification.' },
      { step: '03', title: 'Manufacturing', desc: 'Factory fabrication to exact specifications.' },
      { step: '04', title: 'Installation', desc: 'Professional fitting with weatherproofing.' },
    ],
    benefits: ['Toughened safety glass', 'Premium aluminum profiles', 'Sound insulation', 'Weather-sealed', 'Smooth sliding mechanism', 'Customizable finishes'],
    faqs: [
      { q: 'What type of glass do you use?', a: 'We use 10-12mm toughened glass for safety. Laminated and double-glazed options are also available.' },
      { q: 'Are sliding doors energy efficient?', a: 'Yes, our aluminum sliding doors with thermal break profiles offer excellent insulation and energy efficiency.' },
    ],
  },
  'plumbing-electrical-work': {
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1920&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80',
    ],
    process: [
      { step: '01', title: 'Planning', desc: 'Complete layout planning for plumbing and electrical points.' },
      { step: '02', title: 'Rough Work', desc: 'Channel cutting, pipe laying, and wiring installation.' },
      { step: '03', title: 'Fitting', desc: 'Installing fixtures, switches, and sanitary ware.' },
      { step: '04', title: 'Testing', desc: 'Pressure testing, continuity testing, and safety checks.' },
    ],
    benefits: ['ISI-certified materials', 'Licensed electricians', 'Safety compliance', 'Modern MCB/RCCB panels', 'Concealed wiring', 'Water pressure optimization'],
    faqs: [
      { q: 'Do you provide ISI-certified materials?', a: 'Yes, all our plumbing pipes (CPVC/PPR) and electrical wires (Havells/Polycab) are ISI certified.' },
      { q: 'Do you handle complete bathroom renovation?', a: 'Yes, we provide end-to-end bathroom renovation including demolition, waterproofing, plumbing, tiling, and fixture installation.' },
    ],
  },
};

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <motion.div
      className={cn(
        'bg-white border rounded-xl overflow-hidden transition-all duration-300',
        isOpen && 'border-primary-300 shadow-md'
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className={cn(
          'font-heading font-semibold text-lg pr-4 transition-colors',
          isOpen ? 'text-primary-700' : 'text-gray-900 group-hover:text-primary-700'
        )}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          className={cn('flex-shrink-0 text-2xl font-light', isOpen ? 'text-primary-600' : 'text-gray-400')}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { openEnquiry } = useEnquiry();
  const sectionRef = useRef(null);

  const service = useMemo(
    () => servicesData.services.find((s) => s.slug === slug),
    [slug]
  );

  const extended = useMemo(
    () => serviceExtendedData[service?.id] || {},
    [service]
  );

  const allServices = servicesData.services;
  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;
  const relatedServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  // GSAP parallax on hero
  useEffect(() => {
    const loadGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const hero = sectionRef.current;
      if (hero) {
        gsap.to(hero.querySelector('.parallax-img'), {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    };
    loadGSAP();
  }, [slug]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const iconName = iconMap[service.icon] || 'Sparkles';
  const Icon = LucideIcons[iconName] || LucideIcons.Sparkles;

  return (
    <>
      <SEOHead
        title={`${service.title} Services - ${COMPANY.name} | Premium Solutions`}
        description={service.description}
        url={`/services/${service.slug}`}
        image={service.image}
      />
      <SchemaMarkup type="Service" data={service} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Services', path: '/services' },
            { name: service.title, path: `/services/${service.slug}` },
          ],
        }}
      />

      {/* Hero Section with Parallax */}
      <section ref={sectionRef} className="relative flex items-end overflow-hidden bg-dark-100 py-20">
        <div className="absolute inset-0">
          <img
            src={extended.heroImage || service.image}
            alt={`${service.title} - premium interior design service by ${COMPANY.name}`}
            className="parallax-img w-full h-[120%] object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-dark-800/50" />

        <div className="container-custom relative z-10 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/" className="text-gray-50 hover:text-primary-400 transition-colors">Home</Link>
            <span className="text-gray-50">/</span>
            <Link to="/services" className="text-gray-50 hover:text-primary-400 transition-colors">Services</Link>
            <span className="text-gray-50">/</span>
            <span className="text-dark-300">{service.title}</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-500 backdrop-blur-sm flex items-center justify-center border border-primary-500/20">
                <Icon className="w-8 h-8 text-dark-100" />
              </div>
              <div>
                <span className="text-dark-100 text-sm font-accent tracking-wider uppercase bg-primary-500 py-1 px-3 rounded-lg">Service</span>
                <h1 className="font-heading text-3xl md:text-5xl font-bold text-white!">{service.title}</h1>
              </div>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl mt-4">{service.shortDescription}</p>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <Button
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="left"
                onClick={() => openEnquiry(service.title)}
              >
                Consultation for {service.title}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1.3fr_0.7fr] gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                About This Service
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {service.description}
              </p>

              {/* Features Grid */}
              <h3 className="font-heading text-xl font-semibold text-gray-900 mb-4">What's Included</h3>
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {service.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:border-primary-200 hover:bg-gray-100 transition-all border border-gray-100"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card padding="lg" className="bg-gray-50 border-gray-200 sticky top-24">
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary-600" />
                  Quick Enquiry
                </h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <IndianRupee className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">Starting from</span>
                    <span className="text-gray-900 font-semibold ml-auto">{service.priceRange}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">Timeline</span>
                    <span className="text-gray-900 font-semibold ml-auto">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Shield className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">Warranty</span>
                    <span className="text-gray-900 font-semibold ml-auto">Up to 10 Years</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Star className="w-4 h-4 text-primary-600" />
                    <span className="text-gray-600">Rating</span>
                    <span className="text-gray-900 font-semibold ml-auto">4.9/5 ⭐</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  className="w-full mb-3"
                  icon={Send}
                  iconPosition="left"
                  onClick={() => openEnquiry(service.title)}
                >
                  Send Enquiry
                </Button>
                <a href={`tel:${COMPANY.phone}`}>
                  <Button variant="secondary" className="w-full mb-3" icon={Phone} iconPosition="left">
                    Call Us
                  </Button>
                </a>
                <Button
                  variant="whatsapp"
                  className="w-full"
                  icon={MessageCircle}
                  iconPosition="left"
                  onClick={() => {
                    const msg = `Hi! I'm interested in your *${service.title}* service. Please share details and pricing.`;
                    window.open(`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
                  }}
                >
                  WhatsApp Us
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {extended.gallery && (
        <section className="py-20 bg-gray-50" aria-label="Service gallery">
          <div className="container-custom">
            <SectionHeading
              subtitle="Gallery"
              title={`${service.title} Projects`}
              description="See our recent work and get inspired for your project."
            />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {extended.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl overflow-hidden group cursor-pointer shadow-sm"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={img}
                    alt={`${service.title} project example ${i + 1}`}
                    className={`w-full ${i % 2 === 0 ? 'h-64' : 'h-80'} object-cover group-hover:scale-110 transition-transform duration-700`}
                    loading="lazy"
                    onLoad={(e) => e.target.classList.add('loaded')}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {extended.process && (
        <section className="py-20 bg-white" aria-label="Our process">
          <div className="container-custom">
            <SectionHeading
              subtitle="Our Process"
              title={`How We Deliver ${service.title}`}
              description="A structured approach to ensure quality and satisfaction at every step."
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {extended.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Card className="h-full relative overflow-hidden group" padding="lg">
                    <span className="absolute top-3 right-4 text-6xl font-heading font-bold text-primary-100 group-hover:text-primary-200 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center mb-4">
                      <span className="text-primary-700 font-bold font-heading">{step.step}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {extended.benefits && (
        <section className="py-20 bg-gray-50" aria-label="Benefits">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  subtitle="Benefits"
                  title={`Why Choose Our ${service.title} Service`}
                  align="left"
                />
                <div className="space-y-3">
                  {extended.benefits.map((b, i) => (
                    <motion.div
                      key={b}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{b}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <motion.div
                className="rounded-2xl overflow-hidden shadow-lg"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={service.image}
                  alt={`${service.title} benefits showcase`}
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  onLoad={(e) => e.target.classList.add('loaded')}
                />
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {extended.faqs && extended.faqs.length > 0 && (
        <section className="py-20 bg-white" aria-label="FAQs">
          <div className="container-custom max-w-4xl">
            <SectionHeading
              subtitle="FAQ"
              title={`${service.title} — Common Questions`}
            />
            <div className="space-y-4">
              {extended.faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Services */}
      <section className="py-20 bg-gray-50" aria-label="Related services">
        <div className="container-custom">
          <SectionHeading
            subtitle="Explore More"
            title="Other Services You May Like"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((rs, i) => {
              const rsIcon = iconMap[rs.icon] || 'Sparkles';
              const RsIcon = LucideIcons[rsIcon] || LucideIcons.Sparkles;
              return (
                <motion.div
                  key={rs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link to={`/services/${rs.slug}`}>
                    <Card className="h-full group overflow-hidden" padding="none">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img src={rs.image} alt={rs.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          loading="lazy" onLoad={(e) => e.target.classList.add('loaded')} />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary-500 flex items-center justify-center">
                            <RsIcon className="w-5 h-5 text-dark-50" />
                          </div>
                          <h3 className="font-heading text-lg font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                            {rs.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">{rs.shortDescription}</p>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {prevService ? (
              <Link to={`/services/${prevService.slug}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <span className="text-xs text-gray-500 block">Previous Service</span>
                  <span className="font-medium">{prevService.title}</span>
                </div>
              </Link>
            ) : <div />}
            {nextService ? (
              <Link to={`/services/${nextService.slug}`}
                className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors group text-right">
                <div>
                  <span className="text-xs text-gray-500 block">Next Service</span>
                  <span className="font-medium">{nextService.title}</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            ) : <div />}
          </div>
        </div>
      </section>

      <CTABanner
        title={`Need ${service.title}?`}
        description={`Get a free consultation for your ${service.title.toLowerCase()} project. Our experts are ready to help!`}
        primaryAction={{ label: 'Send Enquiry', link: '/contact' }}
        variant="default"
      />
    </>
  );
}