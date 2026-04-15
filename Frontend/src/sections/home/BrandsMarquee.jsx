// src/sections/home/BrandsMarquee.jsx
import { MarqueeText } from '@components/ui/Marquee';

export default function BrandsMarquee() {
  const texts = [
    'Interior Design',
    'Commercial Design',
    'Modular Kitchen',
    'False Ceiling',
    'Renovation',
    'Commercial Design',
    'Luxury Homes',
    'Smart Interiors',
  ];

  return (
    <section className="py-4 bg-gray-100 border-y border-gray-200 overflow-hidden" aria-hidden="true">
      <MarqueeText texts={texts} speed={35} />
    </section>
  );
}