import { useMemo, useEffect, useState, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Tag, Share2, BookOpen, ChevronUp, Eye } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import Card from '@components/ui/Card';
import CTABanner from '@components/ui/CTABanner';
import blogData from '@data/blog.json';
import { formatDate } from '@utils/helpers';
import { COMPANY } from '@utils/constants';

/* ── Reading Progress Bar ── */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-primary-400 to-primary-600 z-[9999] origin-left"
    />
  );
}

/* ── Scroll To Top ── */
function ScrollToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 500);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary-600 text-white shadow-xl flex items-center justify-center hover:bg-primary-700 transition-colors"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ── Table of Contents ── */
function TableOfContents({ content }) {
  const [active, setActive] = useState('');
  const headings = useMemo(() => {
    const lines = content.split('\n\n');
    return lines
      .filter(l => l.startsWith('## ') || l.startsWith('### '))
      .map((l, i) => {
        const level = l.startsWith('### ') ? 3 : 2;
        const text = l.replace(/^#{2,3} /, '');
        const id = `heading-${i}`;
        return { id, text, level };
      });
  }, [content]);

  useEffect(() => {
    const els = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    const io = new IntersectionObserver(
      entries => {
        const visible = entries.find(e => e.isIntersecting);
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden">
      <div className="bg-primary-50 px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary-700" />
          <span className="text-sm font-semibold text-primary-700 uppercase tracking-wider">Contents</span>
        </div>
      </div>
      <nav className="p-4 space-y-1">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
              h.level === 3 ? 'ml-4' : ''
            } ${
              active === h.id
                ? 'bg-primary-500 text-dark-50 font-medium border-l-2 border-primary-500'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {h.text}
          </a>
        ))}
      </nav>
    </div>
  );
}

/* ── Animated Number ── */
function AnimatedStat({ value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="text-2xl font-bold text-primary-600">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </motion.div>
  );
}

/* ── Content Renderer ── */
function renderContent(content) {
  const sections = content.split('\n\n');
  let headingCount = 0;
  return sections.map((section, index) => {
    if (section.startsWith('## ')) {
      const id = `heading-${headingCount++}`;
      return (
        <motion.h2
          id={id}
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-2xl md:text-3xl font-bold text-gray-900 mt-14 mb-5 flex items-center gap-3 scroll-mt-24"
        >
          <span className="w-1 h-8 bg-gradient-to-b from-primary-400 to-primary-600 rounded-full flex-shrink-0" />
          {section.replace('## ', '')}
        </motion.h2>
      );
    }
    if (section.startsWith('### ')) {
      const id = `heading-${headingCount++}`;
      return (
        <motion.h3
          id={id}
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-xl font-semibold text-gray-800 mt-10 mb-4 scroll-mt-24"
        >
          {section.replace('### ', '')}
        </motion.h3>
      );
    }
    if (section.startsWith('- ')) {
      const items = section.split('\n').filter(i => i.trim());
      return (
        <motion.ul
          key={index}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="my-6 space-y-3 bg-gradient-to-br from-gray-50 to-primary-50/30 rounded-xl p-5 border border-gray-100"
        >
          {items.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="flex items-start gap-3 text-gray-700"
            >
              <span className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
              </span>
              <span className="leading-relaxed">
                {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, (_, m) => m)}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      );
    }
    return (
      <motion.p
        key={index}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-gray-600 leading-loose my-5 text-[15px] md:text-base"
      >
        {section}
      </motion.p>
    );
  });
}

/* ── Share Button ── */
function ShareBtn({ href, label, children, color }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white transition-all shadow-sm ${color}`}
    >
      {children}
    </motion.a>
  );
}

/* ── Related Post Card ── */
function RelatedCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="group block">
        <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="overflow-hidden h-44">
            <img
              src={post.image}
              alt={post.title}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="p-4">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">
              {post.category}
            </span>
            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-primary-600 transition-colors mt-1.5 line-clamp-2 leading-snug">
              {post.title}
            </h4>
            <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />{post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />{formatDate(post.date)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════ */
export default function BlogPost() {
  const { slug } = useParams();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const post = useMemo(() => blogData.posts.find(p => p.slug === slug), [slug]);
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogData.posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const shareUrl = `${COMPANY.siteUrl}/blog/${post.slug}`;
  const wordCount = post.content.split(' ').length;
  const readMins = Math.ceil(wordCount / 200);

  return (
    <>
      <ReadingProgress />
      <ScrollToTop />

      <SEOHead
        title={`${post.title} | Buildcare Blog`}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        article={{ publishedTime: post.date, author: post.author, tags: post.tags }}
      />
      <SchemaMarkup type="Article" data={post} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{ items: [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }] }}
      />

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-[80vh] flex items-end overflow-hidden bg-gray-900">
        {/* Parallax image */}
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0" />
          <div className="absolute inset-0 bg-dark-900/20" />
        </motion.div>

        {/* Decorative blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl z-10 pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl z-10 pointer-events-none" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 w-full pb-16 pt-32">
          <div className="container-custom max-w-5xl">
            {/* Back link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/30"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Category badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-5"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-700 border border-primary-400/30 text-dark-50 text-sm font-semibold backdrop-blur-sm">
                <span className="w-1.5 h-1.5 bg-dark-50 rounded-full animate-pulse" />
                {post.category}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white! mb-8 leading-tight max-w-4xl"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
            >
              {post.title}
            </motion.h1>

            {/* Meta row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >

              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2">
                <Calendar className="w-3.5 h-3.5 text-primary-300" />
                <span className="text-white/80 text-sm">{formatDate(post.date)}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center md:justify-start gap-8 py-5 divide-x divide-gray-100"
          >
            <AnimatedStat value={`${readMins} min`} label="Read time" />
            <div className="pl-8"><AnimatedStat value={wordCount.toLocaleString()} label="Words" /></div>
            <div className="pl-8"><AnimatedStat value={post.tags.length} label="Topics" /></div>
            {relatedPosts.length > 0 && (
              <div className="pl-8"><AnimatedStat value={relatedPosts.length} label="Related" /></div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ══ ARTICLE BODY ══ */}
      <article className="py-14 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-[1fr_310px] gap-14 items-start">

            {/* ── Main Content ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {/* Lead quote */}
              <div className="relative mb-12">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 rounded-full" />
                <blockquote className="pl-6 text-lg md:text-xl text-gray-600 leading-relaxed font-light italic">
                  {post.excerpt}
                </blockquote>
              </div>

              {/* Content */}
              <div className="!font-normal">
                {renderContent(post.content)}
              </div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-14 pt-8 border-t border-gray-100"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm mr-2">
                    <Tag className="w-4 h-4 text-primary-500" />
                    <span className="font-medium">Tags:</span>
                  </div>
                  {post.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05, y: -1 }}
                      className="px-3.5 py-1.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium hover:bg-primary-50 hover:text-primary-700 transition-colors cursor-pointer border border-transparent hover:border-primary-200"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Share */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-primary-50/30 border border-gray-100"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div>
                    <p className="font-semibold text-gray-800 flex items-center gap-2">
                      <Share2 className="w-4 h-4 text-primary-500" />
                      Share this article
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">Help others discover this content</p>
                  </div>
                  <div className="flex gap-2 sm:ml-auto">
                    <ShareBtn
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      label="Share on Facebook"
                      color="bg-[#1877F2] hover:bg-[#166fe5]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </ShareBtn>
                    <ShareBtn
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                      label="Share on Twitter"
                      color="bg-[#1DA1F2] hover:bg-[#1a91da]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </ShareBtn>
                    <ShareBtn
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                      label="Share on LinkedIn"
                      color="bg-[#0A66C2] hover:bg-[#095fb5]"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </ShareBtn>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* ── Sidebar ── */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* TOC */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <TableOfContents content={post.content} />
              </motion.div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-primary-50 to-white px-5 py-4 border-b border-gray-100">
                    <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Related Articles</span>
                  </div>
                  <div className="p-4 space-y-4">
                    {relatedPosts.map((rp) => (
                      <Link key={rp.id} to={`/blog/${rp.slug}`} className="flex gap-3 group items-start">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img
                            src={rp.image}
                            alt={rp.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2 leading-snug">
                            {rp.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {rp.readTime}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-2xl overflow-hidden relative bg-primary-500"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12 blur-2xl" />
                <div className="relative p-6 text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold mb-2 text-white!">Need Design Help?</h3>
                  <p className="text-white/80 text-sm mb-5 leading-relaxed">
                    Get a free consultation with our expert designers today.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary-700 font-semibold text-sm hover:bg-primary-50 transition-colors shadow-lg"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>

      {/* ══ RELATED POSTS GRID ══ */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container-custom max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block text-primary-600 font-semibold text-sm uppercase tracking-widest mb-3">Continue Reading</span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-gray-900">More from {post.category}</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full mx-auto mt-4" />
            </motion.div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <RelatedCard key={rp.id} post={rp} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABanner variant="default" />
    </>
  );
}