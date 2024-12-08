import { useState, useEffect } from 'react';
import { useQuizStore } from '../store/quizStore';

export type PageVariant = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

export function usePageVariant() {
  const [isLoading, setIsLoading] = useState(false);
  const { abTestVariant, cycleVariant } = useQuizStore();

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  const changeVariant = () => {
    setIsLoading(true);
    cycleVariant();
  };

  return {
    variant: abTestVariant,
    isLoading,
    changeVariant
  };
}