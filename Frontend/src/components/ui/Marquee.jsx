// src/components/ui/Marquee.jsx

import { motion } from "framer-motion";
import { cn } from "@utils/helpers";

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  className,
  pauseOnHover = true,
}) {
  const directionValue = direction === "left" ? "-50%" : "0%";
  const initialValue = direction === "left" ? "0%" : "-50%";

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap border-y border-dark-200 bg-dark-100",
        pauseOnHover && "hover:[&>div]:pause-animation",
        className
      )}
    >
      <motion.div
        className="inline-flex"
        animate={{ x: [initialValue, directionValue] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        <div className="flex items-center gap-10 pr-10">
          {children}
        </div>
        <div className="flex items-center gap-10 pr-10" aria-hidden="true">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

/* 🔥 Updated Text Style */
export function MarqueeText({ texts, className, speed = 25 }) {
  return (
    <Marquee speed={speed} className={cn("py-3", className)}>
      {texts.map((text, i) => (
        <span key={i} className="flex items-center gap-6">
          
          {/* TEXT */}
          <span className="text-xs sm:text-sm md:text-base uppercase tracking-[0.3em] text-dark-500 font-medium">
            {text}
          </span>

          {/* DOT */}
          <span className="w-1.5 h-1.5 rounded-full bg-primary-400 flex-shrink-0" />

        </span>
      ))}
    </Marquee>
  );
}