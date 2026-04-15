// src/components/ui/CTABanner.jsx

import { motion } from "framer-motion";
import { Send, Phone } from "lucide-react";
import Button from "./Button";
import { COMPANY } from "@utils/constants";
import { useEnquiry } from "@hooks/useEnquiry";

export default function CTABanner({
  title = "Ready to Transform Your Space?",
  description = "Get a free consultation with our expert designers. Let's bring your dream interior to life.",
  primaryAction = { label: "Enquiry Now" },
  secondaryAction = { label: "Call Us", link: `tel:${COMPANY.phone}` },
}) {
  const { openEnquiry } = useEnquiry();

  return (
    <section className="relative overflow-hidden">
      
      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/doo2og4l3/image/upload/v1776251126/cta-banner_c7qs5q.jpg')",
        }}
      />

      {/* 🔥 Dark Overlay (using your colors) */}
      <div className="absolute inset-0 bg-dark-500/50" />

      {/* CONTENT */}
      <div className="relative z-10 py-20 md:py-28 px-4">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          
          {/* TITLE */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-500! mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h2>

          {/* DESCRIPTION */}
          <motion.p
            className="text-base md:text-lg text-white font-semibold mb-10 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>

          {/* BUTTONS */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {/* PRIMARY BUTTON (rounded pill like image) */}
            <button
              onClick={() => openEnquiry()}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-primary-400 text-white font-semibold text-sm md:text-base hover:bg-primary-500 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <Send size={18} />
              {primaryAction.label}
            </button>

            {/* SECONDARY BUTTON */}
            <a href={secondaryAction.link}>
              <button className="flex items-center gap-2 px-8 py-4 rounded-full border border-white text-white font-semibold text-sm md:text-base hover:bg-white hover:text-primary-600 transition-all duration-300 cursor-pointer">
                <Phone size={18} />
                {secondaryAction.label}
              </button>
            </a>
          </motion.div>

          {/* SMALL DECOR LINE (like image detail) */}
          <div className="mt-8 flex justify-center">
            <div className="w-10 h-[2px] bg-primary-400 rounded-full" />
          </div>

        </motion.div>
      </div>
    </section>
  );
}