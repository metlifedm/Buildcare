// src/hooks/useLazyImages.js
import { useEffect, useRef } from 'react';

export function useLazyImages() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll('img[data-lazy]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-lazy');
            if (src) {
              img.src = src;
              img.removeAttribute('data-lazy');
              img.addEventListener('load', () => {
                img.classList.add('loaded');
              });
            }
            observer.unobserve(img);
          }
        });
      },
      { rootMargin: '300px' }
    );

    images.forEach((img) => observer.observe(img));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}