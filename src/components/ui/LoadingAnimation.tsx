import { cn } from '../../utils/cn';

interface LoadingAnimationProps {
  className?: string;
}

export function LoadingAnimation({ className }: LoadingAnimationProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="relative w-48 h-1 bg-emerald-100 rounded-full overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-600 to-transparent animate-shimmer" />
        
        {/* Base progress bar */}
        <div className="absolute inset-0 bg-emerald-600 animate-progress-grow origin-left" />
      </div>
      
      {/* Pulse dots */}
      <div className="flex gap-1">
        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-1" />
        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-2" />
        <div className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse-3" />
      </div>
    </div>
  );
}