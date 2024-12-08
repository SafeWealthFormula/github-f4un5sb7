import { ArrowRight, Shield, ChevronRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';

export function QuizExpansionPrompt() {
  const { setQuizType } = useQuizStore();

  const handleExpand = () => {
    setQuizType('extended');
  };

  const handleSkip = () => {
    setQuizType('standard');
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <header className="py-3 px-4 flex-none border-b border-primary-700/30">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
                Unlock Bonus Insights Into Your Financial Picture
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 animate-fade-in">
                Discover deeper strategies and opportunities tailored to your unique situation
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-lg bg-primary-50 border border-primary-100 animate-fade-in delay-100">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Advanced Tax Strategies</h3>
                    <p className="text-sm text-neutral-600">
                      Uncover opportunities to optimize your tax efficiency and keep more of what you earn
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary-50 border border-primary-100 animate-fade-in delay-200">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Estate Planning Insights</h3>
                    <p className="text-sm text-neutral-600">
                      Learn how to better protect your legacy and ensure your family's financial security
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-primary-50 border border-primary-100 animate-fade-in delay-300">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Investment Portfolio Analysis</h3>
                    <p className="text-sm text-neutral-600">
                      Get a detailed review of your diversification strategy and potential improvements
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExpand}
                className="group flex-1"
              >
                Yes, Show Me More Insights
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSkip}
                className="flex-1"
              >
                No, Take Me to My Results
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 flex-none border-t border-primary-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-primary-200" />
            <span className="text-sm text-primary-200">Your insights are protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}