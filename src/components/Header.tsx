
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);

  const navigationItems = [
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Especialistas', href: '#especialistas' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Recursos', href: '#recursos' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900 to-purple-800 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold text-xl px-4 py-2 rounded-lg">
              voy
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-white hover:text-orange-300 transition-colors duration-200 font-medium"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-purple-900">
              Entrar
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className="text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-purple-900 border-t border-purple-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="text-white font-semibold text-lg mb-4 px-3">Menu</div>
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-white hover:text-orange-300 block px-3 py-2 font-medium transition-colors duration-200"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  {item.name}
                  <span className="float-right">›</span>
                </a>
              ))}
              <div className="border-t border-purple-700 mt-4 pt-4">
                <div className="text-white font-semibold text-lg mb-4 px-3">Minha Conta</div>
                <a
                  href="#entrar"
                  className="text-white hover:text-orange-300 block px-3 py-2 font-medium transition-colors duration-200"
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  Entrar
                  <span className="float-right">›</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
