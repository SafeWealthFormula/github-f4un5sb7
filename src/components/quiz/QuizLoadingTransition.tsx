import { useEffect } from 'react';
import { Shield, Lock, TrendingUp, LineChart, BarChart3, Sparkles } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';
import { LoadingAnimation } from '../ui/LoadingAnimation';

export function QuizLoadingTransition() {
  const { setView, abTestVariant } = useQuizStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setView('quiz');
    }, 3500);
    return () => clearTimeout(timer);
  }, [setView]);

  const renderVariantA = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6 animate-pulse-gentle">
        <TrendingUp className="h-8 w-8 text-emerald-600" />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 animate-slide-up">
        Analyzing Your Responses
      </h2>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 animate-fade-in">
        Preparing your personalized wealth protection strategy...
      </p>

      <LoadingAnimation />
    </div>
  );

  const renderVariantB = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">
        <div className="relative">
          <LineChart className="h-8 w-8 text-emerald-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/0 via-emerald-100/30 to-emerald-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 animate-slide-up">
        Calculating Your Safe Wealth Score
      </h2>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 animate-fade-in">
        Identifying opportunities to enhance your financial security...
      </p>

      <LoadingAnimation />
    </div>
  );

  const renderVariantC = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">
        <div className="relative">
          <BarChart3 className="h-8 w-8 text-emerald-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/0 via-emerald-100/30 to-emerald-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 animate-slide-up">
        Analyzing Your Financial DNA
      </h2>
      
      <p className="text-sm sm:text-base text-gray-600 mb-6 animate-fade-in">
        Creating your personalized wealth protection blueprint...
      </p>

      <LoadingAnimation />
    </div>
  );

  const renderCurrentVariant = () => {
    switch (abTestVariant) {
      case 'A':
        return renderVariantA();
      case 'B':
        return renderVariantB();
      case 'C':
        return renderVariantC();
      default:
        return renderVariantA();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-emerald-800 to-emerald-900">
      <header className="py-3 px-4 flex-none border-b border-emerald-700/30">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-200" />
            <span className="text-emerald-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {renderCurrentVariant()}
        </div>
      </main>

      <footer className="py-3 px-4 flex-none border-t border-emerald-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-4 w-4 text-emerald-200" />
            <span className="text-sm text-emerald-200">Secure Analysis in Progress</span>
          </div>
        </div>
      </footer>
    </div>
  );
}