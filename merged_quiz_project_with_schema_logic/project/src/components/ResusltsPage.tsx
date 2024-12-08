import { Share2, Shield, ArrowRight } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';
import { generateRecommendations } from '../utils/recommendationUtils';

export function ResultsPage() {
  const { quizType, userAnswers, userInfo } = useQuizStore();
  const recommendations = generateRecommendations(quizType, userAnswers);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Safe Wealth Assessment',
        text: 'I discovered hidden opportunities in my financial strategy! Take this quick assessment to uncover yours:',
        url: window.location.href
      });

      
  
      
      // Here you would typically trigger your consultation scheduling flow
      window.open('https://calendly.com/your-link', '_blank');
    } catch (err) {
      console.error('Failed to track consultation request:', err);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col bg-gradient-to-b from-primary-800 to-primary-900">
      <header className="py-3 px-4 flex-none">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary-200" />
            <span className="text-primary-100 text-sm font-medium">Safe Wealth Assessment</span>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center min-h-0 p-4 overflow-y-auto">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl p-6 shadow-strong">
            <div className="text-center mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-3">
                Your Financial Insights Are Ready!
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Here's what we discovered about your financial strategy
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-white border border-primary-100"
                >
                  <h3 className="font-medium text-neutral-800 mb-2">
                    {rec.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {rec.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={handleConsultationRequest}
                className="group flex-1"
              >
                Schedule Free Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                variant="secondary"
                onClick={handleShare}
                className="flex-1"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share Assessment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}