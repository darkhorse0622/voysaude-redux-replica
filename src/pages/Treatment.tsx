
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CircleCheck, ChevronDown, Users, Clock, Shield, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Treatment = () => {
  const treatmentOptions = [
    {
      title: "Investigação",
      description: "Analisamos seu histórico médico completo",
      icon: "🔍",
      items: [
        "Análise de exames laboratoriais",
        "Histórico médico detalhado",
        "Avaliação de medicamentos atuais"
      ]
    },
    {
      title: "Prescrição",
      description: "Medicamentos personalizados para seu caso",
      icon: "💊",
      items: [
        "Medicamentos certificados pela ANVISA",
        "Dosagem personalizada",
        "Acompanhamento médico contínuo"
      ]
    },
    {
      title: "Entregamos & acompanhamos",
      description: "Suporte completo durante todo o tratamento",
      icon: "🚛",
      items: [
        "Entrega rápida em casa",
        "Acompanhamento semanal",
        "Ajustes quando necessário"
      ]
    }
  ];

  const medicalApproach = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Médicos",
      description: "Equipe especializada em emagrecimento e saúde metabólica com anos de experiência."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Consultoria",
      description: "Acompanhamento contínuo durante todo o processo de tratamento."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança",
      description: "Todos os medicamentos são certificados e seguem as normas da ANVISA."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Suporte não-clínico",
      description: "Apoio emocional e nutricional para garantir o sucesso do tratamento."
    }
  ];

  const scienceStats = [
    {
      percentage: "97%",
      title: "Dos pacientes perdem peso",
      description: "Com acompanhamento médico adequado"
    },
    {
      percentage: "15kg",
      title: "Perda média de peso",
      description: "Nos primeiros 6 meses de tratamento"
    },
    {
      percentage: "92%",
      title: "Satisfação dos pacientes",
      description: "Avaliam positivamente o tratamento"
    }
  ];

  const faqItems = [
    {
      question: "Quais são os efeitos colaterais dos medicamentos?",
      answer: "Os medicamentos prescritos podem ter efeitos colaterais leves como náusea, dor de cabeça ou tontura. Nossos médicos fazem um acompanhamento rigoroso para minimizar qualquer desconforto."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "A maioria dos pacientes começa a ver resultados nas primeiras 2-4 semanas. Resultados significativos são observados entre 8-12 semanas de tratamento contínuo."
    },
    {
      question: "Preciso fazer dieta rigorosa?",
      answer: "Não recomendamos dietas restritivas. Nosso foco é na criação de hábitos alimentares saudáveis e sustentáveis a longo prazo, com orientação nutricional personalizada."
    },
    {
      question: "O que acontece se eu parar o tratamento?",
      answer: "O tratamento deve ser descontinuado gradualmente sob supervisão médica. Mantemos o acompanhamento para garantir que os hábitos saudáveis sejam mantidos."
    },
    {
      question: "Quais exames são necessários?",
      answer: "Solicitamos exames básicos como hemograma, glicemia, função hepática e renal. Exames adicionais podem ser necessários dependendo do seu histórico médico."
    },
    {
      question: "Como funciona a consulta online?",
      answer: "As consultas são realizadas por videochamada em nossa plataforma segura. Você pode agendar nos horários disponíveis e ter acesso completo ao seu médico."
    },
    {
      question: "Quanto custa o tratamento?",
      answer: "O investimento varia de acordo com o plano escolhido. Oferecemos opções flexíveis de pagamento e planos que se adequam a diferentes orçamentos."
    },
    {
      question: "Como é feita a entrega dos medicamentos?",
      answer: "Os medicamentos são enviados diretamente para sua casa através de farmácias parceiras credenciadas, com entrega rápida e segura."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header/>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-primary flex items-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Com a receita, o seu tratamento chega até você
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg">
                Medicamentos certificados, entrega rápida e acompanhamento médico especializado.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-500 hover:bg-orange-400 text-primary px-8 py-6 text-lg font-bold rounded-lg">
                  Começar tratamento
                </Button>
                <Button variant="outline" className="bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-6 text-lg">
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <img src='/img/1.webp' alt="Tratamento" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Tratamentos seguros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Seguimos rigorosamente as normas da ANVISA para garantir sua segurança
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentOptions.map((option, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-6">{option.description}</p>
                <ul className="space-y-2">
                  {option.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLP-1 Information Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                O que são os tratamentos com GLP-1?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Os medicamentos GLP-1 são uma classe de medicamentos que imitam um hormônio natural do corpo. Eles ajudam a regular o açúcar no sangue e promovem a sensação de saciedade.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CircleCheck className="text-green-500 mt-1" />
                  <p>Aprovados pela ANVISA para tratamento de diabetes e obesidade</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CircleCheck className="text-green-500 mt-1" />
                  <p>Reduzem significativamente o apetite e a fome</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CircleCheck className="text-green-500 mt-1" />
                  <p>Melhoram o controle glicêmico e a sensibilidade à insulina</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-100 rounded-2xl p-8">
              <img src='/img/8.png' alt="Medicamento GLP-1" className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Medical Approach Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Faça uma avaliação médica e tenha o diagnóstico certo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa equipe multidisciplinar garante o melhor cuidado para você
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicalApproach.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Stats Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className='text-primary text-xs font-bold'>POR TRÁS DA CIÊNCIA</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Em quanto tempo o médico pode prescrever medicamentos
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scienceStats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg">
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
          <p className='mt-8 text-xs text-center'>
            ¹ Fonte: NEJM ² Baseado em uma pesquisa com 215 pacientes ativos, fevereiro de 2023
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="/img/3.jpg"
                alt="Paciente satisfeita"
                className="w-full h-96 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-lg p-4 shadow-lg">
                <p className="font-bold text-primary">Maria Silva</p>
                <p className="text-sm text-gray-600">Perdeu 12kg em 4 meses</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                As respostas para todas as suas perguntas
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "O tratamento mudou minha vida. Não apenas perdi peso, mas ganhei confiança e melhorei minha saúde geral. A equipe médica me acompanhou em cada passo do processo."
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <span className="text-gray-600">5.0 de 5 estrelas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Perguntas frequentes
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tire todas suas dúvidas sobre nossos tratamentos
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="py-6 text-left text-primary font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-700">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-28 bg-gradient-to-b from-primary to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              É hoje o seu primeiro passo
            </h2>
            <p className="text-lg opacity-90">
              Comece sua jornada para uma vida mais saudável com acompanhamento médico especializado
            </p>
            <div className='mx-auto max-w-xs'>
              <Button variant='outline' className="w-full border-2 bg-transparent hover:bg-orange-100/25 hover:text-white text-white px-8 py-8 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
                Iniciar tratamento
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Treatment;
