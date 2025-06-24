
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import HeaderSurvey from '@/components/HeaderSurvey';

const AccountDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
            <h1 className="text-2xl font-bold text-primary mb-8">Detalhes da Conta</h1>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-6 h-6 text-primary" />
                  <h2 className="text-lg font-semibold text-primary">Informações pessoais</h2>
                </div>
                <div className="space-y-2">
                  <p className="text-primary font-medium">Robert Arbuckle</p>
                  <p className="text-primary">{user?.email || 'fastleopard9372@gmail.com'}</p>
                </div>
                <button className="mt-4 text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center" onClick={()=>navigate('/personal-data')}>
                  Alterar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Delivery Address */}
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary rounded"></div>
                  </div>
                  <h2 className="text-lg font-semibold text-primary">Endereço de entrega</h2>
                </div>
                <p className="text-primary mb-4">Nenhum endereço de entrega cadastrado</p>
                <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors flex items-center"  onClick={()=>navigate('/delivery-address')}>
                  Alterar
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Change Password */}
              <button
                onClick={() => navigate('/change-password')}
                className="w-full flex items-center justify-between p-6 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-primary rounded-sm"></div>
                  </div>
                  <span className="text-primary font-medium">Alterar senha</span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary/50" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
