import React from 'react';
import QuizButton from './QuizButton';

export default function Footer() {
  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Don't Leave Your Future to Chance
        </h2>
        <p className="text-gray-300 mb-8 text-lg">
          Every moment your plan has hidden gaps, your wealth is at risk. 
          You owe it to yourself—take the quiz and protect your future.
        </p>
        <QuizButton />
        <p className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} Safe Wealth Formula. All rights reserved.
        </p>
      </div>
    </section>
  );
}