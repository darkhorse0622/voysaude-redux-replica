
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';
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

const Dashboard = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);
  const [isScrolled, setIsScrolled] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const navigationItems = [
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Especialistas', href: '#especialistas' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Recursos', href: '#recursos' },
  ];

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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md' 
          : 'bg-gradient-to-r from-primary to-purple-800 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
                voy
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`transition-colors duration-200 font-medium ${
                    isScrolled 
                      ? 'text-gray-900 hover:text-orange-500' 
                      : 'text-white hover:text-orange-300'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Desktop Login Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a className={`cursor-pointer transition-colors duration-200 ${
                isScrolled 
                  ? 'text-gray-900 hover:text-orange-500' 
                  : 'text-white hover:text-orange-300'
              }`}>
                Entrar
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => dispatch(toggleMobileMenu())}
                className={`p-2 transition-colors duration-200 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation with Fader */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 top-16 z-40 md:hidden">
              {/* Fader background */}
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => dispatch(closeMobileMenu())} />
              
              {/* Menu content */}
              <div className={`relative h-full ${
                isScrolled 
                  ? 'bg-white' 
                  : 'bg-primary'
              }`}>
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <div className={`font-semibold text-lg mb-4 px-3 ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Menu</div>
                  {navigationItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                        isScrolled 
                          ? 'text-gray-900 hover:text-orange-500' 
                          : 'text-white hover:text-orange-300'
                      }`}
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      {item.name}
                      <span className="float-right">›</span>
                    </a>
                  ))}
                  <div className={`border-t mt-4 pt-4 ${
                    isScrolled ? 'border-gray-200' : 'border-purple-700'
                  }`}>
                    <div className={`font-semibold text-lg mb-4 px-3 ${
                      isScrolled ? 'text-gray-900' : 'text-white'
                    }`}>Minha Conta</div>
                    <a
                      href="#entrar"
                      className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                        isScrolled 
                          ? 'text-gray-900 hover:text-orange-500' 
                          : 'text-white hover:text-orange-300'
                      }`}
                      onClick={() => dispatch(closeMobileMenu())}
                    >
                      Entrar
                      <span className="float-right">›</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="min-h-screen bg-gradient-to-br from-primary via-purple-800 to-purple-700 flex items-center pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Cuidamos de você e de todo resto
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-md">
                  Encontre os produtos de nutrição certos. 
                  Receba consultas qualificadas.
                  Receba tudo para a construção de novos hábitos.
                </p>
                <Button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
                  Comece sem compromisso
                </Button>
              </div>
              <div className="relative animate-fade-in">
                <img src='/img/1.webp' alt="Hero Image" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Treatment Section */}
        <section id="tratamentos" className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <img src='/img/8.png' alt="Tratamentos" className="w-full h-auto rounded-lg shadow-lg animate-fade-in" />
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-primary">
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

        {/* Expectation Section */}
        <section id="resultados" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Primeiros sinais
                </h2>
                <p className="text-gray-600 text-lg">
                  1º a 3º mês (varia entre cada pessoa)
                </p>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <Accordion type="single" collapsible defaultValue="consulta-nutricional">
                  {accordionItems.map((item) => (
                    <AccordionItem key={item.id} value={item.id} className="border-b border-gray-200 last:border-b-0">
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50 text-primary font-medium">
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

        {/* Stats Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
              Os resultados falam por eles mesmos
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
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
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
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
                        <div className="bg-gray-50 rounded-2xl p-8">
                          <h3 className="text-xl font-bold text-primary mb-2">
                            {testimonial.name}, {testimonial.subtitle}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
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
              
              <div className="flex justify-center mt-8 space-x-2">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index + 1 === current ? 'bg-primary' : 'bg-gray-300'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary via-purple-800 to-orange-500">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto text-white space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Prora para sem burocracia
              </h2>
              <p className="text-lg opacity-90">
                Comece seu tratamento personalizado hoje mesmo. 
                Nossa equipe está pronta para cuidar de você.
              </p>
              <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
                Comece sem compromisso
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Ficou com alguma dúvida?</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span>📞</span>
                  <span>11 99186 6413</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>✉️</span>
                  <span>ajuda@voysaude.com.br</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>❓</span>
                  <div>
                    <p className="font-medium">Visite nossa central de ajuda</p>
                    <p className="text-sm opacity-75">Encontre respostas para suas perguntas</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold">LEGAL</h3>
              <div className="space-y-2">
                <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                  Política de privacidade
                </a>
                <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                  Termos e condições
                </a>
                <a href="#" className="block hover:text-orange-300 transition-colors duration-200">
                  Seja um afiliado Voy
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-700 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
                  voy
                </div>
              </div>
              <div className="text-sm opacity-75 text-center md:text-right">
                <p>A Voy não é uma farmácia. Todos produtos adquiridos são</p>
                <p>manipulados pelas farmácias credenciadas de acordo com as normas da Anvisa.</p>
                <p className="mt-2">Copyright 2025 Voy™. Todos os direitos reservados.</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              <div className="w-8 h-8 bg-blue-600 rounded"></div>
              <div className="w-8 h-8 bg-blue-400 rounded"></div>
              <div className="w-8 h-8 bg-blue-800 rounded"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
