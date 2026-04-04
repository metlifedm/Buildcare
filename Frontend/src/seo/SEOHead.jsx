// src/seo/SEOHead.jsx
import { useEffect } from 'react';
import { COMPANY } from '@utils/constants';
import { defaultSEO } from './seoConfig';

/**
 * SEO Head component - React 19 compatible (no react-helmet needed)
 * Uses document API directly for meta tag management
 */
export default function SEOHead({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  article = null,
  noindex = false,
}) {
  const seoTitle = title || defaultSEO.title;
  const seoDescription = description || defaultSEO.description;
  const seoImage = image || defaultSEO.image;
  const seoUrl = url ? `${COMPANY.siteUrl}${url}` : defaultSEO.url;
  const seoKeywords = keywords || defaultSEO.keywords;

  useEffect(() => {
    // Update document title
    document.title = seoTitle;

    // Helper to set/update meta tags
    const setMeta = (attribute, attributeValue, content) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    setMeta('name', 'description', seoDescription);
    setMeta('name', 'keywords', seoKeywords);
    
    if (noindex) {
      setMeta('name', 'robots', 'noindex, nofollow');
    } else {
      setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    }

    // Open Graph
    setMeta('property', 'og:title', seoTitle);
    setMeta('property', 'og:description', seoDescription);
    setMeta('property', 'og:image', seoImage);
    setMeta('property', 'og:url', seoUrl);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', COMPANY.name);
    setMeta('property', 'og:locale', 'en_IN');

    // Twitter Card
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', seoTitle);
    setMeta('name', 'twitter:description', seoDescription);
    setMeta('name', 'twitter:image', seoImage);
    setMeta('name', 'twitter:url', seoUrl);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seoUrl);

    // Article-specific meta
    if (article) {
      setMeta('property', 'article:published_time', article.publishedTime || '');
      setMeta('property', 'article:author', article.author || '');
      if (article.tags) {
        article.tags.forEach((tag, index) => {
          setMeta('property', `article:tag:${index}`, tag);
        });
      }
    }

    // Cleanup function
    return () => {
      // Reset to default on unmount if needed
    };
  }, [seoTitle, seoDescription, seoImage, seoUrl, seoKeywords, type, noindex, article]);

  return null; // This component doesn't render anything visible
}