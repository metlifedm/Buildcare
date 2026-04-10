// src/sections/home/ParallaxCTA.jsx
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ParallaxSection from '@components/ui/ParallaxSection';
import Button from '@components/ui/Button';
import RevealAnimation from '@components/ui/RevealAnimation';
import { AnimatedHeading } from '@components/ui/AnimatedText';
import Image from '../../assets/images/agitation1.jpg';

export default function ParallaxCTA() {
  return (
    <ParallaxSection
      image={Image}
      imageAlt="Luxury interior design by Buildcare"
      speed={0.4}
      overlayOpacity={0.6}
      className="py-32 md:py-40"
    >
      <div className="container-custom text-center">
        <RevealAnimation animation="blurIn">
          <span className="inline-block text-primary-400 font-accent text-sm tracking-[0.3em] uppercase mb-6">
            — Transform Your Space —
          </span>
        </RevealAnimation>

        <AnimatedHeading
          text="Where Vision Meets Craftsmanship"
          className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white justify-center mb-8"
          delay={0.2}
        />

        <RevealAnimation animation="fadeUp" delay={0.5}>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Every space has a story waiting to be told. Let our award-winning team help you
            write yours with exquisite design and flawless execution.
          </p>
        </RevealAnimation>

        <RevealAnimation animation="fadeUp" delay={0.7}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact">
              <Button variant="primary" size="lg" icon={ArrowRight}>
                Start Your Project
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="secondary" size="lg">
                Explore Our Work
              </Button>
            </Link>
          </div>
        </RevealAnimation>
      </div>
    </ParallaxSection>
  );
}