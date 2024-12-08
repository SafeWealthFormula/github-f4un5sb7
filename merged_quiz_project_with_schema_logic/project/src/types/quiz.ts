// Base flag types
export type FlagLevel = 'Green' | 'Yellow1' | 'Yellow2' | 'Red';

// Quick quiz mapping
export interface QuickQuizFlagMapping {
  QQ1: FlagLevel;
  QQ2: FlagLevel;
  QQ3: FlagLevel;
  QQ4: FlagLevel;
  QQ5: FlagLevel;
  QQ6: FlagLevel;
  QQ7: FlagLevel;
  QQ8: FlagLevel;
}

// Extended quiz flow types
export interface ExtendedQuizFlow {
  tag: string;
  primaryQuestion: {
    text: string;
    answerOptions: string[];
  };
  secondaryQuestions?: {
    [primaryAnswerIndex: number]: {
      text: string;
      answerOptions: string[];
      chainedQuestions?: {
        text: string;
        answerOptions: string[];
      }[];
    }
  };
}

// Quiz progression types
export interface QuizStageDefinition {
  stage: 'Quick Quiz' | 'Extended Quiz';
  steps: string[];
  flows?: string[];
}

export enum QuizStage {
  QuickQuiz = 'QuickQuiz',
  ExtendedQuiz = 'ExtendedQuiz'
}

export interface QuizFlow {
  currentStage: QuizStage;
  flags: QuickQuizFlagMapping;
  extendedQuizFlows: ExtendedQuizFlow[];
}

// User interaction types
export interface UserAnswer {
  questionId: string;
  selectedOptions: number[];
}

// Flag computation types
export interface FlagComputationRules {
  primaryFlag: FlagLevel;
  computationLogic: (userAnswers: number[]) => FlagLevel;
  thresholds: {
    green: number[];
    yellow1: number[];
    yellow2: number[];
    red: number[];
  };
}

// Quiz result types
export interface QuizResult {
  stage: QuizStage;
  flagMappings: QuickQuizFlagMapping;
  recommendations: string[];
  nextFlow?: ExtendedQuizFlow;
}