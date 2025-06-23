
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CircleCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createClient } from '@typeform/api-client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const exceptItems = [
    {
      title: "Primeiros sinais",
      description: "1° a 3° mês (varia entre cada pessoa)",
      items: [
        {
          title: 'Início do tratamento',
          content: 'Se houver prescrição de medicamentos, os resultados devem surgir à medida que seu corpo se ajusta, podendo levar de 8 a 9 semanas para começarem os efeitos.',
        },
        {
          title: 'Consulta nutricional',
          content: 'Você faz uma consulta online com seu nutricionista e cria um plano personalizado. Depois, tem suporte online ilimitado pelo WhatsApp.',
        },
        {
          title: 'Introduzindo novos hábitos',
          content: 'Se estiver tomando medicação, com a fome mais controlada, ao final do 3o mês, é possível que seu corpo esteja familiarizado com seus novos hábitos.',
        }
      ]
    },
    {
      title: "Ajustes",
      description: "3° a 6° mês (varia entre cada pessoa)",
      items: [
        {
          title: 'Comece a ver resultados',
          content: 'Você pode perder até 10% do seu peso corporal até o final do 6° mês seguindo acompanhamento nutricional e medicamentos, caso prescritos.'
        },
        {
          title: 'Nova avaliação médica',
          content: 'Avalie suas metas e resultados. Se estiver tomando medicação, o médico ira entender se é o momento de readequar a dosagem de acordo com sua evolução no tratamento.',
        },
        {
          title: 'Consolide seus hábitos',
          content: 'Com seu corpo mais adaptado, o nutricionista irá te ajudar a firmar ainda mais seus novos hábitos alimentares para que durem por muito mais tempo.',
        }
      ]
    },
    {
      title: "Manutenção",
      description: "Geralmente a partir do 6° mês",
      items: [
        {
          title: 'Reavaliando o tratamento',
          content: 'Você continua a perder peso, mas já deve estar comemorando as conquistas. Momento ideal para o médico reavaliar o medicamento, caso esteja tomando.',
        },
        {
          title: 'Ajustes para o futuro',
          content: 'Com os novos hábitos adquiridos é hora de criar estratégias junto ao time para evitar recaídas e manter seu peso e saúde de forma duradoura.',
        },
        {
          title: 'Trabalhando a autonomia',
          content: 'Nesta altura, você provavelmente terá conhecido bem suas maiores forças e fraquezas, e estará mais confiante e preparada para seguir uma vida feliz.',
        }
      ]
    },
  ];

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

  const testimonials = [
    {
      id: 1,
      name: 'Nathalie',
      subtitle: '- 8,5kg em 2 meses',
      text: '“Conheci a Voy através de uma amiga que teve ótimos resultados. Foi a melhor decisão que tomei. Cheguei a pesar 92,3 kg, vivia cansada, sem vontade de fazer nada e com dores. Agora me sinto disposta, durmo melhor e meu humor melhorou. E minhas calças jeans voltaram a servir! Mudanças que vou levar a longo prazo porque foram personalizadas pra mim. Não só recomendaria a Voy, como já recomendei!”',
      beforeAfter: {
        before: '/img/3.jpg',
        after: '/img/7.jpg',
        period: 'Dia 1',
        periodAfter: 'Mês 12'
      }
    },
    {
      id: 2,
      name: 'Keila',
      subtitle: '- 6,5kg em 1 mês',
      text: '“Sempre quis ter hábitos saudáveis, mas com duas filhas era difícil encontrar uma dieta que encaixasse na rotina e que funcionasse também para elas, sem ser super restritiva. A nutricionista montou um cardápio super bacana e ilustrativo que facilitou muito! Hoje, lido melhor com a compulsão e me sinto disposta para me exercitar. Isso melhorou meu tempo em família, e minhas filhas estão felizes com as mudanças!”',
      beforeAfter: {
        before: '/img/6.jpg',
        after: '/img/2.jpg',
        period: 'Dia 2',
        periodAfter: 'Mês 2'
      }
    },
    {
      id: 3,
      name: 'Nathalie',
      subtitle: '- 8,5kg em 2 meses',
      text: '“Conheci a Voy através de uma amiga que teve ótimos resultados. Foi a melhor decisão que tomei. Cheguei a pesar 92,3 kg, vivia cansada, sem vontade de fazer nada e com dores. Agora me sinto disposta, durmo melhor e meu humor melhorou. E minhas calças jeans voltaram a servir! Mudanças que vou levar a longo prazo porque foram personalizadas pra mim. Não só recomendaria a Voy, como já recomendei!”',
      beforeAfter: {
        before: '/img/4.jpg',
        after: '/img/8.png',
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
    <div className="min-h-screen bg-background text-primary mt-8">
      <Header />
      
      {/* Header */}
      <main>
        {/* Hero Section */}
        <section className="min-h-screen bg-primary flex items-center pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                  Cuidamos de você e de todo resto
                </h1>
                <ol className="pl-5 text-md md:text-lg opacity-90 max-w-md font-bold">
                  <li className="mb-2 flex gap-4 items-center">
                    <Check className='w-4'/><span>Renovação periódica da avaliação médica</span>
                  </li>
                  <li className="mb-2  flex gap-4 items-center">
                    <Check className='w-4'/><span>Suporte diário de especialistas</span>
                  </li>
                  <li className="mb-2  flex gap-4 items-center">
                    <Check className='w-4'/><span>Nutrição para a construção de novos hábitos</span>
                  </li>
                </ol>
                <Button className="bg-orange-500 hover:bg-orange-400 text-primary px-16 py-6 text-md font-bold rounded-lg transform hover:scale-105 transition-all duration-200 max-md:w-full">
                  Funciona para mim?
                </Button>
              </div>
              <div className="animate-fade-in my-8">
                <img src='/img/1.webp' alt="Hero Image" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Section */}
        <section id="tratamentos" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <img src='/img/8.png' alt="Tratamentos" className="w-full max-lg:h-auto h-full rounded-lg shadow-lg animate-fade-in" />
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary leading-loose">
                  Tratamentos de acordo com as novas normas da ANVISA
                </h2>
                <div className="space-y-4 text-primary0">
                  <div className="flex items-start space-x-3">
                    <CircleCheck/>
                    <p>Consultas médicas com especialistas em nutrição</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CircleCheck/>
                    <p>Medicamentos e suplementos de alta qualidade certificados</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CircleCheck/>
                    <p>Acompanhamento contínuo do seu progresso</p>
                  </div>
                </div>
                <p className='text-sm'>¹Os tratamentos são realizados apenas quando há prescrição médica, e são adquiridos em farmácias parceiras com retenção da receita.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Expectation Section */}
        <section id="resultados" className="py-16">
          <div className="container px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
              O que esperar
            </h2>
            {exceptItems.map((item, index) => (
              <div key={index} className="mb-12 grid grid-cols-2 md:grid-cols-1 lg:grid-cols-3  gap-4 bg-gray-100 rounded-lg p-8">
                <div className='col-span-1'>
                  <h3 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="mb-4">{ item.description }</p>
                </div>
                <div className='col-span-1 lg:col-span-2 border-t-2 border-primary'>
                  <Accordion type="single" collapsible>
                    {item.items.map((subItem, subIndex) => (
                      <AccordionItem key={subIndex} value={`item-${index}-${subIndex}`}>
                        <AccordionTrigger className="py-4 text-left text-primary font-medium hover:no-underline">
                          <p className='gap-2 flex text-sm font-bold'><span><ArrowRight/></span>{subItem.title}</p>
                        </AccordionTrigger>
                        <AccordionContent className="pb-4">
                          {subItem.content}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-8 bg-gray-100">
          <div className="container px-4 sm:px-6 lg:px-8">
            <span className='text-primary text-xs font-bold'>IMPACTO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">
              Os resultados falam por eles mesmos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-gray-200 rounded-2xl p-8 duration-300 shadow-lg">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-4">
                    {stat.percentage}
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    {stat.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
            <p className='mt-8  text-xs'>
              ¹ Fonte: NEJM ² Baseado em uma pesquisa com 215 pacientes ativos, fevereiro de 2023
            </p>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <span className='text-primary text-xs font-bold'>IMPACTO</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              A gente não vê a hora do seu antes e depois
            </h2>
            
            <div className="mx-auto pt-4">
              <Carousel setApi={ setApi }>
                <CarouselPrevious className="top-0 left-auto text-lg right-16 max-md:hidden" />
                <CarouselNext className="top-0 right-4  max-md:hidden"/>
                <CarouselContent className='mt-8'>
                  {testimonials.map((testimonial) => (
                    <CarouselItem key={testimonial.id}>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="bg-gray-50 rounded-2xl p-8 order-2">
                          <h3 className="text-xl text-primary mb-8">
                            {testimonial.name}, {testimonial.subtitle}
                          </h3>
                          <p className="text-primary leading-relaxed">
                            {testimonial.text}
                          </p>
                        </div>
                        
                        <div className="flex gap-4">
                          <div className="flex-1 relative">
                            <img
                              src={testimonial.beforeAfter.before}
                              alt={`${testimonial.name} antes`}
                              className="w-full h-80 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-3 left-3 bg-green-300 text-primary px-3 py-1 rounded-sm text-sm font-medium">
                              {testimonial.beforeAfter.period}
                            </div>
                          </div>
                          <div className="flex-1 relative">
                            <img
                              src={testimonial.beforeAfter.after}
                              alt={`${testimonial.name} depois`}
                              className="w-full h-80 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-3 left-3 bg-green-300 text-primary px-3 py-1 rounded-sm text-sm font-medium">
                              {testimonial.beforeAfter.periodAfter}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
              
              <div className="flex justify-center mt-8 space-x-2  max-md:hidden">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index + 1 === current ? 'bg-primary' : 'bg-white border border-primary'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
            <p className='mt-8 mb-16 text-xs'>
              ¹ Fonte: NEJM ² Baseado em uma pesquisa com 215 pacientes ativos, fevereiro de 2023
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-28 rounded-t-3xl bg-gradient-to-b from-primary #a44730 to-orange-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-2xl mx-auto text-white space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold">
                Prora para sem burocracia
              </h2>
              <p className="text-lg opacity-90">
              Alcance seu peso ideal com planos seguros, 100% online, e com acompanhamento profissional em todas as etapas.
              </p>
              <div className='mx-auto max-w-xs'>
                <Button variant='outline' className="w-full border-2 bg-transparent hover:bg-orange-100/25 hover:text-white text-white px-8 py-8 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
                  Começar avaliação
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default Dashboard;
