// src/sections/process/CommunicationFAQ.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Camera, ChevronDown, HelpCircle, Send, Bell, Image, Zap } from 'lucide-react';

const communicationChannels = [
  { 
    icon: MessageCircle, 
    title: "WhatsApp Updates", 
    description: "Weekly progress updates and quick responses",
    stat: "24/7 Support",
    iconColor: "text-primary-600"
  },
  { 
    icon: Phone, 
    title: "Call Anytime", 
    description: "During work hours for urgent matters",
    stat: "Response < 2hrs",
    iconColor: "text-primary-600"
  },
  { 
    icon: Camera, 
    title: "Progress Photos", 
    description: "Shared regularly for transparency",
    stat: "Daily Updates",
    iconColor: "text-primary-600"
  }
];

const faqs = [
  {
    question: "What if I want changes during execution?",
    answer: "We discuss cost and time impact before proceeding. Any change request is documented, quoted, and approved by you before implementation. No surprises, ever.",
    icon: Zap
  },
  {
    question: "What if I'm not satisfied with design?",
    answer: "We revise until you approve (within scope). Our iterative design process ensures you're happy at every stage before moving forward. Your satisfaction is our priority.",
    icon: HelpCircle
  },
  {
    question: "What happens if timeline slips?",
    answer: "We communicate immediately and adjust. Proactive communication is our priority - you'll never be left wondering about delays. We keep you informed every step of the way.",
    icon: Bell
  }
];

function FAQItem({ faq, index, isOpen, onToggle }) {
  const Icon = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary-300 transition-all duration-300 shadow-sm"
    >
      <button
        onClick={onToggle}
        className="w-full p-6 text-left group"
      >
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6 text-dark-50" />
            </div>
            <span className="font-semibold text-lg text-gray-900">{faq.question}</span>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center"
          >
            <ChevronDown className="w-5 h-5 text-dark-50" />
          </motion.div>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 pb-6 pt-0">
              <div className="p-4 rounded-xl bg-primary-500/20 border-l-2 border-primary-500">
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CommunicationFAQ() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <section className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=1920&q=80"
          alt="Communication background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Communication Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-200 mb-6"
              >
                <Send className="w-4 h-4 text-primary-600" />
                <span className="text-sm font-medium text-primary-700">Stay Connected</span>
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Stay <span className="text-primary-600">Updated</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Transparent communication throughout your project journey. We keep you in the loop, always.
              </p>

              <div className="space-y-4">
                {communicationChannels.map((channel, index) => (
                  <motion.div
                    key={channel.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-500"
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <channel.icon className={`w-7 h-7 ${channel.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{channel.title}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-primary-500/10 text-primary-700">
                            {channel.stat}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm">{channel.description}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  </motion.div>
                ))}
              </div>

              {/* Live support badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-6 flex items-center gap-2 p-3 rounded-xl bg-primary-500/10 border border-primary-200"
              >
                <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
                <span className="text-sm text-primary-700">Live support available</span>
              </motion.div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-200 mb-6"
            >
              <HelpCircle className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Common Questions</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Common <span className="text-primary-600">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Everything you need to know about our process.
            </p>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  isOpen={openFaq === index}
                  onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                />
              ))}
            </div>

            {/* Still have questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl bg-white border border-gray-200 text-center shadow-sm"
            >
              <p className="text-gray-700 mb-3">Still have questions?</p>
              <a href="/contact" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors font-semibold">
                Contact our support team
                <Send className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}