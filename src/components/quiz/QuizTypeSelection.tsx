import { ArrowRight } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { QuizType } from '../../types/quiz';

export function QuizTypeSelection() {
  const setQuizType = useQuizStore((state) => state.setQuizType);

  const handleQuizTypeSelection = (type: QuizType) => {
    setQuizType(type);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-800 to-emerald-900">
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Choose Your Assessment Type
            </h1>
            <p className="text-sm text-emerald-100">
              Select the quiz that best fits your schedule
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-lg shadow-strong">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Quick Quiz</h3>
              <p className="text-sm text-gray-600 mb-4">Fast and easy—just 8 questions</p>
              <button 
                onClick={() => handleQuizTypeSelection('quick')}
                className="group w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                Start Quick Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="bg-white p-5 rounded-lg shadow-strong">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Standard Quiz</h3>
              <p className="text-sm text-gray-600 mb-4">In-depth insights with 12 questions</p>
              <button 
                onClick={() => handleQuizTypeSelection('standard')}
                className="group w-full bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                Start Standard Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}