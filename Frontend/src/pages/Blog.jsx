// src/pages/Blog.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, Tag, Calendar } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import { pageSEO } from '@seo/seoConfig';
import PageHero from '@components/shared/PageHero';
import Card from '@components/ui/Card';
import CTABanner from '@components/ui/CTABanner';
import blogData from '@data/blog.json';
import { formatDate } from '@utils/helpers';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const posts = blogData.posts;

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(posts.map((p) => p.category))];
    return cats;
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'All') return posts;
    return posts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, posts]);

  const featuredPost = posts[0];
  const otherPosts = selectedCategory === 'All' ? filteredPosts.slice(1) : filteredPosts;

  return (
    <>
      <SEOHead
        title={pageSEO.blog.title}
        description={pageSEO.blog.description}
        url={pageSEO.blog.path}
      />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
          ],
        }}
      />

      <PageHero
        title="Design Insights & Blog"
        subtitle="Our Blog"
        description="Expert tips, trends, and inspiration from our team of professional interior designers and architects."
        breadcrumbs={[{ label: 'Blog' }]}
        backgroundImage="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=80"
      />

      <section className="py-24 bg-dark-950" aria-label="Blog posts">
        <div className="container-custom">
          {/* Category Filter */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-primary-400 text-dark-950 shadow-gold'
                    : 'glass-card text-dark-200 hover:text-primary-300 hover:border-primary-400/30'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {selectedCategory === 'All' && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to={`/blog/${featuredPost.slug}`} className="block group">
                <Card className="overflow-hidden" padding="none">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
                      <img
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="eager"
                        onLoad={(e) => e.target.classList.add('loaded')}
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full bg-primary-400/10 text-primary-400 text-xs font-medium">
                          {featuredPost.category}
                        </span>
                        <span className="text-primary-400 text-xs font-accent">Featured</span>
                      </div>

                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-dark-50 mb-4 group-hover:text-primary-300 transition-colors">
                        {featuredPost.title}
                      </h2>

                      <p className="text-dark-200 leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-dark-400 mb-6">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(featuredPost.date)}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-primary-400 font-medium group-hover:gap-3 transition-all">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`} className="block group h-full">
                  <Card className="h-full overflow-hidden flex flex-col" padding="none">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        loading="lazy"
                        onLoad={(e) => e.target.classList.add('loaded')}
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary-400/10 text-primary-400 text-xs font-medium">
                          {post.category}
                        </span>
                        <span className="text-dark-500 text-xs flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-heading text-lg font-semibold text-dark-50 mb-3 group-hover:text-primary-300 transition-colors line-clamp-2 flex-grow-0">
                        {post.title}
                      </h3>

                      <p className="text-dark-300 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-dark-600/20 mt-auto">
                        <div className="flex items-center gap-2 text-xs text-dark-400">
                          <User className="w-3 h-3" />
                          {post.author}
                        </div>
                        <span className="text-xs text-dark-500">
                          {formatDate(post.date)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="text-center text-dark-400 py-20 text-lg">
              No posts found in this category.
            </p>
          )}
        </div>
      </section>

      <CTABanner
        title="Need Expert Design Advice?"
        description="Our team is ready to help you bring your design vision to life. Get in touch for a free consultation."
        variant="gold"
      />
    </>
  );
}