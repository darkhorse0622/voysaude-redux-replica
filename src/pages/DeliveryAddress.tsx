
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserService, type DeliveryAddress } from '@/services/userService';
import HeaderSurvey from '@/components/HeaderSurvey';

const DeliveryAddress = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchingCep, setSearchingCep] = useState(false);
  const [formData, setFormData] = useState({
    cep: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  useEffect(() => {
    const loadDeliveryAddress = async () => {
      if (!user) {
        navigate('/auth/login');
        return;
      }

      try {
        const defaultAddress = await UserService.getDefaultDeliveryAddress();
        if (defaultAddress) {
          setFormData({
            cep: defaultAddress.cep || '',
            address: defaultAddress.address || '',
            number: defaultAddress.number || '',
            complement: defaultAddress.complement || '',
            neighborhood: defaultAddress.neighborhood || '',
            city: defaultAddress.city || '',
            state: defaultAddress.state || ''
          });
        }
      } catch (error) {
        console.error('Error loading delivery address:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDeliveryAddress();
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.address.trim()) {
      toast({
        title: "Erro",
        description: "Endereço é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.city.trim()) {
      toast({
        title: "Erro",
        description: "Cidade é obrigatória.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.neighborhood.trim()) {
      toast({
        title: "Erro",
        description: "Bairro é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    // CEP validation (Brazilian format)
    if (formData.cep && !/^\d{5}-?\d{3}$/.test(formData.cep)) {
      toast({
        title: "Erro",
        description: "Digite um CEP válido no formato 00000-000.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setSaving(true);

    try {
      await UserService.saveDeliveryAddress({
        cep: formData.cep,
        address: formData.address,
        number: formData.number,
        complement: formData.complement,
        neighborhood: formData.neighborhood,
        city: formData.city,
        state: formData.state,
        is_default: true
      });

      toast({
        title: "Endereço salvo!",
        description: "Seu endereço de entrega foi salvo com sucesso.",
      });

      navigate('/account-details');
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar endereço.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSearchCep = async () => {
    if (!formData.cep.trim()) {
      toast({
        title: "Erro",
        description: "Digite um CEP para buscar.",
        variant: "destructive",
      });
      return;
    }

    setSearchingCep(true);

    try {
      const result = await UserService.searchCEP(formData.cep);
      
      if (result) {
        setFormData(prev => ({
          ...prev,
          cep: result.cep,
          address: result.address,
          neighborhood: result.neighborhood,
          city: result.city,
          state: result.state
        }));

        toast({
          title: "CEP encontrado!",
          description: "Endereço preenchido automaticamente.",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao buscar CEP.",
        variant: "destructive",
      });
    } finally {
      setSearchingCep(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderSurvey />
        <div className="container mx-auto px-4 py-8 max-w-md mt-16">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
              <span className="ml-3 text-primary">Carregando endereço...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              disabled={saving}
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => navigate('/account-details')}
              className="text-primary font-medium hover:text-orange-500 transition-colors"
              disabled={saving}
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
                  <Label htmlFor="cep" className="text-sm font-medium text-primary mb-2 block">
                    CEP
                  </Label>
                  <Input
                    id="cep"
                    value={formData.cep}
                    onChange={(e) => handleInputChange('cep', e.target.value)}
                    placeholder="00000-000"
                    className="w-full h-12"
                    disabled={saving || searchingCep}
                  />
                </div>
                <div className="pt-7">
                  <Button
                    onClick={handleSearchCep}
                    disabled={saving || searchingCep || !formData.cep.trim()}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 h-12"
                  >
                    {searchingCep ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <Search className="w-4 h-4 mr-2" />
                        Buscar
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-sm font-medium text-primary mb-2 block">
                  Endereço *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full h-12"
                  placeholder="Rua, avenida, etc."
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="number" className="text-sm font-medium text-primary mb-2 block">
                  Número
                </Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  className="w-full h-12"
                  placeholder="123"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="complement" className="text-sm font-medium text-primary mb-2 block">
                  Complemento (opcional)
                </Label>
                <Input
                  id="complement"
                  value={formData.complement}
                  onChange={(e) => handleInputChange('complement', e.target.value)}
                  className="w-full h-12"
                  placeholder="Apartamento, bloco, etc."
                  disabled={saving}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neighborhood" className="text-sm font-medium text-primary mb-2 block">
                    Bairro *
                  </Label>
                  <Input
                    id="neighborhood"
                    value={formData.neighborhood}
                    onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                    className="w-full h-12"
                    placeholder="Centro"
                    disabled={saving}
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-primary mb-2 block">
                    Cidade *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full h-12"
                    placeholder="São Paulo"
                    disabled={saving}
                  />
                </div>
              </div>

              {formData.state && (
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-primary mb-2 block">
                    Estado
                  </Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full h-12"
                    placeholder="SP"
                    disabled={saving}
                  />
                </div>
              )}

              <Button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium"
              >
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar endereço de entrega'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
