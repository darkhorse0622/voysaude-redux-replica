
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserService, type DeliveryAddress } from '@/services/userService';
import HeaderSurvey from '@/components/HeaderSurvey';

const DeliveryAddress = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState(false);
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
    const loadDeliveryAddresses = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      try {
        // Load all addresses for the user
        const userAddresses = await UserService.getDeliveryAddressesByUserId(user.id);
        setAddresses(userAddresses);

        // Find default address and set as selected
        const defaultAddress = userAddresses.find(addr => addr.is_default);
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id || '');
        } else if (userAddresses.length === 0) {
          // If no addresses exist, show the add form
          setShowAddForm(true);
        }
      } catch (error) {
        console.error('Error loading delivery addresses:', error);
        // If error or no addresses, show add form
        setShowAddForm(true);
      } finally {
        setLoading(false);
      }
    };

    loadDeliveryAddresses();
  }, [user, router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId);
    const selected = addresses.find(addr => addr.id === addressId);
    if (selected) {
      setFormData({
        cep: selected.cep || '',
        address: selected.address || '',
        number: selected.number || '',
        complement: selected.complement || '',
        neighborhood: selected.neighborhood || '',
        city: selected.city || '',
        state: selected.state || ''
      });
    }
  };

  const handleAddNewAddress = () => {
    setShowAddForm(true);
    setSelectedAddressId('');
    setFormData({
      cep: '',
      address: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: ''
    });
  };

  const handleSelectExisting = async () => {
    if (!selectedAddressId) {
      toast({
        title: "Erro",
        description: "Selecione um endereço.",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // Mark selected address as default
      const addresses = await UserService.getDeliveryAddresses();
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        is_default: addr.id === selectedAddressId
      }));

      const profile = await UserService.getCurrentUserProfile();
      if (profile) {
        await UserService.updateUserProfile({
          preferences: {
            ...profile.preferences,
            addresses: updatedAddresses
          }
        });
      }

      toast({
        title: "Endereço selecionado!",
        description: "Endereço de entrega atualizado com sucesso.",
      });

      router.push('/account-details');
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao selecionar endereço.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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

      // Reload addresses to show the new one
      if (user) {
        const userAddresses = await UserService.getDeliveryAddressesByUserId(user.id);
        setAddresses(userAddresses);
        setShowAddForm(false);
      }

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
              onClick={() => router.push('/account-details')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={saving}
            >
              <ArrowLeft className="w-5 h-5 text-primary" />
            </button>
            <button
              onClick={() => router.push('/account-details')}
              className="text-primary font-medium hover:text-orange-500 transition-colors"
              disabled={saving}
            >
              Voltar
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-8">Endereço de entrega</h1>
            
            {!showAddForm && addresses.length > 0 ? (
              /* Show existing addresses */
              <div className="space-y-6">
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedAddressId === address.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleAddressSelect(address.id || '')}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-primary">
                            {address.address} {address.number && `, ${address.number}`}
                          </p>
                          {address.complement && (
                            <p className="text-sm text-gray-600">{address.complement}</p>
                          )}
                          <p className="text-sm text-gray-600">
                            {address.neighborhood}, {address.city}
                          </p>
                          {address.state && (
                            <p className="text-sm text-gray-600">{address.state}</p>
                          )}
                          {address.cep && (
                            <p className="text-sm text-gray-600">CEP: {address.cep}</p>
                          )}
                          {address.is_default && (
                            <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded mt-2">
                              Padrão
                            </span>
                          )}
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedAddressId === address.id
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    size='sm'
                    onClick={handleSelectExisting}
                    disabled={saving || !selectedAddressId}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium"
                  >
                    {saving ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      'Usar endereço selecionado'
                    )}
                  </Button>
                  <Button
                    onClick={handleAddNewAddress}
                    variant="outline"
                    size='sm'
                    className="px-6 py-6 text-lg font-medium"
                  >
                    Adicionar novo
                  </Button>
                </div>
              </div>
            ) : (
              /* Show add new address form */
              <div className="space-y-6">
              <div>
                <Label htmlFor="cep" className="text-sm font-medium text-primary mb-2 block">
                  CEP (opcional)
                </Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => handleInputChange('cep', e.target.value)}
                  placeholder="00000-000"
                  className="w-full h-12"
                  disabled={saving}
                />
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

              <div className="flex gap-3">
                {addresses.length > 0 && (
                  <Button
                    onClick={() => setShowAddForm(false)}
                    variant="outline"
                    className="px-6 py-6 text-lg font-medium"
                  >
                    Voltar
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddress;
