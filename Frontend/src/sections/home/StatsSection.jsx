// src/sections/home/StatsMinimal.jsx

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  {
    value: 4500,
    suffix: "+",
    title: "Projects Completed",
    desc: "Sollicitudin at habitasse eget integer pretium natoque cursus",
  },
  {
    value: 42,
    suffix: "+",
    title: "Design Experts",
    desc: "Sollicitudin at habitasse eget integer pretium natoque cursus",
  },
  {
    value: 98,
    suffix: "%",
    title: "Client Satisfaction",
    desc: "Sollicitudin at habitasse eget integer pretium natoque cursus",
  },
  {
    value: 25,
    suffix: "+",
    title: "Years Experience",
    desc: "Sollicitudin at habitasse eget integer pretium natoque cursus",
  },
];

function Counter({ value, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, inView]);

  return count.toLocaleString();
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="bg-dark-100 py-16 md:py-20 border-y border-dark-200"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-6 py-8 ${
                i !== stats.length - 1
                  ? "border-b sm:border-b-0 sm:border-r border-dashed border-dark-300"
                  : ""
              }`}
            >
              {/* NUMBER */}
              <div className="flex items-start gap-1">
                <h2 className="text-4xl md:text-5xl font-semibold text-dark-900">
                  <Counter value={stat.value} inView={inView} />
                </h2>
                <span className="text-primary-500 text-2xl md:text-3xl font-semibold mt-1">
                  {stat.suffix}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="mt-6 text-lg font-semibold text-primary-400!">
                {stat.title}
              </h3>

              {/* DESC */}
              <p className="mt-2 text-sm text-dark-500 leading-relaxed max-w-xs">
                {stat.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}