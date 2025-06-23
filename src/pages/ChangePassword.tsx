
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { UserService } from '@/services/userService';
import HeaderSurvey from '@/components/HeaderSurvey';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para alterar a senha.",
        variant: "destructive",
      });
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) {
      toast({
        title: "Senha muito fraca",
        description: passwordErrors[0],
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      await UserService.updateUserPassword(formData.newPassword);
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      navigate('/account-details');
    } catch (error) {
      toast({
        title: "Erro",
        description: error instanceof Error ? error.message : "Erro ao alterar senha.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? 'text' : 'password'}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full h-12 pr-12"
                    placeholder="Mínimo 8 caracteres"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-primary mb-2 block">
                  Confirmar nova senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full h-12 pr-12"
                    placeholder="Confirme sua nova senha"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                
                {formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">As senhas não coincidem</p>
                )}
              </div>

              <Button
                onClick={handleSave}
                disabled={loading || !formData.newPassword || !formData.confirmPassword}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg font-medium"
              >
                {loading ? 'Salvando...' : 'Salvar alterações'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
