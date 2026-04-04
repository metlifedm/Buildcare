// src/hooks/useIntersectionObserver.js
import { useState, useEffect, useRef, useCallback } from 'react';

export function useIntersectionObserver(options = {}) {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    freezeOnceVisible = true,
  } = options;

  const [entry, setEntry] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  const frozen = useRef(false);

  const updateEntry = useCallback(([newEntry]) => {
    if (frozen.current) return;
    setEntry(newEntry);
    
    if (newEntry.isIntersecting) {
      setIsVisible(true);
      if (freezeOnceVisible) {
        frozen.current = true;
      }
    } else {
      setIsVisible(false);
    }
  }, [freezeOnceVisible]);

  useEffect(() => {
    const node = elementRef.current;
    const hasSupport = !!window.IntersectionObserver;

    if (!hasSupport || !node) return;

    const observerParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, observerParams);

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold, root, rootMargin, updateEntry]);

  return { ref: elementRef, entry, isVisible };
}