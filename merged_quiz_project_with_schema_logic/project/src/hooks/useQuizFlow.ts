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