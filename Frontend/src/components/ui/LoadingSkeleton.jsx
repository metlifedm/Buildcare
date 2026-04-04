// src/components/ui/LoadingSkeleton.jsx
import { cn } from '@utils/helpers';

export function SkeletonBlock({ className, ...props }) {
  return (
    <div
      className={cn('skeleton rounded-lg', className)}
      role="status"
      aria-label="Loading..."
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4" role="status" aria-label="Loading card...">
      <SkeletonBlock className="h-48 w-full rounded-xl" />
      <SkeletonBlock className="h-4 w-3/4" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-3 w-full" />
      <SkeletonBlock className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <SkeletonBlock className="h-10 w-24 rounded-lg" />
        <SkeletonBlock className="h-10 w-24 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonText({ lines = 3 }) {
  return (
    <div className="space-y-3" role="status" aria-label="Loading text...">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonBlock
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-2/3' : 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonImage({ className }) {
  return <SkeletonBlock className={cn('w-full h-64 rounded-xl', className)} />;
}