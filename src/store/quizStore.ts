import { create } from 'zustand';
import { QuizType, UserAnswer } from '../types/quiz';

type View = 'landing' | 'quiz-selection' | 'quiz' | 'loading' | 'expansion' | 'lead-capture' | 'results' | 'thank-you';

interface QuizState {
  view: View;
  quizType: QuizType;
  currentQuestionIndex: number;
  userAnswers: UserAnswer[];
  isKeyboardNavigation: boolean;
  abTestVariant: 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
  setView: (view: View) => void;
  setQuizType: (type: QuizType) => void;
  startQuiz: () => void;
  nextQuestion: () => void;
  setAnswer: (answer: UserAnswer) => void;
  setKeyboardNavigation: (value: boolean) => void;
  cycleVariant: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  view: 'landing',
  quizType: null,
  currentQuestionIndex: 0,
  userAnswers: [],
  isKeyboardNavigation: false,
  abTestVariant: Math.random() < 0.166 ? 'A' :
                 Math.random() < 0.333 ? 'B' :
                 Math.random() < 0.5 ? 'C' :
                 Math.random() < 0.666 ? 'D' :
                 Math.random() < 0.833 ? 'E' : 'F',

  setView: (view) => set({ view }),
  
  setQuizType: (type) => set({
    quizType: type,
    view: 'quiz',
    currentQuestionIndex: 0,
    userAnswers: []
  }),

  startQuiz: () => set({
    view: 'quiz-selection',
    quizType: null,
    currentQuestionIndex: 0,
    userAnswers: []
  }),

  nextQuestion: () => set((state) => ({
    currentQuestionIndex: state.currentQuestionIndex + 1
  })),

  setAnswer: (answer) => set((state) => ({
    userAnswers: [...state.userAnswers, answer]
  })),

  setKeyboardNavigation: (value) => set({ isKeyboardNavigation: value }),

  cycleVariant: () => set((state) => ({
    abTestVariant: state.abTestVariant === 'A' ? 'B' :
                   state.abTestVariant === 'B' ? 'C' :
                   state.abTestVariant === 'C' ? 'D' :
                   state.abTestVariant === 'D' ? 'E' :
                   state.abTestVariant === 'E' ? 'F' : 'A'
  }))
}));