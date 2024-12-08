import { useQuizStore } from '../../store/quizStore';

export function ProgressBar() {
  const { quizType, currentQuestionIndex } = useQuizStore();
  const totalQuestions = quizType === 'quick' ? 8 : 12;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className="flex items-center gap-3">
      <div className="text-sm text-primary-100">
        Question {currentQuestionIndex + 1}/{totalQuestions}
      </div>
      <div className="w-48 h-1.5 bg-primary-900/50 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-200 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}