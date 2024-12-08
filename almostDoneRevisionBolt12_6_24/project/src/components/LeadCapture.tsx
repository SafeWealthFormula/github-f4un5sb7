import { useState } from 'react';
import { ArrowRight, Shield, Lock } from 'lucide-react';
import { Button } from './ui/Button';
import { useQuizStore } from '../store/quizStore';
import { useQuizSubmission } from '../hooks/useQuizSubmission';
import { generateUUID } from '../utils/uuid';

export function LeadCapture() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { userAnswers, quizType, setView } = useQuizStore();
  const { submitQuiz, isSubmitting, error } = useQuizSubmission();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const userId = generateUUID(); // In a real app, this would come from auth
      await submitQuiz(userId, userAnswers, {
        email,
        phone,
        quizType
      });
      
      setView('results');
    } catch (err) {
      // Error is handled by the hook and displayed below
      console.error('Failed to submit quiz:', err);
    }
  };

  const handleSkip = () => {
    setView('results');
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

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-xl">
          <div className="bg-white rounded-xl p-6 shadow-strong">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 mb-4">
                <Lock className="h-6 w-6 text-primary-600" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">
                Your Results Are Almost Ready!
              </h2>
              <p className="text-sm sm:text-base text-neutral-600">
                Enter your contact information to receive your personalized insights and claim your free consultation.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Enter your email"
                />
                <p className="mt-1.5 text-xs text-neutral-500">
                  Receive your detailed report with personalized recommendations
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary text-sm"
                  placeholder="Enter your phone number"
                />
                <p className="mt-1.5 text-xs text-neutral-500">
                  Get priority access to your free consultation
                </p>
              </div>

              {error && (
                <p className="text-sm text-red-600 animate-fade-in">
                  {error}
                </p>
              )}

              <div className="pt-4 space-y-3">
                <Button 
                  type="submit"
                  className="w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save & View Results'}
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={handleSkip}
                  className="w-full"
                  disabled={isSubmitting}
                >
                  Skip & View Results
                </Button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-neutral-100">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-neutral-500">
                  Your information is secure and will never be shared. By continuing, you agree to receive your personalized financial analysis and consultation offer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}