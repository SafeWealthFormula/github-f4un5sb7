import { Question } from '../types/quiz';

export const isNoneOfAboveAnswer = (answerId: string, question: Question): boolean => {
  if (question.id === 'QQ8') {
    return answerId === 'QQA8.4' || answerId === 'QQA8.3';
  }
  if (question.id === 'SQQ7') {
    return answerId === 'SQA5';
  }
  if (question.id === 'SQQ11') {
    return answerId === 'SQA4';
  }
  return false;
};

export const handleMutualExclusion = (
  currentSelections: string[],
  newAnswerId: string,
  question: Question
): string[] => {
  // Handle mutual exclusion for QQ8, SQQ7, and SQQ11
  if (question.id !== 'QQ8' && question.id !== 'SQQ7' && question.id !== 'SQQ11') {
    return currentSelections.includes(newAnswerId)
      ? currentSelections.filter(id => id !== newAnswerId)
      : [...currentSelections, newAnswerId];
  }

  const isNoneOfAbove = isNoneOfAboveAnswer(newAnswerId, question);
  const currentlySelected = currentSelections.includes(newAnswerId);

  if (isNoneOfAbove) {
    // If selecting "None" or "Started but not finalized" option, clear all other selections
    return currentlySelected ? [] : [newAnswerId];
  } else {
    // If selecting any other option
    let newSelections = currentlySelected
      ? currentSelections.filter(id => id !== newAnswerId)
      : [...currentSelections, newAnswerId];

    // Remove "None" and "Started but not finalized" options if they were previously selected
    newSelections = newSelections.filter(
      id => !isNoneOfAboveAnswer(id, question)
    );

    return newSelections;
  }
};

export const shouldAutoAdvance = (question: Question): boolean => {
  // Auto-advance for all single-selection questions
  return question.type === 'single';
};