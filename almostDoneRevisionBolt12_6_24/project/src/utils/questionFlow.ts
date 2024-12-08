import { QuestionCategory, UserResponse, FlagCriteria, FlagLevel } from '../types/quiz';

export const determineQuestionFlow = (
  responses: UserResponse[],
  assignedFlags: FlagCriteria[]
): QuestionCategory[] => {
  const visibleQuestions: QuestionCategory[] = [];

  // Helper function to check flag status
  const hasFlag = (category: QuestionCategory, level: FlagLevel) =>
    assignedFlags.some(f => f.category === category && f.flagLevel === level);

  // QQ1 and QQ2 Green Flag Skipping Logic
  const hasQQ1Green = hasFlag(QuestionCategory.QQ1, FlagLevel.Green);
  const hasQQ2Green = hasFlag(QuestionCategory.QQ2, FlagLevel.Green);

  if (!(hasQQ1Green && hasQQ2Green)) {
    visibleQuestions.push(QuestionCategory.QQ1);
  }

  // QQ3, QQ6, QQ7 Interdependency Logic
  const hasQQ6Green = hasFlag(QuestionCategory.QQ6, FlagLevel.Green);
  const hasQQ7Green = hasFlag(QuestionCategory.QQ7, FlagLevel.Green);

  if (!hasQQ6Green) {
    visibleQuestions.push(QuestionCategory.QQ3);
  }

  if (!hasQQ7Green) {
    visibleQuestions.push(QuestionCategory.QQ7);
  }

  return visibleQuestions;
};