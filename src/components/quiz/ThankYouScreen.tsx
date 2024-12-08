import { Shield, ArrowRight } from 'lucide-react';

export function ThankYouScreen() {
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

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl p-8 shadow-strong text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-6">
              <Shield className="h-8 w-8 text-emerald-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">
              We're preparing your personalized financial insights. Check your email shortly for your detailed report and consultation details.
            </p>

            <a 
              href="/"
              className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
            >
              Return to Homepage
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}