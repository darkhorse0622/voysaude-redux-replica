
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import HeaderSurvey from '@/components/HeaderSurvey';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Password change logic here
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    });
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
            <h1 className="text-2xl font-bold text-primary mb-8">Alterar senha</h1>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="newPassword" className="text-sm font-medium text-primary mb-2 block">
                  Nova senha
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={(e) => handleInputChange('newPassword', e.target.value)}
                  className="w-full h-12"
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-primary mb-2 block">
                  Confirmar nova senha
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="w-full h-12"
                />
              </div>

              <Button
                onClick={handleSave}
                className="w-full  text-white py-6 text-lg font-medium"
              >
                Salvar alterações
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
