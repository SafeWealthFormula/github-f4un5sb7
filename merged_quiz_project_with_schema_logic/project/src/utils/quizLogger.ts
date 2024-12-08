import { UserAnswer, QuickQuizFlagMapping, ExtendedQuizFlow } from '../types/quiz';

export const logQuizComputation = (
  userAnswers: UserAnswer[],
  computedFlags: QuickQuizFlagMapping,
  extendedFlow: ExtendedQuizFlow[]
) => {
  console.group('Quiz Computation Log');
  console.log('Raw Answers:', userAnswers);
  console.log('Computed Flags:', computedFlags);
  console.log('Generated Extended Flow:', extendedFlow);
  console.groupEnd();
};