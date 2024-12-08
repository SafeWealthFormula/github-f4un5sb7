export type QuizType = 'quick' | 'standard' | 'extended' | null;

export interface Question {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  maxSelections?: number;
  answers: Answer[];
}

export interface Answer {
  id: string;
  text: string;
}

export interface UserAnswer {
  questionId: string;
  answerId: string[];
}