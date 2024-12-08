import { ArrowRight, Shield, ChevronRight } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export function QuizExpansionPrompt() {
  const { setQuizType, setView } = useQuizStore();

  const handleExpand = () => {
    setQuizType('extended');
    setView('loading');
  };

  const handleSkip = () => {
    setView('lead-capture');
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
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-strong border border-white/10">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 animate-slide-up">
                Unlock Deeper Financial Insights
              </h2>
              <p className="text-sm sm:text-base text-gray-600 animate-fade-in">
                We've identified opportunities to maximize your wealth protection strategy
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 animate-fade-in delay-100">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Advanced Tax Strategies</h3>
                    <p className="text-sm text-gray-600">
                      Uncover opportunities to optimize your tax efficiency and keep more of what you earn
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 animate-fade-in delay-200">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Estate Planning Insights</h3>
                    <p className="text-sm text-gray-600">
                      Learn how to better protect your legacy and ensure your family's financial security
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 animate-fade-in delay-300">
                <div className="flex items-start gap-3">
                  <ChevronRight className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Investment Portfolio Analysis</h3>
                    <p className="text-sm text-gray-600">
                      Get a detailed review of your diversification strategy and potential improvements
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleExpand}
                className="group flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                Show Me More Insights
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleSkip}
                className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Continue with Basic Results
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 flex-none border-t border-emerald-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-emerald-200" />
            <span className="text-sm text-emerald-200">Your insights are protected</span>
          </div>
        </div>
      </footer>
    </div>
  );
}