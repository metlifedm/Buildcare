import React, { useState } from 'react';

const sections = [
  {
    id: 1,
    title: "Architectural Project",
    description: "Innovative structural designs blending form and function for modern living.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Creator’s Support",
    description: "Dedicated spaces designed to fuel creativity and professional workflows.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Interior Design",
    description: "Leather detail shoulder contrast color contour stunning silhouette working peplum.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 4,
    title: "Complete set of furniture",
    description: "Hand-picked collections that bring harmony and comfort to every room.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1200",
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
            className={`relative transition-all duration-700 ease-in-out cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10 last:border-0 ${
              isActive 
                ? 'flex-[5] md:flex-[4]' // Grows more on mobile to show content
                : 'flex-[1]'
            }`}
          >
            {/* Background Image - with parallax-like scaling */}
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${section.image})` }}
            />
            
            {/* Overlay Gradient for readability */}
            <div className={`absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
              isActive ? 'opacity-100' : 'opacity-40'
            }`} />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
              
              {/* Title - Adjusts size and alignment based on screen/state */}
              <h2 className={`text-white! font-bold transition-all duration-500 uppercase tracking-tighter ${
                isActive 
                  ? 'text-2xl md:text-5xl mb-2 md:mb-4' 
                  : 'text-lg md:text-xl opacity-70'
              }`}>
                {section.title}
              </h2>

              {/* Collapsible Info Block */}
              <div className={`transition-all duration-700 delay-100 overflow-hidden ${
                isActive ? 'opacity-100 max-h-[300px]' : 'opacity-0 max-h-0'
              }`}>
                <p className="text-white/70 text-sm md:text-lg max-w-md mb-6 leading-relaxed font-light">
                  {section.description}
                </p>
                <button className="group relative px-6 py-2 md:px-8 md:py-3 overflow-hidden border border-white/50 text-white rounded-full transition-all duration-300">
                  <span className="relative z-10 text-xs md:text-sm uppercase tracking-widest group-hover:text-black transition-colors">
                    Learn More
                  </span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}