
import React from 'react';

const TestimonialSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sofia',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      text: 'O acompanhamento foi incrível e os resultados superaram minhas expectativas.'
    },
    {
      id: 2,
      name: 'Carlos',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      text: 'Profissionais muito qualificados e um atendimento humanizado.'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-50 rounded-2xl p-6 text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              <p className="font-semibold text-purple-900">
                {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
