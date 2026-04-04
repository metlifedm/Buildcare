// src/hooks/useGSAPParallax.js
import { useEffect, useRef } from 'react';

export function useGSAPParallax(options = {}) {
  const {
    speed = 0.5,
    direction = 'vertical',
    trigger,
    start = 'top bottom',
    end = 'bottom top',
  } = options;

  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const moveValue = 100 * speed;
      const props = direction === 'vertical'
        ? { y: moveValue, ease: 'none' }
        : { x: moveValue, ease: 'none' };

      ctx = gsap.context(() => {
        gsap.to(element, {
          ...props,
          scrollTrigger: {
            trigger: trigger || element,
            start,
            end,
            scrub: 1,
          },
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, [speed, direction, trigger, start, end]);

  return elementRef;
}

export function useGSAPFadeIn(options = {}) {
  const {
    y = 60,
    duration = 1,
    delay = 0,
    stagger = 0.15,
    selector,
  } = options;

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const targets = selector ? container.querySelectorAll(selector) : [container];

        gsap.from(targets, {
          y,
          opacity: 0,
          duration,
          delay,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, [y, duration, delay, stagger, selector]);

  return containerRef;
}

export function useGSAPTextReveal() {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    let ctx;
    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const text = element.textContent;
        element.innerHTML = '';

        const chars = text.split('').map((char) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.style.transform = 'translateY(40px) rotateX(-40deg)';
          element.appendChild(span);
          return span;
        });

        gsap.to(chars, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    };

    initGSAP();
    return () => ctx?.revert();
  }, []);

  return textRef;
}