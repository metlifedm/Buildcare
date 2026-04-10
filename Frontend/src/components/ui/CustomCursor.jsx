// src/components/ui/CustomCursor.jsx
import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@hooks/useMediaQuery';

export default function CustomCursor() {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (isMobile) return;

    window.addEventListener('mousemove', handleMouseMove);

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Detect hoverable elements
    const handleElementHover = () => {
      const hoverables = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      );

      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => {
          setIsHovering(true);
          const text = el.getAttribute('data-cursor');
          if (text) setCursorText(text);
        });
        el.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setCursorText('');
        });
      });
    };

    handleElementHover();
    const observer = new MutationObserver(handleElementHover);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      observer.disconnect();
    };
  }, [isMobile, handleMouseMove]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full bg-primary-600 flex items-center justify-center"
          animate={{
            width: isHovering ? (cursorText ? 80 : 48) : isClicking ? 6 : 10,
            height: isHovering ? (cursorText ? 80 : 48) : isClicking ? 6 : 10,
            opacity: isHovering ? 0.9 : 1,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          {cursorText && isHovering && (
            <span className="text-white text-[10px] font-bold uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="rounded-full border border-primary-400"
          animate={{
            width: isHovering ? 60 : 36,
            height: isHovering ? 60 : 36,
            opacity: isHovering ? 0.4 : 0.3,
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}