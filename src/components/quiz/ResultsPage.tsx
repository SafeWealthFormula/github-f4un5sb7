import { Share2, Shield, ArrowRight } from 'lucide-react';
import { useQuizStore } from '../../store/quizStore';

export function ResultsPage() {
  const { setView } = useQuizStore();

  const handleConsultationRequest = () => {
    window.open('https://calendly.com/your-link', '_blank');
    setView('thank-you');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Safe Wealth Assessment',
        text: 'I discovered hidden opportunities in my financial strategy! Take this quick assessment to uncover yours:',
        url: window.location.href
      });
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-emerald-800 to-emerald-900">
      <header className="py-3 px-4 flex-none">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-200" />
            <span className="text-emerald-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center min-h-0 p-4 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl p-6 shadow-strong">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Your Financial Insights Are Ready!
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                Here's what we discovered about your financial strategy
              </p>
            </div>

            <div className="space-y-6 mb-8">
              <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-white border border-emerald-100">
                <h3 className="font-medium text-gray-900 mb-2">
                  Tax Optimization Strategy
                </h3>
                <p className="text-sm text-gray-600">
                  We've identified opportunities to enhance your tax efficiency through strategic planning and investment structures.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-white border border-emerald-100">
                <h3 className="font-medium text-gray-900 mb-2">
                  Retirement Account Optimization
                </h3>
                <p className="text-sm text-gray-600">
                  You may be missing out on valuable tax advantages by not utilizing retirement accounts effectively.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-emerald-50 to-white border border-emerald-100">
                <h3 className="font-medium text-gray-900 mb-2">
                  Legacy Planning
                </h3>
                <p className="text-sm text-gray-600">
                  Protecting your family's future through proper estate planning tools can provide peace of mind.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleConsultationRequest}
                className="group flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={handleShare}
                className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Assessment
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}