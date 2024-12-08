import { useState, useEffect } from 'react';
import { Shield, Check } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { useQuestions } from '../../hooks/useQuestions';
import { UserAnswer } from '../../types/quiz';

export function QuizQuestion() {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setAnswer, nextQuestion, setView } = useQuizStore();
  
  const { 
    currentQuestion, 
    totalQuestions,
    isComplete,
    currentQuestionIndex 
  } = useQuestions();

  useEffect(() => {
    if (isComplete) {
      setView('expansion');
    }
  }, [isComplete, setView]);

  useEffect(() => {
    setSelectedAnswers([]);
    setError(null);
  }, [currentQuestion?.id]);

  if (!currentQuestion) return null;

  const handleAnswerSelect = (answerId: string) => {
    if (currentQuestion.type === 'single') {
      setSelectedAnswers([answerId]);
      setError(null);
      
      const answer: UserAnswer = {
        questionId: currentQuestion.id,
        answerId: [answerId]
      };
      
      setAnswer(answer);
      nextQuestion();
    } else {
      setSelectedAnswers(prev => {
        if (prev.includes(answerId)) {
          return prev.filter(id => id !== answerId);
        }
        
        if (currentQuestion.maxSelections && prev.length >= currentQuestion.maxSelections) {
          setError(`Please select up to ${currentQuestion.maxSelections} options`);
          return prev;
        }
        
        setError(null);
        return [...prev, answerId];
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
    nextQuestion();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-800 to-emerald-900">
      <header className="py-3 px-4 border-b border-emerald-700/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-200" />
            <span className="text-emerald-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
          <span className="text-emerald-200 text-sm font-medium">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>
            
            {currentQuestion.maxSelections && (
              <p className="text-sm text-gray-600 mb-4">
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
                      ? 'border-emerald-600 bg-emerald-50 shadow-lg'
                      : 'border-gray-200 hover:border-emerald-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-base ${
                      selectedAnswers.includes(answer.id)
                        ? 'text-emerald-700'
                        : 'text-gray-700'
                    }`}>
                      {answer.text}
                    </span>
                    {selectedAnswers.includes(answer.id) && (
                      <Check className="h-5 w-5 text-emerald-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-500">
                {error}
              </p>
            )}

            {currentQuestion.type === 'multiple' && (
              <div className="mt-6">
                <button
                  onClick={handleSubmit}
                  disabled={selectedAnswers.length === 0}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 border-t border-emerald-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="w-full h-1 bg-emerald-900/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-300 transition-all duration-500 ease-out"
              style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </footer>
    </div>
  );
}