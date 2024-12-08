import { useState, useEffect } from 'react';
import { Question } from '../types/quiz';
import { quickQuizQuestions, standardQuizQuestions } from '../data/questions';
import { useQuizStore } from '../store/quizStore';

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const quizType = useQuizStore(state => state.quizType);
  const currentQuestionIndex = useQuizStore(state => state.currentQuestionIndex);

  useEffect(() => {
    if (!quizType) return;

    let questionSet: Question[];
    switch (quizType) {
      case 'quick':
        questionSet = quickQuizQuestions;
        break;
      case 'standard':
        questionSet = standardQuizQuestions;
        break;
      default:
        questionSet = [];
    }
    setQuestions(questionSet);
  }, [quizType]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const isComplete = currentQuestionIndex >= totalQuestions;

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    isComplete
  };
}