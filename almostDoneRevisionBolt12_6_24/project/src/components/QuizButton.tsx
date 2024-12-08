import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';

export default function QuizButton() {
  const startQuiz = useQuizStore((state) => state.startQuiz);

  return (
    <Button 
      onClick={startQuiz}
      className="group"
    >
      Get My Safe Wealth Score
      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
}