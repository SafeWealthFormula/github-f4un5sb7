import { create } from 'zustand';
import { QuizType, UserAnswer } from '../types/quiz';
import { computeQuizFlags } from '../logic/flagComputation';
import { generateExpandedQuizFlow } from '../logic/expandedQuizLogic';

interface QuizState {
  view: 'landing' | 'quiz-selection' | 'quiz' | 'extended-quiz' | 'lead-capture' | 'results' | 'complete';
  quizType: QuizType | null;
  userAnswers: UserAnswer[];
  abTestVariant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  isKeyboardNavigation: boolean;
  setView: (view: QuizState['view']) => void;
  setQuizType: (type: QuizType | null) => void;
  addAnswer: (answer: UserAnswer) => void;
  startQuiz: () => void;
  cycleVariant: () => void;
  setKeyboardNavigation: (value: boolean) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  // Initial state
  view: 'landing',
  quizType: null,
  userAnswers: [],
  abTestVariant: Math.random() < 0.166 ? 'A' :
                 Math.random() < 0.333 ? 'B' :
                 Math.random() < 0.5 ? 'C' :
                 Math.random() < 0.666 ? 'D' :
                 Math.random() < 0.833 ? 'E' : 'F',
  isKeyboardNavigation: false,

  // Set the current view
  setView: (view) => set({ view }),

  // Set the quiz type and initialize flow
  setQuizType: (type) => set({
    quizType: type,
    view: type ? 'quiz' : 'quiz-selection',
    userAnswers: [] // Reset answers when quiz type changes
  }),

  // Add an answer to the user's responses
  addAnswer: (answer) => set((state) => ({
    userAnswers: [...state.userAnswers, answer]
  })),

  // Start the quiz
  startQuiz: () => set({
    view: 'quiz-selection',
    quizType: null,
    userAnswers: []
  }),

  // Cycle AB testing variant
  cycleVariant: () => set((state) => ({
    abTestVariant: state.abTestVariant === 'A' ? 'B' :
                   state.abTestVariant === 'B' ? 'C' :
                   state.abTestVariant === 'C' ? 'D' :
                   state.abTestVariant === 'D' ? 'E' :
                   state.abTestVariant === 'E' ? 'F' : 'A',
  })),

  // Enable or disable keyboard navigation
  setKeyboardNavigation: (value) => set({ isKeyboardNavigation: value }),

  // Reset the quiz to the initial state
  resetQuiz: () => set({
    view: 'landing',
    quizType: null,
    userAnswers: [],
    abTestVariant: Math.random() < 0.166 ? 'A' :
                   Math.random() < 0.333 ? 'B' :
                   Math.random() < 0.5 ? 'C' :
                   Math.random() < 0.666 ? 'D' :
                   Math.random() < 0.833 ? 'E' : 'F',
    isKeyboardNavigation: false,
  }),
}));
