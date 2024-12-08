import { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';
import { useQuizFlow } from '../services/quizFlow';
import { QuizTypeSelection } from './QuizTypeSelection';
import { QuizQuestion } from './QuizQuestion';
import { ExtendedQuiz } from './ExtendedQuiz';
import { QuizExpansionPrompt } from './QuizExpansionPrompt';
import { QuizLoadingTransition } from './QuizLoadingTransition';
import { LeadCapture } from './LeadCapture';
import { ResultsPage } from './ResultsPage';

export function QuizFlow() {
  const { view, setView } = useQuizStore();
  const { currentStep, quizType } = useQuizFlow();

  useEffect(() => {
    // Handle transitions based on current step
    switch (currentStep) {
      case 'initial':
        setView('quiz-selection');
        break;
      case 'quick':
      case 'standard':
        setView('quiz');
        break;
      case 'extended':
        setView('extended-quiz');
        break;
      case 'complete':
        setView('expansion');
        break;
    }
  }, [currentStep, setView]);

  // Render appropriate component based on view
  switch (view) {
    case 'quiz-selection':
      return <QuizTypeSelection />;
    case 'quiz':
      return <QuizQuestion />;
    case 'extended-quiz':
      return <ExtendedQuiz />;
    case 'expansion':
      return <QuizExpansionPrompt />;
    case 'loading':
      return <QuizLoadingTransition />;
    case 'lead-capture':
      return <LeadCapture />;
    case 'results':
      return <ResultsPage />;
    default:
      return null;
  }
}