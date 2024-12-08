import { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';
import { handleMutualExclusion } from '../utils/questionUtils';
import { getQuestionContext } from '../utils/questionContextUtils';
import { useQuestions } from '../hooks/useQuestions';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { UserAnswer } from '../types/quiz';

interface QuizQuestionProps {
  onAnswer: (answer: UserAnswer) => void;
}

export function QuizQuestion({ onAnswer }: QuizQuestionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setAnswer } = useQuizStore();
  
  const { 
    currentQuestion, 
    totalQuestions, 
    isComplete,
    isLoading,
    error: loadingError,
    currentQuestionIndex 
  } = useQuestions();

  useEffect(() => {
    setSelectedAnswers([]);
    setError(null);
  }, [currentQuestion?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (loadingError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold mb-4">{loadingError}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  const handleAnswerSelect = (answerId: string) => {
    if (currentQuestion.type === 'single') {
      setSelectedAnswers([answerId]);
      setError(null);
      
      const answer: UserAnswer = {
        questionId: currentQuestion.id,
        answerId: [answerId]
      };
      
      setAnswer(answer);
    } else {
      setSelectedAnswers(prev => {
        const newSelections = handleMutualExclusion(prev, answerId, currentQuestion);
        
        if (currentQuestion.maxSelections && newSelections.length > currentQuestion.maxSelections) {
          setError(`Please select up to ${currentQuestion.maxSelections} options`);
          return prev;
        }
        
        setError(null);
        return newSelections;
      });
    }
  };

  const handleSubmit = () => {
    if (selectedAnswers.length === 0) {
      setError('Please select at least one option');
      return;
    }
    
    const answer: UserAnswer = {
      questionId: currentQuestion.id,
      answerId: selectedAnswers
    };
    
    setAnswer(answer);
  };

  const questionContext = getQuestionContext(currentQuestion.id);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <header className="py-3 px-4 border-b border-primary-700/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
          <span className="text-primary-200 text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10">
            {questionContext && (
              <p className="text-sm text-primary-600 mb-3 animate-fade-in">
                {questionContext}
              </p>
            )}
            
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 mb-6 animate-slide-up">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.maxSelections && (
              <p className="text-sm text-neutral-600 mb-4">
                Select up to {currentQuestion.maxSelections} options
              </p>
            )}
            
            <div className="space-y-3">
              {currentQuestion.answers.map((answer) => (
                <button
                  key={answer.id}
                  onClick={() => handleAnswerSelect(answer.id)}
                  className={`group w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedAnswers.includes(answer.id)
                      ? 'border-primary bg-primary-50 shadow-glow'
                      : 'border-neutral-200 hover:border-primary hover:shadow-soft'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-base ${
                      selectedAnswers.includes(answer.id)
                        ? 'text-primary-700'
                        : 'text-neutral-700'
                    }`}>
                      {answer.text}
                    </span>
                    {selectedAnswers.includes(answer.id) && (
                      <Check className="h-5 w-5 text-primary animate-scale flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-500 animate-fade-in">
                {error}
              </p>
            )}

            {currentQuestion.type === 'multiple' && (
              <div className="mt-6">
                <Button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length === 0}
                  className="w-full"
                >
                  Continue
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 border-t border-primary-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="w-full h-1 bg-primary-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-300 transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}