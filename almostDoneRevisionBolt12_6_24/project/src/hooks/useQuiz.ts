import { useState } from 'react';
import { UserAnswer, QuizResult } from '../types/quiz';
import { calculateQuizResult } from '../utils/quizLogic';
import { quizQuestions } from '../data/quizQuestions';

export const useQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;

  const handleAnswer = (selectedOptions: number[]) => {
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      selectedOptions
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      const quizResult = calculateQuizResult(newAnswers);
      setResult(quizResult);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setResult(null);
  };

  return {
    currentQuestion,
    isLastQuestion,
    result,
    handleAnswer,
    resetQuiz,
    progress: ((currentQuestionIndex + 1) / quizQuestions.length) * 100
  };
};