interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function QuizProgressBar({ currentQuestion, totalQuestions }: QuizProgressBarProps) {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="py-3 px-4 border-t border-primary-700/30">
      <div className="max-w-2xl mx-auto">
        <div className="w-full h-1 bg-primary-900/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-300 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}