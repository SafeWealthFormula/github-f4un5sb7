import { FlagLevel, QuestionCategory, UserResponse, FlagCriteria } from '../types/quiz';

export const createFlagCriteria = (
  category: QuestionCategory,
  flagLevel: FlagLevel,
  condition: (responses: UserResponse[]) => boolean
): FlagCriteria => ({
  category,
  flagLevel,
  conditions: condition
});

export const defaultFlagCriteria: FlagCriteria[] = [
  createFlagCriteria(
    QuestionCategory.QQ1,
    FlagLevel.Green,
    (responses) => {
      const response = responses.find(r => r.questionId === QuestionCategory.QQ1);
      return response?.selectedOptionIds.includes('HIGHLY_DIVERSIFIED') || false;
    }
  ),
  createFlagCriteria(
    QuestionCategory.QQ2,
    FlagLevel.Red,
    (responses) => {
      const response = responses.find(r => r.questionId === QuestionCategory.QQ2);
      return response?.selectedOptionIds.includes('NO_COVERAGE') || false;
    }
  ),
  // Add more criteria as needed
];