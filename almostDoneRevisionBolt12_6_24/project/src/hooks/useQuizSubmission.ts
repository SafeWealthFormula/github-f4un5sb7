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