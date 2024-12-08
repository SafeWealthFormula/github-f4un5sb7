import { useQuizStore } from '../../store/quizStore';
import { QuizTypeSelection } from './QuizTypeSelection';
import { QuizLoadingTransition } from './QuizLoadingTransition';
import { QuizExpansionPrompt } from './QuizExpansionPrompt';
import { LeadCapture } from './LeadCapture';
import { ResultsPage } from './ResultsPage';
import { ThankYouScreen } from './ThankYouScreen';
import { QuizQuestion } from './QuizQuestion';

export function QuizFlow() {
  const view = useQuizStore((state) => state.view);

  switch (view) {
    case 'quiz-selection':
      return <QuizTypeSelection />;
    case 'quiz':
      return <QuizQuestion />;
    case 'loading':
      return <QuizLoadingTransition />;
    case 'expansion':
      return <QuizExpansionPrompt />;
    case 'lead-capture':
      return <LeadCapture />;
    case 'results':
      return <ResultsPage />;
    case 'thank-you':
      return <ThankYouScreen />;
    default:
      return null;
  }
}