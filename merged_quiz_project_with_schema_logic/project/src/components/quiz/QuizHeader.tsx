import { Shield } from 'lucide-react';

interface QuizHeaderProps {
  currentQuestion?: number;
  totalQuestions?: number;
}

export function QuizHeader({ currentQuestion, totalQuestions }: QuizHeaderProps) {
  return (
    <header className="py-3 px-4 border-b border-primary-700/30">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary-200" />
          <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
        </div>
        {currentQuestion !== undefined && totalQuestions !== undefined && (
          <span className="text-primary-200 text-sm font-medium">
            Question {currentQuestion + 1} of {totalQuestions}
          </span>
        )}
      </div>
    </header>
  );
}