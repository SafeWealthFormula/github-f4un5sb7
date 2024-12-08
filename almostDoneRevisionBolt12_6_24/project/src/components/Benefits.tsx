import React from 'react';
import { Shield, TrendingUp, AlertTriangle } from 'lucide-react';

const benefits = [
  {
    icon: Shield,
    title: "Protection Status",
    description: "Discover if your wealth is truly protected from market volatility and economic shifts"
  },
  {
    icon: AlertTriangle,
    title: "Risk Assessment",
    description: "Identify hidden risks that could threaten your financial future before it's too late"
  },
  {
    icon: TrendingUp,
    title: "Action Plan",
    description: "Get clear, actionable steps you can take today to safeguard your hard-earned wealth"
  }
];

export default function Benefits() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
            You've worked hard to build your wealth. But inflation, taxes, and market volatility could quietly be eroding it faster than you realize. Most financial plans have gaps that only become clear when it's too late.
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center mb-12">
          In just 2 minutes, this quiz will show you:
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
              <benefit.icon className="w-10 h-10 text-emerald-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}