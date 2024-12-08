import { ArrowRight, Shield, ChevronRight, TrendingUp, Lock, LineChart } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';

export function QuizExpansionPromptB() {
  const setQuizType = useQuizStore((state) => state.setQuizType);
  const setView = useQuizStore((state) => state.setView);
  const setUserInfo = useQuizStore((state) => state.setUserInfo);

  const handleExpand = () => {
    setQuizType('standard');
    setView('loading');
  };

  const handleSkip = () => {
    setUserInfo({ showLeadCapture: true });
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
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mb-4">
                <Lock className="h-8 w-8 text-primary-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3 animate-slide-up">
                Premium Insights Available
              </h2>
              <p className="text-sm sm:text-base text-neutral-600 animate-fade-in">
                We've identified opportunities to maximize your wealth protection strategy
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-lg bg-gradient-to-br from-primary-50 to-white border border-primary-100 animate-fade-in delay-100">
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Growth Optimization</h3>
                    <p className="text-sm text-neutral-600">
                      Custom strategies to accelerate your wealth accumulation
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-primary-50 to-white border border-primary-100 animate-fade-in delay-200">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Risk Analysis</h3>
                    <p className="text-sm text-neutral-600">
                      Identify and mitigate potential threats to your wealth
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-primary-50 to-white border border-primary-100 animate-fade-in delay-300">
                <div className="flex items-start gap-3">
                  <LineChart className="h-5 w-5 text-primary-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">Market Insights</h3>
                    <p className="text-sm text-neutral-600">
                      Expert analysis of market trends affecting your portfolio
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative p-4 rounded-lg bg-neutral-100 border border-neutral-200 animate-fade-in delay-400">
                <div className="absolute inset-0 bg-neutral-900/5 backdrop-blur-[1px] rounded-lg"></div>
                <div className="relative flex items-start gap-3 opacity-50">
                  <Lock className="h-5 w-5 text-neutral-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">More Features</h3>
                    <p className="text-sm text-neutral-600">
                      Unlock additional insights with the extended assessment
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleExpand}
                className="group flex-1 bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700"
              >
                Unlock Premium Insights
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleSkip}
                className="flex-1"
              >
                Continue with Basic Results
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-3 px-4 flex-none border-t border-primary-700/30">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-4 w-4 text-primary-200" />
            <span className="text-sm text-primary-200">256-bit encrypted | Bank-level security</span>
          </div>
        </div>
      </footer>
    </div>
  );
}