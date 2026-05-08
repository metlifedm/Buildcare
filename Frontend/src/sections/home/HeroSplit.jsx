import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const sections = [
  {
    id: 1,
    title: "Our Story",
    description: "Learn about our passion for creating stylish, functional, and personalized interior spaces.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
    link: "/about/our-story",
  },
  {
    id: 2,
    title: "Our Services",
    description: "From interior design to complete renovation, we provide solutions tailored to your needs.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    link: "/services",
  },
  // {
  //   id: 3,
  //   title: "Interior Design",
  //   description: "Modern and elegant interiors designed to reflect your lifestyle and enhance comfort.",
  //   image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  //   link: "/services/interior-design",
  // },
  // {
  //   id: 4,
  //   title: "Furniture Collection",
  //   description: "Carefully selected furniture pieces that bring style, comfort, and balance to your space.",
  //   image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
  //   link: "/services/furniture",
  // },
  {
    id: 5,
    title: "Why Choose Us",
    description: "We combine creativity, quality craftsmanship, and attention to detail to deliver exceptional results.",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=1200",
    link: "/about/why-choose-us",
  },
  {
    id: 6,
    title: "Have a Query?",
    description: "Find answers to common questions about our services, process, pricing, and timelines.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200",
    link: "/faq",
  }
];

export default function HeroSplit() {
  const [activeId, setActiveId] = useState(3);

  return (
    // flex-col for Mobile (Vertical), md:flex-row for Desktop (Horizontal)
    <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden bg-black">
      {sections.map((section) => {
        const isActive = activeId === section.id;

        return (
          <div
            key={section.id}
            onMouseEnter={() => setActiveId(section.id)}
            onClick={() => setActiveId(section.id)} // Support for touch devices
            className={`relative transition-all duration-700 ease-in-out cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0 ${isActive
                ? 'flex-[5] md:flex-[4]' // Grows more on mobile to show content
                : 'flex-[1]'
              }`}
          >
            {/* Background Image - with parallax-like scaling */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${isActive ? 'scale-110' : 'scale-100'
                }`}
              style={{ backgroundImage: `url(${section.image})` }}
            />

            {/* Overlay Gradient for readability */}
            <div className={`absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'
              }`} />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">

              {/* Title - Adjusts size and alignment based on screen/state */}
              <h2 className={`text-white! font-bold transition-all duration-500 uppercase tracking-tighter ${isActive
                  ? 'text-2xl md:text-5xl mb-2 md:mb-4'
                  : 'text-lg md:text-xl opacity-70'
                }`}>
                {section.title}
              </h2>

              {/* Collapsible Info Block */}
              <div className={`transition-all duration-700 delay-100 overflow-hidden ${isActive ? 'opacity-100 max-h-[300px]' : 'opacity-0 max-h-0'
                }`}>
                <p className="text-white/70 text-sm md:text-lg max-w-md mb-6 leading-relaxed font-light">
                  {section.description}
                </p>
                <Link to={section.link}>
                  <button className="group relative px-6 py-2 md:px-8 md:py-3 overflow-hidden border border-white/50 text-white rounded-full transition-all duration-300 cursor-pointer">
                    <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest group-hover:text-black transition-colors">
                      Learn More
                    </span>
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}