
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import HeaderSurvey from '@/components/HeaderSurvey';
import { ArrowRight } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext';

const Support = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${user?.phone}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSurvey />
      
      <div className="container mx-auto px-4 py-8 max-w-md mt-16">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <button 
              onClick={() => navigate('/user-dashboard')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => navigate('/user-dashboard')}
              className="text-primary font-medium hover:text-orange-500 transition-colors"
            >
              Voltar
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-8">Suporte</h1>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-primary mb-4">
                  Ajuda com cadastro, planos e pedidos
                </h2>
                <p className="text-primary mb-6 leading-relaxed">
                  Receba ajuda do time de atendimento em questões sobre a recorrência do seu 
                  plano, cadastro, pedidos, status de entrega, pagamento, entre outros.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full flex items-center justify-between hover:bg-gray-50 transition-colors p-2 rounded"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">W</span>
                    </div>
                    <span className="text-primary font-medium">WhatsApp</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary/50" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
