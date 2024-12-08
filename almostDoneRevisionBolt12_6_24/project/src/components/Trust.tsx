import React from 'react';
import { Award, Users, Clock } from 'lucide-react';

export default function Trust() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Trusted by families and professionals to uncover risks and safeguard wealth
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            <Users className="w-12 h-12 text-emerald-600 mb-4" />
            <p className="text-4xl font-bold mb-2">10k+</p>
            <p className="text-gray-600">Families Protected</p>
          </div>
          <div className="flex flex-col items-center">
            <Clock className="w-12 h-12 text-emerald-600 mb-4" />
            <p className="text-4xl font-bold mb-2">10+</p>
            <p className="text-gray-600">Years Experience</p>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-12 h-12 text-emerald-600 mb-4" />
            <p className="text-4xl font-bold mb-2">98%</p>
            <p className="text-gray-600">Client Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
}