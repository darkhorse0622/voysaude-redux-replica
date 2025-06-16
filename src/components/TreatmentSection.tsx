
import React from 'react';

const TreatmentSection = () => {
  return (
    <section id="tratamentos" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-2xl px-4 py-2 rounded-lg inline-block mb-4">
                  voy
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-orange-100 h-8 rounded"></div>
                  <div className="bg-orange-200 h-8 rounded"></div>
                  <div className="bg-orange-300 h-8 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
              Tratamentos de acordo com as novas normas da ANVISA
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Consultas médicas com especialistas em nutrição</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Medicamentos e suplementos de alta qualidade certificados</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                <p>Acompanhamento contínuo do seu progresso</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentSection;
