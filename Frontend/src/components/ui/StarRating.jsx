// src/components/ui/StarRating.jsx
import { Star } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function StarRating({ rating, size = 'md', className }) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className={cn('flex items-center gap-1', className)} aria-label={`Rating: ${rating} out of 5 stars`} role="img">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            sizes[size],
            star <= rating
              ? 'text-primary-400 fill-primary-400'
              : 'text-dark-500'
          )}
        />
      ))}
    </div>
  );
}