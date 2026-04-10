// src/components/ui/ParallaxSection.jsx
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@utils/helpers';

export default function ParallaxSection({
  children,
  className,
  speed = 0.3,
  direction = 'up',
  image,
  imageAlt = '',
  overlay = true,
  overlayOpacity = 0.5,
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const yRange = direction === 'up' ? [100 * speed, -100 * speed] : [-100 * speed, 100 * speed];
  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <section ref={ref} className={cn('relative overflow-hidden', className)}>
      {image && (
        <motion.div
          className="absolute inset-0 -inset-y-20"
          style={{ y, scale }}
        >
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {overlay && (
            <div
              className="absolute inset-0 bg-black"
              style={{ opacity: overlayOpacity }}
            />
          )}
        </motion.div>
      )}

      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </section>
  );
}