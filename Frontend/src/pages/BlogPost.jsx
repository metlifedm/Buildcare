// src/pages/BlogPost.jsx
import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Tag, Share2 } from 'lucide-react';
import SEOHead from '@seo/SEOHead';
import SchemaMarkup from '@seo/SchemaMarkup';
import Card from '@components/ui/Card';
import CTABanner from '@components/ui/CTABanner';
import blogData from '@data/blog.json';
import { formatDate } from '@utils/helpers';
import { COMPANY } from '@utils/constants';

export default function BlogPost() {
  const { slug } = useParams();
  const post = useMemo(
    () => blogData.posts.find((p) => p.slug === slug),
    [slug]
  );

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return blogData.posts
      .filter((p) => p.id !== post.id && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = `${COMPANY.siteUrl}/blog/${post.slug}`;

  // Convert markdown-like content to HTML
  const renderContent = (content) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      if (section.startsWith('## ')) {
        return (
          <h2
            key={index}
            className="font-heading text-2xl font-bold text-gray-900 mt-10 mb-4"
          >
            {section.replace('## ', '')}
          </h2>
        );
      }
      if (section.startsWith('### ')) {
        return (
          <h3
            key={index}
            className="font-heading text-xl font-semibold text-gray-800 mt-8 mb-3"
          >
            {section.replace('### ', '')}
          </h3>
        );
      }
      if (section.startsWith('- ')) {
        const items = section.split('\n');
        return (
          <ul key={index} className="list-none space-y-2 my-4">
            {items.map((item, i) => (
              <li key={i} className="text-gray-700 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" />
                {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '$1')}
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={index} className="text-gray-700 leading-relaxed my-4">
          {section}
        </p>
      );
    });
  };

  return (
    <>
      <SEOHead
        title={`${post.title} | Buildcare Blog`}
        description={post.excerpt}
        url={`/blog/${post.slug}`}
        image={post.image}
        type="article"
        article={{
          publishedTime: post.date,
          author: post.author,
          tags: post.tags,
        }}
      />
      <SchemaMarkup type="Article" data={post} />
      <SchemaMarkup
        type="BreadcrumbList"
        data={{
          items: [
            { name: 'Home', path: '/' },
            { name: 'Blog', path: '/blog' },
            { name: post.title, path: `/blog/${post.slug}` },
          ],
        }}
      />

      {/* Hero */}
      <section className="relative pt-24 pb-12 bg-white">
        <div className="container-custom">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              {post.category}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary-500" />
                {post.author}
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-500" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary-500" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 bg-white">
        <div className="container-custom">
          <motion.div
            className="rounded-2xl overflow-hidden max-w-5xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[300px] md:h-[500px] object-cover"
              loading="eager"
            />
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_300px] gap-12 max-w-5xl">
            {/* Main Content */}
            <motion.div
              className="prose-custom"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-xl text-gray-600 leading-relaxed font-light mb-8 border-l-4 border-primary-500 pl-6">
                {post.excerpt}
              </p>

              {renderContent(post.content)}

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-primary-500" />
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 text-sm font-medium flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    Share this article:
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      aria-label="Share on Facebook"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${post.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      aria-label="Share on Twitter"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </a>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${post.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-gray-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                      aria-label="Share on LinkedIn"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card padding="lg" variant="solid">
                  <h3 className="font-heading text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Written by
                  </h3>
                  <p className="font-heading text-lg font-semibold text-gray-900">{post.author}</p>
                  <p className="text-gray-500 text-sm mt-1">Interior Design Expert at Buildcare</p>
                </Card>
              </motion.div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card padding="lg" variant="solid">
                    <h3 className="font-heading text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                      Related Articles
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((rp) => (
                        <Link
                          key={rp.id}
                          to={`/blog/${rp.slug}`}
                          className="flex gap-3 group"
                        >
                          <img
                            src={rp.image}
                            alt={rp.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                            loading="lazy"
                          />
                          <div>
                            <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-2">
                              {rp.title}
                            </h4>
                            <p className="text-xs text-gray-400 mt-1">{rp.readTime}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Card padding="lg" className="bg-primary-50 border-primary-200">
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-3">
                    Need Design Help?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Get a free consultation with our experts.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-600 text-white font-semibold text-sm hover:bg-primary-700 transition-colors"
                  >
                    Contact Us <ArrowRight className="w-4 h-4" />
                  </Link>
                </Card>
              </motion.div>
            </aside>
          </div>
        </div>
      </article>

      <CTABanner variant="default" />
    </>
  );
}