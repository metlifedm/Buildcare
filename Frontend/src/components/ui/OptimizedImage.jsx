// src/components/ui/OptimizedImage.jsx
import { useState, useRef, useEffect } from 'react';
import { cn } from '@utils/helpers';

export default function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  width,
  height,
  priority = false,
  fill = false,
  sizes = '100vw',
  aspectRatio,
  overlay = false,
  overlayClassName,
  onLoad: externalOnLoad,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    externalOnLoad?.(e);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const containerStyles = cn(
    'relative overflow-hidden bg-gray-100',
    fill && 'absolute inset-0',
    wrapperClassName
  );

  const imgStyles = cn(
    'transition-all duration-700 ease-out',
    isLoaded ? 'opacity-100 scale-100 blur-0' : 'opacity-0 scale-105 blur-sm',
    fill ? 'absolute inset-0 w-full h-full object-cover' : 'w-full h-auto',
    className
  );

  return (
    <div
      ref={imgRef}
      className={containerStyles}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {/* Skeleton placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" aria-hidden="true" />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        </div>
      )}

      {/* Actual image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onLoad={handleLoad}
          onError={handleError}
          className={imgStyles}
          sizes={sizes}
          {...props}
        />
      )}

      {/* Overlay */}
      {overlay && isLoaded && (
        <div className={cn('absolute inset-0', overlayClassName || 'bg-black/40')} />
      )}
    </div>
  );
}