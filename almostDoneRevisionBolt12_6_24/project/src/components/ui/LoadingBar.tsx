import { cn } from '../../utils/cn';

interface LoadingBarProps {
  progress?: number;
  label?: string;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function LoadingBar({ 
  progress = 66, 
  label, 
  className,
  animate = true,
  delay = 0
}: LoadingBarProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="w-full h-1 bg-primary-100 rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full bg-primary-600 transition-all duration-500",
            animate && "animate-pulse-gentle"
          )}
          style={{ 
            width: `${progress}%`,
            animationDelay: `${delay}ms`
          }}
        />
      </div>
      {label && (
        <span className="text-xs text-neutral-500 mt-1">{label}</span>
      )}
    </div>
  );
}