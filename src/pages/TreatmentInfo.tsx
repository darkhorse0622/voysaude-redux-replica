
import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, CircleCheck, ChevronDown, Users, Clock, Shield, Heart, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const TreatmentInfo = () => {
  const treatmentProcess = [
    {
      title: "Investigação",
      description: "Analisamos seu histórico médico completo para entender suas necessidades específicas",
      icon: "🔍",
      details: [
        "Análise detalhada do histórico médico",
        "Avaliação de exames laboratoriais",
        "Identificação de fatores de risco",
        "Personalização do tratamento"
      ]
    },
    {
      title: "Prescrição",
      description: "Medicamentos personalizados e certificados pela ANVISA",
      icon: "💊",
      details: [
        "Medicamentos GLP-1 certificados",
        "Dosagem personalizada",
        "Orientações detalhadas de uso",
        "Monitoramento de efeitos"
      ]
    },
    {
      title: "Acompanhamento",
      description: "Suporte médico contínuo durante todo seu tratamento",
      icon: "📋",
      details: [
        "Consultas regulares com especialistas",
        "Ajustes de medicação quando necessário",
        "Suporte nutricional personalizado",
        "Monitoramento de resultados"
      ]
    }
  ];

  const medicalApproach = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Análise",
      subtitle: "Investigação médica",
      description: "Nossa equipe analisa seu histórico médico completo para criar um plano personalizado."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Prescrição",
      subtitle: "Medicamentos seguros",
      description: "Prescrevemos medicamentos certificados pela ANVISA, adequados ao seu perfil."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Segurança",
      subtitle: "Acompanhamento contínuo",
      description: "Monitoramento médico constante para garantir segurança e eficácia."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Suporte",
      subtitle: "Apoio integral",
      description: "Equipe multidisciplinar disponível para apoiar sua jornada."
    }
  ];

  const scienceStats = [
    {
      percentage: "97%",
      title: "Taxa de sucesso",
      description: "Dos pacientes alcançam seus objetivos de perda de peso",
      icon: "📊"
    },
    {
      percentage: "15kg",
      title: "Perda média",
      description: "Perda média de peso nos primeiros 6 meses",
      icon: "⚖️"
    },
    {
      percentage: "92%",
      title: "Satisfação",
      description: "Dos pacientes recomendam nosso tratamento",
      icon: "⭐"
    }
  ];

  const faqItems = [
    {
      question: "Como funciona o tratamento com GLP-1?",
      answer: "Os medicamentos GLP-1 imitam um hormônio natural que regula o açúcar no sangue e promove saciedade. Eles ajudam a controlar o apetite e melhoram o metabolismo, resultando em perda de peso gradual e sustentável."
    },
    {
      question: "Quanto tempo leva para ver resultados?",
      answer: "A maioria dos pacientes começa a notar resultados nas primeiras 2-4 semanas. Resultados significativos são observados entre 8-12 semanas de tratamento contínuo com acompanhamento médico."
    },
    {
      question: "Quais são os efeitos colaterais?",
      answer: "Os efeitos colaterais mais comuns são leves e incluem náusea, dor de cabeça ou tontura. Nossos médicos fazem acompanhamento rigoroso para minimizar qualquer desconforto."
    },
    {
      question: "Preciso fazer dieta restritiva?",
      answer: "Não recomendamos dietas restritivas. Nosso foco é na criação de hábitos alimentares saudáveis e sustentáveis, com orientação nutricional personalizada."
    },
    {
      question: "Como é feito o acompanhamento médico?",
      answer: "Realizamos consultas regulares por videochamada, monitoramento de exames e ajustes de medicação quando necessário. Nossa equipe está sempre disponível para suporte."
    },
    {
      question: "Qual é o investimento do tratamento?",
      answer: "O investimento varia conforme o plano escolhido. Oferecemos opções flexíveis de pagamento que se adequam a diferentes orçamentos, sempre com transparência total."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-primary">
      <Header/>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-primary to-purple-900 flex items-center pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Com a receita, o seu tratamento chega até você
              </h1>
              <p className="text-lg md:text-xl opacity-90 max-w-lg leading-relaxed">
                Medicamentos certificados pela ANVISA, entrega segura em casa e acompanhamento médico especializado para sua jornada de emagrecimento.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-500 hover:bg-orange-400 text-primary px-8 py-6 text-lg font-bold rounded-lg transform hover:scale-105 transition-all duration-200">
                  Começar tratamento
                </Button>
                <Button variant="outline" className="bg-transparent hover:bg-white/10 border-2 border-white text-white px-8 py-6 text-lg">
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="animate-fade-in">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-8 shadow-2xl">
                <img src='/img/1.webp' alt="Tratamento médico" className="w-full h-auto rounded-2xl shadow-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safe Treatments Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Tratamentos seguros
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Seguimos rigorosamente as normas da ANVISA para garantir sua segurança e eficácia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {treatmentProcess.map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center">
                  <div className="text-5xl mb-6">{step.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-left">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLP-1 Information Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-orange-100 to-yellow-100 rounded-3xl p-8">
                <img src='/img/8.png' alt="Medicamento GLP-1" className="w-full h-auto rounded-2xl" />
              </div>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                O que são os tratamentos com GLP-1?
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Os medicamentos GLP-1 são uma classe revolucionária de tratamentos que imitam um hormônio natural do corpo. Eles regulam o açúcar no sangue e promovem sensação natural de saciedade.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Aprovação ANVISA</h4>
                    <p className="text-gray-600">Certificados para tratamento de diabetes e obesidade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Controle Natural</h4>
                    <p className="text-gray-600">Reduzem significativamente o apetite e a fome</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 rounded-full p-2">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Benefícios Metabólicos</h4>
                    <p className="text-gray-600">Melhoram controle glicêmico e sensibilidade à insulina</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Evaluation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Faça uma avaliação médica e tenha o diagnóstico certo
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nossa equipe multidisciplinar garante o melhor cuidado e acompanhamento personalizado
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {medicalApproach.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <h4 className="text-sm font-medium text-orange-500 mb-3">{item.subtitle}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Science Statistics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className='text-orange-500 text-sm font-bold uppercase tracking-wider'>Por trás da ciência</span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 mt-4">
              Resultados comprovados cientificamente
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Baseado em estudos clínicos e acompanhamento de milhares de pacientes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {scienceStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 text-center shadow-lg">
                <div className="text-4xl mb-4">{stat.icon}</div>
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
          <p className='mt-8 text-xs text-center text-gray-500'>
            ¹ Fonte: NEJM ² Baseado em pesquisa com 215 pacientes ativos, fevereiro de 2023
          </p>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-400 to-yellow-400 rounded-3xl p-2">
                <img
                  src="/img/3.jpg"
                  alt="Paciente satisfeita"
                  className="w-full h-96 object-cover rounded-2xl"
                />
              </div>
              <div className="absolute bottom-6 left-6 bg-white rounded-xl p-4 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Star className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">Maria Silva</p>
                    <p className="text-sm text-gray-600">Perdeu 12kg em 4 meses</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                "O resultado superou minhas expectativas"
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                "O tratamento mudou minha vida completamente. Não apenas perdi peso de forma saudável, mas ganhei confiança e melhorei minha saúde geral. A equipe médica me acompanhou em cada passo do processo, sempre disponível para esclarecer dúvidas e ajustar o tratamento conforme necessário."
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-gray-600 font-medium">5.0 de 5 estrelas</span>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <p className="text-sm text-orange-700">
                  <strong>Resultado típico:</strong> Perda média de 10-15kg nos primeiros 6 meses com acompanhamento médico adequado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              As respostas para todas as suas perguntas
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tire todas suas dúvidas sobre nossos tratamentos e processos
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-gray-50 rounded-lg px-6">
                  <AccordionTrigger className="py-6 text-left text-primary font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-gray-700 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-purple-700 to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto text-white space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              É hoje o seu primeiro passo para uma vida mais saudável
            </h2>
            <p className="text-lg opacity-90 leading-relaxed">
              Comece sua jornada de transformação com acompanhamento médico especializado, medicamentos certificados e suporte integral
            </p>
            <div className='mx-auto max-w-md'>
              <Button className="w-full bg-orange-500 hover:bg-orange-400 text-primary px-8 py-8 text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-200 shadow-2xl">
                Iniciar meu tratamento
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
            <p className="text-sm opacity-75">
              Consulta médica online • Medicamentos em casa • Acompanhamento contínuo
            </p>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default TreatmentInfo;
