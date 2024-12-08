import { useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { quickQuizQuestions, standardQuizQuestions } from '../data/questions';
import { extendedQuizQuestions } from '../data/extendedQuizData';
import { useQuizStore } from '../store/quizStore';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const quizType = useQuizStore(state => state.quizType);
  const currentQuestionIndex = useQuizStore(state => state.currentQuestionIndex);

  useEffect(() => {
    if (!quizType) return;

    setIsLoading(true);
    setError(null);

    try {
      let questionSet: Question[];
      switch (quizType) {
        case 'quick':
          questionSet = quickQuizQuestions;
          break;
        case 'standard':
          questionSet = standardQuizQuestions;
          break;
        case 'extended':
          questionSet = extendedQuizQuestions;
          break;
        default:
          questionSet = [];
      }
      setQuestions(questionSet);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to load questions. Please try again.');
      console.error('Error loading questions:', err);
    }
  }, [quizType]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isComplete = currentQuestionIndex >= totalQuestions;

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isComplete,
    isLoading,
    error
  };
}