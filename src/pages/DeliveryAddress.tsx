
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import HeaderSurvey from '@/components/HeaderSurvey';

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Save logic here
    navigate('/account-details');
  };

  const handleSearchCep = () => {
    // CEP search logic here
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
            <h1 className="text-2xl font-bold text-primary mb-8">Endereço de entrega</h1>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="flex-1">
                  <Label htmlFor="cep" className="text-sm font-medium text-gray-700 mb-2 block">
                    CEP
                  </Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    className="w-full"
                  />
                </div>
                <div className="pt-7">
                  <Button
                    onClick={handleSearchCep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6"
                  >
                    Procurar
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-gray-700 mb-2 block">
                  Endereço
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="number" className="text-sm font-medium text-gray-700 mb-2 block">
                  Número
                </Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="complement" className="text-sm font-medium text-gray-700 mb-2 block">
                  Complemento (opcional)
                </Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange('complement', e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neighborhood" className="text-sm font-medium text-gray-700 mb-2 block">
                    Acre
                  </Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700 mb-2 block">
                    Cidade
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <Button
                onClick={handleSave}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-6 text-lg font-medium"
              >
                Salvar endereço de entrega
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
