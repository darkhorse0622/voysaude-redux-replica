
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';

const TestimonialSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Vera',
      subtitle: '-19kg em 1 ano',
      text: '"A gente quer emagrecer rápido, mas eu não adquiri o peso de um dia pro outro. Minha nutri Renata é maravilhosa e minha jornada foi cheia de descobertas. Quase desanimei por não ver resultados imediatos, e ela sugeriu que eu me medisse. Ao perceber a perda de centímetros, ganhei motivação! A mudança de hábitos é fundamental, me sinto mais ágil e feliz, até consegui cruzar as pernas! Sou muito grata à Voy pelo apoio."',
      beforeAfter: {
        before: '/lovable-uploads/faa08332-2d93-4b5d-9343-74caeb683afd.png',
        after: '/lovable-uploads/4fd69da2-cd9e-4b11-878b-5db2f798a04a.png',
        period: 'Dia 1',
        periodAfter: 'Mês 12'
      }
    },
    {
      id: 2,
      name: 'Carlos',
      subtitle: '8kg em 2 meses',
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
      text: 'Resultado surpreendente! A equipe me ajudou a criar hábitos sustentáveis que se encaixaram perfeitamente na minha rotina.',
      beforeAfter: {
        before: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face',
        after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face',
        period: 'Dia 1',
        periodAfter: 'Semana 3'
      }
    }
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-[rgb(41,8,82)] mb-4 text-center">
          A gente não vê a hora do seu antes e depois
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Veja os depoimentos de quem já transformou a vida com nosso acompanhamento personalizado.
        </p>
        
        <div className="max-w-4xl mx-auto">
          <Carousel setApi={setApi} className="relative">
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Testimonial text */}
                    <div className="bg-gray-50 rounded-2xl p-8">
                      <h3 className="text-xl font-bold text-[rgb(41,8,82)] mb-2">
                        {testimonial.name}, {testimonial.subtitle}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {testimonial.text}
                      </p>
                    </div>
                    
                    {/* Right side - Before/After images */}
                    <div className="flex gap-4">
                      <div className="flex-1 relative">
                        <img
                          src={testimonial.beforeAfter.before}
                          alt={`${testimonial.name} antes`}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {testimonial.beforeAfter.period}
                        </div>
                      </div>
                      <div className="flex-1 relative">
                        <img
                          src={testimonial.beforeAfter.after}
                          alt={`${testimonial.name} depois`}
                          className="w-full h-80 object-cover rounded-lg"
                        />
                        <div className="absolute bottom-3 left-3 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
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
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index + 1 === current ? 'bg-[rgb(41,8,82)]' : 'bg-gray-300'
                }`}
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
