
import { useState, useEffect } from 'react';
import { quickQuizQuestions } from '../data/quickQuizQuestions';
import { standardQuizQuestions } from '../data/standardQuizQuestions';

export function useQuestions(quizType: 'quick' | 'standard') {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (quizType === 'quick') {
      setQuestions(quickQuizQuestions);
    } else if (quizType === 'standard') {
      setQuestions(standardQuizQuestions);
    }
  }, [quizType]);

  const nextQuestion = () => setCurrentIndex((prev) => prev + 1);
  const previousQuestion = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return {
    currentQuestion: questions[currentIndex],
    totalQuestions: questions.length,
    isComplete: currentIndex >= questions.length,
    nextQuestion,
    previousQuestion,
  };
}
