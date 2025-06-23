
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Package, HelpCircle, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import HeaderSurvey from '@/components/HeaderSurvey';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderSurvey />
      
      <div className="container mx-auto px-4 py-8 max-w-md mt-16">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-bold text-primary mb-8">
            Olá {user?.email?.split('@')[0] || 'Robert'}
          </h1>
          
          <div className="space-y-6">
            {/* PLANOS Section */}
            <div>
              <h2 className="text-sm font-semibold text-primary mb-4 tracking-wider">PLANOS</h2>
              <button
                onClick={() => navigate('/survey')}
                className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Package className="w-5 h-5 text-primary" />
                  <span className="text-primary font-medium">Gerenciar Planos e Pedidos</span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary/50" />
              </button>
            </div>

            {/* CONTA Section */}
            <div>
              <h2 className="text-sm font-semibold text-primary mb-4 tracking-wider">CONTA</h2>
              <div className="space-y-2">
                <button
                  onClick={() => navigate('/support')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span className="text-primary font-medium">Suporte</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary/50" />
                </button>
                
                <button
                  onClick={() => navigate('/account-details')}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-primary" />
                    <span className="text-primary font-medium">Detalhes da conta</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-primary/50" />
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="pt-4">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-3 text-primary hover:text-orange-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sair da conta</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
