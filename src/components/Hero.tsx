
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-700 flex items-center pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Cuidamos de você e de todo resto
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-md">
              Encontre os produtos de nutrição certos. 
              Receba consultas qualificadas.
              Receba tudo para a construção de novos hábitos.
            </p>
            <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
              Comece sem compromisso
            </Button>
          </div>

          {/* Right Content - Images */}
          <div className="relative animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="bg-white text-orange-500 font-bold text-3xl px-4 py-2 rounded-lg">
                    voy
                  </div>
                </div>
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop&crop=face"
                    alt="Happy patient"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-gray-100 rounded-2xl overflow-hidden aspect-square">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop"
                    alt="Medical supplies"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
