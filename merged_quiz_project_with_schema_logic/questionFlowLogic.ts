
import { QuizFlagMapping } from '../types/flagTypes';

export function determineRetirementQuestionFlow(flags: QuizFlagMapping): any[] {
  const retirementFlow = [];

  // Tailor retirement-related questions based on combined flag evaluation
  switch (flags.retirementPlanning) {
    case 'Comprehensive':
      retirementFlow.push({
        primaryQuestion: {
          text: "What’s most important to you about planning your financial legacy?",
          answerOptions: [
            "Ensuring my family won’t face financial struggles if something happens to me.",
            "Leaving a meaningful gift to a cause or charity I care about.",
            "Maximizing the amount my loved ones will receive after taxes.",
            "I haven’t thought much about planning a financial legacy yet.",
          ],
        },
      });
      break;

    case 'Moderate':
      retirementFlow.push({
        primaryQuestion: {
          text: "What steps are you currently taking to align your savings with your legacy goals?",
          answerOptions: [
            "I’m making progress but need more guidance.",
            "I’ve started planning but haven’t reviewed it recently.",
            "I haven’t started yet but am ready to take action.",
            "I don’t think I need a legacy plan right now.",
          ],
        },
      });
      break;

    case 'Limited':
      retirementFlow.push({
        primaryQuestion: {
          text: "What’s holding you back from creating a solid financial legacy plan?",
          answerOptions: [
            "I don’t know where to start.",
            "I feel like I don’t have enough resources to plan effectively.",
            "I haven’t thought much about the importance of a legacy plan.",
            "I’m not sure how a legacy plan would benefit me and my family.",
          ],
        },
      });
      break;

    case 'None':
      retirementFlow.push({
        primaryQuestion: {
          text: "What would motivate you to start thinking about a financial legacy plan?",
          answerOptions: [
            "Knowing how it could protect my family.",
            "Understanding the tax advantages of early planning.",
            "Learning about tools that combine living benefits with legacy protection.",
            "Hearing about real-life examples of how legacy plans make a difference.",
          ],
        },
      });
      break;
  }

  return retirementFlow;
}
