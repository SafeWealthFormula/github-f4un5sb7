import { useEffect } from 'react';
import { Shield, Lock, TrendingUp, LineChart, BarChart3, Sparkles, Lightbulb, Wallet } from 'lucide-react';
import { useQuizStore } from '../store/quizStore';
import { Toggle } from './ui/Toggle';
import { LoadingAnimation } from './ui/LoadingAnimation';
import { PhasedLoadingAnimation } from './ui/PhasedLoadingAnimation';

export function QuizLoadingTransition() {
  const { setView, isKeyboardNavigation, abTestVariant, cycleVariant } = useQuizStore();

  const handleLoadingComplete = () => {
    setView('quiz');
  };

  const renderVariantA = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6 animate-pulse-gentle">
        <TrendingUp className="h-8 w-8 text-primary-600" />
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Analyzing Your Responses
      </h2>
      
      <p className="text-sm sm:text-base text-neutral-600 mb-6 animate-fade-in">
        Preparing your personalized wealth protection strategy...
      </p>

      <LoadingAnimation className="mx-auto" onComplete={handleLoadingComplete} />
    </div>
  );

  const renderVariantB = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <div className="relative">
          <LineChart className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/30 to-primary-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Calculating Your Safe Wealth Score
      </h2>
      
      <p className="text-sm sm:text-base text-neutral-600 mb-6 animate-fade-in">
        Identifying opportunities to enhance your financial security...
      </p>

      <LoadingAnimation className="mx-auto" onComplete={handleLoadingComplete} />
    </div>
  );

  const renderVariantC = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <div className="relative">
          <BarChart3 className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/30 to-primary-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Analyzing Your Financial DNA
      </h2>
      
      <p className="text-sm sm:text-base text-neutral-600 mb-6 animate-fade-in">
        Creating your personalized wealth protection blueprint...
      </p>

      <LoadingAnimation className="mx-auto" onComplete={handleLoadingComplete} />
    </div>
  );

  const renderVariantD = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <div className="relative">
          <Sparkles className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/30 to-primary-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Optimizing Your Strategy
      </h2>
      
      <p className="text-sm sm:text-base text-neutral-600 mb-6 animate-fade-in">
        Fine-tuning your personalized wealth acceleration plan...
      </p>

      <LoadingAnimation className="mx-auto" onComplete={handleLoadingComplete} />
    </div>
  );

  const renderVariantE = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <div className="relative">
          <Lightbulb className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/30 to-primary-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Preparing Your Extended Assessment
      </h2>

      <PhasedLoadingAnimation 
        className="mx-auto" 
        onComplete={handleLoadingComplete}
      />
    </div>
  );

  const renderVariantF = () => (
    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-6">
        <div className="relative">
          <Wallet className="h-8 w-8 text-primary-600 animate-pulse-gentle" />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-100/0 via-primary-100/30 to-primary-100/0 animate-shimmer" />
        </div>
      </div>
      
      <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
        Evaluating Your Wealth Protection
      </h2>

      <PhasedLoadingAnimation 
        phrases={[
          "Analyzing risk exposure levels...",
          "Identifying protection opportunities...",
          "Calculating safety metrics...",
          "Your protection analysis is ready."
        ]}
        className="mx-auto" 
        onComplete={handleLoadingComplete}
      />
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
      case 'D':
        return renderVariantD();
      case 'E':
        return renderVariantE();
      case 'F':
        return renderVariantF();
      default:
        return renderVariantA();
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <header className="py-3 px-4 flex-none border-b border-primary-700/30">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
          <Toggle
            checked={abTestVariant !== 'A'}
            onChange={cycleVariant}
            className="z-10"
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {renderCurrentVariant()}
        </div>
      </main>

      <footer className="py-3 px-4 flex-none border-t border-primary-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Lock className="h-4 w-4 text-primary-200" />
            <span className="text-sm text-primary-200">Secure Analysis in Progress</span>
          </div>
        </div>
      </footer>
    </div>
  );
}