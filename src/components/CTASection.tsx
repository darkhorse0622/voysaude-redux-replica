
import React from 'react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 via-purple-800 to-orange-500">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto text-white space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Prora para sem burocracia
          </h2>
          <p className="text-lg opacity-90">
            Comece seu tratamento personalizado hoje mesmo. 
            Nossa equipe está pronta para cuidar de você.
          </p>
          <Button className="bg-white text-purple-900 hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
            Comece sem compromisso
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
