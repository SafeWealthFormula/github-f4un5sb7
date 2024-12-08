import { useState } from 'react';
import { QuestionnaireService } from '../services/QuestionnaireService';
import { UserResponse, QuizResult, QuestionCategory } from '../types/quiz';

export const useQuestionnaire = () => {
  const [service] = useState(() => new QuestionnaireService());
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [currentQuestionId, setCurrentQuestionId] = useState<QuestionCategory>(QuestionCategory.QQ1);
  const [result, setResult] = useState<QuizResult | null>(null);

  const handleResponse = (response: UserResponse) => {
    const newResponses = [...responses, response];
    setResponses(newResponses);

    const quizResult = service.processResponses(newResponses);
    
    if (quizResult.nextQuestions.length > 0) {
      setCurrentQuestionId(quizResult.nextQuestions[0]);
    } else {
      setResult(quizResult);
    }
  };

  const resetQuestionnaire = () => {
    setResponses([]);
    setCurrentQuestionId(QuestionCategory.QQ1);
    setResult(null);
  };

  return {
    currentQuestionId,
    result,
    handleResponse,
    resetQuestionnaire,
    progress: (responses.length / Object.keys(QuestionCategory).length) * 100
  };
};