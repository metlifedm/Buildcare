// src/sections/process/WhyProcessMatters.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { AlertTriangle, TrendingUp, Calendar, XCircle, DollarSign, Clock } from 'lucide-react';

const problems = [
  { 
    icon: DollarSign, 
    text: "Budget Overruns", 
    stat: "+45%",
    description: "Projects without clear process exceed budget by 45% on average",
    color: "from-primary-500/20 to-primary-600/10"
  },
  { 
    icon: Clock, 
    text: "Project Delays", 
    stat: "2-3x",
    description: "Delays are 2-3x more likely without structured planning",
    color: "from-primary-500/20 to-primary-600/10"
  },
  { 
    icon: XCircle, 
    text: "Design Mismatches", 
    stat: "68%",
    description: "68% of clients report dissatisfaction without clear process",
    color: "from-primary-500/20 to-primary-600/10"
  }
];

export default function WhyProcessMatters() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1]);

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden">
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <AlertTriangle className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Critical Insight</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Most Problems Happen Due to{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-300 to-primary-400 bg-clip-text">Poor Planning</span>
          </h2>
          
          <p className="text-xl text-dark-200">
            Budget overruns, delays, and design mismatches happen when there's no clear process.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.text}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10 }}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${problem.color} p-8 border border-primary-500/10 hover:border-primary-500/30 transition-all duration-500`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-dark-800/80 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <problem.icon className="w-8 h-8 text-primary-400" />
                </div>
                
                <div className="text-4xl font-bold text-primary-400 mb-2">{problem.stat}</div>
                <h3 className="text-xl font-semibold mb-3">{problem.text}</h3>
                <p className="text-dark-300 text-sm leading-relaxed">{problem.description}</p>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ opacity }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-800/50 border border-dark-700 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-sm text-dark-300">Without a structured process, these risks increase significantly</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}