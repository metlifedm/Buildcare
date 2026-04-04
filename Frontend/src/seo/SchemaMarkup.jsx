// src/seo/SchemaMarkup.jsx
import { useEffect } from 'react';
import { COMPANY } from '@utils/constants';

/**
 * Schema.org structured data component
 */
export default function SchemaMarkup({ type = 'LocalBusiness', data = {} }) {
  useEffect(() => {
    const schemaId = `schema-${type.toLowerCase()}`;
    
    // Remove existing schema of same type
    const existing = document.getElementById(schemaId);
    if (existing) {
      existing.remove();
    }

    let schema;

    switch (type) {
      case 'LocalBusiness':
        schema = getLocalBusinessSchema(data);
        break;
      case 'Article':
        schema = getArticleSchema(data);
        break;
      case 'FAQPage':
        schema = getFAQSchema(data);
        break;
      case 'Service':
        schema = getServiceSchema(data);
        break;
      case 'BreadcrumbList':
        schema = getBreadcrumbSchema(data);
        break;
      default:
        schema = data;
    }

    const script = document.createElement('script');
    script.id = schemaId;
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(schemaId);
      if (el) el.remove();
    };
  }, [type, data]);

  return null;
}

function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    description: 'Premium Interior Design & Architecture Services',
    url: COMPANY.siteUrl,
    telephone: COMPANY.phone,
    email: COMPANY.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Design Avenue, Sector 5',
      addressLocality: 'Mumbai',
      addressRegion: 'Maharashtra',
      postalCode: '400001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '19.0760',
      longitude: '72.8777',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '₹₹₹',
    image: `${COMPANY.siteUrl}/og-image.jpg`,
    sameAs: Object.values(COMPANY.social),
  };
}

function getArticleSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.excerpt,
    image: data.image,
    author: {
      '@type': 'Person',
      name: data.author,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY.name,
      logo: {
        '@type': 'ImageObject',
        url: `${COMPANY.siteUrl}/favicon.svg`,
      },
    },
    datePublished: data.date,
    dateModified: data.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY.siteUrl}/blog/${data.slug}`,
    },
  };
}

function getFAQSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqs?.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })) || [],
  };
}

function getServiceSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.title,
    description: data.description,
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY.name,
      url: COMPANY.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    serviceType: data.title,
  };
}

function getBreadcrumbSchema(data) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: data.items?.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${COMPANY.siteUrl}${item.path}`,
    })) || [],
  };
}