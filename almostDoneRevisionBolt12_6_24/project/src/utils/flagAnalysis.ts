import { UserAnswer, QuizFlag, QuizArea, FlagType } from '../types/quiz';

// Map questions to their areas
const questionAreaMap: Record<string, QuizArea> = {
  'QQ1': 'income',
  'QQ2': 'emergency',
  'QQ3': 'inflation',
  'QQ4': 'savings',
  'QQ5': 'portfolio',
  'QQ6': 'advisor',
  'QQ7': 'retirement',
  'QQ8': 'legacy'
};

// Define flag thresholds for each answer
const flagThresholds: Record<string, Record<string, FlagType>> = {
  'QQ1': {
    'QQA1.1': 'green',
    'QQA1.2': 'yellow1',
    'QQA1.3': 'yellow2',
    'QQA1.4': 'red'
  },
  'QQ2': {
    'QQA2.1': 'green',
    'QQA2.2': 'yellow1',
    'QQA2.3': 'yellow2',
    'QQA2.4': 'red'
  },
  'QQ3': {
    'QQA3.1': 'green',
    'QQA3.2': 'yellow1',
    'QQA3.3': 'yellow2',
    'QQA3.4': 'red'
  },
  'QQ4': {
    'QQA4.1': 'green',
    'QQA4.2': 'yellow1',
    'QQA4.3': 'yellow2',
    'QQA4.4': 'red'
  },
  'QQ5': {
    'QQA5.1': 'green',
    'QQA5.2': 'yellow1',
    'QQA5.3': 'yellow2',
    'QQA5.4': 'red'
  },
  'QQ6': {
    'QQA6.1': 'green',
    'QQA6.2': 'yellow1',
    'QQA6.3': 'yellow2',
    'QQA6.4': 'red'
  },
  'QQ7': {
    'QQA7.1': 'green',
    'QQA7.2': 'yellow1',
    'QQA7.3': 'yellow2',
    'QQA7.4': 'red'
  },
  'QQ8': {
    'QQA8.1': 'green',
    'QQA8.2': 'yellow1',
    'QQA8.3': 'yellow2',
    'QQA8.4': 'red'
  }
};

// Priority weights for different flag types
const flagPriorities: Record<FlagType, number> = {
  'red': 1,
  'yellow2': 2,
  'yellow1': 3,
  'green': 4
};

export function analyzeFlaggedAreas(answers: UserAnswer[]): QuizFlag[] {
  const flags: QuizFlag[] = [];
  let priority = 1;

  answers.forEach(answer => {
    const questionId = answer.questionId;
    const area = questionAreaMap[questionId];
    
    if (!area || !answer.answerId.length) return;

    const answerId = answer.answerId[0]; // Use first answer for single-choice
    const flagType = flagThresholds[questionId]?.[answerId];

    if (!flagType) return;

    flags.push({
      area,
      type: flagType,
      priority: priority++ * flagPriorities[flagType] // Combine sequence with severity
    });
  });

  // Sort flags by priority (lower number = higher priority)
  return flags.sort((a, b) => a.priority - b.priority);
}

export function getFlaggedAreasCount(flags: QuizFlag[]): Record<FlagType, number> {
  return flags.reduce((acc, flag) => {
    acc[flag.type] = (acc[flag.type] || 0) + 1;
    return acc;
  }, {} as Record<FlagType, number>);
}

export function shouldShowExtendedQuiz(flags: QuizFlag[]): boolean {
  const counts = getFlaggedAreasCount(flags);
  return (counts.red || 0) > 0 || (counts.yellow2 || 0) > 0;
}