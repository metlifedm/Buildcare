// src/sections/process/TimelinePayment.jsx
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Clock, CreditCard, TrendingUp, Zap, Gift } from 'lucide-react';

const stages = [
  { 
    stage: "Planning & Design", 
    duration: "7-15 days", 
    payment: "20%", 
    icon: TrendingUp,
    color: "from-primary-500/20 to-primary-500/10",
    border: "border-cyan-500/30"
  },
  { 
    stage: "Material Selection", 
    duration: "5-7 days", 
    payment: "40%", 
    icon: Gift,
    color: "from-primary-500/20 to-primary-500/10",
    border: "border-primary-500/30"
  },
  { 
    stage: "Execution", 
    duration: "30-60 days", 
    payment: "30%", 
    icon: Zap,
    color: "from-primary-500/20 to-primary-500/10",
    border: "border-primary-500/30"
  },
  { 
    stage: "Final Handover", 
    duration: "2-3 days", 
    payment: "10%", 
    icon: Clock,
    color: "from-primary-500/20 to-primary-500/10",
    border: "border-primary-500/30"
  }
];

export default function TimelinePayment() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="py-24 bg-dark-900/50 relative overflow-hidden">

      <div className="container-custom relative z-10">
        <motion.div
          style={{ opacity }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <CreditCard className="w-4 h-4 text-primary-400" />
            <span className="text-sm font-medium text-primary-300">Financial Transparency</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Timeline & <span className="text-gradient">Payment</span> – No Surprises
          </h2>
          <p className="text-xl text-dark-200">
            Transparent milestones with clear payment schedules. Know exactly what to expect and when.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden border border-primary-500/20">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 p-6 bg-gradient-to-r from-primary-500/10 to-transparent border-b border-primary-500/20">
              <div className="col-span-5 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-400" />
                <span className="font-semibold text-primary-400">Stage</span>
              </div>
              <div className="col-span-4 text-center">
                <span className="font-semibold text-primary-400">Duration</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="font-semibold text-primary-400">Payment %</span>
              </div>
            </div>
            
            {/* Rows */}
            {stages.map((stage, index) => (
              <motion.div
                key={stage.stage}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                className={`grid grid-cols-12 gap-4 p-6 border-b border-dark-800 last:border-0 hover:bg-gradient-to-r ${stage.color} transition-all duration-300 group`}
              >
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <stage.icon className={`w-5 h-5 ${stage.border.replace('border-', 'text-').replace('/30', '')}`} />
                  </div>
                  <span className="font-semibold text-dark-100">{stage.stage}</span>
                </div>
                
                <div className="col-span-4 flex items-center justify-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-800 border ${stage.border}`}>
                    <Clock className="w-3 h-3" />
                    <span className="text-sm text-dark-200">{stage.duration}</span>
                  </div>
                </div>
                
                <div className="col-span-3 flex items-center justify-end">
                  <div className={`text-2xl font-bold ${stage.border.replace('border-', 'text-').replace('/30', '')}`}>
                    {stage.payment}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary-500/10 to-primary-500/5 border border-primary-500/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center animate-pulse">
                <ShieldCheck className="w-6 h-6 text-primary-400" />
              </div>
              <div>
                <div className="font-semibold text-primary-400 text-lg">✅ No surprise cost guarantee</div>
                <p className="text-sm text-primary-300/70">100% transparent pricing, no hidden fees</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}