import { useState, useEffect } from 'react';
import { useExtendedQuiz } from '../hooks/useExtendedQuiz';
import { QuizHeader } from './quiz/QuizHeader';
import { QuizProgressBar } from './quiz/QuizProgressBar';
import { QuizAnswer } from './quiz/QuizAnswer';
import { Button } from './ui/Button';
import { LoadingSpinner } from './ui/LoadingSpinner';
import { useQuizStore } from '../store/quizStore';
import { handleMutualExclusion } from '../utils/questionUtils';
import { UserAnswer } from '../types/quiz';

export function ExtendedQuiz() {
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
  } = useExtendedQuiz();

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <QuizHeader 
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10">
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
                <QuizAnswer
                  key={answer.id}
                  answer={answer}
                  isSelected={selectedAnswers.includes(answer.id)}
                  onSelect={handleAnswerSelect}
                />
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

      <QuizProgressBar
        currentQuestion={currentQuestionIndex}
        totalQuestions={totalQuestions}
      />
    </div>
  );
}