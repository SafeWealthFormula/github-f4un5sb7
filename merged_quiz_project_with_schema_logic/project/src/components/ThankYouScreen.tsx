import React from 'react';

export function ThankYouScreen() {
  return (
    <section className="h-[100dvh] bg-gradient-to-b from-gray-50 to-white flex items-center">
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
        <p className="text-sm sm:text-base text-gray-600">
          We're preparing your personalized financial insights. Check your email shortly for your detailed report.
        </p>
      </div>
    </section>
  );
}