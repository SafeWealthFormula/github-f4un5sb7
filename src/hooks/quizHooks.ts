

// Content from: /mnt/data/extracted_files/src/hooks/useQuestions.ts
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

// Content from: /mnt/data/extracted_files/src/hooks/useQuizFlow.ts
import { useState, useCallback } from 'react';
import { 
  QuizStage, 
  UserAnswer, 
  QuizResult,
  ExtendedQuizFlow,
  QuickQuizFlagMapping 
} from '../types/quiz';
import { computeQuizFlags } from '../utils/flagComputation';
import { generateExtendedQuizFlow } from '../utils/quizProgression';
import { logQuizComputation } from '../utils/quizLogger';

export const useQuizFlow = () => {
  const [stage, setStage] = useState<QuizStage>(QuizStage.QuickQuiz);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [extendedFlows, setExtendedFlows] = useState<ExtendedQuizFlow[]>([]);

  const processAnswer = useCallback((answer: UserAnswer) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (stage === QuizStage.QuickQuiz) {
      const flags = computeQuizFlags(newAnswers);
      const flows = generateExtendedQuizFlow(flags);
      
      logQuizComputation(newAnswers, flags, flows);

      if (flows.length > 0) {
        setExtendedFlows(flows);
        setStage(QuizStage.ExtendedQuiz);
      } else {
        setResult({
          stage: QuizStage.QuickQuiz,
          flagMappings: flags,
          recommendations: generateRecommendations(flags)
        });
      }
    }
  }, [answers, stage]);

  const generateRecommendations = (flags: QuickQuizFlagMapping): string[] => {
    const recommendations: string[] = [];
    Object.entries(flags).forEach(([questionId, flag]) => {
      if (flag === 'Red') {
        recommendations.push(`Critical attention needed for ${questionId}`);
      } else if (flag === 'Yellow2') {
        recommendations.push(`Review recommended for ${questionId}`);
      }
    });
    return recommendations;
  };

  return {
    stage,
    result,
    extendedFlows,
    processAnswer,
    reset: () => {
      setStage(QuizStage.QuickQuiz);
      setAnswers([]);
      setResult(null);
      setExtendedFlows([]);
    }
  };
};

// Content from: /mnt/data/extracted_files/src/hooks/useQuizSubmission.ts
import { useState } from 'react';
import { quizService } from '../services/firestore/quizService';
import { analyticsService } from '../services/firestore/analyticsService';
import { UserAnswer, UserInfo } from '../types/quiz';
import { FirebaseError } from '../utils/errors';

export function useQuizSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitQuiz = async (
    userId: string,
    answers: UserAnswer[],
    userInfo: UserInfo
  ) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create submission
      const submissionId = await quizService.createSubmission(userId, userInfo.quizType);
      
      // Submit all responses
      for (const answer of answers) {
        await quizService.submitQuizResponse(userId, submissionId, answer);
      }
      
      // Complete submission
      await quizService.completeSubmission(userId, submissionId);
      
      // Track completion
      await analyticsService.trackEvent('quiz_completion', {
        submissionId,
        userId,
        quizType: userInfo.quizType
      });

      return submissionId;
    } catch (err) {
      const error = err instanceof FirebaseError 
        ? err
        : new FirebaseError('Failed to submit quiz. Please try again.', undefined, err);
      
      setError(error.message);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitQuiz,
    isSubmitting,
    error
  };
}