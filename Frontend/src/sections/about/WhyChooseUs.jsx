// src/sections/about/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import {
  Shield, Clock, Gem, HeartHandshake,
  Ruler, Headphones, Recycle, TrendingUp
} from 'lucide-react';
import SectionHeading from '@components/ui/SectionHeading';
import Card from '@components/ui/Card';

const reasons = [
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'We use only ISI-certified, premium materials and brands. Every project undergoes rigorous quality checks.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: '98% of our projects are delivered on or before schedule with zero compromise on quality.',
  },
  {
    icon: Gem,
    title: 'Premium Craftsmanship',
    description: 'Our skilled artisans bring decades of experience, ensuring every detail is flawless.',
  },
  {
    icon: HeartHandshake,
    title: 'Client-Centric Approach',
    description: 'Your vision drives our design. We collaborate closely to create spaces that truly reflect you.',
  },
  {
    icon: Ruler,
    title: 'End-to-End Solutions',
    description: 'From concept to completion — design, procurement, execution, and styling all under one roof.',
  },
  {
    icon: Headphones,
    title: 'Lifetime Support',
    description: 'We stand behind our work with comprehensive warranties and ongoing maintenance support.',
  },
  {
    icon: Recycle,
    title: 'Sustainable Design',
    description: 'Eco-friendly materials and energy-efficient solutions for a greener tomorrow.',
  },
  {
    icon: TrendingUp,
    title: 'Value for Money',
    description: 'Transparent pricing with no hidden costs. Maximum value at competitive rates.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-dark-900 relative overflow-hidden" aria-label="Why choose Buildcare">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/3 rounded-full blur-3xl" />
      
      <div className="container-custom">
        <SectionHeading
          subtitle="Why Choose Us"
          title="The Buildcare Difference"
          description="We don't just design spaces — we create experiences. Here's what sets us apart from the rest."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card
                className="h-full text-center group"
                padding="lg"
                variant="gradient"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-400/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-400/20 group-hover:scale-110 transition-all duration-300">
                  <reason.icon className="w-7 h-7 text-primary-400" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark-50 mb-3 group-hover:text-primary-300 transition-colors">
                  {reason.title}
                </h3>
                <p className="text-dark-300 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}