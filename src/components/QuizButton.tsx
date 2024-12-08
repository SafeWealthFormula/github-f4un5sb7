import { ArrowRight } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';

export default function QuizButton() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <button 
      className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      onClick={startQuiz}
    >
      <span className="relative flex items-center">
        Get My Safe Wealth Score
        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </span>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
    </button>
  );
}