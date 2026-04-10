// src/pages/FAQ.jsx
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, HelpCircle } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import { Accordion } from '@components/ui/Accordion';
import Card from '@components/ui/Card';
import CTABanner from '@components/ui/CTABanner';
import ContactForm from '@components/forms/ContactForm';
import faqData from '@data/faq.json';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { faqs } = faqData;

  const categories = useMemo(() => {
    return ['All', ...new Set(faqs.map((f) => f.category))];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((f) => f.category === selectedCategory);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (f) =>
          f.question.toLowerCase().includes(term) ||
          f.answer.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [faqs, selectedCategory, searchTerm]);

  return (
    <>
      <SEOHead
        title={pageSEO.faq.title}
        description={pageSEO.faq.description}
        url={pageSEO.faq.path}
      />
      <SchemaMarkup type="FAQPage" data={{ faqs }} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ],
        }}
      />

      <PageHero
        title="Frequently Asked Questions"
        subtitle="Got Questions?"
        description="Find answers to the most common questions about our interior design services, process, pricing, and more."
        breadcrumbs={[{ label: 'FAQ' }]}
        backgroundImage="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
      />

      <section className="py-24 bg-white" aria-label="FAQ section">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Search */}
            <motion.div
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search your question..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  aria-label="Search FAQs"
                />
              </div>
            </motion.div>

            {/* Category Filter */}
            <motion.div
              className="flex flex-wrap items-center gap-2 mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-primary-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </motion.div>

            {/* FAQ Accordion */}
            {filteredFaqs.length > 0 ? (
              <Accordion
                items={filteredFaqs.map((faq) => ({
                  id: faq.id,
                  question: faq.question,
                  answer: faq.answer,
                }))}
                allowMultiple
              />
            ) : (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">No matching questions found.</p>
                <p className="text-gray-400 text-sm">Try different keywords or browse all categories.</p>
              </motion.div>
            )}

            {/* Still have questions */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card padding="xl" className="text-center bg-primary-50 border-primary-200">
                <HelpCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-3">
                  Still Have Questions?
                </h3>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                  Can't find what you're looking for? Send us your question and we'll get back to you within 24 hours.
                </p>
                <ContactForm variant="compact" className="max-w-xl mx-auto" />
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <CTABanner variant="default" />
    </>
  );
}