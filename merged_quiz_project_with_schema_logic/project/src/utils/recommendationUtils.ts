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