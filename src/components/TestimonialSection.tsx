
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Keila',
      subtitle: '6,5kg em 1 mês',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'Sempre quis ter hábitos saudáveis, mas com duas filhas era difícil encontrar uma dieta que encaixasse na rotina e que funcionasse também para elas, sem ser super restritiva. A nutricionista montou um cardápio super bacana e ilustrativo que facilitou muito! Hoje, lido melhor com a compulsão e me sinto disposta para me exercitar. Isso melhorou meu tempo em família, e minhas filhas estão felizes com as mudanças!',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop&crop=face',
        period: 'Dia 1',
        periodAfter: 'Mês 1'
      }
    },
    {
      id: 2,
      name: 'Carlos',
      subtitle: '8kg em 2 meses',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'Profissionais muito qualificados e um atendimento humanizado. O acompanhamento foi fundamental para manter a motivação.',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face',
        period: 'Dia 1',
        periodAfter: 'Mês 2'
      }
    },
    {
      id: 3,
      name: 'Ana',
      subtitle: '5kg em 3 semanas',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      text: 'Resultado surpreendente! A equipe me ajudou a criar hábitos sustentáveis que se encaixaram perfeitamente na minha rotina.',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face',
        period: 'Dia 1',
        periodAfter: 'Semana 3'
      }
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-900 mb-4 text-center">
          A gente não vê a hora do seu antes e depois
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Veja os depoimentos de quem já transformou a vida com nosso acompanhamento personalizado.
        </p>
        
        <div className="max-w-6xl mx-auto">
          <Carousel className="relative">
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-gray-50 rounded-2xl p-6 h-full flex flex-col">
                    
                    
                    <div className="flex gap-4 mt-auto">
                      <div className="flex-1 relative">
                        <img
                          src={testimonial.beforeAfter.before}
                          alt={`${testimonial.name} antes`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                          {testimonial.beforeAfter.period}
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <img
                          src={testimonial.beforeAfter.after}
                          alt={`${testimonial.name} depois`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-2 left-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
                          {testimonial.beforeAfter.periodAfter}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
