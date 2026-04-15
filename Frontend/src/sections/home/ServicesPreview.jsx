// src/sections/home/ServicesPreview.jsx

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Send } from "lucide-react";
import SectionHeading from "@components/ui/SectionHeading";
import { useEnquiry } from "@hooks/useEnquiry";
import servicesData from "@data/services.json";

export default function ServicesPreview() {
  const { openEnquiry } = useEnquiry();
  const previewServices = servicesData.services.slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-dark-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeading
          subtitle="Our Services"
          title="Comprehensive Interior Design Solutions"
          description="From concept to completion, we offer a full spectrum of interior design and renovation services tailored to your vision."
          className="text-center"
        />

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-0 mt-16">

          {previewServices.map((service, index) => {
            const row = Math.floor(index / 2);
            const isReversedOnDesktop = row % 2 === 1;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true, margin: "-100px" }}
                className="group"
              >
                {/* CARD */}
                <div
                  className={`
                    relative flex flex-col md:flex-row h-full bg-white overflow-hidden
                    transition-all duration-700
                    border border-dark-100 hover:border-primary-200
                    ${isReversedOnDesktop ? "md:flex-row-reverse" : ""}
                  `}
                >

                  {/* IMAGE CONTAINER */}
                  <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden bg-dark-100">
                    <img
                      src={service.image || "https://res.cloudinary.com/doo2og4l3/image/upload/v1776255790/photo-1505691938895-1758d7feb511_ry7oys.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700! ease-in-out group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                    {/* Hover Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 skew-x-12" />
                    </div>
                  </div>

                  {/* CONTENT CONTAINER */}
                  <div className="w-full md:w-1/2 p-6 lg:p-8 flex flex-col justify-between bg-white">
                    <div>

                      <h3 className="text-2xl font-bold text-dark-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                        {service.title}
                      </h3>

                      <p className="text-dark-600 leading-relaxed text-base">
                        {service.shortDescription}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center justify-between mt-8">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm uppercase tracking-wider hover:gap-4 transition-all duration-300"
                      >
                        View Details
                        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </Link>

                      <button
                        onClick={() => openEnquiry(service.title)}
                        className="p-2.5 rounded-full bg-primary-400 hover:bg-primary-100 text-dark-50 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer"
                        aria-label="Enquire about this service"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Floating Border Effect on Hover */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary-400/30 pointer-events-none transition-all duration-500 -z-10" />
                  <div className="absolute -inset-1 bg-primary-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-20" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <Link
            to="/services"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-600 text-white font-semibold rounded-full hover:bg-primary-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Explore All Services
            <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}