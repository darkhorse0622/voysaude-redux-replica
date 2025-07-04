'use client';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const navigationItems = [
    { name: 'Como funciona', href: '/' },
    { name: 'Tratamentos', href: '/treatments' },
    { name: 'Especialistas', href: '/especialistas' },
    { name: 'Resultados', href: '/resultados' },
    { name: 'Recursos', href: '/recursos' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      router.push('/');
    } catch (error) {
      toast({
        title: "Erro ao fazer logout",
        description: "Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <div className="border-b border-b-gray-400/50">
        <div className={`flex justify-center md:justify-start items-center h-16 ${isScrolled ? 'bg-white' : 'text-orange-10'}`}>
          {/* Logo */}
          <div className="relative flex items-center">
            <a className={`cursor-pointer font-bold text-3xl px-8 rounded-lg text-primary`} onClick={() => router.push("/")}>
              voy
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 mr-auto">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                onClick={() => router.push(item.href)}
                className={`cursor-pointer transition-colors duration-200 font-medium text-primary hover:text-orange-500`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4 pr-8">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 cursor-pointer hover:text-orange-500" onClick={()=>router.push('/user-dashboard')}>
                  <User size={20} className="text-primary" />
                  <span className="text-primary hover:text-orange-500">{user.email}</span>
                </div>
                <a
                  onClick={handleSignOut}
                  className="flex items-center cursor-pointer text-primary hover:text-orange-500"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </a>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => router.push('/auth/login')}
                  className="text-primary hover:text-orange-500"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => router.push('/auth/register')}
                  className="bg-primary text-white hover:bg-orange-500"
                >
                  Cadastrar
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className={`absolute left-0 md:hidden text-primary`}>
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="p-2 transition-colors duration-200"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation with Fader */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 top-0 z-40 md:hidden transition-transform duration-500 ease-in-out">
            <div className='relative h-full bg-white'>
              <button
                onClick={() => dispatch(closeMobileMenu())}
                className="p-2 pt-4 transition-colors duration-200"
              >
                <X size={24} />
              </button>
              <div className="px-2 space-y-1">
                <div className="font-bold text-md mb-4 px-3 py-4 border-b border-b-gray-200">Menu</div>
                {navigationItems.map((item) => (
                  <a
                    key={item.name}
                    onClick={() => {
                      router.push(item.href);
                      dispatch(closeMobileMenu());
                    }}
                    className={`border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500 cursor-pointer`}
                  >
                    {item.name}
                    <span className="float-right">›</span>
                  </a>
                ))}
                <div className={`mt-4 pt-4`}>
                  <div className={`border-b border-b-gray-200 font-bold text-md mb-4 py-4 px-3 text-primary`}>
                    {user ? 'Minha Conta' : 'Acesso'}
                  </div>
                  {user ? (
                    <>
                      <div className="border-b border-b-gray-200 block px-3 py-4 text-primary" onClick={()=>router.push('/user-dashboard')}>
                        {user.email}
                      </div>
                      <a
                        onClick={() => {
                          handleSignOut();
                          dispatch(closeMobileMenu());
                        }}
                        className={`border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500 cursor-pointer`}
                      >
                        Sair
                        <span className="float-right">›</span>
                      </a>
                    </>
                  ) : (
                    <>
                      <a
                        onClick={() => {
                          router.push('/auth/login');
                          dispatch(closeMobileMenu());
                        }}
                        className={`border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500 cursor-pointer`}
                      >
                        Entrar
                        <span className="float-right">›</span>
                      </a>
                      <a
                        onClick={() => {
                          router.push('/auth/register');
                          dispatch(closeMobileMenu());
                        }}
                        className={`border-b border-b-gray-200 block px-3 py-4 font-medium transition-colors duration-200 text-primary hover:text-orange-500 cursor-pointer`}
                      >
                        Cadastrar
                        <span className="float-right">›</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Button className="fixed bottom-36 right-4 rounded-full p-0">
        <img src='/img/whatsapp_voy_br.svg' alt="WhatsApp" />
      </Button>
    </header>
  );
};

export default Header;
