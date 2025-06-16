
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TreatmentSection from '@/components/TreatmentSection';
import ExpectationSection from '@/components/ExpectationSection';
import StatsSection from '@/components/StatsSection';
import TestimonialSection from '@/components/TestimonialSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <TreatmentSection />
          <ExpectationSection />
          <StatsSection />
          <TestimonialSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </Provider>
  );
};

export default Index;
