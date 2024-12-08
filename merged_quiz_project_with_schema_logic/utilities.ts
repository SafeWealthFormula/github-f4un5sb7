

// Content from: /mnt/data/extracted_files/project/src/utils/recommendationUtils.ts
import { QuizType, UserAnswer } from '../types/quiz';

interface Recommendation {
  title: string;
  description: string;
}

export function generateRecommendations(quizType: QuizType | null, userAnswers: UserAnswer[]): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // Process answers to generate personalized recommendations
  userAnswers.forEach(answer => {
    switch (answer.questionId) {
      case 'SQQ1':
        if (answer.answerId.includes('SQA1')) {
          recommendations.push({
            title: 'Tax Optimization Strategy',
            description: 'We\'ve identified opportunities to enhance your tax efficiency through strategic planning and investment structures.'
          });
        }
        if (answer.answerId.includes('SQA2')) {
          recommendations.push({
            title: 'Inflation Protection',
            description: 'Your portfolio may benefit from inflation-hedging strategies to preserve long-term purchasing power.'
          });
        }
        break;

      case 'SQQ3':
        if (answer.answerId.includes('SQA3') || answer.answerId.includes('SQA4')) {
          recommendations.push({
            title: 'Emergency Fund Strategy',
            description: 'Building a robust emergency fund should be a priority to enhance your financial security.'
          });
        }
        break;

      case 'SQQ7':
        if (answer.answerId.includes('SQA5')) {
          recommendations.push({
            title: 'Retirement Account Optimization',
            description: 'You may be missing out on valuable tax advantages by not utilizing retirement accounts.'
          });
        }
        break;

      case 'SQQ11':
        if (answer.answerId.includes('SQA4')) {
          recommendations.push({
            title: 'Legacy Planning',
            description: 'Protecting your family\'s future through proper estate planning tools can provide peace of mind.'
          });
        }
        break;
    }
  });

  // Add a default recommendation if none were generated
  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Comprehensive Financial Review',
      description: 'Schedule a consultation to discuss how we can help optimize your financial strategy across all areas.'
    });
  }

  return recommendations;
}

// Content from: /mnt/data/extracted_files/project/src/utils/questionUtils.ts
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

// Content from: /mnt/data/extracted_files/project/src/utils/validation.ts
import { z } from 'zod';

export const emailSchema = z.string().email('Invalid email address');

export const phoneSchema = z.string()
  .min(10, 'Phone number must be at least 10 digits')
  .max(15, 'Phone number must not exceed 15 digits')
  .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number format');

export const quizAnswerSchema = z.object({
  questionId: z.string(),
  answerId: z.array(z.string())
});

export const userInfoSchema = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  quizType: z.enum(['quick', 'standard'])
});

export const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch {
    return false;
  }
};

export const validatePhone = (phone: string) => {
  try {
    phoneSchema.parse(phone);
    return true;
  } catch {
    return false;
  }
};