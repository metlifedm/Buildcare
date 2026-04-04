// src/sections/home/BrandsMarquee.jsx
import { MarqueeText } from '@components/ui/Marquee';

export default function BrandsMarquee() {
  const texts = [
    'Interior Design',
    'Architecture',
    'Modular Kitchen',
    'False Ceiling',
    'Renovation',
    'Commercial Design',
    'Luxury Homes',
    'Smart Interiors',
  ];

  return (
    <section className="py-4 bg-dark-900/50 border-y border-dark-700/20 overflow-hidden" aria-hidden="true">
      <MarqueeText texts={texts} speed={35} />
    </section>
  );
}