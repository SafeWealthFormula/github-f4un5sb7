import { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

interface PhasedLoadingAnimationProps {
  className?: string;
  onComplete?: () => void;
  phrases?: string[];
}

export function PhasedLoadingAnimation({ 
  className, 
  onComplete,
  phrases = [
    "Analyzing your responses...",
    "Customizing your questions for deeper insights...",
    "Finalizing your tailored assessment...",
    "Your custom assessment is ready."
  ]
}: PhasedLoadingAnimationProps) {
  const [phase, setPhase] = useState(0);
  
  useEffect(() => {
    const timings = [0, 1000, 1800, 3000];
    
    const timers = timings.map((timing, index) => {
      return setTimeout(() => {
        setPhase(index);
        if (index === phrases.length - 1 && onComplete) {
          setTimeout(onComplete, 500);
        }
      }, timing);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onComplete, phrases.length]);

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <p className="text-sm sm:text-base text-neutral-600 h-6 text-center animate-fade-in">
        {phrases[phase]}
      </p>

      <div className="relative w-48 h-2 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-[length:8px_8px] bg-gradient-to-r from-primary-50 to-white" 
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(5, 150, 105, 0.1) 4px, rgba(5, 150, 105, 0.1) 8px)' }}>
        </div>

        <div 
          className="absolute inset-y-0 left-0 bg-primary-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((phase + 1) / phrases.length) * 100}%` }}
        />
      </div>

      <div className="flex gap-1.5">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors duration-300",
              dot <= phase ? "bg-primary-600" : "bg-primary-200"
            )}
          />
        ))}
      </div>
    </div>
  );
}