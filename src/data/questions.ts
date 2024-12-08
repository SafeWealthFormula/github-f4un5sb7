import { Question } from '../types/quiz';

export const quickQuizQuestions: Question[] = [
  {
    id: 'QQ1',
    text: 'How would you describe your current investment strategy?',
    type: 'single',
    answers: [
      { id: 'QQA1.1', text: 'Well-diversified across multiple asset classes' },
      { id: 'QQA1.2', text: 'Mostly stocks and bonds' },
      { id: 'QQA1.3', text: 'Primarily in one type of investment' },
      { id: 'QQA1.4', text: 'Not sure/Don\'t have a strategy' }
    ]
  },
  {
    id: 'QQ2',
    text: 'How many months of expenses do you have saved in an emergency fund?',
    type: 'single',
    answers: [
      { id: 'QQA2.1', text: '6+ months' },
      { id: 'QQA2.2', text: '3-6 months' },
      { id: 'QQA2.3', text: '1-3 months' },
      { id: 'QQA2.4', text: 'Less than 1 month' }
    ]
  }
];

export const standardQuizQuestions: Question[] = [
  ...quickQuizQuestions,
  {
    id: 'SQ1',
    text: 'Which financial goals are most important to you? (Select up to 3)',
    type: 'multiple',
    maxSelections: 3,
    answers: [
      { id: 'SQA1.1', text: 'Retirement security' },
      { id: 'SQA1.2', text: 'Tax optimization' },
      { id: 'SQA1.3', text: 'Estate planning' },
      { id: 'SQA1.4', text: 'Investment growth' },
      { id: 'SQA1.5', text: 'Risk management' }
    ]
  }
];