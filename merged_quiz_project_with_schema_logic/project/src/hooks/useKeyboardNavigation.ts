import { useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

const viewOrder = [
  'landing',
  'quiz-selection',
  'quiz',
  'expansion',
  'loading',
  'extended-quiz',
  'lead-capture',
  'results'
] as const;

export function useKeyboardNavigation() {
  const { 
    view, 
    setView, 
    quizType, 
    setQuizType,
    setKeyboardNavigation,
    cycleVariant
  } = useQuizStore();

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      setKeyboardNavigation(true);

      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        const currentIndex = viewOrder.indexOf(view);
        
        if (currentIndex < viewOrder.length - 1) {
          if (view === 'quiz-selection' && !quizType) {
            setQuizType('quick');
          } else if (view === 'expansion') {
            setQuizType('extended');
            setView('loading');
          } else {
            const nextView = viewOrder[currentIndex + 1];
            setView(nextView);
          }
        }
      } 
      else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        const currentIndex = viewOrder.indexOf(view);
        
        if (currentIndex > 0) {
          const prevView = viewOrder[currentIndex - 1];
          setView(prevView);
        }
      }
      else if (e.key === '*') {
        e.preventDefault();
        cycleVariant();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [view, setView, quizType, setQuizType, setKeyboardNavigation, cycleVariant]);
}