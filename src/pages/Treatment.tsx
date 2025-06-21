import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Header2 from '@/components/Header2';
import Footer from '@/components/Footer';

const Treatment = () => {
  const cardApproach = [
    {
      image: <img src='/img/Card_Tirzepatida.webp' alt='Tirzepatida'/>,
      title: "Semaglutida",
      description: "Princípio ativo encontrado em tratamentos como"
    },
    {
      image: <img src='/img/Card_Semaglutida.webp' alt='Semaglutida'/>,
      title: "Tirzepatida",
      description: "Princípio ativo encontrado em tratamentos como"
    },
    {
      image: <img src='/img/Card_Bupropiona.webp' alt='Bupropiona'/>,
      title: "Naltrexona + Bupropiona",
      description: "Princípio ativo encontrado em tratamentos como"
    }
  ];

  const medican = [
    {
      image:<img src='/img/Genetics.svg' className='w-20' alt='Genetics'/>,
      title: "Genética",
      description: "Os genes definem seu apetite, metabolismo e até desejos alimentares. Nesses casos, o médico pode prescrever medicamentos para que você consiga perder peso e mudar hábitos."
    },
    {
      image:<img src='/img/Reduce-hunger.svg' className='w-20' alt='hunger'/>,
      title: "Metabolismo",
      description: "Uma taxa metabólica mais lenta queima menos calorias e, frequentemente, leva a desejos alimentares. Com isso, mesmo com muita força de vontade, fica difícil driblar a genética."
    },
    {
      image:<img src='/img/Diarrhoea.svg' className='w-20' alt='Diarrhoea'/>,
      title: "Hormônios",
      description: "O estrogênio regula o armazenamento de gordura e a testosterona afeta a taxa metabólica. O médico é capaz de identificar desequilíbrios em ambos, para prescrever o tratamento adequado."
    },
    {
      image:<img src='/img/man.svg' className='w-20' alt='man'/>,
      title: "Fatores psicológicos",
      description: "O estresse aumenta os níveis de cortisol, elevando o apetite e a fome emocional. Se prescrita, a medicação controla esses efeitos, enquanto você cria novos hábitos saudáveis e prazerosos com seu nutri."
    }
  ];
  const scienceStats = [
    {
      image:<img src='/img/Reduce-hunger.svg' className='w-40' alt='hunger'/>,
      title: "Sua fome sob controle",
      description: "Retardam o ritmo com que o estômago se esvazia de alimentos, promovendo uma sensação prolongada de saciedade."
    },
    {
      image:<img src='/img/Curb-cravings.svg' className='w-40' alt='cravings'/>,
      title: "Desejos na medida certa",
      description: "Atuam no cérebro, diminuindo a vontade de consumir alimentos não saudáveis, e de comer em excesso."
    },
    {
      image:<img src='/img/Weight+plateau.svg' className='w-40' alt='plateau'/>,
      title: "Novo equilíbrio ",
      description: "Com a diminuição dos desejos e ajuda de especialistas, fica mais fácil educar sua mente para novos hábitos saudáveis."
    }
  ];

  const GlpItems = [
    {
      question: "Como funcionam? ",
      answer: "GLP-1 e GIP são medicações usadas no tratamento da obesidade e controle metabólico, sob prescrição médica. O GLP-1 imita um hormônio que regula o apetite e aumenta a saciedade. O GIP auxilia no controle da glicose e no metabolismo de gorduras."
    },
    {
      question: "Para quem são indicados?",
      answer: "Apenas o médico endocrinologista pode definir quem precisa do tratamento, por isso, a avaliação médica é tão importante."
    },
    {
      question: "Quais são esses tratamentos?",
      answer: "Existem vários tratamentos que atuam na diminuição da saciedade, como "
    },
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
      <Header2/>
      
      {/* Hero Section */}
      <section className="min-h-screen bg-orange-100 flex items-center pt-32 pb-16">
        <div className="container mx-auto sm:px-4 lg:px-8 max-md:px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Com a receita, o seu tratamento chega até você
              </h1>
              <div className="text-lg md:text-xl max-w-lg">
                <ol className="pl-5 text-md md:text-lg max-w-md font-bold">
                  <li className="mb-2 flex gap-4 items-center">
                    <img src='/img/usp_experts_colour.svg' alt=''/><span>Medicamentos sob prescrição médica</span>
                  </li>
                  <li className="mb-2  flex gap-4 items-center">
                    <img src='/img/usp_quality_colour.svg' alt=''/><span>Seguindo novas normas da ANVISA</span>
                  </li>
                  <li className="mb-2  flex gap-4 items-center">
                    <img src='/img/usp_delivery_circle_colour.svg' alt=''/><span>Entrega mensal gratuita</span>
                  </li>
                </ol>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-orange-500 hover:bg-orange-400 text-primary px-16 py-6 text-md font-bold rounded-lg transform hover:scale-105 transition-all duration-200 max-md:w-full">
                Fazer avaliação médica
                </Button>
              </div>
              <p className='text-sm pt-4 max-md:border-t-2 max-md:border-t-gray-200 md:pt-16'>
                Toda prescrição e acompanhamento médico é feita por especialistas credenciados, cabendo à Voy a gestão do tratamento.
              </p>
            </div>
            <div className="animate-fade-in">
              <img src='/img/medicationS01_heroComposition_v02.webp' alt="Tratamento" className="w-full h-auto rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process Section */ }
      <div className='container lg:max-w-6xl xl:max-w-7xl max-md:px-4'>
        <section className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden mx-auto bg-gray-100 gap-6 rounded-3xl">
            <img src='/img/medicationS02_image.png' className='h-full object-cover max-md:order-1'/>
            <div className="flex flex-col  justify-center item my-8 mx-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                Tratamentos seguros
              </h2>
              <p className="text-lg">
                Te ajudamos a encontrar o melhor tratamento, com médicos especializados
                em emagrecimento que acompanham <strong>todo seu processo. Além disso, todos medicamentos
                prescritos são adquiridos em farmácias parceiras de confiança com retenção de receita,
                seguindo as novas normas da ANVISA.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* GLP-1 Information Section */}
        <section >
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden mx-auto gap-6 rounded-3xl">
            <div className="space-y-6 py-6 ">
              <h2 className="text-3xl md:text-4xl md:pt-24 font-bold text-primary">
                O que são os tratamentos com GLP-1?
              </h2>
              <p className="text-lg leading-relaxed">
              Tratamentos com GLP-1 e GIP são medicamentos usados no tratamento da obesidade para a perda de peso e controle metabólico. Somente sob prescrição médica.
              </p>
              <div className="space-y-4 pb-12">
                {GlpItems.map((item, index) => (
                  <Accordion key={index} type="single" collapsible className="border-b border-gray-200">
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="py-4 text-left font-bold text-lg hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>   
                  </Accordion>
                ))}
              </div>
            </div>
            <img src='/img/medicationS03_image_v02.png' alt="Medicamento GLP-1" className="h-full object-cover rounded-none" />
          </div>
        </section>

        {/* Card Approach Section */}
        <section className="pt-16 bg-white">
          <div className="mx-auto">
            <div className="mb-8">
              <span className='text-primary text-xs font-bold'>TRATAMENTOS</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                Faça uma avaliação médica e tenha o diagnóstico certo
              </h2>
              <p className="text-lg">
                Existem vários tratamentos seguros e registrados na ANVISA que funcionam como inibidores de apetite, cada um com um princípio ativo. É essencial que o médico entenda sua necessidade antes de qualquer prescrição.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cardApproach.map((item, index) => (
                <div key={index}>
                  <div className="bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-primary">
                    {item.image}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Science Stats Section */}
        <section className='pt-16'>
          <div className="container mx-auto px-0">
            <div className="mb-8">
              <span className='text-primary text-xs font-bold'>POR TRÁS DA CIÊNCIA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                Em quanto tempo o médico pode prescrever medicamentos
              </h2>
              <p>
                Alguns fatores biológicos podem dificultar a perda de peso. Nesses casos, o médico pode identificar a necessidade de medicamentos para impulsionar o tratamento.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-8">
              {medican.map((stat, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-4 md:p-8 shadow-lg">
                  {stat.image}
                  <h3 className="text-lg font-bold text-primary my-3">
                    {stat.title}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Por trás da ciência Section */}
        <section className='pt-16'>
          <div className="container mx-auto px-0">
            <div className="mb-16">
              <span className='text-primary text-xs font-bold'>POR TRÁS DA CIÊNCIA</span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                Por trás da ciência
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {scienceStats.map((stat, index) => (
                <div key={index} className="rounded-2xl">
                  {stat.image}
                  <h3 className="text-lg font-bold text-primary my-3">
                    {stat.title}
                  </h3>
                  <p className="text-sm leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="pt-16 bg-white">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row gap-24 items-center">
              <img
                src="/img/Image.webp"
                alt="Paciente satisfeita"
                className="h-full object-cover rounded-lg"
              />
              <div className="space-y-6">
                <p className="text-3xl eading-relaxed">
                  “Na Voy conseguimos oferecer um cuidado mais eficiente porque eliminamos burocracia. Isso faz toda a diferença na jornada dos pacientes.”
                </p>
                <div>
                  <p className='font-bold text-xs'>Renata Araujo, PhD</p>
                  <p className="text-gray-600">Nutricionista Líder, CRN3-41698</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="mx-auto px-0">
            <div className="mb-8">
              <h2 className="text-xs">
               FAQ
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-primary mt-2 mb-4">
                As respostas para todas as suas perguntas
              </p>
            </div>
            
            <div className="w-full">
              <Accordion type="single" collapsible>
                {faqItems.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="py-6 text-sm md:text-xl text-primary font-bold hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </div>
      {/* CTA Section */}
      <section className="py-16 md:py-28 bg-gradient-to-b from-primary to-orange-500">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto text-white space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              A sua receita para perder peso
            </h2>
            <p className="text-lg opacity-90">
              Plano 100% online com prescrição médica e suporte de saúde
            </p>
            <div className='mx-auto max-w-xs'>
              <Button variant='outline' className="w-full border-2 bg-transparent hover:bg-orange-100/25 hover:text-white text-white px-8 py-8 text-lg font-semibold rounded-lg transform hover:scale-105 transition-all duration-200">
                Quero uma avaliação
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
