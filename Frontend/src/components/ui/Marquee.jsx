// src/components/ui/Marquee.jsx
import { motion } from 'framer-motion';
import { cn } from '@utils/helpers';

export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  className,
  pauseOnHover = true,
}) {
  const directionValue = direction === 'left' ? '-50%' : '0%';
  const initialValue = direction === 'left' ? '0%' : '-50%';

  return (
    <div
      className={cn(
        'overflow-hidden whitespace-nowrap',
        pauseOnHover && 'hover:[&>div]:pause-animation',
        className
      )}
    >
      <motion.div
        className="inline-flex"
        animate={{ x: [initialValue, directionValue] }}
        transition={{
          x: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <div className="flex items-center gap-8 pr-8">{children}</div>
        <div className="flex items-center gap-8 pr-8" aria-hidden="true">{children}</div>
      </motion.div>
    </div>
  );
}

export function MarqueeText({ texts, className, speed = 25 }) {
  return (
    <Marquee speed={speed} className={cn('py-6', className)}>
      {texts.map((text, i) => (
        <span key={i} className="flex items-center gap-8">
          <span className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-wider text-gray-300">
            {text}
          </span>
          <span className="w-3 h-3 rounded-full bg-primary-300 flex-shrink-0" />
        </span>
      ))}
    </Marquee>
  );
}