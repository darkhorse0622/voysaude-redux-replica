
import React from 'react';

const TreatmentSection = () => {
  return (
    <section id="tratamentos" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <img src='/img/8.png' alt="Tratamentos" className="w-full h-auto rounded-lg shadow-lg animate-fade-in" />

          {/* Right - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-900">
              Tratamentos de acordo com as novas normas da ANVISA
            </h2>
            <div className="space-y-4 text-gray-600">
              <div className="flex items-start space-x-3">
                <img src='https://cdn.joinvoy.com/shared/icons/checkmark_circle.svg'/>
                <p>Consultas médicas com especialistas em nutrição</p>
              </div>
              <div className="flex items-start space-x-3">
                <img src='https://cdn.joinvoy.com/shared/icons/checkmark_circle.svg'/>
                <p>Medicamentos e suplementos de alta qualidade certificados</p>
              </div>
              <div className="flex items-start space-x-3">
                <img src='https://cdn.joinvoy.com/shared/icons/checkmark_circle.svg'/>
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
