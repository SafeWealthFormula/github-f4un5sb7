import { Switch } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
}

export function Toggle({ checked, onChange, label, className }: ToggleProps) {
  return (
    <label className={cn("inline-flex items-center cursor-pointer gap-2", className)}>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={cn(
          "w-11 h-6 bg-neutral-200 rounded-full peer",
          "peer-checked:after:translate-x-full peer-checked:bg-primary",
          "after:content-[''] after:absolute after:top-[2px] after:left-[2px]",
          "after:bg-white after:rounded-full after:h-5 after:w-5",
          "after:transition-all after:duration-300"
        )}></div>
      </div>
      {label && <span className="text-sm text-neutral-600">{label}</span>}
    </label>
  );
}