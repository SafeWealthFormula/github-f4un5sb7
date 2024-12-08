import { FlagLevel, UserAnswer, QuickQuizFlagMapping, FlagComputationRules } from '../types/quiz';

const defaultThresholds: FlagComputationRules['thresholds'] = {
  green: [0, 1],
  yellow1: [2],
  yellow2: [3],
  red: [4]
};

export const createFlagRules = (
  primaryFlag: FlagLevel,
  computationLogic: (answers: number[]) => FlagLevel,
  thresholds = defaultThresholds
): FlagComputationRules => ({
  primaryFlag,
  computationLogic,
  thresholds
});

export const computeQuizFlags = (userAnswers: UserAnswer[]): QuickQuizFlagMapping => {
  const computeFlag = (answers: number[]): FlagLevel => {
    const maxScore = Math.max(...answers);
    if (maxScore <= 1) return 'Green';
    if (maxScore === 2) return 'Yellow1';
    if (maxScore === 3) return 'Yellow2';
    return 'Red';
  };

  return {
    QQ1: computeFlag(userAnswers.find(a => a.questionId === 'QQ1')?.selectedOptions || []),
    QQ2: computeFlag(userAnswers.find(a => a.questionId === 'QQ2')?.selectedOptions || []),
    QQ3: computeFlag(userAnswers.find(a => a.questionId === 'QQ3')?.selectedOptions || []),
    QQ4: computeFlag(userAnswers.find(a => a.questionId === 'QQ4')?.selectedOptions || []),
    QQ5: computeFlag(userAnswers.find(a => a.questionId === 'QQ5')?.selectedOptions || []),
    QQ6: computeFlag(userAnswers.find(a => a.questionId === 'QQ6')?.selectedOptions || []),
    QQ7: computeFlag(userAnswers.find(a => a.questionId === 'QQ7')?.selectedOptions || []),
    QQ8: computeFlag(userAnswers.find(a => a.questionId === 'QQ8')?.selectedOptions || [])
  };
};