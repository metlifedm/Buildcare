// src/components/ui/RevealAnimation.jsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@utils/helpers';

const animations = {
  fadeUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { opacity: 1, rotate: 0, scale: 1 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: 'blur(10px)' },
    visible: { opacity: 1, filter: 'blur(0px)' },
  },
  slideReveal: {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: { opacity: 1, y: 0, rotateX: 0 },
  },
};

export default function RevealAnimation({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  margin = '-80px',
  stagger = false,
  staggerDelay = 0.1,
  as = 'div',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin });

  const selectedAnimation = animations[animation] || animations.fadeUp;
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={selectedAnimation}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        ...(stagger && {
          staggerChildren: staggerDelay,
        }),
      }}
      style={{ perspective: animation === 'slideReveal' ? '1000px' : undefined }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, className, staggerDelay = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, animation = 'fadeUp' }) {
  const selectedAnimation = animations[animation] || animations.fadeUp;

  return (
    <motion.div
      className={className}
      variants={selectedAnimation}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  );
}