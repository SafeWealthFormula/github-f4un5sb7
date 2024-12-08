import { Check } from 'lucide-react';
import { Answer } from '../../types/quiz';

interface QuizAnswerProps {
  answer: Answer;
  isSelected: boolean;
  onSelect: (answerId: string) => void;
}

export function QuizAnswer({ answer, isSelected, onSelect }: QuizAnswerProps) {
  return (
    <button
      onClick={() => onSelect(answer.id)}
      className={`group w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
        isSelected
          ? 'border-primary bg-primary-50 shadow-glow'
          : 'border-neutral-200 hover:border-primary hover:shadow-soft'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className={`text-base ${
          isSelected
            ? 'text-primary-700'
            : 'text-neutral-700'
        }`}>
          {answer.text}
        </span>
        {isSelected && (
          <Check className="h-5 w-5 text-primary animate-scale flex-shrink-0" />
        )}
      </div>
    </button>
  );
}