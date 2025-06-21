
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { toggleMobileMenu, closeMobileMenu } from '@/store/slices/navigationSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isMobileMenuOpen } = useSelector((state: RootState) => state.navigation);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigationItems = [
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Tratamentos', href: '#tratamentos' },
    { name: 'Especialistas', href: '#especialistas' },
    { name: 'Resultados', href: '#resultados' },
    { name: 'Recursos', href: '#recursos' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md' 
        : 'bg-gradient-to-r from-purple-900 to-purple-800 backdrop-blur-sm'
    }`}>
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
                className={`transition-colors duration-200 font-medium ${
                  isScrolled 
                    ? 'text-gray-900 hover:text-orange-500' 
                    : 'text-white hover:text-orange-300'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Desktop Login Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a className={`cursor-pointer transition-colors duration-200 ${
              isScrolled 
                ? 'text-gray-900 hover:text-orange-500' 
                : 'text-white hover:text-orange-300'
            }`}>
              Entrar
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => dispatch(toggleMobileMenu())}
              className={`p-2 transition-colors duration-200 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${
            isScrolled 
              ? 'bg-white border-gray-200' 
              : 'bg-purple-900 border-purple-700'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className={`font-semibold text-lg mb-4 px-3 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}>Menu</div>
              {navigationItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-900 hover:text-orange-500' 
                      : 'text-white hover:text-orange-300'
                  }`}
                  onClick={() => dispatch(closeMobileMenu())}
                >
                  {item.name}
                  <span className="float-right">›</span>
                </a>
              ))}
              <div className={`border-t mt-4 pt-4 ${
                isScrolled ? 'border-gray-200' : 'border-purple-700'
              }`}>
                <div className={`font-semibold text-lg mb-4 px-3 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>Minha Conta</div>
                <a
                  href="#entrar"
                  className={`block px-3 py-2 font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-900 hover:text-orange-500' 
                      : 'text-white hover:text-orange-300'
                  }`}
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
