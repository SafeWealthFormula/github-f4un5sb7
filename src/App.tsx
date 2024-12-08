import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useKeyboardNavigation } from './hooks';
import { useQuizStore } from './store/quizStore';
import { Header, Hero, Benefits, Trust, Footer } from './components';
import { QuizFlow } from './components/quiz';

export default function App() {
  const [showExitIntent, setShowExitIntent] = useState(false);
  const { view, startQuiz } = useQuizStore();

  useKeyboardNavigation();

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && view === 'landing') {
        setShowExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [view]);

  return (
    <div className="min-h-screen bg-white">
      {view === 'landing' ? (
        <>
          <Header />
          <Hero />
          <Benefits />
          <Trust />
          <Footer />
        </>
      ) : (
        <QuizFlow />
      )}

      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 shadow-strong max-w-md w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
              Don't leave your future to chance!
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Take our 2-minute assessment now to discover hidden opportunities in your financial strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  setShowExitIntent(false);
                  startQuiz();
                }}
                className="group flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                Take Quick Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setShowExitIntent(false)}
                className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}