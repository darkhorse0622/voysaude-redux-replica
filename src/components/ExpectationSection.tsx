
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const ExpectationSection = () => {
  const accordionItems = [
    {
      id: 'inicio-tratamento',
      title: 'Início do tratamento',
      content: 'Avaliação inicial completa e início do seu plano personalizado de tratamento.',
    },
    {
      id: 'consulta-nutricional',
      title: 'Consulta nutricional',
      content: 'Você faz uma consulta online com seu nutricionista e cria um plano personalizado. Depois, tem suporte online ilimitado pelo WhatsApp.',
    },
    {
      id: 'introduzindo-habitos',
      title: 'Introduzindo novos hábitos',
      content: 'Implementação gradual de novos hábitos alimentares e de estilo de vida sustentáveis.',
    }
  ];

  return (
    <section id="resultados" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Title and description */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[rgb(41,8,82)] mb-6">
              Primeiros sinais
            </h2>
            <p className="text-gray-600 text-lg">
              1º a 3º mês (varia entre cada pessoa)
            </p>
          </div>
          
          {/* Right side - Accordion */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Accordion type="single" collapsible defaultValue="consulta-nutricional">
              {accordionItems.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-b border-gray-200 last:border-b-0">
                  <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 text-[rgb(41,8,82)] font-medium">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-gray-600">
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpectationSection;
