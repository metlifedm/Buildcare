// src/sections/process/WhyProcessMatters.jsx

import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery Meeting",
    desc: "Understanding your needs, budget and vision clearly.",
  },
  {
    number: "02",
    title: "Concept Creation",
    desc: "Design ideas are developed into clear concepts.",
  },
  {
    number: "03",
    title: "Design Approval",
    desc: "Finalizing layouts, materials and aesthetics.",
  },
  {
    number: "04",
    title: "Project Delivery",
    desc: "Execution with precision and timely completion.",
  },
];

export default function WhyProcessMatters() {
  return (
    <section className="py-20 md:py-24 bg-dark-50">

      <div className="max-w-7xl mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-primary-500" />
            <span className="text-sm text-primary-500 font-medium">
              Our Process
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-semibold text-dark-900 mb-4">
            A Clear Process That <br />
            <span className="text-primary-500">Guarantees Results</span>
          </h2>

          <p className="text-dark-500 text-lg">
            We follow a structured approach to eliminate delays, cost overruns and design issues.
          </p>
        </motion.div>

        {/* TOP STEPS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* BIG NUMBER */}
              <span className="text-6xl font-bold text-dark-200 absolute -top-6 left-0 opacity-40">
                {step.number}
              </span>

              <div className="pt-10">
                <h3 className="text-lg font-semibold text-dark-900 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-dark-500 leading-relaxed">
                  {step.desc}
                </p>

                {/* LINE */}
                <div className="mt-4 h-[1px] bg-dark-200 w-full" />
              </div>
            </motion.div>
          ))}

        </div>

        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl"
        >
          <img
            src="https://res.cloudinary.com/doo2og4l3/image/upload/v1776269611/2151008741_q3kybz.jpg"
            alt="interior"
            className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
          />

          {/* subtle overlay */}
          <div className="absolute inset-0 bg-dark-900/10" />
        </motion.div>

      </div>
    </section>
  );
}