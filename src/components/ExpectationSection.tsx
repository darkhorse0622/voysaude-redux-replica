
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ExpectationSection = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>('primeiros-sinais');

  const accordionItems = [
    {
      id: 'primeiros-sinais',
      title: 'Primeiros sinais',
      content: 'Os primeiros resultados podem ser observados dentro de 2-3 semanas com o protocolo adequado.',
      timeframe: 'Primeira semana'
    },
    {
      id: 'ajustes',
      title: 'Ajustes',
      content: 'Ajustes personalizados no seu plano de tratamento baseados na sua resposta individual.',
      timeframe: 'Primeiras 4 semanas'
    },
    {
      id: 'manutencao',
      title: 'Manutenção',
      content: 'Estabelecimento de hábitos sustentáveis para manter os resultados a longo prazo.',
      timeframe: 'A partir do 2º mês'
    }
  ];

  return (
    <section id="resultados" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-8 text-center">
            O que esperar
          </h2>
          
          <div className="space-y-4">
            {accordionItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                >
                  <div>
                    <h3 className="font-semibold text-purple-900">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.timeframe}</p>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      openAccordion === item.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openAccordion === item.id && (
                  <div className="px-6 pb-4 text-gray-600 animate-accordion-down">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectationSection;
