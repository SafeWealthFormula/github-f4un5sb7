import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Trust from './components/Trust';
import Footer from './components/Footer';
import { ArrowRight } from 'lucide-react';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import { useQuizStore } from './store/quizStore';
import { QuizFlow } from './components/QuizFlow';
import { Button } from './components/ui/Button';
import { LoadingSpinner } from './components/ui/LoadingSpinner';


export default function App() {
  const [showExitIntent, setShowExitIntent] = useState(false);
    const { 
    view,
    startQuiz
  } = useQuizStore();

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

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-white">
      {view === 'landing' ? (
        <>
          <Header />
          <Hero />
          <Trust />
          <Footer />
        </>
      ) : (
        <QuizFlow />
      )}

      {showExitIntent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 shadow-strong max-w-md w-full">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3">
              Don't leave your future to chance!
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-6">
              Take our 2-minute assessment now to discover hidden opportunities in your financial strategy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={() => {
                  setShowExitIntent(false);
                  startQuiz();
                }}
                className="group flex-1"
              >
                Take Quick Quiz
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="secondary"
                onClick={() => setShowExitIntent(false)}
                className="flex-1"
              >
                Maybe Later
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}