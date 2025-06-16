
import React from 'react';

const StatsSection = () => {
  const stats = [
    {
      percentage: '15-20%',
      title: 'Perda de peso corporal',
      description: 'Redução média de peso corporal nos primeiros 3 meses com nosso protocolo personalizado.'
    },
    {
      percentage: '97%',
      title: 'Aumento da confiança',
      description: 'Dos pacientes relatam maior autoestima e confiança após o tratamento.'
    },
    {
      percentage: '97%',
      title: 'Melhora na saúde geral',
      description: 'Melhora significativa nos exames de saúde geral e bem-estar.'
    }
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-12 text-center">
          Os resultados falam por eles mesmos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">
                {stat.percentage}
              </div>
              <h3 className="text-xl font-semibold text-purple-900 mb-3">
                {stat.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
