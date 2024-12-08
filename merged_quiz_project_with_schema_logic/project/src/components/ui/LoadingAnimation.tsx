import { useEffect } from 'react';
import { cn } from '../../utils/cn';

interface LoadingAnimationProps {
  className?: string;
  onComplete?: () => void;
}

export function LoadingAnimation({ className, onComplete }: LoadingAnimationProps) {
  useEffect(() => {
    if (onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative w-48 h-1 bg-primary-100 rounded-full overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-600 to-transparent animate-shimmer" />
        
        {/* Base progress bar */}
        <div className="absolute inset-0 bg-primary-600 animate-progress-grow origin-left" />
      </div>
      
      {/* Pulse dots */}
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-primary-400 animate-pulse-1" />
        <div className="w-1 h-1 rounded-full bg-primary-400 animate-pulse-2" />
        <div className="w-1 h-1 rounded-full bg-primary-400 animate-pulse-3" />
      </div>
    </div>
  );
}