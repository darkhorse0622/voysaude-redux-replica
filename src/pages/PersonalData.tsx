
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HeaderSurvey from '@/components/HeaderSurvey';

const PersonalData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: 'Robert',
    lastName: 'Arbuckle',
    phone: '(38) 0636-9354',
    cpf: '495.116.710-73',
    email: 'fastleopard9372@gmail.com'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save logic here
    navigate('/account-details');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSurvey />
      
      <div className="container mx-auto px-4 py-8 max-w-md mt-16">
        <div className="bg-white rounded-lg shadow-sm">
          {/* Header */}
          <div className="flex items-center p-6 border-b border-gray-200">
            <button 
              onClick={() => navigate('/account-details')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => navigate('/account-details')}
              className="text-primary font-medium hover:text-orange-500 transition-colors"
            >
              Voltar
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-8">Dados pessoais</h1>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700 mb-2 block">
                    Nome
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700 mb-2 block">
                    Sobrenome
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Celular com DDD
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="text-sm font-medium text-gray-700 mb-2 block">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-6 text-lg font-medium"
              >
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
