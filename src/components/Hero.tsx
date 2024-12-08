import React from 'react';
import QuizButton from './QuizButton';

export default function Hero() {
  return (
    <section className="min-h-screen relative flex items-center pt-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5"></div>
      
      <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
          Most Financial Plans Have Hidden Gaps—
          <span className="text-emerald-600">Does Yours?</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Discover what's working, what's vulnerable, and what you might be missing. 
          Take the 2-minute quiz to uncover your Safe Wealth Score. 
          <span className="font-semibold">Your financial legacy could depend on it.</span>
        </p>

        <QuizButton />
        
        <div className="mt-8 flex items-center justify-center gap-2">
          <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-emerald-500 rounded-full"></div>
          </div>
          <span className="text-sm text-gray-600">Only 2 minutes</span>
        </div>
      </div>
    </section>
  );
}