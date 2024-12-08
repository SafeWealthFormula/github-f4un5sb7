import { ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { QuizType } from '../types/quiz';
import { useQuizStore } from '../store/quizStore';
import { Shield } from 'lucide-react';
import { usePageVariant } from '../hooks/usePageVariant';
import { PageTransition } from './PageTransition';

export function QuizTypeSelection() {
  const { setQuizType } = useQuizStore();
  const { isLoading } = usePageVariant();

  const handleQuizTypeSelection = (type: QuizType) => {
    setQuizType(type);
  };

  const renderContent = () => (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <header className="py-3 px-4 flex-none">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Choose Your Assessment Type
            </h1>
            <p className="text-sm text-primary-100">
              Select the quiz that best fits your schedule
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-strong">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Quick Quiz</h3>
              <p className="text-sm text-neutral-600 mb-4">Fast and easy—just 8 questions</p>
              <Button 
                onClick={() => handleQuizTypeSelection('quick')}
                className="w-full group"
              >
                Start Quick Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-strong">
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Standard Quiz</h3>
              <p className="text-sm text-neutral-600 mb-4">In-depth insights with 12 questions</p>
              <Button 
                onClick={() => handleQuizTypeSelection('standard')}
                className="w-full group"
              >
                Start Standard Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 flex-none">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="w-48 h-1.5 bg-primary-900/50 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-primary-200" />
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <PageTransition isLoading={isLoading}>
      {renderContent()}
    </PageTransition>
  );
}