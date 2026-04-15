import React from "react";
import { FiClock } from "react-icons/fi";
import {
  Shield,
  Clock,
  Gem,
  HeartHandshake,
  Headphones,
} from "lucide-react";

const featuresLeft = [
  {
    icon: <Shield size={22} />,
    title: "Quality Assurance",
    desc: "We use only ISI-certified, premium materials and brands. Every project undergoes rigorous quality checks.",
  },
  {
    icon: <Clock size={22} />,
    title: "On-Time Delivery",
    desc: "98% of our projects are delivered on or before schedule with zero compromise on quality.",
  },
  {
    icon: <Gem size={22} />,
    title: "Premium Craftsmanship",
    desc: "Our skilled artisans bring decades of experience, ensuring every detail is flawless.",
  },
];

const featuresRight = [
  {
    icon: <HeartHandshake size={22} />,
    title: "Client-Centric Approach",
    desc: "Your vision drives our design. We collaborate closely to create spaces that truly reflect you.",
  },
  {
    icon: <FiClock size={22} />,
    title: "End-to-End Solutions",
    desc: "From concept to completion — design, procurement, execution, and styling all under one roof.",
  },
  {
    icon: <Headphones size={22} />,
    title: "Lifetime Support",
    desc: "We stand behind our work with comprehensive warranties and ongoing maintenance support.",
  },
];

const FeatureCard = ({ icon, title, desc, align = "left" }) => {
  return (
    <div
      className={`flex flex-col ${
        align === "right"
          ? "items-start lg:items-end text-left lg:text-right"
          : "items-start"
      } justify-center h-full p-6 border-b border-dark-200`}
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full border border-dark-200 mb-4 text-primary-500 bg-white/60 backdrop-blur-sm">
        {icon}
      </div>

      <h3 className="text-lg font-semibold text-dark-900 mb-2">
        {title}
      </h3>

      <p className="text-dark-500 text-sm leading-relaxed max-w-xs">
        {desc}
      </p>
    </div>
  );
};

const WhyChooseUs = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      
      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/doo2og4l3/image/upload/v1776248596/why-choose-us-bg_ygvxfv.png')",
        }}
      />

      {/* 🔥 White Overlay */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        
        {/* MOBILE VIEW */}
        <div className="lg:hidden flex flex-col gap-6">
          {[...featuresLeft, ...featuresRight].map((item, i) => (
            <FeatureCard key={i} {...item} />
          ))}

          <div className="mt-6">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
              alt="interior"
              className="w-full h-[400px] object-cover rounded-[150px]"
            />
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden lg:grid grid-cols-3 gap-0 items-center">
          
          {/* LEFT */}
          <div className="border-r border-dark-200 divide-y divide-dark-200 bg-white/60 backdrop-blur-sm">
            {featuresLeft.map((item, i) => (
              <FeatureCard key={i} {...item} />
            ))}
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center items-center px-6">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e"
              alt="interior"
              className="w-full max-w-[380px] h-[600px] object-cover rounded-[200px] shadow-lg"
            />
          </div>

          {/* RIGHT */}
          <div className="border-l border-dark-200 divide-y divide-dark-200 bg-white/60 backdrop-blur-sm">
            {featuresRight.map((item, i) => (
              <FeatureCard key={i} {...item} align="right" />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;