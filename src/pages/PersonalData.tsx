
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserService, type UserProfile } from '@/services/userService';
import HeaderSurvey from '@/components/HeaderSurvey';

const PersonalData = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    cpf: '',
    email: ''
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        router.push('/auth/login');
        return;
      }

      try {
        const profile = await UserService.getCurrentUserProfile();
        if (profile) {
          setUserProfile(profile);
          setFormData({
            firstName: profile.first_name || '',
            lastName: profile.last_name || '',
            phone: profile.phone || '',
            cpf: profile.preferences?.cpf || '',
            email: profile.email
          });
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar dados do usuário.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [user, router, toast]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.lastName.trim()) {
      toast({
        title: "Erro",
        description: "Sobrenome é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Erro",
        description: "Email é obrigatório.",
        variant: "destructive",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Erro",
        description: "Digite um email válido.",
        variant: "destructive",
      });
      return false;
    }

    // Basic phone validation (Brazilian format)
    if (formData.phone && !/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(formData.phone.replace(/\s/g, ''))) {
      toast({
        title: "Erro",
        description: "Digite um telefone válido no formato (00) 00000-0000.",
        variant: "destructive",
      });
      return false;
    }

    // Basic CPF validation (just format check)
    if (formData.cpf && !/^\d{3}\.\d{3}\.\d{3}-?\d{2}$/.test(formData.cpf)) {
      toast({
        title: "Erro",
        description: "Digite um CPF válido no formato 000.000.000-00.",
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
      // Update user profile
      await UserService.updateUserProfile({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        preferences: {
          ...userProfile?.preferences,
          cpf: formData.cpf
        }
      });

      // Handle email change if different
      if (formData.email !== userProfile?.email) {
        try {
          await UserService.updateUserEmail(formData.email);
          toast({
            title: "Dados salvos!",
            description: "Dados pessoais atualizados. Verifique seu email para confirmar a alteração de email.",
          });
        } catch (error) {
          toast({
            title: "Dados salvos!",
            description: "Dados pessoais atualizados, mas houve erro ao alterar o email.",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Dados salvos!",
          description: "Seus dados pessoais foram atualizados com sucesso.",
        });
      }

      router.push('/account-details');
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao salvar dados.",
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
              <span className="ml-3 text-primary">Carregando dados...</span>
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
            <h1 className="text-2xl font-bold text-primary mb-8">Dados pessoais</h1>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-primary mb-2 block">
                    Nome *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full h-12"
                    placeholder="Seu nome"
                    disabled={saving}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-primary mb-2 block">
                    Sobrenome *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full h-12"
                    placeholder="Seu sobrenome"
                    disabled={saving}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-medium text-primary mb-2 block">
                  Celular com DDD
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full h-12"
                  placeholder="(00) 00000-0000"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="cpf" className="text-sm font-medium text-primary mb-2 block">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  value={formData.cpf}
                  onChange={(e) => handleInputChange('cpf', e.target.value)}
                  className="w-full h-12"
                  placeholder="000.000.000-00"
                  disabled={saving}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-medium text-primary mb-2 block">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full h-12"
                  placeholder="seu@email.com"
                  disabled={saving}
                />
              </div>

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
                  'Salvar Alterações'
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalData;
