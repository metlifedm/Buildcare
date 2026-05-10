import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Building2,
  Home,
  ChefHat,
  Sofa,
} from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "Modern Residential Villa",
    category: "Residential Interior",
    icon: Home,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Corporate Office",
    category: "Commercial Space",
    icon: Building2,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Minimal Contemporary Kitchen",
    category: "Kitchen Design",
    icon: ChefHat,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Elegant Luxury Lounge",
    category: "Luxury Interior",
    icon: Sofa,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function PortfolioPreview() {
  const [activeProject, setActiveProject] = useState(portfolioItems[0]);

  return (
    <section className="relative overflow-hidden bg-[#fafafa] py-24">
      {/* Background Decoration */}
      <div className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full bg-[#417aa1]/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#115989]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5 rounded-full border border-[#d4d4d4] bg-white px-5 py-2 text-sm font-medium tracking-[0.2em] text-[#115989] shadow-sm"
          >
            RECENT WORK
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl text-4xl font-bold leading-tight text-[#171717] sm:text-5xl lg:text-6xl"
          >
            Designing Interiors That
            <span className="bg-gradient-to-r from-[#417aa1] to-[#115989] bg-clip-text text-transparent">
              {" "}
              Elevate Everyday Living
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-[#525252]"
          >
            Discover our thoughtfully designed residential, commercial, and
            luxury interiors crafted with elegance, functionality, and timeless
            aesthetics.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
          {/* Main Featured Image */}
          <motion.div
            layout
            className="group relative h-[500px] overflow-hidden rounded-[36px] border border-[#e5e5e5] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] sm:h-[650px]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeProject.image}
                src={activeProject.image}
                alt={activeProject.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {/* Floating Card */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-white/20 bg-white/15 p-6 backdrop-blur-2xl"
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="mb-3 inline-flex rounded-full bg-white/20 px-4 py-1 text-sm text-white backdrop-blur-xl">
                    {activeProject.category}
                  </span>

                  <h3 className="text-2xl font-bold text-white! sm:text-4xl">
                    {activeProject.title}
                  </h3>
                </div>

                <button className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#115989] shadow-lg transition-all duration-300 hover:scale-110 hover:rotate-45">
                  <ArrowUpRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Side Cards */}
          <div className="grid gap-5">
            {portfolioItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setActiveProject(item)}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group relative overflow-hidden rounded-[28px] border bg-white p-5 transition-all duration-500 cursor-pointer ${
                    activeProject.id === item.id
                      ? "border-[#115989] shadow-[0_20px_60px_rgba(17,89,137,0.18)]"
                      : "border-[#e5e5e5] hover:border-[#417aa1]/40 hover:shadow-xl"
                  }`}
                >
                  {/* Background Hover Image */}
                  <div className="absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full scale-110 object-cover blur-[1px] transition-transform duration-700 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 ${
                          activeProject.id === item.id
                            ? "bg-[#115989] text-white"
                            : "bg-[#f5f5f5] text-[#115989] group-hover:bg-[#115989] group-hover:text-white"
                        }`}
                      >
                        <Icon size={26} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-[#737373]">
                          {item.category}
                        </p>

                        <h3 className="mt-1 text-lg font-semibold text-[#171717]">
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4d4d4] bg-white text-[#115989] transition-all duration-300 group-hover:rotate-45 group-hover:border-[#115989] group-hover:bg-[#115989] group-hover:text-white">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>

                  {/* Active Border Glow */}
                  {activeProject.id === item.id && (
                    <motion.div
                      layoutId="activeBorder"
                      className="absolute inset-0 rounded-[28px] border-2 border-[#115989]"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}