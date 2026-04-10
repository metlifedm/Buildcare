// src/sections/process/VisualTimeline.jsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Calendar, Palette, Package, Hammer, CheckCircle, Sparkles, Award } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Consultation",
    duration: "2 days",
    icon: Calendar,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: "We understand your space, needs, budget.",
    details: "Initial meeting to discuss your vision, measure the space, understand your lifestyle, and establish a realistic budget range that aligns with your goals.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&q=80"
  },
  {
    id: 2,
    title: "Design",
    duration: "7-15 days",
    icon: Palette,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: "Layout planning + design concept finalized.",
    details: "Our team creates 2D layouts, 3D renderings, and mood boards. You review and provide feedback until the design perfectly matches your vision.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80"
  },
  {
    id: 3,
    title: "Material",
    duration: "with you",
    icon: Package,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: "You select materials with our guidance (no surprises).",
    details: "Visit our material library or browse curated options online. We explain pros/cons of each material and provide transparent pricing.",
    image: "https://images.unsplash.com/photo-1615529328331-f891f6b8fad8?w=800&q=80"
  },
  {
    id: 4,
    title: "Execution",
    duration: "30-60 days",
    icon: Hammer,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: "Weekly updates. WhatsApp support. No delays.",
    details: "Dedicated project manager handles everything. Daily progress tracking, weekly photo updates, and direct WhatsApp support for quick questions.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80"
  },
  {
    id: 5,
    title: "Handover",
    duration: "final",
    icon: CheckCircle,
    color: "text-primary-600",
    bgColor: "bg-primary-50",
    description: "Quality check + final walkthrough.",
    details: "Thorough quality inspection, final walkthrough with you, addressing any last-minute concerns, and handing over all warranties and documentation.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
  }
];

function StepCard({ step, index, isOpen, onToggle }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <div 
        className={`relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer
          ${isOpen ? 'bg-white border-2 border-primary-300 shadow-lg' : 'bg-white border border-gray-200 hover:border-primary-300 shadow-sm'}`}
        onClick={onToggle}
      >
        <div className="relative p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-14 h-14 rounded-xl ${step.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`w-7 h-7 ${step.color}`} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="text-3xl font-heading font-bold text-primary-600">0{step.id}</span>
                  <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                  <span className={`text-sm px-3 py-1 rounded-full ${step.bgColor} ${step.color}`}>
                    {step.duration}
                  </span>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
            
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className={`w-8 h-8 rounded-full ${step.bgColor} flex items-center justify-center`}
            >
              <ChevronDown className={`w-5 h-5 ${step.color}`} />
            </motion.div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        What happens?
                      </h4>
                      <p className="text-gray-700 leading-relaxed">{step.details}</p>
                      
                      <div className="mt-4 flex items-center gap-2 text-sm text-primary-600">
                        <Award className="w-4 h-4" />
                        <span>100% transparency guaranteed</span>
                      </div>
                    </div>
                    <div className="relative rounded-xl overflow-hidden h-48">
                      <img 
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function VisualTimeline() {
  const [openStep, setOpenStep] = useState(1);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1920&q=80"
          alt="Timeline background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          style={{ scale }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-medium text-primary-700">Your Journey</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Your <span className="text-primary-600">5-Step Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A transparent, structured process designed to keep you informed and in control at every stage.
          </p>
        </motion.div>

        {/* Creative Timeline Visual */}
        <div className="hidden lg:flex justify-between mb-16 relative">
          <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-300 to-transparent" />
          
          {steps.map((step, idx) => (
            <motion.button
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setOpenStep(step.id)}
              className="relative z-10 text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 mx-auto
                  ${openStep === step.id 
                    ? 'bg-primary-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-500 group-hover:bg-primary-100 group-hover:text-primary-600'
                  }`}
              >
                {step.id}
              </motion.div>
              
              <div className="mt-3">
                <p className={`font-semibold transition-colors duration-300 ${
                  openStep === step.id ? 'text-primary-700' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">{step.duration}</p>
              </div>
              
              {openStep === step.id && (
                <motion.div
                  layoutId="activeTimeline"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-primary-600 rounded-full"
                />
              )}
            </motion.button>
          ))}
        </div>

        {/* Step Details Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.id}
              step={step}
              index={index}
              isOpen={openStep === step.id}
              onToggle={() => setOpenStep(openStep === step.id ? null : step.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}