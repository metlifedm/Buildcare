// src/components/sections/AgitationSection.jsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@utils/helpers";
import { useEnquiry } from "../../hooks/useEnquiry";
import { DollarSign, Calendar, Brush, Construction, AlertCircle, XCircle, TrendingUp } from "lucide-react";

import Agitation1 from "../../assets/images/agitation1.jpg";
import Agitation2 from "../../assets/images/agitation1.jpg";
import Agitation3 from "../../assets/images/agitation1.jpg";
import Agitation4 from "../../assets/images/agitation1.jpg";

const painPoints = [
  {
    id: 1,
    icon: DollarSign,
    title: "Budget keeps increasing without reason",
    description: "Hidden costs and unexpected expenses blow your budget without clear justification",
    details: [
      "Hidden charges appear mid-project",
      "Unexpected material costs",
      "No transparent pricing",
      "Contractors overcharge"
    ],
    stat: "+73%",
    statLabel: "average overrun",
    image: "https://res.cloudinary.com/doo2og4l3/image/upload/v1776264039/photo-1554224155-8d04cb21cd6c_huc4lb.jpg",
    color: "from-primary-500/20 to-primary-600/20",
    iconColor: "text-primary-500",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Endless delays & missed timelines",
    description: "Projects drag on for months with missed deadlines and broken promises",
    details: [
      "Missed project deadlines",
      "Delayed material delivery",
      "Inefficient scheduling",
      "Poor project management"
    ],
    stat: "+68%",
    statLabel: "face delays >2 months",
    image: "https://res.cloudinary.com/doo2og4l3/image/upload/v1776264066/photo-1506784983877-45594efa4cbe_tjh28p.jpg",
    color: "from-primary-400/20 to-primary-500/20",
    iconColor: "text-primary-400",
  },
  {
    id: 3,
    icon: Brush,
    title: "Design doesn't match what you imagined",
    description: "Final result looks nothing like the beautiful renders you were shown",
    details: [
      "Reality vs expectations gap",
      "Poor color matching",
      "Quality variations",
      "Aesthetic disappointment"
    ],
    stat: "82%",
    statLabel: "unsatisfied with result",
    image: "https://res.cloudinary.com/doo2og4l3/image/upload/v1776264090/pexels-photo-1571460_seirvx.jpg",
    color: "from-primary-300/20 to-primary-400/20",
    iconColor: "text-primary-300",
  },
  {
    id: 4,
    icon: Construction,
    title: "Fixing mistakes becomes expensive after work starts",
    description: "Mistakes caught late become costly reworks that blow your timeline",
    details: [
      "Late issue discovery",
      "Costly corrections needed",
      "Additional timeline extensions",
      "Wasted resources and time"
    ],
    stat: "3.2x",
    statLabel: "higher cost for fixes",
    image: "https://res.cloudinary.com/doo2og4l3/image/upload/v1776264122/photo-1503387762-592deb58ef4e_bbz9jn.jpg",
    color: "from-primary-600/20 to-primary-700/20",
    iconColor: "text-primary-600",
  },
];

export default function AgitationSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { openEnquiry } = useEnquiry();
  const active = painPoints[activeIndex];
  const ActiveIcon = active.icon;

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" aria-label="Problems We Solve">
      
      {/* Background Image with White Opacity Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/doo2og4l3/image/upload/v1776259593/photo-1581091226033-d5c48150dbaa_m5gnjo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* White Opacity Overlay - using white with 90% opacity */}
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER with enhanced styling */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/10 rounded-full mb-6"
            >
              <AlertCircle className="w-4 h-4 text-primary-500" />
              <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">The Reality Check</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark-900"
            >
              Meet The{" "}
              <span className="text-primary-500">
                Real Problems
              </span>
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-dark-600 text-lg leading-relaxed"
          >
            A collective of real challenges homeowners face during interior
            projects — from budget issues to execution failures. Discover what's
            holding your dream space back.
          </motion.p>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* LEFT SIDE - Problem Tabs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {painPoints.map((item, index) => {
              const isActive = index === activeIndex;
              const ItemIcon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden",
                    isActive
                      ? "bg-white border-l-4 border-l-primary-500 shadow-lg"
                      : "bg-dark-50 border border-dark-200 hover:bg-white"
                  )}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {/* HEADER */}
                  <div className="flex items-start gap-4 p-5">
                    
                    {/* ICON with animation */}
                    <motion.div
                      animate={isActive ? { rotate: [0, 360] } : {}}
                      transition={{ duration: 0.5 }}
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                        isActive ? "bg-primary-50" : "bg-dark-100"
                      )}
                    >
                      <ItemIcon className={cn("w-5 h-5", item.iconColor)} />
                    </motion.div>

                    {/* NUMBER & TITLE */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className={cn(
                          "text-xs font-mono font-semibold",
                          isActive ? "text-primary-500" : "text-dark-400"
                        )}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className={cn(
                          "font-semibold transition-colors duration-300 text-sm sm:text-base",
                          isActive ? "text-dark-900" : "text-dark-600"
                        )}>
                          {item.title}
                        </h3>
                      </div>

                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-primary-500 mt-1"
                        >
                          Active Issue
                        </motion.p>
                      )}
                    </div>

                    {/* STAT MINI BADGE */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary-500">{item.stat}</div>
                      <div className="text-[10px] text-dark-400">{item.statLabel}</div>
                    </div>
                  </div>

                  {/* EXPANDED CONTENT with DETAILS */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="px-5 pb-5"
                      >
                        <p className="text-sm text-dark-600 leading-relaxed mb-4">
                          {item.description}
                        </p>
                        
                        {/* DETAILS LIST */}
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-dark-500 uppercase tracking-wider">Common Issues:</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {item.details.map((detail, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-2 text-xs text-dark-600"
                              >
                                <XCircle className="w-3 h-3 text-primary-500 flex-shrink-0" />
                                <span>{detail}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT SIDE - Active Problem Display */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden bg-white! border border-dark-200 shadow-xl">
              
              {/* IMAGE CONTAINER */}
              <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={active.image}
                  alt={active.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                
                {/* Gradient Overlay using primary colors */}
                <div className={`absolute inset-0 bg-gradient-to-t ${active.color} via-dark-900/80 to-dark-900/80`} />
                
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-10 right-10 w-40 h-40 border-4 border-white/20 rounded-full"></div>
                  <div className="absolute bottom-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
                </div>
              </div>

              {/* CONTENT OVERLAY */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 lg:p-10">
                
                {/* STAT SECTION */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="mb-4"
                >
                  <div className="text-5xl sm:text-6xl lg:text-7xl font-bold text-primary-500">
                    {active.stat}
                  </div>
                  <p className="text-xs sm:text-sm text-dark-300 uppercase tracking-wider mt-1">
                    {active.statLabel}
                  </p>
                </motion.div>

                {/* TITLE & DESCRIPTION */}
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-white! mb-3"
                >
                  {active.title}
                </motion.h3>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm sm:text-base text-dark-200 max-w-md mb-6"
                >
                  {active.description}
                </motion.p>

                {/* DETAILS BADGES */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {active.details.slice(0, 2).map((detail, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-dark-100/70 rounded-full text-primary-500 border border-primary-500/30">
                      {detail}
                    </span>
                  ))}
                </motion.div>

                {/* CTA BUTTON */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  onClick={() => openEnquiry()}
                  className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-primary-500 hover:bg-primary-600 text-white rounded-full text-sm sm:text-base font-semibold transition-all duration-300 overflow-hidden shadow-lg hover:shadow-primary-500/25 cursor-pointer"
                >
                  <span className="relative z-10">Fix This Problem</span>
                  <TrendingUp className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </motion.button>
              </div>
            </div>

            {/* Decorative Elements using primary colors */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-600/10 rounded-full blur-2xl -z-10"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}